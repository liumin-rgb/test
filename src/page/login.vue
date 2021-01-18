<template>
  <div>
    <div class="bg-login">
      <div class="header-login">
        <div><img src='../assets/img/logo_blue.png'/></div>
      </div>
	  <div class="tab-login">
	    <div class="tab-inner-login">
	    <div class="tab-text-login">账号密码登录</div>
	    <div class="tab-con-login">
	    <div class="context"><span><img src="../assets/img/icon-user.png"/></span><input class="login-input" placeholder="请输入账号"  v-model="displayName" @keyup.enter="skipInput"/>
      <span></span>
      </div>
	    <div class="context positionR"><span><img src="../assets/img/icon-passward.png"/></span><input class="login-input" v-model="password" placeholder="请输入密码"  :type="ifShow?'text':'password'"  @keyup.enter="skipInput"/>
      <span class="eye" @click="ifShow=!ifShow"><i :class="['iconfont', 'themeColor','font20',ifShow?'icon-kejian':'icon-bukejian']"></i></span>
      <div class="errInfo" v-show="errorMsg!=''"><img src="../assets/img/icon-warning.png"/><span>{{errorMsg}}</span></div>
      </div>
	    <div class="login pointer" @click="login">登录</div>
	    </div>
	    </div>
	  </div>


    </div>

  </div>
</template>

<script>
  export default{
    name:'login',
    data(){
		return{
	   email:'',
     password:'' ,
	   displayName:'',
     errorMsg:'',
     ifShow:false,

    }},
    mounted(){
     	utils.cache.removeItem('TOKEN');
    },
    methods:{
      login(){
        this.errorMsg='';
		  let url="/api/Account/Login?employeeNo="+this.displayName+"&password="+this.password;
      let params={
         "employeeNo": this.displayName,
         "password": this.password
      }
		 utils.request.post(url,params,true).then((res)=>{
       if(res){
         if(res.success==true){
           let userInfo=res.result.userInfo;
           let accesssToken=res.result.accesssToken||'';
           utils.cache.set('userInfo',userInfo);
           utils.cache.set('TOKEN',accesssToken);
		 /*  if(userInfo.userType==1){
			 this.$router.push({path:'superADM',query:{}});
			 return;
		   } */
           this.$router.push({path:'myTask',query:{}});
         }else{
          this.errorMsg=res.error.message;
         }
       }

		 });
	  },
    skipInput(thisInput){
     var inputs = document.getElementsByTagName("input");//获取登录页面的input标签
        for(var i = 0;i<inputs.length;i++){//循环input标签的数量
        // 如果是最后一个，则焦点回到第一个。（这个你可以选择去掉）
                if(i==(inputs.length-1)){
                  /* inputs[0].focus();
                  break; */
                  this.login();
                  break;
                }else if(thisInput.currentTarget == inputs[i]){
            inputs[i+1].focus();//当(event.keyCode==13)按Enter键触发window事件时聚焦下一个input标签
            //这是在skipInput函数中调用另一个login(登录按钮点击跳转的方法)函数
            break;
          }
        }
    }

    }

  }
</script>

<style scoped>
  .bg-login{background:url(../assets/img/login_bg.png) no-repeat;background-size: 100% 100%; margin:auto;height:100vh;width:100vw;position:relative;}
  .header-login{height:8vh;width:100%;background:#fff;}
  .header-login img{width:.5rem;}
  .header-login div{position:absolute;width:.5rem;height:.29rem;top:2vh;margin-left:2vw}
 .tab-login{position:absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);}
   .tab-inner-login{margin:0 auto;background:#fff;}
   .tab-text-login{font-size:.16rem;color: #0f66cc;text-align:center;font-weight: 600;padding:1vh 0;box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.16);}
   .tab-con-login{padding:5vh 2vw 8vh 2vw;text-align: center;}
   .context{display: flex;display: -webkit-flex;}
   .context:nth-child(1){margin-bottom:5vh;}
   .context:nth-child(2){margin-bottom:8vh;}
   .context>span{width:.3rem;height:.3rem; padding:.05rem;display: inline-block;border-bottom: 1px solid #cccccc;}
   .context span>img{width:100%}
   .login-input{width:1.6rem;border: 1px solid #cccccc;border-left: none;border-right: none;border-top: none;outline: none;padding-left:.05rem; }
   .login{background: #0f66cc;border-radius: 34px;color:#fff;width:100%;padding:1vh;text-align: center;}
   .eye{position: absolute;right:0;}
   .errInfo{position: absolute;bottom:-3vh;left:.3rem;color:#af1e2b;font-size:.08rem;}
   .errInfo>span{margin-left:.05rem;}
   .errInfo img{width:.08rem;transform: translateY(-1px);}
::placeholder{padding-left:.05rem;font-size:.13rem;color:#707070}
</style>
