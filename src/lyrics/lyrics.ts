import puppeteer from 'puppeteer';
const CATCH = new Map();
interface Song {
  songName: string;
  singer: string;
  lyric: string;
  translateLyrics: string;
}
export async function lyrics(song: string): Promise<any> {
  const res: Song[] | any = [];
  const err = `לא מצאתי מילים לשיר ${song}`;
  const url = `https://www.google.com/search?q=${song}+lyrics&hl=iw`;
  if (CATCH.has(url)) return CATCH.get(url);
  const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: false });
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  try {
    await page.goto(url);

    await page.$('.kp-hc h2');
    await page.$('[data-attrid="subtitle"]');
    await page.$('[data-lyricid]');

    const result = await page.evaluate(() => ({
      songName: (document?.querySelector('.kp-hc h2') as HTMLElement).innerText,
      singer: (document?.querySelector('[data-attrid="subtitle"]') as HTMLElement).innerText,
      lyric: (document?.querySelector('[data-lyricid]') as HTMLElement).innerText,
    }));
    const translateBtn = await page.$('g-raised-button');
    let translate;
    if (translateBtn) {
      await page.click('g-raised-button');
      await page.waitForSelector('.yf');
      translate = await page.evaluate(() => ({
        translateLyrics: (document?.querySelector('.yf') as HTMLElement).innerText,
      }));

    }

    translate ? res.push({ ...result, ...translate }) : res.push(result);
    CATCH.set(url, res);
    return res;
  } catch (error) {
    console.log(error);
  } finally {
    await page.close();
    await context.close();
    await browser.close();
  }
}