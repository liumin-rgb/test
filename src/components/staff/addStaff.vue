<template>
  <a-modal v-model="visible" title="人员添加" :afterClose="handleCancel" :dialogClass="'bigModel'" >
      <div class="format ">
        <div>
        <span class="label font12 width1rem">人员姓名/工号：</span><input class="pc-input" v-model="key">
        <span class="label font12 ">部门：</span><a-tree-select
                 v-model="departments"
                 allow-clear
                 tree-checkable
                 multiple
                 size="small"
                 style="width:2rem;height:.25rem;margin: .02rem 0.1rem;"
                 @change="onChange1"
                 :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                 :tree-data="treemap"
                 tree-default-expand-all
                 treeCheckStrictly
               >
               </a-tree-select>
        <!-- <input class="pc-input" v-model="department"> -->
      <!--  <span class="pc-button" @click="searchStaff">搜索</span> -->
      <span class="floatR"> <span>过滤已匹配岗位人员：</span><span ><a-switch checked-children="过滤" un-checked-children=""   @change="onChange"/></span></span>
       </div>
       <a-spin :spinning="sping">
          <div class="tab flexBtw marginT1VH marginB1VH">
      <div class=" width33">
       <el-table :data="tableData1"  border height="60vh" style="width:100%" :header-cell-class-name="'table-header'"  @selection-change="handleSelectionChange1">
             <el-table-column type="selection" width="50%"></el-table-column>
             <el-table-column prop="name" width="70%" label="姓名"  ></el-table-column>
             <el-table-column prop="employeeNo" width="70%" label="工号" ></el-table-column>
             <el-table-column prop="department" width="70%" label="部门"></el-table-column>
       </el-table>
       </div>
       <div  class="  width33">
           <el-table :data="tableData2" border height="60vh"  style="width:100%" :header-cell-class-name="'table-header'"  @selection-change="handleSelectionChange2">
                <el-table-column type="selection" width="50%"></el-table-column>
                <el-table-column prop="name" label="姓名"  width="70%"></el-table-column>
                <el-table-column prop="employeeNo" label="工号" width="70%"></el-table-column>
                <el-table-column prop="department" label="部门"width="70%"></el-table-column>
           </el-table>
           </div>
        <div class="width33">
        <el-table :data="tableData3" border height="60vh" style="width:100%" :header-cell-class-name="'table-header'"  @selection-change="handleSelectionChange3">
                <el-table-column type="selection" width="50%"></el-table-column>
                <el-table-column prop="name" label="姓名"  width="70%"></el-table-column>
                <el-table-column prop="employeeNo" label="工号" width="70%"></el-table-column>
                <el-table-column prop="department" label="部门"width="70%"></el-table-column>
        </el-table>
        </div>
           </div>
           </a-spin>
            <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount" :pageSizeList="pageSizeList"/>
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
    parentId:{
      default:null,
      type:Number,
    },
    orgId:{
      default:null,
      type:Number,

    },
  },
  data() {
    return {
       key:'',
       isFilter:false,
       totalCount:0,
       pageIndex: 1,
       pageSize:30,
       maxPage: 1,
       tableData:[],
       tableData1:[],
       tableData2:[],
       tableData3:[],
       multipleSelection1:[],
       multipleSelection2:[],
       multipleSelection3:[],
       employeeIds:[],
       sping:false,
       loading:false,
       pageSizeList:[30,60,90,120,150,300],
       treemap:[],
       departments:[],
    }
  },
  watch:{
    visible:function(newVal){
      if(newVal==true){
        this.queryDepartment();
        this.searchStaff();
      }
    },
    key:function(){
       this.searchStaff();
    },
    departments:function(){
        this.searchStaff();
    },
    isFilter:function(){
       this.searchStaff();
    },

  },
  created(){
  // this.queryDepartment();
  },
  methods:{
    handleSelectionChange1(val) {
       this.multipleSelection1 = val.map(item=>{return item.id});
       },
   handleSelectionChange2(val) {
      this.multipleSelection2 = val.map(item=>{return item.id});
      },
   handleSelectionChange3(val) {
      this.multipleSelection3 = val.map(item=>{return item.id});
      },
     queryDepartment(){
         let url="/api/Organization/treemap";
         utils.request.get(url).then((res) => {
         	if(res){
             if(res.success==true){
             let list=res.result;
             this.treemap=JSON.parse(JSON.stringify(list).replace(/name/g,"title").replace(/id/g,"key"));
              this.forTree(this.treemap);
              console.log(this.treemap);
             }else{

             }
           }
           });
     },
     forTree(treeList){
       for(var i in treeList){
          treeList[i].value=treeList[i].key;
          if(this.parentId==treeList[i].key){
            let obj={value:treeList[i].key,lable:treeList[i].title};
            this.departments.push(obj);
          }
         if(treeList[i].children){
           this.forTree(treeList[i].children);
         }
       }
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
  "department": this.departments.map((item)=>{return item.value}),
  "orgId": this.orgId||'',
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
                 this.maxPage=Math.ceil(this.totalCount/(this.pageSize));
                 this.tableData=data.items;
                 let newArr=utils.common.group(this.tableData,this.pageSize/3);
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
    onChange1(value){
       this.departments= value;
      },
    handleCancel(){
      this.$emit("closeModel");
    },
    handleOk(){
                  let url="/api/Organization/addEmployeeToOrg?orgId="+this.orgId;
                  let params=[...this.multipleSelection1,...this.multipleSelection2,...this.multipleSelection3];
                  if(params.length==0){
                    utils.box.toast("请勾选人员");
                    return;
                  }
                  this.loading=true;
                  utils.request.post(url,params).then((res) => {
                    this.loading=false;
                     if(res){
                      if(res.success==true){
                        utils.box.toast("添加成功","success");
                        this.$emit("closeModel",true);
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
