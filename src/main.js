import Vue from "vue";
import App from "./App.vue";

//引入路由规则
import router from "@/router/router";
//引入Vuex仓库
import store from "@/store";
//引入封装好的ELementUI
import "@/utils/element/index";
//引入引入echarts
import Echarts from "@/assets/js/echarts.min";
//引入css初始化样式
import "@/assets/css/initialize.css";
//引入字体图标css
import "@/assets/iconfont/iconfont.css";
//引入自适应js
import "@/assets/js/self_adaption";


Vue.config.productionTip = false;

new Vue({
  store,
  router,
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$Echarts = Echarts;
  },
  render: h => h(App)
}).$mount("#app");
