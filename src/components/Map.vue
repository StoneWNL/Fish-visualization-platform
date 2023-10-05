<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div class="com-container">
        <div @click="revertMap" class="back" :style="btnStyle" v-show="isShow">
            返回
        </div>
        <div class="com-chart" ref="map_ref"></div>
    </div>
</template>

<script>
import axios from "axios";
import { getProvinceMapInfo } from "@/utils/map_utils";
import { mapState } from "vuex";
export default {
    data() {
        return {
            myChart: null,
            allData: null,
            mapData: {},
            titleFontSize: 0,
            isShow: false,
        };
    },
    created() { },
    mounted() {
        this.initChart();
        window.addEventListener("resize", this.screenAdapter);
        this.screenAdapter();
    },
    destroyed() {
        window.removeEventListener("resize", this.screenAdapter);
    },
    computed: {
        ...mapState(["theme"]),
        btnStyle() {
            return {
                fontSize: this.titleFontSize / 2 + "px",
                color: "#fff",
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
        async initChart() {
            this.myChart = this.$echarts.init(this.$refs.map_ref, 'dark');
            const { data: ret } = await axios.get(
                `//${location.host}/static/map/china.json`
            );
            this.$echarts.registerMap("china", ret);
            const initOption = {
                title: {
                    text: "鱼产品销售用户分布图",
                    left: 20,
                    top: 20,
                    textStyle: {
                        color: "#fff",
                    },
                },
                legend: {
                    left: "5%",
                    bottom: "5%",
                    orient: "vertical",
                    textStyle: {
                        color: "#fff",
                    },
                },
                backgroundColor: 'rgba(51, 51, 51, 1)',
                geo: {
                    type: "map",
                    map: "china",
                    top: "5%",
                    bottom: "5%",
                    itemStyle: {
                        areaColor: "#2E72BF",
                        borderColor: "#333",
                    },
                },
            };
            this.myChart.setOption(initOption);
            this.myChart.on("click", async (arg) => {
                const provinceInfo = getProvinceMapInfo(arg.name);
                if (provinceInfo.key) {
                    if (!this.mapData[provinceInfo.key]) {
                        const { data: ret } = await axios.get(
                            `//${location.host}${provinceInfo.path}`
                        );
                        this.mapData[provinceInfo.key] = ret;
                        this.$echarts.registerMap(provinceInfo.key, ret);
                    }

                    this.isShow = true;
                    const changeOption = {
                        geo: {
                            map: provinceInfo.key,
                        },
                    };
                    this.myChart.setOption(changeOption);
                }
            });

            // 添加散点数据
            const scatterData = [
                { name: "广西贺州", value: [111.566694, 24.403582] },
                { name: "北京市", value: [116.407394, 39.904211] },
                { name: "上海市", value: [121.473662, 31.230372] },
                { name: "福建福鼎", value: [120.219375, 27.318884] },
                { name: "浙江连云港", value: [119.221611, 34.596653] },
            ];

            this.updateChart(scatterData);
        },
        updateChart(scatterData) {
            const legendArr = scatterData.map((item) => {
                return item.name;
            });
            const seriesArr = scatterData.map((item) => {
                return {
                    type: "scatter",
                    name: item.name,
                    coordinateSystem: "geo",
                    symbol: "pin", // 散点图使用标记类型为"pin"，可根据需要自行调整
                    symbolSize: 30, // 散点图标记大小，可根据需要自行调整
                    itemStyle: {
                        color: 'rgba(255, 255, 0, 0.6)', // 设置 symbol 的颜色和透明度
                    },
                    data: [item],
                };
            });

            const dataOption = {
                legend: {
                    data: legendArr,
                },
                series: seriesArr,
            };
            this.myChart.setOption(dataOption);
        },
        screenAdapter() {
            this.titleFontSize = (this.$refs.map_ref.offsetWidth / 100) * 3.6;
            const adapterOption = {
                title: {
                    textStyle: {
                        fontSize: this.titleFontSize,
                    },
                },
                legend: {
                    itemWidth: this.titleFontSize / 2,
                    itemHeight: this.titleFontSize / 2,
                    textStyle: {
                        fontSize: this.titleFontSize / 2,
                    },
                },
            };
            this.myChart.setOption(adapterOption);
            this.myChart.resize();
        },
        revertMap() {
            this.isShow = false;
            const revertOption = {
                geo: {
                    map: "china",
                },
            };
            this.myChart.setOption(revertOption);
        },
    },
};
</script>

<style lang="less" scoped>
.back {
    position: absolute;
    left: 40%;
    top: 12%;
    z-index: 999;
    cursor: pointer;
}
</style>
