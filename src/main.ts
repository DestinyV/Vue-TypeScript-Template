import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import SvgIcon from "vue-svgicon";

// http://necolas.github.io/normalize.css/ a popular css reset lib
import "normalize.css/normalize.css";

// antd css lib
import "ant-design-vue/dist/antd.css";

// global less style
import "./styles/index.less";

// moment
import moment from "moment";
moment.locale("zh-cn");

// svg icon
Vue.use(SvgIcon, {
  tagName: "svg-icon",
  defaultWidth: "1em",
  defaultHeight: "1em"
});

// permission control
import "./permission";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
