<!-- 周三 -->
<template>
  <div>
    <div class="table">
      <el-table :data="imgArr" style="width: 100%" border>
        <el-table-column prop="id" label="漫画ID"> </el-table-column>
        <el-table-column prop="bookCover" label="漫画图片">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-image :src="scope.row.bookCover" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="bookName" label="漫画名"> </el-table-column>
        <el-table-column prop="bookType" label="漫画类型"> </el-table-column>
        <el-table-column prop="bookAuthor" label="漫画作者"></el-table-column>
        <el-table-column prop="bookContent" label="漫画简介"> </el-table-column>
        <el-table-column label="漫画更新数">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <span
                >更新至:<b style="color: red">{{ scope.row.bookUpBook }}</b>
                画</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="漫画地址">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <router-link :to="scope.row.bookPath" style="color: #409eff">{{
                scope.row.bookPath
              }}</router-link>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <AlterBook :alterBook="{ bookSQL, scope }" ref="scop"></AlterBook>
          </template>
        </el-table-column>
      </el-table>

      <el-button type="warning" round @click="centerDialogVisible = true">
        <!--  -->
        添加漫画</el-button
      >
      <el-dialog
        title="添加漫画"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
      >
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
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
import { mapState, mapActions } from "vuex";
import AlterBook from "@/components/com_back/config/com_alterBook/alter";
export default {
  name: "MhbookSildes",

  data() {
    return {
      bookSQL: "bookwednes",
      imgArr: [],
      imgOne: [],
      imgTwo: [],
      // 总的数据条数
      totalCount: 0,
      currentPage: 1, //默认初始页
      pagesize: 3, //每页默认显示的数据

      formLabelWidth: "120px",
      dialogTableVisible: false,
      dialogFormVisible: false,
      centerDialogVisible: false,
    };
  },
  created() {
    this.postBookData({ bookSQL: "bookwednes", you_name: "WednesArr" });
  },

  components: { AlterBook },
  mounted() {
    this.$nextTick(() => {
      this.imgOne = this.getWednesArr;
      this.totalCount = this.imgOne.length;
      this.imgTwo = this.sliceArray(this.imgOne, this.pagesize);
      this.imgArr = this.imgTwo[this.currentPage - 1];
    });
  },

  computed: {
    ...mapState("bookData", { getWednesArr: "WednesArr" }),
  },

  methods: {
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
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
    },
  },
  watch: {
    currentPage() {
      this.imgTwo = this.sliceArray(this.imgOne, this.pagesize);
      this.imgArr = this.imgTwo[this.currentPage - 1];
      this.$refs.scop.dialogFormVisible = false;
    },
    pagesize() {
      this.imgTwo = this.sliceArray(this.imgOne, this.pagesize);
      this.imgArr = this.imgTwo[this.currentPage - 1];
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-table th.el-table__cell {
  text-align: center;
}
/deep/.el-table .cell {
  text-align: center;
}
.pagination {
  position: fixed;
  bottom: 2vw;
  left: 50%;
  transform: translateX(-50%);
}
.el-image {
  width: 4vw;
  height: 6vw;
  img {
    background-size: 100%;
  }
}
.cell {
  padding: 0;
}

/deep/.el-button.is-round {
  position: fixed;
  bottom: 110px;
  left: 50%;
  transform: translateY(-50%);
}
</style>
