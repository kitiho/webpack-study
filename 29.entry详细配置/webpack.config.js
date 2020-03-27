const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
    entry:入口
    1.string => './src/js/index.js'
        单入口
        打包形成一个chunk 输出一个bundle文件 
        此时chunk的name默认为main
    2.array => ['./src/js/index.js','./src/js/add.js']
        多入口
        所有入口文件最终只会形成一个chunk，输出出去只有一个bundle文件
        => 只有在HMR功能中让html热更新生效~
    3.object
        多入口
        {
            index:'./src/js/index.js',
            add: './src/js/add.js'
         }
         有几个入口文件就有几个chunk 输出几个bundle文件
         此时chunk的name是key

         => 特殊用法
            {
                index: ['./src/js/index.js','./src/js/count.js'],
                add: './src/js/add.js'
            },
            dll功能有用到

*/
module.exports = {
  entry: {
    index: ['./src/js/index.js','./src/js/count.js'],
    add: './src/js/add.js'
  },
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
};
