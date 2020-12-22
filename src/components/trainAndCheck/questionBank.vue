<template>
<div class="list-main" ref="main">
<div class="list-search">
      <div class="list-search-one flexBtw">
      <div><span><span>试题类型：</span><select class="pc-input"  ><option  value="" ></option></select></span>
      <span><span>试题分类：</span><select class="pc-input"  ><option  value="" ></option></select></span>
      <span><span>难易程度：</span><select class="pc-input"  ><option  value="" ></option></select></span>
      </div>
      <span class="pc-button" @click="search"><i class="iconfont icon-sousuo"></i>搜索</span>
    </div>
    <div class="list-search-two"></div>
    <div class="list-search-three">
    <span class="positionR">
     <span class="pc-button buttonNoback" ><i class="iconfont icon-jiahao "></i>新建题目<i class="iconfont icon-jiantou "></i></span>
    </span>
    <span class="pc-button buttonNoback" ><i class="iconfont icon-shangchuan1 "></i>删除</span>
     <span class="pc-button buttonNoback" ><i class="iconfont icon-shangchuan1 "></i>导入</span>

     </div>
   </div>
   <div class="list-table">
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
   <div class="list-bottom">
   <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
    </div>
  </div>
</template>

<script>
  import Pagination from '../Pagination'
  export default {
    name: 'questionBank',
    components:{Pagination},
    data() {
      return{
      pageIndex: 1,
      pageSize:10,
      maxPage: 1,
      totalCount:0,
      tableData:[{
          number:'1',
          type:'单选',
          category:'入职考试',
          easy:'简单',
          type1:'',
          trueOption:'A',
          content:'',
          score:'5'
        }],
      multipleSelection:[],

      }
    },
    methods:{
      search(){

      },
      goBack(){
        this.$router.go(-1);
      },
      handleSelectionChange(val) {
         this.multipleSelection = val;
       },
    }
  };
</script>

<style lang="less" scoped>
  .list-main{
    height:100%;
    //background:#fff;
/*    display: flex;
    display: -webkit-flex; */
    border-radius: 5px;
    background:#fff;
    padding:.1rem;
    &-top{
      width:100%;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;

    }
    &-body{
      width:100%;
      margin-top:.2rem;
    }
  }
  .list-search {
    border: 1px dashed #cccccc;
    border-radius: 5px;
    margin-bottom: .1rem;
    padding: .05rem;

    &-three {
      text-align: right;

    }
  }
  /deep/.el-table__expanded-cell{
    padding:5px 50px !important;
    }
</style>
