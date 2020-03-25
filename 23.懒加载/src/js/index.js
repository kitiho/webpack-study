console.log('index文件被加载');

document.getElementById('btn').addEventListener('click', () => {
  //懒加载： 当需要使用时才加载
  //预加载： prefetch 会提前加载js文件  等其他资源加载完毕 浏览器空闲了再偷偷加载
  //正常加载： 并行加载(同一时间加载多个文件)
  import(/* webpackChunkName:'test',webpackPrefetch:true */ './test').then(
    ({ add, minus }) => {
      console.log(add(1, 2));
    }
  );
});
