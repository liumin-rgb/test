<template>
<div v-show="step==3">
  <div class="flexBtw">
    <div >

    </div>
    <div>
 <span class="pc-button buttonNoback" @click="toPrevStep">返回上一步</span>
 <span class="pc-button buttonNoback">保存草稿</span>
 <span class="pc-button">发布</span>
    </div>
  </div>
 <div class="list-main-body">
    <div class="list-head" >
      <div><i class="iconfont icon-jiantou themeColor"></i>参训人员</div>
    </div>
      <div class=" textInput"><span class="label2">参训人员</span><input class='pc-input middleInput'/></div>
     <div >
   <el-table
         :data="tableData"
         border
         style="width: 100%"
         height="60vh"
        :header-cell-class-name="'table-header'">
         <el-table-column
           prop=""
           label="工号"
           >
         </el-table-column>
         <el-table-column
           prop=""
           label="姓名"
           >
         </el-table-column>
         <el-table-column
           prop=""
           label="操作"
           >
           <template slot-scope="scope">
              <i class="iconfont icon-shanchu themeColor font16" @click="deletePerson(scope.row.id)"></i>
           </template>
         </el-table-column>
       </el-table>
     <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
     </div>
  </div>
</div>
</template>

<script>
  import Pagination from '../Pagination'
 export default {
    name: 'lastStep',
    components:{Pagination},
    props:{
      step:{
        type:Number,
        default:1,
      }
    },
    data(){
      return{
      pageIndex: 1,
      pageSize:10,
      maxPage: 1,
      totalCount:0,
      tableData:[]
      }
    },
   methods:{
     toPrevStep(){
       this.$emit("changeStep");
     },
     deletePerson(){

     },
       changePage(val){
        this.pageIndex=val.pageIndex;
        this.pageSize=val.pageSize;
        //this.queryInfo();
      },
   },

 }

</script>

<style>
</style>
