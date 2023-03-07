/*
* VueX状态管理
* */
import Vue from "vue";
import Vuex from "vuex";
//引入小仓库
import Store_User from "@/store/Store_User";
import bookData from "@/store/Store_bookData/bookData";

Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    Store_User,
    bookData
  }
});