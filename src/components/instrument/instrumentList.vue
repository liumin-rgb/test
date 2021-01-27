<template>
  <div>
    <div class="tempMain">
      <div class="list-search" ref="search">
        <div class="list-search-one flexBtw">
          <div>
          <span>
            <select class="pc-input middInput">
              <option v-for="obj in statusList" :value="obj.code">{{ obj.text }}</option>
            </select>
          </span>
          <span><input class="pc-input middInput" placeholder="仪器编号"/></span>
          <span><input class="pc-input middInput" placeholder="仪器名称"/></span>
          </div>
           <span class="pc-button" @click="search"><i class="iconfont icon-sousuo"></i>搜索</span>
        </div>
       <div class="list-search-three">
      <span class="pc-button buttonNoback" @click="toinstrumentList('add')"><i class="iconfont icon-jiahao"></i>添加</span>
    <span class="pc-button buttonNoback" @click="openImport"><i class="iconfont icon-shangchuan1"></i>批量导入</span>
    <span class="pc-button buttonNoback" @click="exportFile"><i class="iconfont  icon-shangchuan "></i>导出</span>
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
         <el-table-column prop="" label="状态" width="50"></el-table-column>
         <el-table-column prop="age" label="仪器编号">
                 <template slot="header" slot-scope="scope">
                 <span class="pointer" @click="takeOrder(true)"><span class="gray ">仪器编号</span><i class="iconfont icon-paixu themeColor"></i></span>
                </template>
                <template slot-scope="scope">
                      <span class="themeColor pointer text-line" @click="toinstrumentList('edit',scope.row.id)">{{scope.row.instrumentNo}}</span>
                </template>
        </el-table-column>
        <el-table-column prop="political" label="仪器名称"></el-table-column>
        <el-table-column prop="political" label="使用部门"></el-table-column>
        <el-table-column prop="workingDate" label="仪器分类"></el-table-column>
        <el-table-column prop="" label="操作" align="center">
           <template slot-scope="scope">
            <el-popover trigger="hover" placement="bottom">
              <div class="pointer themeColor weight600 font12">
              <p ><i class="iconfont icon-tubiao09"></i>编辑</p>
              <p ><i class="iconfont icon-tubiao09"></i>停用</p>
              <p ><i class="iconfont icon-chuanyueicon"></i>启用</p>
              <p @click="deleteTrain(scope.row.id)"><i class="iconfont icon-shanchu"></i>报废</p>
              </div>
              <div slot="reference" class="name-wrapper">
               <img src="../../assets/img/threeDot.png" style="width:.03rem" class="pointer"/>
              </div>
            </el-popover>
          </template>
         </el-table-column>
         <el-table-column prop="workingDate" label="查看表格" width="100" ></el-table-column>
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

export default {
  name: "formTemplate",
  data() {
    return {
      statusList: [
        { code: 0, text: "全选" },
        { code: 1, text: "正常使用" },
        { code: 2, text: "停止使用" },
        { code: 3, text: "停用" },
        { code: 4, text: "报废" },
      ],
      departmentList: [{ code: 0, text: "全选" }],
      isOrdinarySearch: true,
      spinning: false,
      isCard: true,
      pageIndex: 1,
      pageSize: 10,
      maxPage: 1,
      totalCount: 0,
       tableData1:[]
    };
  },
  methods: {
    toggleTab() {
      this.$router.push({ path: "templateLibrary" });
    },
    toinstrumentList(status,id) {
        utils.cache.setSession("pageFrom","instrumentList");
        this.$router.push({
          path: 'editInstrument',
          // query: {
          //   flag: status,
          //   id:id||''
          // }
        });
      },
   exportFile(){
        window.open(Global.baseUrl+'/api/Employee/export','_self');
      },
   openImport() {
       this.visible1 = true;
      },
    handleSelectionChange(val) {
        this.multipleSelection = val;
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
    search() {},
    queryInfo() {},
    changePage(val) {
      this.pageIndex = val.pageIndex;
      this.pageSize = val.pageSize;
      this.queryInfo();
    },
  },
};
</script>

<style scoped lang="less">
.tempMain {
  height: 89vh;
  overflow: auto;
}
.list-main {
  //height: 100%;
  border-radius: 5px;
  background: #fff;
  padding: 0.1rem;
  position: relative;
  //overflow: auto;
}
.list-search {
  border: 1px dashed #cccccc;
  border-radius: 5px;
  margin-bottom: 0.1rem;
  padding: 0.05rem;

  &-three {
    text-align: right;
  }
}
/* .list-table{
    height:70vh;
    overflow: auto;
  } */
/*时间控件*/
/deep/.el-table th > .cell {
  padding-left: 5px;
  padding-right: 0;
}
/deep/.el-input__inner {
  height: 0.25rem; /* border: 1px solid #2e6eb4; */
}
/deep/.el-input__icon {
  line-height: 0.25rem;
}
/deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 1.8rem;
  margin: 0.02rem 0.1rem; /* box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.1) */
}
/deep/.el-input--suffix .el-input__inner {
  padding-right: 0;
}

.template_box {
  width: 16%;
  height: 2.6rem;
  margin: 0.1rem 2%;
  background: #fff;
  border: 1px solid #006bd8;
  color: #006bd8;
  border-radius: 20px;
  -webkit-box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  position: relative;
  .template {
    border-radius: 20px;
    overflow: hidden;
    position: absolute;
    top: -1px;
    left: -1px;
    width: 101%;
    height: 101%;
  }
}
.newTemplate {
  border: 1px dashed #006bd8;
}
.new {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.headIcon {
  width: 100%;
  height: 0.4rem;
  line-height: 0.4rem;
  text-indent: 15px;
  background-color: #006bd8;
  color: #fff;
  text-align: left;
}
.formName {
  height: 50px;
  font-size: 0.15rem;
  padding: 0 10px;
  margin-top: 0.12rem;
  white-space: normal;
}
.formIcon {
  position: absolute;
  top: 50%;
  left: 0;
  text-indent: 20px;
}
.formBottom {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  font-size: 12px;
  text-indent: 10px;
  padding: 0 0.05rem;
}
.templateGreen {
  border: 1px solid #62ae56;
  color: #62ae56;
}
.headIconGreen {
  background-color: #62ae56;
}
.templateBlack {
  border: 1px solid #000;
  color: #000;
}
.headIconBlack {
  background-color: #000;
}
.operation {
  cursor: pointer;
  color: #2e6eb4;
  li {
    padding: 0.02rem 0;
    text-align: center;
    font-weight: 600;
  }
}
.templateToggle {
  position: absolute;
  top: 20px;
  left: 20%;
  cursor: pointer;
  & > span:nth-child(1) {
    margin-right: 0.2rem;
  }
  & > span:nth-child(2) {
    color: #0e72d8;
  }
  & > span {
    color: #000;
    font-weight: 600;
  }
}
// .selection-one{
//   border-right: none;
// }
</style>

