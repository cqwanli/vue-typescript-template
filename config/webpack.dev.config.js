const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base.config');
module.exports = merge(baseConfig, {
    devServer: {
        contentBase: path.join(__dirname, '../dist'),   //文件所在目录
        compress: true,
        port: 8000
    },
    devtool: "cheap-source-map",
    resolve: {
        alias: {
          vue: 'vue/dist/vue.js'
        }
      }
})