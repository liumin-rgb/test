const cache = {
    set: (key, value) => {
      key = 'roche_' + key;
      if (typeof value == 'string') {
        localStorage.setItem(key, value);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    get: key => {
      key = 'roche_' + key;
      let value = localStorage.getItem(key);
      if (value && (value.substr(0, 1) == '{' || value.substr(0, 1) == '[')) {
        try {
          value = eval('(' + value + ')');
        } catch (e) {
          console.log('error in get cache key:' + key + ', value:' + value)
        }
      }
      return value;
    },
    removeItem: key => {
      key = 'roche_' + key;
      localStorage.removeItem(key);
    },
  
    setSession: (key, value) => {
      key = 'roche_' + key;
      if (typeof value == 'string') {
        sessionStorage.setItem(key, value);
      } else {
        sessionStorage.setItem(key, JSON.stringify(value));
      }
    },
    getSession: key => {
      key = 'roche_' + key;
      let value = sessionStorage.getItem(key);
      if (value && (value.substr(0, 1) == '{' || value.substr(0, 1) == '[')) {
        try {
          value = eval('(' + value + ')');
        } catch (e) {
          console.log('error in get cache key:' + key + ', value:' + value)
        }
      }
      return value;
    },
    removeSession: key => {
      key = 'roche_' + key;
      sessionStorage.removeItem(key);
    },
  addCookie:(objName, objValue, objDays)=>{
		 var str = objName + "=" + escape(objValue); //编码
		    if (objDays > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
		        var date = new Date();
		        var ms = objDays *24* 3600 * 1000;
		        date.setTime(date.getTime() + ms);
		        str += "; expires=" + date.toGMTString();
		    }
		    document.cookie = str;
	},
	getCookie:(objName)=>{
		var arrStr = document.cookie.split("; ");
		    for (var i = 0; i < arrStr.length; i++) {
		        var temp = arrStr[i].split("=");
		        if (temp[0] == objName) return unescape(temp[1]);  //解码
		    }
		    return "";
	}
    //不要用
    // clear: () => {
    // 	localStorage.clear();
    // },
  }
  
  export default cache
  