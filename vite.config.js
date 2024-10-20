import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "path";
import ViteCompressionPlugin from "vite-plugin-compression";
// import commonjs from "@rollup/plugin-commonjs";
import { nodePolyfills } from "vite-plugin-node-polyfills";
// import viteLifecycle from "./src/plugins/viteLifecycle";
import viteImagemin from "vite-plugin-imagemin";
import viteFontminPlugin from "./src/plugins/viteFontminPlugin";

process.browser = true,
process.env.BASE_URL = '/'

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        crypto: "crypto-browserify",
        // buffer: "buffer",
      },
    },
    define: {
      process:process,
      global: "globalThis",
    },
    plugins: [
      vue(),
      // commonjs(),
      // nodePolyfills({
      //   crypto: "crypto",
      //   buffer: "buffer",
      // }),
      // viteLifecycle(),
      // viteFontminPlugin(),
      // 壓縮模式
      mode === "compress" &&
        ViteCompressionPlugin({
          deleteOriginFile: true,
        }),
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 100,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: "removeViewBox",
            },
            {
              name: "removeEmptyAttrs",
              active: false,
            },
          ],
        },
      }),
    ],
    ssr: {
      // 是否打包ssr所有的依賴
      noExternal: process.env.NODE_ENV === "production" ? true : [],
    },
  };

});
