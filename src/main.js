// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import utils from './unils/index.js'

//数据格式处理
Vue.prototype.$utils = utils

Vue.use(router)
// 引用API文件
import api from './api/index.js'
// 将API方法绑定到全局
Vue.prototype.$api = api

Vue.use(ElementUI, { size: 'small' })

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
      sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
      next({
          path: '/login'
      });
  } else {
      next();
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})
