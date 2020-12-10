<template>
  <a-modal v-model="visible" title="批量导入" :afterClose="handleCancel">
      <div class="format ">
      <div class="format-title">
      <div class=" textInput displayLB"><span class="weight600">上传</span>
       <a-upload
          name="file"
          :multiple="true"
          :headers="headers"
           :customRequest="upload"
          @change="handleChange"

        >
        <span class="pc-input uploadS displayLB">请选择<i class="iconfont icon-jurassic_upload-content floatR"></i></span>
         <!-- <a-button>请选择 <a-icon type="upload" /></a-button> -->
        </a-upload>
        </div>
         <div @click="downloadTemplate"><span class="pc-button">下载模板</span></div>
         </div>
         <div class="tab">
         <el-table
             :data="tableData"
             border
             style="width: 100%"
             height="300"
         		     :header-cell-class-name="'table-header'">
             <el-table-column
               type="index"
               label="序号"
              >
             </el-table-column>
             <el-table-column
               prop="message"
               label="错误消息"
               >
               <template slot-scope="scope"><span style="color:#af1e2b">{{scope.row.message}}</span></template>
             </el-table-column>
             <el-table-column
               prop="employeeNo"
               label="工号">
             </el-table-column>
             <el-table-column
               prop=""
               label="姓名">
             </el-table-column>
             <el-table-column
               prop="department"
               label="部门">
             </el-table-column>
           </el-table>
           </div>
      </div>
        <template slot="footer">
               <a-button key="back" @click="handleCancel">
                 取消
               </a-button>
               <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
                 提交
               </a-button>
        </template>
     </a-modal>
</template>
<script>
export default {
  name: '',
  props:{
    visible:{
      default:false,
      type:Boolean
    }
  },
  data() {
    return {
  tableData:[]
    }
  },
  created(){

  },
  methods:{

    downloadTemplate(){
      let url='/api/Employee/template';
      utils.download(url,'模板');
    },
    upload(item){
     	 		let url = "/api/Employee/template";
     			 const form = new FormData();
     			   // 文件对象
     			  form.append("file", item.file);
     			  // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
     			// form.append("clientType", 'xxx');
     	 		utils.request.post(url,form,{headers: {"content-type": "multipart/form-data"}}).then((res) => {
     	 			if(res){
     	 			if (res.success == true) {
               this.tableData=res.result||[];
               item.onSuccess(res, item.file);
     	 			} else {
               item.onSuccess(res, item.file);
     	 				utils.box.toast("上传失败");
     	 			}
     	 			 }else{
                item.onSuccess(res, item.file);
               utils.box.toast("上传失败");
             }
     	 		});
    },
    handleChange(info){
       if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
              utils.box.toast("上传成功","success");
            } else if (info.file.status === 'error') {
              utils.box.toast("上传失败");
            }
          },
    handleCancel(){
      this.$emit("closeModel");
    },
    handleOk(){
    this.handleCancel();
     this.$emit("openModel2");
    }


  }
}
</script>

<style lang="less">
  .format{
    padding:0 0.1rem;
    color:#333;
    font-size: .12rem;
  &-title{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    &>div:nth-child(1){
      flex:1
    }
  }
  }

.uploadS{width:3rem;font-size: .1rem; padding-left:.1rem;line-height: .25rem;}
.tab/deep/.el-table{font-size: .12rem}

</style>
