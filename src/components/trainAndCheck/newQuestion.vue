<template>
  <a-modal v-model="visible" title="新建题目" :afterClose="handleCancel" :dialogClass="'middleModel'" width="50%">
      <div class="format ">
       <div>
         <span>试题类型:</span>
         <a-radio-group name="radioGroup" :default-value="1" ><a-radio :value="1">单选</a-radio><a-radio :value="2">多选</a-radio><a-radio :value="3">不定项</a-radio></a-radio-group>
       </div>
       <div class="marginT2VH">
       <span><span>试题分类：</span><select class="pc-input"  ><option  value="" ></option></select></span>
       <span><span>难易程度：</span><select class="pc-input"  ><option  value="" ></option></select></span>
       </div>
       <div class="marginT2VH">
       <span class="verTop">题目内容：</span><textarea class="pc-textarea textareaOne" style="height:.4rem"/>
       <span class="themeColor verTop pointer" @click="addOption"><i class="iconfont icon-jiahao "></i><span class='text-line'>新增选项</span></span>
       </div>
       <div>
         <el-table
                         :data="tableData"
                         border
                         style="width: 100%"
                         height="30vh"
                        :header-cell-class-name="'table-header'">
                         <el-table-column prop="option" label="" width="50"></el-table-column>
                         <el-table-column prop="content" label="选项内容" min-width="200"></el-table-column>
                         <el-table-column prop="answer" label="答案" align="center">
                           <template>
                             <a-radio :value="1"></a-radio>
                           </template>
                         </el-table-column>
                         <el-table-column prop="picture" label="图片" align="center">
                           <template slot-scope="scope">
                             <i class="iconfont icon-jiahao themeColor font20 pointer"></i>
                           </template>
                         </el-table-column>
                         <el-table-column prop="" label="操作" align="center">
                           <template slot-scope="scope">
                             <i class="iconfont icon-shanchu themeColor font20 pointer"></i>
                           </template>
                         </el-table-column>
                         </el-table>
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
export default {
  name: 'newQuestion',
  props:{
    visible:{
      default:false,
      type:Boolean
    }
  },
  data() {
    return {
 loading:false,
 tableData:[
   {
     option:'A',
     content:'丁二醇',
     answer:'A',
     picture:'',
   },
   {
     option:'B',
     content:'聚乙烯',
     answer:'A',
     picture:'',
   },
 ],
    }
  },
  watch:{
    visible:function(newVal){
      if(newVal==true){
         this.searchStaff();
      }
    }
  },
  created(){

  },
  methods:{
    addOption(){

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
