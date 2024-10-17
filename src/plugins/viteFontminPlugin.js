import Fontmin from "fontmin";
import path from "path";
import { Readable } from "stream";

function viteFontminPlugin() {
  return {
    apply: "build",
    async generateBundle(_, bundle) {
      for (const fileName of Object.keys(bundle)) {
        if (/\.(ttf|otf)$/i.test(fileName)) {
          console.log("fileName==> ", fileName);
          const asset = bundle[fileName];

          // asset.source 是字体文件的内容
          const fontBuffer = Buffer.from(asset.source);
          const compressedFont = await compressFont(fontBuffer);
          console.log("compressedFont", compressedFont);

          // 如果成功压缩，替换打包后的字体文件内容
          if (compressedFont) {
            this.emitFile({
              type: "asset",
              fileName,
              source: compressedFont,
            });
          }
        }
      }
    },
  };
}

// 将 Buffer 转换为流
function bufferToStream(buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null); // 结束流
  return stream;
}

// 使用 Fontmin 压缩字体
function compressFont(fontBuffer) {
  return new Promise((resolve, reject) => {
    const fontmin = new Fontmin()
      .src(fontBuffer)
      .use(Fontmin.ttf2woff2()) // 转换为 WOFF2 格式
      .run((err, files) => {
        if (err) {
          console.error("Fontmin error:", err);
          reject(err);
        } else {
          resolve(files[0].contents); // 返回压缩后的字体内容
        }
      });
  });
}

export default viteFontminPlugin;
