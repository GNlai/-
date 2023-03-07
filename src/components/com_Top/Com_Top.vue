<template>
  <div class="bookTop">
    <!-- logo -->
    <div class="logo">
      <router-link to="/">
        <el-image :src="logo">
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
      </router-link>
    </div>

    <div class="TopNav">
      <ul class="NavUl">
        <li v-for="data in getnavData" :key="data.id">
          <router-link :to="data.path" class="NavA" active-class="active">
            {{ data.name }}
          </router-link>
        </li>
      </ul>
    </div>

    <div class="search">
      <input
        type="text"
        class="navInput"
        v-model="search"
        placeholder="请输入..."
        @input="targer"
      />
      <!-- 图标 -->
      <div class="ico el-icon-search" ref="ico"></div>
    </div>

    <!-- 登陆与注册 -->
    <div class="login" v-if="!get_UserInfo.user_Mobile">
      <div class="debark">
        <span @click="loging">登陆</span>
      </div>
      <div class="ioc">|</div>
      <div class="register">
        <span>注册</span>
      </div>
    </div>

    <!--    登陆后-->
    <div class="is_User_Login" v-else>
      <el-popover
        placement="bottom"
        width="300"
        trigger="hover"
        visible-arrow
        popper-class="mainS"
      >
        <div class="main">
          <!-- 用户名 -->
          <span class="username">{{ get_UserInfo.user_Nickname }}</span>
          <!-- 积分 -->
          <div class="point">
            <i class="iconfont icon-renminbi ico"></i>
            <span>积分：{{ get_UserInfo.user_points }}</span>
          </div>
          <!-- 用户信息 -->
          <div class="userInfo" @click="getUser">
            <i class="iconfont icon-yonghu ico"></i>
            <span>用户信息</span>
            <i class="iconfont icon-xiangyoujiantou icos"></i>
          </div>
          <!-- 会员中心 -->
          <div class="user_Vip">
            <i class="iconfont icon-huiyuan ico"></i>
            <span>会员中心</span>
            <i class="iconfont icon-xiangyoujiantou icos"></i>
          </div>
          <!-- 举报中心 -->
          <div class="informant_center">
            <i class="iconfont ico icon-xingnengjisuan"></i>
            <span>举报中心</span>
            <i class="iconfont icon-xiangyoujiantou icos"></i>
          </div>
          <!-- 分割线 -->
          <div class="div_hr"></div>
          <!-- 退出登陆 -->
          <div class="removeLogin" @click="exit_Login">
            <i class="iconfont ico icon-shezhi"></i>
            <span>退出登陆</span>
            <i class="iconfont icos icon-xiangyoujiantou icos"></i>
          </div>
        </div>
        <el-image :src="get_UserInfo.user_Pic" slot="reference" ref="image"></el-image>
      </el-popover>
    </div>


  </div>
</template>

<script>
//引入css样式
import "./css/index.less";
//引入Vuex
import { mapMutations, mapState } from "vuex";

export default {
  name: "Com_Top",
  data() {
    return {
      logo: require("@/assets/image/logos.jpg"),
      information: 20,
      targer: null,
      search: null
    };
  },
  computed: {
    ...mapState("Store_User", { getnavData: "navdata" }),
    ...mapState("Store_User", { get_UserInfo: "userinfo" })
  },
  mounted() {
  },
  methods: {
    ...mapMutations("Store_User", { exit_Login: "exit_Login" }),
    //  跳转到登陆界面
    loging() {
      this.$router.push({
        name: "login"
      });
    },
    //跳轉到用戶信息
    getUser() {

    }
  }
};
</script>

<style scoped>

</style>