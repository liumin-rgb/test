<template>
<div>
  <div v-show="step==1">
  <div class="flexBtw">
    <div >
     <span class="pc-button " >培训模块</span>
     <span class="pc-button buttonNoback" @click="changeType(2)">考核模块</span>
     <span class="pc-button buttonNoback" @click="changeType(3)">培训+考核</span>
    </div>
    <div>
     <span class="pc-button buttonNoback" @click="goBack">返回</span>
     <span class="pc-button buttonNoback" @click="saveDraft">保存草稿</span>
     <span class="pc-button" @click="nextStep">保存并进入下一步</span>
    </div>
  </div>
 <div class="list-main-body">
    <div class="list-head" @click="toggle1=!toggle1">
      <div><i class="iconfont icon-jiantou themeColor" v-show="toggle1==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle1==false"></i>基本信息</div>
      </div>
     <transition name="t1">
      <div v-show="toggle1==true">
    <div class="flex paddingLR2rem gray">
      <div class=" textInput"><span class="label2"><span class="icon-xing">*</span>培训名称</span><input class='pc-input middleInput'/></div>
      <div class=" textInput marginL2VW"><span class="label2"><span class="icon-xing">*</span>培训负责人</span><input  class='pc-input middleInput'/></div>
    </div>
    <div class="flex paddingLR2rem gray">
      <div class=" textInput"><span class="label2">培训讲师</span><input class='pc-input middleInput'/></div>
      <div class=" textInput marginL2VW"><span class="label2">培训地点</span><input  class='pc-input middleInput'/></div>
    </div>
    <div class="flex paddingLR2rem gray">
      <div class=" textInput"><span class="label2"><span class="icon-xing">*</span>培训开始时间</span><input class='pc-input middleInput'/></div>
      <div class=" textInput marginL2VW"><span class="label2"><span class="icon-xing">*</span>培训结束时间</span><input  class='pc-input middleInput'/></div>
    </div>
    <div class="flex paddingLR2rem gray">
      <div class=" textInput"><span class="label2 verTop">培训内容介绍</span><textarea class='pc-textarea textareaOne' style="width:6.5rem"/></div>
    </div>
    </div>
  </transition>
    <div class="list-head" @click="toggle2=!toggle2">
      <div><i class="iconfont icon-jiantou themeColor" v-show="toggle2==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle2==false"></i>资料</div>
    </div>
    <transition name="t1">
     <div v-show="toggle2==true">
   <el-table
         :data="tableData"
         border
         style="width: 100%"
         height="29vh"
        :header-cell-class-name="'table-header'">
         <el-table-column
           prop=""
           label="附件名称"
           >
         </el-table-column>
         <el-table-column
           prop=""
           label="操作"
           >
           <template slot-scope="scope">
              <i class="iconfont icon-shanchu themeColor font16" @click="deleteFile(scope.row.id)"></i>
           </template>
         </el-table-column>
       </el-table>
     <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
     </div>
   </transition>
  </div>
  </div>
  <LastStep :step="step" @changeStep="changeStep"/>
</div>
</template>

<script>
  import LastStep from './lastStep'
  import Pagination from '../Pagination'
 export default {
    name: 'newTrain',
    components:{Pagination,LastStep},
    data(){
      return{
      toggle1:true,
      toggle2:false,
      pageIndex: 1,
      pageSize:10,
      maxPage: 1,
      totalCount:0,
      tableData:[],
      step:1
      }
    },
   methods:{
     goBack(){
      this.$router.go(-1);
     },
     changeStep(val){
       this.step=val||1;
     },
     saveDraft(){

     },
     nextStep(){
       this.changeStep(3);
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
