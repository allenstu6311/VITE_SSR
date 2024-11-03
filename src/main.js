import "./style.css";
import createSSRRouter from "./router";
import { createSSRApp } from "vue";
import App from "./App.vue";
import naive from "naive-ui";
import 'vue-cropperjs/node_modules/cropperjs/dist/cropper.css';
// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
  const app = createSSRApp(App);
  app.use(naive)
  const router = createSSRRouter();
  app.use(router);
  return { app, router };
}
