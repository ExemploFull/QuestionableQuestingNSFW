"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var htmlparser2_1 = require("htmlparser2");
var fetch_1 = require("@libs/fetch");
var QuestionableQuestingPlugin = /** @class */ (function () {
    function QuestionableQuestingPlugin() {
        this.id = 'QuestionableQuesting';
        this.name = 'Questionable Questing';
        this.icon = 'https://forum.questionablequesting.com/favicon.ico';
        this.site = 'https://forum.questionablequesting.com/';
        this.version = '3.0.0';
        this.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://forum.questionablequesting.com/',
        };
        this.forums = [
            { title: 'Creative Writing', forum: 19 },
            { title: 'Questing', forum: 20 },
            { title: 'NSFW Creative Writing', forum: 29 },
            { title: 'NSFW Questing', forum: 12 },
        ];
    }
    QuestionableQuestingPlugin.prototype.expandUrl = function (path) {
        var cleanPath = path.replace(/^\/threads\//, '').replace(/\/$/, '');
        return "".concat(this.site, "threads/").concat(cleanPath);
    };
    QuestionableQuestingPlugin.prototype.popularNovels = function (page, options) {
        return __awaiter(this, void 0, void 0, function () {
            var forumId, url, result, html;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        forumId = this.forums[0].forum;
                        url = "".concat(this.site, "forums/.").concat(forumId, "/page-").concat(page, "/");
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url, { headers: this.headers })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.text()];
                    case 2:
                        html = _a.sent();
                        return [2 /*return*/, this.parseNovelsList(html)];
                }
            });
        });
    };
    QuestionableQuestingPlugin.prototype.parseNovelsList = function (html) {
        var novels = [];
        var tempNovel = {};
        var state = ParsingState.Idle;
        var isTitleAnchor = false;
        var parser = new htmlparser2_1.Parser({
            onopentag: function (name, attribs) {
                var classes = attribs['class'] || '';
                if (classes.includes('structItem--thread')) {
                    state = ParsingState.InNovelItem;
                    tempNovel = {};
                }
                if (state !== ParsingState.InNovelItem)
                    return;
                if (name === 'div' && classes.includes('structItem-title')) {
                    isTitleAnchor = true;
                }
                else if (name === 'a' && isTitleAnchor && attribs['href']) {
                    tempNovel.path = attribs['href'];
                }
                else if (name === 'img' && classes.includes('structItem-cell--icon') && !tempNovel.cover) {
                    if (attribs['src']) {
                        tempNovel.cover = attribs['src'].startsWith('http') ? attribs['src'] : 'https://forum.questionablequesting.com' + attribs['src'];
                    }
                }
            },
            ontext: function (text) {
                if (state === ParsingState.InNovelItem && isTitleAnchor) {
                    var trimmed = text.trim();
                    if (trimmed) {
                        tempNovel.name = (tempNovel.name || '') + trimmed;
                    }
                }
            },
            onclosetag: function (name) {
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
    };
    QuestionableQuestingPlugin.prototype.parseNovel = function (novelPath) {
        return __awaiter(this, void 0, void 0, function () {
            var fullUrl, result, html, novel, titleParts, authorParts, chapters, state, isStructTitle, currentChapter, parser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fullUrl = "".concat(this.expandUrl(novelPath), "/threadmarks?per_page=200");
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(fullUrl, { headers: this.headers })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.text()];
                    case 2:
                        html = _a.sent();
                        novel = {
                            path: novelPath,
                            chapters: [],
                        };
                        titleParts = [];
                        authorParts = [];
                        chapters = [];
                        state = ParsingState.Idle;
                        isStructTitle = false;
                        currentChapter = {};
                        parser = new htmlparser2_1.Parser({
                            onopentag: function (name, attribs) {
                                var classes = attribs['class'] || '';
                                if (classes.includes('p-title-value')) {
                                    state = ParsingState.InTitle;
                                }
                                else if (classes.includes('username') && !novel.author) {
                                    state = ParsingState.InAuthor;
                                }
                                else if (classes.includes('structItem') && classes.includes('js-inlineTarget')) {
                                    state = ParsingState.InChapterItem;
                                    currentChapter = {};
                                }
                                else if (state === ParsingState.InChapterItem && name === 'div' && classes.includes('structItem-title')) {
                                    isStructTitle = true;
                                }
                                else if (state === ParsingState.InChapterItem && isStructTitle && name === 'a' && attribs['href']) {
                                    currentChapter.path = attribs['href'];
                                }
                            },
                            ontext: function (text) {
                                var trimmed = text.trim();
                                if (state === ParsingState.InTitle) {
                                    titleParts.push(text);
                                }
                                else if (state === ParsingState.InAuthor && trimmed && !novel.author) {
                                    authorParts.push(trimmed);
                                }
                                else if (state === ParsingState.InChapterItem && isStructTitle && trimmed) {
                                    currentChapter.name = (currentChapter.name || '') + trimmed;
                                }
                            },
                            onclosetag: function (name) {
                                if (name === 'h1' && state === ParsingState.InTitle) {
                                    novel.name = titleParts.join('').trim();
                                    state = ParsingState.Idle;
                                }
                                else if (name === 'a' && state === ParsingState.InAuthor) {
                                    if (authorParts.length > 0) {
                                        novel.author = authorParts[0];
                                    }
                                    state = ParsingState.Idle;
                                }
                                else if (name === 'div' && isStructTitle) {
                                    isStructTitle = false;
                                }
                                else if (name === 'div' && state === ParsingState.InChapterItem) {
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
                        return [2 /*return*/, novel];
                }
            });
        });
    };
    QuestionableQuestingPlugin.prototype.parseChapter = function (chapterPath) {
        return __awaiter(this, void 0, void 0, function () {
            var fullUrl, result, html, bodyHtmlParts, capturing, targetId, parser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fullUrl = chapterPath.startsWith('http') ? chapterPath : this.site + chapterPath.replace(/^\//, '');
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(fullUrl, { headers: this.headers })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.text()];
                    case 2:
                        html = _a.sent();
                        bodyHtmlParts = [];
                        capturing = false;
                        targetId = chapterPath.includes('#') ? chapterPath.split('#')[1] : '';
                        parser = new htmlparser2_1.Parser({
                            onopentag: function (name, attribs) {
                                var classes = attribs['class'] || '';
                                var id = attribs['id'] || '';
                                if (targetId && id === 'js-' + targetId.replace('post-', '')) {
                                    capturing = true;
                                }
                                else if (!targetId && classes.includes('bbWrapper')) {
                                    capturing = true;
                                }
                                if (capturing && classes.includes('bbWrapper')) {
                                    capturing = true;
                                }
                                if (capturing) {
                                    var tag = "<".concat(name);
                                    for (var attr in attribs) {
                                        tag += " ".concat(attr, "=\"").concat(attribs[attr], "\"");
                                    }
                                    tag += '>';
                                    bodyHtmlParts.push(tag);
                                }
                            },
                            ontext: function (text) {
                                if (capturing)
                                    bodyHtmlParts.push(text);
                            },
                            onclosetag: function (name) {
                                if (capturing) {
                                    bodyHtmlParts.push("</".concat(name, ">"));
                                }
                            },
                        });
                        parser.write(html);
                        parser.end();
                        return [2 /*return*/, bodyHtmlParts.join('') || '<p>Content unavailable.</p>'];
                }
            });
        });
    };
    QuestionableQuestingPlugin.prototype.searchNovels = function (searchTerm) {
        return __awaiter(this, void 0, void 0, function () {
            var url, result, body, novels, tempNovel, state, isRowTitle, parser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(this.site, "search/1/?q=").concat(encodeURIComponent(searchTerm), "&t=post&c[child_nodes]=1&c[nodes][0]=19&c[threadmark_categories][0]=1&c[title_only]=1&o=relevance&g=1");
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(url, { headers: this.headers })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.text()];
                    case 2:
                        body = _a.sent();
                        novels = [];
                        tempNovel = {};
                        state = ParsingState.Idle;
                        isRowTitle = false;
                        parser = new htmlparser2_1.Parser({
                            onopentag: function (name, attribs) {
                                var classes = attribs['class'] || '';
                                if (classes.includes('contentRow')) {
                                    state = ParsingState.InNovelItem;
                                    tempNovel = {};
                                }
                                if (state !== ParsingState.InNovelItem)
                                    return;
                                if (name === 'div' && classes.includes('contentRow-title')) {
                                    isRowTitle = true;
                                }
                                else if (name === 'a' && isRowTitle && attribs['href']) {
                                    tempNovel.path = attribs['href'];
                                }
                            },
                            ontext: function (text) {
                                if (state === ParsingState.InNovelItem && isRowTitle) {
                                    var trimmed = text.trim();
                                    if (trimmed) {
                                        tempNovel.name = (tempNovel.name || '') + trimmed;
                                    }
                                }
                            },
                            onclosetag: function (name) {
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
                        return [2 /*return*/, novels];
                }
            });
        });
    };
    return QuestionableQuestingPlugin;
}());
var ParsingState;
(function (ParsingState) {
    ParsingState[ParsingState["Idle"] = 0] = "Idle";
    ParsingState[ParsingState["InNovelItem"] = 1] = "InNovelItem";
    ParsingState[ParsingState["InTitle"] = 2] = "InTitle";
    ParsingState[ParsingState["InAuthor"] = 3] = "InAuthor";
    ParsingState[ParsingState["InChapterItem"] = 4] = "InChapterItem";
})(ParsingState || (ParsingState = {}));
exports.default = new QuestionableQuestingPlugin();
