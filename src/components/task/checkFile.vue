<template>
  <a-modal v-model="visible" :title="title" :afterClose="handleCancel">
    <div class="format ">
      <div class="textInput positionR"><span class="label1">{{label}}:</span>
        <a-tree-select v-model="id" show-search style="width: 50%;margin: .02rem 0.1rem;" :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择" allow-clear tree-default-expand-all :tree-data="treeData">
        </a-tree-select>
        <!-- <input  class='pc-input' @click="showSelect=true" readonly="true" style="width:2rem;"/>
      <div @mouseleave="showSelect=false" class="pc-select selectOne" v-show="showSelect==true">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
       </div> -->

      </div>
      <div><span class="label1 verTop">备注:</span>
        <textarea class='pc-textarea' v-model="suggestion" /></div>
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
  name: 'checkFile',
  props:{
    visible:{
      default:false,
      type:Boolean
    },
    config:{
      default:()=>{},
      type:Object
    },
  },
  data() {
    return {
      title:'通过审核',
      label:'下一节点',
     showSelect:false,
     loading:false,
     suggestion:'',
     treeExpandedKeys: [],
     treeData:[],
     id:''
           }
     },
   watch:{
     visible:function(val){
       if(val==true){
         let type=this.config.operationType;
         let approveResult=this.config.approveResult;
         this.title=approveResult==1?'通过审核':'退回审核'
         this.label=approveResult==1?'下一节点':'退回人'
         //this.title=type==1?'通过审核':type==2?'通过废除':'';
        // this.label=type==1?'下一节点':''
        // this.label=type==3?'下一节点':'';
         this.getTreeMap();
       }
     },
   },
  created(){

  },
  methods:{
    getTreeMap(){
      let url="/api/Document/getEmployeeTreeMap";
      utils.request.get(url).then((res) => {
      	if(res){
          if(res.success==true){
            let treemap=res.result;
            this.treeData=JSON.parse(JSON.stringify(treemap).replace(/name/g,"title").replace(/id/g,"key").replace(/employees/g,"children"));
            console.log(this.treeData);
            this.forTree(this.treeData);

       }else{
         utils.box.toast(res.error.message);
          }
        }
        });
    },
    forTree(treeList){
      for(var i in treeList){
         treeList[i].value=treeList[i].key;
          if(treeList[i].type!=4){
           treeList[i].disabled=true
          }
        if(treeList[i].children){
          this.forTree(treeList[i].children);
        }
      }
    },
    handleNodeClick(data) {
      console.log(data);
    },
    handleCancel(){
      this.$emit("closeModel");
    },
    handleOk(){
      if(this.id==''){
        let message=this.config.operationType==1?"请选择下一节点":'请选择退回人';
         utils.box.toast(message);
        return;
      }
      this.loading=true;
       var url="/api/Task/approveDocVersion";
       var params={
  "docVersionId": this.config.docVersionId,
  "docApproveNoteId": this.config.docApproveNoteId,
  "operationType": this.config.operationType,
  "approveResult": this.config.approveResult,
  "nextEmployeeId": this.id,
  "suggesion": this.suggestion
  }
            utils.request.post(url,params,true).then((res) => {
              this.loading=false;
            	if(res){
                if(res.success==true){
               utils.box.toast('已通过','success');
               //this.$emit("closeModel",true);
             }else{
               utils.box.toast(res.error.message);
                }
              }
              });
    },
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
