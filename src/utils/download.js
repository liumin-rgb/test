let downLoadFile=function (url){
  let  downloadUrl=url; //url;
  utils.request.get(downloadUrl,{responseType:'blob'},true).then(res=>{
		  			if(res){		  					
		  				        if (typeof window.chrome !== 'undefined') {
		  				          // Chrome version
		  				          const blob = new Blob([res], { type: 'application/vnd.ms-excel ' })
		  				          const urls = window.URL.createObjectURL(blob)
		  				          const a = document.createElement('a') // 生成虚拟a标签
		  				          a.href = urls
		  				          a.download = utils.cache.getSession("fileName")+".xlsx"
		  				          a.click()
		  				          document.body.removeChild(a) // 下载完成移除元素
		  				          window.URL.revokeObjectURL(urls) // 释放掉blob对象
		  				        } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
		  				          // IE version
		  				          const blob = new Blob([res], { type: 'application/force-download' })
		  				          window.navigator.msSaveBlob(blob, utils.cache.getSession("fileName")+".xlsx")
		  				        } else {
		  				          // Firefox version
		  				          const file = new File([res], utils.cache.getSession("fileName")+".xlsx", { type: 'application/force-download' })
		  				          window.open(URL.createObjectURL(file))
		  				        }		  					  						  				
		  			}
		    });

}

export default downLoadFile;
