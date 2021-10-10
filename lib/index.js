"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.answer = exports.lyrics = exports.webPageClone = exports.quickAnswer = exports.news = void 0;
var getNews_1 = require("./news/getNews");
Object.defineProperty(exports, "news", { enumerable: true, get: function () { return getNews_1.getNews; } });
var quickAnswer_1 = require("./quickAnswer/quickAnswer");
Object.defineProperty(exports, "quickAnswer", { enumerable: true, get: function () { return quickAnswer_1.quickAnswer; } });
var webPageClone_1 = require("./webPageClone/webPageClone");
Object.defineProperty(exports, "webPageClone", { enumerable: true, get: function () { return webPageClone_1.webPageClone; } });
var lyrics_1 = require("./lyrics/lyrics");
Object.defineProperty(exports, "lyrics", { enumerable: true, get: function () { return lyrics_1.lyrics; } });
var rqa_1 = require("./rqa/rqa");
Object.defineProperty(exports, "answer", { enumerable: true, get: function () { return rqa_1.rqa; } });
//# sourceMappingURL=index.js.map