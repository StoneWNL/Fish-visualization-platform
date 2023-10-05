<template>
  <div class="com-container">
    <div class="com-chart" ref="profitCost_ref"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
    this.initChart();
    this.updateChartWithMockData();
    window.addEventListener("resize", this.resizeChart);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeChart);
  },
  methods: {
    initChart() {
      this.myChart = this.$echarts.init(this.$refs.profitCost_ref,'dark');

      const initOption = {
        title: {
          text: "鱼类养殖成本与收益",
          left: "center",
          top: 20,
        },
        grid: {
          left: "3%",
          top: "30%",
          right: "4%",
          bottom: "1%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["成本", "收益"],
          top: "14%",
          right: "10%",
          icon: "circle",
        },
        xAxis: {
          type: "category",
          axisLabel: {
            formatter: function (value) {
              return value.length > 6 ? value.slice(0, 6) + "..." : value;
            },
          },
          data: [], // 鱼类名称
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
          },
        },
        series: [
          {
            name: "成本",
            type: "bar",
            barWidth: "30%",
            label: {
              show: true,
              position: "insideRight",
            },
            data: [], // 成本数据
          },
          {
            name: "收益",
            type: "bar",
            barWidth: "20%",
            label: {
              show: true,
              position: "insideRight",
            },
            data: [], // 收益数据
          },
        ],
      };

      this.myChart.setOption(initOption);
    },
    updateChartWithMockData() {
      const mockData = [
        { name: "金枪鱼", cost: 10000, profit: 20000 },
        { name: "草鱼", cost: 15000, profit: 30000 },
        { name: "鲈鱼", cost: 8000, profit: 18000 },
        { name: "鲑鱼", cost: 10200, profit: 25000 },
        { name: "鳟鱼", cost: 9000, profit: 20200 },
      ];

      const fishNames = mockData.map((item) => item.name);
      const costData = mockData.map((item) => item.cost);
      const profitData = mockData.map((item) => item.profit);

      const dataOption = {
        xAxis: {
          data: fishNames,
        },
        series: [
          {
            name: "成本",
            data: costData,
          },
          {
            name: "收益",
            data: profitData,
          },
        ],
      };

      this.myChart.setOption(dataOption);
    },
    resizeChart() {
      if (this.myChart) {
        this.myChart.resize();
      }
    },
    screenAdapter() {
      this.titleFontSize = (this.$refs.profitCost_ref.offsetWidth / 100) * 3.6;
      const adapterOption = {
        legend: {
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize,
          itemGap: this.titleFontSize,
          textStyle: {
            fontSize: this.titleFontSize / 2,
          },
        },
      };
      this.myChart.setOption(adapterOption);
      this.myChart.resize();

    },
  },
};
</script>

<style lang="less" scoped>
.com-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.com-chart {
  width: 100%;
  height: 100%;
}
</style>
