import puppeteer from 'puppeteer';

export interface News {
  link: string;
  header: string;
  time: string;
  origin: string;
}
export type Err = undefined | unknown;
export type NewsRes = string | [] | News[] | Err;

const CATCH = new Map();

export async function getNews(term: string | string[], lang: string = 'he'): Promise<NewsRes>{
  let res: NewsRes;
  const isSearch = `search?q=${term}&hl=${lang}`;
  const isTopStories = `topstories?hl=${lang}`;
  const err = `לא מצאתי חדשות על ${term}`;
  const url = `https://news.google.com/${term ? isSearch : isTopStories}`;
  if (CATCH.has(url)) return CATCH.get(url);

  try {
    if (term && typeof term === 'object') {
      if (CATCH.has(url)) return CATCH.get(url);
      const resultArray: News[] = [];
      for (const word of term) {
        const result:any = await getNews(word, lang);
        resultArray.push(result);
      }
      CATCH.set(url, resultArray);
      return resultArray;
    }
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.goto(url);
    const isNews = await page.$('body');
    if (isNews) {
// console.log('found news')
      await page.waitForSelector('body');
      res = await page.evaluate(() =>
      [...document.querySelectorAll('article')].map((article) => ({
          link: article?.parentElement?.querySelector('a')?.href,
          header: article.children[1].textContent,
          time: [...article.children[2].children[0].children].filter((x) => x.tagName === 'TIME')[0]?.textContent,
          origin: article.children[2].children[0].children[1].textContent,
        })),
      );
    } else return err;
    if (res) {
      CATCH.set(url, res);
      await context.close();
      return res;
    }
  } catch (error) {
    return error;
  }
}