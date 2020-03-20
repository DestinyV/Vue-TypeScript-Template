import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// http://necolas.github.io/normalize.css/ a popular css reset lib
import "normalize.css/normalize.css"

// svg icon
import "./icons"

// permission control 
import "./permission"

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
