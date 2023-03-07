<!-- 漫画管理 -->
<template>
  <div>
    <!--  -->
    <router-view name="back"></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MhbookManage",

  data() {
    return {};
    
  },

  mounted() {},
  comments: {
    ...mapState("slideshow", ["slidArr"]),
  },

  methods: {},
};
</script>

<style lang="less" scoped></style>
