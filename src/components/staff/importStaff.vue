<template>
  <a-modal v-model="visible" title="批量导入" :afterClose="handleCancel" width="60%">
      <div class="format ">
      <div class="format-title">
      <div class=" textInput displayLB"><span class="weight600">上传</span>
       <a-upload
          name="file"
          :customRequest="upload"
          :before-upload="beforeUpload"
          @change="handleChange"
          :fileList="fileList"
          :showUploadList="false"
        >
        <span class="pc-input uploadS displayLB">点击上传<i class="iconfont icon-shangchuan floatR themeColor"></i></span>
         <!-- <a-button>请选择 <a-icon type="upload" /></a-button> -->
        </a-upload>
        </div>
        <div><span class="weight600">所属分院</span><select class="pc-input middleInput" @change="getSelectInfo()" id="orgnize"><option v-for="obj in orgnizeList" :value="obj.id" >{{obj.name}}</option></select></div>
         <div @click="downloadTemplate"><span class="pc-button"><i class="iconfont icon-shangchuan1 "></i>下载模板</span></div>
         </div>
         <div class="tab">
           <a-spin :spinning="spining">
         <el-table
             :data="tableData"
             border
             style="width: 100%"
             height="300"
         		     :header-cell-class-name="'table-header'">
             <el-table-column
               type=""
               label=""
               width="50"
              >
              <template slot-scope="scope"><i class="iconfont icon-shanchu themeColor pointer" @click="deleteErrorInfo(scope.row.id)"></i></template>
             </el-table-column>
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
               <template slot-scope="scope"><input class="borderBlue paddingLR1rem inputStyle"  v-model="scope.row.employeeNo"  ></template>
             </el-table-column>
             <el-table-column
               prop="name"
               label="姓名">
               <template slot-scope="scope"><input class="borderBlue paddingLR1rem inputStyle" v-model="scope.row.name"   ></template>
             </el-table-column>
             <el-table-column
               prop="department"
               label="部门">
               <template slot-scope="scope">
				   <select class="borderBlue paddingLR1rem inputStyle" @change="getSelectInfo1('department',scope.$index)" id="department" v-model="scope.row.department"><option v-for="obj in departmentList" :value="obj.name" >{{obj.name}}</option></select>
				  <!-- <input class="borderBlue paddingLR1rem inputStyle" v-model="scope.row.department||''"> -->
				  </template>
             </el-table-column>
           </el-table>
           </a-spin>
           </div>
      </div>
        <template slot="footer">
               <a-button key="back" @click="handleCancel">
                 取消
               </a-button>
               <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
                 下一步
               </a-button>
        </template>
     </a-modal>
</template>
<script>
 import Global from '../../assets/lib/globalConfig.js'
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
      spining:false,
      loading:false,
      orgnize:'',
      orgnizeList:[],
      tableData:[],
      fileList:[],
	  departmentList:[]
    }
  },
  watch:{
    visible:function(val){
      if(val==true){
        this.queryOrgnize();
      }
    },
	orgnize:function(val){
		this.queryDepartment();
	}
  },
  created(){

  },
  methods:{
    getSelectInfo(){
      this.orgnize=utils.common.getSelectedValue("orgnize");
    },
	getSelectInfo1(id,index){
		this.tableData[index][id]=utils.common.getSelectedValue(id);
	},
  changeValue(id,index,value){
    this.tableData[index][id]=value;
  },
      queryOrgnize(){
          let url = "/api/Organization/branch/list";
          	utils.request.get(url,true).then((res) => {
             if(res){
               if(res.success==true){
                 this.orgnizeList=res.result;
                 this.orgnize=this.orgnizeList[0].id;
                 //this.orgnizeList=orgnizeList.unshift('全部');
               }
             }
           })
      },
	  queryDepartment(){
		      let url = "/api/Employee/template/branch/"+this.orgnize+"/departments";
		      	utils.request.get(url,true).then((res) => {
		         if(res){
		           if(res.success==true){
		             this.departmentList=res.result;
		            // this.orgnize=this.orgnizeList[0].id;
		             //this.orgnizeList=orgnizeList.unshift('全部');
		           }
		         }
		       })

	  },
    downloadTemplate(){
      let url='/api/Employee/template/branch/'+this.orgnize;
      //utils.download.downLoadFile(url,'模板');
      window.open(Global.baseUrl+url,'_self');
    },
    checkInfo(status){
      let orgnize=this.orgnize;
      let url = "/api/Employee/template/branch/"+orgnize+"/misdata";
       this.spining=true;
      	utils.request.get(url).then((res) => {
          this.spining=false;
         if(res){
           if(res.success==true){
             this.tableData=res.result||[];
            // if(status=='update'){
               if(this.tableData.length==0){
                 this.handleCancel();
                   this.$emit("openModel2",{orgnize:orgnize});
               }
           //  }
           }
         }
       })
    },
    deleteErrorInfo(id){
      utils.box.confirm("是否确认删除？").then(()=>{
      			 this.confirmDeleteErrorInfo(id);
      			 });
    },
    confirmDeleteErrorInfo(id){
        let url = "/api/Employee/template/infos/"+id;
         this.spinning=true;
        	utils.request.delete(url,{},true).then((res) => {
           if(res){
             if(res.success==true){
               utils.box.toast('删除成功','success');
               this.checkInfo();
              }else{
                utils.box.toast('删除失败');
              }
           }
         })
    },
    handleOk(){  //更新
    if(this.fileList.length==0){
      utils.box.toast("请上传excel文件");
      return;
    }
      let url = "/api/Employee/template/infos";
      let inputs=this.tableData.map((item)=>{
        return {
              "id":item.id ,
              "name": item.name,
              "employeeNo": item.employeeNo,
              "department": item.department
            }

      });
      let params=inputs;
      this.loading=true;
      	utils.request.put(url,params).then((res) => {
          this.loading=false;
         if(res){
           if(res.success==true){
             //utils.box.toast('删除成功','success');
             this.checkInfo('update');
            /* this.handleCancel();
              this.$emit("openModel2"); */
            }else{
              utils.box.toast('更新失败');
            }
         }
       })
    },
    beforeUpload(file) {
    //  .csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
      const isExcel =file.type==='.csv'||file.type==='application/vnd.ms-excel'||file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isExcel) {
        this.$message.error('只能上传excel表格');
        //this.fileList=[];
      }
      return isExcel ;
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
               //this.tableData=res.result||[];
               this.checkInfo();
               item.onSuccess(res, item.file);
              // this.fileList=[];
     	 			} else {
              // item.onSuccess(res, item.file);
     	 				utils.box.toast(res.error.message);
             // this.fileList=[];
     	 			}
     	 			 }else{
               // item.onSuccess(res, item.file);
               utils.box.toast(res.error.message);
               //this.fileList=[];
             }
     	 		});
    },
    handleChange(info){
      this.fileList=info.fileList;
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
      utils.common.resetData(this);
      this.$emit("closeModel");
    },
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
   /* &>div:nth-child(1){
      flex:1
    }
    &>div:nth-child(2){
      flex:1
    }
    &>div:nth-child(3){
      flex:1
    } */
  }
  }
 .inputStyle{min-width:.2rem;max-width:1rem;}
.uploadS{font-size: .1rem; padding-left:.1rem;line-height: .25rem;}
.tab/deep/.el-table{font-size: .12rem}

</style>
