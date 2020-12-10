const common = {
  getParam: function(paras) {
    var url = location.href;
    url = url.charAt(url.length - 1) == "#" ? url.substring(0, url.length - 1) : url;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {};
    var i, j;
    for (i = 0; j = paraString[i]; i++) {
      paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j
        .indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof(returnValue) == "undefined") {
      return "";
    } else {
      return returnValue;
    }
  },
  compare: (attr, rev) => {
    //第二个参数没有传递 默认升序排列
    if (rev == undefined) {
      rev = 1;
    } else {
      rev = rev ? 1 : -1;
    }
    return function(a, b) {
      a = a[attr] || '';
      b = b[attr] || '';
      a = typeof a == 'string' ? a.replace(/,/g, '') : a;
      b = typeof b == 'string' ? b.replace(/,/g, '') : b;
      if (Number(a) < Number(b)) {
        return rev * -1;
      }
      if (Number(a) > Number(b)) {
        return rev * 1;
      }
      return 0;
    };
  },
  //年月日格式化
  formatDate: (date, str) => {
    let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let now = date.getFullYear() + str + month + str + day;
    return now;
  },
  //年月格式化
  formatYearMonth: (date, str) => {
    let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let now = date.getFullYear() + str + month;
    return now;
  },
  //判断是否是生产环境
  checkProEnv: () => {
    if (location.origin.includes('sit')) {
      console.log('环境:sit');
      return false;
    } else {
      console.log('环境:生产');
      return true;
    }
  },
  //加逗号
  toThousands(num) {
    var result = '',
      counter = 0;
    num = (num || 0).toString();
    for (var i = num.length - 1; i >= 0; i--) {
      counter++;
      result = num.charAt(i) + result;
      if (num.charAt(i - 1) == '-' || num.charAt(i - 1) == '.') {
        result = '' + result;
        counter = -1;
      } else {
        if (!(counter % 3) && i != 0 && counter != 0) {
          result = ',' + result;
        }
      }

    }
    return result;
  },
  //判断是否微信跳转
  isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  },
  /**
   * 年月日 和'-' '/' 的相互转化
   */
  exeTime(str, x) {
    if (str != null && str != "") {
      if (str.indexOf(x) != -1) {
        var dateArr = str.split(x);
        var year = dateArr[0];
        var month = dateArr[1];
        var date = dateArr[2];
        return (year + "年" + month + "月" + date + "日");
      } else if (str.indexOf('年') != -1) {
        return str.replace('年', '-').replace('月', '-').replace('日', '');
      }

    }
  },
  /**
   * @param 2020年08月和202008的相互转化
   */
  exeTime2(date) {
    let newDate = '';
    if (date == '' || date == null || date == undefined) return '';
    if (date.indexOf("年") != -1) {
      newDate = date.replace(/[\u4e00-\u9fa5]/g, '');
    } else {
      newDate = date.substring(0, 4) + '年' + date.substring(4, 6) + '月';
    }
    return newDate;
  },
  getYearandMonth(str) { //"2020-08-25"->"20/08"
    return (new Date(str).getFullYear().toString().substring(new Date(str).getFullYear().toString().length, 2)) + "/" +
      ((new Date(str).getMonth() + 1).toString().length > 1 ? (new Date(str).getMonth() + 1).toString() : "0" + (new Date(
        str).getMonth() + 1).toString())
  },
  getPoptime(arr) { //获取最新更新时间
    arr.sort((a, b) => {
      return new Date(b.popTime) - new Date(a.popTime)
    })
    return (new Date(arr[0].popTime).getFullYear().toString().substring(new Date(arr[0].popTime).getFullYear().toString()
      .length, 2)) + "/" + ((new Date(arr[0].popTime).getMonth() + 1).toString().length > 1 ? (new Date(arr[0].popTime)
      .getMonth() + 1).toString() : "0" + (new Date(arr[0].popTime).getMonth() + 1).toString())
  },
  /**
   * 去除空格
   */
  trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  /**
   * @param {Object} array
   * @param {Object} 将数组切割分成指定长度的数组
   */
  group(array, subGroupLength) {
    let index = 0;
    let newArray = [];
    while (index < array.length) {
      newArray.push(array.slice(index, index += subGroupLength));
    }
    return newArray;
  },
  /**
   * @param {Object} id
   * 获取下拉框的值
   */
  getSelectValue(id) {
    let Sel = document.getElementById(id);
    let index = Sel.selectedIndex;
    let text = Sel.options[index].text;
    let value = Sel.options[index].value;
    return value
  },
  /**
   * 根据出生日期计算年龄
   */
  getAge(strBirthday) {
    var returnAge;
    var strBirthdayArr = strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];
    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();
    if (nowYear == birthYear) {
      returnAge = 0; //同年 则为0岁
    } else {
      var ageDiff = nowYear - birthYear; //年之差
      if (ageDiff > 0) {
        if (nowMonth == birthMonth) {
          var dayDiff = nowDay - birthDay; //日之差
          if (dayDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        } else {
          var monthDiff = nowMonth - birthMonth; //月之差
          if (monthDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        }
      } else {
        returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
      }
    }
    return returnAge; //返回周岁年龄
  },
  getFileName(name){
  	let date=new Date();
  	 let year=date.getFullYear();
  	 let month=date.getMonth()+1;
  	 let day=date.getDate();
  	 let hour=date.getHours();
  	 let minute=date.getMinutes();
  	 let seconds=date.getSeconds();
  	 let time=year+''+month+day+hour+minute+seconds+seconds;
  	 return name+'-'+time;
  },
}
export default common
