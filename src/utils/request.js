import axios from 'axios'
import Global from './../assets/lib/globalConfig.js'
import common from './common.js'
 let instance = axios.create({
  timeout: 50000,
});
/* import { Loading } from 'element-ui'; */
const option={fullscreen:true,text:'loading...'};
 let loadingInstance;
//请求拦截器
instance.interceptors.request.use(config => {
	let token=utils.cache.get("TOKEN")||'';
 // loadingInstance= Loading.service(option);
  config.headers['Content-Type'] = 'application/json;charset=UTF-8';
  config.headers['Authorization']=token?'Bearer ' + token:'';
  return config;
}, error => {
  //loadingInstance.close();
  console.log('请求失败!!!-----'+error.message);
  return Promise.reject(error);
})
//返回拦截器
instance.interceptors.response.use(response => {
	//response.request.responseType='blob';
  //loadingInstance.close()
  //console.log("%c 返回数据>>>>>>>", 'color:green', response.config.url + '\n', response.data);
  let disposition=response.headers["content-disposition"];
	if(disposition){
	let arr1=disposition.split(";")[1];
	let fileName=arr1.split("=")[1];
	fileName=fileName.split(".")[0];
	utils.cache.setSession("fileName",fileName)
	}
	return response.data;
}, error => {
  //loadingInstance.close();
  console.log('返回失败!!!-----'+error.message);
})
export default {
  axios: axios,
  get(service,isLoad) {
    // let token = utils.cache.get('TOKEN') || '';
    return instance.get(Global.baseUrl + service,isLoad)
  },
  post(service, params,isLoad) {
    console.log("%c 请求数据>>>>>>>", 'color:pink', JSON.parse(JSON.stringify(params)));
    return instance.post(Global.baseUrl + service, params,isLoad,)
  },
  delete(service,params,isLoad) {
	  return instance.delete(Global.baseUrl + service,params,isLoad,)
	},
  put(service,params,isLoad) {
	  return instance.put(Global.baseUrl + service,params,isLoad,)
	},
}
