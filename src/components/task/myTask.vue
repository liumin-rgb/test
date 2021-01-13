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
       <el-table-column prop="name" label="文件名称" >
        <template slot-scope="scope">
          <div class="pointer themeColor text-line">{{scope.row.name}}</div>
        </template>
       </el-table-column>
       <el-table-column prop="docNo" label="编号" ></el-table-column>
       <el-table-column prop="version" label="版本号" ></el-table-column>
       <el-table-column prop="status" label="状态" >
         <template slot-scope="scope">
           <div>{{scope.row.status| filter1(statusList)}}</div>
         </template>
       </el-table-column>
       <el-table-column prop="creator" label="创建人" ></el-table-column>
       <el-table-column prop="suggestion" label="备注" ></el-table-column>
     </el-table>
     <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
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
       <el-table-column prop="" label="培训名称" ></el-table-column>
        <el-table-column prop="" label="培训类型" ></el-table-column>
       <el-table-column prop="" label="培训负责人" ></el-table-column>
       <el-table-column prop="" label="培训开始时间" ></el-table-column>
        <el-table-column prop="" label="培训结束时间" ></el-table-column>
         <el-table-column prop="" label="状态" ></el-table-column>
           <el-table-column prop="" label="包含考核" ></el-table-column>
     </el-table>
     <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
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
      <el-table-column prop="name" label="文件名称" >
       <template slot-scope="scope">
         <div class="pointer themeColor text-line">{{scope.row.name}}</div>
       </template>
      </el-table-column>
      <el-table-column prop="docNo" label="编号" ></el-table-column>
      <el-table-column prop="version" label="版本号" ></el-table-column>
      <el-table-column prop="status" label="状态" >
        <template slot-scope="scope">
          <div>{{scope.row.status| filter1(statusList)}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="creator" label="创建人" ></el-table-column>
      <el-table-column prop="suggestion" label="备注" ></el-table-column>
     </el-table>
     <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
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
   <el-table-column prop="" label="培训名称" ></el-table-column>
    <el-table-column prop="" label="培训类型" ></el-table-column>
   <el-table-column prop="" label="培训负责人" ></el-table-column>
   <el-table-column prop="" label="培训开始时间" ></el-table-column>
    <el-table-column prop="" label="培训结束时间" ></el-table-column>
     <el-table-column prop="" label="状态" ></el-table-column>
       <el-table-column prop="" label="包含考核" ></el-table-column>
     </el-table>
     <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
     </div>
     </transition>
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
        toggle1:true,
        toggle2:false,
        toggle3:true,
        toggle4:false,
        totalCount:0,
        pageIndex: 1,
        pageSize:30,
        maxPage: 1,
        doingData1:[],
        doingData2:[
          {task:'审批培训',
          deadline:'无',
          }
        ],
        finishData1:[],
        finishData2:[
          {
          task:'审批文件',
          deadline:'2020-12-23',
          }
        ],
        tab:'1',
        statusList:[{code:'0',text:''},{code:'1',text:'草稿'},{code:'2',text:'已生效'},{code:'3',text:'流转中'},{code:'4',text:'废除'}],
      }
    },
    created(){
      this.queryTaskList();
    },
    filters:{
      filter1:function(val1,val2){
        let index=val2.findIndex((item)=>{return item.code==val1})||0;
        return val2[index].text;
      },
    },
    methods:{
        changePage(val){
          this.pageIndex=val.pageIndex;
          this.pageSize=val.pageSize;
          this.queryTaskList();
        },
        rowClick(obj){
          this.$router.push({path:'examineFile',query:{docVersionId:obj.docVersionId,docApproveNoteId:obj.docApproveNoteId}});
        },
        queryTaskList(){
               let url="/api/Task/searchTaskList";
               let params={
               "isTodo": this.tab==1?true:false,
               "employeeId": 1,
               "pageIndex": 1,
               "pageSize": 10,
               "employeeId":utils.cache.getSession("userId")
               }
               utils.request.post(url,params,true).then((res) => {
                 if(res){
                  if(res.success==true){
                      let data=res.result;
                     this.totalCount=data.totalCount||0;
                     this.maxPage=Math.ceil(this.totalCount/(this.pageSize));
                     if(this.tab==1){
                     this.doingData1=data.items;
                     }else{
                     this.finishData1=data.items;
                     }
                  }else{
                    utils.box.toast(res.error.message);
                  }
                 }
                 })
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
  }
.list-table{
  height:75vh;
  overflow: auto;
}

</style>
