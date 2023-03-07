<!-- 漫画详情 -->
<template>
  <div class="bookDetails">
    <!--  -->
    <el-page-header @back="goBack" content="漫画详情" class="pageheder">
    </el-page-header>
    <!--  -->
    <div class="bookBox">
      <!-- 漫画封面 -->
      <div class="Cover">
        <el-image :src="bookData.bookCover"></el-image>
      </div>
      <!-- 漫画名 -->
      <div class="bookRight">
        <div class="Name">
          <span>{{ bookData.bookName }}</span>
          <span style="font-size: 0.22rem; color: #bfbfbf">{{
            bookData.bookAuthor
          }}</span>
        </div>
        <!-- 漫画简介 -->
        <div class="bookContent">
          <span>{{ bookData.bookContent }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Newbookh5BookDetails",

  data() {
    return {
      bookIndex: null,
      bookData: [],
    };
  },
  created() {
    this.getBookDetails();
  },

  mounted() {},

  methods: {
    getBookDetails() {
      let index = this.$route.query.index;
      this.bookIndex = parseInt(index);
      let bookData = this.$route.query.bookData;
      if (bookData == "MonArr")
        this.bookData = this.$store.state.bookData.MonArr[this.bookIndex];
      console.log(this.$store.state.bookData.MonArr[this.bookIndex]);
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.bookDetails {
  width: 18.75rem /* 1200/64 */;
  height: 6.25rem /* 400/64 */;
  margin: 0.63rem /* 40/64 */ auto;
  border: 3px solid #e5e5e5;
  /deep/.pageheder {
    color: red;
    .el-page-header__content {
      color: antiquewhite;
    }
  }

  .bookBox {
    width: 80%;
    // height: 100%;
    display: flex;
    flex-direction: row;
    font-size: 0.38rem /* 24/64 */;
    justify-content: center;
    .Cover {
      .el-image {
        width: 2.81rem /* 180/64 */;
        // height: 0.94rem /* 60/64 */;
        border-radius: 0.16rem /* 10/64 */;
      }
    }
    .bookRight {
      display: flex;
      flex-direction: column;
      .Name {
        margin-left: 0.31rem /* 20/64 */;
        color: #333368;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
