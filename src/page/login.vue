<template>
  <div>
    <div class="bg-login">
      <div class="header-login">
        <div><img src='../assets/img/logo_blue.png'/></div>
      </div>
	  <div>
		<!-- <div class="tab-login">
		  <div class="tab-inner-login">
		  <div class="tab-text-login">账号密码登录</div>
		  <div class="tab-con-login">
		  <div class="context"><span><img src="../assets/img/2x/1-icon-user.png"/></span><input class="login-input" placeholder="请输入账号"/></div>
		  <div class="context"><span><img src="../assets/img/2x/1-icon-password.png"/></span><input class="login-input" placeholder="请输入密码"/></div>
		  <div class="login">登录</div>
		  </div> 
		  </div>
		</div> -->
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
  .bg-login{background:url() no-repeat;background-size: 100% 100%; margin:auto;height:100vh;width:100vw;position:relative;}
  .header-login{height:8vh;width:100%;background:#fff;}
  .header-login img{width:.5rem;}
  .header-login div{position:absolute;width:.5rem;height:.29rem;top:2vh;margin-left:2vw}
  .tab-login{position:absolute;top:20vh;right:11vw;}
  .tab-inner-login{margin:0 auto;background:#fff;}
  .tab-text-login{font-size:.18rem;color: #1a1a1a;text-align:center;font-weight: 600;padding:1vh 0;box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.16);}
  .tab-con-login{padding:7vh 2vw;text-align: center;}
  .context{display: flex;display: -webkit-flex;}
  .context:nth-child(1){margin-bottom:3vh;}
  .context:nth-child(2){margin-bottom:6vh;}
  .context span{width:.3rem;height:.3rem;background: linear-gradient(180deg,#2784bf, #145aa0);border-top-left-radius: 5px;border-bottom-left-radius: 5px;  padding:.05rem;display: inline-block;}
  .context span>img{width:100%}
  .login-input{border: 1px solid #b4b4b4;border-left: none;border-top-right-radius: 5px;border-bottom-right-radius: 5px;box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.16);outline: none;padding-left:.05rem; }
  .login{background: linear-gradient(90deg,#2784bf, #145aa0);border-radius: 5px;color:#fff;width:100%;padding:1vh;text-align: center;}
::placeholder{padding-left:.05rem;font-size:.13rem;color:#707070}
</style>
