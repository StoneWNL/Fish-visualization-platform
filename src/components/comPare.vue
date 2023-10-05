<template>
    <div class="com-container">
        <div class="com-chart" ref="costCompositionRef"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            curIndex: 0,
            allData: null,
            myChart: null,
            costNames: [
                "饲料费用",
                "设施设备费用",
                "员工工资支出",
                "场地设施费用"
            ]
        };
    },
    mounted() {
        this.initChart();
        this.getData();
        this.updateChart();
        window.addEventListener("resize", this.screenAdapter);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.screenAdapter);
    },
    methods: {
        initChart() {
            this.myChart = this.$echarts.init(
                this.$refs.costCompositionRef,
                "dark"
            );

            const initOption = {
                title: {
                    text: "成本组成结构",
                    left: "center",
                    top: 20
                },
                series: [
                    {
                        name: "成本",
                        type: "pie",
                        radius: ["40%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            show: true,
                            position: "outside",
                            formatter: "{b}: {c}",
                            fontSize: 12
                        },
                        labelLine: {
                            show: true,
                            length: 10,
                            length2: 10
                        },
                        data: [] // Initialize with empty data
                    }
                ]
            };

            this.myChart.setOption(initOption);
        },
        async getData() {
            const testData = [
                {
                    feedCost: 9000.0,
                    utilityCost: 2000.0,
                    payrollCost: 3000.0,
                    venueCost: 1000.0
                },
                {
                    feedCost: 8500.0,
                    utilityCost: 1600.0,
                    payrollCost: 2500.0,
                    venueCost: 1000.0
                },
                {
                    feedCost: 7000.0,
                    utilityCost: 1500.0,
                    payrollCost: 2600.0,
                    venueCost: 1200.0
                },
                {
                    feedCost: 6500.0,
                    utilityCost: 1400.0,
                    payrollCost: 1300.0,
                    venueCost: 1500.0
                },
                {
                    feedCost: 6700.0,
                    utilityCost: 3000.0,
                    payrollCost: 2500.0,
                    venueCost: 1500.0
                }
            ];
            this.allData = testData;

            this.updateChart();
        },
        updateChart() {
            if (this.allData && this.myChart) {
                const seriesData = Object.entries(this.allData[this.curIndex]).map(
                    ([name, value]) => ({
                        value: value,
                        name: name,
                        itemStyle: null // You can customize the itemStyle if needed
                    })
                );

                const dataOption = {
                    series: [
                        {
                            data: seriesData,
                            label: {
                                formatter: function (params) {
                                    const index = params.dataIndex;
                                    return `${this.costNames[index]}: ${params.value} `;
                                }.bind(this),
                                // Other label configurations
                            }
                        }
                    ]
                };

                this.myChart.setOption(dataOption);
                this.screenAdapter(); // Call screenAdapter() after updating the chart
            }
        },
        screenAdapter() {
            const containerWidth = this.$refs.costCompositionRef.offsetWidth;
            const containerHeight = this.$refs.costCompositionRef.offsetHeight;

            this.myChart.resize({
                width: containerWidth,
                height: containerHeight
            });
        },
        resizeChart() {
            if (this.myChart) {
                this.myChart.resize();
            }
        }
    }
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
