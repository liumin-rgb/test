<template>
  <a-modal v-model="visible" :title="config.title" :afterClose="handleCancel">
      <div class="format ">
       <div class="textInput positionR"><span class="label1">{{config.label}}:</span>
        <a-tree-select
           v-model="value"
           show-search
           style="width: 50%;margin: .02rem 0.1rem;"
           :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
           placeholder="请选择"
           allow-clear
           tree-default-expand-all
         >
           <a-tree-select-node key="0-1" value="parent 1" title="parent 1" :selectable="false">
             <a-tree-select-node key="0-1-1" value="parent 1-0" title="parent 1-0"  :selectable="false">
               <a-tree-select-node key="random"  value="leaf1" title="my leaf" />
               <a-tree-select-node key="random1" value="leaf2" title="your leaf" />
             </a-tree-select-node>
             <a-tree-select-node key="random2" value="parent 1-1" title="parent 1-1" :selectable="false">
               <a-tree-select-node key="random3" value="sss">
                 <b slot="title" style="color: #08c">sss</b>
               </a-tree-select-node>
             </a-tree-select-node>
           </a-tree-select-node>
         </a-tree-select>
       <!-- <input  class='pc-input' @click="showSelect=true" readonly="true" style="width:2rem;"/>
      <div @mouseleave="showSelect=false" class="pc-select selectOne" v-show="showSelect==true">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
       </div> -->

       </div>
       <div><span class="label1 verTop">备注:</span>
       <textarea class='pc-textarea'/></div>
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
     showSelect:false,
       treeExpandedKeys: [],
       value: undefined,
           }
         },

  created(){

  },
  methods:{
    handleNodeClick(data) {
      console.log(data);
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
