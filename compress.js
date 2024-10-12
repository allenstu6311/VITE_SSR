/**
 * ViteCompressionPlugin Test
 */
import express from "express";
import fs from "fs";
import path from "path";
import zlib from "zlib";
import { promisify } from "util";
import { pathToFileURL } from "url";

const app = express();

// 將 zlib.gunzip 轉換成 Promise 格式，方便使用 async/await
const gunzip = promisify(zlib.gunzip);

// 動態解壓並載入模組
async function loadEntryServer() {
  const gzFilePath = path.resolve("./dist/server/entry-server.js.gz");

  if (!fs.existsSync(gzFilePath)) {
    throw new Error("找不到 entry-server.js.gz 檔案");
  }

  // 讀取 .gz 文件內容
  const gzippedData = fs.readFileSync(gzFilePath);
  // 解壓縮
  const buffer = await gunzip(gzippedData);

  // 將解壓後的內容寫入臨時文件
  const tempFilePath = path.resolve("./dist/server/entry-server.temp.js");

  fs.writeFileSync(tempFilePath, buffer);
  // C:\Users\Use\XXX => file:///C:/Users/User/XXX
  const fileUrl = pathToFileURL(tempFilePath).href;

  // 動態導入解壓後的模組(絕對路徑只接受file://格式)
  return import(fileUrl);
}

// 初始化伺服器
async function startServer() {
  try {
    const { render } = await loadEntryServer();

    // 靜態資源處理
    app.use("/assets", (req, res, next) => {
      // 檢查是否存在對應的 .gz 文件
      const gzFilePath = path.resolve(`dist/client/assets${req.url}.gz`);

      if (fs.existsSync(gzFilePath)) {
        // 如果找到 .gz 文件，設置 Content-Encoding 並返回壓縮的文件
        res.setHeader("Content-Encoding", "gzip");
        res.setHeader(
          "Content-Type",
          req.url.endsWith(".js") ? "application/javascript" : "text/css"
        );

        return res.sendFile(gzFilePath);
      }

      // 如果沒有 .gz 文件或不是 .js 文件的請求，使用 express.static
      express.static(path.resolve("dist/client/assets"))(req, res, next);
    });
    // app.use("/assets", express.static(path.resolve("dist/client/assets")));

    app.get(/\..+$/, express.static(path.resolve("dist/client")));

    // 主路由處理
    app.get("*", async (req, res) => {
      try {
        // SSG
        const hasSsgField = path.resolve(
          `dist/client/ssg${req.url}/index.html`
        );
        if (fs.existsSync(hasSsgField)) {
          console.log("ssg");
          return res.sendFile(hasSsgField);
        }

        const template = fs.readFileSync(
          path.resolve("dist/client/index.html"),
          "utf-8"
        );
        const { html } = await render(req.url);
        console.log("ssr");
        const responseHtml = template.replace("<!--ssr-outlet-->", html);

        res.status(200).set({ "Content-Type": "text/html" }).send(responseHtml);
      } catch (err) {
        console.error("SSR 渲染錯誤:", err);
        res.status(500).send("伺服器內部錯誤，請稍後再試");
      }
    });

    // 啟動伺服器
    app.listen(3000, () => {
      console.log("伺服器已啟動：http://localhost:3000");
    });
  } catch (err) {
    console.error("伺服器初始化錯誤:", err);
  }
}

startServer();
