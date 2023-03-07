<template>
  <div id="app">
    <!--    路由输出标签-->
    <router-view></router-view>
  </div>
</template>

<script>
import "@/assets/css/Main_index.less";
import { mapActions } from "vuex";

export default {
  name: "App",
  mounted() {
    this.get_Userinfo();
  },
  methods: {
    ...mapActions("Store_User", { get_Userinfo: "get_Userinfo" })
  },
  components: {}
};
</script>

<style lang="less">
img {
  width: 100%;
  height: 100%;
}

.option {
  color: red;
}
</style>
