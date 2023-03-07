<template>
  <!--热门推荐-->
  <div class="hot">
    <router-link v-for="item in getHotData" :key="item.id" :to="item.bookPath">
      <el-image :src="item.bookCover"></el-image>
      <div class="bookType">
        <span class="type">{{ item.bookType.split("，").join(" ") }}</span>
        <span class="iconfont icon-dianzan ico">10w+</span>
      </div>
      <div class="book">
        <span class="bookName" title="漫画名">{{ item.bookName }}</span>
        <span class="bookAuthor" title="作者">{{ item.bookAuthor }}</span>
      </div>
    </router-link>
  </div>

</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "com_Host",
  data() {
    return {};
  },
  created() {
    this.postrec({ bookSQL: "hotbook", you_name: "hotArr" });
  },

  mounted() {
  },
  computed: {
    ...mapState("bookData", { getHotData: "hotArr" })
  },

  methods: {
    // 请求获取数据
    ...mapActions("bookData", { postrec: "postBookData" })
  }
};
</script>

<style scoped lang="less">
.hot {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  a {
    position: relative;
    display: flex;
    flex-direction: column;

    .el-image {
      height: 3.75rem /* 240/64 */;
      width: 3.13rem /* 200/64 */;
      border-radius: 0.16rem /* 10/64 */;

      img {
        width: 2.34rem /* 150/64 */;
      }

      &:hover {
        opacity: 0.8;
      }
    }

    .bookType {
      width: 100%;
      position: absolute;
      bottom: 0.39rem /* 25/64 */;
      font-size: 0.19rem /* 12/64 */;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      color: #ffffff;

      .type {
        margin-left: 0.13rem /* 8/64 */;
      }

      .ico {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 0.13rem /* 8/64 */;
        font-size: 0.19rem /* 12/64 */;
        z-index: 999;
      }
    }

    .book {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;

      .bookName {
        font-size: 0.28rem /* 18/64 */;
        color: #ffcc99;
      }

      .bookAuthor {
        font-size: 0.22rem /* 14/64 */;
        color: #cc3333;
      }
    }
  }
}

</style>