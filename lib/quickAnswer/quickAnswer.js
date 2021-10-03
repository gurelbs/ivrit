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
exports.quickAnswer = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const CATCH = new Map();
function quickAnswer(question) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = [];
        const err = 'לא מצאתי תשובה ל' + question;
        try {
            const url = `https://google.com/search?q=${question}&hl=he`;
            if (CATCH.has(url))
                return CATCH.get(url);
            const browser = yield puppeteer_1.default.launch({ args: ['--no-sandbox'] });
            const context = yield browser.createIncognitoBrowserContext();
            const page = yield context.newPage();
            yield page.goto(url);
            const answers = yield page.$('div[data-attrid]');
            if (answers) {
                const result = yield page.evaluate(() => ({
                    answer: (document === null || document === void 0 ? void 0 : document.querySelector('div[data-attrid="wa:/description"] span')).innerText,
                    link: (document === null || document === void 0 ? void 0 : document.querySelector('.g.mnr-c.g-blk .g a')).href
                }));
                res.push(result);
            }
            else
                return err;
            yield context.close();
            CATCH.set(url, res);
            return res;
        }
        catch (error) {
            console.log(error);
            return error;
        }
    });
}
exports.quickAnswer = quickAnswer;
quickAnswer('מי האיש הכי עשיר בעולם').then(console.log);
//# sourceMappingURL=quickAnswer.js.map