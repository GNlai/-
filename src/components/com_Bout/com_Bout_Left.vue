<template>
  <div class="bout">
    <span class="boutSpan">精品漫画</span>
    <div class="bout_Left_BookData">
      <ul class="boutUl">
        <li v-for="item in getBout_Left_Book" :key="item.id" class="boutLi">
          <router-link :to="item.bookPath" class="boutA">
            <div class="bookCover">
              <el-image :src="item.bookCover"></el-image>
              <div class="bookType">
                <span class="type">{{
                    item.bookType.split("，").join(" ")
                  }}</span>
                <span class="iconfont icon-dianzan ico">10w+</span>
              </div>
            </div>
            <div class="book">
              <span class="bookSpanName">{{ item.bookName }}</span>
              <span class="bookSpanAuthor">{{ item.bookAuthor }}</span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {

  name: "com_Bout_Left",
  data() {
    return {};
  },

  mounted() {
  },
  created() {
    this.postbout({ bookSQL: "boutbook", you_name: "boutArr" });
  },
  computed: {
    ...mapState("bookData", { getBout_Left_Book: "boutArr" })
  },

  methods: {
    // 请求获取数据
    ...mapActions("bookData", { postbout: "postBookData" })
  }
};
</script>

<style scoped lang="less">
.bout {
  height: 100%;
  flex: 5;
  border-right: 1px solid #e2e2e2;
  display: flex;
  flex-direction: column;

  .boutSpan {
    font-size: 0.58rem /* 20/64 */;
    color: #ffffcc;
    padding-left: 0.13rem /* 8/64 */;
  }

  .boutUl {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    margin-top: 0.16rem /* 10/64 */;
    margin-left: 0.16rem /* 10/64 */;

    .boutLi {
      display: block;
      width: 20%;
      height: 4.38rem /* 280/64 */;
      margin-top: 0.28rem /* 18/64 */;

      .boutA {
        display: flex;
        flex-direction: column;
        width: 100%;

        .bookCover {
          position: relative;
          height: 3.75rem /* 240/64 */;

          .el-image {
            width: 90%;
            height: 3.75rem /* 240/64 */;
            border-radius: 0.16rem /* 10/64 */;

            &:hover {
              opacity: 0.8;
            }
          }

          .bookType {
            position: absolute;
            bottom: 0.08rem /* 5/64 */;
            left: 0;
            color: #fff;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;

            .type {
              font-size: 0.19rem /* 12/64 */;
              margin-left: 0.16rem /* 10/64 */;
              color: #66cccc;
            }

            .ico {
              font-size: 0.19rem /* 12/64 */;
              margin-right: 0.38rem /* 24/64 */;
              color: #ccff66;
            }
          }
        }

        .book {
          font-size: 0.22rem /* 14/64 */;
          color: #cc3333;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

          .bookSpanName {
            font-size: 0.28rem /* 18/64 */;
            color: #f5cc99;
          }

          .bookSpanAuthor {
            margin-right: 0.38rem /* 24/64 */;
          }
        }
      }
    }
  }
}

</style>