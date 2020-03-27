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
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',
  //解析模块的规则
  resolve: {
    //解析路径别名
    alias: {
      $css: resolve(__dirname, 'src/css')
    },

    //配置省略文件路径后缀名
    extensions: ['.js', '.json', '.jsx'],

    //告诉webpack 解析模块的时候去哪个目录
    modules: [resolve(__dirname, '../node_modules')]
  }
};
