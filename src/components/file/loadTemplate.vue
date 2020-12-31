<template>
  <a-modal v-model="visible" title="选择模板" :afterClose="handleCancel">
      <div class="format ">
       <el-table :data="tableData" border height="50vh" style="width:unset" :header-cell-class-name="'table-header'"  @row-click="rowclick">
             <el-table-column width="50">
               <template slot-scope="scope">
                 <i :class="['iconfont', scope.row.selected==true?'icon-danxuanxuanzhong':'icon-danxuan','themeColor']"></i>
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
 tableData:[],
    }
  },
  watch:{
    visible:function(newVal){
      if(newVal==true){
         //this.searchStaff();
         this.searchTemplate()
      }
    }
  },
  created(){

  },
  methods:{
    searchTemplate(){
        let url = "/api/Document/getDocTemplates";
        utils.request.get(url, {}, true).then((res) => {
          if (res) {
            if (res.success == true) {
              this.tableData=res.result;
            } else {
              utils.box.toast(res.error.message);
            }
          }
        });

    },
    rowclick(obj){
      this.tableData.forEach((item)=>{
        this.$set(item,"selected",false);
        //item.selected=false
      })
      this.$set(obj,"selected",true);
    },
    handleCancel(){
      this.$emit("closeModel");
    },
    handleOk(){
      let selectedObj;
     for(var i in this.tableData){
       if(this.tableData[i].selected==true){
         selectedObj=this.tableData[i];
       }
     }
     if(selectedObj==undefined){
       utils.box.toast("请勾选模板");
       return;
     }
    this.$emit("closeModel",selectedObj)
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
