<!-- 账号登陆 -->
<template>
  <div class="yes_id">
    <input
      type="text"
      placeholder="请输入手机号"
      class="word"
      v-model="user_Mobile"
      name="userId"
    />
    <input
      type="text"
      placeholder="请输入验证码"
      class="word"
      v-model="random_number"
      name="user_random_number"
    />
    <input
      type="password"
      placeholder="请输入密码"
      class="password"
      v-model="password_one"
      name="userPassword"
    />
    <input
      type="password"
      placeholder="请再次输入密码"
      class="password"
      v-model="password_two"
      name="userPassword"
    />
    <!-- 忘记密码 -->
    <div class="isForget">
      <span>忘记密码？</span>
    </div>
    <div class="islogin">
      <input type="submit" value="注册" class="login_Left" ref="login" />
      <input
        type="submit"
        value="登陆"
        class="login_Right"
      />
    </div>
  </div>
</template>

<script>
import "./css/user_Register.less";

export default {
  name: "Newbookh5YesId",

  data() {
    return {
      user_Mobile: "",
      password_one: "",
      password_two: "",
      random_number: ""
    }
      ;
  },

  mounted() {
  },

  methods: {}
};
</script>

<style lang="less" scoped>
</style>
