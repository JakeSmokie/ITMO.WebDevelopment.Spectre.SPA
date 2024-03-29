// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import UniqueId from 'vue-unique-id';
import Vue2Filters from 'vue2-filters'

Vue.use(Vue2Filters);
Vue.use(require('vue-cookie'));
Vue.use(UniqueId);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});


