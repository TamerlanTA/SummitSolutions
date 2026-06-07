import { chromium } from "playwright-core";

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});

const viewports = [
  ["desktop", 1920, 1080],
  ["laptop", 1366, 768],
  ["mobile390", 390, 844],
  ["mobile430", 430, 932],
];

const results = [];

for (const [name, width, height] of viewports) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.screenshot({ path: `.ui-check-${name}-hero.png`, fullPage: false });

  const base = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    bodyWidth: document.body.scrollWidth,
    heroText: [...document.querySelectorAll("section:first-of-type h1 span")].map((el) => {
      const r = el.getBoundingClientRect();
      return { text: el.textContent, left: r.left, right: r.right, width: r.width };
    }),
    viewport: { w: innerWidth, h: innerHeight },
  }));

  await page.locator("#safety").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const safety = await page.evaluate(() => {
    const sec = document.querySelector("#safety");
    const h = sec?.querySelector("h2")?.getBoundingClientRect();
    const cards = [...(sec?.querySelectorAll(".group.p-6") || [])].map((el) => {
      const r = el.getBoundingClientRect();
      return {
        left: r.left,
        right: r.right,
        top: r.top,
        bottom: r.bottom,
        text: el.querySelector("h3")?.textContent,
      };
    });
    const overlaps = cards.filter(
      (c) => h && !(h.right <= c.left || h.left >= c.right || h.bottom <= c.top || h.top >= c.bottom),
    );
    return {
      heading: h ? { left: h.left, right: h.right, top: h.top, bottom: h.bottom, width: h.width } : null,
      cards,
      overlaps,
    };
  });

  await page.locator("#cases").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const cases = await page.evaluate(() => {
    const section = document.querySelector("#cases");
    const cards = [...(section?.querySelectorAll("[data-case-card]") || [])];
    const second = cards[1];
    if (!second) return null;
    const cardRect = second.getBoundingClientRect();
    const metaRows = [...second.querySelectorAll("[data-case-meta-row]")].map((row) => {
      const label = row.querySelector("[data-case-meta-label]")?.getBoundingClientRect();
      const value = row.querySelector("[data-case-meta-value]")?.getBoundingClientRect();
      return {
        label: label ? { left: label.left, right: label.right, top: label.top, bottom: label.bottom } : null,
        value: value ? { left: value.left, right: value.right, top: value.top, bottom: value.bottom } : null,
      };
    });
    const badRows = metaRows.filter(
      (row) =>
        row.label &&
        row.value &&
        (row.value.left < row.label.right || row.value.right > cardRect.right || row.label.left < cardRect.left),
    );
    return {
      card: { left: cardRect.left, right: cardRect.right, top: cardRect.top, bottom: cardRect.bottom },
      metaRows,
      badRows,
    };
  });

  const problemEls = await page.evaluate(() =>
    [...document.querySelectorAll("h1,h2,h3,p,a,button,span")]
      .map((el) => {
        const r = el.getBoundingClientRect();
        return {
          text: (el.textContent || "").trim().slice(0, 50),
          left: r.left,
          right: r.right,
          top: r.top,
          bottom: r.bottom,
        };
      })
      .filter((x) => x.text && (x.left < -2 || x.right > innerWidth + 2))
      .slice(0, 20),
  );

  await page.screenshot({ path: `.ui-check-${name}-safety.png`, fullPage: false });
  results.push({ name, width, height, base, safety, cases, problemEls });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
