<!-- 漫画总数 -->
<template>
  <div class="box" ref="box"></div>
</template>

<script>
import { get_Seller } from "@/axios/userAPI/api";

export default {
  name: "Newbookh5CartoonBox",

  data() {
    return {
      chartInstance: null, //echars的实例对象
      data: [],
      currentPage: 1, //当前页数
      totalPage: 0, // 总页数
      // 定时器
      timerId: null
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    this.onLine();
    // 停止动画
    this.initChart();
  },

  methods: {
    onLine() {
      this.chartInstance = this.$Echarts.init(this.$refs.box, "roma");
      //将配置项设置给echarts实例对象
    },
    async getData() {
      this.data = await get_Seller();

      this.data.sort((a, b) => {
        return a.value - b.value;
      });
      // 计算总页数
      this.totalPage =
        this.data.length % 5 === 0
          ? parseInt(this.data.length / 5)
          : parseInt(this.data.length / 5) + 1;
      this.upData();
      // 开启动画
      this.startInterval();
      // 监听
      window.addEventListener("resize", this.sereeAdapter);
    },

    // 更新界面
    upData() {
      const start = (this.currentPage - 1) * 5;
      const end = this.currentPage * 5;
      const showData = this.data.slice(start, end);
      const sellerNames = showData.map((item) => {
        return item.name;
      });
      const sellerValue = showData.map((item) => {
        return item.value;
      });
      const option = {
        title: {
          text: "▎每日漫画更新",
          left: 10,
          top: 5,
          textStyle: {
            color: "#cccc99",
            fontSize: 18
          }
        },
        xAxis: {
          type: "value",
          max: this.data[this.data.length - 1].value
        },
        yAxis: {
          type: "category",
          data: sellerNames
        },
        grid: {
          top: "25%",
          bottom: "0",
          left: "0",
          right: "10%",
          containLabel: true
        },
        // 文字显示
        tooltip: {
          trigger: "axis",
          type: "line",
          z: 0,
          lineStyle: {
            width: 5,
            color: `#e2e2e2`
          }
        },
        series: [
          {
            type: "bar",
            data: sellerValue,
            backgroundStyle: {
              borderRadius: [0, 10, 10, 0]
            },

            itemStyle: {
              barBorderRadius: [0, 20, 20, 0],
              color: new this.$Echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#5052EE"
                },
                {
                  offset: 1,
                  color: "#AB6EE5"
                }
              ])
            }
          }
        ]
      };
      this.chartInstance.setOption(option);
    },

    // 动画
    startInterval() {
      if (this.timerId) {
        clearInterval(this.timerId);
      }
      this.timerId = setInterval(() => {
        this.currentPage++;
        if (this.currentPage > this.totalPage) {
          this.currentPage = 1;
        }
        this.upData();
      }, 5000);
    },

    // 鼠标触摸停止动画
    initChart() {
      this.chartInstance = this.$Echarts.init(this.$refs.box); //初始化echarts
      this.chartInstance.on("mouseover", () => {
        clearInterval(this.timerId);
      });
      this.chartInstance.on("mouseout", () => {
        this.startInterval();
      });
    },

    // 监听函数
    sereeAdapter() {
      const titiFontSize = (this.$refs.box.offsetWidth / 100) * 3.6;
      // 和分辨率大小的相关配置
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titiFontSize
          }
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titiFontSize
            }
          }
        },
        series: [
          {
            barwidth: titiFontSize,
            itemStyle: {
              barBorderRadius: [0, titiFontSize / 2, titiFontSize / 2, 0]
            }
          }
        ]
      };
      this.chartInstance.setOption(adapterOption);
      // 需要手动调用图表对象的resize才能产生效果
      this.chartInstance.resize();
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  width: 3.91rem /* 250/64 */;
  height: 3.44rem /* 220/64 */;
  background-color: #669999;
  border-radius: 0.16rem /* 10/64 */;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 0.28rem /* 18/64 */;
  align-items: center;
  line-height: 2.5rem /* 160/64 */;
  font-weight: 600;
  color: #ff9966;

  p {
    color: #ff6666;
  }
}
</style>
