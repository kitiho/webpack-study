const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
/*
多进程打包 多个进程一起打包 thread-loader

*/

//定义nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production';

//复用css要用的loader
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    //还需要在package.json中定义browserslist
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [require('postcss-preset-env')()]
    }
  }
];

module.exports = {
  entry: './src/js/index.js',
  output: {
    //文件缓存 修改文件名加hash值
    //chunkhash 解决所有缓存失效 根据chunk生成hash值
    //css是在js中引入的 所以属于同一个chunk
    //contenthash 根据文件内容生成hash。不同文件的hash就不一样
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      //正常来讲一个种类的文件只能被一个loader处理 当要被多个loader处理时 要指定先后顺序：先eslint 再babel
      {
        //在package.json中配置eslintConfig 使用airbnb规则
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        //优先执行
        enforce: 'pre',
        options: {
          fix: true
        }
      },
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
            test: /\.css$/,
            use: [...commonCssLoader]
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader, 'less-loader']
          },
          {
            //处理图片资源
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[hash:10].[ext]',
              outputPath: 'imgs'
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
            use: [
              /*
              开启多进程打包。进程开启需要时间 600ms 进程通信也需要时间
              只有长时间工作的时候用比较好
              */
              // {
              //   loader: 'thread-loader',
              //   options: {
              //     workers: 2 //进程2个
              //   }
              // },
              {
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
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:10].css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      /*
      1.帮助service worker快速启动
      2.删除旧的service worker
      生成一个service worker的配置文件
      */
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  mode: 'production'
};
