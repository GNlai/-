<!-- 返回顶部 -->
<template>
  <div>
    <transition name="el-zoom-in-center">
      <div class="memu" ref="memu" v-show="show">
        <ul>
          <!-- 置顶 -->
          <li @click="backtop">
            <span class="iconfont ico">&#xe660;</span>
          </li>
          <!-- 会员 -->
          <li>
            <router-link to="/bookVIP">
              <span class="iconfont ico">&#xe606;</span>
            </router-link>
          </li>
          <!-- 二维码 -->
          <li>
            <span class="iconfont ico">&#xe61a;</span>
            <div class="ewm">
              <img src="@/assets/ewm.jpg" alt="" />
            </div>
          </li>
          <!-- 小程序 -->
          <li>
            <router-link to="/applet">
              <span class="iconfont ico">&#xe619;</span>
            </router-link>
          </li>
          <!-- 合作 -->
          <li>
            <router-link to="/cooperation">
              <span class="iconfont ico">&#xe67e;</span>
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Newbookh5Menu",

  data() {
    return {
      show: false,
      nav: "",
      off: "",
    };
  },

  mounted() {
    this.$bus.$on("wheel", (data) => {
      this.nav = data.off;
      this.off = data.windows;
    });
  },

  methods: {
    backtop() {
      this.animate(window, 0);
      this.show = false;
    },
    // 返回顶部函数
    animate(obj, target, callback) {
      // console.log(callback);  callback = function() {}  调用的时候 callback()
      // 先清除以前的定时器，只保留当前的一个定时器执行
      clearInterval(obj.timer);
      obj.timer = setInterval(function () {
        // 步长值写到定时器的里面
        // 把我们步长值改为整数 不要出现小数的问题
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - window.pageYOffset) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (window.pageYOffset == target) {
          // 停止动画 本质是停止定时器
          clearInterval(obj.timer);
          // 回调函数写到定时器结束里面
          // if (callback) {
          //     // 调用函数
          //     callback();
          // }
          callback && callback();
        }
        // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
        // obj.style.left = window.pageYOffset + step + 'px';
        window.scroll(0, window.pageYOffset + step);
      }, 15);
    },
  },
  beforeDestroy() {
    this.$bus.$off("wheel");
  },
  watch: {
    off() {
      let nav = this.nav;
      if (this.off >= nav) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
  },
};
</script>

<style lang="less">
.RecommendationList {
  display: flex;
  flex-direction: row;
  width: 0.47rem /* 30/64 */;
  margin-top: 1vw;
  transition: all 0.3s;
}
.memu {
  position: fixed;
  right: 0.63rem /* 40/64 */;
  bottom: 20%;
  width: 3vw;
  height: 10vw;
  cursor: pointer;
  z-index: 100;
  ul {
    display: flex;
    flex-direction: column;
    padding: 0;
    height: 12vw;
    justify-content: space-around;
    li {
      position: relative;
      width: 100%;
      height: 3vw;
      line-height: 3vw;
      text-align: center;
      background-color: #ffffff;
      margin-bottom: 0.3vw;
      color: #99cc33;
      opacity: 0.8;
      a {
        color: #99cc33;
      }
      .ico {
        display: block;
        font-size: 1.8vw;
        transition: all 0.3s;
        &:hover {
          transform: scale(1.2);
        }
      }
      &:nth-child(3) {
        .ewm {
          // display: none;
          position: absolute;
          left: -6vw;
          bottom: -1vw;
          width: 5vw;
          height: 5vw;
          z-index: 999;
          transition: all 0.3s;
          opacity: 0;
        }
        &:hover .ewm {
          // display: block;
          opacity: 1;
        }
      }
    }
  }
}
</style>
