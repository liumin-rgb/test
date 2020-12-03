import Vue from 'vue'
import Vuex from 'vuex';

const componentContext = require.context('./modules', false, /.js$/);
const modules = componentContext.keys().reduce((result, fileName) => {
  const moduleName = fileName.replace(/\.\/(.*)\.js$/g, '$1');
  result[moduleName] = componentContext(fileName).default;
  return result
}, {});

Vue.use(Vuex);
export default new Vuex.Store({
  modules,
})
