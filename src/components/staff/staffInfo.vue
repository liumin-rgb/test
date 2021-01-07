<template>
  <div class="list-main" ref="main">
    <div class="list-search" ref="search">
      <div>
        <span><span class="label">姓名：</span><input class="pc-input" v-model="searchInfo.name"/></span>
        <span><span class="label">工号：</span><input class="pc-input" v-model="searchInfo.employeeNo"/></span>
        <span v-show="!isOrdinarySearch"><span class="label">在职状态：</span><select class="pc-input" @change="getSelectInfo('workingStatus')" id="workingStatus"><option v-for="obj in workStatusList" :value="obj.code" >{{obj.text}}</option></select>
  </span>
        <span class="floatR">
          <span class="backButton" @click="isOrdinarySearch=isOrdinarySearch==true?false:true"><i class="iconfont icon-zhuanhuan1"></i><span
              class="weight600">{{isOrdinarySearch==false?'普通搜索':'高级搜索'}}</span></span>
          <span class="pc-button" @click="search"><i class="iconfont icon-sousuo"></i>搜索</span>
        </span>
      </div>
      <div>
        <span v-show="!isOrdinarySearch"><span class="label">政治面貌：</span><select class="pc-input" @change="getSelectInfo('political')" id="political"><option v-for="obj in politicalList" :value="obj.code" >{{obj.text}}</option></select></span>
        <span v-show="!isOrdinarySearch"><span class="label">学历：</span><select class="pc-input" @change="getSelectInfo('education')" id="education"><option v-for="obj in educationList" :value="obj.code" >{{obj.text}}</option></select></span>
       <span v-show="!isOrdinarySearch" class="positionR"><span class="label">入职时间：</span><el-date-picker  v-model="searchInfo.workingDateStart" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" ></el-date-picker>
                   -
                   <el-date-picker  v-model="searchInfo.workingDateEnd" value-format="yyyy-MM-dd"  type="date" placeholder=" 请选择"></el-date-picker>
       </span>

      </div>
      <div>
<!--        <span v-show="!isOrdinarySearch"><span class="label">隶属组织：</span><select class="pc-input" @change="getSelectInfo('orgnize')" id="orgnize"><option v-for="obj in orgnizeList" :value="obj.code" >{{obj.text}}</option></select></span>
 -->
         <span v-show="!isOrdinarySearch"><span class="label">隶属组织：</span><span>
          <a-tree-select
           allow-clear
           tree-checkable
           size="small"
           style="width:4.05rem;height:.25rem;margin: .02rem 0.1rem;"
           @change="onChange"
           :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
           :tree-data="treemap"
           tree-default-expand-all
         >
         </a-tree-select>
        </span>
        </span>
