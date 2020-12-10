<template>
  <a-modal v-model="visible" title="修改详情页类目名称" :afterClose="handleCancel">
     <a-spin :spinning="spinning" tip="Loading...">
      <div class="tag-one" >
 <div class="tag-one-drag">
         <draggable v-model="tagList"  :options="{animation: 300}"  filter=".forbid"   :move="onMove">
         	<div  v-for="(obj,index) in tagList" :class="index==0?'pc-drag forbid':'pc-drag'" >
            <span contenteditable="true" style="outline: none;" @blur="obj.name=$event.target.innerHTML">{{obj.name}}</span>
         <span>
         <!-- <i class="iconfont icon-shanchu themeColor weight600 font16 pointer"></i> -->
         	<i class="iconfont icon-tuodong themeColor weight600 font16 pointer" :style="index==0?'color:#999 !important':''"></i>
          </span>
          </div>
         </draggable>
       </div>
      </div>
       </a-spin>
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
  import draggable from 'vuedraggable'
export default {
  name: 'tagManage',
  components:{draggable},
  props:{
    visible:{
      default:false,
      type:Boolean,
      spinning:false
    },
  },
  data() {
    return {
      tagList:[],
      loading1:false,
      loading:false,
    }
  },
  watch:{
    visible:function(newVal){
      if(newVal==true){
        this.queryCategory();
      }
    }
    },

  created(){

  },
  methods:{
       //禁止拖动的项
            onMove(e){
              console.log(e.relatedContext.element.id);
             if(e.relatedContext.index==0) return false;
              return true;
           },
    queryCategory(){
      this.spinning=true;
      let url="/api/Employee/getEmployeeInfoSequence"
      utils.request.get(url).then((res) => {
        this.spinning=false;
        if(res){
          if(res.success==true){
           this.tagList=res.result.employeeInfoList||[];
          }else{
            let error=res.error||{};
            utils.box.toast(error.message);
          }

        }
      })
    },
    handleCancel(){
      this.$emit("closeModel");
    },
    handleOk(){
      this.loading=true;
      let url="/api/Employee/updateEmployeeInfoSequence"
      let params={
        employeeInfoList:this.tagList
      }
      utils.request.post(url,params).then((res) => {
        this.loading=false;
        if(res){
           this.handleCancel()
        }
      })

    }

  }
}
</script>

<style lang="less">
  .tag-one{
    padding:0 0.2rem;
    color:#333;
    overflow: auto;
    height:50vh;
    &-create{text-align: right;}
    &-drag{
     padding:.1rem 0;

    }
  }

  .tag-two{
    padding:0 0.2rem;
    color:#333;
    font-size: .12rem;
    &-title{
     &>span{
       margin-right:.1rem;
     }
    }
    &-now{
      margin:.2rem 0;
      display: flex;
      display:-webkit-flex;
      &>span{font-weight: 600;}
      &>div{
        margin-left: .1rem;
        border: 1px solid #2e6eb4;
        border-radius: 5px;
        flex:1;
        padding:.1rem;
        overflow: auto;
        height:1.2rem;
        &>span{
          border: 1px solid #2e6eb4;
          color: #333;
          }
      }
    }
    &-all{
     border: 1px dashed #2e6eb4;
     border-radius: 5px;
     padding:.1rem;
     width:100%;
     &>div:nth-child(1){

     }
     &>div:nth-child(2){
       margin-top:.1rem;
       overflow: auto;
       height:1.2rem;
      &>span{
        border: 1px solid #2e6eb4;
        color: #333;
      }
     }

    }
  }

</style>
