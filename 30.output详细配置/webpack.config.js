const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
   

*/
module.exports = {
  entry: './src/js/index.js',
  output: {
    //文件名称 ： 指定名称和目录
    filename: 'js/[name].js',

    //输出文件目录 所有输出资源的公共目录
    path: resolve(__dirname, 'build'),

    //所有输出资源的引入的公共路径前缀 => 路径的前面     //'imags/a.jpg' => '/imgs/a.jpg'
    publicPath: '/', 

    //非入口chunk的名称
    chunkFileName: 'js/[name]_chunk.js',

    //全局整个库向外暴露的变量名
    library: ['name'],
    
    //变量名添加到window上
    libraryTarget: 'window'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
};
