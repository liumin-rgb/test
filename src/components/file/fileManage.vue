<template>
  <div class="list-main">
  <div class="list-main-top">
    <span class="backButton" @click="goBack"><i class="iconfont icon-fanhui"></i><span>返回上一级</span></span>
    <div>
      <!-- <span class="pc-button"><i class="iconfont icon-baocun"></i>保存草稿</span> -->
       <span class="pc-button" @click="openCheck"><i class="iconfont icon-tijiao"></i>提交审核</span>
      </div>
  </div>
  <div class="list-main-body">
    <div class="list-head">
      <div><i class="iconfont icon-jiantou themeColor"></i>基本信息</div>
      <div>
        <span class="marginR2VW">文件目录：文件0-1</span>
       <!-- <span>申请人：1-R</span> -->
        </div>
      </div>
      <div >
     <div class="flexBtw">
       <div><span>上传文件：</span>
       <a-upload
    name="file"
    :multiple="true"
   :show-upload-list="false"
    :customRequest="upload"
   :before-upload="beforeUpload"
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
            <template slot-scope="scope">
                      <i class="iconfont icon-yulan themeColor" @click="reviewFile"></i>
                       <i class="iconfont icon-tubiao09 themeColor" @click="editFile"></i>
                        <i class="iconfont icon-shanchu themeColor" @click="deleteFile"></i>
                  </template>
          </el-table-column>
        </el-table>
      <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
    </div>
    </div>
  </div>
   <formatFileName  :visible="visible" @closeModel="closeModel"/>
   <CheckFile :visible="visible1" :config="config" @closeModel="closeModel"/>
  </div>
</template>

<script>
  import formatFileName from './formatFileName'
   import CheckFile from './checkFile'
   import Pagination from '../Pagination'
  export default {
    name: 'fileManage',
    components:{formatFileName,CheckFile,Pagination},
    data() {
      return{
        visible:false,
        visible1:false,
        toggle:true,
        pageIndex: 1,
        pageSize:10,
        maxPage: 1,
        totalCount:0,
        config:{
         title:'提交审核',
         label:'审批人',
        },
        tableData: [

        ]
      }
    },
    methods:{
      handleChange(info) {
            if (info.file.status === 'uploading') {
              this.loading = true;
              return;
            }
            if (info.file.status === 'done') {
              // Get this url from response in real world.
              getBase64(info.file.originFileObj, imageUrl => {
                this.imageUrl = imageUrl;
                this.loading = false;
              });
            }
          },
          beforeUpload(file) {
            const isPDF= file.type==='application/pdf';
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            const isHTMl=file.type==='text/html'
            if (!isPDF&&!isJpgOrPng&&!isHTMl) {
              this.$message.error('只能上传PDF、图片或html文件');
            }
          },
          upload(item){
           	 		let url = "/api/Employee/uploadAttachment?type=1";
           			 const form = new FormData();
           			   // 文件对象
           			  form.append("file", item.file);
           			  // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
           			// form.append("clientType", 'xxx');
           	 		utils.request.post(url,form,{headers: {"content-type": "multipart/form-data"}}).then((res) => {
           	 			this.loading=false;
                  if(res){
           	 			if (res.success == true) {

           	 			} else {
                   //  item.onSuccess(res, item.file);
           	 				utils.box.toast("上传失败");
           	 			}
           	 			 }else{
                    //  item.onSuccess(res, item.file);
                     utils.box.toast("上传失败");
                   }
           	 		});
          },

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
