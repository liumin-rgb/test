<template>
  <div class="list-main">
   <div class="list-search" ref="search">
         <div class="flexWrap">
           <span>
            <select class="pc-input middInput"  ><option v-for="obj in statusList" :value="obj.code" >{{obj.text}}</option></select>
           </span>
           <span><input class="pc-input middInput" placeholder="表单模板名称"/></span>
           <span v-show="!isOrdinarySearch"><input class="pc-input middInput" placeholder="表单模板编码"/></span>
           <span v-show="!isOrdinarySearch"><input class="pc-input middInput" placeholder="版本号"/></span>
           <span v-show="!isOrdinarySearch">
           <select class="pc-input middInput"  v-show="!isOrdinarySearch"><option v-for="obj in departmentList" :value="obj.code" >{{obj.text}}</option></select>
           </span>
           <span v-show="!isOrdinarySearch"><el-date-picker  value-format="yyyy-MM-dd" type="date" placeholder="创建日期-起始时间" ></el-date-picker>
              -
           <el-date-picker  value-format="yyyy-MM-dd"  type="date" placeholder="创建日期-终止时间"></el-date-picker>
          </span>
             <span class="backButton" @click="isOrdinarySearch=isOrdinarySearch==true?false:true"><i class="iconfont icon-zhuanhuan1"></i>
             <span class="weight600">{{isOrdinarySearch==false?'普通搜索':'高级搜索'}}</span>
            </span>
             <span class="pc-button" @click="search"><i class="iconfont icon-sousuo"></i>搜索</span>
         </div>
         <div class="list-search-three">
           <span class="pc-button buttonNoback"><i class="iconfont icon-shangchuan1 "></i>权限配置</span>
           <span class="pc-button buttonNoback"><i class="iconfont icon-tijiao "></i>发布</span>
           <span class="pc-button buttonNoback"><i class="iconfont icon-1-icon-print"></i>打印</span>
           <span class="pc-button buttonNoback"><i class="iconfont icon-shangchuan"></i>导入</span>
            <span class="pc-button buttonNoback"><i class="iconfont icon-shangchuan1"></i>导出</span>
            <span class="pc-button buttonNoback" @click="isCard=isCard==true?false:true"><i class="iconfont icon-zhuanhuan1" ></i>切换视图</span>
         </div>
       </div>
       <div class="list-table">
          <a-spin :spinning="spinning">
            <div v-show="isCard==true" class="flex flexWrap">
             <div class="template_box newTemplate">
              <span class="new"><i class="iconfont icon-jiahao font30 " style="color:#006bd8"></i></span>
             </div>
             <div class="template_box">
               <div class="template">
              <div class="headIcon">[草稿]</div>
              <p class="formName">副本-培训实施记录（自增功能应用演示）</p>
              <p class="formIcon"><i class="iconfont icon-1-icon-table font30"></i></p>
              <div class="formBottom flexBtw">
                <span></span>
               <el-popover trigger="hover" placement="top">
                 <ul class="operation">
                  <li>预览</li>
                  <li>编辑</li>
                  <li>复制</li>
                  <li>打印</li>
                  <li>发布</li>
                  <li>删除</li>
                  <li>权限配置</li>
                  <li>历史版本</li>
                  </ul>
                 <span slot="reference" class="name-wrapper"><i class="iconfont icon-1-icon-function"></i></span>
                </el-popover>
              </div>
              </div>
             </div>
             <div class="template_box templateGreen">
               <div class="template">
              <div class="headIcon headIconGreen">[已发布]</div>
              <p class="formName">副本-培训实施记录（自增功能应用演示）</p>
              <p class="formIcon"><i class="iconfont icon-1-icon-table font30"></i></p>
              <div class="formBottom flexBtw">
                <span></span>
                <span><i class="iconfont icon-1-icon-function"></i></span>
              </div>
              </div>
             </div>
             <div class="template_box templateBlack">
               <div class="template">
              <div class="headIcon headIconBlack">[已废除]</div>
              <p class="formName">副本-培训实施记录（自增功能应用演示）</p>
              <p class="formIcon"><i class="iconfont icon-1-icon-table font30"></i></p>
              <div class="formBottom flexBtw">
                <span></span>
                <span><i class="iconfont icon-1-icon-function"></i></span>
              </div>
              </div>
             </div>
            <div class="template_box">
              <div class="template">
             <div class="headIcon">[草稿]</div>
             <p class="formName">副本-培训实施记录（自增功能应用演示）</p>
             <p class="formIcon"><i class="iconfont icon-1-icon-table font30"></i></p>
             <div class="formBottom flexBtw">
               <span></span>
               <span><i class="iconfont icon-1-icon-function"></i></span>
             </div>
             </div>
            </div>
            <div class="template_box">
              <div class="template">
             <div class="headIcon">[草稿]</div>
             <p class="formName">副本-培训实施记录（自增功能应用演示）</p>
             <p class="formIcon"><i class="iconfont icon-1-icon-table font30"></i></p>
             <div class="formBottom flexBtw">
               <span></span>
               <span><i class="iconfont icon-1-icon-function"></i></span>
             </div>
             </div>
            </div>
             </div>
            <div v-show="isCard==false">
 <el-table :data="tableData" border height="380" style="width: 100%" stripe @selection-change="handleSelectionChange"
   :header-cell-class-name="'table-header'">
   <el-table-column type="selection"></el-table-column>
   <el-table-column prop="name" label="表单模板名称" >

   </el-table-column>
   <el-table-column prop="name" label="编码" >

   </el-table-column>
   <el-table-column prop="name" label="版本号" >

   </el-table-column>
   <el-table-column prop="name" label="关联部门" >

   </el-table-column>
   <el-table-column prop="name" label="状态" >

   </el-table-column>
   <el-table-column prop="name" label="是否存在废除流程">

   </el-table-column>
   <el-table-column prop="name" label="创建日期" >

   </el-table-column>
   <el-table-column prop="" label="操作" align="center">
     <template slot-scope="scope">
       <el-popover trigger="hover" placement="bottom">
         <ul class="operation">
          <li>预览</li>
          <li>编辑</li>
          <li>复制</li>
          <li>打印</li>
          <li>发布</li>
          <li>删除</li>
          <li>权限配置</li>
          <li>历史版本</li>
          </ul>
         <div slot="reference" class="name-wrapper">
           <img src="../../assets/img/threeDot.png" style="width:.03rem" class="pointer" />
         </div>
       </el-popover>
     </template>
   </el-table-column>
   </el-table>
            </div>
          </a-spin>
       </div>
       <div class="list-bottom" v-show="isCard==false">
         <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
       </div>
  </div>
