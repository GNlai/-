<!-- 中国地图 -->
<template>
  <div class="box" @dblclick="ckgMap">
    <!-- 标题 -->
    <BackIndexTitle></BackIndexTitle>
    <div class="MapChina" ref="map_ref"></div>
  </div>
</template>

<script>
import BackIndexTitle from "./backIndexTitle";
import { get_China_Data, get_Map } from "@/axios/userAPI/api";
import axios from "axios";
// 导入第三方工具js
import { getProvinceMapInfo } from "@/utils/map_utils";

export default {
  name: "Newbookh5MapOfChina",
  data() {
    return {
      chartInstance: null,
      allData: null,
      mapData: {} //所获得的省份数据
    };
  },
  mounted() {
    this.initChart();
    this.getData();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    async initChart() {
      this.chartInstance = this.$Echarts.init(this.$refs.map_ref, "westeros");
      //获取数据
      const ret = await axios.get("http://localhost:3080/static/map/china.json");
      this.$Echarts.registerMap("china", ret.data);
      // 点击事件
      this.chartInstance.on("click", async (arg) => {
        const Utils = getProvinceMapInfo(arg.name);
        // 判断地图是否有该地区数据
        if (!this.mapData[Utils.key]) {
          // 获取本地矢量图数据
          const piv = await axios.get(`http://localhost:3080${Utils.path}`);
          this.mapData[Utils.key] = piv.data;
          this.$Echarts.registerMap(Utils.key, piv.data);
        }
        // 重新赋值
        const charNewData = {
          geo: {
            map: Utils.key,
            roam: true,
            label: {
              color: "#fff"
            }
          }
        };
        this.chartInstance.setOption(charNewData);
      });
      // 获取地图数据
      const data = await get_China_Data();
      this.$Echarts.registerMap("china", data);
      const initOption = {
        title: {
          text: "▎ 会员分布图",
          left: "10",
          top: "10",
          textStyle: {
            color: "#ff0033"
          }
        },
        geo: {
          type: "map",
          map: "china",
          top: "5%",
          bottom: "5%",
          itemStyle: {
            areaColor: "#cccc99",
            borderColor: "#fff"
          }
        },
        legend: {
          left: "5%",
          bottom: "5%",
          orient: "vertical"
        }
      };
      this.chartInstance.setOption(initOption);
    },
    async getData() {
      this.allData = await get_Map();
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
      this.updateChart();
    },
    updateChart() {
      // 处理图表需要的数据
      // 图例数据
      const legendData = this.allData.map((item) => {
        return item.name;
      });
      // 如果想要在地图显示涟漪效果，要添加一个配置 coordinateSystem:geo
      const seriesArr = this.allData.map((item) => {
        return {
          type: "effectScatter",
          // 涟漪动画
          rippleEffect: {
            scale: 5,
            brushType: "stroke"
          },
          name: item.name,
          data: item.children,
          coordinateSystem: "geo"
        };
      });
      const dataOption = {
        legend: {
          data: legendData
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
    // 返回中国地图
    ckgMap() {
      const returnChina = {
        geo: {
          map: "china"
        }
      };
      this.chartInstance.setOption(returnChina);
    }
  },
  components: {
    BackIndexTitle
  }
};
</script>

<style lang="less" scoped>
.MapChina {
  width: 9.38rem /* 600/64 */;
  height: 7.81rem /* 500/64 */;
  background-color: #669999;
  border-radius: 0.23rem /* 15/64 */;
}
</style>
