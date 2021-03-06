import puppeteer from 'puppeteer';
const CATCH = new Map();
import { dictionary, Dictionary } from './../dictionary/dictionary';
import { getNews } from './../news/getNews';
function fixedString(q: string, dic: Dictionary[]) {
  for (const { word, replaceWith } of dic) {
    const replaceIt = (typeof word === 'string' && q.includes(word)) || q.match(word);
    if (replaceIt) {
      q = q.replace(word, replaceWith).trim();
    }
  }
  return q;
}
export async function rqa(question: string): Promise<string | undefined> {
  if (question.includes('חדשות')) {
    question = question.replace('חדשות', '');
    const news = await getNews(question);
    return Array.from(news)
      .map(({ header, time, origin, link }: any) => `<div><a href="${link}">${header}\n${origin} - ${time}.</a></div>`)
      .slice(0, 5)
      .join('\n');
  }
  const url: string = `https://google.com/search?q=${question}&hl=he`;
  const res: string = '';
  const err: string = 'לא מצאתי תשובה ל' + question;
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
      ignoreDefaultArgs: ['--disable-extensions'],
    });
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    const content = await page.content();
    try {
      if (CATCH.has(url)) return CATCH.get(url);
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    } catch (e) {
      console.log(e);
      return err;
    }
    try {
      const descriptionDOM = await page.$('div[data-attrid="wa:/description"]');
      if (descriptionDOM) {
        const result = await page.evaluate(() => ({
          answer: (document?.querySelector('div[data-attrid="wa:/description"] span') as HTMLElement).innerText,
          link: (document?.querySelector('.g.mnr-c.g-blk .g a') as HTMLLinkElement).href,
        }));
        if (result) {
          return fixedString(result.answer, dictionary);
        }
      }
    } catch (e) {
      console.log(e);
      return err;
    }
    try {
      const kpHeaderDOM = await page.$('.kp-header');
      if (kpHeaderDOM) {
        const kpHeader = await page.evaluate(() => ({
          answer: (document?.querySelector('.kp-header') as HTMLElement).innerText.replace('/', ': '),
        }));
        if (kpHeader && !kpHeader.answer.includes(`תוצאת מידע\n`)) {
          return fixedString(kpHeader.answer, dictionary);
        }
      }
    } catch (e) {
      console.log(e);
      return err;
    }
    try {
      // [...document?.querySelectorAll('.osrp-blk [data-attrid]')].map(x =>x.innerText)
      const osrpBlk = await page.$('.osrp-blk');
      if (osrpBlk) {
        const wikiData = await page.evaluate(() => ({
          answer: [...(document?.querySelectorAll('.osrp-blk [data-attrid]') as NodeListOf<HTMLElement>)]
            .map((x) => x.innerText)
            .filter((x) => x.length)
            .slice(0, 8),
        }));
        if (wikiData) {
          return fixedString(wikiData.answer.join('\n'), dictionary);
        }
      }
    } catch (e) {
      console.log(e);
      return err;
    }
    try {
      const moviesDOM = await page.$('[data-attrid="kc:/people/person:movies"]');
      if (moviesDOM) {
        const details = await page.evaluate(() => {
          return fixedString(
            [
              ...(document?.querySelectorAll(
                '[data-attrid="kc:/people/person:movies"] > div span',
              ) as NodeListOf<HTMLElement>),
            ]
              .map((x) => x.innerText)
              .join(''),
            dictionary,
          );
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
          console.log({
            answer: {
              details,
              movies,
            },
          });
        }
      }
    } catch (e) {
      console.log(e);
      return err;
    }
    try {
      const cardSection = await page.$('.card-section');
      const gCardSection = await page.$('g-card-section');

      if (cardSection || gCardSection) {
        if (cardSection) {
          const details = await page.evaluate(() => {
            return (document?.querySelector('.card-section') as HTMLElement)?.innerText.split('\n').slice(0, 3);
          });
          if (details) {
            return fixedString(details.join('\n'), dictionary);
          }
        }
        if (gCardSection) {
          const details = await page.evaluate(() => {
            return (document?.querySelector('g-card-section [data-attrid]') as HTMLElement)?.innerText.split('\n');
          });
          if (details) {
            return fixedString(details.join('\n'), dictionary);
          }
        }
      }
    } catch (e) {
      console.log(e);
      return err;
    }
    try {
      const wAnswer = await page.$('w-answer');
      const wAnswerDesktop = await page.$('w-answer-desktop');
      if (wAnswer || wAnswerDesktop) {
        if (wAnswer) {
          const answer = await page.evaluate(() => {
            return (document?.querySelector('w-answer') as HTMLElement)?.innerText;
          });
          if (answer) {
            return fixedString(answer, dictionary);
          }
        }
        if (wAnswerDesktop) {
          if (res.length === 0) {
            const answer = await page.evaluate(() => {
              return (document?.querySelector('w-answer-desktop') as HTMLElement)?.innerText;
            });
            if (answer) {
              return fixedString(answer, dictionary);
            }
          }
        }
      }
    } catch (e) {
      console.log(e);
      return err;
    }
    try {
      const kpHc = await page.$('.kp-hc h2');
      const subtitle = await page.$('[data-attrid="subtitle"]');
      const dataLyricid = await page.$('[data-lyricid]');
      if (dataLyricid && subtitle && kpHc) {
        const result = await page.evaluate(() => ({
          songName: (document?.querySelector('.kp-hc h2') as HTMLElement).innerText,
          singer: (document?.querySelector('[data-attrid="subtitle"]') as HTMLElement).innerText,
          lyric: (document?.querySelector('[data-lyricid]') as HTMLElement).innerText,
        }));
        const translateBtn = await page.$('g-raised-button');
        if (translateBtn) {
          await page.click('g-raised-button');
          await page.waitForSelector('.yf');
          const translate = await page.evaluate(() => ({
            translateLyrics: (document?.querySelector('.yf') as HTMLElement).innerText,
          }));
          if (translate && translate.translateLyrics) {
            const str = result.songName + '\n' + result.singer + '\n' + result.lyric + '\n' + translate.translateLyrics;
            return fixedString(str, dictionary);
          }
        } else {
          if (result) {
            const str = result.songName + '\n' + result.singer + '\n' + result.lyric;
            return fixedString(str, dictionary);
          }
        }
      }
    } catch (e) {
      console.log(e);
      return err;
    }
    try {
      const translate = await page.$('#tw-target-text');
      if (translate) {
        const result = await page.evaluate(() => ({
          translate: (document?.querySelector('#tw-target-text') as HTMLElement).innerText,
        }));
        if (result && result.translate) {
          return fixedString(result.translate, dictionary);
        }
      }
    } catch (e) {
      console.log(e);
      return err;
    }
    CATCH.set(url, res);
    await context.close();
    await page.close();
    await browser.close();
    if (res) {
      console.log(fixedString(res, dictionary));
      return fixedString(res, dictionary);
    } else {
      return err;
    }
  } catch (error) {
    if (typeof error) console.log(error);
    return err;
  }
}
