import axios from 'axios'
import Global from './../assets/lib/globalConfig.js'
import common from './common.js'
import loading from '../plugins/loading.js'

 let instance = axios.create({
  timeout: 50000,
});
 let loadingInstance;
//请求拦截器
instance.interceptors.request.use(config => {
	let token=utils.cache.get("TOKEN")||'';
  loading.showLoading(config.isLoad);
  config.headers['Content-Type'] = 'application/json;charset=UTF-8';
  config.headers['Authorization']=token?'Bearer ' + token:'';
  return config;
}, error => {
  loading.closeLoading();
  console.log('请求失败!!!-----'+error.message);
  return Promise.reject(error);
})
//返回拦截器
instance.interceptors.response.use(response => {
  loading.closeLoading();
	return response.data;
}, error => {
 loading.closeLoading();
  console.log('返回失败!!!-----'+error.message);
})
export default {
  axios: axios,
  get(service,isLoad=false) {
    // let token = utils.cache.get('TOKEN') || '';
    return instance.get(Global.baseUrl + service,{isLoad:isLoad})
  },
  post(service, params,isLoad=false) {
    console.log("%c 请求数据>>>>>>>", 'color:pink', JSON.parse(JSON.stringify(params)));
    return instance.post(Global.baseUrl + service, params,{isLoad:isLoad})
  },
  delete(service,isLoad=false) {
	  return instance.delete(Global.baseUrl + service,{isLoad:isLoad})
	},
  put(service,params,isLoad=false) {
	  return instance.put(Global.baseUrl + service,params,{isLoad:isLoad})
	},
}
