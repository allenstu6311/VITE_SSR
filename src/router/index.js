import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";

import componentMap from "./componentMap";
import { routes as baseRoutes } from "./routes";

const isServer = typeof window === "undefined";

const routes = recursionRoute(baseRoutes);

function recursionRoute(routeList) {
  return routeList.map((route) => {
    const newRoute = {
      ...route,
      component: componentMap[route.name] || null, // 根據名稱匹配組件，沒有匹配到則為 null
    };

    // 如果有子路由，遞迴處理
    if (route.children) {
      newRoute.children = recursionRoute(route.children);
    }

    return newRoute;
  });
}

// 使用工廠函數來創建 Router 實例
export function createSSRRouter() {
  return createRouter({
    history: isServer ? createMemoryHistory() : createWebHistory(),
    routes,
  });
}

export default createSSRRouter;
