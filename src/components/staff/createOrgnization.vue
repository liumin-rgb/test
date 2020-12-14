<template>
  <a-modal v-model="visible" title="添加分院" :afterClose="handleCancel">
      <div class="format ">
     <div> <span><span class="label1"><span class="icon-xing">*</span>名称：</span><input class="pc-input bigInput" v-model.trim="name"/></span></div>
     <div class="marginT2VH"> <span><span class="label1 verTop">描述：</span><textarea class='pc-textarea textareaOne flex1' v-model.trim="remark"/></span></div>

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
  name: 'createOrgnization',
  props:{
    visible:{
      default:false,
      type:Boolean
    }
  },
  data() {
    return {
      loading:false,
      name:'',
      remark:'',
    }
  },
  created(){

  },
  methods:{
    handleCancel(){
      this.$emit("closeModel");
    },
    handleOk(){
    //this.handleCancel()
    if(this.name==''){
      utils.box.toast("名称不能为空！");
      return;
    }
    this.$emit("closeModel",{name:this.name,remark:this.remark});
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
