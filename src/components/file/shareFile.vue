<template>
  <a-modal v-model="visible" title="分享文件" :afterClose="handleCancel">
      <div class="format ">
        <div><span class="label">文件名称:</span><input class="pc-input" readonly="readonly"/></div>
        <div class="marginT1VH"><span class="label verTop">链接:</span><textarea class="pc-textarea textareaOne" readonly="readonly" v-model="url"/></div>
      </div>
        <template slot="footer">
               <a-button key="back" >
                 复制
               </a-button>
               <a-button key="submit" type="primary" :loading="loading" >
                 查看分享信息
               </a-button>
        </template>
     </a-modal>
</template>
<script>
export default {
  name: 'shareFile',
  props:{
    visible:{
      default:false,
      type:Boolean
    }
  },
  data() {
    return {
 loading:false,
 url:'http://lqms-demo2.chinanorth.cloudapp.chinacloudapi.cn:8000/dist/index.html'
    }
  },
  watch:{
    visible:function(newVal){
      if(newVal==true){
         this.searchStaff();
      }
    }
  },
  created(){

  },
  methods:{
    handleCancel(){
      this.$emit("closeModel");
    },
    handleOk(){
    this.handleCancel()
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
