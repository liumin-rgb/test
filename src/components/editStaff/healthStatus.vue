<template>
  <div>
    <div class="marginB1VH">
      <span class="pc-button font12" v-show="flag=='edit'" >上传附件</span>
      <span :class="['pc-button','font12',multipleSelection.length==0?'buttonGray':'']" v-show="flag=='edit'" >删除附件</span>
    </div>
 <div class="list-table">
   <el-table :data="tableData" border height="100" style="width:unset" :header-cell-class-name="'table-header'"  @selection-change="handleSelectionChange">
     <el-table-column type="selection"></el-table-column>
     <el-table-column prop="date" label="附件名称" ></el-table-column>
     </el-table>
<!--   <Pagination :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
 -->  </div>
  </div>
</template>

<script>
  import Pagination from "../Pagination"
  export default {
    name: 'healthStatus',
    components:{Pagination},
    props:{
      flag:{
        default:"check",
        type:String,
      }
    },
    data() {
      return{
     tableData:[],
     visible:false,
     loading:false,
     pageIndex: 1,
     pageSize:10,
     maxPage: 1,
     totalCount:0,
     multipleSelection:[],
      }
    },
    methods:{
      handleSelectionChange(){
       this.multipleSelection = val;
      },
      deleteInfo(){

      },
      changePage(val){
        this.pageIndex=val.pageIndex;
        this.pageSize=val.pageSize;
       // this.queryInfo();
      },
     handleCancel(){
       this.visible=false;
     },
     handleOk(){
     this.handleCancel()
     },

    }
  };

</script>

<style lang="less" scoped>
  .label{width:0.9rem;}
  /*时间控件*/
    /deep/.el-table th>.cell{padding-left:5px;padding-right:0;}
    /deep/.el-input__inner{height:.25rem;border: 1px solid #2e6eb4;}
    /deep/.el-input__icon{line-height: .25rem;}
    /deep/.el-date-editor.el-input, .el-date-editor.el-input__inner{width:1.5rem;margin: .02rem 0.1rem;box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.1)}
    /deep/.el-input--suffix .el-input__inner{padding-right:0}

</style>
