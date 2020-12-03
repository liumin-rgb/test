const regular = {
	char1to50:{rule:/^.{1,50}$/,msg:'请输入1-50个字的公告内容'}, //1到50个字符

}

export const validator ={
	checkNull(val,msg){
		if (val ===''||val==undefined||val==null||val.length==0) {		
			utils.box.toast(msg);
			 return false;
		}
		return true
	},
	checkRule(val,msg,test){	
			if (val == '') {
				utils.box.toast(msg);
				  return false;
			}
			if (!val.match(regular[test].rule)){
				 utils.box.toast(regular[test].msg);
				 return false;
			}
			return true
		
	}
}
export default validator;