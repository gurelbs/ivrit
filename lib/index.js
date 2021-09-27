"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lyrics = exports.elementScraper = exports.quickAnswer = exports.news = void 0;
var getNews_1 = require("./news/getNews");
Object.defineProperty(exports, "news", { enumerable: true, get: function () { return getNews_1.getNews; } });
var quickAnswer_1 = require("./quickAnswer/quickAnswer");
Object.defineProperty(exports, "quickAnswer", { enumerable: true, get: function () { return quickAnswer_1.quickAnswer; } });
var elementScraper_1 = require("./DOMscrape/elementScraper");
Object.defineProperty(exports, "elementScraper", { enumerable: true, get: function () { return elementScraper_1.elementScraper; } });
var lyrics_1 = require("./lyrics/lyrics");
Object.defineProperty(exports, "lyrics", { enumerable: true, get: function () { return lyrics_1.lyrics; } });
//# sourceMappingURL=index.js.map