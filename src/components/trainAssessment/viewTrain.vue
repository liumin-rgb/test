<template>
<div class="list-main">
  <div>
  <div class="flexBtw">
    <span class="backButton" @click="goBack"><i class="iconfont icon-fanhui"></i><span>返回上一级</span></span>
   <span class="pc-button buttonNoback" >已培训</span>
  </div>
 <div class="list-main-body">
    <div class="list-head" @click="toggle1=!toggle1">
      <div><i class="iconfont icon-jiantou themeColor" v-show="toggle1==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle1==false"></i>基本信息</div>
      </div>
     <transition name="t1">
      <div v-show="toggle1==true">
    <div class="flex paddingLR2rem gray">
      <div class=" textInput"><span class="label2"><span class="icon-xing">*</span>培训名称</span><input class='pc-input middleInput backGray borderGray' readonly="readonly"/></div>
      <div class=" textInput marginL2VW"><span class="label2"><span class="icon-xing">*</span>培训负责人</span><input  class='pc-input middleInput backGray borderGray' readonly="readonly"/></div>
    </div>
    <div class="flex paddingLR2rem gray">
      <div class=" textInput"><span class="label2">培训讲师</span><input class='pc-input middleInput backGray borderGray' readonly="readonly"/></div>
      <div class=" textInput marginL2VW"><span class="label2">培训地点</span><input  class='pc-input middleInput backGray borderGray' readonly="readonly"/></div>
    </div>
    <div class="flex paddingLR2rem gray">
      <div class="textInput"><span class="label2"><span class="icon-xing">*</span>培训开始时间</span><input class='pc-input middleInput backGray borderGray' readonly="readonly"/></div>
      <div class="textInput marginL2VW"><span class="label2"><span class="icon-xing">*</span>培训结束时间</span><input  class='pc-input middleInput backGray borderGray' readonly="readonly"/></div>
    </div>
    <div class="flex paddingLR2rem gray">
      <div class="textInput"><span class="label2 verTop">培训内容介绍</span><textarea class='pc-textarea textareaOne backGray' style="width:6.5rem" readonly="readonly"/></div>
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
</div>
</template>

<script>
  import Pagination from '../Pagination'
 export default {
    name: 'newTrain',
    components:{Pagination},
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
       changePage(val){
        this.pageIndex=val.pageIndex;
        this.pageSize=val.pageSize;
        //this.queryInfo();
      },
   },

 }

</script>

<style scoped>
  .list-main{
    height:100%;
    border-radius: 5px;
    background:#fff;
    padding:.1rem;
  }
</style>
