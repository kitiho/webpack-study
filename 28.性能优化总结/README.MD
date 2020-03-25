## 开发环境优化

- 优化打包速度
  - HMR 只有一个模块更新只更新这个模块
- 优化代码调式
  - source-map

## 生产环境优化

- 优化打包构建速度
  - oneOf 只要匹配到了这个类型文件就直接使用这个 loader
  - babel 缓存
  - 多进程打包
- 优化代码运行性能
  - 缓存(hash、chunkhash、contenthash) 解决强缓存 改变文件名
  - tree shaking 去除没用的代码 es6+production 自动开启
  - code split 单入口和多入口 optimization import动态引入
  - 懒加载/预加载
  - PWA 离线也能访问
  - externals 通过CDN引入
  - dll 将库单独打包 manifest
