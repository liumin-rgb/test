<template>
  <div class="list-main positionR">
   <div class="list-tab displayF marginB1VH">
     <div :class="[tab!=1?'title_light_blue':'']" @click="tab=1">培训</div><div @click="tab=2" :class="[tab!=2?'title_light_blue':'']">考核</div>
   </div>
   <div v-show="tab==1">
  <div class="list-search">
      <div class="list-search-one flexBtw">
      <div><span><span>培训名称：</span><input class="pc-input" v-model="trainName"/></span>
      <span><span>培训开始时间：</span><el-date-picker  v-model="beginDate1" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" ></el-date-picker></span>
      </div>
      <span class="pc-button" @click="search"><i class="iconfont icon-sousuo"></i>搜索</span>
    </div>
    <div class="list-search-two"></div>
    <div class="list-search-three">
    <span class="positionR">
     <span class="pc-button buttonNoback" @mouseenter="showSelect=true"><i class="iconfont icon-jiahao "></i>新建<i class="iconfont icon-jiantou "></i></span>
    <div @mouseleave="showSelect=false" class="pc-select selectOne" v-show="showSelect==true">
     <div @click="toUrl(1)">培训</div>
     <div @click="toUrl(2)">考核</div>
     <div @click="toUrl(3)">培训+考核</div>
    </div>
    </span>
    <span class="pc-button buttonNoback" @click="download1"><i class="iconfont icon-shangchuan1 "></i>导出</span>
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
          @selection-change="handleSelectionChange"
         :header-cell-class-name="'table-header'"
         >
         <el-table-column type="selection"></el-table-column>
         <el-table-column prop="name" label="培训名称" >
            <template slot-scope="scope">
                   <span class="themeColor text-line pointer" @click="toDetail()">{{scope.row.name}}</span>
            </template>
         </el-table-column>
         <el-table-column prop="trainingTypeName" label="培训分类" >

         </el-table-column>
         <el-table-column prop="employeeName" label="培训负责人">
         </el-table-column>
         <el-table-column prop="startDate" label="培训开始时间" >
         </el-table-column>
         <el-table-column prop="endDate" label="培训结束时间" >
         </el-table-column>
         <el-table-column prop="trainingStatus" label="状态" >

         </el-table-column>
         <el-table-column prop="isExam" label="包含考核" >
         <template slot-scope="scope">
                   <span >{{scope.row.isExam?'是':'否'}}</span>
            </template>
         </el-table-column>
         <el-table-column prop="" label="操作" align="center">
    <template slot-scope="scope">
            <el-popover trigger="hover" placement="bottom">
              <div class="pointer themeColor weight600 font12">
              <p ><i class="iconfont icon-tijiao"></i>发布</p>
              <p ><i class="iconfont icon-tubiao09"></i>编辑</p>
              <p ><i class="iconfont icon-chuanyueicon"></i>复制</p>
              <p @click="deleteTrain(scope.row.id)"><i class="iconfont icon-shanchu"></i>删除</p>
              </div>
              <div slot="reference" class="name-wrapper">
               <img src="../../assets/img/threeDot.png" style="width:.03rem" class="pointer"/>
              </div>
            </el-popover>
          </template>
         </el-table-column>
       </el-table>
       </a-spin>
   </div>
   <div class="list-bottom">
   <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
    </div>
   </div>
   <div v-show="tab==2">
   <div class="list-search">
       <div class="list-search-one flexBtw">
       <div><span><span>考核名称：</span><input class="pc-input" v-model="checkName"/></span>
       <span><span>考核开始时间：</span><el-date-picker  v-model="beginDate2" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" ></el-date-picker></span>
       </div>
       <span class="pc-button" @click="search"><i class="iconfont icon-sousuo"></i>搜索</span>
     </div>
     <div class="list-search-two"></div>
     <div class="list-search-three">
     <span class="positionR">
      <span class="pc-button buttonNoback" @mouseenter="showSelect=true"><i class="iconfont icon-jiahao "></i>新建<i class="iconfont icon-jiantou "></i></span>
     <div @mouseleave="showSelect=false" class="pc-select selectOne" v-show="showSelect==true">
      <div @click="toUrl(1)">培训</div>
      <div @click="toUrl(2)">考核</div>
      <div @click="toUrl(3)">培训+考核</div>
     </div>
     </span>
     <span class="pc-button buttonNoback" @click="download2"><i class="iconfont icon-shangchuan1 "></i>导出</span>
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
           @selection-change="handleSelectionChange"
          :header-cell-class-name="'table-header'"
          >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="name" label="考核名称" >
            <template slot="header" slot-scope="scope">
               <span class="pointer" ><span class="gray ">考核名称</span></span>
             </template>
             <template slot-scope="scope">
                    <span class="themeColor text-line pointer" @click="toDetail()">{{scope.row.name}}</span>
             </template>
          </el-table-column>

          <el-table-column prop="owner" label="考核负责人">
          </el-table-column>
          <el-table-column prop="beginDate" label="考核开始时间" >
          </el-table-column>
          <el-table-column prop="endDate" label="考核结束时间" >
          </el-table-column>
          <el-table-column prop="status" label="状态" >

          </el-table-column>
          <el-table-column prop="include" label="包含培训" >

          </el-table-column>
          <el-table-column prop="" label="操作" align="center">
     <template slot-scope="scope">
             <el-popover trigger="hover" placement="bottom">
               <div class="pointer themeColor weight600 font12">
               <p >复制</p>
               <p @click="toRecord">查看记录</p>
               <p >停止</p>
               </div>
               <div slot="reference" class="name-wrapper">
                <img src="../../assets/img/threeDot.png" style="width:.03rem" class="pointer"/>
               </div>
             </el-popover>
           </template>
          </el-table-column>
        </el-table>
        </a-spin>
    </div>
    <div class="list-bottom">
    <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
     </div>
    </div>
  </div>
