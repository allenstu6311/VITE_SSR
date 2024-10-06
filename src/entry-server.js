import { renderToString } from "vue/server-renderer";
import { createApp } from "./main";

export async function render(req) {
  const { app, router } = createApp();

  // 有name代表是route的配置，才須返回完整的html
  const name = router.resolve(req).name;
  if (name) {
    router.push(req); // 请求 url
    await router.isReady();
  } else {
    return { html: null };
  }

  const ctx = {};
  const html = await renderToString(app, ctx);
  // passing SSR context object which will be available via useSSRContext()
  // @vitejs/plugin-vue injects code into a component's setup() that registers
  // itself on ctx.modules. After the render, ctx.modules would contain all the
  // components that have been instantiated during this render call.
  return { html };
}
