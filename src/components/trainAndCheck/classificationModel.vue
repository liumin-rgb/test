<template>
  <a-modal v-model="visible" :title="(configure.operate=='create'?'新建':'修改') +(configure.type==1?'分类':'类别')" :afterClose="handleCancel">
      <div class="format ">
    <div><span><span>{{configure.type==1?'培训分类名称：':'试题类别名称'}}</span><input class="pc-input" v-model="configure.name"/></span>
    </div>
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
  name: '',
  props:{
    configure:{
      default:()=>{},
      type:Object
    },
    visible:{
      default:false,
      type:Boolean
    }
  },
  data() {
    return {
 loading:false,
    }
  },
  watch:{
    visible:function(newVal){
      if(newVal==true){
        // this.searchStaff();
      }
    }
  },
  created(){

  },
  methods:{
    handleCancel(){
      this.$emit("closeModel");
    },
    handleOk(){
      if(this.configure.name==''){
        utils.box.toast("请输入名称");
        return;
      }
      if(this.configure.id==''){//新建
         let params={
           name:this.configure.name
         }
          let url = this.configure.type==1?"/api/Training":"/api/Training/ExamType";
        	utils.request.post(url,params,true).then((res) => {
        		if(res){
              if(res.success==true){
                utils.box.toast("新建成功",'success');
                this.$emit("closeModel",true);
              }else{
               utils.box.toast(res.error.message);
              }
            }
            });
      }else{ //编辑
         let params={
           name:this.configure.name
         }
          let url = this.configure.type==1?"/api/Training/"+this.configure.id:"/api/Training/"+this.configure.id+"/ExamType";
          utils.request.put(url,params,true).then((res) => {
            if(res){
              if(res.success==true){
                utils.box.toast("修改成功",'success');
                this.$emit("closeModel",true);
              }else{
               utils.box.toast(res.error.message);
              }
            }
            });
      }

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
