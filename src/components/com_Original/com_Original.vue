<template>
  <!--  原创投稿-->
  <div class="original">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="原创投稿" name="first" disabled></el-tab-pane>
      <!--  -->
      <el-tab-pane label="站长推荐" name="recommend">
        <config_-recommend></config_-recommend>
      </el-tab-pane>
      <el-tab-pane label="热门漫画" name="hot">
        <config_Host></config_Host>
      </el-tab-pane>
      <el-tab-pane label="更多" name="more" disabled></el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
import Config_Recommend from "@/components/com_Original/config/config_recommend/config_Recommend";
import config_Host from "@/components/com_Original/config/config_Host/config_Host";

export default {
  name: "com_Original",
  data() {
    return {
      activeName: "recommend"
    };
  },
  mounted() {
  },
  methods: {
    handleClick() {
      console.log(1);
    }
  },
  components: { Config_Recommend, config_Host }
};
</script>

<style scoped lang="less">
.original {
  width: 100%;
  height: 5.47rem /* 350/64 */;
  background-color: #669999;
  margin-top: 0.31rem /* 20/64 */;

  /deep/ #tab-first {
    color: #ffffcc;
    font-size: 0.58rem /* 20/64 */;
    padding-left: 0.13rem /* 8/64 */;
  }

  /deep/ #tab-recommend {
    color: #fff;
    font-size: 0.25rem /* 16/64 */;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-5px);
    }
  }

  /deep/ #tab-hot {
    color: #fff;
    font-size: 0.25rem /* 16/64 */;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-5px);
    }
  }

  /deep/ #tab-more {
    float: right;
    margin-right: 2.94rem /* 188/64 */;
    margin-top: 0.16rem /* 10/64 */;
    cursor: pointer;
    color: #ffffcc;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-5px);
    }
  }
}

/deep/ .el-tabs__nav-scroll {
  font-size: 0.58rem /* 24/64 */;
}

/deep/ .el-tabs__nav {
  width: 100%;
}
</style>