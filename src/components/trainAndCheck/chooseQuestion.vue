<template>
  <a-modal v-model="visible" title="选择题目" :afterClose="handleCancel" :dialogClass="'bigModel'">
      <div class="format ">
 <el-table
                 :data="tableData"
                 border
                 style="width: 100%"
                 height="30vh"
                 @selection-change="handleSelectionChange"
                :header-cell-class-name="'table-header'">
                <el-table-column type="selection"></el-table-column>
                <el-table-column type="expand">
                     <template slot-scope="props">
                       <div>以下哪些定义为危险化学品</div>
                       <div><span>A.三乙基铝</span><span>B.三异丁基铝</span><span>C.铝粉</span><span>D.镁粉</span></div>
                     </template>
                </el-table-column>
                 <el-table-column prop="number" label="试题编号"></el-table-column>
                 <el-table-column prop="type" label="试题类型"></el-table-column>
                 <el-table-column prop="category" label="试题分类"></el-table-column>
                 <el-table-column prop="easy" label="难易程度"></el-table-column>
                 <el-table-column prop="trueOption" label="试题选项内容(文字)"></el-table-column>
                 <el-table-column prop="content" label="试题题目内容"  min-width="110"></el-table-column>
               </el-table>
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
  name: 'chooseQuestion',
  props:{
    visible:{
      default:false,
      type:Boolean
    }
  },
  data() {
    return {
    loading:false,
    multipleSelection:[],
    tableData:[
        {
          number:'1',
          type:'单选',
          category:'入职考试',
          easy:'简单',
          type1:'',
          trueOption:'A',
          content:'',
          score:'5'
        }

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
    handleSelectionChange(val) {
       this.multipleSelection = val;
     },
    handleCancel(){
      this.$emit("closeModel");
    },
    handleOk(){
      if(this.multipleSelection.length==0){
        utils.box.toast("请选择题目");
        return;
      }
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
/deep/.el-table__expanded-cell{
  padding:5px 50px !important;
  }
</style>
