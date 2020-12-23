<template>
  <a-modal v-model="visible" :title="configure.type==1?'新建分类':'新建类别'" :afterClose="handleCancel">
      <div class="format ">
    <div><span><span>{{configure.type==1?'培训分类名称：':'试题类别名称'}}</span><input class="pc-input" v-model="configure.name"/></span>
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
    configure:{
      default:()=>{},
      type:Object
    },
    visible:{
      default:false,
      type:Boolean
    }
  },
  data() {
    return {
 loading:false,
    }
  },
  watch:{
    visible:function(newVal){
      if(newVal==true){
        // this.searchStaff();
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
