
/**
 * 需要在componentMap註冊組件
 * 
 * 因為需要能夠支援ssg產出靜態檔案，
 * 所以不能import vue檔案，NodeJS
 * 不能解析.vue檔案
 */
export const routes = [
  { path: "/", name: "home" },
  { path: "/about", name: "about" },
  { path: "/project", name: "project" },
  { path: "/upload", name: "upload" },
  {
    path: "/trade",
    name: "trade",
    // ssg: false,
    children: [
      {
        path: "ex",
        name: "ex",
      },
      {
        path: "co",
        name: "co",
      },
      {
        path: "otc",
        name: "otc",
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    ssg: false,
    name: "404",
  },
];
