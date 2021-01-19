<template>
<div>
  <div v-show="step==1">
  <div class="flexBtw">
    <div >
     <span class="pc-button buttonNoback" @click="changeType(1)">培训模块</span>
     <span class="pc-button ">考核模块</span>
     <span class="pc-button buttonNoback" @click="changeType(3)">培训+考核</span>
    </div>
    <div>
     <span class="pc-button buttonNoback" @click="goBack">返回</span>
     <span class="pc-button buttonNoback" @click="saveDraft">保存草稿</span>
     <span class="pc-button" @click="nextStep">保存并进入下一步</span>
    </div>
  </div>
 <div class="list-main-body">
    <div class="list-head" >
      <div><i class="iconfont icon-jiantou themeColor"></i>基本信息</div>
      </div>
      <div >
    <div class="flex paddingLR2rem gray">
      <div class=" textInput"><span class="label2"><span class="icon-xing">*</span>考核名称</span><input class='pc-input middleInput'/></div>
      <div class=" textInput marginL2VW"><span class="label2"><span class="icon-xing">*</span>考核负责人</span>
      <span>
        <a-tree-select
         allow-clear
         tree-checkable
         size="small"
         style="width:2.5rem;height:.25rem;margin: .02rem 0.1rem;"
         @change="onChange"
         :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
         :tree-data="treemap"
         tree-default-expand-all
       >
        <!-- :show-checked-strategy="SHOW_PARENT" -->
       </a-tree-select>
      </span></div>
    </div>
    <div class="flex paddingLR2rem gray">
      <div class=" textInput"><span class="label2"><span class="icon-xing">*</span>考核开始时间</span>
      <el-date-picker  type="datetime"  value-format="yyyy-MM-dd"  placeholder=" 请选择"></el-date-picker>
      </div>
      <div class=" textInput marginL2VW"><span class="label2"><span class="icon-xing">*</span>考核结束时间</span>
      <el-date-picker  type="datetime"  value-format="yyyy-MM-dd"  placeholder=" 请选择"></el-date-picker>
      </div>
    </div>
    <div class="flex paddingLR2rem gray">
      <div class=" textInput"><span class="label2">考试时长</span><input class='pc-input middleInput'/></div>
    </div>
    <div class="flex paddingLR2rem gray">
      <div class=" textInput"><span class="label2 verTop">考核描述</span><textarea class='pc-textarea textareaOne' style="width:6.5rem"/></div>
    </div>
    </div>
  </div>
  </div>
  <NewCheckTwo :step="step" @changeStep="changeStep"/>
  <LastStep :step="step" @changeStep="changeStep"/>
</div>
</template>

<script>
  import NewCheckTwo from './newCheckTwo'
  import LastStep from './lastStep'
 export default {
    name: 'newCheck',
    components:{NewCheckTwo,LastStep},
    data(){
      return{
      toggle1:true,
      toggle2:false,
      pageIndex: 1,
      pageSize:10,
      maxPage: 1,
      totalCount:0,
      tableData:[],
      step:1,
      treemap:[],
      }
    },
   methods:{
     onChange(){

     },
     goBack(){
      this.$router.go(-1);
     },
     changeStep(val){
       this.step=val||2;
     },
     saveDraft(){

     },
     nextStep(){
     this.changeStep(2);
     },
     deleteFile(){

     },
       changePage(val){
        this.pageIndex=val.pageIndex;
        this.pageSize=val.pageSize;
        //this.queryInfo();
      },
      changeType(val){
        this.$emit("changeType",val);
      }
   },

 }

</script>

<style>
</style>
