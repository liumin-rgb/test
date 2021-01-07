<template>
  <a-modal v-model="visible" title="生效" :afterClose="handleCancel" >
      <div class="format ">
      <div><span class="label"><span class="icon-xing">*</span>生效日期：</span><el-date-picker  v-model="date" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择"
      :picker-options="{
                  disabledDate: time => {
                     return time.getTime()+24*3600 < Date.now()
                   },
                   selectableRange: startTimeRange
                 }"
      ></el-date-picker>
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
    visible:{
      default:false,
      type:Boolean
    }
  },
  data() {
    return {
 loading:false,
 date:''
    }
  },

  created(){
     let date=new Date();
     let year=date.getFullYear();
     let month=date.getMonth()+1;
     let day=date.getDate();
     this.date=year+'-'+month+'-'+day;
  },
  methods:{
    handleCancel(){
      this.$emit("closeModel");
    },
    handleOk(){
      if(this.date==''){
        utils.box.toast("请选择生效日期");
        return;
      }
      this.$emit("closeModel",{date:this.date});
    //this.handleCancel()
    }


  }
}
</script>

<style lang="less" scoped>
  .format{
    padding:0 0.2rem;
    color:#333;
    font-size: .12rem;

  }
/*时间控件*/
  /deep/.el-table th>.cell{padding-left:5px;padding-right:0;}
  /deep/.el-input__inner{height:.25rem;border: 1px solid #e4e4e4;}
  /deep/.el-input__icon{line-height: .25rem;}
  /deep/.el-date-editor.el-input, .el-date-editor.el-input__inner{width:1.5rem;margin: .02rem 0.1rem;/* box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.1) */}
  /deep/.el-input--suffix .el-input__inner{padding-right:0}
</style>
