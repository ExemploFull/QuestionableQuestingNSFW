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
var cheerio_1 = require("cheerio");
var fetch_1 = require("@libs/fetch");
var filterInputs_1 = require("@libs/filterInputs");
var defaultCover_1 = require("@libs/defaultCover");
var ArchiveOfOurOwn = /** @class */ (function () {
    function ArchiveOfOurOwn() {
        this.id = 'archiveofourown';
        this.name = 'Archive Of Our Own';
        this.version = '1.0.4';
        this.icon = 'src/en/ao3/icon.png';
        this.site = 'https://archiveofourown.org/';
        this.filters = {
            sort: {
                value: 'hits',
                label: 'Sort by',
                options: [
                    { label: 'Best Match', value: '_score' },
                    { label: 'Hits', value: 'hits' },
                    { label: 'Kudos', value: 'kudos' },
                    { label: 'Comments', value: 'comments' },
                    { label: 'Bookmarks', value: 'bookmarks' },
                    { label: 'Word Count', value: 'word_count' },
                    { label: 'Date Updated', value: 'revised_at' },
                    { label: 'Date Posted', value: 'created_at' },
                    { label: 'Author', value: 'authors_to_sort_on' },
                    { label: 'Title', value: 'title_to_sort_on' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            sortdir: {
                value: 'desc',
                label: 'Sort direction',
                options: [
                    { label: 'Descending', value: 'desc' },
                    { label: 'Ascending', value: 'asc' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            ratings: {
                value: '',
                label: 'Ratings',
                options: [
                    { label: 'Not Rated', value: '9' },
                    { label: 'General Audiences', value: '10' },
                    { label: 'Teen And Up Audiences', value: '11' },
                    { label: 'Mature', value: '12' },
                    { label: 'Explicit', value: '13' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            language: {
                value: 'en',
                label: 'Language',
                options: [
                    { label: 'None', value: '' },
                    { label: 'af Soomaali', value: 'so' },
                    { label: 'Afrikaans', value: 'afr' },
                    { label: 'Aynu itak | アイヌ イタㇰ', value: 'ain' },
                    { label: 'العربية', value: 'ar' },
                    { label: 'አማርኛ', value: 'amh' },
                    { label: '𓂋𓏺𓈖 𓆎𓅓𓏏𓊖', value: 'egy' },
                    { label: 'ܐܪܡܝܐ | ארמיא', value: 'arc' },
                    { label: 'հայերեն', value: 'hy' },
                    { label: 'American Sign Language', value: 'ase' },
                    { label: 'asturianu', value: 'ast' },
                    { label: 'Bahasa Indonesia', value: 'id' },
                    { label: 'Bahasa Malaysia', value: 'ms' },
                    { label: 'Български', value: 'bg' },
                    { label: 'বাংলা', value: 'bn' },
                    { label: 'Basa Jawa', value: 'jv' },
                    { label: 'Башҡорт теле', value: 'ba' },
                    { label: 'беларуская', value: 'be' },
                    { label: 'Bosanski', value: 'bos' },
                    { label: 'Brezhoneg', value: 'br' },
                    { label: 'Català', value: 'ca' },
                    { label: 'Cebuano', value: 'ceb' },
                    { label: 'Čeština', value: 'cs' },
                    { label: 'Chinuk Wawa', value: 'chn' },
                    { label: 'къырымтатар тили | qırımtatar tili', value: 'crh' },
                    { label: 'Cymraeg', value: 'cy' },
                    { label: 'Dansk', value: 'da' },
                    { label: 'Deutsch', value: 'de' },
                    { label: 'eesti keel', value: 'et' },
                    { label: 'Ελληνικά', value: 'el' },
                    { label: '𒅴𒂠', value: 'sux' },
                    { label: 'English', value: 'en' },
                    { label: 'Eald Englisċ', value: 'ang' },
                    { label: 'Español', value: 'es' },
                    { label: 'Esperanto', value: 'eo' },
                    { label: 'Euskara', value: 'eu' },
                    { label: 'فارسی', value: 'fa' },
                    { label: 'Filipino', value: 'fil' },
                    { label: 'Français', value: 'fr' },
                    { label: 'Friisk', value: 'frr' },
                    { label: 'Furlan', value: 'fur' },
                    { label: 'Gaeilge', value: 'ga' },
                    { label: 'Gàidhlig', value: 'gd' },
                    { label: 'Galego', value: 'gl' },
                    { label: '𐌲𐌿𐍄𐌹𐍃𐌺𐌰', value: 'got' },
                    { label: 'Creolese', value: 'gyn' },
                    { label: '中文-客家话', value: 'hak' },
                    { label: '한국어', value: 'ko' },
                    { label: 'Hausa | هَرْشَن هَوْسَ', value: 'hau' },
                    { label: 'हिन्दी', value: 'hi' },
                    { label: 'Hrvatski', value: 'hr' },
                    { label: 'ʻŌlelo Hawaiʻi', value: 'haw' },
                    { label: 'Interlingua', value: 'ia' },
                    { label: 'isiZulu', value: 'zu' },
                    { label: 'Íslenska', value: 'is' },
                    { label: 'Italiano', value: 'it' },
                    { label: 'עברית', value: 'he' },
                    { label: 'Kalaallisut', value: 'kal' },
                    { label: 'ಕನ್ನಡ', value: 'kan' },
                    { label: 'ქართული', value: 'kat' },
                    { label: 'Kernewek', value: 'cor' },
                    { label: 'ភាសាខ្មែរ', value: 'khm' },
                    { label: 'Khuzdul', value: 'qkz' },
                    { label: 'Kiswahili', value: 'sw' },
                    { label: 'kreyòl ayisyen', value: 'ht' },
                    { label: 'Kurdî | کوردی', value: 'ku' },
                    { label: 'Кыргызча', value: 'kir' },
                    { label: 'Langue des signes québécoise', value: 'fcs' },
                    { label: 'Latviešu valoda', value: 'lv' },
                    { label: 'Lëtzebuergesch', value: 'lb' },
                    { label: 'Lietuvių kalba', value: 'lt' },
                    { label: 'Lingua latina', value: 'la' },
                    { label: 'Magyar', value: 'hu' },
                    { label: 'македонски', value: 'mk' },
                    { label: 'മലയാളം', value: 'ml' },
                    { label: 'Malti', value: 'mt' },
                    { label: 'ᠮᠠᠨᠵᡠ ᡤᡳᠰᡠᠨ', value: 'mnc' },
                    { label: "Mando'a", value: 'qmd' },
                    { label: 'मराठी', value: 'mr' },
                    { label: 'Mikisúkî', value: 'mik' },
                    { label: 'ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ᠌ | Монгол Кирилл үсэг', value: 'mon' },
                    { label: 'မြန်မာဘာသာ', value: 'my' },
                    { label: 'Эрзянь кель', value: 'myv' },
                    { label: 'Nāhuatl', value: 'nah' },
                    { label: '中文-闽南话 臺語', value: 'nan' },
                    { label: 'Nawat', value: 'ppl' },
                    { label: 'Nederlands', value: 'nl' },
                    { label: '日本語', value: 'ja' },
                    { label: 'Norsk', value: 'no' },
                    { label: 'Азәрбајҹан дили | آذربایجان دیلی', value: 'azj' },
                    { label: 'Нохчийн мотт', value: 'ce' },
                    { label: '‘O’odham Ñiok', value: 'ood' },
                    { label: 'لسان عثمانى', value: 'ota' },
                    { label: 'پښتو', value: 'ps' },
                    { label: 'Plattdüütsch', value: 'nds' },
                    { label: 'Polski', value: 'pl' },
                    { label: 'Português brasileiro', value: 'ptBR' },
                    { label: 'Português europeu', value: 'ptPT' },
                    { label: 'ਪੰਜਾਬੀ', value: 'pa' },
                    { label: 'qazaqşa | қазақша', value: 'kaz' },
                    { label: 'Uncategorized Constructed Languages', value: 'qlq' },
                    { label: 'Quenya', value: 'qya' },
                    { label: 'Română', value: 'ro' },
                    { label: 'Русский', value: 'ru' },
                    { label: 'Scots', value: 'sco' },
                    { label: 'Shqip', value: 'sq' },
                    { label: 'Sindarin', value: 'sjn' },
                    { label: 'සිංහල', value: 'si' },
                    { label: 'Slovenčina', value: 'sk' },
                    { label: 'Slovenščina', value: 'slv' },
                    { label: 'Sprēkō Þiudiskō', value: 'gem' },
                    { label: 'Српски', value: 'sr' },
                    { label: 'suomi', value: 'fi' },
                    { label: 'Svenska', value: 'sv' },
                    { label: 'தமிழ்', value: 'ta' },
                    { label: 'татар теле', value: 'tat' },
                    { label: 'te reo Māori', value: 'mri' },
                    { label: 'తెలుగు', value: 'tel' },
                    { label: 'ไทย', value: 'th' },
                    { label: 'Thermian', value: 'tqx' },
                    { label: 'བོད་སྐད་', value: 'bod' },
                    { label: 'Tiếng Việt', value: 'vi' },
                    { label: 'ϯⲙⲉⲧⲣⲉⲙⲛ̀ⲭⲏⲙⲓ', value: 'cop' },
                    { label: 'tlhIngan-Hol', value: 'tlh' },
                    { label: 'toki pona', value: 'tok' },
                    { label: 'Trinidadian Creole', value: 'trf' },
                    { label: 'τσακώνικα', value: 'tsd' },
                    { label: 'ᏣᎳᎩ ᎦᏬᏂᎯᏍᏗ', value: 'chr' },
                    { label: 'Türkçe', value: 'tr' },
                    { label: 'Українська', value: 'uk' },
                    { label: 'اُردُو', value: 'urd' },
                    { label: 'ئۇيغۇر تىلى', value: 'uig' },
                    { label: 'Volapük', value: 'vol' },
                    { label: '中文-吴语', value: 'wuu' },
                    { label: 'יידיש', value: 'yi' },
                    { label: 'maayaʼ tʼàan', value: 'yua' },
                    { label: '中文-广东话 粵語', value: 'yue' },
                    { label: '中文-普通话 國語', value: 'zh' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            completion: {
                value: '',
                label: 'Completion Status',
                options: [
                    { label: 'All works', value: 'checked' },
                    { label: 'Complete works only', value: 'T' },
                    { label: 'Works in progress only', value: 'F' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            crossover: {
                value: '',
                label: 'Crossover Status',
                options: [
                    { label: 'Include crossovers', value: 'checked' },
                    { label: 'Exclude crossovers', value: 'T' },
                    { label: 'Only crossovers', value: 'F' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            categories: {
                value: [],
                label: 'Categories',
                options: [
                    { label: 'F/F', value: '116' },
                    { label: 'F/M', value: '22' },
                    { label: 'Gen', value: '21' },
                    { label: 'M/M', value: '23' },
                    { label: 'Multi', value: '2246' },
                    { label: 'Other', value: '24' },
                ],
                type: filterInputs_1.FilterTypes.CheckboxGroup,
            },
            warningsFilter: {
                value: [],
                label: 'Warnings',
                options: [
                    { label: 'Creator Chose Not To Use Archive Warnings', value: '14' },
                    { label: 'Graphic Depictions Of Violence', value: '17' },
                    { label: 'Major Character Death', value: '18' },
                    { label: 'No Archive Warnings Apply', value: '16' },
                    { label: 'Rape/Non-Con', value: '19' },
                    { label: 'Underage', value: '20' },
                ],
                type: filterInputs_1.FilterTypes.CheckboxGroup,
            },
            singlechap: {
                value: false,
                label: 'Single Chapter Stories',
                type: filterInputs_1.FilterTypes.Switch,
            },
            author: {
                value: '',
                label: 'Author/Artist',
                type: filterInputs_1.FilterTypes.TextInput,
            },
            dateFilter: {
                value: '',
                label: 'Enter single Number only Date',
                type: filterInputs_1.FilterTypes.TextInput,
            },
            dateIncrements: {
                value: 'days+ago',
                label: 'Must choose date type',
                options: [
                    { label: 'Days', value: 'days+ago' },
                    { label: 'Weeks', value: 'weeks+ago' },
                    { label: 'Months', value: 'months+ago' },
                    { label: 'Years', value: 'years+ago' },
                ],
                type: filterInputs_1.FilterTypes.Picker,
            },
            words: {
                value: '',
                label: 'Word Count, exact number eg. 40 or  less than eg. <40 or greater than eg. >40 or range eg. 10-100',
                type: filterInputs_1.FilterTypes.TextInput,
            },
            hits: {
                value: '',
                label: 'Hits',
                type: filterInputs_1.FilterTypes.TextInput,
            },
            bookmarks: {
                value: '',
                label: 'Bookmarks',
                type: filterInputs_1.FilterTypes.TextInput,
            },
            comments: {
                value: '',
                label: 'Comments',
                type: filterInputs_1.FilterTypes.TextInput,
            },
            kudos: {
                value: '',
                label: 'Kudos',
                type: filterInputs_1.FilterTypes.TextInput,
            },
        };
    }
    ArchiveOfOurOwn.prototype.parseNovels = function (loadedCheerio) {
        var novels = [];
        loadedCheerio('li.work').each(function (idx, ele) {
            var _a;
            var novelName = loadedCheerio(ele)
                .find('h4.heading > a')
                .first()
                .text()
                .trim();
            var novelUrl = (_a = loadedCheerio(ele)
                .find('h4.heading > a')
                .first()
                .attr('href')) === null || _a === void 0 ? void 0 : _a.trim();
            if (!novelUrl)
                return;
            var novel = {
                name: novelName,
                cover: defaultCover_1.defaultCover, // No cover image
                path: novelUrl.slice(1),
            };
            novels.push(novel);
        });
        return novels;
    };
    ArchiveOfOurOwn.prototype.popularNovels = function (page_1, _a) {
        return __awaiter(this, arguments, void 0, function (page, _b) {
            var params, link, body, loadedCheerio;
            var showLatestNovels = _b.showLatestNovels, filters = _b.filters;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        params = new URLSearchParams({
                            commit: 'Search',
                            page: page.toString(),
                            'work_search[language_id]': filters.language.value,
                        });
                        if (showLatestNovels) {
                            params.set('work_search[sort_column]', 'revised_at');
                        }
                        else {
                            params.set('work_search[sort_column]', filters.sort.value);
                        }
                        params.set('work_search[sort_direction]', filters.sortdir.value);
                        // we could send in the entire thing without checking for blanks
                        if (filters.completion.value !== '') {
                            params.set('work_search[complete]', filters.completion.value);
                        }
                        if (filters.crossover.value !== '') {
                            params.set('work_search[crossover]', filters.crossover.value);
                        }
                        if (filters.categories.value.length > 0) {
                            filters.categories.value.forEach(function (category) {
                                params.append('work_search[category_ids][]', category);
                            });
                        }
                        if (filters.warningsFilter.value.length > 0) {
                            filters.warningsFilter.value.forEach(function (warning) {
                                params.append('work_search[archive_warning_ids][]', warning);
                            });
                        }
                        if (filters.singlechap.value) {
                            params.set('work_search[single_chapter]', '1');
                        }
                        if (filters.author.value !== '') {
                            params.set('work_search[creators]', filters.author.value);
                        }
                        if (filters.dateFilter.value !== '' &&
                            filters.dateIncrements.value !== '') {
                            params.set('work_search[revised_at]', "".concat(filters.dateFilter.value, " ").concat(filters.dateIncrements.value));
                        }
                        if (filters.words.value !== '') {
                            params.set('work_search[word_count]', filters.words.value);
                        }
                        if (filters.hits.value !== '') {
                            params.set('work_search[hits]', filters.hits.value);
                        }
                        if (filters.bookmarks.value !== '') {
                            params.set('work_search[bookmarks_count]', filters.bookmarks.value);
                        }
                        if (filters.comments.value !== '') {
                            params.set('work_search[comments_count]', filters.comments.value);
                        }
                        if (filters.kudos.value !== '') {
                            params.set('work_search[kudos_count]', filters.kudos.value);
                        }
                        link = "".concat(this.site, "works/search?").concat(params.toString());
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(link).then(function (r) { return r.text(); })];
                    case 1:
                        body = _c.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        return [2 /*return*/, this.parseNovels(loadedCheerio)];
                }
            });
        });
    };
    ArchiveOfOurOwn.prototype.parseNovel = function (novelUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var result, urlchapter, chapters, body, chapterlisttext, chapterlistload, loadedCheerio, novel, summary, fandom, rating, warning, series, relation, character, stats, chapterItems, longReleaseDate, releaseTimeText, releaseTime, dateCounter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)(new URL(novelUrl, this.site).toString())];
                    case 1:
                        result = _a.sent();
                        urlchapter = novelUrl + '/navigate';
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(new URL(urlchapter, this.site).toString())];
                    case 2:
                        chapters = _a.sent();
                        return [4 /*yield*/, result.text()];
                    case 3:
                        body = _a.sent();
                        return [4 /*yield*/, chapters.text()];
                    case 4:
                        chapterlisttext = _a.sent();
                        chapterlistload = (0, cheerio_1.load)(chapterlisttext);
                        loadedCheerio = (0, cheerio_1.load)(body);
                        novel = {
                            path: novelUrl,
                            name: loadedCheerio('h2.title').text().trim() || 'Untitled',
                            cover: defaultCover_1.defaultCover, // No cover image available
                            status: loadedCheerio('dt.status').text().includes('Updated')
                                ? 'Ongoing'
                                : 'Completed',
                            chapters: [],
                        };
                        novel.author = loadedCheerio('a[rel="author"]')
                            .map(function (i, el) { return loadedCheerio(el).text().trim(); })
                            .get()
                            .join(', ');
                        novel.genres = Array.from(loadedCheerio('dd.freeform.tags li a.tag'))
                            .map(function (el) { return loadedCheerio(el).text().trim(); })
                            .join(',');
                        summary = loadedCheerio('blockquote.userstuff').text().trim();
                        fandom = Array.from(loadedCheerio('dd.fandom.tags li a.tag'))
                            .map(function (el) { return loadedCheerio(el).text().trim(); })
                            .join(',');
                        rating = Array.from(loadedCheerio('dd.rating.tags li a.tag'))
                            .map(function (el) { return loadedCheerio(el).text().trim(); })
                            .join(',');
                        warning = Array.from(loadedCheerio('dd.warning.tags li a.tag'))
                            .map(function (el) { return loadedCheerio(el).text().trim(); })
                            .join(',');
                        series = Array.from(loadedCheerio('dd.series li a.tag'))
                            .map(function (el) { return loadedCheerio(el).text().trim(); })
                            .join(',');
                        relation = Array.from(loadedCheerio('dd.relationship.tags li a.tag'))
                            .map(function (el) { return loadedCheerio(el).text().trim(); })
                            .join(',');
                        character = Array.from(loadedCheerio('dd.character.tags li a.tag'))
                            .map(function (el) { return loadedCheerio(el).text().trim(); })
                            .join(',');
                        stats = Array.from(loadedCheerio('dd.stats li a.tag'))
                            .map(function (el) { return loadedCheerio(el).text().trim(); })
                            .join(',');
                        novel.summary = "Fandom:\n".concat(fandom, "\n\nRating:\n").concat(rating, "\n\nWarning:\n").concat(warning, "\n\nSummary:\n").concat(summary, "\n\nSeries:\n").concat(series, "\n\nRelationships:\n").concat(relation, "\n\nCharacters:\n").concat(character, "\n\nStats:\n").concat(stats);
                        chapterItems = [];
                        longReleaseDate = [];
                        // let match: RegExpExecArray | null;
                        chapterlistload('ol.index').each(function (i, ele) {
                            chapterlistload(ele)
                                .find('li')
                                .each(function (i, el) {
                                // const chapterNameMatch = chapterlistload(el).find('a').text().trim();
                                var releaseTimeText = chapterlistload(el)
                                    .find('span.datetime')
                                    .text()
                                    .replace(/\(([^)]+)\)/g, '$1')
                                    .trim();
                                var releaseTime = releaseTimeText
                                    ? new Date(releaseTimeText).toISOString()
                                    : '';
                                longReleaseDate.push(releaseTime);
                            });
                        });
                        releaseTimeText = loadedCheerio('.wrapper dd.published')
                            .text()
                            .trim();
                        releaseTime = releaseTimeText
                            ? new Date(releaseTimeText).toISOString()
                            : '';
                        dateCounter = 0;
                        if (loadedCheerio('#chapter_index select').length > 0) {
                            loadedCheerio('#chapter_index select').each(function (i, selectEl) {
                                loadedCheerio(selectEl)
                                    .find('option')
                                    .each(function (i, el) {
                                    var _a;
                                    var chapterName = loadedCheerio(el).text().trim();
                                    var chapterUrlCode = (_a = loadedCheerio(el).attr('value')) === null || _a === void 0 ? void 0 : _a.trim();
                                    var chapterUrl = "".concat(novelUrl, "/chapters/").concat(chapterUrlCode);
                                    var releaseDate = longReleaseDate[dateCounter];
                                    dateCounter++;
                                    if (chapterUrl) {
                                        chapterItems.push({
                                            name: chapterName,
                                            path: chapterUrl,
                                            releaseTime: releaseDate,
                                        });
                                    }
                                });
                            });
                        }
                        if (chapterItems.length === 0) {
                            loadedCheerio('#chapters h3.title').each(function (i, titleEl) {
                                var _a, _b;
                                var fullTitleText = loadedCheerio(titleEl).text().trim();
                                var chapterNameMatch = fullTitleText.match(/:\s*(.*)$/);
                                var chapterName = chapterNameMatch ? chapterNameMatch[1].trim() : '';
                                var chapterUrlRaw = (_a = loadedCheerio(titleEl)
                                    .find('a')
                                    .attr('href')) === null || _a === void 0 ? void 0 : _a.trim();
                                var chapterUrlCode = (_b = chapterUrlRaw === null || chapterUrlRaw === void 0 ? void 0 : chapterUrlRaw.match(/\/chapters\/(\d+)/)) === null || _b === void 0 ? void 0 : _b[1];
                                var chapterUrl = "".concat(novelUrl, "/chapters/").concat(chapterUrlCode);
                                if (chapterUrl) {
                                    if (chapterName === '') {
                                        var novelTitle = loadedCheerio('.work .title.heading')
                                            .text()
                                            .trim();
                                        chapterName = novelTitle;
                                    }
                                    chapterItems.push({
                                        name: chapterName,
                                        path: chapterUrl,
                                        releaseTime: releaseTime,
                                    });
                                }
                            });
                            if (chapterItems.length === 0) {
                                loadedCheerio('.work.navigation.actions li a').each(function (i, el) {
                                    var href = loadedCheerio(el).attr('href');
                                    if (href && href.includes('/downloads/')) {
                                        var chapterUrlCodeMatch = href.match(/updated_at=(\d+)/);
                                        var chapterUrlCode = chapterUrlCodeMatch
                                            ? chapterUrlCodeMatch[1]
                                            : null;
                                        var chapterName = loadedCheerio('h2.title.heading').text().trim();
                                        var chapterUrl = "".concat(novelUrl, "/chapters/").concat(chapterUrlCode);
                                        if (chapterUrl) {
                                            if (chapterName === '') {
                                                var novelTitle = loadedCheerio('.work .title.heading')
                                                    .text()
                                                    .trim();
                                                chapterName = novelTitle;
                                            }
                                            chapterItems.push({
                                                name: chapterName,
                                                path: chapterUrl,
                                                releaseTime: releaseTime,
                                            });
                                        }
                                    }
                                });
                            }
                        }
                        novel.chapters = chapterItems;
                        return [2 /*return*/, novel];
                }
            });
        });
    };
    ArchiveOfOurOwn.prototype.parseChapter = function (chapterUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var result, body, loadedCheerio, chapterText;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, fetch_1.fetchApi)(new URL(chapterUrl, this.site).toString())];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.text()];
                    case 2:
                        body = _a.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        loadedCheerio('h3.title').each(function (i, el) {
                            var $h3 = loadedCheerio(el);
                            var $a = $h3.find('a');
                            $a.removeAttr('href');
                            var aText = $a.text().trim();
                            var nextSiblingText = $h3
                                .contents()
                                .filter(function (_, node) { return node.nodeType === 3; })
                                .text()
                                .trim();
                            $h3.html("".concat(aText, "<br>").concat(nextSiblingText));
                        });
                        loadedCheerio('h3.landmark.heading#work').remove();
                        chapterText = loadedCheerio('div#chapters > div').html() || '';
                        return [2 /*return*/, chapterText];
                }
            });
        });
    };
    ArchiveOfOurOwn.prototype.searchNovels = function (searchTerm, page) {
        return __awaiter(this, void 0, void 0, function () {
            var params, searchUrl, result, body, loadedCheerio;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = new URLSearchParams({
                            commit: 'Search',
                            page: page.toString(),
                            'work_search[language_id]': 'en',
                            'work_search[query]': searchTerm,
                        });
                        searchUrl = "".concat(this.site, "works/search?").concat(params.toString());
                        return [4 /*yield*/, (0, fetch_1.fetchApi)(searchUrl)];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.text()];
                    case 2:
                        body = _a.sent();
                        loadedCheerio = (0, cheerio_1.load)(body);
                        return [2 /*return*/, this.parseNovels(loadedCheerio)];
                }
            });
        });
    };
    return ArchiveOfOurOwn;
}());
exports.default = new ArchiveOfOurOwn();
