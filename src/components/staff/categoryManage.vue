<template>
  <a-modal v-model="visible" title="修改详情页类目名称" @ok="handleOk">
      <div class="tag-one">
       <div class="tag-one-create"><span class="pc-button buttonNoback font10"><i class="iconfont icon-jiahao font12"></i>新建</span></div>
       <div class="tag-one-drag">
         <draggable v-model="tagList"  :move="onMove" @update="datadragEnd" :options="{animation: 300}" >
         	<div  v-for="obj in tagList" class="pc-drag">
            <span contenteditable="true" style="outline: none;" @blur="obj=$event.target.innerHTML">{{obj}}</span>
         <span>
          <i class="iconfont icon-shanchu themeColor weight600 font16 pointer"></i>
         	<i class="iconfont icon-tuodong themeColor weight600 font16 pointer"></i>
          </span>
            </div>
         </draggable>
       </div>
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
  import draggable from 'vuedraggable'
export default {
  name: 'tagManage',
  components:{draggable},
  props:{
    visible:{
      default:false,
      type:Boolean
    },
  },
  data() {
    return {
      tagList:[]
    }
  },
  created(){
    this.tagList=['标签1','标签2','标签3','标签4'];
  },
  methods:{
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
  .tag-one{
    padding:0 0.2rem;
    color:#333;
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
