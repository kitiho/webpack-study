const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

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
    filename: 'js/built.js',
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
                    useBuildIns: 'usage',
                    corejs: { version: 3 },
                    targets: {
                      chrome: '60',
                      firefox: '50'
                    }
                  }
                ]
              ]
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
      filename: 'css/built.css'
    }),
    new OptimizeCssAssetsWebpackPlugin()
  ],
  mode: 'production'
};
