import BabelPolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import router from './router'
import utils from './utils'
import Global from './assets/lib/globalConfig.js'
import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);
Vue.prototype.GLOBAL = Global;
window.utils = utils;
Vue.use(BabelPolyfill)
import $ from 'jquery'
 import './assets/css/main_pc.css';
 import './assets/css/new.css'
import './assets/iconfont/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false;
Vue.use(Antd);

import {
  Table,
  TableColumn,
  Message,
  MessageBox,
  Loading,
  Tree,
  Switch
} from 'element-ui'

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Loading);
Vue.use(Tree);
Vue.use(Switch);

window.eventBus = new Vue(); //注册全局事件对象
Vue.prototype.$loading = Loading.service;
Vue.prototype.$MessageBox=MessageBox;
Vue.prototype.$message=Message;
import {validator} from './utils/validator.js'
Vue.prototype.$validator=validator
var VueApp = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
export default VueApp
