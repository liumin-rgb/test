<template>
  <div class="list-main positionR">
   <div class="list-tab displayF marginB1VH">
     <div :class="[tab!=1?'title_light_blue':'']" @click="tab=1">培训分类</div><div @click="tab=2" :class="[tab!=2?'title_light_blue':'']">试题类别</div>
   </div>
   <div v-show="tab==1">
  <div class="list-search">
      <div class="list-search-one flexBtw">
      <div><span><span>培训分类名称：</span><input class="pc-input" v-model="trainName"/></span>
      </div>
      <span class="pc-button" @click="search"><i class="iconfont icon-sousuo"></i>搜索</span>
    </div>
    <div class="list-search-two"></div>
    <div class="list-search-three">
    <span class="positionR">
     <span class="pc-button buttonNoback" @click="newClassify(1)"><i class="iconfont icon-jiahao "></i>新建分类</span>

    </span>
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
         <el-table-column prop="type" label="培训分类"  min-width="300"></el-table-column>
         <el-table-column prop="" label="操作" >
      <template slot-scope="scope">
      <i class="iconfont icon-tubiao09 themeColor font16"></i>
      <i class="iconfont icon-shanchu themeColor font16"></i>
          </template>
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
       <div><span><span>试题类别名称：</span><input class="pc-input" v-model="checkName"/></span>
       </div>
       <span class="pc-button" @click="search"><i class="iconfont icon-sousuo"></i>搜索</span>
     </div>
     <div class="list-search-two"></div>
     <div class="list-search-three">
  <span class="positionR">
  <span class="pc-button buttonNoback" @click="newClassify(2)"><i class="iconfont icon-jiahao "></i>新建类别</span>
 </span>
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
         <el-table-column prop="type" label="试题类别" min-width="300"></el-table-column>
         <el-table-column prop="" label="操作" >
      <template slot-scope="scope">
      <i class="iconfont icon-tubiao09 themeColor font16"></i>
      <i class="iconfont icon-shanchu themeColor font16"></i>
          </template>
         </el-table-column>
       </el-table>
    </div>
    <div class="list-bottom">
    <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
     </div>
    </div>
    <ClassModel :visible="visible" @closeModel="closeModel" :configure="configure"/>
  </div>
</template>

<script>
import ClassModel from './classificationModel'
import Pagination from '../Pagination'
  export default {
    name: 'classification',
    components:{Pagination,ClassModel},
    data() {
      return{
        pageIndex:1,
        maxPage:1,
        pageSize:10,
        totalCount:0,
        visible:false,
        configure:{
          id:'',
          type:1,
          name:''
        },
        tableData1:[
          {
            type:'外部培训'
          }
        ],
        tableData2:[
          {
            type:'入职考试'
          }
        ],
        tab:'1',
        trainName:'',
        beginDate1:'',
        checkName:'',
        beginDate2:'',
        showSelect:false,
        multipleSelection:'',
      }
    },
    methods:{
    newClassify(type){
      this.configure={
        id:'',
        type:type,
        name:'',
      }
      this.visible=true;
    },
    search(){

    },
    toDetail(){

    },
    queryInfo(){

    },
    download(){

    },
    toUrl(type){
      this.$router.push({path:'newIndex',query:{type:type}});
    },
    changePage(val){
      this.pageIndex=val.pageIndex;
      this.pageSize=val.pageSize;
     // this.queryInfo();
    },
    closeModel(val){
      this.visible=false;
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

 /*时间控件*/
  /deep/.el-table th>.cell{padding-left:5px;padding-right:0;}
  /deep/.el-input__inner{height:.25rem;/* border: 1px solid #2e6eb4; */}
  /deep/.el-input__icon{line-height: .25rem;}
  /deep/.el-date-editor.el-input, .el-date-editor.el-input__inner{width:1.2rem;margin: .02rem 0.1rem;/* box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.1) */}
  /deep/.el-input--suffix .el-input__inner{padding-right:0}
</style>
