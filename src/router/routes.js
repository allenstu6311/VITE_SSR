/**
 * 需要在componentMap註冊組件
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
