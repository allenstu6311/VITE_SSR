import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "path";
import ViteCompressionPlugin from "vite-plugin-compression"

export default defineConfig(({mode})=>{
  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    plugins: [
      vue(),
      // 壓縮模式
      mode === 'compress' &&
      ViteCompressionPlugin({
        deleteOriginFile: true
      })
    ],
    ssr: {
      // 是否打包ssr所有的依賴
      noExternal: process.env.NODE_ENV === "production" ? true : [],
    },
  }

});
