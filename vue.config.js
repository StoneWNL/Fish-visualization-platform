// 使用vue-cli创建出来的vue工程, Webpack的配置是被隐藏起来了的 
// 如果想覆盖Webpack中的默认配置,需要在项目的根路径下增加vue.config.js文件
module.exports = {
  devServer: {
    port: 8081, // 端口号配置
    // open: true // 自动打开浏览器
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') { // 为生产环境修改配置...
      config.mode = 'production';
      config["performance"] = { //打包文件大小配置
        "maxEntrypointSize": 10000000,
        "maxAssetSize": 30000000
      }
    }
  }
}