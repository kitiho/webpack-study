const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

/*
tree shaking 去除无用代码 
1.必须使用es6模块化 2.开启production环境
让代码体积更小 
package.json中配置 "sideEffects": false 所有代码都没有副作用 都可以进行tree-shaking
会把css干掉
"sideEffects":["*.css","*.less"]可以解决
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
              cacheDirectory:true
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
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:10].css'
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'production',
};
