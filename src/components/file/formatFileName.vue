<template>
  <a-modal v-model="visible" title="文件格式自定义" :afterClose="handleCancel" width="50%">
      <div class="format ">
         <span class="themeColor marginR1VW">格式参考：文件名称_文件编号_版本号</span>
        <div class="flex paddingLR2rem gray marginT2VH">
          <div class="flexCol textInput"><span class="marginL1Rem">第一项</span><select class='pc-input width1rem' id="format1"  @change="getSelectInfo('format1')"><option v-for="obj in format1List" :value="obj.code" :selected="obj.code==1?'selected':''">{{obj.text}}</option></select></div>
          <div class="flexCol textInput"><span class="marginL1Rem">分隔符</span><input  class='pc-input smallInput' v-model="symbol1"/></div>
          <div class="flexCol textInput"><span class="marginL1Rem">第二项</span><select  class='pc-input width1rem' id="format2" @change="getSelectInfo('format2')"><option v-for="obj in format2List" :value="obj.code" :selected="obj.code==2?'selected':''">{{obj.text}}</option></select></div>
          <div class="flexCol textInput"><span class="marginL1Rem">分隔符</span><input  class='pc-input smallInput' v-model="symbol2"/></div>
          <div class="flexCol textInput"><span class="marginL1Rem">第三项</span><select  class='pc-input width1rem' id="format3" @change="getSelectInfo('format3')"><option v-for="obj in format3List" :value="obj.code" :selected="obj.code==3?'selected':''">{{obj.text}}</option></select></div>
        </div>

     <!--  <div class="flex paddingLR2rem gray">
         <div class=" textInput"><span class="label1">第一项</span><select class='pc-input width1rem'/></div>
         <div class=" textInput"><span class="label1">第二项</span><select  class='pc-input width1rem'/></div>
       </div>
       <div class="flex paddingLR2rem gray">
         <div class=" textInput"><span class="label1">第三项</span><select  class='pc-input width1rem'/></div>
         <div class=" textInput"><span class="label1">分隔符</span><input  class='pc-input width1rem'/></div>
       </div> -->
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
      format1List:[{code:'1',text:'文件名称'},{code:'2',text:'文件编号'},{code:'3',text:'版本号'}],
      format2List:[{code:'1',text:'文件名称'},{code:'2',text:'文件编号'},{code:'3',text:'版本号'}],
      format3List:[{code:'1',text:'文件名称'},{code:'2',text:'文件编号'},{code:'3',text:'版本号'}],
      format1:'',
      format2:'',
      format3:'',
      symbol1:'',
      symbol2:'',
    }
  },
  created(){

  },
  methods:{
    getSelectInfo(id){
      this[id]=utils.common.getSelectValue(id);

    },
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
