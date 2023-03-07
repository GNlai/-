// 漫画数据
import { Message } from "element-ui";
import { post_SlidArr } from "@/axios/userAPI/api";

export default {
  namespaced: true,
  state: {
    // 轮播图
    slidArr: [],
    recArr: [], //推荐
    hotArr: [], //热门推荐
    // 精品推荐
    boutArr: [],
    // 排行榜
    rankingArr: [],
    // 每日推荐
    MonArr: [], //周一
    TuesArr: [], //周二
    WednesArr: [], //周三
    ThursArr: [], //周四
    FriArr: [], //周五
    SatArr: [], //周六
    WeekArr: [] //周日

  },
  getters: {},
  mutations: {},
  actions: {
    async postBookData(state, value) {
      // 接收要获取那个数据库
      let isName = value.you_name;
      // 定义
      let data = state.state;
      let bookData = await post_SlidArr({
        "bookSQL": value.bookSQL
      });
      if (bookData.status !== 0) return Message({
        type: "error",
        message: "系统错误"
      });
      // 赋值
      if (isName == "slidArr") data.slidArr = bookData.data;
      if (isName == "recArr") data.recArr = bookData.data;
      if (isName == "hotArr") data.hotArr = bookData.data;
      if (isName == "boutArr") data.boutArr = bookData.data;
      if (isName == "rankingArr") data.rankingArr = bookData.data;
      if (isName == "MonArr") data.MonArr = bookData.data;
      if (isName == "TuesArr") data.TuesArr = bookData.data;
      if (isName == "WednesArr") data.WednesArr = bookData.data;
      if (isName == "ThursArr") data.ThursArr = bookData.data;
      if (isName == "FriArr") data.FriArr = bookData.data;
      if (isName == "SatArr") data.SatArr = bookData.data;
      if (isName == "WeekArr") data.WeekArr = bookData.data;
      if (isName == "advArr") data.advArr = bookData.data;

    }
  }
};



