<template>
    <div class="banner">
        <div class="mm"></div>
        <div class="banner-img">
            <img :src="img" alt="Banner Image" />
        </div>
        <div class="banner-title">
            <p>{{ title }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "bannerN",
    props: {
        title: {
            type: String,
            default: ""
        },
        img: {
            type: String,
            default: require("../assets/img/bgtop.jpg")
        }
    }
};
</script>

<style lang="less" scoped>
.banner {
    width: 100%;
    height: 300px;
    display: flex;
    position: relative;
    overflow: hidden;
    background-color: #fff;

    .mm {
        position: absolute;
        width: 100%;
        height: 100%;

        padding: 10px;
        margin: -10px;
        filter: blur(10px);

        background-image: url("~@/assets/img/bgtop.jpg");
        background-position: center;
        background-size: 100%;
    }

    .banner-img {
        position: relative;
        height: 100%;
    }

    img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        left: 50%;
        transform: translateX(-50%);
    }

    &-title {
        position: absolute;
        color: #fff;
        font-size: 45px;
        font-weight: 400;
        line-height: 300px;
        text-align: center;
        width: 100%;
    }
}
</style>
