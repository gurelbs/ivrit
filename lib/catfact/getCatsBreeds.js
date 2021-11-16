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
exports.getCatsBreeds = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const CATCH = new Map();
function getCatsBreeds() {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        const err = 'No cats found';
        const url = 'https://en.wikipedia.org/wiki/List_of_cat_breeds';
        if (CATCH.has(url))
            return CATCH.get(url);
        try {
            const browser = yield puppeteer_1.default.launch({ args: ['--no-sandbox'] });
            const context = yield browser.createIncognitoBrowserContext();
            const page = yield context.newPage();
            yield page.goto(url);
            const wikitable = yield page.$('body .wikitable');
            if (wikitable) {
                yield page.waitForSelector('body .wikitable');
                res = yield page.evaluate(() => [...document.querySelectorAll('.wikitable tbody tr')].map((el) => {
                    var _a, _b, _c, _d;
                    return ({
                        breed: (_a = el.querySelector('a')) === null || _a === void 0 ? void 0 : _a.innerHTML,
                        wiki: (_b = el.querySelector('a')) === null || _b === void 0 ? void 0 : _b.href,
                        origin: (_c = el.querySelector('td')) === null || _c === void 0 ? void 0 : _c.innerText,
                        image: (_d = el.querySelector('img')) === null || _d === void 0 ? void 0 : _d.src,
                    });
                }));
            }
            else
                return err;
            yield context.close();
            if (res) {
                CATCH.set(url, res);
                return res;
            }
        }
        catch (error) {
            console.log(error);
            return err;
        }
    });
}
exports.getCatsBreeds = getCatsBreeds;
//# sourceMappingURL=getCatsBreeds.js.map