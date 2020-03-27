const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

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
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      // 以下都是默认值
      minSize: 30 * 1024, //分割的chunk最小为30kb
      maxSize: 0, //最大没有限制
      minChunks: 1, //要提取的chunks最少被引用一次
      maxAsyncRequests: 5, //按需加载时，并行加载的文件数的最大为5
      maxInitialRequests: 3, //入口js文件最大并行请求数量
      automaticNameDelimiter: '~', //名称连接符
      name: true, //可以使用命名规则
      cacheGroups: {
        //分割chunk的组
        //node_modules的文件会被打包到vendors组的chunk中 --- vendors~xxx.js
        //满足上面的公共规则 大于30kb 至少被引用一次
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          //优先级 -10
          priority: -10
        },
        default: {
          //要提取的chunks最少被引用2次
          minChunks: 2,
          //优先级 -20
          priority: -20,
          //如果当前要打包的模块和之前已经被提取的模块是同一个 就会复用
          reuseExistingChunk: true
        }
      }
    },
    // 将当前模块记录的其他模块的hash单独打包成一个文件runtime
    // 解决缓存失效
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer: [
      //配置生产环境的压缩方案 js和css
      new TerserWebpackPlugin({
        //开启缓存
        cache: true,
        //开启多进程打包
        parallel: true,
        //启动source-map
        sourceMap: true
      })
    ]
  }
};
