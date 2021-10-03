import puppeteer from 'puppeteer';
const CATCH = new Map();

export async function quickAnswer(question: string): Promise<any> {
  const url = `https://google.com/search?q=${question}&hl=he`;
  const res = [];
  const err = 'לא מצאתי תשובה ל' + question;
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  try {
    if (CATCH.has(url)) return CATCH.get(url);
    await page.goto(url);
    const descriptionDOM = await page.$('div[data-attrid="wa:/description"]');
    if (descriptionDOM) {
      const result = await page.evaluate(() => ({
        answer: (document?.querySelector('div[data-attrid="wa:/description"] span') as HTMLElement).innerText,
        link: (document?.querySelector('.g.mnr-c.g-blk .g a') as HTMLLinkElement).href,
      }));
      if (result) {
        res.push(result);
      }
    }
    const kpHeaderDOM = await page.$('.kp-header');
    if (kpHeaderDOM) {
      const kpHeader = await page.evaluate(() => ({
        answer: (document?.querySelector('.kp-header') as HTMLElement).innerText.replace('/', ': '),
      }));
      if (kpHeader && !kpHeader.answer.includes(`תוצאת מידע\n`)) {
        res.push(kpHeader);
      }
    }

    // [...document?.querySelectorAll('.osrp-blk [data-attrid]')].map(x =>x.innerText)
    const osrpBlk = await page.$('.osrp-blk');
    if (osrpBlk) {
      const wikiData = await page.evaluate(() => ({
        answer: [...(document?.querySelectorAll('.osrp-blk [data-attrid]') as NodeListOf<HTMLElement>)]
        .map(x => x.innerText
          .replace(/(תיאור\n|ויקיפדיה|הצגת עוד+|עוד)/g,''))
          .filter(x =>x.length)
          .slice(0,8)
      }));
      if (wikiData) {
        res.push(wikiData);
      }
    }

    const moviesDOM = await page.$('[data-attrid="kc:/people/person:movies"]');
    if (moviesDOM) {
      const details = await page.evaluate(() => {
        return [
          ...(document?.querySelectorAll(
            '[data-attrid="kc:/people/person:movies"] > div span',
          ) as NodeListOf<HTMLElement>),
        ]
          .map((x) => x.innerText)
          .join('')
          .replace('משוב', '')
          .replace('/', ': ');
      });
      const movies = await page.evaluate(() => {
        return [
          ...(document?.querySelectorAll('[data-attrid="kc:/people/person:movies"] [data-entityname]') as NodeListOf<
            HTMLElement | HTMLImageElement
          >),
        ].map((x) => ({
          data: x.innerText,
          img: x?.querySelector('img')?.src,
        }));
      });
      if (details && movies.length > 0) {
        res.push({
          answer: {
            details,
            movies,
          },
        });
      }
    }
    const cardSection = await page.$('.card-section');
    const gCardSection = await page.$('g-card-section');

    if (cardSection || gCardSection) {
      if (cardSection){
        const details = await page.evaluate(() => {
          return (document?.querySelector('.card-section') as HTMLElement)?.innerText.replace('כתב ויתור · ','').split('\n').slice(0,3)
        });
        if (details) {
          res.push({
            answer: details,
          });
        }
      }
      if (gCardSection) {
        const details = await page.evaluate(() => {
          return (document?.querySelector('g-card-section [data-attrid]') as HTMLElement)?.innerText.replace(' ·הגבלת אחריות','').split('\n')
        });
        if (details) {
          res.push({
            answer: details,
          });
        }
      }
    }
    const wAnswer = await page.$('w-answer');
    const wAnswerDesktop = await page.$('w-answer-desktop');
    if (wAnswer || wAnswerDesktop) {
      if (wAnswer) {
        const answer = await page.evaluate(() => {
          return (document?.querySelector('w-answer') as HTMLElement)?.innerText;
        });
        if (answer) {
          res.push({
            answer,
          });
        }
      }
      if (wAnswerDesktop) {
        if(res.length === 0) {
          const answer = await page.evaluate(() => {
            return (document?.querySelector('w-answer-desktop') as HTMLElement)?.innerText;
          });
          if (answer) {
            res.push({
              answer,
            });
          }
        }
      }
    }
    const kpHc = await page.$('.kp-hc h2');
    const subtitle = await page.$('[data-attrid="subtitle"]');
    const dataLyricid = await page.$('[data-lyricid]');
    if (dataLyricid && subtitle && kpHc){
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
    }
    await context.close();
    CATCH.set(url, res);
    return res.length ? res : err;
  } catch (error) {
    // console.log(error);
    return err;
  }
}