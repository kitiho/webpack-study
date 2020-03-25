import '../css/iconfont.css';
import '../css/style.less';
import print from './print';
console.log('main');
print();


if (module.hot) {
  //一旦module.hot为true 说明开启了HMR
  module.hot.accept('./print.js', function() {
    print();
  });
}
