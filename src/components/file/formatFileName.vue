<template>
  <a-modal v-model="visible" title="文件格式自定义" :afterClose="handleCancel">
      <div class="format ">
       <div class="flex paddingL2rem gray">
         <div class=" textInput"><span class="label1">第一项</span><select class='pc-input width1rem'/></div>
         <div class=" textInput"><span class="label1">第二项</span><select  class='pc-input width1rem'/></div>
       </div>
       <div class="flex paddingL2rem gray">
         <div class=" textInput"><span class="label1">第三项</span><select  class='pc-input width1rem'/></div>
         <div class=" textInput"><span class="label1">分隔符</span><input  class='pc-input width1rem'/></div>
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
  name: 'formatFileName',
  props:{
    visible:{
      default:false,
      type:Boolean
    }
  },
  data() {
    return {

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
