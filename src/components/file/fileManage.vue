<template>
  <div class="list-main">
  <div class="list-main-top">
    <span class="backButton" @click="goBack"><i class="iconfont icon-fanhui"></i><span>返回上一级</span></span>
    <div>
      <span class="pc-button"><i class="iconfont icon-baocun"></i>保存草稿</span>
       <span class="pc-button" @click="openCheck"><i class="iconfont icon-tijiao"></i>提交审核</span>
      </div>
  </div>
  <div class="list-main-body">
    <div class="list-head" @click="toggle=!toggle">
      <div><i class="iconfont icon-jiantou themeColor" v-show="toggle==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle==false"></i>基本信息</div>
      <div>
        <span class="marginR2VW">文件目录：问卷11</span>
        <span>申请人：1-R</span>
        </div>
      </div>
      <transition name="t1">
      <div v-show="toggle==true">
     <div class="flexBtw">
       <div><span>上传文件：</span>
       <a-upload
    name="file"
    :multiple="true"
    action=""
    :headers="headers"
    @change="handleChange"
  >
    <a-button> <span>点击上传 </span><i class="iconfont icon-shangchuan themeColor " style="margin-left:2vw"></i> </a-button>
  </a-upload></div>
       <div>
         <span class="themeColor marginR1VW">当前文件导入格式：文件名称_文件编号_版本号</span>
         <span class="pc-button" @click="visible=true"><i class="iconfont icon-zidingyi"></i>格式自定义</span>
       </div>
     </div>
    <div class="marginT1VH">
      <el-table
          :data="tableData"
          border
          style="width: 100%"
          height="350"
		     :header-cell-class-name="'table-header'">
          <el-table-column
            prop=""
            label="文档名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop=""
            label="文档编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop=""
            label="版本号">
          </el-table-column>
          <el-table-column
            prop=""
            label="文档类型">
          </el-table-column>
          <el-table-column
            prop=""
            label="操作">
          </el-table-column>
        </el-table>
    </div>
    </div>
    </transition>
  </div>
   <formatFileName  :visible="visible" @closeModel="closeModel"/>
   <CheckFile :visible="visible1" :config="config" @closeModel="closeModel"/>
  </div>
</template>

<script>
  import formatFileName from './formatFileName'
   import CheckFile from './checkFile'
  export default {
    name: 'fileManage',
    components:{formatFileName,CheckFile},
    data() {
      return{
        visible:false,
        visible1:false,
        toggle:true,
        config:{
         title:'提交审核',
         label:'审批人',
        },
        tableData: [

        ]
      }
    },
    methods:{
      openCheck(){
        this.visible1=true;
      },

      closeModel(){
        this.visible=false;
        this.visible1=false;
      },
      goBack(){
        this.$router.go(-1);
      },


    }
  };

</script>

<style lang="less" scoped>
  .list-main{
    height:100%;
    //background:#fff;
/*    display: flex;
    display: -webkit-flex; */
    border-radius: 5px;
    background:#fff;
    padding:.1rem;
    &-top{
      width:100%;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;

    }
    &-body{
      width:100%;
      margin-top:.2rem;
    }
  }


</style>
