<!-- 每日更新 -->
<template>
  <el-tabs
    v-model="activeName"
    @tab-click="handleClick"
    :lazy="true"
    name="box"
  >
    <el-tab-pane label="周一" name="Mon">
      <Mon v-if="activeName === 'Mon'"></Mon>
    </el-tab-pane>
    <el-tab-pane label="周二" name="Tues">
      <Tues v-if="activeName === 'Tues'"></Tues>
    </el-tab-pane>
    <el-tab-pane label="周三" name="Wedones">
      <Wedones v-if="activeName === 'Wedones'"></Wedones>
    </el-tab-pane>
    <el-tab-pane label="周四" name="Thurs">
      <Thurs v-if="activeName === 'Thurs'"></Thurs>
    </el-tab-pane>
    <el-tab-pane label="周五" name="Fri">
      <Fri v-if="activeName === 'Fri'"></Fri>
    </el-tab-pane>
    <el-tab-pane label="周六" name="Sat">
      <Sat v-if="activeName === 'Sat'"></Sat>
    </el-tab-pane>
    <el-tab-pane label="周日" name="Week">
      <Week v-if="activeName === 'Week'"></Week>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Mon from "@/components/com_back/com_DayUp/Mon.vue";
import Tues from "@/components/com_back/com_DayUp/Tues.vue";
import Wedones from "@/components/com_back/com_DayUp/wedones.vue";
import Thurs from "@/components/com_back/com_DayUp/Thurs.vue";
import Fri from "@/components/com_back/com_DayUp/Fri.vue";
import Sat from "@/components/com_back/com_DayUp/Sat.vue";
import Week from "@/components/com_back/com_DayUp/Week.vue";
export default {
  name: "MhbookDayUp",
  data() {
    return {
      activeName: "Mon",
    };
  },
  mounted() {},
  methods: {
    handleClick() {},
  },
  components: { Mon, Tues, Wedones, Thurs, Fri, Sat, Week },
};
</script>

<style lang="less" scoped>
/deep/.el-tabs__item {
  text-align: center;
  width: 10vw;
}
/deep/v-deep .el-tabs__item.is-active:hover {
  background-color: rgba(0, 0, 0, 0) !important;
  z-index: 1;
  &::after {
    animation: mymove 0.8s infinite;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
}
/deep/v-deep .el-tabs__item.is-active::after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
  height: 40px;
  background-color: #3b8afe;
  border-radius: 20px 0 0 20px !important;
  z-index: -2;
}
/deep/.el-tabs__nav {
  font-size: 0.31rem /* 20/64 */;
}
@keyframes mymove {
  0% {
    width: 100px;
    opacity: 0.1;
  }
  100% {
    width: 155px;
    opacity: 1;
  }
}
@keyframes mymove1 {
  0% {
    width: 155px;
    opacity: 1;
  }
  100% {
    width: 100px;
    opacity: 0;
  }
}
</style>
