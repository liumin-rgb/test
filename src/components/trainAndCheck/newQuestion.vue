<template>
  <a-modal v-model="visible" title="新建题目" :afterClose="handleCancel" :dialogClass="'bigModel'">
      <div class="format ">
       <div>
         <span>试题类型:</span>
         <a-radio-group name="radioGroup" :default-value="1" ><a-radio :value="1">单选</a-radio><a-radio :value="2">多选</a-radio><a-radio :value="3">不定项</a-radio></a-radio-group>
       </div>
       <div class="marginT1VH">
       <span><span>试题分类：</span><select class="pc-input"  ><option  value="" ></option></select></span>
       <span><span>难易程度：</span><select class="pc-input"  ><option  value="" ></option></select></span>
       </div>
       <div class="marginT1VH">
       <span><span>题目内容：</span><textarea class="pc-textarea textareaOne"/></span>
       <span class="themeColor verM"><i class="iconfont icon-jiahao "></i><span class='text-line'>新增选项</span></span>
       </div>
       <div>

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
  name: 'newQuestion',
  props:{
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
