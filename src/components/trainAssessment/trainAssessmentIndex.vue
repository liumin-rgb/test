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
   </div>
   <div class="list-table">
     <el-table
         :data="tableData1"
         border
         height="60vh"
         style="width: 100%"
         stripe
          @selection-change="handleSelectionChange"
         :header-cell-class-name="'table-header'"
         >
         <el-table-column type="selection"></el-table-column>
         <el-table-column prop="name" label="培训名称" >
           <!-- <template slot-scope="scope">
                   <span class="themeColor text-line pointer" @click="toDetail()">{{scope.row.name}}</span>
            </template> -->
         </el-table-column>
         <el-table-column prop="type" label="培训类型" >

         </el-table-column>
         <el-table-column prop="owner" label="培训负责人">
         </el-table-column>
         <el-table-column prop="beginDate" label="培训开始时间" >
         </el-table-column>
         <el-table-column prop="endDate" label="培训结束时间" >
         </el-table-column>
         <el-table-column prop="status" label="状态" >

         </el-table-column>
         <el-table-column prop="include" label="包含考核" >

         </el-table-column>
         <el-table-column prop="" label="操作" align="center">
           <template slot-scope="scope">
            <i class="iconfont icon-icon-caozuo themeColor font16 pointer" @click="toTrain()"></i>
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
       <div><span><span>考核名称：</span><input class="pc-input" v-model="checkName"/></span>
       <span><span>考核开始时间：</span><el-date-picker  v-model="beginDate2" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" ></el-date-picker></span>
       </div>
       <span class="pc-button" @click="search"><i class="iconfont icon-sousuo"></i>搜索</span>
     </div>
     <div class="list-search-two"></div>
    </div>
    <div class="list-table">
      <el-table
          :data="tableData2"
          border
          height="60vh"
          style="width: 100%"
          stripe
           @selection-change="handleSelectionChange"
          :header-cell-class-name="'table-header'"
          >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="name" label="考核名称" >
          </el-table-column>
          <el-table-column prop="owner" label="考核结果">
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
            <i class="iconfont icon-icon-caozuo themeColor font16 pointer" @click="toCheck"></i>
           </template>
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
  export default {
    name: 'trainAssessmentIndex',
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
            status:'未参与',
            include:'是'
          }
        ],
        tableData2:[
          {
            name:'考核1',
            owner:'负责人1',
            beginDate:'2020-10-12',
            endDate:'2020-12-30',
            status:'未参与',
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
      }
    },
    methods:{
      toTrain(){
        this.$router.push({path:'viewTrain',query:{}});
      },
      toCheck(){
       this.$router.push({path:'startExamine',query:{}});
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
