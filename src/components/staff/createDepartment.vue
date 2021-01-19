<template>
  <a-modal v-model="visible" title="添加下属组织机构" :afterClose="handleCancel" width="70%">
      <div class="format ">
     <div> <span><span class="label1"><span class="icon-xing">*</span>名称：</span><input class="pc-input bigInput" v-model.trim="name"/></span></div>
     <div class="marginT2VH"> <span><span class="label1">
	 <span class="icon-xing">*</span>类型：</span>
	 <a-radio-group name="radioGroup"   :value="type" @change="getRadioValue($event,'type')"><a-radio value="2"> 部门</a-radio><a-radio value="3"> 岗位</a-radio></a-radio-group>
     </span></div>
     <div class="marginT2VH" v-show="type==3">
       <span class="label1 verTop">权限：</span>
       <span class="marginL1Rem"><a-checkbox-group @change="onChange" :value="permissions">
           <a-row>
             <a-col :span="6" v-for="obj in permissionList" :key="obj.id"><a-checkbox :value="obj.permission" :checked="obj.selected">{{obj.title}}</a-checkbox></a-col>
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
                 确认
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
    id:{
      default:null,
      type:Number
    }
  },
  data() {
    return {
      loading:false,
      name:'',
      type:'2',
      remark:'',
      permissionList:[],
      permissions:[],

    }
  },
  watch:{
    visible:function(val){
      if(val==true){
        this.queryPermission();
      }
    }
  },
  created(){

  },
  methods:{
    onChange(e){
     this.permissions=e;
    },
   getRadioValue(e,id){
     this.type=e.target.value;
   },
    queryPermission(){
           let url="/api/Organization/organization/0/permission";
           utils.request.get(url,true).then((res) => {
             if(res){
              if(res.success==true){
              this.permissionList=res.result;
              }else{

              }
             }
             })

    },
    handleCancel(){
      utils.common.resetData(this);
      this.$emit("closeModel");
    },
    handleOk(){
    //this.handleCancel()
    if(this.name==''){
      utils.box.toast("名称不能为空！");
      return;
    }
    //Object.assign(this.$data, this.$options.data())
    this.$emit("closeModel",{parentId:this.id,name:this.name,type:this.type,permissions:this.permissions,remark:this.remark});
    utils.common.resetData(this);
    },

  }
}
</script>

<style lang="less" scoped>
  .format{
    padding:0 0.2rem;
    color:#333;
    font-size: .12rem;

  }
  /deep/.ant-checkbox-group {
    width:90% !important;
  }
</style>
