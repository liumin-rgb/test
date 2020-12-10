<template>
  <a-modal v-model="visible" title="确认人员信息" :afterClose="handleCancel" :dialogClass="'bigModel'">
      <div class="format ">
        <div>
          <span><span class="label1">姓名：</span><input class="pc-input"/></span>
          <span><span class="label1">工号：</span><input class="pc-input"/></span>
           <span><span class="label1">部门：</span><input class="pc-input"/></span>
           <span class="pc-button">搜索</span>
        </div>
        <div class="tab flexBtw marginT1VH marginB1VH">
     <el-table :data="tableData1" border height="50" style="width:unset" :header-cell-class-name="'table-header'"  @selection-change="handleSelectionChange">
          
           <el-table-column prop="" label="姓名" ></el-table-column>
           <el-table-column prop="" label="工号" ></el-table-column>
           <el-table-column prop="" label="部门" ></el-table-column>
     </el-table>

         <el-table :data="tableData2" border height="50" style="width:unset" :header-cell-class-name="'table-header'"  @selection-change="handleSelectionChange">
            
              <el-table-column prop="" label="姓名"  ></el-table-column>
              <el-table-column prop="" label="工号" ></el-table-column>
              <el-table-column prop="" label="部门"></el-table-column>
         </el-table>

      <el-table :data="tableData3" border height="50" style="width:unset" :header-cell-class-name="'table-header'"  @selection-change="handleSelectionChange">
          
           <el-table-column prop="" label="姓名" ></el-table-column>
           <el-table-column prop="" label="工号"></el-table-column>
           <el-table-column prop="" label="部门"></el-table-column>
      </el-table>

         </div>
          <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
      </div>
        <template slot="footer">
               <a-button key="back" @click="handleCancel">
                 取消
               </a-button>
               <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
                 确认导入
               </a-button>
        </template>
     </a-modal>
</template>
<script>
  import Pagination from '../Pagination'
export default {
  name: '',
  components:{Pagination},
  props:{
    visible:{
      default:false,
      type:Boolean,

    }
  },
  data() {
    return {
        pageIndex: 1,
        pageSize:10,
        maxPage: 10,
        totalCount:0,
        tableData:[],
        tableData1:[],
        tableData2:[],
        tableData3:[],
        selectionData:[],
        loading:false
    }
  },
  created(){

  },
  watch:{
    visible:function(newVal){
      if(newVal==true){
        this.queryInfo();
      }
    },
  },
  methods:{
    changePage(val){
      this.pageIndex=val.pageIndex;
      this.pageSize=val.pageSize;
      this.queryInfo();
    },
    queryInfo(){
      let url = '';
      let params={}
      	utils.request.post(url,params).then((res) => {
      		if(res){
         if(res.success==true){
         }else{
           //utils.box.toast("失败");
         }
          }
          }
          );
    },
    handleSelectionChange(val){
      this.selectionData=val;
    },
    handleCancel(){
      this.$emit("closeModel");
    },
    handleOk(){
      let url = "/api/Employee/template/infos";
      let params={
       importDtos:this.selectionData
      }
      	utils.request.post(url,params).then((res) => {
      		if(res){
         if(res.success==true){
           utils.box.toast("导入成功","success");
         }else{
           utils.box.toast("导入失败");
         }
          }
          this.handleCancel();
          }
          );
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

.tab/deep/.el-table{font-size: .12rem}

</style>
