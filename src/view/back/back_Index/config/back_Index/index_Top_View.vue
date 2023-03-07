<template>
  <!--后台首页-->
  <div class="box">
    <!-- 首页头部 -->
    <div class="cartoonTop">
      <CartoonBox></CartoonBox>
      <!-- 地图 -->
      <MapOfChina></MapOfChina>
      <!-- 在线人数 -->
      <OnlieNumBer></OnlieNumBer>
    </div>
  </div>

</template>

<script>
import { mapActions } from "vuex";
import CartoonBox from "@/components/com_back/cartoonBox.vue";
import MapOfChina from "@/components/com_back/MapOfChina.vue";
import OnlieNumBer from "@/components/com_back/onlieNumber.vue";

export default {
  name: "index_View",
  data() {
    return {};
  },
  created() {
    this.postBookData({ bookSQL: "slidbook", you_name: "slidArr" });
    this.postBookData({ bookSQL: "recbook", you_name: "recArr" });
    this.postBookData({ bookSQL: "hotbook", you_name: "hotArr" });
    this.postBookData({ bookSQL: "boutbook", you_name: "boutArr" });
    this.postBookData({ bookSQL: "rankingbook", you_name: "rankingArr" });
    this.postBookData({ bookSQL: "bookmon", you_name: "MonArr" });
    this.postBookData({ bookSQL: "booktues", you_name: "TuesArr" });
    this.postBookData({ bookSQL: "bookwednes", you_name: "WednesArr" });
    this.postBookData({ bookSQL: "bookthurs", you_name: "ThursArr" });
    this.postBookData({ bookSQL: "bookfri", you_name: "FriArr" });
    this.postBookData({ bookSQL: "booksat", you_name: "SatArr" });
    this.postBookData({ bookSQL: "bookweek", you_name: "WeekArr" });
    this.postBookData({ bookSQL: "advertising", you_name: "advArr" });
  },
  mounted() {
  },
  methods: {
    ...mapActions("bookData", { postBookData: "postBookData" })
  },
  components: { CartoonBox, MapOfChina, OnlieNumBer }
};
</script>

<style scoped lang="less">
.cartoonTop {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>