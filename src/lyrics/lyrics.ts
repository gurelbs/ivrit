import puppeteer from 'puppeteer'
const CATCH = new Map();
export async function lyrics(song: string): Promise<any> {
  let res:any;
  const err = `לא מצאתי מילים לשיר ${song}`;
  const url = `https://www.google.com/search?q=${song}%20lyrics&hl=iw`;
  if (CATCH.has(url)) return CATCH.get(url);
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.goto(url);
    const songName = await page.$('.kp-hc h2');
    const artistName = await page.$('div[data-attrid="subtitle"]');
    const songText = await page.$('div[data-lyricid]');
    if (songName && artistName && songText) {
      res = [];
      await page.evaluate(() => {
        return res.push({
          songName: document?.querySelector('.kp-hc h2')?.textContent,
          artistName: document?.querySelector('div[data-attrid="subtitle"]')?.textContent,
          songText: document?.querySelector('div[data-lyricid]')?.textContent
        })
      })
    }
    if (res) {
      CATCH.set(url, res);
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