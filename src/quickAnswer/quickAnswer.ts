import puppeteer from 'puppeteer';
const CATCH = new Map()

export async function quickAnswer(question:string){
  const res = []
  const err = 'לא מצאתי תשובה ל' + question;
  try {
    const url = `https://google.com/search?q=${question}&hl=he`
    if (CATCH.has(url)) return CATCH.get(url)
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const context = await browser.createIncognitoBrowserContext()
    const page = await context.newPage();
    await page.goto(url);
    const answers = await page.$('div[data-attrid]')
    if(answers) {
      const result = await page.evaluate( () => [...document
        .querySelectorAll('div[data-attrid]')]
        .map(x => x?.textContent)
        .filter(x => x && x.length > 0))
      res.push(result)
    } else return err
    await context.close();
    CATCH.set(url, res)
    return res
  } catch (error) {
    console.log(error);
    return error
  }
}