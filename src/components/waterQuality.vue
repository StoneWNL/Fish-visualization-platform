<template>
    <div class="com-container">
        <div class="com-chart" ref="waterQuality_ref">
            <div class="title" :style="comStyle">
                水质监测数据</div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
// import { getThemeValue } from "@/utils/theme_utils";   
export default {
    data() {
        return {
            myChart: null, // echarts实例对象
            allData: null, // 服务器获取的所有数据 
            titleFontize: 0,//标题字体大小
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
        // Initializes the echartsInstance object.
        initChart() {
            this.myChart = this.$echarts.init(this.$refs.waterQuality_ref, 'dark');
            // Initializes the configuration options.
            const initOption = {
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        formatter: function (value) {
                            return value.length > 6 ? value.slice(0, 6) + "..." : value;
                        },
                    },
                },
                yAxis: {
                    type: 'value',
                },
                title: {
                    value: "水质监测数据",
                },
                grid: {
                    left: "3%",
                    top: "30%",
                    right: "4%",
                    bottom: "1%",
                    containLabel: true,
                },
                // 工具提示
                tooltip: {
                    trigger: "axis",
                },
                // 图例位置和形状
                legend: {
                    left: 20,
                    top: "15%",
                    icon: "circle",
                },
                series: [
                    {
                        type: 'line'
                    }
                ]
            }
            this.myChart.setOption(initOption)
        },

        screenAdapter() {
            this.titleFontSize = (this.$refs.waterQuality_ref.offsetWidth / 100) * 3.6;
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

        async getData() {
            // const { data: ret } = await this.$http.get("waterQuality");
            const ret = [
                {
                    "data": {
                        "time": ["2022-01-01 08:00:00", "2022-01-01 09:00:00", "2022-01-01 10:00:00", "2022-01-01 11:00:00", "2022-01-01 12:00:00", "2022-01-01 13:00:00"],
                        "temperature": [26, 27, 25, 28, 26, 24],
                        "ph": [7.5, 7.3, 7.4, 7.2, 7.6, 7.8],
                        "dissolvedOxygen": [8.4, 9.6, 7.1, 8.9, 8.2, 9.1],
                        "TSS": [12, 18, 13, 16, 14, 17]
                    }

                },
            ];
            this.allData = ret[0].data;
            this.updateChart();
        },

        // Updates the chart.
        updateChart() {
            const timeArr = this.allData.time;
            const phArr = this.allData.ph;
            const temperArr = this.allData.temperature;
            const oxygenArr = this.allData.dissolvedOxygen;
            const tssArr = this.allData.TSS;

            const dataOption = {
                xAxis: {
                    data: timeArr
                },
                title: {
                    text: '水质监测数据 ',
                    left: 'center',
                    top: '5%',
                    textStyle: {
                        color: '#fff',
                        fontSize: 22,
                        fontWeight: 'normal',
                    }
                },
                series: [
                    {
                        name: "温度",
                        type: "line",
                        data: temperArr,
                        smooth: true,
                        areaStyle: {
                            opacity: 0.1
                        }
                    },
                    {
                        name: "溶解氧",
                        type: "line",
                        data: oxygenArr,
                        smooth: true,
                        areaStyle: {
                            opacity: 0.3
                        }
                    },
                    {
                        name: "悬浮颗粒物",
                        type: "line",
                        data: tssArr,
                        smooth: true,
                        areaStyle: {
                            opacity: 0.2
                        }
                    },
                    {
                        name: "pH",
                        type: "line",
                        data: phArr,
                        smooth: true,
                        areaStyle: {
                            opacity: 0.4
                        }
                    },
                ],
            };

            this.myChart.setOption(dataOption);
        },

    },
    computed: {
        ...mapState(["theme"]),
        // 设置给标题的样式
        comStyle() {
            return {
                fontSize: this.titleFontSize + "px"
            };
        }
    }
};
</script>

<style lang="less" scoped></style>
