<template>
  <div class="list-main positionR">
   <div class="list-tab displayF marginB1VH">
     <div :class="[tab!=1?'title_light_blue':'']" @click="tab=1">待办任务</div><div @click="tab=2" :class="[tab!=2?'title_light_blue':'']">已完成/已过期</div>
   </div>
   <div class="list-table" v-show="tab==1">
     <el-table :data="doingData" border height="250" style="width:unset" :header-cell-class-name="'table-header'">
       <el-table-column prop="" label="事项简介" ></el-table-column>
       <el-table-column prop="" label="截止日期" ></el-table-column>
     </el-table>
   </div>
   <div class="list-table" v-show="tab==2">
       <el-table :data="finishData" border height="250" style="width:unset" :header-cell-class-name="'table-header'">
       <el-table-column prop="" label="事项简介" ></el-table-column>
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
    name: 'myTask',
    components:{Pagination},
    data() {
      return{
        doingData:[],
        finishData:[],
        tab:'1',
      }
    },
    methods:{

    }
  };

</script>

<style lang="less" scoped>
  .list-main{
    height:100%;
    border-radius: 5px;
    background:#fff;
    padding:.1rem;
  }


</style>
