<!-- 使用手机号登陆 -->
<template>
  <div class="no_id">
    <input
      type="text"
      placeholder="请输入手机号"
      class="no_idInput"
      v-model="mobile"
      ref="mobile"
      name="user_Mobile"
    />
    <input
      type="password"
      placeholder="请输入密码"
      class="no_idInput"
      v-model="password"
      name="user_Password"
    />
    <div class="verificationCode">
      <input
        type="text"
        placeholder="请输入验证码"
        v-model="verificationCode"
      />
      <span class="verificationCodeSpan" ref="code" :disabled="isClick"
      >发送验证码
      </span>
    </div>

    <!-- 登陆按钮 -->
    <input
      type="button"
      value="点击登陆"
      class="buttonLogin"
      @click="
        MobileLogin({
         mobile,password,verificationCode,random_number
        })
      "
    />
  </div>
</template>

<script>
import { Message } from "element-ui";
import { mapActions } from "vuex";
import { get_User_verification_code } from "@/axios/userAPI/api";

export default {
  name: "Newbookh5NoId",
  props: ["isagree"],
  data() {
    return {
      mobile: "", //手机号
      verificationCode: "", //验证码
      password: "", //密码
      // 验证码倒计时初始值
      count_Down: 60,
      newCount_Down: null,
      // 定时器
      NoInterval: null,
      // 是否可点击
      isClick: null,
      //是否勾选条款
      ischeak: false,
      // 获取得验证码
      random_number: null
    };
  },

  mounted() {
    this.$bus.$on("is_Check", this.is_check);
    this.$refs.code.addEventListener("click", this.get_User_Login);
    this.$refs.mobile.addEventListener("blur", this.debounce(this.is_mobile, 2000));
  },
  computed: {},

  methods: {
    ...mapActions("Store_User", { MobileLogin: "get_User_Login" }),
    //节流
    debounce(fn, delay) {
      let timer;
      return function(value) {
        clearTimeout(timer);
        timer = setTimeout(function() {
          fn(value);
        }, delay);
      };
    },
    is_check(checker) {
      this.ischeak = !checker;
    },
    is_mobile() {
      let user_Mobile = this.mobile;
      let mobileRegular =
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;
      if (user_Mobile === "") return Message({
        type: "warning",
        message: "手机号不能为空"
      });
      if (!mobileRegular.test(user_Mobile)) return Message({
        type: "error",
        message: "请输入正确的手机号"
      });
      if (!this.ischeak) return Message({
        type: "warning",
        message: "请勾选条款"
      });
    },
    async get_User_Login() {
      if (this.is_mobile()) return;
      let user_verification_code = await get_User_verification_code();
      if (user_verification_code.status !== 0) return Message({
        type: "warning",
        message: "系统错误，请稍后再试"
      });
      this.random_number = user_verification_code.message;
      this.$refs.code.removeEventListener("click", this.get_User_Login);
      this.NoInterval = setInterval(() => {
        this.$refs.code.innerHTML = this.count_Down;
        this.count_Down--;
        if (this.count_Down === 0) {
          clearInterval(this.NoInterval);
          this.count_Down = 60;
          this.$refs.code.addEventListener("click", this.get_User_Login);
          this.$refs.code.innerHTML = `发送验证码`;
        }
      }, 1000);


    }
  },
  watch: {}
};
</script>

<style lang="less" scoped>
.no_id {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.31rem /* 20/64 */;

  .no_idInput {
    display: block;
    width: 80%;
    height: 0.78rem /* 50/64 */;
    outline: none;
    border: 1px solid #e2e2e2;
    border-radius: 0.16rem /* 10/64 */;
    padding-left: 0.16rem /* 10/64 */;
    box-sizing: border-box;
    margin-bottom: 0.31rem /* 20/64 */;
  }

  .verificationCode {
    width: 100%;
    position: relative;

    input {
      display: block;
      width: 80%;
      height: 0.78rem /* 50/64 */;
      outline: none;
      border: 1px solid #e2e2e2;
      border-radius: 0.16rem /* 10/64 */;
      margin: 0 auto;
      padding-left: 0.16rem /* 10/64 */;
      box-sizing: border-box;
    }

    // 验证码
    .verificationCodeSpan {
      position: absolute;
      right: 0.78rem /* 50/64 */;
      top: 0.2rem /* 35/64 */;
      font-size: 0.28rem /* 18/64 */;
      color: #cccc6e;
      cursor: pointer;
      text-align: center;
      width: 120px;
      border: 0;
    }
  }

  // 登陆注册按钮
  .buttonLogin {
    display: block;
    width: 50%;
    height: 0.63rem /* 40/64 */;
    box-sizing: border-box;
    font-size: 0.31rem /* 20/64 */;
    // color: aliceblue;
    background-color: #fce13d;
    border: 0;
    border-radius: 0.16rem /* 10/64 */;
    margin-top: 0.47rem /* 30/64 */;
    cursor: pointer;
  }
}
</style>
