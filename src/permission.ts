import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/authority";
import setting from "@/settings.ts";

function getPageTitle(pageTitle: string): string {
  if (pageTitle) {
    return `${pageTitle} - ${setting.title}`;
  }
  return `${setting.title}`;
}

import { message } from "ant-design-vue";

NProgress.configure({
  showSpinner: false,
  easing: "ease",
  speed: 500,
  trickle: false
});

const whiteList = ["/login", "/401", "/404"];

router.beforeEach((to, from, next) => {
  NProgress.start();
  // set page title
  document.title = getPageTitle(to.meta.title);
  // auth token
  const hasToken = getToken();
  if (hasToken) {
    // has token
    next();
    NProgress.done();
  } else {
    // not has token
    if (whiteList.includes(to.path)) {
      next();
      NProgress.done();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
  message.success(`成功进入路由${to.path}`);
});

router.afterEach(() => {
  NProgress.done();
});
