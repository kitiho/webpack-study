const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/*
code split

*/

module.exports = {
  entry: './src/js/index.js',
  output: {
    //文件缓存 修改文件名加hash值
    //chunkhash 解决所有缓存失效 根据chunk生成hash值
    //css是在js中引入的 所以属于同一个chunk
    //contenthash 根据文件内容生成hash。不同文件的hash就不一样
    //name 取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      //正常来讲一个种类的文件只能被一个loader处理 当要被多个loader处理时 要指定先后顺序：先eslint 再babel

      {
        //以下loader只会匹配一个
        //注意：不能有两项配置处理同一个类型的文件
        oneOf: [
          {
            //处理其他资源
            exclude: /\.(js|css|less|jpg|png|gif|html)$/,
            loader: 'file-loader',
            options: {
              outputPath: 'media'
            }
          },

          {
            //处理html的图片资源
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            //js兼容性处理
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: { version: 3 },
                    targets: {
                      chrome: '60',
                      firefox: '50'
                    }
                  }
                ]
              ],
              //开启babel缓存
              //第二次构建时，会读取之前的缓存
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    //处理html资源
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        //压缩html文件
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  /*
    1.可以将node_modules的代码单独打包成一个chunk输出
    2.自动分析公共的依赖js 放入单独的chunk
  */
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  mode: 'production'
};
