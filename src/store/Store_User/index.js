/*
* 用户状态管理小仓库
* */

//登陆接口
import { get_User_Login, get_Userinfo } from "@/axios/userAPI/api";
import { Message } from "element-ui";
import router from "@/router/router";

export default {
  namespaced: true,  //开启命名空间
  state: {
    stacked: true,
    // 头部导航栏
    navdata: [
      //
      {
        id: "1",
        name: "首页",
        path: "/home"
      },
      {
        id: "2",
        name: "分类",
        path: "/classify"
      },
      {
        id: "3",
        name: "排行榜",
        path: "/rankinglist"
      },
      {
        id: "4",
        name: "网站论坛",
        path: "/forum"
      },
      {
        id: "5",
        name: "原创投稿",
        path: "/contribute"
      },
      {
        id: "6",
        name: "我是作家",
        path: "/writer"
      },
      {
        id: "7",
        name: "营销合作",
        path: "/cooperation"
      },
      {
        id: "8",
        name: "联系我们",
        path: "/contactway"
      }
    ],
    //  用户信息
    userinfo: {
      user_Id: "",
      user_Name: "",
      user_Nickname: "",
      user_Mobile: "",
      user_Pic: "",
      user_Mailbox: "",
      user_IsVIP: "",
      user_Sex: "",
      user_points: "",
      user_jurisdiction: ""
    }
  },
  getters: {},
  mutations: {
    //  退出登陸
    exit_Login(state, value) {
      state.userinfo = {};
      localStorage.clear("token");
      Message({
        type: "warning",
        message: "退出登陆成功"
      });
      router.replace({
        name: "login"
      });
    }
  },
  actions: {
    async get_User_Login(state, value) {
      if (value.password === "") return Message({
        type: "warning",
        message: "请输入密码"
      });
      if (value.verificationCode === "" || value.verificationCode !== value.random_number) return Message({
        type: "warning",
        message: "请输入正确的验证码"
      });
      let userInfo = await get_User_Login({ user_Mobile: value.mobile, user_Password: value.password });
      if (userInfo.status != "0") return Message({
        type: "error",
        message: "登陆失败，请重新登陆"
      });
      localStorage.token = `${userInfo.token}`;

    },

    //  获取用户信息
    async get_Userinfo(state) {

      if (localStorage.token.length === "0") return;
      try {
        let userData = await get_Userinfo();
        state.state.userinfo.user_Id = userData.data.user_Id;
        state.state.userinfo.user_Name = userData.data.user_Name;
        state.state.userinfo.user_Nickname = userData.data.user_Nickname;
        state.state.userinfo.user_Mobile = userData.data.user_Mobile;
        state.state.userinfo.user_Pic = userData.data.user_Pic;
        state.state.userinfo.user_Mailbox = userData.data.user_Mailbox;
        state.state.userinfo.user_IsVIP = userData.data.user_IsVIP;
        if (userData.data.user_Sex == "1") {
          state.state.userinfo.user_Sex = "男";
        } else if (userData.data.user_Sex == "0") {
          state.state.userinfo.user_Sex = "女";
        }
        state.state.userinfo.user_points = userData.data.user_points;
        state.state.userinfo.user_jurisdiction = userData.data.user_jurisdiction;
        if (userData.data.user_jurisdiction=='1') {
          router.replace({name:'home'})
        }else {
          router.replace({name:'backstage'})
        }
      } catch (err) {
        Message({
          type: "warning",
          message: "获取用户数据失败，请重新登陆"
        });
      }

    }
  }
};