/**
 * 用於測試後端處理前端ssr設定
 */
import express from "express";
import { render } from "./dist/server/entry-server.js"; // 这是你 SSR 构建的入口文件
import fs from "fs";
import path from "path";

const app = express();

// http請求到/assets時會走到後面的路徑
app.use("/assets", express.static(path.resolve("dist/client/assets")));

app.get("*", async (req, res, next) => {
  try {
    // SSG
    const hasSsgField = path.resolve(`dist/client/ssg${req.url}/index.html`);
    if (fs.existsSync(hasSsgField)) {
      console.log("ssg");
      return res.sendFile(hasSsgField);
    }

    // public
    if (req.url.indexOf(".") > -1) {
      console.log("public");
      return next();
    }

    // SSR
    console.log("ssr");
    const template = fs.readFileSync(
      path.resolve("dist/client/index.html"),
      "utf-8"
    );
    // 调用 `render(req.url)`，用当前请求的 URL 进行渲染
    const { html } = await render(req.url);
    const responseHtml = template.replace("<!--ssr-outlet-->", html);
    res.status(200).set({ "Content-Type": "text/html" }).send(responseHtml);
  } catch (err) {
    console.log("err", err);
  }
});

// 静态资源处理
app.use(express.static(path.resolve("dist/client")));

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
