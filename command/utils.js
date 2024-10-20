/**
 *  # 可嘗試模塊化以下方法
 *  1. 渲染html
 */
import { resolve } from "path";
import fs from "fs";
import zlib from "zlib";
import { pathToFileURL } from "url";

export  async function getRenderFn() {
  const compressJs = resolve("dist/server/entry-server.js.gz");
  const commonJs = resolve("dist/server/entry-server.js");
  let targetJs;

  if (fs.existsSync(compressJs)) {
    const gzData = fs.readFileSync(compressJs);
    const buffer = zlib.gunzipSync(gzData);

    const tempFilePath = resolve("./dist/server/entry-server.temp.js");
    fs.writeFileSync(tempFilePath, buffer);
    targetJs = tempFilePath;

  } else {
    targetJs = commonJs;
  }

  const filePath = pathToFileURL(targetJs).href;
    
  return import(filePath);
}


