import Vue from 'vue';
import loading from './loading.vue';


// 扩展实例构造器
const LoadingConstructor = Vue.extend(loading);

// 创建一个vue实例，挂载元素为新创建的div
let initLoadingInstance = function () {
    return new LoadingConstructor({
        el: document.createElement('div'),
    });
}

let instance = initLoadingInstance();
// 删除dom节点
let removeDom = (node) => {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
}
};
// 关闭loading
let closeLoading = () => {
    removeDom(instance.$el);
};
// 展示loading
let showLoading = function (isLoad) {
   if(isLoad){
     document.body.appendChild(instance.$el);
   }

}

export default {
    showLoading,
    closeLoading
}
