// import '@babel/polyfill'
import '../css/style.css';
import { mul } from './test';

console.log(mul(1, 2));

/*
    注册service worker 处理兼容性问题
    1.eslint不认识全局变量
    需要修改package.json的eslintConfig"env": {
        "browser": true
        }
    2.service-worker必须运行在服务器上
        nodejs / npm i serve -g
*/

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('serviceworker注册成功');
      })
      .catch(() => {
        console.log('serviceworker注册失败');
      });
  });
}
