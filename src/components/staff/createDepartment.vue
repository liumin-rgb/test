<template>
  <a-modal v-model="visible" title="添加下属组织机构" :afterClose="handleCancel">
      <div class="format ">
     <div> <span><span class="label1"><span class="icon-xing">*</span>名称：</span><input class="pc-input bigInput" v-model.trim="name"/></span></div>
     <div class="marginT2VH"> <span><span class="label1">
	 <span class="icon-xing">*</span>类型：</span>
	 <a-radio-group name="radioGroup" :default-value="2" @change="getRadioValue($event,'type')"><a-radio :value="2"> 组织架构</a-radio><a-radio :value="3"> 岗位</a-radio></a-radio-group>
     </span></div>
     <div class="marginT2VH flex ">
       <span class="label1">权限：</span>
       <span class="marginL1Rem"><a-checkbox-group @change="onChange">
           <a-row>
             <a-col :span="6"><a-checkbox value="A">A</a-checkbox></a-col>
             <a-col :span="6"><a-checkbox value="B">A</a-checkbox></a-col>
             <a-col :span="6"><a-checkbox value="C">A</a-checkbox></a-col>
            <a-col  :span="6"><a-checkbox value="A">A</a-checkbox></a-col>
            <a-col :span="6"><a-checkbox value="A">A</a-checkbox></a-col>
            <a-col :span="6"><a-checkbox value="A">A</a-checkbox></a-col>
           </a-row>
         </a-checkbox-group>
         </span>
     </div>
	 <div class="marginT2VH"> <span><span class="label1 verTop">描述：</span><textarea class='pc-textarea textareaOne flex1' v-model.trim="remark"/></span></div>
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
  name: 'createDepartment',
  props:{
    visible:{
      default:false,
      type:Boolean
    },
    parentId:{
      default:'',
      type:String
    }
  },
  data() {
    return {
      loading:false,
      name:'',
      type:'2',
      remark:'',
    }
  },
  watch:{
    visible:function(val){
      if(val==true){
      //  this.queryPermission();
      }
    }
  },
  created(){

  },
  methods:{
   getRadioValue(e,id){
     this.type=e.target.value;
   },
    queryPermission(){
           let url="GET /api/Organization/organization/"+this.parentId+"/permission";
           utils.request.get(url,true).then((res) => {
             if(res){
              if(res.success==true){
               let data=res.result;
               this.treeData=data.map((item)=>{
                 return{
                   title: item.name,
                   key: item.id,
                   parentId:item.parentId, //0代表分院
                   isLeaf: !item.haveChildren,
                   type:item.type
                 }
               });
              }else{
                utils.box.toast(res.error.message);
              }
             }
             })

    },
    handleCancel(){
      this.$emit("closeModel");
    },
    handleOk(){
    //this.handleCancel()
    if(this.name==''){
      utils.box.toast("名称不能为空！");
      return;
    }
    this.$emit("closeModel",{parentId:this.parentId,name:this.name,type:this.type,remark:this.remark});
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
