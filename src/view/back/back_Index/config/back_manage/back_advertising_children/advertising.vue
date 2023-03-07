<!-- 广告 -->
<template>
  <div>
    <div class="table">
      <el-table :data="imgArr" style="width: 100%" border>
        <el-table-column prop="id" label="广告ID"></el-table-column>
        <el-table-column label="广告图片">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-image :src="scope.row.advCover" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="advSlogan" label="广告标语"></el-table-column>
        <el-table-column prop="advErtiser" label="广告商"></el-table-column>
        <el-table-column label="广告地址">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <router-link :to="scope.row.advPath" style="color: red">{{
                  scope.row.advPath
                }}
              </router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <AlterAdv :alterAdv="{ bookSQL, scope }"></AlterAdv>
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
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import AlterAdv from "@/components/com_back/config/com_alterBook/alterAdv";
import { mapActions, mapState } from "vuex";

export default {
  name: "MhbookSildes",

  data() {
    return {
      imgArr: [],
      imgOne: [],
      imgTwo: [],
      bookSQL: "advertising",
      // 总的数据条数
      totalCount: 0,
      currentPage: 1, //默认初始页
      pagesize: 3 //每页默认显示的数据
    };
  },
  created() {
    this.postBookData({ bookSQL: "advertising", you_name: "advArr" });
  },

  mounted() {
    this.$nextTick(() => {
      this.imgOne = this.getAdv;
      this.totalCount = this.imgOne.length;
      this.imgTwo = this.sliceArray(this.imgOne, this.pagesize);
      this.imgArr = this.imgTwo[this.currentPage - 1];
    });
  },
  computed: {
    ...mapState("bookData", { getAdv: "advArr" })
  },

  methods: {
    // 获取数据
    ...mapActions("bookData", { postBookData: "postBookData" }),
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
  components: { AlterAdv }
};
</script>

<style lang="less" scoped>
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

.el-image {
  height: 6vw;
  width: 100%;
}

.cell {
  padding: 0;
}
</style>
