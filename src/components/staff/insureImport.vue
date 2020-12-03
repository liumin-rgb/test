<template>
  <a-modal v-model="visible" title="确认人员信息" :afterClose="handleCancel" :dialogClass="'bigModel'">
      <div class="format ">
        <div>
          <span><span class="label1">姓名：</span><input class="pc-input"/></span>
          <span><span class="label1">工号：</span><input class="pc-input"/></span>
           <span><span class="label1">部门：</span><input class="pc-input"/></span>
        </div>
        <div class="tab">
       <el-table
           :data="tableData"
           border
           style="width: 100%"
       		     :header-cell-class-name="'table-header'">
           <!-- <el-table-column
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
           </el-table-column> -->
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
      type:Boolean,
      tableData:[]
    }
  },
  data() {
    return {

    }
  },
  created(){

  },
  methods:{
    handleCancel(){
      this.$emit("closeModel");
    },
    handleOk(){
    this.handleCancel()
    }


  }
}
</script>

<style lang="less">
  .format{
    padding:0 0.2rem;
    color:#333;
    font-size: .12rem;

  }

.tab/deep/.el-table{font-size: .12rem}

</style>
