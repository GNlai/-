<template>
  <!--  后台首页-->
  <div class="back">
    <div class="top">
      <div class="logo">
        <el-image :src="url"></el-image>
      </div>
      <!-- 搜索 -->
      <div class="send">
        <input
          type="text"
          placeholder="请输入..."
          autofocus="autofocus"
          v-model="seek"
        />
        <span class="el-icon-search" @click="search"></span>
      </div>
      <div class="right">
        <!-- 后台功能 -->
        <div class="ico">
          <span class="el-icon-message" title="站内消息"></span>
          <span class="el-icon-location" title="问题定位"></span>
          <span class="el-icon-moon" title="夜间模式"></span>
        </div>
        <!-- 用户信息 -->
        <div class="userInfo">
          <el-popover
            placement="bottom-start"
            width="200"
            trigger="hover"
            @show="NoLoader"
          >
            <div
              class="data"
              style="display: flex; flex-direction: column"
              v-loading="loading"
            >
              <div class="username">
                {{ getUser_Info.user_Name }}
              </div>
              <div class="userdata">
                <span class="el-icon-user"></span>
                <span>个人中心</span>
              </div>
              <div class="userdata usertwo">
                <span class="el-icon-s-promotion"></span>
                <span>提交漏洞</span>
              </div>
              <div class="userdata" @click="crearLogin('back')">
                <span class="el-icon-switch-button"></span>
                <span>退出登陆</span>
              </div>
            </div>
            <!-- 头像 -->
            <el-image :src="getUser_Info.user_Pic" slot="reference"></el-image>
            <!--  -->
          </el-popover>
        </div>
      </div>
    </div>
    <div class="aside">
      <div class="left">
        <el-menu
          :default-active="cent[0].path"
          class="el-menu-vertical-demo"
          :router="true"
          background-color="#669999"
          text-color="#fffabd"
          active-text-color="#FF0033"
          :unique-opened="false"
          open="1"
          @open="handleOpen"
        >
          <el-menu-item :index="cent[0].path">
            <i :class="cent[0].ico" class="iconfont ico"></i>
            <span slot="title">{{ cent[0].name }}</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i
                :class="cent[1].ico"
                class="iconfont ico"
                style="color: #cccc99"
              ></i>
              <span>{{ cent[1].name }}</span></template
            >
            <el-menu-item
              v-for="item in cent[1].childer"
              :key="item.id"
              :index="item.path"
            >
              <i :class="item.ico" class="iconfont ico"></i>
              {{ item.names }}
            </el-menu-item>
          </el-submenu>

          <el-menu-item :index="cent[2].path">
            <i :class="cent[2].ico" class="iconfont ico"></i>
            <span slot="title">{{ cent[2].name }}</span>
          </el-menu-item>
          <el-menu-item :index="cent[3].path">
            <i :class="cent[3].ico" class="iconfont ico"></i>
            <span slot="title">{{ cent[3].name }}</span>
          </el-menu-item>
          <el-menu-item :index="cent[4].path">
            <i :class="cent[4].ico" class="iconfont ico"></i>
            <span slot="title">{{ cent[4].name }}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="rightf">
        <router-view name="back"></router-view>
      </div>
    </div>
  </div>
</template>

<script>

import { mapMutations, mapState } from "vuex";

