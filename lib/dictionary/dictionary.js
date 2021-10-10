"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dictionary = void 0;
exports.dictionary = [
    {
        word: /(תיאור\n|ויקיפדיה|הצגת עוד+|עוד)/g,
        replaceWith: ''
    },
    {
        word: /\b(?<!\.)(?!0+(?:\.0+)?%)(?:\d|[1-9]\d|100)(?:(?<!100)\.\d+)?%.(אהבו את תוכנית הטלוויזיה הזו)/g,
        replaceWith: ''
    },
    {
        word: `לצפייה\nהרשמה\nצפית בזה?\nרשימת צפייה\nכל אפשרויות הצפייה`,
        replaceWith: ''
    },
    {
        word: /(משתמשי Google)/g,
        replaceWith: ''
    },
    {
        word: '\n\n\n',
        replaceWith: ''
    },
    {
        word: 'איך אומרים',
        replaceWith: 'תרגם'
    },
    {
        word: ' ·הגבלת אחריות',
        replaceWith: ''
    },
    {
        word: 'UTC · כתב ויתור',
        replaceWith: ''
    },
    {
        word: `באוק׳`,
        replaceWith: 'באוקטובר'
    },
    {
        word: `בנוב׳`,
        replaceWith: 'בנובמבר'
    },
    {
        word: `בדצמ׳`,
        replaceWith: 'בדצמבר'
    },
    {
        word: `בינו׳`,
        replaceWith: 'בינואר'
    },
    {
        word: `באפר׳`,
        replaceWith: 'באפריל'
    },
    {
        word: `בספט׳`,
        replaceWith: 'בספטמבר'
    },
    {
        word: `משוב`,
        replaceWith: ''
    },
];
//# sourceMappingURL=dictionary.js.map