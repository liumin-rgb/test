<template>
  <a-modal v-model="visible" :title="title" :afterClose="handleCancel">
      <div class="format ">
       <div class="textInput positionR"><span class="label1">{{label}}:</span>
        <a-tree-select
           v-model="id"
           show-search
           style="width: 50%;margin: .02rem 0.1rem;"
           :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
           placeholder="请选择"
           allow-clear
           tree-default-expand-all
           :tree-data="treeData"
         >
         </a-tree-select>
       <!-- <input  class='pc-input' @click="showSelect=true" readonly="true" style="width:2rem;"/>
      <div @mouseleave="showSelect=false" class="pc-select selectOne" v-show="showSelect==true">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
       </div> -->

       </div>
       <div><span class="label1 verTop">备注:</span>
       <textarea class='pc-textarea' v-model="suggestion"/></div>
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
      title:'提交审核',
      label:'审批人',
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
         this.title=type==1?'提交审核':type==2?'提交废除':'提交传阅';
         this.label=type==3?'传阅人':'审核人';
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
            this.forTree(this.treeData);
             console.log(this.treeData);

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
          }else{
           treeList[i].title=treeList[i].title+'['+treeList[i].employeeNo+']'
           //treeList[i].value=treeList[i].value+'['+treeList[i].employeeNo+']'
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
        let message=this.config.operationType==3?"请选择传阅人":"请选择审批人"
         utils.box.toast(message);
        return;
      }
      this.loading=true;
      if(this.config.ids.length==0){
       var url="/api/Document/submitDocVersion";
       var params={
         "approveEmployeeId": this.id,
         "suggesion": this.suggestion,
       }
       params=Object.assign(params,this.config.params);
      }else{
       var url="/api/Document/operateDocVersion";
       var params={
          "operateType": this.config.operationType,
          "employeeId": this.id,
          "suggestion": this.suggestion,
          "docVersionIds": this.config.ids
       };
      }
            utils.request.post(url,params,true).then((res) => {
              this.loading=false;
            	if(res){
                if(res.success==true){
               utils.box.toast('提交成功','success');
               this.$emit("closeModel",true);
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
