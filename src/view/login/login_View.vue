<template>
  <div class="login">
    <Com_Top></Com_Top>
    <div class="login_cent">
      <div class="cent_left">
        <el-image :src="left_bgc"></el-image>
      </div>
      <div class="cent_right">
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户登陆" name="user_Login">
            <user_Login></user_Login>
          </el-tab-pane>
          <el-tab-pane label="用户注册" name="user_Register">
            <user_Register></user_Register>
          </el-tab-pane>
        </el-tabs>
        <check_View></check_View>
      </div>
    </div>

  </div>
</template>

<script>
import "./css/index.less";
import user_Login from "./isContent/user_Login";
import user_Register from "./isContent/user_Register";
import Com_Top from "@/components/com_Top/Com_Top";
import check_View from "@/view/login/config/check_View";

export default {
  name: "Com_Login",
  data() {
    return {
      activeName: "user_Login",
      left_bgc: require("@/assets/image/背景5.jpg")
    }
      ;
  },
  mounted() {
  },
  methods: {
    handleClick() {
      console.log(1);
    }
  },
  components: { Com_Top, user_Login, user_Register, check_View }
};
</script>

<style scoped>

</style>