</template>

<script>
export default{
  name:'formTemplate',
  data(){
    return{
    statusList:[{code:0,text:'所有'},{code:1,text:'草稿'},{code:2,text:'审核中'},{code:3,text:'审核通过尚未生效'},{code:4,text:'已发布'}],
    departmentList:[{code:0,text:'无'}],
    isOrdinarySearch:true,
    spinning:false,
    isCard:true,
    pageIndex: 1,
    pageSize:10,
    maxPage: 1,
    totalCount:0,
    tableData:[]
    }
  },
  methods:{
 search(){

 },
 queryInfo(){

 },
 changePage(val){
   this.pageIndex=val.pageIndex;
   this.pageSize=val.pageSize;
   this.queryInfo();
 },
  }
}
</script>

<style scoped lang="less">
 .list-main {
    height: 100%;
    border-radius: 5px;
    background: #fff;
    padding: .1rem;
    position: relative;
    overflow: auto;
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
 /* .list-table{
    height:70vh;
    overflow: auto;
  } */
  /*时间控件*/
   /deep/.el-table th>.cell{padding-left:5px;padding-right:0;}
   /deep/.el-input__inner{height:.25rem;/* border: 1px solid #2e6eb4; */}
   /deep/.el-input__icon{line-height: .25rem;}
   /deep/.el-date-editor.el-input, .el-date-editor.el-input__inner{width:1.8rem;margin: .02rem 0.1rem;/* box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.1) */}
   /deep/.el-input--suffix .el-input__inner{padding-right:0}


.template_box{
      width:16%;
      height:2.6rem;
      margin:.1rem 2%;
      background: #fff;
      border: 1px solid #006bd8;
      color: #006bd8;
      border-radius: 20px;
      -webkit-box-shadow: 0 3px 6px 0 rgba(0,0,0,.16);
      box-shadow: 0 3px 6px 0 rgba(0,0,0,.16);
      position: relative;
   .template{
    border-radius: 20px;
    overflow: hidden;
    position: absolute;
    top: -1px;
    left:-1px;
    width:101%;
    height:101%
   }
}
 .newTemplate{
       border:1px dashed #006bd8;
      }
  .new{
       position: absolute;
       top: 50%;
       left: 50%;
       -webkit-transform: translate(-50%,-50%);
       transform: translate(-50%,-50%);
  }
  .headIcon{
    width:100%;
    height: .4rem;
    line-height: .4rem;
    text-indent: 15px;
    background-color: #006bd8;
    color: #fff;
    text-align: left;
  }
  .formName{
        height: 50px;
        font-size: .15rem;
        padding: 0 10px;
        margin-top: .12rem;
        white-space: normal;
  }
  .formIcon{
    position: absolute;
        top: 50%;
        left: 0;
        text-indent: 20px;
  }
  .formBottom{
        position: absolute;
        bottom: 10px;
        left: 0;
        width: 100%;
        font-size: 12px;
        text-indent: 10px;
        padding:0 .05rem;
  }
  .templateGreen{
    border: 1px solid #62ae56;
    color: #62ae56;
  }
  .headIconGreen{
      background-color: #62ae56;
  }
  .templateBlack{
    border: 1px solid #000;
    color: #000;
  }
  .headIconBlack{
      background-color: #000;
  }
  .operation{
    cursor: pointer;
    color:#2e6eb4;
    li{
      padding:.02rem 0;
      text-align: center;
      font-weight: 600;
    }
  }
</style>
