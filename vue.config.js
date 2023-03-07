const { defineConfig } = require("@vue/cli-service");

const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        }
      ]
    }
  }
};

module.exports = defineConfig({
  publicPath: "./", // 配置项目路径
  outputDir: "dist", // 构建输出目录，默认目录dist
  assetsDir: "assets", // 静态资源目录（js,css,image），默认是src/assets
  lintOnSave: false, // 是否开启eslint检测,false不开启，有效值：true || false
  productionSourceMap: false, // 生产环境下面开启sourceMap用于代码的调试true开启，false关闭
  devServer: {
    open: true, // 是否运行项目自动打开默认浏览器
    host: "localhost", // 主机，0.0.0.0支持局域网地址，可以用真机测试
    port: 3080, // 端口
    https: false, // 是否启动https
    // 配置跨域代理http,https
    proxy: {
      // 用户名登陆代理
      "/login": {
        target: "http://localhost:8237",
        changeOrigin: true,
        pathRewrite: {
          "^/login": ""
        }
      }
    }
  }
});
