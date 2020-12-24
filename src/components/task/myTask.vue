<template>
  <div class="list-main positionR">
   <div class="list-tab displayF marginB1VH">
     <div :class="[tab!=1?'title_light_blue':'']" @click="tab=1">待办任务</div><div @click="tab=2" :class="[tab!=2?'title_light_blue':'']">已完成/已过期</div>
   </div>
   <div class="list-table" v-show="tab==1">
     <div class="list-head" @click="toggle1=!toggle1">
       <div><i class="iconfont icon-jiantou themeColor" v-show="toggle1==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle1==false"></i>文档</div>
       <div>
         </div>
       </div>
       <transition name="t1">
      <div v-show="toggle1==true">
     <el-table :data="doingData1" border stripe height="30vh" style="width:unset" :header-cell-class-name="'table-header'" @row-click="rowClick">
       <el-table-column prop="task" label="事项简介" ></el-table-column>
       <el-table-column prop="deadline" label="截止日期" ></el-table-column>
     </el-table>
     </div>
     </transition>
     <div class="list-head" @click="toggle2=!toggle2">
       <div><i class="iconfont icon-jiantou themeColor" v-show="toggle2==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle2==false"></i>培训</div>
       <div>
         </div>
       </div>
       <transition name="t1">
      <div v-show="toggle2==true">
     <el-table :data="doingData2" border stripe height="30vh" style="width:unset" :header-cell-class-name="'table-header'" @row-click="rowClick">
       <el-table-column prop="task" label="事项简介" ></el-table-column>
       <el-table-column prop="deadline" label="截止日期" ></el-table-column>
     </el-table>
     </div>
     </transition>
   </div>
   <div class="list-table" v-show="tab==2">
     <div class="list-head" @click="toggle3=!toggle3">
       <div><i class="iconfont icon-jiantou themeColor" v-show="toggle3==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle3==false"></i>文档</div>
       <div>
         </div>
       </div>
       <transition name="t1">
       <div v-show="toggle3==true">
       <el-table :data="finishData1" border height="30vh" style="width:unset" :header-cell-class-name="'table-header'">
       <el-table-column prop="task" label="事项简介" ></el-table-column>
     </el-table>
     </div>
     </transition>
     <div class="list-head" @click="toggle4=!toggle4">
       <div><i class="iconfont icon-jiantou themeColor" v-show="toggle4==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle4==false"></i>培训</div>
       <div>
         </div>
       </div>
       <transition name="t1">
       <div v-show="toggle4==true">
       <el-table :data="finishData2" border height="30vh" style="width:unset" :header-cell-class-name="'table-header'">
       <el-table-column prop="task" label="事项简介" ></el-table-column>
     </el-table>
     </div>
     </transition>
   </div>
  <!-- <div class="list-bottom">
     <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
   </div> -->
  </div>
</template>

<script>
import Pagination from '../Pagination'
  export default {
    name: 'myTask',
    components:{Pagination},
    data() {
      return{
        toggle1:true,
        toggle2:false,
        toggle3:true,
        toggle4:false,
        doingData1:[
          {task:'审批文件',
          deadline:'无',
          }
        ],
        doingData2:[
          {task:'审批培训',
          deadline:'无',
          }
        ],
        finishData1:[
          {
          task:'审批文件',
          deadline:'2020-12-23',
          }
        ],
        finishData2:[
          {
          task:'审批文件',
          deadline:'2020-12-23',
          }
        ],
        tab:'1',
      }
    },
    methods:{
        rowClick(){
          this.$router.push({path:'examineFile'});
        }
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
