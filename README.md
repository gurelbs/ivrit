<h1 align="center">Welcome to Ivrit 馃憢</h1>
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

news('拽讜专讜谞讛').then(console.log) 
// recent news about '拽讜专讜谞讛'

news(['讛讬讬讟拽','讘讬讟拽讜讬谉']).then(console.log) 
// recent news about '讛讬讬讟拽' & '讘讬讟拽讜讬谉' 

news('donald trump','en').then(console.log) 
// 100 recent news about 'donald trump' in English 

```
### quickAnswer
```sh

// quickAnswer('住专讟讬诐 砖诇 拽讜讜谞讟讬谉 讟专谞讟讬谞讜').then(data => console.log(data[0].answer.movies[0]));
// quickAnswer('诪讛 讛砖注讛 讘讟讜专讜谞讟讜').then(console.log);
// quickAnswer('诪转讬 讛砖拽讬注讛 讘讬专讜砖诇讬诐 诪讞专转讬讬诐').then(console.log);
// quickAnswer('诪讛 讛诪专讞拽 诇讬专讞').then(console.log);
// quickAnswer('注砖专转 砖驻讜转 讛转讻谞讜转 讛诪讘讜拽砖讜转 讘讬讜转专').then(console.log);
// quickAnswer('讻诪讛 讝讛 1000 驻讞讜转 450').then(console.log);
// quickAnswer('讘讬讟拽讜讬谉 诇讚讜诇专').then(console.log);
// quickAnswer('谞诇住讜谉 诪谞讚诇讛').then(console.log);
// quickAnswer(`诪讬 讛讗讬砖 讛讻讬 注砖讬专 讘注讜诇诐?`).then(console.log);

```

## Author

馃懁 **Gurel Ben Shabat**

* Website: https://github.com/gurelbs
* Github: [@gurelbs](https://github.com/gurelbs)
* LinkedIn: [@gurelbs](https://linkedin.com/in/gurelbs)

## Show your support

Give a 猸愶笍 if this project helped you!