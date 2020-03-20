import router from "./router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { getToken } from '@/utils/authority'
import getPageTitle from "@/utils/get-page-title"

// import { Message } from "ant-design-vue"

NProgress.configure({ showSpinner: false, easing: 'ease', speed: 500, trickle: false })

const whiteList = ["/login", "/", "/about"]

router.beforeEach((to, from, next) => {
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  // auth token
  const hasToken = getToken()
  if (hasToken) {
    // has token
    next()
    NProgress.done()
  } else {
    // not has token
    if (whiteList.includes(to.path)) {
      next()
      NProgress.done()
    }else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
  // Messages.Error("test router beforeEach")
})


router.afterEach(() => {
  NProgress.done()
})

