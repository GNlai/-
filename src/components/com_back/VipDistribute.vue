<!-- 会员分布 -->
<template>
  <div class="distribute" ref="distribute"></div>
</template>

<script>
import { get_Rank } from "@/axios/userAPI/api";

export default {
  name: "Newbookh5VipDistribute",

  data() {
    return {
      chartInstance: null,
      allData: null,
      startValue: 0,
      endValue: 9,
      timerId: null
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
    clearInterval(this.timerId); //删除定时器
  },

  methods: {
    initChart() {
      this.chartInstance = this.$Echarts.init(this.$refs.distribute);
      const initOption = {
        title: {
          text: "▎ 地区销售排行",
          left: 10,
          top: 10,
          textStyle: {
            fontSize: 16,
            color: "#cccc99"
          }
        },
        xAxis: {
          type: "category"
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            type: "bar"
          }
        ],
        grid: {
          top: "20%",
          left: "5%",
          bottom: "5%",
          right: "5%",
          containLabel: true
        },
        // 提示
        tooltip: {
          show: true
        }
      };
      this.chartInstance.setOption(initOption);
      // 鼠标移入关闭定时器
      this.chartInstance.on("mouseover", () => {
        clearInterval(this.timerId);
      });
      // 鼠标移出关闭定时器
      this.chartInstance.on("mouseout", () => {
        this.startInterval();
      });
    },
    async getData() {
      this.allData = await get_Rank();
      //   排序 大到小
      this.allData.sort((a, b) => {
        return b.value - a.value;
      });
      // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
      this.updateChart();
      // 开启定时器
      this.startInterval();
    },
    updateChart() {
      // 处理图表需要的数据
      const colorArr = [
        ["#0BA82C", "#4FF778"],
        ["#2E72BF", "#23E5E5"],
        ["#5052EE", "#AB6EE5"]
      ];
      // 处理图表需要的数据
      const provinceArr = this.allData.map((item) => {
        return item.name;
      });
      const valueArr = this.allData.map((item) => {
        return item.value;
      });
      const dataOption = {
        dataZoom: {
          show: false,
          startValue: this.startValue,
          endValue: this.endValue
        },
        xAxis: {
          data: provinceArr
        },
        series: [
          {
            data: valueArr,
            itemStyle: {
              color: (arg) => {
                let targetColorArr = null;
                if (arg.vaule >= 300) {
                  targetColorArr = colorArr[0];
                } else if (arg.value >= 200) {
                  targetColorArr = colorArr[1];
                } else {
                  targetColorArr = colorArr[2];
                }
                return new this.$Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: targetColorArr[0]
                  },
                  {
                    offset: 1,
                    color: targetColorArr[1]
                  }
                ]);
              }
            }
          }
        ]
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.distribute.offsetWidth / 100) * 3.6;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          },
          series: [
            {
              barWidth: titleFontSize,
              itemStyle: {
                barBorderRadius: [titleFontSize / 2, titleFontSize / 2, 0, 0]
              }
            }
          ]
        }
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },

    // 定时器
    startInterval() {
      if (this.timerId) {
        clearInterval(this.timerId);
      }
      this.timerId = setInterval(() => {
        this.startValue++;
        this.endValue++;
        if (this.endValue > this.allData.length - 1) {
          this.startValue = 0;
          this.endValue = 9;
        }
        this.updateChart();
      }, 3000);
    }
  }
};
</script>

<style lang="less" scoped>
.distribute {
  width: 100%;
  height: 3.44rem /* 220/64 */;
  background-color: #669999;
  border-radius: 0.16rem /* 10/64 */;
  margin-bottom: 0.16rem /* 10/64 */;
}
</style>
