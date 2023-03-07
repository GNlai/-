<template>
  <!--  排行榜-->
  <div class="ranking">
    <span class="rankingSpan">每日排行</span>
    <div class="bookData">
      <ul class="bookUl">
        <li
          v-for="(item, index) in getranking"
          :key="item.id"
          @mouseover="add(index)"
          class="bookLi"
          :class="{ bookNewStyle: defaultStyle == index }"
        >
          <div class="bookIndex">
            <!-- 排行 -->
            <span class="bookSpan"> {{ index + 1 }}</span>
            <!-- 漫画封面 -->
            <div class="bookCover">
              <router-link :to="item.bookPath">
                <el-image :src="item.bookCover"></el-image>
              </router-link>
            </div>
            <!-- 漫画名 -->
            <div class="bookName">
              <div class="bookA">
                <router-link :to="item.bookPath">
                  {{ item.bookName }}
                </router-link>
              </div>
              <!-- 漫画类型 -->
              <div class="bookType">
                {{ item.bookType.split("，").join(" ") }}
              </div>
              <!-- 漫画详情 -->
              <div class="details">
                <el-popover
                  placement="top"
                  title="漫画简介"
                  width="100"
                  trigger="hover"
                  :content="item.bookContent"
                >
                  <span slot="reference">详情</span>
                </el-popover>
              </div>
              <!-- 更新至 -->
              <div class="newbookUpBook">
                <span class="newbookUpBook">
                  <!--  -->
                  <p>更新至:</p>
                  <router-link :to="item.bookPath">
                    {{ item.bookUpBook }}
                  </router-link>
                </span>
              </div>
            </div>
          </div>

          <!-- 更新画 -->
          <div class="bookUpBook">
            <span>
              <!--  -->
              更新至
              <router-link :to="item.bookPath" style="color: #cc0033">
                {{ item.bookUpBook }}
              </router-link>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "com_Bout_Right",
  data() {
    return {
      defaultStyle: 0
    };
  },
  created() {
    this.postRankingBook({ bookSQL: "rankingbook", you_name: "rankingArr" });
  },
  computed: {
    ...mapState("bookData", { getranking: "rankingArr" })
  },

  mounted() {
  },

  methods: {
    ...mapActions("bookData", { postRankingBook: "postBookData" }),
    add(index) {
      this.defaultStyle = index;
    }
  }
};
</script>

<style scoped lang="less">
.ranking {
  height: 100%;
  flex: 2;
  border-left: 1px solid #e2e2e2;
  display: flex;
  flex-direction: column;

  .rankingSpan {
    font-size: 0.58rem /* 20/64 */;
    color: #ffffcc;
  }

  .bookUl {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    padding-left: 0.13rem /* 8/64 */;

    .bookLi {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 0.63rem /* 40/64 */;
      width: 100%;
      margin-top: 0.13rem /* 8/64 */;
      // 排行
      .bookIndex {
        display: flex;
        flex-direction: row;
        font-size: 0.25rem /* 16/64 */;
        color: #cccc99;
        // 漫画名
        .bookName {
          font-size: 0.25rem /* 16/64 */;
          margin-left: 0.13rem /* 8/64 */;
          font-weight: 500;

          a {
            color: #1a1a1a;
          }

          // 漫画类型
          .bookType {
            display: none;
          }

          // 漫画详情
          .details {
            display: none;
          }

          .newbookUpBook {
            display: none;
          }
        }

        // 漫画封面
        .bookCover {
          display: none;
        }
      }

      &:nth-child(1) {
        .bookIndex {
          color: #cc0033;
        }
      }

      &:nth-child(2) {
        .bookIndex {
          color: #ffcc99;
        }
      }

      &:nth-child(3) {
        .bookIndex {
          color: #ffff66;
        }
      }

      // 更新画
      .bookUpBook {
        font-size: 0.25rem /* 16/64 */;
        margin-right: 0.94rem /* 60/64 */;
      }
    }

    // 鼠标经过得样式
    .bookNewStyle {
      height: 2.77rem /* 177/64 */;
      // 排行
      .bookIndex {
        position: relative;
        // 排行
        .bookSpan {
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 0.25rem /* 16/64 */;
          height: 0.25rem /* 16/64 */;
          line-height: 0.28rem /* 18/64 */;
          text-align: center;
          color: #fff;
          background-color: #cccc99;
          font-size: 0.19rem /* 12/64 */;
          z-index: 999;
        }

        // 封面
        .bookCover {
          display: block;

          .el-image {
            width: 100px;
            height: 100%;
            border-radius: 0.16rem /* 10/64 */;

            &:hover {
              opacity: 0.8;
            }
          }
        }

        // 漫画名
        .bookName {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-start;
          font-size: 0.31rem /* 20/64 */;
          font-weight: 500;
          margin-left: 0.31rem /* 20/64 */;

          .bookA {
            color: #1a1a1a;
            transition: all 0.1s;

            a {
              &:hover {
                color: #cccc99;
              }
            }
          }

          // 漫画类型
          .bookType {
            display: block;
            font-size: 0.25rem /* 16/64 */;
            font-weight: 300;
            color: #1a1a1a;
          }

          // 漫画详情
          .details {
            display: block;
          }

          // 更新至
          .newbookUpBook {
            display: flex;
            flex-direction: row;
            align-items: center;

            p {
              color: #fff;
            }

            a {
              color: #666666;
              margin-left: 0.16rem /* 10/64 */;

              &:hover {
                color: #cc0033;
              }
            }
          }
        }
      }

      // 更新至
      .bookUpBook {
        display: none;
      }

      &:nth-child(1) {
        .bookIndex {
          .bookSpan {
            background-color: #cc0033;
          }
        }
      }

      &:nth-child(2) {
        .bookIndex {
          .bookSpan {
            background-color: #ffcc99;
          }
        }
      }

      &:nth-child(3) {
        .bookIndex {
          .bookSpan {
            background-color: #ffff66;
          }
        }
      }
    }
  }
}

// 详情文字样式
.el-popover__reference {
  display: block;
  color: #e2e2e2;
  font-size: 0.25rem /* 16/64 */;
  font-weight: 300;
  cursor: pointer;
  margin-top: 0.23rem /* 15/64 */;
}
</style>