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
exports.rqa = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const CATCH = new Map();
function rqa(question) {
    return __awaiter(this, void 0, void 0, function* () {
        if (question.includes('איך אומרים')) {
            question = question.replace('איך אומרים', 'תרגם');
        }
        const url = `https://google.com/search?q=${question}&hl=he`;
        const res = '';
        const err = 'לא מצאתי תשובה ל' + question;
        try {
            const browser = yield puppeteer_1.default.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
                ignoreDefaultArgs: ['--disable-extensions'],
            });
            const context = yield browser.createIncognitoBrowserContext();
            const page = yield context.newPage();
            const content = yield page.content();
            try {
                if (CATCH.has(url))
                    return CATCH.get(url);
                yield page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
            }
            catch (e) {
                console.log(e);
                return err;
            }
            try {
                const descriptionDOM = yield page.$('div[data-attrid="wa:/description"]');
                if (descriptionDOM) {
                    const result = yield page.evaluate(() => ({
                        answer: (document === null || document === void 0 ? void 0 : document.querySelector('div[data-attrid="wa:/description"] span')).innerText,
                        link: (document === null || document === void 0 ? void 0 : document.querySelector('.g.mnr-c.g-blk .g a')).href,
                    }));
                    if (result) {
                        return result.answer;
                    }
                }
            }
            catch (e) {
                console.log(e);
                return err;
            }
            try {
                const kpHeaderDOM = yield page.$('.kp-header');
                if (kpHeaderDOM) {
                    const kpHeader = yield page.evaluate(() => ({
                        answer: (document === null || document === void 0 ? void 0 : document.querySelector('.kp-header')).innerText.replace('/', ': '),
                    }));
                    if (kpHeader && !kpHeader.answer.includes(`תוצאת מידע\n`)) {
                        return kpHeader.answer;
                    }
                }
            }
            catch (e) {
                console.log(e);
                return err;
            }
            try {
                // [...document?.querySelectorAll('.osrp-blk [data-attrid]')].map(x =>x.innerText)
                const osrpBlk = yield page.$('.osrp-blk');
                if (osrpBlk) {
                    const wikiData = yield page.evaluate(() => ({
                        answer: [...document === null || document === void 0 ? void 0 : document.querySelectorAll('.osrp-blk [data-attrid]')]
                            .map((x) => x.innerText.replace(/(תיאור\n|ויקיפדיה|הצגת עוד+|עוד)/g, ''))
                            .filter((x) => x.length)
                            .slice(0, 8),
                    }));
                    if (wikiData) {
                        return wikiData.answer.join('\n');
                    }
                }
            }
            catch (e) {
                console.log(e);
                return err;
            }
            try {
                const moviesDOM = yield page.$('[data-attrid="kc:/people/person:movies"]');
                if (moviesDOM) {
                    const details = yield page.evaluate(() => {
                        return [
                            ...document === null || document === void 0 ? void 0 : document.querySelectorAll('[data-attrid="kc:/people/person:movies"] > div span'),
                        ]
                            .map((x) => x.innerText)
                            .join('')
                            .replace('משוב', '')
                            .replace('/', ': ');
                    });
                    const movies = yield page.evaluate(() => {
                        return [
                            ...document === null || document === void 0 ? void 0 : document.querySelectorAll('[data-attrid="kc:/people/person:movies"] [data-entityname]'),
                        ].map((x) => {
                            var _a;
                            return ({
                                data: x.innerText,
                                img: (_a = x === null || x === void 0 ? void 0 : x.querySelector('img')) === null || _a === void 0 ? void 0 : _a.src,
                            });
                        });
                    });
                    if (details && movies.length > 0) {
                        console.log({
                            answer: {
                                details,
                                movies,
                            },
                        });
                    }
                }
            }
            catch (e) {
                console.log(e);
                return err;
            }
            try {
                const cardSection = yield page.$('.card-section');
                const gCardSection = yield page.$('g-card-section');
                if (cardSection || gCardSection) {
                    if (cardSection) {
                        const details = yield page.evaluate(() => {
                            var _a;
                            return (_a = document === null || document === void 0 ? void 0 : document.querySelector('.card-section')) === null || _a === void 0 ? void 0 : _a.innerText.replace('כתב ויתור ·', '').split('\n').slice(0, 3);
                        });
                        if (details) {
                            return details.join('\n');
                        }
                    }
                    if (gCardSection) {
                        const details = yield page.evaluate(() => {
                            var _a;
                            return (_a = document === null || document === void 0 ? void 0 : document.querySelector('g-card-section [data-attrid]')) === null || _a === void 0 ? void 0 : _a.innerText.replace(' ·הגבלת אחריות', '').split('\n');
                        });
                        if (details) {
                            return details.join('\n');
                        }
                    }
                }
            }
            catch (e) {
                console.log(e);
                return err;
            }
            try {
                const wAnswer = yield page.$('w-answer');
                const wAnswerDesktop = yield page.$('w-answer-desktop');
                if (wAnswer || wAnswerDesktop) {
                    if (wAnswer) {
                        const answer = yield page.evaluate(() => {
                            var _a;
                            return (_a = document === null || document === void 0 ? void 0 : document.querySelector('w-answer')) === null || _a === void 0 ? void 0 : _a.innerText;
                        });
                        if (answer) {
                            return answer;
                        }
                    }
                    if (wAnswerDesktop) {
                        if (res.length === 0) {
                            const answer = yield page.evaluate(() => {
                                var _a;
                                return (_a = document === null || document === void 0 ? void 0 : document.querySelector('w-answer-desktop')) === null || _a === void 0 ? void 0 : _a.innerText;
                            });
                            if (answer) {
                                return answer;
                            }
                        }
                    }
                }
            }
            catch (e) {
                console.log(e);
                return err;
            }
            try {
                const kpHc = yield page.$('.kp-hc h2');
                const subtitle = yield page.$('[data-attrid="subtitle"]');
                const dataLyricid = yield page.$('[data-lyricid]');
                if (dataLyricid && subtitle && kpHc) {
                    const result = yield page.evaluate(() => ({
                        songName: (document === null || document === void 0 ? void 0 : document.querySelector('.kp-hc h2')).innerText,
                        singer: (document === null || document === void 0 ? void 0 : document.querySelector('[data-attrid="subtitle"]')).innerText,
                        lyric: (document === null || document === void 0 ? void 0 : document.querySelector('[data-lyricid]')).innerText,
                    }));
                    const translateBtn = yield page.$('g-raised-button');
                    if (translateBtn) {
                        yield page.click('g-raised-button');
                        yield page.waitForSelector('.yf');
                        const translate = yield page.evaluate(() => ({
                            translateLyrics: (document === null || document === void 0 ? void 0 : document.querySelector('.yf')).innerText,
                        }));
                        if (translate && translate.translateLyrics) {
                            return result.songName + '\n' + result.singer + '\n' + result.lyric + '\n' + translate.translateLyrics;
                        }
                    }
                    else {
                        if (result) {
                            return result.songName + '\n' + result.singer + '\n' + result.lyric;
                        }
                    }
                }
            }
            catch (e) {
                console.log(e);
                return err;
            }
            try {
                const translate = yield page.$('#tw-target-text');
                if (translate) {
                    const result = yield page.evaluate(() => ({
                        translate: (document === null || document === void 0 ? void 0 : document.querySelector('#tw-target-text')).innerText,
                    }));
                    if (result && result.translate) {
                        return result.translate;
                    }
                }
            }
            catch (e) {
                console.log(e);
                return err;
            }
            CATCH.set(url, res);
            yield context.close();
            yield page.close();
            yield browser.close();
            return res ? res : err;
        }
        catch (error) {
            console.log(error);
            return err;
        }
    });
}
exports.rqa = rqa;
//# sourceMappingURL=rqa.js.map