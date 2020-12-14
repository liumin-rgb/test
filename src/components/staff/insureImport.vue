<template>
  <a-modal v-model="visible" title="确认人员信息" :afterClose="handleCancel" :dialogClass="'bigModel'">
      <div class="format ">
        <div>
          <span><span class="label1">姓名：</span><input class="pc-input" v-model="name" /></span>
          <span><span class="label1">工号：</span><input class="pc-input" v-model="employeeNo"/></span>
           <span><span class="label1">部门：</span><input class="pc-input" v-model="department"/></span>
           <span class="pc-button" @click="queryInfo">搜索</span>
        </div>
        <a-spin :spinning="sping">
        <div class="tab flexBtw marginT1VH marginB1VH">
     <el-table :data="tableData1" border height="365" style="width:unset" :header-cell-class-name="'table-header'"  @selection-change="handleSelectionChange">

           <el-table-column prop="name" label="姓名"  ></el-table-column>
           <el-table-column prop="employeeNo" label="工号" ></el-table-column>
           <el-table-column prop="department" label="部门"></el-table-column>
     </el-table>

         <el-table :data="tableData2" border height="365" style="width:unset" :header-cell-class-name="'table-header'"  @selection-change="handleSelectionChange">

              <el-table-column prop="name" label="姓名"  ></el-table-column>
              <el-table-column prop="employeeNo" label="工号" ></el-table-column>
              <el-table-column prop="department" label="部门"></el-table-column>
         </el-table>

      <el-table :data="tableData3" border height="365" style="width:unset" :header-cell-class-name="'table-header'"  @selection-change="handleSelectionChange">
              <el-table-column prop="name" label="姓名"  ></el-table-column>
              <el-table-column prop="employeeNo" label="工号" ></el-table-column>
              <el-table-column prop="department" label="部门"></el-table-column>
      </el-table>

         </div>
         </a-spin>
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
        maxPage: 1,
        totalCount:0,
        tableData:[],
        tableData1:[],
        tableData2:[],
        tableData3:[],
        selectionData:[],
        loading:false,
        sping:false,
        name:'',
        employeeNo:'',
        department:''
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
    search(){

    },
    changePage(val){
      this.pageIndex=val.pageIndex;
      this.pageSize=val.pageSize;
      this.queryInfo();
    },
    queryInfo(){
      this.sping=true;
      let url = '/api/Employee/template/infos?searchDto.pageIndex='+this.pageIndex+'&searchDto.pageSize='+this.pageSize*3+'&searchDto.name='+this.name+'&searchDto.employeeNo='+this.employeeNo+'&searchDto.department='+this.department
      	utils.request.get(url).then((res) => {
          this.sping=false;
      		if(res){
         if(res.success==true){
           this.totalCount=res.result.totalCount;
           this.maxPage=Math.ceil(this.totalCount/(this.pageSize*3));
           this.tableData=res.result.items||[];
           let newArr=utils.common.group(this.tableData,10);
           this.tableData1=newArr[0]||[];
           this.tableData2=newArr[1]||[];
            this.tableData3=newArr[2]||[];
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
      this.loading=true;
      let url = "/api/Employee/template/infos";
     /* let params={
       importDtos:this.selectionData
      } */
      	utils.request.post(url,{}).then((res) => {
          this.loading=false;
      		if(res){
         if(res.success==true){
           utils.box.toast("导入成功","success");
           //this.handleCancel();
           this.$emit("closeModel",true);
           this.$router.push({path:'managePower',query:{}});
         }else{
           utils.box.toast("导入失败");
         }
          }
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