</template>

<script>
import Pagination from '../Pagination'
  export default {
    name: 'trainIndex',
    components:{Pagination},
    data() {
      return{
        pageIndex:1,
        maxPage:1,
        pageSize:10,
        totalCount:0,
        tableData1:[
          {
            name:'培训1',
            type:'类型1',
            owner:'负责人1',
            beginDate:'2020-10-12',
            endDate:'2020-12-30',
            status:'未发布',
            include:'是'
          }
        ],
        tableData2:[
          {
            name:'考核1',
            owner:'负责人1',
            beginDate:'2020-10-12',
            endDate:'2020-12-30',
            status:'未发布',
            include:'是'
          }
        ],
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
     toRecord(){
        this.$router.push({path:'trainRecord',query:{}})
      },
    search(){
      this.tab==1?this.queryInfo1():this.queryInfo2()
    },
    toDetail(){

    },
   queryInfo1(){//查找培训
      let url = "/api/Training/searchTrainingByCondition?isDescending=true";
      let params={
        "pageIndex": this.pageIndex,
         "pageSize": this.pageSize,
         "name": this.trainName,
         "startDate":this.beginDate1
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
   queryInfo2(){//查找考核
      let url = "/api/Training/searchExamType";
      let params={
        pageIndex:this.pageIndex,
        pageSize:this.pageSize,
        name:this.trainName
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
      window.open(this.GLOBAL.baseUrl+'/api/Training/exportTraining','_self');
    },
    download2(){
      
    },
    deleteTrain(id){
      let url = "/api/Training/"+id+"/Training";
      	utils.request.delete(url,{},true).then((res) => {
      		if(res){
            if(res.success==true){
             utils.box.toast("删除成功","success");
             this.queryInfo1();
            }else{

            }
          }
          });
    },
    toUrl(type){
      this.$router.push({path:'newIndex',query:{type:type}});
    },
    changePage(val){
      this.pageIndex=val.pageIndex;
      this.pageSize=val.pageSize;
     this.search();
    },
    handleSelectionChange(val) {
       this.multipleSelection = val;
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
