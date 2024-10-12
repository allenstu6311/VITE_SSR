/**
 * ViteCompressionPlugin Test
 */
import express from "express";
import fs from "fs";
import path from "path";
import { getRenderFn } from "./utils.js";

const app = express();

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

app.get(/\..+$/, express.static(path.resolve("dist/client")));

// 主路由處理
app.get("*", async (req, res) => {
  try {
    // SSG
    const hasSsgField = path.resolve(`dist/client/ssg${req.url}/index.html`);
    if (fs.existsSync(hasSsgField)) {
      console.log("ssg");
      return res.sendFile(hasSsgField);
    }

    const template = fs.readFileSync(
      path.resolve("dist/client/index.html"),
      "utf-8"
    );
    const { render } = await getRenderFn();
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
