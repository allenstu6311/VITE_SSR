import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "path";
import fs from "fs-extra";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        ex: path.join(__dirname, "./public/ex-index.html"),
        co: path.join(__dirname, "./public/co-index.html"),
        otc: path.join(__dirname, "./public/otc-index.html"),
        main: path.join(__dirname, "./index.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    vue(),
    {
      name: "replace",
      transformIndexHtml(html) {
        return html.replace("<h1 inline></h1>", " <h1>test</h1>");
      },
    },
    {
      name: "move-public-files-plugin",
      closeBundle() {
        const publicFilePath = resolve(__dirname, "dist/public");
        const targetPath = resolve(__dirname, "dist");

        if (fs.existsSync(publicFilePath)) {
          fs.readdirSync(publicFilePath).forEach(async (file) => {
            if (file.endsWith(".html")) {
              const srcFile = resolve(publicFilePath, file);
              const destFile = resolve(targetPath, file);
              // 移動 public 目錄到 dist 根目錄
              fs.renameSync(srcFile, destFile, { overwrite: true });
            }
          });
          const isPublicEmpty = fs.readdirSync(publicFilePath);

          if (!isPublicEmpty.length) {
            // 刪除public
            fs.removeSync(publicFilePath);
          }
        }
      },
    },
  ],
  ssr: {
    // 是否打包ssr所有的依賴
    noExternal: process.env.NODE_ENV === "production" ? true : [],
  },
});
