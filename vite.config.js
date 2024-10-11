import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "path";
import ViteCompressionPlugin from "vite-plugin-compression"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    vue(),
    ViteCompressionPlugin({
      algorithm: "gzip",
			ext: ".gz",
      deleteOriginFile: true
    })
  ],
  ssr: {
    // 是否打包ssr所有的依賴
    noExternal: process.env.NODE_ENV === "production" ? true : [],
  },
});
