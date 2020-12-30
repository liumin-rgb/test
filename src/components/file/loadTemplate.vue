<template>
  <a-modal v-model="visible" title="选择模板" :afterClose="handleCancel">
      <div class="format ">
       <el-table :data="tableData" border height="20vh" style="width:unset" :header-cell-class-name="'table-header'"  @row-click="rowclick">
             <el-table-column width="50">
               <template slot-scope="scope">
                 <i :class="['iconfont', scope.row.selected?'icon-danxuanxuanzhong':'icon-danxuan','themeColor']"></i>
               </template>
             </el-table-column>
             <el-table-column prop="name" label="模板名称" >

             </el-table-column>
       </el-table>
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
  name: 'loadTemplate',
  props:{
    visible:{
      default:false,
      type:Boolean
    }
  },
  data() {
    return {
 loading:false,
 tableData:[
   {name:'模板1',selected:false},
   {name:'模板2',selected:false}
 ],
    }
  },
  watch:{
    visible:function(newVal){
      if(newVal==true){
         //this.searchStaff();
      }
    }
  },
  created(){

  },
  methods:{
    rowclick(obj){
      this.tableData.forEach((item)=>{
        item.selected=false
      })
      obj.selected=true;
    },
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

</style>
