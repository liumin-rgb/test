<template>
  <div>
    <div class="marginB1VH">
      <span class="pc-button font12" v-show="flag=='edit'" @click="editInfo(1)">添加</span>
      <span class="pc-button font12" v-show="flag=='edit'" @click="deleteInfo">删除</span>
    </div>
 <div class="list-table">
   <el-table :data="tableData" border height="100" style="width:unset" :header-cell-class-name="'table-header'">
     <el-table-column prop="" label="发表年月" ></el-table-column>
     <el-table-column prop="date" label="文章题目" ></el-table-column>
     <el-table-column prop="name" label="期刊"></el-table-column>
      <el-table-column prop="name" label="第一作者"></el-table-column>
       <el-table-column prop="name" label="通讯作者"></el-table-column>
       <el-table-column prop="name" label="页码范围"></el-table-column>
       <el-table-column prop="name" label="其他"></el-table-column>
     </el-table>
   <Pagination :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
  </div>
  <a-modal v-model="visible" title="" width="50%">
      <div class="format">
          <div class=" textInput">
          <span class="label font12 weight600"><span class="icon-xing">*</span>发表年月</span><input class="pc-input">
          <span class="label font12 weight600"><span class="icon-xing">*</span>文章题目</span><input class="pc-input">
        </div>
       <div class=" textInput">
         <span class="label font12 weight600"><span class="icon-xing">*</span>期刊</span><input class="pc-input">
         <span class="label font12 weight600"><span class="icon-xing">*</span>第一作者</span><select class="pc-input"/>
       </div>
       <div class=" textInput">
         <span class="label font12 weight600"><span class="icon-xing">*</span>通讯作者</span><input class="pc-input">
         <span class="label font12 weight600">其他</span><input class="pc-input">
       </div>
       <div class=" textInput">
         <span class="label font12 weight600"><span class="icon-xing">*</span>页码范围</span><input class="pc-input">
         <span class="label font12 weight600"><span class="icon-xing">*</span>部门</span><select class="pc-input"/>
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
  </div>
</template>

<script>
  import Pagination from "../Pagination"
  export default {
    name: 'paperPublish',
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
     levelList:[{code:'0',text:'请选择'},{code:'1',text:'国家级'},{code:'2',text:'省级'},{code:'3',text:'地方级'},],
     classList:[{code:'0',text:'请选择'},{code:'1',text:'Ⅰ类'},{code:'2',text:'Ⅱ类'},{code:'3',text:'Ⅲ类'},],
     educationList:[{code:'0',text:'请选择'},{code:'1',text:'学习经历'},{code:'2',text:'继续教育'},{code:'3',text:'深造'},]
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
  .label{width:1.2rem;}
  /*时间控件*/
    /deep/.el-table th>.cell{padding-left:5px;padding-right:0;}
    /deep/.el-input__inner{height:.25rem;border: 1px solid #2e6eb4;}
    /deep/.el-input__icon{line-height: .25rem;}
    /deep/.el-date-editor.el-input, .el-date-editor.el-input__inner{width:1.5rem;margin: .02rem 0.1rem;box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.1)}
    /deep/.el-input--suffix .el-input__inner{padding-right:0}

</style>
