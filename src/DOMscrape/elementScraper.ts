import puppeteer from 'puppeteer';

export async function elementScraper(url: string, selector: string): Promise<any> {
  const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector(selector);
  const currentElement = await page.$(selector);
  if (!currentElement) return 'element not found';
  const childElementCount = await page.evaluate((el) => el.childElementCount, currentElement);
  if (childElementCount > 0) {
    const childs = await page.evaluate((el) => [...el.childNodes], currentElement);
    const res = await page.evaluate((el, i) => {
      const result: any = [];
      el.map((child: any) =>
        result.push({
          number: `${++i}`,
          name: child.name,
          childNumber: child.childElementCount,
          innerText: child.innerText,
          innerHTML: child.innerHTML,
          attributes: child.attributes,
          className: child.className,
          id: child.id,
          value: child.value,
          checked: child.checked,
          selected: child.selected,
          disabled: child.disabled,
          type: child.type,
          placeholder: child.placeholder,
          src: child.src,
          href: child.href,
        }),
      );
      return result;
    }, childs);
    return res;
  }
  await browser.close();
}
