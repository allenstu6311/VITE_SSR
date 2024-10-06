import readline from "readline";
import { render } from "./dist/server/entry-server.js";
import fs from "fs";
import path from "path";

async function createFile(pathVal) {
  const template = fs.readFileSync(
    path.resolve("dist/client/index.html"),
    "utf-8"
  );

  const { html } = await render(`${pathVal}`);
  if (!html) {
    console.log("查無此路徑");
  }
  const responseHtml = template.replace("<!--ssr-outlet-->", html);

  const outputPath = `dist/ssg${pathVal}`;

  const filePath = path.join(outputPath, `${pathVal.substring(1)}.html`);

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  fs.writeFileSync(filePath, responseHtml);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const services = ["生成全部檔案", "輸入路由名稱以生成指定檔案"];

services.forEach((service, index) => {
  console.log(`${index + 1}. ${service}`);
});

rl.question("請選擇操作 (1 或 2):", (answer) => {
  const choice = parseInt(answer);
  if (choice === 1) {
    rl.close();
  } else {
    rl.question("請輸入路徑名稱:", (pathVal) => {
      createFile(pathVal);
      rl.close();
    });
  }
});
