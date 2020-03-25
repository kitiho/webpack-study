const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.NODE_ENV = 'development';

module.exports = {
  entry: ['./src/js/index.js', './src/index.html'],
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: '/img'
        }
      },

      {
        exclude: /\.(css|html|jpg|png|gif|js|less)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: '/media'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    port: 3000,
    open: true,
    compress: true,
    //开启HMR功能
    hot: true
  },
  /*
  source-map 构建后代码和源代码的映射
  [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

  source-map:准确错误信息和源文件
  inline-source-map内联 准确错误信息和源文件
  hidden-source-map外部 只有错误信息 没有源文件位置 隐藏源代码
  eval-source-map内联 每行后面 准确错误信息和源文件 还有hash值
  nosources-source-map 能找到错误信息 没有源代码 隐藏源代码
  cheap-source-map 有错误信息 也有源代码 只能精确到行
  cheap-module-source-map 

  考虑环境：
  开发环境：速度快 eval-source-map eval-cheap-source-map
         调式友好 source-map cheap-module-source-map
  生产环境：隐藏源代码 不用内联 体积大
   */
  devtool: 'eval-source-map'
};
