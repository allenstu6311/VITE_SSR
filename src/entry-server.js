import { renderToString } from "vue/server-renderer";
import { createApp } from "./main";

export async function render(req) {
  const { app, router } = createApp();

  // if (req.indexOf(".") === -1) {
  //   router.push(req); // 请求 url
  //   await router.isReady();
  // } else {
  //   // 有.代表是資源存取不須返回HTML
  //   return { html: null };
  // }
  router.push(req); // 请求 url
  await router.isReady();

  const ctx = {};
  const html = await renderToString(app, ctx);
  // passing SSR context object which will be available via useSSRContext()
  // @vitejs/plugin-vue injects code into a component's setup() that registers
  // itself on ctx.modules. After the render, ctx.modules would contain all the
  // components that have been instantiated during this render call.
  return { html };
}
