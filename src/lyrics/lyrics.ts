import puppeteer from 'puppeteer'
const CATCH = new Map();
interface Song {
  songName:string,
  singer:string,
  lyric:string
}
export async function lyrics(song: string): Promise<any> {
  const res: Song[] | any = []
  const err = `לא מצאתי מילים לשיר ${song}`;
  const url = `https://www.google.com/search?q=${song}+lyrics&hl=iw`;
  if (CATCH.has(url)) return CATCH.get(url);
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.goto(url);
    const songName = await page.$('.kp-hc h2');
    const singer = await page.$('div[data-attrid="subtitle"]');
    const songText = await page.$('div[data-lyricid]');
    if (songName || singer || songText) {
      const result = await page.evaluate(() => ({
          songName: document?.querySelector('.kp-hc h2')?.textContent,
          singer: document?.querySelector('div[data-attrid="subtitle"]')?.textContent,
          lyric: document?.querySelector('div[data-lyricid]')?.textContent
      }))
      res.push(result)
    }
    if (res) {
      CATCH.set(url, res);
      await page.close();
      await context.close();
      return res;
    }
  } catch (error) {
    console.log(error);
  }
}
// song name:document.querySelector(".kp-hc h2").innerText
// artist name:document.querySelector("div[data-attrid='subtitle']").innerText
// songtext: document.querySelector('div[data-lyricid]').innerText,
// translate: evaluate.  click document.querySelector("g-raised-button")
// .evalute document.querySelector('div[data-lyricid]').innerText again