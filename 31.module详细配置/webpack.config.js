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
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        //排除node_modules下的文件
        exclude: /node_modules/,
        //只检查src下的文件
        include: resolve(__dirname, 'src'),
        //优先执行和延后执行
        enforce: 'pre', //'post'
        //一些选项
        options: {}
      },
      {
        //以下配置只生效一个
        oneOf: []
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
};
