<template>
  <div class="list-main positionR">
   <div class="list-tab displayF marginB1VH">
     <div :class="[tab!=1?'title_light_blue':'']" @click="tab=1">培训分类</div><div @click="tab=2" :class="[tab!=2?'title_light_blue':'']">试题分类</div>
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
      <span class="pc-button buttonNoback" @click="download1"><i class="iconfont icon-shangchuan1 "></i>列表导出</span>
     <span class="pc-button buttonNoback" @click="newClassify(1)"><i class="iconfont icon-jiahao "></i>新建分类</span>

    </span>
     </div>
   </div>
   <div class="list-table">
     <a-spin :spinning="spinning"  >
     <el-table
         :data="tableData1"
         border
         height="54vh"
         style="width: 100%"
         stripe
         :header-cell-class-name="'table-header'"
         >
         <el-table-column prop="name" label="培训分类"  min-width="300" align="center"></el-table-column>
         <el-table-column prop="" label="操作" >
      <template slot-scope="scope">
      <i class="iconfont icon-tubiao09 themeColor font16 pointer" @click="editInfo(1,scope.row.id,scope.row.name)"></i>
      <i class="iconfont icon-shanchu themeColor font16 pointer" @click="deleteInfo(1,scope.row.id)"></i>
          </template>
         </el-table-column>
       </el-table>
       </a-spin>
   </div>
   <div class="list-bottom">
   <Pagination    @changePage="changePage" :totalCount="totalCount"/>
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
     <span class="pc-button buttonNoback" @click="download2"><i class="iconfont icon-shangchuan1 "></i>列表导出</span>
  <span class="pc-button buttonNoback" @click="newClassify(2)"><i class="iconfont icon-jiahao "></i>新建类别</span>
 </span>
 </div>
    </div>
    <div class="list-table">
      <a-spin :spinning="spinning"  >
     <el-table
         :data="tableData2"
         border
         height="54vh"
         style="width: 100%"
         stripe
         :header-cell-class-name="'table-header'"
         >
         <el-table-column prop="name" label="试题分类" min-width="300" align="center"></el-table-column>
         <el-table-column prop="" label="操作" >
      <template slot-scope="scope">
      <i class="iconfont icon-tubiao09 themeColor font16 pointer" @click="editInfo(2,scope.row.id,scope.row.name)"></i>
      <i class="iconfont icon-shanchu themeColor font16 pointer" @click="deleteInfo(2,scope.row.id)"></i>
          </template>
         </el-table-column>
       </el-table>
       </a-spin>
    </div>
    <div class="list-bottom">
    <Pagination   @changePage="changePage" :totalCount="totalCount"/>
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
       // maxPage:1,
        pageSize:10,
        totalCount:0,
        visible:false,
        configure:{
          id:'',
          type:1,
          operate:'create',
          name:''
        },
        tableData1:[],
        tableData2:[],
        tab:'1',
        trainName:'',
        beginDate1:'',
        checkName:'',
        beginDate2:'',
        showSelect:false,
        multipleSelection:'',
        spinning:false,
      }
    },
    created(){
      this.queryInfo1();
    },
    watch:{
      tab(newVal){
        this.pageIndex=1;
       // this.pageSize=10;
       // newVal==1?this.queryInfo1():this.queryInfo2()
       this.search();
      }
    },
    methods:{
    newClassify(type){
      this.configure={
        id:'',
        type:type,
        operate:'create',
        name:'',
      }
      this.visible=true;
    },
    editInfo(type,id,name){
      this.configure={
        id:id,
        type:type,
        operate:'edit',
        name:name,
      }
      this.visible=true;
    },
    deleteInfo(type,id){
      let url = this.tab==1?"/api/Training/"+id:"/api/Training/"+id+"/ExamType";
    	utils.request.delete(url,{},true).then((res) => {
    		if(res){
          if(res.success==true){
            utils.box.toast("删除成功",'success');
            this.tab==1?this.queryInfo1():this.queryInfo2();
          }else{

          }
        }
        });
    },
    search(){
     this.tab==1?this.queryInfo1():this.queryInfo2()
    },
    toDetail(){

    },
    queryInfo1(){//查找培训分类
       let url = "/api/Training/searchTrainingType?PageIndex="+this.pageIndex+"&PageSize="+this.pageSize;
       let params={
         name:this.trainName
       }
        this.spinning=true;
       	utils.request.post(url,params,false).then((res) => {
           this.spinning=false;
       		if(res){
             if(res.success==true){
               let totalCount=res.result.totalCount;
                this.totalCount=totalCount;
               // this.maxPage=Math.ceil(totalCount/this.pageSize);
               let items=res.result.items;
                this.tableData1=items;
             }else{

             }

           }
           });
    },
    queryInfo2(){//查找考核分类
       let url = "/api/Training/searchExamType?PageIndex="+this.pageIndex+"&PageSize="+this.pageSize;
       let params={
         name:this.checkName
       }
        this.spinning=true;
       	utils.request.post(url,params,false).then((res) => {
           this.spinning=false;
       		if(res){
             if(res.success==true){
               let totalCount=res.result.totalCount;
                this.totalCount=totalCount;
                //this.maxPage=Math.ceil(totalCount/this.pageSize);
               let items=res.result.items;
                this.tableData2=items;
             }else{

             }
           }
           });
    },
    download1(){
      window.open(Global.baseUrl+'/api/Training/exportTrainingType','_self');
    },
    download2(){
      window.open(Global.baseUrl+'/api/Training/exportExamType','_self');
    },
    toUrl(type){
      this.$router.push({path:'newIndex',query:{type:type}});
    },
    changePage(val){
      this.pageIndex=val.pageIndex;
      this.pageSize=val.pageSize;
     this.search();
    },
    closeModel(val){
      this.visible=false;
      if(val){
        this.search();
      }
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
