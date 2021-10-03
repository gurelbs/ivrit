import puppeteer from 'puppeteer';
export async function WebPageClone(url: string): Promise<string | undefined> {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url);
    const content = await page.content();
    await browser.close();
    return content;
  } catch (error) {
    console.log(error);
  }
}
 