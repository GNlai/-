<!-- 修改删除广告组件 -->
<template>
  <div>
    <el-button size="mini" @click="dialogFormVisible = true">编辑</el-button>

    <el-dialog
      title="漫画修改"
      :visible.sync="dialogFormVisible"
      width="50%"
      center
      :destroy-on-close="true"
      v-if="dialogFormVisible"
    >
      <el-form :model="ddedit" v-if="dialogFormVisible" ref="ruleForm">
        <el-form-item label="更新广告图片" class="formbox">
          <el-upload
            class="avatar-uploader"
            action="/book/upCover"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-change="upBookCover"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="ddedit.cover" :src="ddedit.cover" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!--  -->
        <el-form-item label="广告标语">
          <el-input v-model="ddedit.advSlogan"></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="广告商">
          <el-input v-model="ddedit.advErtiser"></el-input>
        </el-form-item>
        <!--  -->
        <el-form-item label="广告地址">
          <el-input v-model="ddedit.advPath"></el-input>
        </el-form-item>
        <!--  -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="alterAdvS({ alterAdv, ddedit }, (dialogFormVisible = false))"
          >确定</el-button
        >
      </div>
    </el-dialog>
    <el-button
      size="mini"
      type="danger"
      @click="handleDelete(alterBook.scope.$index, alterBook.scope.row)"
      >删除</el-button
    >
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "MhbookRanKingBook",

  data() {
    return {
      // 表单存储的数据
      ddedit: {
        // 广告图片
        cover: "",
        // 广告标语
        advSlogan: "",
        // 广告商
        advErtiser: "",
        // 广告地址
        advPath: "",
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
    };
  },
  props: ["alterAdv"],

  mounted() {},
  computed: {},

  methods: {
    // 编辑漫画内容
    ...mapMutations("bookData", { alterAdvS: "alterAdv" }),
    // 上传图片
    ...mapMutations("bookData", { upBookCover: "upBookCover" }),
    // 删除
    ...mapMutations("bookData", { handleDelete: "handleDelete" }),
    handleAvatarSuccess(res, file) {
      this.ddedit.cover = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg" || "png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  watch: {
  },
};
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid #e2e2e2;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  margin-left: 10vw;
}
/deep/.el-button.is-round {
  position: fixed;
  bottom: 110px;
  left: 50%;
  transform: translateY(-50%);
}
/deep/.el-upload {
  width: 12vw;
  height: 12vw;
}
/deep/.formbox {
  display: flex;
  flex-direction: row;
  align-items: center;
}
/deep/.avatar-uploader-icon {
  margin-left: 10vw;
}
/deep/.el-input {
  float: right;
  margin-right: 10vw;
  width: 60%;
}
</style>
