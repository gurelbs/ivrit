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
exports.lyrics = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const CATCH = new Map();
function lyrics(song) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = [];
        const err = `לא מצאתי מילים לשיר ${song}`;
        const url = `https://www.google.com/search?q=${song}+lyrics&hl=iw`;
        if (CATCH.has(url))
            return CATCH.get(url);
        const browser = yield puppeteer_1.default.launch({ args: ['--no-sandbox'], headless: false });
        const context = yield browser.createIncognitoBrowserContext();
        const page = yield context.newPage();
        try {
            yield page.goto(url);
            yield page.$('.kp-hc h2');
            yield page.$('[data-attrid="subtitle"]');
            yield page.$('[data-lyricid]');
            const result = yield page.evaluate(() => ({
                songName: (document === null || document === void 0 ? void 0 : document.querySelector('.kp-hc h2')).innerText,
                singer: (document === null || document === void 0 ? void 0 : document.querySelector('[data-attrid="subtitle"]')).innerText,
                lyric: (document === null || document === void 0 ? void 0 : document.querySelector('[data-lyricid]')).innerText,
            }));
            const translateBtn = yield page.$('g-raised-button');
            let translate;
            if (translateBtn) {
                yield page.click('g-raised-button');
                yield page.waitForSelector('.yf');
                translate = yield page.evaluate(() => ({
                    translateLyrics: (document === null || document === void 0 ? void 0 : document.querySelector('.yf')).innerText,
                }));
            }
            translate ? res.push(Object.assign(Object.assign({}, result), translate)) : res.push(result);
            CATCH.set(url, res);
            return res;
        }
        catch (error) {
            console.log(error);
        }
        finally {
            yield page.close();
            yield context.close();
            yield browser.close();
        }
    });
}
exports.lyrics = lyrics;
//# sourceMappingURL=lyrics.js.map