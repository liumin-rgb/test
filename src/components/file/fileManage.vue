<template>
  <div class="list-main">
    <div class="list-main-top">
      <span class="backButton" @click="goBack"><i class="iconfont icon-fanhui"></i><span>返回上一级</span></span>
      <div>
        <!-- <span class="pc-button"><i class="iconfont icon-baocun"></i>保存草稿</span> -->
        <span class="pc-button" @click="openCheck"><i class="iconfont icon-tijiao"></i>提交审核</span>
        <span class="pc-button" @click="enable"><i class="iconfont icon-tongguo1"></i>生效</span>

      </div>
    </div>
    <div class="list-main-body">
      <div class="list-head">
        <div><i class="iconfont icon-jiantou themeColor"></i>基本信息</div>
        <div>
          <span class="marginR2VW">文件目录：{{folderName}}</span>
          <!-- <span>申请人：1-R</span> -->
        </div>
      </div>
      <div>
        <div class="flexBtw">
          <div><span>上传文件：</span>
            <a-upload name="file" :multiple="true" :show-upload-list="false" :before-upload="beforeUpload"
               :customRequest="upload"
               @change="handleChange">
             <!--  :customRequest="upload" -->
              <a-button > <span>点击上传 </span><i class="iconfont icon-shangchuan themeColor " style="margin-left:2vw"></i>
              </a-button>
            </a-upload>
          </div>
          <div>
            <span class="themeColor marginR1VW">当前文件导入格式：{{format}}</span>
            <span class="pc-button" @click="visible=true"><i class="iconfont icon-zidingyi"></i>格式自定义</span>
          </div>
        </div>
        <div class="marginT1VH">
          <a-spin :spinning="spinning"  >
          <el-table :data="tableData" border style="width: 100%" height="350" :header-cell-class-name="'table-header'">
            <el-table-column prop="name" label="文档名称" width="180">
            </el-table-column>
            <el-table-column prop="docNo" label="文档编号" width="180">
            </el-table-column>
            <el-table-column prop="version" label="版本号">
            </el-table-column>
            <el-table-column prop="type" label="文档类型">
              <template slot-scope="scope">
                <span>{{typeList[+scope.row.type-1]}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
                <i class="iconfont icon-yulan themeColor font16 pointer" @click="reviewFile(scope.row.url,scope.row.type)" v-if="scope.row.type==3||scope.row.type==4"></i>
                <i class="iconfont icon-tubiao09 themeColor font16 pointer" @click="editFile(scope.row.id)" v-if="scope.row.type==1"></i>
                <i class="iconfont icon-shanchu themeColor font16 pointer" @click="deleteFile(scope.row.id)"></i>
              </template>
            </el-table-column>
          </el-table>
          </a-spin>
          <Pagination :maxPage="maxPage" @changePage="changePage" :totalCount="totalCount" />
        </div>
      </div>
    </div>
    <formatFileName :visible="visible" @closeModel="closeModel" />
    <CheckFile :visible="visible1" :config="config" @closeModel="closeModel1" />
  </div>
</template>

<script>
  import formatFileName from './formatFileName'
  import CheckFile from './checkFile'
  import Pagination from '../Pagination'
  export default {
    name: 'fileManage',
    components: {
      formatFileName,
      CheckFile,
      Pagination
    },
    data() {
      return {
        visible: false,
        visible1: false,
        toggle: true,
        pageIndex: 1,
        pageSize: 10,
        maxPage: 1,
        totalCount: 0,
        format:'文件名称_文件编号_版本号',
        folderId:0,
        folderName:'',
        fileFormatId:0,
        ids:[],
        fileList:[],
        spinning:false,
        config: {
        operationType:1, //1：审核 2：废除 3：传阅
        ids:[]
        },
        tableData: [],
        typeList: ['HTML', '视频', 'PDF', '图片'],
      }
    },
    created(){
      this.folderId=utils.cache.getSession("folderId")||0;
      this.folderName=utils.cache.getSession("folderName")||'';
    },
    methods: {
      reviewFile(url,type){
       // window.location.href=url;
      // window.open(url);
      if(type==4||type==1){
        window.open(url);
      }else if(type==3){
        utils.cache.setSession('pdfurl',url);
      //  this.$router.push({path:'viewPDF'});
        const {href} = this.$router.resolve({
        	path: 'viewPDF'
        });
        window.open(href, '_blank')
      }

      },
		enable(){
			if(this.ids.length==0){
			  utils.box.toast("请上传文件");
			  return;
			}
			  let url = "/api/Document/enableDocVersions";
			  let params = this.ids
			  utils.request.post(url, params, true).then((res) => {
			    if (res) {
			      if (res.success == true) {
			        utils.box.toast("已生效");
			      } else {
			        utils.box.toast(res.error.message);
			      }
			    }
			  });

		},
      editFile(id) {
        this.$router.push({
          path: 'editHtml',
          query: {
            id: id
          }
        });
      },
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
      beforeUpload(file,fileList) {
       // for(var i in fileList){
       //   let file=fileList[i];
          const isPDF = file.type === 'application/pdf';
          const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
          const isHTMl = file.type === 'text/html'
          if (!isPDF && !isJpgOrPng && !isHTMl) {
            this.$message.error('只能上传PDF、图片或html文件');
            return false;
           // break;
          }
     //   }
        this.fileList=fileList;
       return true;
      // this.upload(fileList);
      },
      upload(item) {
        let fileList=this.fileList;
        if(fileList.length==0) return;
        let url = "/api/Document/batchUpload?floderId="+this.folderId+"&fileFormatId="+this.fileFormatId;
        const form = new FormData();
        // 文件对象
        /* for(var item of fileList){
           form.append("file", item);
        } */
        form.append("file", item.file);
        console.log(form);
        // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
        // form.append("clientType", 'xxx');
        utils.request.post(url, form, {
          headers: {
            "content-type": "multipart/form-data"
          }
        }).then((res) => {
          this.loading = false;
          if (res) {
            if (res.success == true) {
           // utils.box.toast("上传成功","success");
            this.ids=this.ids.concat(res.result);
            this.queryInfo();
            } else {
              //  item.onSuccess(res, item.file);
              utils.box.toast(res.error.message);
            }
          } else {
            //  item.onSuccess(res, item.file);
            utils.box.toast(res.error.message);
          }
        });
      },
     queryInfo() {
        let url = "/api/Document/searchBatchUpload";
        let params={
       "docVersionIds": this.ids,
       "pageIndex": this.pageIndex,
       "pageSize": this.pageSize
        }
        this.spinning=true;
        utils.request.post(url,params).then((res) => {
          this.spinning=false
          if (res) {
            if (res.success == true) {
                let totalCount=res.result.totalCount;
                 this.totalCount=totalCount;
                 this.maxPage=Math.ceil(totalCount/this.pageSize);
                let items=res.result.items;
                 this.tableData=items;

            }
          }
        });
      },
      deleteFile(id){
          		  utils.box.confirm("是否确认删除文件？").then(()=>{
          		  	let url = "/api/Document/DeleteDocVersion?docVersionId="+id;
          		  	utils.request.delete(url).then((res) => {
          		  	  if (res) {
          		  	    if (res.success == true) {
                        utils.box.toast("删除成功",'success');
                        let index1=this.tableData.findIndex((item)=>{return item.id==id});
                        let index2=this.ids.findIndex((item)=>{return item==id});
                        this.tableData.splice(index1,1);
                        this.ids.splice(index2,1);
                      }else{
                         utils.box.toast("删除失败");
                      }
          		  	  }
          		  	});
          		  			 });
      },
      openCheck() {
        if(this.ids.length==0){
          utils.box.toast("请上传文件");
          return;
        }
        this.visible1 = true;
        this.config.ids=this.ids;
      },
      changePage(val){
        this.pageIndex=val.pageIndex;
        this.pageSize=val.pageSize;
        this.queryInfo();
      },
     closeModel(val) {
       this.visible = false;
       if(val){
         this.format=val.format;
         this.fileFormatId=val.id
       }
     },
      closeModel1() {
        this.visible1 = false;
      },
      goBack() {
        this.$router.go(-1);
      },


    }
  };
</script>

<style lang="less" scoped>
  .list-main {
    height: 100%;
    //background:#fff;
    /*    display: flex;
    display: -webkit-flex; */
    border-radius: 5px;
    background: #fff;
    padding: .1rem;

    &-top {
      width: 100%;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;

    }

    &-body {
      width: 100%;
      margin-top: .2rem;
    }
  }

  .uploadS {
    font-size: 0.1rem;
    padding-left: 0.1rem;
    line-height: 0.25rem;
  }
</style>
