import puppeteer from 'puppeteer';

export interface CatDetails {
  breed: string;
  origin: string;
  image: string;
}
export type Err = undefined | unknown;

const CATCH = new Map();

export async function getCatsBreeds(): Promise<any> {
  let res: any, err: Err;
  const url = 'https://en.wikipedia.org/wiki/List_of_cat_breeds';
  if (CATCH.has(url)) return CATCH.get(url);

  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.goto(url);
    const wikitable = await page.$('body .wikitable');
    if (wikitable) {
      await page.waitForSelector('body .wikitable');
      res = await page.evaluate(() =>
        [...document.querySelectorAll('.wikitable tbody tr')].map((el) => ({
          breed: el.querySelector('a')?.innerHTML,
          wiki: el.querySelector('a')?.href,
          origin: el.querySelector('td')?.innerText,
          image: el.querySelector('img')?.src,
        })),
      );
    } else return err;
    await context.close();
    if (res) {
      CATCH.set(url, res);
      return res;
    }
  } catch (error) {
    console.log(error);
    return err;
  }
}
