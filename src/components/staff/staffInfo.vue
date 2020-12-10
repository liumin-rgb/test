<template>
  <div class="list-main">
    <div class="list-search">
      <div>
        <span><span class="label">姓名：</span><input class="pc-input" v-model="searchInfo.name"/></span>
        <span><span class="label">工号：</span><input class="pc-input" v-model="searchInfo.employeeNo"/></span>
        <span v-show="!isOrdinarySearch"><span class="label">在职状态：</span><select class="pc-input" @change="getSelectInfo('workingStatus')" id="workingStatus"><option v-for="obj in workStatusList" :value="obj.code" >{{obj.text}}</option></select>
  </span>
        <span class="floatR">
          <span class="backButton" @click="isOrdinarySearch=isOrdinarySearch==true?false:true"><i class="iconfont icon-zhuanhuan1"></i><span
              class="weight600">{{isOrdinarySearch==false?'普通搜索':'高级搜索'}}</span></span>
          <span class="pc-button" @click="queryInfo">搜索</span>
        </span>
      </div>
      <div>
        <span v-show="!isOrdinarySearch"><span class="label">政治面貌：</span><select class="pc-input" @change="getSelectInfo('political')" id="political"><option v-for="obj in politicalList" :value="obj.code" >{{obj.text}}</option></select></span>
        <span v-show="!isOrdinarySearch"><span class="label">学历：</span><select class="pc-input" @change="getSelectInfo('education')" id="education"><option v-for="obj in educationList" :value="obj.code" >{{obj.text}}</option></select></span>
        <span v-show="!isOrdinarySearch"><span class="label">部门：</span><select class="pc-input" @change="getSelectInfo('department')" id="department"><option v-for="obj in departmentList" :value="obj.code" >{{obj.text}}</option></select></span>
      </div>
      <div>
        <span v-show="!isOrdinarySearch"><span class="label">工作年限：</span><input class="pc-input" style="width:.6rem" v-model="searchInfo.seniorityStart"/>--<input
            class="pc-input" style="width:.6rem" v-model="searchInfo.seniorityEnd"/></span>
        <span v-show="!isOrdinarySearch" class="positionR"><span class="label">入职时间：</span>
            <el-date-picker  v-model="searchInfo.workingDateStart" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" ></el-date-picker>
            -
            <el-date-picker  v-model="searchInfo.workingDateEnd" value-format="yyyy-MM-dd"  type="date" placeholder=" 请选择"></el-date-picker>
</span>
      </div>
      <div class="list-search-three">
        <span class="pc-button buttonNoback" @click=""><i class="iconfont icon-shangchuan1 "></i>列表导出</span>
        <span class="pc-button buttonNoback" @click="openImport"><i class="iconfont icon-shangchuan1 "></i>批量导入</span>
        <span class="pc-button buttonNoback" @click="toStaffInfo('add')"><i class="iconfont icon-jiahao"></i>添加</span>
        <span class="pc-button buttonNoback" @click="changeCategory">修改详情页类目名称</span>
      </div>
    </div>
    <div class="list-table">
      <el-table :data="tableData" border height="250"  :header-cell-class-name="'table-header'">
        <el-table-column prop="employeeNo" label="工号" sortable></el-table-column>
        <el-table-column prop="name" label="姓名" sortable></el-table-column>
        <el-table-column prop="sex" label="性别" width="50">
          <template slot-scope="scope"> <span>{{scope.row.sex==1?'男':'女'}}</span></template>
        </el-table-column>
        <el-table-column prop="birthday" label="出生日期"></el-table-column>
        <el-table-column prop="age" label="年龄" width="50"></el-table-column>
        <el-table-column prop="marriage" label="婚姻">
          <template slot-scope="scope"> <span>{{scope.row.marriage==0?'未知':scope.row.marriage==1?'已婚':'未婚'}}</span></template>
        </el-table-column>
        <el-table-column prop="political" label="政治面貌">
          <template slot-scope="scope"> <span>{{scope.row.political | filter1(politicalList)}}</span></template>
        </el-table-column>
        <el-table-column prop="workingDate" label="入职时间"></el-table-column>
        <el-table-column prop="mobile" label="手机长号"></el-table-column>
        <el-table-column prop="seniority" label="工作年限"></el-table-column>
        <el-table-column prop="department" label="部门"></el-table-column>
        <el-table-column prop="education" label="学历" width="50">
          <template slot-scope="scope"> <span>{{scope.row.education| filter1(educationList)}}</span></template>
        </el-table-column>
        <el-table-column prop="workingStatus" label="在职状态">
          <template slot-scope="scope"> <span>{{scope.row.workingStatus| filter1(workStatusList)}}</span></template>
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center" width="50">
          <template slot-scope="scope">
                  <el-popover trigger="hover" placement="bottom">
                    <div class="pointer themeColor ">
                    <p @click="toStaffInfo('edit',scope.row.id)">编辑</p>
                    <p @click="offWork(scope.row.id)">离职</p>
                    <p @click="resetPassword(scope.row.id)">重置密码</p>
                    </div>
                    <div slot="reference" class="name-wrapper">
                     <img src="../../assets/img/threeDot.png" style="width:.03rem"/>
                    </div>
                  </el-popover>
                </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="list-bottom">
      <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
    </div>
    <ImportStaff :visible="visible1" @closeModel="closeModel" @openModel2="openModel2" />
    <InsureImport :visible="visible2" @closeModel="closeModel2" />
    <CategoryManage :visible="visible3" @closeModel="closeModel3" />
  </div>
