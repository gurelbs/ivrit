<h1 align="center">Welcome to hets 👋</h1>
<h4><code>* Currently this is just a beta version</code></h4>
<p>
  <a href="https://www.npmjs.com/package/hets" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/hets.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> open-source engine with API for Real-time questions In Hebrew.

## Installation

```sh
npm i hets
```
## Import

```sh

import { news } from "hets";
# or 
const { news } = require("hets");
```
## Usage

### news
```sh

news().then(console.log) 
// recent top news

news('קורונה').then(console.log) 
// recent news about 'קורונה'

news(['הייטק','ביטקוין']).then(console.log) 
// recent news about 'הייטק' & 'ביטקוין' 

news('donald trump','en').then(console.log) 
// 100 recent news about 'donald trump' in English 

```
### quickAnswer
```sh

quickAnswer('מי האיש הגבוה בעולם?').then(console.log) 
// answers: [
  {
    answer:"סולטן קוסן",
    fullAnswer: "סולטן קוסן, האיש הגבוה בעולם, שמתנשא ל-2.51 מטרים, נפגש בפירמידות במצרים עם ג'יוטי אמג'י, האישה הנמוכה בעולם, שגובהה 62.8 סנטימטרים בלבד. השניים הצטלמו במקום לקמפיין לעידוד התיירות במצרים.",
    origin: "https://www.ynet.co.il/articles/0,7340,L-5076826,00.html",
    time: "28 בינו׳ 2018"
  }
]

news('קורונה').then(console.log) 
// recent news about 'קורונה'

news(['הייטק','ביטקוין']).then(console.log) 
// recent news about 'הייטק' & 'ביטקוין' 

news('donald trump','en').then(console.log) 
// 100 recent news about 'donald trump' in English 

```

## Author

👤 **Gurel Ben Shabat**

* Website: https://github.com/gurelbs
* Github: [@gurelbs](https://github.com/gurelbs)
* LinkedIn: [@gurelbs](https://linkedin.com/in/gurelbs)

## Show your support

Give a ⭐️ if this project helped you!