// vite.config.js
import { defineConfig } from "file:///C:/Users/User/Desktop/test/VITE_SSR/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/User/Desktop/test/VITE_SSR/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path, { resolve } from "path";
import ViteCompressionPlugin from "file:///C:/Users/User/Desktop/test/VITE_SSR/node_modules/vite-plugin-compression/dist/index.mjs";
import { nodePolyfills } from "file:///C:/Users/User/Desktop/test/VITE_SSR/node_modules/vite-plugin-node-polyfills/dist/index.js";
import viteImagemin from "file:///C:/Users/User/Desktop/test/VITE_SSR/node_modules/vite-plugin-imagemin/dist/index.mjs";

// src/plugins/viteFontminPlugin.js
import Fontmin from "file:///C:/Users/User/Desktop/test/VITE_SSR/node_modules/fontmin/index.js";

// vite.config.js
var __vite_injected_original_dirname = "C:\\Users\\User\\Desktop\\test\\VITE_SSR";
process.browser = true, process.env.BASE_URL = "/";
var vite_config_default = defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "./src"),
        crypto: "crypto-browserify",
        buffer: "buffer"
      }
    },
    define: {
      process,
      global: "globalThis"
    },
    plugins: [
      vue(),
      // commonjs(),
      // nodePolyfills({
      //   // crypto: "crypto",
      //   // buffer: "buffer",
      //   // globals:{
      //   //   process:true
      //   // }
      // }),
      // viteLifecycle(),
      // viteFontminPlugin(),
      // 壓縮模式
      mode === "compress" && ViteCompressionPlugin({
        deleteOriginFile: true
      }),
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false
        },
        optipng: {
          optimizationLevel: 7
        },
        mozjpeg: {
          quality: 100
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4
        },
        svgo: {
          plugins: [
            {
              name: "removeViewBox"
            },
            {
              name: "removeEmptyAttrs",
              active: false
            }
          ]
        }
      })
    ],
    ssr: {
      // 是否打包ssr所有的依賴
      noExternal: process.env.NODE_ENV === "production" ? true : []
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAic3JjL3BsdWdpbnMvdml0ZUZvbnRtaW5QbHVnaW4uanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXERlc2t0b3BcXFxcdGVzdFxcXFxWSVRFX1NTUlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVXNlclxcXFxEZXNrdG9wXFxcXHRlc3RcXFxcVklURV9TU1JcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL1VzZXIvRGVza3RvcC90ZXN0L1ZJVEVfU1NSL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCBwYXRoLCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgVml0ZUNvbXByZXNzaW9uUGx1Z2luIGZyb20gXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiO1xyXG4vLyBpbXBvcnQgY29tbW9uanMgZnJvbSBcIkByb2xsdXAvcGx1Z2luLWNvbW1vbmpzXCI7XHJcbmltcG9ydCB7IG5vZGVQb2x5ZmlsbHMgfSBmcm9tIFwidml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHNcIjtcclxuLy8gaW1wb3J0IHZpdGVMaWZlY3ljbGUgZnJvbSBcIi4vc3JjL3BsdWdpbnMvdml0ZUxpZmVjeWNsZVwiO1xyXG5pbXBvcnQgdml0ZUltYWdlbWluIGZyb20gXCJ2aXRlLXBsdWdpbi1pbWFnZW1pblwiO1xyXG5pbXBvcnQgdml0ZUZvbnRtaW5QbHVnaW4gZnJvbSBcIi4vc3JjL3BsdWdpbnMvdml0ZUZvbnRtaW5QbHVnaW5cIjtcclxuXHJcbnByb2Nlc3MuYnJvd3NlciA9IHRydWUsXHJcbnByb2Nlc3MuZW52LkJBU0VfVVJMID0gJy8nXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICBcIkBcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICAgICAgY3J5cHRvOiBcImNyeXB0by1icm93c2VyaWZ5XCIsXHJcbiAgICAgICAgYnVmZmVyOiBcImJ1ZmZlclwiLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIGRlZmluZToge1xyXG4gICAgICBwcm9jZXNzOnByb2Nlc3MsXHJcbiAgICAgIGdsb2JhbDogXCJnbG9iYWxUaGlzXCIsXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICB2dWUoKSxcclxuICAgICAgLy8gY29tbW9uanMoKSxcclxuICAgICAgLy8gbm9kZVBvbHlmaWxscyh7XHJcbiAgICAgIC8vICAgLy8gY3J5cHRvOiBcImNyeXB0b1wiLFxyXG4gICAgICAvLyAgIC8vIGJ1ZmZlcjogXCJidWZmZXJcIixcclxuICAgICAgLy8gICAvLyBnbG9iYWxzOntcclxuICAgICAgLy8gICAvLyAgIHByb2Nlc3M6dHJ1ZVxyXG4gICAgICAvLyAgIC8vIH1cclxuICAgICAgLy8gfSksXHJcbiAgICAgIC8vIHZpdGVMaWZlY3ljbGUoKSxcclxuICAgICAgLy8gdml0ZUZvbnRtaW5QbHVnaW4oKSxcclxuICAgICAgLy8gXHU1OEQzXHU3RTJFXHU2QTIxXHU1RjBGXHJcbiAgICAgIG1vZGUgPT09IFwiY29tcHJlc3NcIiAmJlxyXG4gICAgICAgIFZpdGVDb21wcmVzc2lvblBsdWdpbih7XHJcbiAgICAgICAgICBkZWxldGVPcmlnaW5GaWxlOiB0cnVlLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICB2aXRlSW1hZ2VtaW4oe1xyXG4gICAgICAgIGdpZnNpY2xlOiB7XHJcbiAgICAgICAgICBvcHRpbWl6YXRpb25MZXZlbDogNyxcclxuICAgICAgICAgIGludGVybGFjZWQ6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3B0aXBuZzoge1xyXG4gICAgICAgICAgb3B0aW1pemF0aW9uTGV2ZWw6IDcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb3pqcGVnOiB7XHJcbiAgICAgICAgICBxdWFsaXR5OiAxMDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbmdxdWFudDoge1xyXG4gICAgICAgICAgcXVhbGl0eTogWzAuOCwgMC45XSxcclxuICAgICAgICAgIHNwZWVkOiA0LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3Znbzoge1xyXG4gICAgICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbmFtZTogXCJyZW1vdmVWaWV3Qm94XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiBcInJlbW92ZUVtcHR5QXR0cnNcIixcclxuICAgICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KSxcclxuICAgIF0sXHJcbiAgICBzc3I6IHtcclxuICAgICAgLy8gXHU2NjJGXHU1NDI2XHU2MjUzXHU1MzA1c3NyXHU2MjQwXHU2NzA5XHU3Njg0XHU0RjlEXHU4Q0Y0XHJcbiAgICAgIG5vRXh0ZXJuYWw6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IHRydWUgOiBbXSxcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbn0pO1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFVzZXJcXFxcRGVza3RvcFxcXFx0ZXN0XFxcXFZJVEVfU1NSXFxcXHNyY1xcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXERlc2t0b3BcXFxcdGVzdFxcXFxWSVRFX1NTUlxcXFxzcmNcXFxccGx1Z2luc1xcXFx2aXRlRm9udG1pblBsdWdpbi5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvVXNlci9EZXNrdG9wL3Rlc3QvVklURV9TU1Ivc3JjL3BsdWdpbnMvdml0ZUZvbnRtaW5QbHVnaW4uanNcIjtpbXBvcnQgRm9udG1pbiBmcm9tIFwiZm9udG1pblwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBSZWFkYWJsZSB9IGZyb20gXCJzdHJlYW1cIjtcclxuXHJcbmZ1bmN0aW9uIHZpdGVGb250bWluUGx1Z2luKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICBhcHBseTogXCJidWlsZFwiLFxyXG4gICAgYXN5bmMgZ2VuZXJhdGVCdW5kbGUoXywgYnVuZGxlKSB7XHJcbiAgICAgIGZvciAoY29uc3QgZmlsZU5hbWUgb2YgT2JqZWN0LmtleXMoYnVuZGxlKSkge1xyXG4gICAgICAgIGlmICgvXFwuKHR0ZnxvdGYpJC9pLnRlc3QoZmlsZU5hbWUpKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbGVOYW1lPT0+IFwiLCBmaWxlTmFtZSk7XHJcbiAgICAgICAgICBjb25zdCBhc3NldCA9IGJ1bmRsZVtmaWxlTmFtZV07XHJcblxyXG4gICAgICAgICAgLy8gYXNzZXQuc291cmNlIFx1NjYyRlx1NUI1N1x1NEY1M1x1NjU4N1x1NEVGNlx1NzY4NFx1NTE4NVx1NUJCOVxyXG4gICAgICAgICAgY29uc3QgZm9udEJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGFzc2V0LnNvdXJjZSk7XHJcbiAgICAgICAgICBjb25zdCBjb21wcmVzc2VkRm9udCA9IGF3YWl0IGNvbXByZXNzRm9udChmb250QnVmZmVyKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29tcHJlc3NlZEZvbnRcIiwgY29tcHJlc3NlZEZvbnQpO1xyXG5cclxuICAgICAgICAgIC8vIFx1NTk4Mlx1Njc5Q1x1NjIxMFx1NTI5Rlx1NTM4Qlx1N0YyOVx1RkYwQ1x1NjZGRlx1NjM2Mlx1NjI1M1x1NTMwNVx1NTQwRVx1NzY4NFx1NUI1N1x1NEY1M1x1NjU4N1x1NEVGNlx1NTE4NVx1NUJCOVxyXG4gICAgICAgICAgaWYgKGNvbXByZXNzZWRGb250KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdEZpbGUoe1xyXG4gICAgICAgICAgICAgIHR5cGU6IFwiYXNzZXRcIixcclxuICAgICAgICAgICAgICBmaWxlTmFtZSxcclxuICAgICAgICAgICAgICBzb3VyY2U6IGNvbXByZXNzZWRGb250LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG5cclxuLy8gXHU1QzA2IEJ1ZmZlciBcdThGNkNcdTYzNjJcdTRFM0FcdTZENDFcclxuZnVuY3Rpb24gYnVmZmVyVG9TdHJlYW0oYnVmZmVyKSB7XHJcbiAgY29uc3Qgc3RyZWFtID0gbmV3IFJlYWRhYmxlKCk7XHJcbiAgc3RyZWFtLnB1c2goYnVmZmVyKTtcclxuICBzdHJlYW0ucHVzaChudWxsKTsgLy8gXHU3RUQzXHU2NzVGXHU2RDQxXHJcbiAgcmV0dXJuIHN0cmVhbTtcclxufVxyXG5cclxuLy8gXHU0RjdGXHU3NTI4IEZvbnRtaW4gXHU1MzhCXHU3RjI5XHU1QjU3XHU0RjUzXHJcbmZ1bmN0aW9uIGNvbXByZXNzRm9udChmb250QnVmZmVyKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGNvbnN0IGZvbnRtaW4gPSBuZXcgRm9udG1pbigpXHJcbiAgICAgIC5zcmMoZm9udEJ1ZmZlcilcclxuICAgICAgLnVzZShGb250bWluLnR0ZjJ3b2ZmMigpKSAvLyBcdThGNkNcdTYzNjJcdTRFM0EgV09GRjIgXHU2ODNDXHU1RjBGXHJcbiAgICAgIC5ydW4oKGVyciwgZmlsZXMpID0+IHtcclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRm9udG1pbiBlcnJvcjpcIiwgZXJyKTtcclxuICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXNvbHZlKGZpbGVzWzBdLmNvbnRlbnRzKTsgLy8gXHU4RkQ0XHU1NkRFXHU1MzhCXHU3RjI5XHU1NDBFXHU3Njg0XHU1QjU3XHU0RjUzXHU1MTg1XHU1QkI5XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdml0ZUZvbnRtaW5QbHVnaW47XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVMsU0FBUyxvQkFBb0I7QUFDcFUsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sUUFBUSxlQUFlO0FBQzlCLE9BQU8sMkJBQTJCO0FBRWxDLFNBQVMscUJBQXFCO0FBRTlCLE9BQU8sa0JBQWtCOzs7QUNQa1UsT0FBTyxhQUFhOzs7QURBL1csSUFBTSxtQ0FBbUM7QUFVekMsUUFBUSxVQUFVLE1BQ2xCLFFBQVEsSUFBSSxXQUFXO0FBRXZCLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsUUFDL0IsUUFBUTtBQUFBLFFBQ1IsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTjtBQUFBLE1BQ0EsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFZSixTQUFTLGNBQ1Asc0JBQXNCO0FBQUEsUUFDcEIsa0JBQWtCO0FBQUEsTUFDcEIsQ0FBQztBQUFBLE1BQ0gsYUFBYTtBQUFBLFFBQ1gsVUFBVTtBQUFBLFVBQ1IsbUJBQW1CO0FBQUEsVUFDbkIsWUFBWTtBQUFBLFFBQ2Q7QUFBQSxRQUNBLFNBQVM7QUFBQSxVQUNQLG1CQUFtQjtBQUFBLFFBQ3JCO0FBQUEsUUFDQSxTQUFTO0FBQUEsVUFDUCxTQUFTO0FBQUEsUUFDWDtBQUFBLFFBQ0EsVUFBVTtBQUFBLFVBQ1IsU0FBUyxDQUFDLEtBQUssR0FBRztBQUFBLFVBQ2xCLE9BQU87QUFBQSxRQUNUO0FBQUEsUUFDQSxNQUFNO0FBQUEsVUFDSixTQUFTO0FBQUEsWUFDUDtBQUFBLGNBQ0UsTUFBTTtBQUFBLFlBQ1I7QUFBQSxZQUNBO0FBQUEsY0FDRSxNQUFNO0FBQUEsY0FDTixRQUFRO0FBQUEsWUFDVjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsS0FBSztBQUFBO0FBQUEsTUFFSCxZQUFZLFFBQVEsSUFBSSxhQUFhLGVBQWUsT0FBTyxDQUFDO0FBQUEsSUFDOUQ7QUFBQSxFQUNGO0FBRUYsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K