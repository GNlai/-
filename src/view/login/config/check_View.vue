<template>
  <div class="check">
    <div class="fast">
      <span>------快捷登陆------</span>
      <ul class="fastUl">
        <li class="fastLi iconfont icon-z-weixin"><p>微信登陆</p></li>
        <li class="fastLi iconfont icon-QQ"><p>QQ登陆</p></li>
        <li class="fastLi iconfont icon-tuitetwitter43"><p>迅雷登陆</p></li>
      </ul>
    </div>
    <!-- 条款 -->
    <div class="clause">
      <input
        type="checkbox"
        v-model="isradio"
        @click="is_check"
      />
      <span>
            <!--  -->
            我已阅读并同意
            <router-link to="/agreement">
              <!--  -->
              《惠漫网服务协议》
              <!--  -->
            </router-link>
            以及
            <router-link to="/privacy">
              <!--  -->
              《惠漫网隐私条款》
              <!--  -->
            </router-link>
          </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "check_View",
  data() {
    return {
      isradio: false,
      form: {
        resource: false
      }
    };
  },
  mounted() {

  },
  methods: {
    is_check() {
      this.isradio !== !this.isradio;
      this.$bus.$emit("is_Check", this.isradio);
    }
  }
};
</script>

<style scoped lang="less">
.check {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 100%;
}

// 快捷方式登陆
.fast {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.38rem /* 24/64 */;
  margin-top: 0.31rem /* 20/64 */;
  color: #6666cc;

  .fastUl {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0;
    width: 80%;

    .fastLi {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 0.5rem;
      cursor: pointer;

      &:nth-child(1) {
        color: #75c51a;

        p {
          color: #666666;
          margin: 0;
          font-size: 16px;
          margin-left: 0.08rem /* 5/64 */;
        }
      }

      &:nth-child(2) {
        color: #4babfb;

        p {
          color: #666666;
          margin: 0;
          font-size: 0.25rem /* 16/64 */;
          margin-left: 0.08rem /* 5/64 */;
        }
      }

      &:nth-child(3) {
        color: #4babfb;

        p {
          color: #666666;
          margin: 0;
          font-size: 0.25rem /* 16/64 */;
          margin-left: 0.08rem /* 5/64 */;
        }
      }
    }
  }
}

// 条款
.clause {
  font-size: 0.25rem /* 16/64 */;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

</style>