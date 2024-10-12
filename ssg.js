import readline from "readline";
import { render } from "./dist/server/entry-server.js";
import fs from "fs";
import path from "path";
import { routes as baseRoutes } from "./src/router/routes.js";

// 創建readline實體
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
    recursionRoute(baseRoutes);
    rl.close();
  } else {
    rl.question("請輸入路徑名稱:", (pathVal) => {
      createFile(pathVal);
      rl.close();
    });
  }
});

/**
 * 生成所有檔案
 * @param {Array} routes 當前路由
 */
function recursionRoute(routes, parent) {
  for (let i = 0; i < routes.length; i++) {
    // ssg false
    if (routes[i].ssg === false) continue;
    const child = routes[i].children;
    if (child) {
      recursionRoute(child, routes[i].path);
    } else {
      let currPath = routes[i].path;
      // 404 handle
      if (routes[i].path === "/:pathMatch(.*)*") {
        currPath = `/${routes[i].name}`;
      }
      createFile(parent ? `${parent}/${currPath}` : currPath);
    }
  }
}

/**
 * 生成檔案
 * @param {String} pathVal 路徑(ex:/about,/test...)
 */
async function createFile(pathVal) {
  const template = fs.readFileSync(
    path.resolve("dist/client/index.html"),
    "utf-8"
  );

  const { html } = await render(pathVal);
  if (!html) {
    console.log("查無此路徑");
    return;
  }

  // console.log("html", html);

  const responseHtml = template.replace("<!--ssr-outlet-->", html);
  const outputPath = `dist/client/ssg${pathVal}`;

  // 生成檔案名稱
  const filePath = path.join(
    outputPath,
    // `${pathVal.substring(1) || "index"}.html`
    `index.html`
  );

  // 創建ssg資料夾
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  // 寫入內容
  fs.writeFileSync(filePath, responseHtml);
}
