<!-- 在线人数 -->
<template>
  <div class="box">
    <div class="title">
      <p ref="title">{{ showTitles }}</p>
      <span
        class="el-icon-arrow-down ico"
        @click="showTitle = !showTitle"
      ></span>
    </div>
    <div class="titleData" v-if="showTitle">
      <div
        class="text"
        v-for="item in getTitle"
        :key="item.key"
        @click="alterMap(item.key)"
      >
        <p style="cursor: pointer; margin: 0">{{ item.text }}</p>
      </div>
    </div>
    <div class="number" ref="numBer"></div>

    <div class="vip">
      <VipDistribute></VipDistribute>
    </div>
  </div>
</template>

<script>
import { get_trend } from "@/axios/userAPI/api";
import VipDistribute from "./VipDistribute.vue";

export default {
  name: "Newbookh5OnlieNumber",
  data() {
    return {
      chartInstance: null,
      data: null,
      showTitle: false,
      choiceType: "map"
    };
  },
  computed: {
    getTitle() {
      if (!this.data) {
        return [];
      } else {
        return this.data.type.filter((item) => {
          return item.key !== this.choiceType;
        });
      }
    },
    showTitles() {
      if (!this.data) {
        return "";
      } else {
        return this.data[this.choiceType].title;
      }
    }
  },
  mounted() {
    this.initChart();
    this.getData();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    initChart() {
      this.chartInstance = this.$Echarts.init(this.$refs.numBer, "roma");
      const initOption = {
        xAxis: {
          type: "category"
        },
        yAxis: {
          type: "value"
        },
        grid: {
          top: "25%",
          bottom: "0",
          left: "0",
          right: "2%",
          containLabel: true
        },
        // 鼠标移入坐标轴显示数据
        tooltip: {
          trigger: "axis"
        },
        // 图例位置
        legend: {
          left: "0",
          top: "10%",
          // 图例样式  圆形
          icon: "circle"
        }
      };
      this.chartInstance.setOption(initOption);
      window.addEventListener("resize", this.screenAdapter);
      // 再次调用自适应函数
      this.screenAdapter();
    },
    // 获取服务器数据
    async getData() {
      let url = `/JSON/trend`;
      this.data = await get_trend();
      //   调用数据处理函数
      this.upDataChart();
    },
    upDataChart() {
      // 半透明的颜色值
      const colorArr1 = [
        "rgba(11, 168, 44, 0.5)",
        "rgba(44, 110, 255, 0.5)",
        "rgba(22, 242, 217, 0.5)",
        "rgba(254, 33, 30, 0.5)",
        "rgba(250, 105, 0, 0.5)"
      ];
      // 全透明的颜色值
      const colorArr2 = [
        "rgba(11, 168, 44, 0)",
        "rgba(44, 110, 255, 0)",
        "rgba(22, 242, 217, 0)",
        "rgba(254, 33, 30, 0)",
        "rgba(250, 105, 0, 0)"
      ];
      // 对数据进行处理
      //    x轴数据   月份
      const timeArrs = this.data.common.month;
      //   y轴数据，暂时先取出map这个节点数据   map代表地区销售趋势  seller 代表商家销售趋势  commodity代表商品的销售趋势
      const valueArrs = this.data[this.choiceType].data;
      //   图表数据，一个图表中显示5条数据
      const seriesArr = valueArrs.map((item, index) => {
        return {
          type: "line",
          name: item.name,
          data: item.data,
          stack: this.choiceType,
          areaStyle: {
            color: new this.$Echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: colorArr1[index]
              },
              {
                offset: 1,
                color: colorArr2[index]
              } //100% 时的颜色
            ])
          }
        };
      });
      //图例数据
      let legendArr = valueArrs.map((item) => {
        return item.name;
      });
      const dataOption = {
        xAxis: {
          type: "category",
          data: timeArrs,
          boundaryGap: false
        },
        // 图例
        legend: {
          data: legendArr
        },
        series: seriesArr
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      const adapterOption = {};
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    // 改变图表
    alterMap(choiceType) {
      this.choiceType = choiceType;
      this.showTitle = !this.showTitle;
      this.upDataChart();
    }
  },
  components: { VipDistribute }
};
</script>

<style lang="less" scoped>
.box {
  position: relative;

  .title {
    position: absolute;
    left: 0.16rem /* 10/64 */;
    font-size: 0.25rem /* 16/64 */;
    color: #cccc99;
    z-index: 99;
    display: flex;
    align-items: center;

    p {
      margin: 0;
    }

    .ico {
      margin-left: 5px;
      cursor: pointer;
      color: #fff;
    }
  }

  .titleData {
    font-size: 0.22rem /* 14/64 */;
    position: absolute;
    top: 0.31rem /* 20/64 */;
    left: 0.81rem /* 52/64 */;
    color: red;
    z-index: 100;
  }

  .number {
    width: 5.63rem /* 360/64 */;
    height: 3.44rem /* 220/64 */;
    background-color: #669999;
    border-radius: 0.23rem /* 15/64 */;
  }

  .vip {
    margin-top: 0.16rem /* 10/64 */;
  }
}
</style>
