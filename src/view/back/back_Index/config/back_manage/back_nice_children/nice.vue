<!-- 每日推荐数据 -->
<template>
  <div>
    <div class="table">
      <el-table :data="imgArr" style="width: 100%" size="medium" border>
        <el-table-column prop="id" label="漫画ID"></el-table-column>
        <el-table-column prop="bookName" label="漫画名"></el-table-column>
        <el-table-column label="漫画图片">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-image :src="scope.row.bookCover" />
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="bookAuthor" label="漫画作者"></el-table-column>
        <el-table-column prop="bookContent" label="漫画简介"></el-table-column>
        <el-table-column label="漫画更新数">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span
              >更新至:<b style="color: red">{{ scope.row.bookUpBook }}</b>
                话</span
              >
            </div>
          </template>
        </el-table-column>

        <el-table-column label="漫画地址">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <router-link :to="scope.row.bookPath" style="color: #e48a51">{{
                  scope.row.bookPath
                }}
              </router-link>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="漫画类型">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span>{{ scope.row.bookType.split("，").join(" ") }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <Alter :alterBook="{ bookSQL, scope }"></Alter>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 6]"
        :page-size="pagesize"
        layout="total, prev, pager, next"
        :total="totalCount"
        background
        class="pagination"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Alter from "@/components/com_back/config/com_alterBook/alter";
import { mapActions, mapState } from "vuex";

export default {
  name: "MhbookSildes",
  data() {
    return {
      imgArr: [],
      imgOne: [],
      imgTwo: [],
      bookSQL: "boutbook",
      // 总的数据条数
      totalCount: 0,
      currentPage: 1, //默认初始页
      pagesize: 3 //每页默认显示的数据
    };
  },
  created() {
    this.postBookData({ bookSQL: "boutbook", you_name: "boutArr" });
    //
  },

  mounted() {
    this.$nextTick(() => {
      this.imgOne = this.getBoutArr;
      this.totalCount = this.imgOne.length;
      this.imgTwo = this.sliceArray(this.imgOne, this.pagesize);
      this.imgArr = this.imgTwo[this.currentPage - 1];
    });
  },
  computed: {
    ...mapState("bookData", { getBoutArr: "boutArr" })
  },

  methods: {
    ...mapActions("bookData", { postBookData: "postBookData" }),
    // 传值

    //平均拆分想要的数据数量方法
    sliceArray(array, size) {
      let result = [];
      for (var x = 0; x < Math.ceil(array.length / size); x++) {
        var start = x * size;
        var end = start + size;
        result.push(array.slice(start, end));
      }
      return result;
    },
    handleEdit(a, b) {
      console.log(a);
      console.log(b);
    },
    handleDelete(a, b) {
      console.log(a);
      console.log(b);
    },
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
    }
  },
  watch: {
    currentPage() {
      this.imgTwo = this.sliceArray(this.imgOne, this.pagesize);
      this.imgArr = this.imgTwo[this.currentPage - 1];
    },
    pagesize() {
      this.imgTwo = this.sliceArray(this.imgOne, this.pagesize);
      this.imgArr = this.imgTwo[this.currentPage - 1];
    }
  },

  components: { Alter }
};
</script>

<style lang="less" scoped>
/deep/ .el-image {
  width: 1.25rem /* 80/64 */;
  height: 1.88rem /* 120/64 */;
}

/deep/ .el-table th.el-table__cell {
  text-align: center;
}

/deep/ .el-table .cell {
  text-align: center;
}

.pagination {
  position: fixed;
  bottom: 2vw;
  left: 50%;
  transform: translateX(-50%);
}
</style>
