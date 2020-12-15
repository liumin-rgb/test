<template>
  <a-modal v-model="visible" title="人员添加" :afterClose="handleCancel" :dialogClass="'bigModel'">
      <div class="format ">
        <div>
        <span class="label font12 width1rem">人员姓名/工号：</span><input class="pc-input" v-model="key">
        <span class="label font12 ">部门：</span><input class="pc-input" v-model="department">
        <span class="pc-button" @click="searchStaff">搜索</span>
       <span class="floatR"><a-switch checked-children="过滤" un-checked-children=""   @change="onChange"/></span>
       </div>
       <a-spin :spinning="sping">
          <div class="tab flexBtw marginT1VH marginB1VH">
       <el-table :data="tableData1" border height="365" style="width:unset" :header-cell-class-name="'table-header'"  @selection-change="handleSelectionChange">
             <el-table-column type="selection"></el-table-column>
             <el-table-column prop="name" label="姓名"  ></el-table-column>
             <el-table-column prop="employeeNo" label="工号" ></el-table-column>
             <el-table-column prop="department" label="部门"></el-table-column>
       </el-table>
           <el-table :data="tableData2" border height="365" style="width:unset" :header-cell-class-name="'table-header'"  @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="name" label="姓名"  ></el-table-column>
                <el-table-column prop="employeeNo" label="工号" ></el-table-column>
                <el-table-column prop="department" label="部门"></el-table-column>
           </el-table>
        <el-table :data="tableData3" border height="365" style="width:unset" :header-cell-class-name="'table-header'"  @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
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
                 提交
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
    },
    orgId:{
      default:"",
      type:String,

    },
  },
  data() {
    return {
       key:'',
       department:'',
       isFilter:false,
       totalCount:0,
       pageIndex: 1,
       pageSize:10,
       maxPage: 1,
       tableData:[],
       tableData1:[],
       tableData2:[],
       tableData3:[],
       multipleSelection:[],
       employeeIds:[],
       sping:false,
       loading:false,
    }
  },
  watch:{
    visible:function(newVal){
      if(newVal==true){
         this.searchStaff();
      }
    }
  },
  created(){

  },
  methods:{
    handleSelectionChange(val) {
       this.multipleSelection = val.map(item=>{return item.id});

       },
    changePage(val){
      this.pageIndex=val.pageIndex;
      this.pageSize=val.pageSize;
      this.searchStaff();
    },
    searchStaff(){//查询员工列表
    this.sping=true;
            let url="/api/Organization/searchEmployeeList";
            let params={
  "key": this.key,
  "department": this.department,
  "orgId": this.orgId,
  "isFilter": this.isFilter,
  "pageIndex": this.pageIndex,
  "pageSize": this.pageSize
}
            utils.request.post(url,params).then((res) => {
              this.sping=false;
               if(res){
                if(res.success==true){
                  let data=res.result;
                 this.totalCount=data.totalCount||0;
                 this.maxPage=Math.ceil(this.totalCount/(this.pageSize*3));
                 this.tableData=data.items;
                 let newArr=utils.common.group(this.tableData,10);
                 this.tableData1=newArr[0]||[];
                 this.tableData2=newArr[1]||[];
                  this.tableData3=newArr[2]||[];
                }
                }
            })

    },
    onChange(checked) {
       this.isFilter=checked;
       },
    handleCancel(){
      this.$emit("closeModel");
    },
    handleOk(){
      this.loading=true;
                  let url="/api/Organization/addEmployeeToOrg?orgId="+this.orgId;
                  let params=this.multipleSelection;
                  utils.request.post(url,params).then((res) => {
                    this.loading=false;
                     if(res){
                      if(res.success==true){
                        utils.box.toast("添加成功","success");
                        this.handleCancel()
                      }else{
                        utils.box.toast("添加失败");
                      }
                      }
                  })


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
