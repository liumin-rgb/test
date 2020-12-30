<template>
 <div class="list-main positionR">
  <div class="list-tab displayF marginB1VH">
    <div :class="[tab!=1?'title_light_blue':'']" @click="tab=1">培训状态</div><div @click="tab=2" :class="[tab!=2?'title_light_blue':'']">成绩</div>
  </div>
  <div v-show="tab==1">
 <div class="list-search">
     <div class="list-search-one flexBtw">
     <div><span><span>工号/姓名：</span><input class="pc-input" v-model="key"/></span>
     <span><span>部门：</span><span>
       <a-tree-select
        allow-clear
        tree-checkable
        size="small"
        style="width:1.5rem;height:.25rem;margin: .02rem 0.1rem;"
        @change="onChange"
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
        :tree-data="treemap"
        :show-checked-strategy="SHOW_PARENT"
        tree-default-expand-all
      >
      </a-tree-select>
     </span>
     </span>
     <span ><span class="label">状态：</span><select class="pc-input" @change="getSelectInfo('status')" id="status"><option v-for="obj in statusList" :value="obj.code" >{{obj.text}}</option></select>
     </span>
     </div>
     <span class="pc-button" @click="search"><i class="iconfont icon-sousuo"></i>搜索</span>
   </div>
   <div class="list-search-two"></div>
   <div class="list-search-three">
   <span class="pc-button buttonNoback" @click="download"><i class="iconfont icon-shangchuan1 "></i>导出</span>
    </div>
  </div>
  <div class="list-table">
    <el-table
        :data="tableData1"
        border
        height="60vh"
        style="width: 100%"
        stripe
        :header-cell-class-name="'table-header'"
        >
        <el-table-column prop="" label="工号" >
        </el-table-column>
        <el-table-column prop="" label="姓名" >
        </el-table-column>
        <el-table-column prop="" label="部门">
        </el-table-column>
        <el-table-column prop="" label="状态" >
        </el-table-column>
        <el-table-column prop="" label="培训时间" >
        </el-table-column>
      </el-table>
  </div>
  <div class="list-bottom">
  <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
   </div>
  </div>
  <div v-show="tab==2">
  <div class="list-search">
      <div class="list-search-one flexBtw">
        <div>
        <span><span>工号/姓名：</span><input class="pc-input" v-model="key"/></span>
        <span><span>成绩：</span><input class="pc-input" v-model="grade"/></span>
        <span><span>部门：</span><span>
          <a-tree-select
           allow-clear
           tree-checkable
           size="small"
           style="width:1.5rem;height:.25rem;margin: .02rem 0.1rem;"
           @change="onChange"
           :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
           :tree-data="treemap"
           :show-checked-strategy="SHOW_PARENT"
           tree-default-expand-all
         >
         </a-tree-select>
        </span>
        </span>
        <span ><span class="label">状态：</span><select class="pc-input" @change="getSelectInfo('status')" id="status"><option v-for="obj in statusList" :value="obj.code" >{{obj.text}}</option></select>
        </span>
        </div>
        <span class="pc-button" @click="search"><i class="iconfont icon-sousuo"></i>搜索</span>
      </div>
    <div class="list-search-two"></div>
    <div class="list-search-three">
    <span class="pc-button buttonNoback" @click="download"><i class="iconfont icon-shangchuan1 "></i>导出</span>
     </div>
   </div>
   <div class="list-table">
     <el-table
         :data="tableData2"
         border
         height="60vh"
         style="width: 100%"
         stripe
         :header-cell-class-name="'table-header'"
         >
         <el-table-column prop="" label="工号" >
         </el-table-column>
         <el-table-column prop="" label="姓名">
         </el-table-column>
         <el-table-column prop="" label="成绩" >
         </el-table-column>
         <el-table-column prop="" label="部门" >
         </el-table-column>
         <el-table-column prop="" label="状态" >
         </el-table-column>
         <el-table-column prop="" label="最新考核时间" >
         </el-table-column>
       </el-table>
   </div>
   <div class="list-bottom">
   <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
    </div>
   </div>
 </div>
</template>
<script>
  import Pagination from '../Pagination'
  import { TreeSelect } from 'ant-design-vue';
  const SHOW_PARENT = TreeSelect.SHOW_PARENT;
  export default{
    name:'trainRecord',
    components:{Pagination},
    data(){
      return{
     SHOW_PARENT,
     pageIndex:1,
     maxPage:1,
     pageSize:10,
     totalCount:0,
     tab:1,
     treemap:[],
     tableData1:[],
     tableData2:[],
     key:'',
     grade:'',
     departments:[],
     status:'',
     statusList:[{code:'0',text:'全部'},{code:'1',text:'完成'},{code:'2',text:'未完成'}],

      }
    },
    methods:{
      search(){

      },
      changePage(val){
        this.pageIndex=val.pageIndex;
        this.pageSize=val.pageSize;
        // /this.queryInfo();
      },
      onChange(value){
        this.departments= value;
      },
     download(){

     },
    }
  }
</script>

<style scoped lang="less">
.list-main{
    height:100%;
    border-radius: 5px;
    background:#fff;
    padding:.1rem;
  }
  .list-search {
      border: 1px dashed #cccccc;
      border-radius: 5px;
      margin-bottom: .1rem;
      padding:.1rem .05rem;
      &-one{
        color:#333;

      }
      &-two{

      }
      &-three{
        text-align:right;
        margin-top:0.1rem;
      }
    }
</style>
