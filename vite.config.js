import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "path";
import ViteCompressionPlugin from "vite-plugin-compression";
// import commonjs from "@rollup/plugin-commonjs";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        // crypto: "crypto-browserify",
        // buffer: "buffer",
      },
    },
    define: {
      process: {
        version: process.version,
        env: {
          // NODE_DEBUG: false, // 手動設置 NODE_DEBUG 為 false
        },
      },
      global: "globalThis",
    },

    plugins: [
      vue(),
      // commonjs(),
      nodePolyfills({
        crypto: "crypto",
        buffer: "buffer",
      }),
      // 壓縮模式
      mode === "compress" &&
        ViteCompressionPlugin({
          deleteOriginFile: true,
        }),
    ],
    ssr: {
      // 是否打包ssr所有的依賴
      noExternal: process.env.NODE_ENV === "production" ? true : [],
    },
  };
});
