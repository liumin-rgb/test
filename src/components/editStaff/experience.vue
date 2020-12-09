<template>
  <div>
    <div class="marginB1VH">
      <span class="pc-button font12" v-show="flag=='edit'" @click="editInfo(1)">添加</span>
      <span class="pc-button font12" v-show="flag=='edit'" @click="deleteInfo">删除</span>
    </div>
 <div class="list-table">
   <el-table :data="tableData" border height="100" style="width:unset" :header-cell-class-name="'table-header'">
     <el-table-column prop="" label="开始时间" ></el-table-column>
     <el-table-column prop="" label="结束时间" ></el-table-column>
     <el-table-column prop="" label="工作单位"></el-table-column>
     <el-table-column prop="" label="担任职位"></el-table-column>
     <el-table-column prop="" label="备注"></el-table-column>
     </el-table>
   <Pagination :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
  </div>
  <a-modal v-model="visible" title="工作经历_新增">
      <div class="format">
        <div class=" textInput"><span class="label font12 weight600"><span class="icon-xing">*</span>开始时间</span><el-date-picker  value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" ></el-date-picker></div>
         <div class=" textInput"><span class="label font12 weight600">结束时间</span><el-date-picker  value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" ></el-date-picker></div>
         <div class=" textInput"><span class="label font12 weight600"><span class="icon-xing">*</span>工作单位</span><input class="pc-input"></div>
         <div class=" textInput"><span class="label font12 weight600 verTop"><span class="icon-xing">*</span>担任职位</span><textarea class="pc-textarea textareaOne"/></div>
         <div class=" textInput"><span class="label font12 weight600 verTop">备注</span><textarea class="pc-textarea textareaOne"/></div>
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
  </div>
</template>

<script>
  import Pagination from "../Pagination"
  export default {
    name: 'experience',
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
     maxPage: 10,
     totalCount:0,
      }
    },
    methods:{
      editInfo(type){
       this.visible=true;
       if(type==1){ //新增

       }else{ //编辑

       }
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
