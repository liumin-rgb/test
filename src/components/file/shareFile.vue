<template>
  <a-modal v-model="visible" title="分享文件" :afterClose="handleCancel">
      <div class="format ">
        <div><span class="label">文件名称:</span><input class="pc-input" readonly="readonly" v-model="filesName"/></div>
        <div class="marginT1VH"><span class="label verTop">链接:</span><textarea class="pc-textarea textareaOne" readonly="readonly" v-model="url"/></div>
      <div><span class="label">分享对象:</span> <a-radio-group name="radioGroup" v-model="sharePerson" @change="getRadioValue($event)"><a-radio :value="1"> 全部</a-radio><a-radio :value="2"> 医生</a-radio><a-radio :value="3"> 护士</a-radio></a-radio-group></div>
      </div>
        <template slot="footer">
               <a-button key="back" >
                 复制
               </a-button>
               <a-button key="submit" type="primary" :loading="loading" >
                 查看分享信息
               </a-button>
        </template>
     </a-modal>
</template>
<script>
export default {
  name: 'shareFile',
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
 filesName:'',
 loading:false,
 sharePerson:1,
 url:'',//'http://lqms-demo2.chinanorth.cloudapp.chinacloudapi.cn:8000/dist/index.html'
    }
  },
  watch:{
    visible:function(newVal){
      if(newVal==true){
        this.filesName='';
        this.config.files.forEach((item,key)=>{
        this.filesName+=(key==0?'':';')+item.name;
        });
      }
    }
  },
  created(){
     this.url=location.origin+'/ui/#/files';
  },
  methods:{
    getRadioValue(e){
      this.sharePerson=e.target.value;
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
