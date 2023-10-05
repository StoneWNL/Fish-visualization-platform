<template>
    <div class="com-container">
        <div class="com-chart" ref="OccurrenceRate_ref"></div>
        <span class="iconfont arr-left" @click="toLeft" :style="comStyle">&#xe6ef;</span>
        <span class="iconfont arr-right" @click="toRight" :style="comStyle">&#xe6ed;</span>
        <span class="cat-name" :style="comStyle">{{ catName }}</span>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    data() {
        return {
            myChart: null,
            allData: null,
            curIndex: 0,
            titleFontSize: 0,
            diseaseNames: [
                "鱼虱病",
                "黏体病",
                "传染性鳅鱼病",
                "细菌性鳃病"
            ],
        };
    },
    mounted() {
        this.initChart();
        this.getData();
        window.addEventListener("resize", this.screenAdapter);
        this.screenAdapter();
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.screenAdapter);
    },
    computed: {
        ...mapState(["theme"]),
        catName() {
            if (!this.allData) {
                return "";
            } else {
                return this.allData[this.curIndex].fishname;
            }
        },
        comStyle() {
            return {
                fontSize: this.titleFontSize + "px",
            };
        },
    },
    watch: {
        theme() {
            this.myChart.dispose();
            this.initChart();
            this.screenAdapter();
            this.updateChart();
        },
    },
    methods: {
        initChart() {
            this.myChart = this.$echarts.init(this.$refs.OccurrenceRate_ref, 'dark');

            const initOption = {
                title: {
                    text: "▎ 疾病发生率",
                    left: 20,
                    top: 20,
                    textStyle: {
                        color: "#fff",
                    },
                },
                legend: {
                    top: "15%",
                    icon: "circle",
                    textStyle: {
                        color: "#fff",
                    },
                    data: this.diseaseNames,
                },
                tooltip: {
                    show: true,
                },
                series: [
                    {
                        type: "pie",
                        label: {
                            show: false,
                        },
                        emphasis: {
                            label: {
                                show: true,
                            },
                            labelLine: {
                                show: false,
                            },
                        },
                        data: [], // Initialize with empty data
                    },
                ],
            };

            this.myChart.setOption(initOption);
        },
        async getData() {
            const testData = [
                {
                    fishname: "金枪鱼",
                    diseasevalue1: 100.0,
                    diseasevalue2: 200.0,
                    diseasevalue3: 300.0,
                    diseasevalue4: 400.0,
                },
                {
                    fishname: "草鱼",
                    diseasevalue1: 400.0,
                    diseasevalue2: 500.0,
                    diseasevalue3: 600.0,
                    diseasevalue4: 150.0,
                },
                {
                    fishname: "鲈鱼",
                    diseasevalue1: 200.0,
                    diseasevalue2: 300.0,
                    diseasevalue3: 177.0,
                    diseasevalue4: 200.0,
                },
                {
                    fishname: "鲑鱼",
                    diseasevalue1: 200.0,
                    diseasevalue2: 300.0,
                    diseasevalue3: 598.0,
                    diseasevalue4: 540.0,
                },
                {
                    fishname: "鳟鱼",
                    diseasevalue1: 177.0,
                    diseasevalue2: 377.0,
                    diseasevalue3: 777.0,
                    diseasevalue4: 240.0,
                },
            ];
            this.allData = testData;

            this.updateChart();
        },
        updateChart() {
            if (this.allData && this.myChart) {
                const seriesData = Object.values(this.allData[this.curIndex])
                    .filter((value, index) => index !== 0)
                    .map((value, index) => ({
                        name: this.diseaseNames[index],
                        value,
                    }));

                const dataOption = {
                    series: [
                        {
                            data: seriesData,
                        },
                    ],
                };

                this.myChart.setOption(dataOption);
            }
        },
        screenAdapter() {
            this.titleFontSize = (this.$refs.OccurrenceRate_ref.offsetWidth / 100) * 3.6;

            const adapterOption = {
                title: {
                    textStyle: {
                        fontSize: this.titleFontSize,
                    },
                },
                legend: {
                    itemWidth: this.titleFontSize,
                    itemHeight: this.titleFontSize,
                    itemGap: this.titleFontSize / 2,
                    textStyle: {
                        fontSize: this.titleFontSize / 2,
                        color: "#fff",
                    },
                },
                series: [
                    {
                        radius: this.titleFontSize * 4.5,
                        center: ["50%", "55%"],
                    },
                ],
            };

            this.myChart.setOption(adapterOption);
            this.myChart.resize();
        },
        toLeft() {
            this.curIndex--;
            if (this.curIndex < 0) {
                this.curIndex = this.allData.length - 1;
            }
            this.updateChart();
        },
        toRight() {
            this.curIndex++;
            if (this.curIndex > this.allData.length - 1) {
                this.curIndex = 0;
            }
            this.updateChart();
        },
    },
};
</script>


<style lang="less" scoped>
.arr-left {
    position: absolute;
    left: 10%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #fff;
}

.arr-right {
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #fff;
}

.cat-name {
    position: absolute;
    left: 80%;
    bottom: 5%;
    color: #fff;
}
</style>
