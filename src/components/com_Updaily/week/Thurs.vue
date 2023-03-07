<!-- 周四 -->
<template>
  <div class="ThursVue">
    <ul>
      <li v-for="item in getThursArr" :key="item.id">
        <router-link :to="item.bookPath">
          <!-- 封面 -->
          <el-image :src="item.bookCover"></el-image>
          <!-- 类型热度 -->
          <div class="bookType">
            <span title="漫画类型">{{
              item.bookType.split("，").join(" ")
            }}</span>
            <p class="iconfont icon-dianzan ico" title="热度">10w+</p>
          </div>
          <!-- 漫画名及作者 -->
          <div class="book">
            <!-- 漫画名 -->
            <div class="bookName" title="漫画名">
              {{ item.bookName }}
            </div>
            <!-- 漫画作者 -->
            <div class="bookAuthor" title="漫画作者">
              {{ item.bookAuthor }}
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "WednesVue",

  data() {
    return {};
  },
  created() {
    this.post_ThursData({ bookSQL: "bookthurs", you_name: "ThursArr" });
  },

  mounted() {},
  computed: {
    ...mapState("bookData", { getThursArr: "ThursArr" }),
  },

  methods: {
    ...mapActions("bookData", { post_ThursData: "postBookData" }),
  },
};
</script>

<style lang="less" scoped>
.ThursVue {
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 0;
    padding: 0;
    li {
      a {
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
        .el-image {
          width: 3.13rem /* 200/64 */;
          height: 3.75rem /* 240/64 */;
          border-radius: 0.23rem /* 15/64 */;
          &:hover {
            opacity: 0.8;
          }
        }
        //   类型热度
        .bookType {
          position: absolute;
          bottom: 0.5rem /* 12/64 */;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          font-size: 0.19rem /* 12/64 */;
          span {
            color: #7ad5e0;
            margin-left: 0.13rem /* 8/64 */;
          }
          p {
            color: #cae890;
            font-size: 0.19rem /* 12/64 */;
            margin-right: 0.13rem;
          }
        }

        //   漫画名及作者
        .book {
          display: flex;
          flex-direction: row;
          align-items: baseline;
          justify-content: space-between;
          font-size: 0.28rem /* 18/64 */;
          // 漫画名
          .bookName {
            color: #f1ca99;
          }
          // 漫画作者
          .bookAuthor {
            color: #b83333;
            font-size: 0.22rem /* 14/64 */;
          }
        }
      }
    }
  }
}
</style>
