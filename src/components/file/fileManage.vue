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
      <div>
        <div class="flexBtw">
          <div><span>上传文件：</span>
            <a-upload name="file" :multiple="true" :show-upload-list="false" :customRequest="upload" :before-upload="beforeUpload"
              @change="handleChange">
              <a-button> <span>点击上传 </span><i class="iconfont icon-shangchuan themeColor " style="margin-left:2vw"></i>
              </a-button>
            </a-upload>
          </div>
          <div>
            <span class="themeColor marginR1VW">当前文件导入格式：{{format}}</span>
            <span class="pc-button" @click="visible=true"><i class="iconfont icon-zidingyi"></i>格式自定义</span>
          </div>
        </div>
        <div class="marginT1VH">
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
                <i class="iconfont icon-yulan themeColor font16" @click="reviewFile(scope.row.id)" v-if="scope.row.type==3||scope.row.type==4"></i>
                <i class="iconfont icon-tubiao09 themeColor font16" @click="editFile(scope.row.id)" v-if="scope.row.type==1"></i>
                <i class="iconfont icon-shanchu themeColor font16" @click="deleteFile(scope.row.id)"></i>
              </template>
            </el-table-column>
          </el-table>
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
        config: {
          title: '提交审核',
          label: '审批人',
        },
        tableData: [{
            id: '1',
            name: '文件1',
            docNo: '12',
            version: '12.2',
            type: '3',
          },
          {
            id: '2',
            name: '文件2',
            docNo: '12',
            version: '12.2',
            type: '1',
          }
        ],
        typeList: ['HTML', '视频', 'PDF', '图片'],
      }
    },
    methods: {
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
      beforeUpload(file) {
        const isPDF = file.type === 'application/pdf';
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const isHTMl = file.type === 'text/html'
        if (!isPDF && !isJpgOrPng && !isHTMl) {
          this.$message.error('只能上传PDF、图片或html文件');
        }
      },
      upload(item) {
        let url = "/api/Employee/uploadAttachment?type=1";
        const form = new FormData();
        // 文件对象
        form.append("file", item.file);
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

            } else {
              //  item.onSuccess(res, item.file);
              utils.box.toast("上传失败");
            }
          } else {
            //  item.onSuccess(res, item.file);
            utils.box.toast("上传失败");
          }
        });
      },
    /*  queryFormat() {
        let url = "/api/Document/getFileFormat?id="+'';
        utils.request.get(url).then((res) => {
          if (res) {
            if (res.success == true) {

            }
          }
        });
      }, */
      openCheck() {
        this.visible1 = true;
      },
     closeModel(val) {
       this.visible = false;
       if(val){
         this.format=val;
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
