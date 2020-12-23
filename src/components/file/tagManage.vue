<template>
  <a-modal v-model="visible" title="标签管理" @ok="handleOk" :dialogClass="'middleModel'">
      <div class="tag-one" v-if="operation.type=='all'">
       <div class="tag-one-create"><span class="pc-button buttonNoback font10" @click="addTags"><i class="iconfont icon-jiahao font12"></i>新建</span></div>
       <div class="tag-one-drag">
         <draggable v-model="allTagsList"    :options="{animation: 300}" >
         	<div  v-for="(obj,index) in allTagsList" class="pc-drag">
            <span contenteditable="true" style="outline: none;" @blur="obj.name=$event.target.innerHTML">{{obj.name}}</span>
         <span>
          <i class="iconfont icon-shanchu themeColor weight600 font16 pointer" @click="deleteTag(index)"></i>
         	<i class="iconfont icon-tuodong themeColor weight600 font16 pointer"></i>
          </span>
            </div>
         </draggable>
       </div>
      </div>

      <div class="tag-two " v-else>
      <div class="tag-two-title">
        <span>文件名：问卷11</span>
        <span>文档编号：1-R</span>
        <span>文档版本：v1.1</span>
      </div>
      <div class="tag-two-now">
        <span>当前标签:</span>
        <div >
          <span class="pc-button buttonNoback" v-for="obj in singleTagList">{{obj.name}}</span>
        </div>
      </div>
      <div class="tag-two-all">
        <div>所有标签</div>
        <div>
        <span :class="['pc-button', obj.choosen?'white':'buttonNoback']" @click="chooseTag(obj)" v-for="obj in allTagsList">{{obj.name}}</span>
        </div>
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
    operation:{
      default:()=>{}, //all 所有标签  single:单个标签
      type:Object
    },
  },
  data() {
    return {
      loading:false,
      allTagsList:[],
      singleTagList:[],
      tagObj:{
            "id": 0,
            "name": "新建标签",
            "order": 0
          }
    }
  },
  watch:{
    visible:function(val){
      if(val==true){
        this.queryAllTags();
      }
      if(this.operation.type=="single"){
        this.singleTagList=this.operation.singleTag;
      }
    }
  },
  created(){
  },
  methods:{
    addTags(){
    this.allTagsList.unshift(this.tagObj);
    },
    deleteTag(index){
    this.allTagsList.splice(index,1);
    },
    chooseTag(obj){
      obj.choosen=!obj.choosen;
       if(obj.choosen==true){
         this.singleTagList.push(obj);
       }else{
         let index=this.singleTagList.findIndex((item)=>{item.id==obj.id});
         this.singleTagList.splice(index,1);
       }
    },
    queryAllTags(){
        let url="/api/Document/DocumentTagList";
        utils.request.post(url,{},true).then((res) => {
        	if(res){
            if(res.success==true){
              this.allTagsList=res.result;
              if(this.operation.type=="single"){
                for(var i in this.allTagsList){
                  for(var j in this.singleTagList){
                    if(this.allTagsList[i].id==this.singleTagList[j].id){
                      this.allTagsList[i].choosen=true;
                    }
                  }
                }
              }
            }else{
            }
          }
          });
    },
    handleCancel(){
      this.$emit("closeTagManage");
    },
    handleOk(){
          this.loading=true;
          if(this.operation.type=='all'){
            var url="/api/Document/InsertOrUpdateTag";
            var params=this.allTagsList
          }else{
            var url="/api/Document/InsertOrDeleteTag";
            var params=this.singleTagList
          }
          utils.request.put(url,params,false).then((res) => {
          	if(res){
              this.loading=false;
              if(res.success==true){
                utils.box.toast("提交成功");
                this.$emit("closeTagManage",{config:this.operation.type});
              }else{
                utils.box.toast("提交失败");
              }
            }
            });

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
