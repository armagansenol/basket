import { chromium } from 'playwright';

async function takeScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  const pages = [
    { url: 'http://localhost:3002', name: 'home' },
    { url: 'http://localhost:3002/voice-recorder', name: 'voice-recorder' },
    { url: 'http://localhost:3002/animated-cta-button', name: 'animated-cta-button' },
    { url: 'http://localhost:3002/analytics-card', name: 'analytics-card' },
    { url: 'http://localhost:3002/prevent-bento-item', name: 'prevent-bento-item' },
  ];

  for (const { url, name } of pages) {
    console.log(`Taking screenshot of ${name}...`);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Wait for animations
    await page.screenshot({
      path: `public/screenshots/${name}.png`,
      fullPage: false
    });
    console.log(`✓ Screenshot saved: ${name}.png`);
  }

  await browser.close();
  console.log('\n✓ All screenshots captured!');
}

takeScreenshots().catch(console.error);
