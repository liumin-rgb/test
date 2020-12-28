const download={
  downLoadFile (url,name){
    			  		   			let params='';
    			  		   		    utils.request.get(url,{responseType: 'arraybuffer'},true).then((res)=>{
    			  		   		  			if(res){
    			  		   			let fileName= utils.common.getFileName(name);
    			  		   		  				        if (typeof window.chrome !== 'undefined') {
    			  		   		  				          // Chrome version
    			  		   		  				          const blob = new Blob([res], { type: 'application/vnd.ms-word ' })
    			  		   		  				          const urls = window.URL.createObjectURL(blob)
    			  		   		  				          const a = document.createElement('a') // 生成虚拟a标签
    			  		   		  				          a.href = urls
    			  		   		  				          a.download = fileName+".xlsx"
    			  		   		  				          a.click()
    			  		   		  				         // document.removeChild(a) // 下载完成移除元素
    			  		   		  				          window.URL.revokeObjectURL(urls) // 释放掉blob对象
    			  		   		  				        } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
    			  		   		  				          // IE version
    			  		   		  				          const blob = new Blob([res], { type: 'application/force-download' })
    			  		   		  				          window.navigator.msSaveBlob(blob, fileName+".xlsx")
    			  		   		  				        } else {
    			  		   		  				          // Firefox version
    			  		   		  				          const file = new File([res], fileName+".xlsx", { type: 'application/force-download' })
    			  		   		  				          window.open(URL.createObjectURL(file))
    			  		   		  				        }
    			  		   		  				        // utils.cache.removeSession("fileName");
    			  		   		  			}
    			  		   		    });

},
downloadZip(url,params,name){
	//var params=params;
 utils.request.postFile(url,params,{responseType: 'blob'},true).then((res)=>{
  if(res){
 let blob = new Blob([res], {type: 'application/zip'})
 let url = window.URL.createObjectURL(blob)
 window.location.href = url
 }else{

 }
 })
},
}

export default download;