export default {
  name: "backstage_View",
  data() {
    return {
      url: require("@/assets/logo.png"),
      seek: "",
      loading: true,
      indexOBJ: "0",
      active: "1",
      cent: [
        {
          id: "01",
          name: "后台首页",
          ico: "icon-biaoqianA01_shouye-01",
          path: "/backstage/index"
        },
        {
          id: "02",
          name: "漫画管理",
          ico: "icon-biaoqiankuozhan_zhuanqu-182",
          path: "/backstage/manage",
          childer: [
            //
            {
              id: "01",
              names: "轮播图",
              path: "/backstage/manage/slides",
              ico: "icon-shijianzhouqi"
            },
            {
              id: "02",
              names: "站长推荐",
              path: "/backstage/manage/original",
              ico: "icon-banquan"
            },
            {
              id: "12",
              names: "热门漫画",
              path: "/backstage/manage/host",
              ico: "icon-xingnengjisuan"
            },
            {
              id: "03",
              names: "推荐漫画",
              path: "/backstage/manage/nice",
              ico: "icon-huo"
            },
            {
              id: "04",
              names: "排行榜",
              path: "/backstage/manage/ranking",
              ico: "icon-tubiaozhutu"
            },
            {
              id: "05",
              names: "每日更新",
              path: "/backstage/manage/dayUp",
              ico: "icon-shijianchuo"
            },
            {
              id: "06",
              names: "广告赞助",
              path: "/backstage/manage/advertising",
              ico: "icon-renminbi"
            }
          ]
        },
        {
          id: "03",
          name: "漫画审核",
          ico: "icon-biaoqiankuozhan_faxian-161",
          path: "/backstage/audit"
        },
        {
          id: "04",
          name: "用户管理",
          ico: "icon-biaoqiankuozhan_wode-295",
          path: "/backstage/userinfo"
        },
        {
          id: "05",
          name: "用户举报",
          ico: "icon-biaoqiankuozhan_dingyue-133",
          path: "/backstage/informer"
        },
        {
          id: "06",
          name: "用户反馈",
          ico: "icon-biaoqiankuozhan_zhuanqu-182",
          path: "/backstage/feedback"
        },
        {
          id: "07",
          name: "发布公告",
          ico: "icon-biaoqiankuozhan_fenlei-382",
          path: "/backstage/notice"
        }
      ]
    };
  },
  created() {
  },
  mounted() {
    this.Zood();
  },
  computed: {
    ...mapState("Store_User", { getUser_Info: "userinfo" })

  },
  methods: {
    ...mapMutations("Store_User", { get_User_Info: "get_Userinfo" }),
    ...mapMutations("Store_User", { crearLogin: "exit_Login" }),
    search() {
      this.$router.replace({
        name: "search"
      });
    },
    NoLoader() {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    onStyle(index) {
      this.indexOBJ = index;
    },
    Zood() {
      if (this.indexOBJ == 0) {
        this.$router.replace({
          path: "/backstage"
        });
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  watch: {}
};
</script>

<style scoped lang="less">
.back {
  width: 95vw;
  margin: 0 auto;

  .top {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 6vw;
    background-color: #669999;
    color: #ffffc9;
    border-radius: 1vw 1vw 0 0;

    .logo {
      .el-image {
        height: 6vw;
        padding: 0.16rem /* 10/64 */;
        box-sizing: border-box;
      }
    }

    .send {
      position: relative;
      width: 12vw;
      height: 1.8vw;

      input {
        padding-left: 0.5vw;
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 0.5vw;
        outline: none;
        border: 2px solid #e9eef3;
        color: #669999;
        box-sizing: border-box;
      }

      span {
        position: absolute;
        right: 0;
        top: 2px;
        font-size: 1.6vw;
        cursor: pointer;

        &:hover {
          color: #cccc66;
        }
      }
    }

    .right {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      width: 18vw;
      margin-right: 5vw;

      .ico {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        font-size: 2vw;
        width: 10vw;
        color: #cccc99;

        span {
          cursor: pointer;
        }
      }

      .userInfo {
        cursor: pointer;
        width: 4vw;
        height: 4vw;

        .el-image {
          border-radius: 50%;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .aside {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 42vw;
    margin-top: 1vw;

    .left {
      flex: 1;
      background-color: #669999;
      color: #ffffff;
      height: 10.18rem /* 650/64 */;

      .cent {
        li {
          transition: all 0.5s;
          display: flex;
          flex-direction: row;
          align-items: baseline;
          margin-top: 0.8vw;
          font-size: 1.2vw;
          cursor: pointer;

          p {
            margin-left: 0.4vw;

            a {
              color: #ffffff;
            }
          }
        }
      }
    }

    .rightf {
      flex: 6;
      margin-left: 0.8vw;
    }
  }
}

.username {
  font-weight: 600;
  text-align: center;
  height: 2vw;
  line-height: 2vw;

  &:hover {
    cursor: pointer;
  }
}

.userdata {
  height: 2vw;
  width: 100%;
  line-height: 2vw;
  padding-left: 0.5vw;

  &:hover {
    background-color: #e2e2e2;
    cursor: pointer;
    border-radius: 0.3vw;
  }

  span {
    margin-left: 0.3vw;
  }
}

.usertwo {
  margin: 0.8vw 0;
}

.ast {
  background-color: #666699;
  border-radius: 1vw 0 0 1vw;
  transform: translateX(0.5vw);
}
</style>