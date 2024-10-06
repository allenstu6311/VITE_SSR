import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";

import Home from "../view/Home.vue";
import About from "../view/About.vue";

const isServer = typeof window === "undefined";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/about", name: "about", component: About },
];

// const router = createRouter({
//     history: isServer ? createMemoryHistory() : createWebHistory(),
//     routes,
// })

// 使用工廠函數來創建 Router 實例
export function createSSRRouter() {
  return createRouter({
    history: isServer ? createMemoryHistory() : createWebHistory(),
    routes,
  });
}

export default createSSRRouter;
