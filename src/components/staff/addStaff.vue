<template>
  <a-modal v-model="visible" title="人员添加" :afterClose="handleCancel" width="70%">
      <div class="format ">
        <span class="label font12 width100">人员姓名/工号：</span><input class="pc-input">
        <span class="label font12 ">部门：</span><input class="pc-input">
        <span class="pc-button">搜索</span>
        <span class="pc-button buttonNoback">过滤</span>
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
