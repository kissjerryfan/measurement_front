import Antd from 'ant-design-vue/lib'
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Antd)
Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
