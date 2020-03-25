/*
使用dll技术 对某些第三方库进行单独打包
指令webpack默认是找webpack.config.js
要运行webpack.dll.js的话 需要 webpack --config webpack.dll.js
*/
const { resolve } = require('path');
const webpack = require('webpack');
module.exports = {
  entry: {
    //最终打包生成的name ：[要打包的库名]
    jquery: ['jquery']
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    //打包向外暴露的内容叫什么名字
    library: '[name]_[hash]'
  },
  plugins: [
    //打包生成一个manifest.json 提供映射
    new webpack.DllPlugin({
      name: '[name]_[hash]', //映射库的暴露内容的名字
      path: resolve(__dirname, 'dll/manifest.json')
    })
  ],
  mode: 'production'
};
