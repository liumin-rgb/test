<template>
  <div class="list-main positionR">
  <div class="list-main-top">
    <span class="backButton" @click="goBack"><i class="iconfont icon-fanhui"></i><span>返回上一级</span></span>
  </div>
  <div class="list-main-body">
    <div class="list-head" @click="toggle1=!toggle1">
      <div><i class="iconfont icon-jiantou themeColor" v-show="toggle1==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle1==false"></i>文档信息</div>
      <div>
        </div>
      </div>
      <transition name="t1">
     <div v-show="toggle1==true">
     <div class="flex paddingLR2rem gray">
       <div class="width50 textInput"><span class="label">文件名称</span><input class='pc-input middleInput' readonly="true"/></div>
       <div class="width50 textInput"><span class="label">文档编号</span><input  class='pc-input middleInput' readonly="true"/></div>
     </div>
     <div class="flex paddingLR2rem gray">
       <div class="width50 textInput"><span class="label">版本号</span><input  class='pc-input' readonly="true"/></div>
       <div class="width50 textInput"><span class="label">文档类型</span><input  class='pc-input' readonly="true"/></div>
     </div>
     </div>
     </transition>
     <div class="list-head" @click="toggle3=!toggle3">
        <div><i class="iconfont icon-jiantou themeColor" v-show="toggle3==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle3==false"></i>文档预览</div>
        <div>
          </div>
      </div>
      <transition name="t1">
     <div class="marginT1VH" v-show="toggle3==true">
       <div><span class="label">附件</span><span class="preview flexBtw"><span class="file">培训附件1.pdf</span><span>预览</span></span></div>
       <div>

       </div>
      <!-- <el-table
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
         </el-table> -->
     </div>
     </transition>
     <div class="list-head" @click="toggle2=!toggle2">
       <div><i class="iconfont icon-jiantou themeColor" v-show="toggle2==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle2==false"></i>流转情况</div>
       <div>
         </div>
       </div>
      <transition name='t1'>
    <div class="marginT1VH" v-show="toggle2==true">
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
    </transition>
  </div>
  <div class="list-bottom textAlignR">
  <span class="pc-button buttonNoback"><i class="iconfont icon-wj-thwj"></i>退回</span>
  <span class="pc-button buttonNoback"><i class="iconfont icon-wancheng"></i>立刻生效</span>
  <span class="pc-button"><i class="iconfont icon-tongguo1"></i>通过</span>

   </div>
  </div>
</template>

<script>
  export default {
    name: 'examineFile',
    data() {
      return{
        visible:false,
        ifPrivate:false,
        toggle1:true,
        toggle2:true,
        toggle3:true,
        tableData: []
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

  .preview{
    padding:0.05rem 0.05rem;
    display: inline-block;
    margin-left:.1rem;
    border:1px solid #e4e4e4;
    border-radius: 5px;
    color:#2e6eb4;
    .file{
      text-decoration: underline;
      margin-right:.5rem;
    }
  }


</style>
