<template>

  <!--  轮播图-->
  <div class="carousel">
    <el-carousel
      trigger="click"
      type="card"
      height="7.81rem"
      arrow="always"
      indicator-position="none"
    >
      <el-carousel-item v-for="item in getSlidData" :key="item.id">
        <router-link :to="item.bookPath">
          <el-image :src="item.bookCover"></el-image>
          <div class="book">
            <!-- 漫画名 -->
            <p>{{ item.bookName }}</p>
            <!--  漫画作者-->
            <span>{{ item.bookAuthor }}</span>
          </div>
        </router-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import "./css/index.less";

export default {
  name: "com_Carousel",
  data() {
    return {};
  },
  created() {
    this.postSlid({ bookSQL: "slidbook", you_name: "slidArr" });
  },

  mounted() {
  },
  computed: {
    ...mapState("bookData", { getSlidData: "slidArr" })
  },

  methods: {
    // 请求获取数据
    ...mapActions("bookData", { postSlid: "postBookData" })
  }
};
</script>

<style scoped lang="less">
/deep/ .el-carousel__arrow--left,
/deep/ .el-carousel__arrow--right {
  width: 0.47rem /* 30/64 */;
  height: 0.63rem /* 40/64 */;
  border-radius: 0.16rem /* 10/64 */;
  z-index: 100;
  background-color: #e2e2e2;
  color: #669999;
  font-size: 0.28rem /* 18/64 */;

  &:hover {
    background-color: #ffffcc;
  }
}

/deep/ .el-carousel__arrow--left {
  left: 4.38rem /* 280/64 */;
  border-radius: 0.16rem /* 10/64 */ 0 0 0.16rem /* 10/64 */;
}

/deep/ .el-carousel__arrow--right {
  right: 4.38rem /* 280/64 */;
  border-radius: 0 0.16rem /* 10/64 */ 0.16rem /* 10/64 */ 0;
}

/deep/ .el-carousel__indicators--outside {
  transform: translateY(-20px);
}
</style>