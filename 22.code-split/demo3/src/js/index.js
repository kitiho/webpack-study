// import '@babel/polyfill'


console.log('main');

/*
    通过js代码让某个文件单独打包为一个chunk
    import动态导入语法
*/
import(/* webpackChunkName: 'test' */'./test')
    .then(({mul,minus})=>{
        console.log(mul(1,2));
    })
    .catch(()=>{
        console.log('文件加载失败');
    })