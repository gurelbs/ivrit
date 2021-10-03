<h1 align="center">Welcome to Ivrit 👋</h1>
<h4><code>* Currently this is just a beta version</code></h4>
<p>
  <a href="https://www.npmjs.com/package/ivrit" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/hets.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> open-source engine with API for Real-time questions In Hebrew.

## Installation

```sh
npm i ivrit
```
## Import

```sh

import { 
  news, 
  lyrics,
  quickAnswer,
  webPageClone
} from "ivrit";
# or 
const { news } = require("ivrit");
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

// quickAnswer('סרטים של קוונטין טרנטינו').then(data => console.log(data[0].answer.movies[0]));
// quickAnswer('מה השעה בטורונטו').then(console.log);
// quickAnswer('מתי השקיעה בירושלים מחרתיים').then(console.log);
// quickAnswer('מה המרחק לירח').then(console.log);
// quickAnswer('עשרת שפות התכנות המבוקשות ביותר').then(console.log);
// quickAnswer('כמה זה 1000 פחות 450').then(console.log);
// quickAnswer('ביטקוין לדולר').then(console.log);
// quickAnswer('נלסון מנדלה').then(console.log);
// quickAnswer(`מי האיש הכי עשיר בעולם?`).then(console.log);

```

## Author

👤 **Gurel Ben Shabat**

* Website: https://github.com/gurelbs
* Github: [@gurelbs](https://github.com/gurelbs)
* LinkedIn: [@gurelbs](https://linkedin.com/in/gurelbs)

## Show your support

Give a ⭐️ if this project helped you!