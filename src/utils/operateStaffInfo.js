const operateStaff = {
  getInfoByType: function(params) {
    var _promise=new Promise(function(resolve, reject){
      let url='/api/Employee/getEmployeeInfoByType?id='+params.id+'&infoType='+params.infoType+'&pageIndex='+params.pageIndex+'&pageSize='+params.pageSize;
      utils.request.get(url).then((res) => {
        if (res) {
          if(res.success==true){
           resolve(res.result);
          }else{
            let error=res.error||{};
            utils.box.toast(error.message);
          }
        }
      })
    })
    return _promise;
  },
  addOrUpdateInfoByType: function(params) {
     var _promise=new Promise(function(resolve, reject){
   let url='/api/Employee/addOrUpdateEmpInfoByType?isAdd='+params.isAdd+'&infoType='+params.infoType;
   let data=params.data;
   utils.request.post(url, data).then((res) => {
     if (res) {
       if(res.success==true){
         resolve();
       }else{
         let error=res.error||{};
         utils.box.toast(error.message);
       }
     }
   })
   })
   return _promise;
  },
  deleteInfoByType: function(params) {
     var _promise=new Promise(function(resolve, reject){
   let url='/api/Employee/deleteEmpInfoByType?infoType='+params.infoType;
   utils.request.post(url, params.ids).then((res) => {
     if (res) {
       if(res.success==true){

       }else{

       }
     }
   })
   })
   return _promise;
  }
}
export default operateStaff
