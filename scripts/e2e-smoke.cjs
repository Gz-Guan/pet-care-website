const { spawn } = require("child_process");
const http = require("http");
const path = require("path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const nodePath = process.execPath;
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

function waitForServer(url, timeout = 30000) {
  const started = Date.now();

  return new Promise((resolve, reject) => {
    const tick = () => {
      http
        .get(url, (response) => {
          response.resume();
          if (response.statusCode && response.statusCode < 500) {
            resolve();
            return;
          }
          retry();
        })
        .on("error", retry);
    };

    const retry = () => {
      if (Date.now() - started > timeout) {
        reject(new Error(`Timed out waiting for ${url}`));
        return;
      }
      setTimeout(tick, 500);
    };

    tick();
  });
}

(async () => {
  const server = spawn(
    nodePath,
    [nextBin, "dev", "--hostname", "127.0.0.1", "--port", "3000"],
    {
      cwd: root,
      stdio: ["ignore", "pipe", "pipe"],
      shell: false
    }
  );

  let output = "";
  server.stdout.on("data", (chunk) => {
    output += chunk.toString();
  });
  server.stderr.on("data", (chunk) => {
    output += chunk.toString();
  });

  try {
    await waitForServer("http://127.0.0.1:3000");

    const browser = await chromium.launch({
      headless: true,
      executablePath: edgePath
    });
    const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });

    await page.goto("http://127.0.0.1:3000", { waitUntil: "networkidle" });
    const title = await page.title();
    const h1 = await page.locator("h1").textContent();
    const imgCount = await page.locator(".hero-slide img").count();
    const heroLoaded = await page
      .locator(".hero-slide.is-active img")
      .first()
      .evaluate((img) => img.complete && img.naturalWidth > 0);

    await page.locator("select[name=petType]").selectOption("cat");
    await page.locator("select[name=serviceType]").selectOption("spa");
    const estimate = await page.locator(".estimate strong").textContent();

    await page.locator("input[name=name]").fill("测试用户");
    await page.locator("input[name=phone]").fill("13800008888");
    await page.locator("input[name=date]").fill("2026-05-19");
    await page.locator("button[type=submit]").click();
    await page.locator(".toast.show").waitFor({ timeout: 3000 });
    const toast = await page.locator(".toast").textContent();

    await browser.close();

    console.log(
      JSON.stringify(
        { title, h1, imgCount, heroLoaded, estimate, toast },
        null,
        2
      )
    );
  } catch (error) {
    console.error(output);
    throw error;
  } finally {
    server.kill();
  }
})();
