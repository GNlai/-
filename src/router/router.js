/*
* 封装路由
*
* */

import Vue from "vue";
import VueRouter from "vue-router";
// 引入路由规则
import routes from "@/router/User_Router";
import stacked from "@/store";

let isLoging = stacked.state.Store_User.stacked;

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const router = new VueRouter({
  linkActiveClass: "option",
  routes
});

export default router;



