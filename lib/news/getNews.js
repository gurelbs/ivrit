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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNews = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const CATCH = new Map();
function getNews(term, lang = 'he') {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        const isSearch = `search?q=${term}&hl=${lang}`;
        const isTopStories = `topstories?hl=${lang}`;
        const err = `לא מצאתי חדשות על ${term}`;
        const url = `https://news.google.com/${term ? isSearch : isTopStories}`;
        if (CATCH.has(url))
            return CATCH.get(url);
        try {
            if (term && typeof term === 'object') {
                if (CATCH.has(url))
                    return CATCH.get(url);
                const resultArray = [];
                for (const word of term) {
                    const result = yield getNews(word, lang);
                    resultArray.push(result);
                }
                CATCH.set(url, resultArray);
                return resultArray;
            }
            const browser = yield puppeteer_1.default.launch({ args: ['--no-sandbox'] });
            const context = yield browser.createIncognitoBrowserContext();
            const page = yield context.newPage();
            yield page.goto(url);
            const isNews = yield page.$('body');
            if (isNews) {
                // console.log('found news')
                yield page.waitForSelector('body');
                res = yield page.evaluate(() => [...document.querySelectorAll('article')].map((article) => {
                    var _a, _b, _c;
                    return ({
                        link: (_b = (_a = article === null || article === void 0 ? void 0 : article.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('a')) === null || _b === void 0 ? void 0 : _b.href,
                        header: article.children[1].textContent,
                        time: (_c = [...article.children[2].children[0].children].filter((x) => x.tagName === 'TIME')[0]) === null || _c === void 0 ? void 0 : _c.textContent,
                        origin: article.children[2].children[0].children[1].textContent,
                    });
                }));
            }
            else
                return err;
            if (res) {
                CATCH.set(url, res);
                yield context.close();
                return res;
            }
        }
        catch (error) {
            return error;
        }
    });
}
exports.getNews = getNews;
//# sourceMappingURL=getNews.js.map