<template>
  <div class="home_View" @wheel="getWheel">
    <Com_Top></Com_Top>
    <!--    轮播图-->
    <com_-carousel ref="Original"></com_-carousel>
    <!--    推荐-->
    <com_-original></com_-original>
    <!-- 精品区 -->
    <div class="bout_Book_Box">
      <com_-bout_-left></com_-bout_-left>
      <com_-bout_-right></com_-bout_-right>
    </div>
    <!--    每日更新-->
    <com_-up_-daily></com_-up_-daily>
    <!--    小组件-->
    <Com_Menu></Com_Menu>
  </div>
</template>

<script>
import Com_Top from "@/components/com_Top/Com_Top";
import Com_Menu from "@/components/com_menu/Menu";
import Com_Carousel from "@/components/com_Carousel/com_Carousel";
import Com_Original from "@/components/com_Original/com_Original";
import Com_Bout_Left from "@/components/com_Bout/com_Bout_Left";
import Com_Bout_Right from "@/components/com_Bout/com_Bout_Right";
import Com_Up_Daily from "@/components/com_Updaily/com_Up_Daily";

export default {
  name: "home_View",
  methods: {
    getWheel() {
      let off = this.$refs.Original.$el.offsetTop;
      let windows = window.pageYOffset;
      this.$bus.$emit("wheel", { off, windows });
    }
  },
  components: { Com_Up_Daily, Com_Bout_Right, Com_Bout_Left, Com_Original, Com_Carousel, Com_Top, Com_Menu }
};
</script>

<style scoped lang="less">
.home_View {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  width: 96vw;
  margin: 0 auto;
}

.bout_Book_Box {
  height: 10.61rem /* 640/64 */;
  background-color: #669999;
  display: flex;
  flex-direction: row;
  margin-top: 0.31rem /* 20/64 */;
}


</style>