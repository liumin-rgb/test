<template>
  <div>
    <div class="bg-login">
      <div class="header-login">
        <div><img src="../assets/img/logo_white.png"/></div>
      </div>
      <div class="tab-login">
        <div class="tab-inner-login">
        <div class="tab-text-login"></div>
        <div class="tab-con-login positionR">
          <div class="tab-account-login">
          <div><label>用户名</label><input class="pc-input" v-model="email"/></div>
		  <div><label>密码</label><input class="pc-input" type="password" v-model="password"/></div>
		  <div class="pc-button" @click="login">登录</div>
          </div>
          <!-- <div class="tab-erm-login">
            <QRcode/>
            <div class="tab-erm-txt">请扫描二维码进行登录</div>
            </div> -->
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
  .bg-login{background: url(../assets/img/background_easy.png);background-size:100% 100%;margin:auto;height:100vh;potision:relative;}
  .header-login{height:8vh;width:100%;border-bottom:1px solid rgba(255,255,255,0.15);position:relative;}
  .header-login div{position:absolute;width:.5rem;height:.29rem;top:2vh;margin-left:2vw}
  .tab-login{width:100%;position:absolute;top:12vh;}
  .tab-inner-login{width:4.32rem;margin:0 auto;}
  .tab-text-login{font-size:.18rem;color:#fff;text-align:center;font-weight: 600;}
  .tab-con-login{margin-top:3vh;height:3.54rem;width:100%;background:#fff;border-radius: .1rem;}
  .tab-erm-login{width:2.24rem;height:2.24rem;position:absolute;top:50%;left:50%;transform: translate(-50%,-50%);-webkit-transform: translate(-50%,-50%)}
  .tab-erm-txt{color:#0f66cc;font-size: .14rem;font-weight:400;text-align:center;}
  .tab-account-login{width:90%;position:absolute;top:40%;left:50%;transform: translate(-50%,-50%);-webkit-transform: translate(-50%,-50%)}
  .tab-account-login div{margin:2vh 0}
  .tab-account-login div>label{width:20%;display:inline-block;text-align:right;margin-right:1vw}
  .tab-account-login div>input{width:60%}
  .tab-account-login div:nth-child(3){width:70%;margin:0 auto;margin-top:.6rem}
</style>
