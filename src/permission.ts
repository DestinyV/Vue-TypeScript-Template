import router from "./router"

import NProgress from "nprogress"

// import { Message } from "ant-design-vue"

NProgress.configure({ showSpinner: false })

const whiteList = ['./login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  // Messages.Error("test router beforeEach")
})

