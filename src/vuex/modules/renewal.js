export default {
  namespaced: true,
  state: {
	  qsh:'',
    shaixuanObj:{}
  },
  mutations: {
    setQsh:(state,qsh)=>{
       state.qsh=qsh;
    },
    setShaixuanObj:(state,shaixuanObj)=>{
      state.shaixuanObj=shaixuanObj;
    }
  },
  actions: {
   changeQsh:(context,qsh)=>{
     context.commit('setQsh',qsh);
   },
   changeShaixuanObj:(context,shaixuanObj)=>{
     context.commit('setShaixuanObj',shaixuanObj);
   },
  }
}