</template>

<script>
  import Pagination from '../Pagination'
  import ImportStaff from './importStaff'
  import InsureImport from './insureImport'
  import CategoryManage from './categoryManage'
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
        visible1: false,
        visible2: false,
        visible3: false,
        pageIndex: 1,
        pageSize:10,
        maxPage: 10,
        totalCount:0,
        isOrdinarySearch: true, //true 普通 false:高级
        searchInfo:{
          name:'',
          employeeNo:'',
          workingStatus:"0",
          political:"0",
          education:"0",
          department:"0",
          seniorityStart:'',
          seniorityEnd:'',
          workingDateStart:'',
          workingDateEnd:''
        },
        workStatusList:[{code:'0',text:'全部'},{code:'1',text:'在职'},{code:'2',text:'离职'}],
        politicalList:[{code:'0',text:'全部'},{code:'1',text:'党员'},{code:'2',text:'团员'},{code:'3',text:'群众'}],
        educationList:[{code:'0',text:'全部'},{code:'1',text:'博士'},{code:'2',text:'硕士'},{code:'3',text:'本科'},{code:'4',text:'大专'},{code:'5',text:'中专'},{code:'6',text:'初中'}],
        departmentList:[{code:'0',text:'全部'}],
       // sexList:[{code:'0',text:'全部'},{code:'1',text:'男'},{code:'2',text:'女'}],
        tableData: [
          {
                "id": 22,
                "employeeNo": 1223,
                "name": "liza",
                "sex": 1,
                "birthday": "1993-12-09",
                "age": 28,
                "marriage": 1,
                "political": 1,
                "workingDate": "2019-10-20",
                "mobile": 18621290873,
                "seniority": "1", //工作年限
                "department": "Lab",
                "education": 0,
                "workingStatus": 1
              }
        ]
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
    methods: {
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
        let url = "/api/Employee/pagedlist";
        let params={
          searchInput:{
          pageIndex:this.pageIndex,
          pageSize:this.pageSize,
          isOrdinarySearch:this.isOrdinarySearch,
          ...this.searchInfo
          }
        }
        	utils.request.post(url,params).then((res) => {
        		if(res){
              let totalCount=res.totalCount;
              this.totalCount=totalCount;
              this.maxPage=Math.ceil(totalCount/this.pageSize);
             let items=res.items;
              this.tableData=items;
            }
            });
      },
      offWork(id){
        		  utils.box.confirm("是否确认离职？").then(()=>{
        		  			 this.confirmOffWork(id);
        		  			 });

      },
      confirmOffWork(id){

      },
      resetPassword(id){
        		  utils.box.confirm("是否确认重置密码？").then(()=>{
        		  			 this.confirmResetPassword(id);
        		  			 });

      },
      confirmResetPassword(id){

      },
      openImport() {
        this.visible1 = true;
      },
      closeModel() {
        this.visible1 = false;

      },
      closeModel2() {
        this.visible2 = false;
      },
      closeModel3() {
        this.visible3 = false;
      },
      toStaffInfo(status,id) {
        this.$router.push({
          path: 'editStaff',
          query: {
            flag: status,
            id:id||''
          }
        });
      },
      openModel2() {
        this.visible2 = true;
      },
      changeCategory() {
        this.visible3 = true;
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
    padding: .1rem .05rem;

    &-three {
      text-align: right;
      margin-top: 0.1rem;
    }
  }
  /*列表*/


 /*时间控件*/
  /deep/.el-table th>.cell{padding-left:5px;padding-right:0;}
  /deep/.el-input__inner{height:.25rem;border: 1px solid #2e6eb4;}
  /deep/.el-input__icon{line-height: .25rem;}
  /deep/.el-date-editor.el-input, .el-date-editor.el-input__inner{width:1.2rem;margin: .02rem 0.1rem;box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.1)}
  /deep/.el-input--suffix .el-input__inner{padding-right:0}
</style>
