"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lyrics = exports.WebPageClone = exports.quickAnswer = exports.news = void 0;
var getNews_1 = require("./news/getNews");
Object.defineProperty(exports, "news", { enumerable: true, get: function () { return getNews_1.getNews; } });
var quickAnswer_1 = require("./quickAnswer/quickAnswer");
Object.defineProperty(exports, "quickAnswer", { enumerable: true, get: function () { return quickAnswer_1.quickAnswer; } });
var WebPageClone_1 = require("./WebPageClone/WebPageClone");
Object.defineProperty(exports, "WebPageClone", { enumerable: true, get: function () { return WebPageClone_1.WebPageClone; } });
var lyrics_1 = require("./lyrics/lyrics");
Object.defineProperty(exports, "lyrics", { enumerable: true, get: function () { return lyrics_1.lyrics; } });
//# sourceMappingURL=index.js.map