<!--        <span v-show="!isOrdinarySearch"><span class="label">岗位：</span><select class="pc-input" @change="getSelectInfo('orgnize')" id="orgnize"><option v-for="obj in orgnizeList" :value="obj.code" >{{obj.text}}</option></select></span>
 -->        <!-- <span v-show="!isOrdinarySearch"><span class="label">工作年限：</span><input class="pc-input" style="width:.6rem" v-model="searchInfo.seniorityStart"/>--<input
            class="pc-input" style="width:.6rem" v-model="searchInfo.seniorityEnd"/></span> -->
      </div>
      <div class="list-search-three">
        <span class="pc-button buttonNoback" @click="exportFile"><i class="iconfont icon-shangchuan1 "></i>列表导出</span>
        <span class="pc-button buttonNoback" @click="openImport"><i class="iconfont icon-shangchuan "></i>批量导入</span>
        <span class="pc-button buttonNoback" @click="toStaffInfo('add')"><i class="iconfont icon-jiahao"></i>添加</span>
        <span class="pc-button buttonNoback" @click="changeCategory"><i class="iconfont icon-tubiao09"></i>修改详情页类目名称</span>
      </div>
    </div>
    <div class="list-table">
      <a-spin :spinning="spinning"  >
      <el-table :data="tableData" border  :height="tableHeight" stripe :header-cell-class-name="'table-header'">
        <el-table-column prop="employeeNo" label="工号" width="70">
          <template slot="header" slot-scope="scope">
                 <span class="pointer" @click="takeOrder(true)"><span class="gray ">工号</span><i class="iconfont icon-paixu themeColor"></i></span>
                </template>
                <template slot-scope="scope">
                      <span class="gray pointer" @click="toStaffInfo('edit',scope.row.id)">{{scope.row.employeeNo}}</span>
                </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名"  width="70">
          <template slot="header" slot-scope="scope">
                 <span class="pointer" @click="takeOrder(false)"><span class="gray ">姓名</span><i class="iconfont icon-paixu themeColor"></i></span>
           </template>
          <template slot-scope="scope">
                 <span class="gray pointer"  @click="toStaffInfo('edit',scope.row.id)">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="50">
          <template slot-scope="scope"> <span>{{scope.row.sex==0?'':scope.row.sex==1?'男':'女'}}</span></template>
        </el-table-column>
       <!-- <el-table-column prop="birthday" label="出生日期"></el-table-column> -->
        <el-table-column prop="age" label="年龄" width="50"></el-table-column>
<!--        <el-table-column prop="marriage" label="婚姻" width="50">
          <template slot-scope="scope"> <span>{{scope.row.marriage==0?'未知':scope.row.marriage==1?'已婚':'未婚'}}</span></template>
        </el-table-column> -->
        <el-table-column prop="political" label="政治面貌">
          <template slot-scope="scope"> <span>{{scope.row.political | filter1(politicalList)}}</span></template>
        </el-table-column>
        <el-table-column prop="workingDate" label="入职时间"></el-table-column>
        <el-table-column prop="mobile" label="手机长号"></el-table-column>
      <!--  <el-table-column prop="seniority" label="工作年限" width="70"></el-table-column> -->
        <el-table-column prop="department" label="部门" min-width="100"></el-table-column>
        <el-table-column prop="education" label="学历" width="50">
          <template slot-scope="scope"> <span>{{scope.row.education| filter1(educationList)}}</span></template>
        </el-table-column>
        <el-table-column prop="workingStatus" label="在职状态" min-width="50">
          <template slot-scope="scope"> <span>{{scope.row.workingStatus| filter1(workStatusList)}}</span></template>
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center" width="50">
          <template slot-scope="scope">
                  <el-popover trigger="hover" placement="bottom">
                    <div class="pointer themeColor weight600 font12">
                    <p @click="toStaffInfo('edit',scope.row.id)"><i class="iconfont icon-bianji"></i>编辑</p>
                    <p @click="offWork(scope.row.id,0)"><i class="iconfont icon-lizhi"></i>离职</p>
                     <p @click="offWork(scope.row.id,1)"><i class="iconfont icon-lizhi"></i>退休</p>
                    <p @click="resetPassword(scope.row.id)"><i class="iconfont icon-suo"></i>重置密码</p>
                    <p @click="deleteStaff(scope.row.id)"><i class="iconfont icon-shanchu"></i>删除</p>
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
    <ImportStaff :visible="visible1" @closeModel="closeModel" @openModel2="openModel2" />
    <InsureImport :visible="visible2" @closeModel="closeModel2" :orgnize="orgnize"/>
    <CategoryManage :visible="visible3" @closeModel="closeModel3" />
  </div>
</template>

