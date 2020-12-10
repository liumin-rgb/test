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
	    <div class="context"><span><img src="../assets/img/icon-user.png"/></span><input class="login-input" placeholder="请输入账号"/>
      <span></span>
      </div>
	    <div class="context positionR"><span><img src="../assets/img/icon-passward.png"/></span><input class="login-input" placeholder="请输入密码" type="password"/>
      <span class="eye"><img src="../assets/img/icon-eye.png"/></span>
      <div class="errInfo"><img src="../assets/img/icon-warning.png"/><span>密码错误请重新输入</span></div>
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
	  displayName:''
    }},
    mounted(){

    },
    methods:{
      login(){
       this.$router.push({path:'staffInfo',query:{}});
       return;
		  let params={
			  email:this.email,
			  password:this.password,
		  };
		  let url="/api/Login/login";
		  utils.request.post(url,params,false).then((res)=>{
			  let body=res;
			  if(body.isSuccess==true){
				  let data=body.data;
				utils.cache.set('TOKEN',data.token||'');
				this.queryLoginInfo();

			  }else{
				 utils.box.toast(body.message);
				  return;
			  }
		  });
	  },
      queryLoginInfo(){
		  let url="/api/Account/loginAccount";
		 utils.request.get(url).then((res)=>{
		 			  let body=res;
		 			  let data=body.data;
					  utils.cache.set('displayName',data.displayName);
					  utils.cache.set("role",data.role);
					  utils.cache.set("roleId",data.roleId);
					  utils.cache.set("email",data.email);
					  this.$router.push({path:'surveyManage',query:{}});
		 });
	  },
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
