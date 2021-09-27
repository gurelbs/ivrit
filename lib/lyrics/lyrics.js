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
        const url = `https://www.google.com/search?q=${song}%20lyrics&hl=iw`;
        if (CATCH.has(url))
            return CATCH.get(url);
        try {
            const browser = yield puppeteer_1.default.launch({ args: ['--no-sandbox'] });
            const context = yield browser.createIncognitoBrowserContext();
            const page = yield context.newPage();
            yield page.goto(url);
            const songName = yield page.$('.kp-hc h2');
            const artistName = yield page.$('div[data-attrid="subtitle"]');
            const songText = yield page.$('div[data-lyricid]');
            if (songName && artistName && songText) {
                yield page.evaluate(() => {
                    var _a, _b, _c;
                    return res.push({
                        songName: (_a = document === null || document === void 0 ? void 0 : document.querySelector('.kp-hc h2')) === null || _a === void 0 ? void 0 : _a.textContent,
                        artistName: (_b = document === null || document === void 0 ? void 0 : document.querySelector('div[data-attrid="subtitle"]')) === null || _b === void 0 ? void 0 : _b.textContent,
                        songText: (_c = document === null || document === void 0 ? void 0 : document.querySelector('div[data-lyricid]')) === null || _c === void 0 ? void 0 : _c.textContent
                    });
                });
            }
            if (res) {
                CATCH.set(url, res);
                yield context.close();
                return res;
            }
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.lyrics = lyrics;
// song name:document.querySelector(".kp-hc h2").innerText
// artist name:document.querySelector("div[data-attrid='subtitle']").innerText
// songtext: document.querySelector('div[data-lyricid]').innerText,
// translate: evaluate.  click document.querySelector("g-raised-button")
// .evalute document.querySelector('div[data-lyricid]').innerText again
//# sourceMappingURL=lyrics.js.map