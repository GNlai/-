<template>

  <!--  每日更新-->
  <div class="upDaily">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="每日更新" name="box" disabled></el-tab-pane>
      <el-tab-pane label="周一" name="Mon">
        <Mon></Mon>
      </el-tab-pane>
      <el-tab-pane label="周二" name="Tues">
        <Tues></Tues>
      </el-tab-pane>
      <el-tab-pane label="周三" name="Wednes">
        <Wednes></Wednes>
      </el-tab-pane>
      <el-tab-pane label="周四" name="Thurs">
        <Thurs></Thurs>
      </el-tab-pane>
      <el-tab-pane label="周五" name="Fri">
        <Fri></Fri>
      </el-tab-pane>
      <el-tab-pane label="周六" name="Sat">
        <Sat></Sat>
      </el-tab-pane>
      <el-tab-pane label="周日" name="Week">
        <Week></Week>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Mon from "./week/Mon.vue";
import Tues from "./week/Tues.vue";
import Wednes from "./week/Wednes.vue";
import Thurs from "./week/Thurs.vue";
import Fri from "./week/Fri.vue";
import Sat from "./week/Sat.vue";
import Week from "./week/Week.vue";

export default {
  name: "com_Up_Daily",
  data() {
    return {
      activeName: "Mon"
    };
  },
  mounted() {
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab);
      console.log(event);
    }
  },
  components: { Mon, Tues, Wednes, Thurs, Fri, Sat, Week }
};
</script>

<style scoped lang="less">
.upDaily {
  width: 100%;
  height: 5.47rem /* 350/64 */;
  background-color: #669999;
  margin-top: 0.31rem /* 20/64 */;
}

/deep/ .el-tabs__nav-scroll {
  font-size: 0.38rem /* 24/64 */;
  height: 0.86rem /* 55/64 */;
  line-height: 0.86rem;
  //   未点击样式
  .el-tabs__item {
    color: #fff;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-0.08rem /* -5/64 */);
    }
  }

  #tab-box {
    color: #ffffcc;
    font-size: 0.58rem /* 24/64 */;
    padding-left: 0.13rem /* 8/64 */;
  }
}
</style>