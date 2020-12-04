<template>
  <div class="list-main">
  <div class="list-main-top">
    <span class="backButton" @click="goBack"><i class="iconfont icon-fanhui"></i><span>返回上一级</span></span>
    <div>
      <span class="pc-button buttonNoback1 font12" v-show="ifPrivate==true" @click="visible=true"><i class="iconfont icon-yulan font12"></i>可见人员</span>
      <a-switch checked-children="私密" un-checked-children="公开"   @change="onChange"/>
      </div>
  </div>
  <div class="list-main-body">
    <div class="list-head">
      <div><i class="iconfont icon-jiantou themeColor"></i>文档信息</div>
      <div>
        </div>
      </div>
     <div>
     <div class="flex paddingLR2rem gray">
       <div class="width50 textInput"><span class="label">文件名称</span><input class='pc-input' readonly="true"/></div>
       <div class="width50 textInput"><span class="label">文档编号</span><input  class='pc-input' readonly="true"/></div>
     </div>
     <div class="flex paddingLR2rem gray">
       <div class="width50 textInput"><span class="label">版本号</span><input  class='pc-input' readonly="true"/></div>
       <div class="width50 textInput"><span class="label">文档类型</span><input  class='pc-input' readonly="true"/></div>
     </div>
     </div>
     <div class="list-head">
       <div><i class="iconfont icon-jiantou themeColor"></i>流转情况</div>
       <div>
         </div>
       </div>
    <div class="marginT1VH">
      <el-table
          :data="tableData"
          border
          style="width: 100%"
		     :header-cell-class-name="'table-header'">
          <el-table-column
            prop=""
            label="序号"
           >
          </el-table-column>
          <el-table-column
            prop=""
            label="审批人"
            >
          </el-table-column>
          <el-table-column
            prop=""
            label="到达时间">
          </el-table-column>
          <el-table-column
            prop=""
            label="意见">
          </el-table-column>
          <el-table-column
            prop=""
            label="完成时间">
          </el-table-column>
          <el-table-column
            prop=""
            label="状态">
          </el-table-column>
        </el-table>
    </div>
    <div class="list-head">
       <div><i class="iconfont icon-jiantou themeColor"></i>历史版本</div>
       <div>
         </div>
       </div>
    <div class="marginT1VH">
      <el-table
          :data="tableData"
          border
          style="width: 100%"
         :header-cell-class-name="'table-header'">
          <el-table-column
            prop=""
            label="文件名"
            width="500">
          </el-table-column>
          <el-table-column
            prop=""
            label="版本号">
          </el-table-column>
          <el-table-column
            prop=""
            label="状态">
          </el-table-column>
          <el-table-column
            prop=""
            label="废除时间">
          </el-table-column>
        </el-table>
    </div>
  </div>
   <VisiblePeople  :visible="visible" @closeModel="closeModel"/>
  </div>
</template>

<script>
  import VisiblePeople from './visiblePeople'
  export default {
    name: 'fileDetail',
    components:{VisiblePeople},
    data() {
      return{
        visible:false,
        ifPrivate:false,
        tableData: [/* {
          date: '2016-05-02',
          name: '--',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '一一',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '一一',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '一一',
          address: '上海市普陀区金沙江路 1516 弄'
        } */]
      }
    },
    methods:{
       onChange(checked) {
          this.ifPrivate=checked;
          },
      closeModel(){
        this.visible=false;
      },
      goBack(){
        this.$router.go(-1);
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


</style>
