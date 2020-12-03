<template>
  <a-modal v-model="visible" title="批量导入" :afterClose="handleCancel">
      <div class="format ">
      <div class="format-title">
      <div class=" textInput displayLB"><span class="weight600">上传</span>
       <a-upload
          name="file"
          :multiple="true"
          action=""
          :headers="headers"
          @change="handleChange"
        >
        <span class="pc-input uploadS displayLB">请选择<i class="iconfont icon-jurassic_upload-content floatR"></i></span>
         <!-- <a-button>请选择 <a-icon type="upload" /></a-button> -->
        </a-upload>
        </div>
         <div><span class="pc-button">下载模板</span></div>
         </div>
         <div class="tab">
         <el-table
             :data="tableData"
             border
             style="width: 100%"
         		     :header-cell-class-name="'table-header'">
             <el-table-column
               prop=""
               label="序号"
              >
             </el-table-column>
             <el-table-column
               prop=""
               label="错误消息"
               >
             </el-table-column>
             <el-table-column
               prop=""
               label="工号">
             </el-table-column>
             <el-table-column
               prop=""
               label="姓名">
             </el-table-column>
             <el-table-column
               prop=""
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

.uploadS{width:3.5rem;font-size: .1rem; padding-left:.1rem;line-height: .25rem;}
.tab/deep/.el-table{font-size: .12rem}

</style>
