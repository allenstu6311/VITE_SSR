export const routes = [
  { path: "/", name: "home" },
  { path: "/about", name: "about" },
  {
    path: "/trade",
    name: "trade",
    ssg: false,
    children: [
      {
        path: "/ex",
        name: "ex",
      },
      {
        path: "/co",
        name: "co",
      },
      {
        path: "/otc",
        name: "otc",
      },
    ],
  },
];
