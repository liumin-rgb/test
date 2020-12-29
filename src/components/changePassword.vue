<template>
  <a-modal v-model="visible" title="修改密码" :afterClose="handleCancel">
      <div class="format ">
    <div class="list-main-body flexCol">
     <span><span class="label2">当前密码：</span><input class="pc-input bigInput" type="password" placeholder="请输入" autocomplete="off" v-model.trim="password"/></span>
      <span class="marginT1VH"><span class="label2">设置新密码：</span><input class="pc-input bigInput" type="password" placeholder="请输入" autocomplete="off" v-model.trim="newPassword"/></span>
      <span class="marginT1VH"><span class="label2">确认新密码：</span><input class="pc-input bigInput" type="password" placeholder="请输入" autocomplete="off" v-model.trim="confirmPassword"/></span>
    </div>
      </div>
        <template slot="footer">
               <a-button key="back" @click="handleCancel">
                 取消
               </a-button>
               <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
                 提交
               </a-button>
        </template>
     </a-modal>
</template>
<script>
export default {
  name: '',
  props:{
    visible:{
      default:false,
      type:Boolean
    }
  },
  data() {
    return {
      password:'',
      newPassword:'',
      confirmPassword:'',
      id:'',
      loading:false
    }
  },

  created(){
    this.id=utils.cache.get('userInfo').userId;
  },
  methods:{
    handleCancel(){
      this.$emit("closeModel");
    },
    handleOk(){
             let params={
        "id": this.id,
        "password": this.password,
        "newPassword": this.newPassword,
        "confirmPassword": this.confirmPassword
      }
             if(params.password==''){
               utils.box.toast("请输入当前密码");
               return;
             }
             if(params.newPassword==''){
                utils.box.toast("请输入新密码");
               return;
             }
             if(params.confirmPassword==''){
                utils.box.toast("请确认新密码");
               return;
             }
             if(params.newPassword!=params.confirmPassword){
               utils.box.toast("新密码输入不一致");
              return
             }
              this.loading=true;
              let url="/api/Employee/ChangePassword"
              utils.request.put(url,params,true).then((res) => {
                this.loading=false;
              	if(res){
                  if(res.success==true){
                    utils.box.toast("密码修改成功");
                    this.handleCancel()
                  }else{
                   utils.box.toast(res.error.message);
                  }
                }
                });
    }
  }
}
</script>

<style lang="less">
  .format{
    padding:0 0.2rem;
    color:#333;
    font-size: .12rem;

  }

</style>
