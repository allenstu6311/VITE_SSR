import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";

import componentMap from "./componentMap";
import { routes as baseRoutes } from "./routes";

const isServer = typeof window === "undefined";

const routes = baseRoutes.map((route) => {
  return {
    ...route,
    component: componentMap[route.name],
  };
});

console.log("routes", routes);

// 使用工廠函數來創建 Router 實例
export function createSSRRouter() {
  return createRouter({
    history: isServer ? createMemoryHistory() : createWebHistory(),
    routes,
  });
}

export default createSSRRouter;
