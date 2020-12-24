<template>
  <div class="list-main positionR">
<div class="list-search-one ">
 <input class="pc-input bigInput" placeholder="输入客户名称/操作"/>
<span class="pc-button" @click="search"><i class="iconfont icon-sousuo"></i>搜索</span>
 </div>
 <div class="list-table marginT1VH">
   <el-table
       :data="tableData"
       border
       height="70vh"
       style="width: 100%"
       stripe
       :header-cell-class-name="'table-header'"
       >
       <el-table-column prop="" label="客户名称">
         <template slot="header" slot-scope="scope">
            <span class="pointer" @click="takeOrder()"><span class="gray ">客户名称</span><i class="iconfont icon-paixu themeColor"></i></span>
          </template>
       </el-table-column>
       <el-table-column prop="" label="操作人" >
         <template slot="header" slot-scope="scope">
            <span class="pointer" @click="takeOrder()"><span class="gray ">操作人</span><i class="iconfont icon-paixu themeColor"></i></span>
          </template>
       </el-table-column>
       <el-table-column prop="" label="操作" >
         <template slot="header" slot-scope="scope">
            <span class="pointer" @click="takeOrder()"><span class="gray ">操作</span><i class="iconfont icon-paixu themeColor"></i></span>
          </template>
       </el-table-column>
       <el-table-column prop="" label="功能模块" >
         <template slot="header" slot-scope="scope">
            <span class="pointer" @click="takeOrder()"><span class="gray ">功能模块</span><i class="iconfont icon-paixu themeColor"></i></span>
          </template>
       </el-table-column>
      <el-table-column prop="" label="操作时间" >
        <template slot="header" slot-scope="scope">
           <span class="pointer" @click="takeOrder()"><span class="gray ">操作时间</span><i class="iconfont icon-paixu themeColor"></i></span>
         </template>
      </el-table-column>
     </el-table>
  </div>
  <div class="list-bottom">
  <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
   </div>
  </div>
</template>

<script>
  import Pagination from '../Pagination'
  export default {
    name: 'logMaintenance',
    components:{Pagination},
    data() {
      return{
        pageIndex:1,
        maxPage:1,
        pageSize:10,
        totalCount:0,
        tableData:[],
      }
    },
    methods:{
      takeOrder(){

      },
      search(){

      },
    }
  };

</script>

<style lang="less" scoped>
  .list-main{
    height:100%;
    border-radius: 5px;
    background:#fff;
    padding:.1rem;
    &-top{
      width:100%;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;

    }
    &-body{
      width:100%;
      margin-top:.2rem;
    }
  }


</style>
