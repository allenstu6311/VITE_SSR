import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  ssr: {
    // 是否打包ssr所有的依賴
    noExternal: process.env.NODE_ENV === "production" ? true : [],
  },
});
