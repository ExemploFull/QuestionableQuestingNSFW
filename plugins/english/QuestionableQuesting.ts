import { Parser } from 'htmlparser2';
import { fetchApi } from '@libs/fetch';
import { Plugin } from '@typings/plugin';

interface ForumConfig {
    title: string;
    forum: number;
}

class QuestionableQuestingPlugin implements Plugin.PluginBase {
    id = 'QuestionableQuesting';
    name = 'Questionable Questing';
    icon = 'https://forum.questionablequesting.com/favicon.ico';
    site = 'https://forum.questionablequesting.com/';
    version = '3.0.0';

    private headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://forum.questionablequesting.com/',
    };

    private forums: ForumConfig[] = [
        { title: 'Creative Writing', forum: 19 },
        { title: 'Questing', forum: 20 },
        { title: 'NSFW Creative Writing', forum: 29 },
        { title: 'NSFW Questing', forum: 12 },
    ];

    private expandUrl(path: string): string {
        const cleanPath = path.replace(/^\/threads\//, '').replace(/\/$/, '');
        return `${this.site}threads/${cleanPath}`;
    }

    async popularNovels(page: number, options: Plugin.FilterOptions): Promise<Plugin.NovelItem[]> {
        // Default to the first forum category (Creative Writing) or selected filter
        const forumId = this.forums[0].forum;
        const url = `${this.site}forums/.${forumId}/page-${page}/`;
        
        const result = await fetchApi(url, { headers: this.headers });
        const html = await result.text();

        return this.parseNovelsList(html);
    }

    parseNovelsList(html: string): Plugin.NovelItem[] {
        const novels: Plugin.NovelItem[] = [];
        let tempNovel: Partial<Plugin.NovelItem> = {};
        let state = ParsingState.Idle;
        let isTitleAnchor = false;

        const parser = new Parser({
            onopentag(name, attribs) {
                const classes = attribs['class'] || '';
                if (classes.includes('structItem--thread')) {
                    state = ParsingState.InNovelItem;
                    tempNovel = {};
                }
                if (state !== ParsingState.InNovelItem) return;

                if (name === 'div' && classes.includes('structItem-title')) {
                    isTitleAnchor = true;
                } else if (name === 'a' && isTitleAnchor && attribs['href']) {
                    tempNovel.path = attribs['href'];
                } else if (name === 'img' && classes.includes('structItem-cell--icon') && !tempNovel.cover) {
                    if (attribs['src']) {
                        tempNovel.cover = attribs['src'].startsWith('http') ? attribs['src'] : 'https://forum.questionablequesting.com' + attribs['src'];
                    }
                }
            },
            ontext(text) {
                if (state === ParsingState.InNovelItem && isTitleAnchor) {
                    const trimmed = text.trim();
                    if (trimmed) {
                        tempNovel.name = (tempNovel.name || '') + trimmed;
                    }
                }
            },
            onclosetag(name) {
                if (name === 'div' && isTitleAnchor) {
                    isTitleAnchor = false;
                }
                if (name === 'div' && state === ParsingState.InNovelItem) {
                    if (tempNovel.path && tempNovel.name) {
                        novels.push({
                            name: tempNovel.name.trim(),
                            path: tempNovel.path,
                            cover: tempNovel.cover || '',
                        });
                    }
                    state = ParsingState.Idle;
                }
            },
        });

        parser.write(html);
        parser.end();
        return novels;
    }

    async parseNovel(novelPath: string): Promise<Plugin.SourceNovel> {
        const fullUrl = `${this.expandUrl(novelPath)}/threadmarks?per_page=200`;
        const result = await fetchApi(fullUrl, { headers: this.headers });
        const html = await result.text();

        const novel: Partial<Plugin.SourceNovel> = {
            path: novelPath,
            chapters: [],
        };

        let titleParts: string[] = [];
        let authorParts: string[] = [];
        let chapters: Plugin.ChapterItem[] = [];
        let state = ParsingState.Idle;
        let isStructTitle = false;
        let currentChapter: Partial<Plugin.ChapterItem> = {};

        const parser = new Parser({
            onopentag(name, attribs) {
                const classes = attribs['class'] || '';
                if (classes.includes('p-title-value')) {
                    state = ParsingState.InTitle;
                } else if (classes.includes('username') && !novel.author) {
                    state = ParsingState.InAuthor;
                } else if (classes.includes('structItem') && classes.includes('js-inlineTarget')) {
                    state = ParsingState.InChapterItem;
                    currentChapter = {};
                } else if (state === ParsingState.InChapterItem && name === 'div' && classes.includes('structItem-title')) {
                    isStructTitle = true;
                } else if (state === ParsingState.InChapterItem && isStructTitle && name === 'a' && attribs['href']) {
                    currentChapter.path = attribs['href'];
                }
            },
            ontext(text) {
                const trimmed = text.trim();
                if (state === ParsingState.InTitle) {
                    titleParts.push(text);
                } else if (state === ParsingState.InAuthor && trimmed && !novel.author) {
                    authorParts.push(trimmed);
                } else if (state === ParsingState.InChapterItem && isStructTitle && trimmed) {
                    currentChapter.name = (currentChapter.name || '') + trimmed;
                }
            },
            onclosetag(name) {
                if (name === 'h1' && state === ParsingState.InTitle) {
                    novel.name = titleParts.join('').trim();
                    state = ParsingState.Idle;
                } else if (name === 'a' && state === ParsingState.InAuthor) {
                    if (authorParts.length > 0) {
                        novel.author = authorParts[0];
                    }
                    state = ParsingState.Idle;
                } else if (name === 'div' && isStructTitle) {
                    isStructTitle = false;
                } else if (name === 'div' && state === ParsingState.InChapterItem) {
                    if (currentChapter.path && currentChapter.name) {
                        chapters.push({
                            name: currentChapter.name.trim(),
                            path: currentChapter.path,
                            releaseDate: new Date().toISOString(),
                        });
                    }
                    state = ParsingState.Idle;
                }
            },
        });

        parser.write(html);
        parser.end();

        novel.name = novel.name || 'Unknown Title';
        novel.author = novel.author || 'Unknown Author';
        novel.chapters = chapters;

        return novel as Plugin.SourceNovel;
    }

    async parseChapter(chapterPath: string): Promise<string> {
        const fullUrl = chapterPath.startsWith('http') ? chapterPath : this.site + chapterPath.replace(/^\//, '');
        const result = await fetchApi(fullUrl, { headers: this.headers });
        const html = await result.text();

        let bodyHtmlParts: string[] = [];
        let capturing = false;
        const targetId = chapterPath.includes('#') ? chapterPath.split('#')[1] : '';

        const parser = new Parser({
            onopentag(name, attribs) {
                const classes = attribs['class'] || '';
                const id = attribs['id'] || '';

                if (targetId && id === 'js-' + targetId.replace('post-', '')) {
                    capturing = true;
                } else if (!targetId && classes.includes('bbWrapper')) {
                    capturing = true;
                }

                if (capturing && classes.includes('bbWrapper')) {
                    capturing = true;
                }

                if (capturing) {
                    let tag = `<${name}`;
                    for (const attr in attribs) {
                        tag += ` ${attr}="${attribs[attr]}"`;
                    }
                    tag += '>';
                    bodyHtmlParts.push(tag);
                }
            },
            ontext(text) {
                if (capturing) bodyHtmlParts.push(text);
            },
            onclosetag(name) {
                if (capturing) {
                    bodyHtmlParts.push(`</${name}>`);
                }
            },
        });

        parser.write(html);
        parser.end();

        return bodyHtmlParts.join('') || '<p>Content unavailable.</p>';
    }

    async searchNovels(searchTerm: string): Promise<Plugin.NovelItem[]> {
        const url = `${this.site}search/1/?q=${encodeURIComponent(searchTerm)}&t=post&c[child_nodes]=1&c[nodes][0]=19&c[threadmark_categories][0]=1&c[title_only]=1&o=relevance&g=1`;
        const result = await fetchApi(url, { headers: this.headers });
        const body = await result.text();

        const novels: Plugin.NovelItem[] = [];
        let tempNovel: Partial<Plugin.NovelItem> = {};
        let state = ParsingState.Idle;
        let isRowTitle = false;

        const parser = new Parser({
            onopentag(name, attribs) {
                const classes = attribs['class'] || '';
                if (classes.includes('contentRow')) {
                    state = ParsingState.InNovelItem;
                    tempNovel = {};
                }
                if (state !== ParsingState.InNovelItem) return;

                if (name === 'div' && classes.includes('contentRow-title')) {
                    isRowTitle = true;
                } else if (name === 'a' && isRowTitle && attribs['href']) {
                    tempNovel.path = attribs['href'];
                }
            },
            ontext(text) {
                if (state === ParsingState.InNovelItem && isRowTitle) {
                    const trimmed = text.trim();
                    if (trimmed) {
                        tempNovel.name = (tempNovel.name || '') + trimmed;
                    }
                }
            },
            onclosetag(name) {
                if (name === 'div' && isRowTitle) {
                    isRowTitle = false;
                }
                if (name === 'div' && state === ParsingState.InNovelItem) {
                    if (tempNovel.path && tempNovel.name) {
                        novels.push({
                            name: tempNovel.name.trim(),
                            path: tempNovel.path,
                            cover: '',
                        });
                    }
                    state = ParsingState.Idle;
                }
            },
        });

        parser.write(body);
        parser.end();

        return novels;
    }
}

enum ParsingState {
    Idle,
    InNovelItem,
    InTitle,
    InAuthor,
    InChapterItem,
}

export default new QuestionableQuestingPlugin();
