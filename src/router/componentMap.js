import Home from "../view/Home.vue";
import About from "../view/About.vue";
import Project from "../view/Project.vue";
import ex from "../view/trade/ex.vue";
import co from "../view/trade/co.vue";
import otc from "../view/trade/otc.vue";
import notFound from "../view/404.vue";

const componentMap = {
  home: Home,
  about: About,
  project: Project,
  ex: ex,
  co: co,
  otc: otc,
  404: notFound,
};

export default componentMap;
