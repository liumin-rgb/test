 import { MessageBox } from 'element-ui'
import { Message } from 'element-ui'
const box = {
	confirm:  (content="确认执行此操作吗",title="提示")=>{			
				return MessageBox.confirm(content, title, {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          center: true
				        })
					
					
		},	
	toast:(content,type="warning")=>{
		Message({
		      duration:2000,  
		      type: type,
		      message: content
		    });
	}
}
export default box 