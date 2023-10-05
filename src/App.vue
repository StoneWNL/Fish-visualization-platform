<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="logo">
          <img src="./assets/img/toplogo.png" alt />
        </div>
        <el-menu
          :default-active="defaultActive"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          :router="router"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/screenPage">数据可视</el-menu-item>
          <el-menu-item index="/banjiPage">班级姓名</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>

      </el-main>
    </el-container>  
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      router: true,
      defaultActive: "/",
      isShow: false
    };
  },
  methods: {
    handleSelect(key) {
      this.isShow = this.defaultActive != key;
      window.console.log(this.isShow);
    }
  }
};
</script>

<style lang="less">
@padding: 0;

*,
*:before,
*:after {
  padding: @padding;
  margin: @padding;
}

html,
body {
  height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 1240px;
  margin: 0 auto;

  .logo {
    width: 280px;
    padding: 5px;

    img {
      width: 100%;
      line-height: 60px;
    }
  }
}

.el-main {
  padding: 0 !important;
}

</style>