<script>
  import Pagination from '../Pagination'
  import ImportStaff from './importStaff'
  import InsureImport from './insureImport'
  import CategoryManage from './categoryManage'
  import { TreeSelect } from 'ant-design-vue';
  const SHOW_PARENT = TreeSelect.SHOW_PARENT;
  import Global from '../../assets/lib/globalConfig.js'
  export default {
    name: 'staffInfo',
    components: {
      Pagination,
      ImportStaff,
      InsureImport,
      CategoryManage
    },
    data() {
      return {
        tableHeight:'',
        spinning:false,
        visible1: false,
        visible2: false,
        visible3: false,
        pageIndex: 1,
        pageSize:10,
        maxPage: 1,
        totalCount:0,
        isOrdinarySearch: true, //true 普通 false:高级
        sortField:true,
        order1:false,
        order2:false,
        isDescending:false,
        searchInfo:{
          name:'',
          employeeNo:'',
          workingStatus:0,
          political:0,
          education:0,
          departments:[],
         /* seniorityStart:0,
          seniorityEnd:0, */
          workingDateStart:'',
          workingDateEnd:''
        },
        workStatusList:[{code:'0',text:'全部'},{code:'1',text:'在职'},{code:'2',text:'离职'},{code:'3',text:'退休'}],
        politicalList:[{code:'0',text:'全部'},{code:'1',text:'党员'},{code:'2',text:'团员'},{code:'3',text:'群众'}],
        educationList:[{code:'0',text:'全部'},{code:'1',text:'博士'},{code:'2',text:'硕士'},{code:'3',text:'本科'},{code:'4',text:'大专'},{code:'5',text:'中专'},{code:'6',text:'初中'}],
        //orgnizeList:[{code:'0',text:'全部'},{code:'1',text:'总院'},{code:'2',text:'分院1'},{code:'3',text:'分院2'}],
        departmentList:[],
        treemap:[],
        SHOW_PARENT,
       // sexList:[{code:'0',text:'全部'},{code:'1',text:'男'},{code:'2',text:'女'}],
        tableData: [],
        orgnize:'',//用于上传
      }
    },
    filters:{
      filter1:function(val1,val2){
        let arr=val2.filter((item)=>{
          return item.code==val1&&item.code!=0;
        })
        if(arr.length>0){
          return arr[0].text||'';
        }
        return '';

      }
    },
    created(){
      this.queryInfo();
     // this.queryDepartment();
      this.querytreemap();
    },
    watch:{
      isOrdinarySearch:function(val){
        this.$nextTick(()=>{
          this.tableHeight=this.$refs.main.offsetHeight-this.$refs.search.offsetHeight-34-24

        })
      }
    },
    mounted(){
         this.tableHeight=this.$refs.main.offsetHeight-this.$refs.search.offsetHeight-34-24
    },
    methods: {
      exportFile(){
        window.open(Global.baseUrl+'/api/Employee/export','_self');
      },
      search(){
        this.pageIndex=1;
        this.queryInfo();
      },
      takeOrder(sortField){
        this.sortField=sortField;
        if(sortField==true){
          this.isDescending=this.order1==true?false:true;
        }else{
           this.isDescending=this.order2==true?false:true;
        }
        this.queryInfo()
      },
      onChange(value){
        this.searchInfo.departments= value;
      },
      getSelectInfo(id){
        this.searchInfo[id]=this.getSelectValue(id);
        console.log(this.searchInfo);
      },
      getSelectValue(id){
        let Sel=document.getElementById(id);
        let index=Sel.selectedIndex;
        let text=Sel.options[index].text;
        let value=Sel.options[index].value;
        return value
      },
      changePage(val){
        this.pageIndex=val.pageIndex;
        this.pageSize=val.pageSize;
        this.queryInfo();
      },
      getStartTime(date, dateString) {
            console.log(date, dateString);
          },
      getEndTime(date, dateString) {
            console.log(date, dateString);
          },
      queryInfo(){
        let url = "/api/Employee/pagedlist?sortField="+this.sortField+"&isDescending="+this.isDescending;
        let params={
          pageIndex:this.pageIndex,
          pageSize:this.pageSize,
          isOrdinarySearch:this.isOrdinarySearch,
          ...this.searchInfo
        }
         this.spinning=true;
        	utils.request.post(url,params,false).then((res) => {
            this.spinning=false;
        		if(res){
              if(res.success==true){
                let totalCount=res.result.totalCount;
                 this.totalCount=totalCount;
                 this.maxPage=Math.ceil(totalCount/this.pageSize);
                let items=res.result.items;
                 this.tableData=items;
              }else{

              }

            }
            });
      },
      queryDepartment(){
        let url="/api/Organization/department/list";
        utils.request.get(url).then((res) => {
        	if(res){
            if(res.success==true){
              let departmentList=res.result;
              this.departmentList=departmentList.map((item)=>{
                return {
                      title: item,
                      value: item,
                      key: item,
                }
              })
              //this.departmentList=departmentList.unshift("全部");
            }else{

            }

          }
          });
      },
      querytreemap(){
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
          if(treeList[i].children){
            this.forTree(treeList[i].children);
          }
        }
      },
      offWork(id,type){
        		  utils.box.confirm(type==0?"是否确认离职？":"是否确认退休？").then(()=>{
        		  			 this.confirmOffWork(id,type);
        		  			 });
      },
      confirmOffWork(id,type){
        let url="/api/Employee/IsOnwork?id="+id+"&type="+type;
        utils.request.get(url,true).then((res) => {
        	if(res){
            if(res.success==true){
              utils.box.toast(type==0?"成功离职":"成功退休","success");
              this.queryInfo();
            }else{
             utils.box.toast(res.error.message);
            }
          }
          });
      },
      resetPassword(id){
        		  utils.box.confirm("是否确认重置密码？").then(()=>{
        		  			 this.confirmResetPassword(id);
        		  			 });

      },
      confirmResetPassword(id){
        let url="/api/Employee/ResetPassword?id="+id;
        utils.request.get(url,true).then((res) => {
        	if(res){
            if(res.success==true){
              utils.box.toast("密码重置成功");
            }else{
             utils.box.toast(res.error.message);
            }
          }
          });
      },
      deleteStaff(id){
        		  utils.box.confirm("是否确认删除该员工？").then(()=>{
        		  			 this.confirmDeleteStaff(id);
        		  			 });
      },
      confirmDeleteStaff(id){
          let url="/api/Employee/"+id;
          utils.request.delete(url,true).then((res) => {
          	if(res){
              if(res.success==true){
                utils.box.toast("删除成功","success");
                this.queryInfo();
              }else{
               utils.box.toast(res.error.message);
              }
            }
         });
      },
      openImport() {
       this.visible1 = true;
      },
      openModel2(val) {
        this.visible2 = true;
        if(val){
           this.orgnize=val.orgnize;
        }
      },
      changeCategory() {
        this.visible3 = true;
      },
      closeModel() {
        this.visible1 = false;

      },
      closeModel2(val) {
        this.visible2 = false;
        if(val==true){
          this.queryInfo();
        }
      },
      closeModel3() {
        this.visible3 = false;
      },
      toStaffInfo(status,id) {
        utils.cache.setSession("pageFrom","staffInfo");
        this.$router.push({
          path: 'editStaff',
          query: {
            flag: status,
            id:id||''
          }
        });
      },



    }
  };
</script>

<style lang="less" scoped>
  .list-main {
    height: 100%;
    border-radius: 5px;
    background: #fff;
    padding: .1rem;
    position: relative;
  }

  .list-search {
    border: 1px dashed #cccccc;
    border-radius: 5px;
    margin-bottom: .1rem;
    padding: .05rem;

    &-three {
      text-align: right;

    }
  }
  /*列表*/


 /*时间控件*/
  /deep/.el-table th>.cell{padding-left:5px;padding-right:0;}
  /deep/.el-input__inner{height:.25rem;/* border: 1px solid #2e6eb4; */}
  /deep/.el-input__icon{line-height: .25rem;}
  /deep/.el-date-editor.el-input, .el-date-editor.el-input__inner{width:1.2rem;margin: .02rem 0.1rem;/* box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.1) */}
  /deep/.el-input--suffix .el-input__inner{padding-right:0}
</style>
