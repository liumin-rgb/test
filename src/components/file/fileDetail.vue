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
    <div class="list-head" @click="toggle1=!toggle1">
      <div><i class="iconfont icon-jiantou themeColor" v-show="toggle1==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle1==false"></i>文档信息</div>
      <div>
        </div>
      </div>
      <transition name="t1">
     <div v-show="toggle1==true">

     <div class="flex paddingLR2rem gray">
       <div class="width50 textInput"><span class="label">文件名称</span><input class='pc-input middleInput' readonly="true" v-model="name"/></div>
       <div class="width50 textInput"><span class="label">文档编号</span><input  class='pc-input middleInput' readonly="true" v-model="docNo"/></div>
     </div>
     <div class="flex paddingLR2rem gray">
       <div class="width50 textInput"><span class="label">版本号</span><input  class='pc-input' readonly="true" v-model="version"/></div>
       <div class="width50 textInput"><span class="label">文档类型</span><input  class='pc-input' readonly="true" v-model="type"/></div>
     </div>
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
          :data="tableData1"
          border
          style="width: 100%"
		     :header-cell-class-name="'table-header'">
          <el-table-column
           type="index"
            label="序号"
            width="50"
           >
          </el-table-column>
          <el-table-column
            prop="approveEmoloyeeName"
            label="审批人"
            >
          </el-table-column>
          <el-table-column
            prop="startDate"
            label="到达时间">
          </el-table-column>
          <el-table-column
            prop="suggestion"
            label="意见">
          </el-table-column>
          <el-table-column
            prop="endDate"
            label="完成时间">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
           <template slot-scope="scope">
               <span>{{statusList[+scope.row.status-1]}}</span>
           </template>
          </el-table-column>
        </el-table>
    </div>
    </transition>
    <div class="list-head" @click="toggle3=!toggle3">
       <div><i class="iconfont icon-jiantou themeColor" v-show="toggle3==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle3==false"></i>历史版本</div>
       <div>
         </div>
     </div>
     <transition name="t1">
    <div class="marginT1VH" v-show="toggle3==true">
      <el-table
          :data="tableData2"
          border
          style="width: 100%"
         :header-cell-class-name="'table-header'">
          <el-table-column
            prop="name"
            label="文件名"
            width="400">
          </el-table-column>
          <el-table-column
            prop="version"
            label="版本号">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="abolitionTime"
            label="废除时间">
          </el-table-column>
        </el-table>
    </div>
    </transition>
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
        toggle1:true,
        toggle2:true,
        toggle3:true,
        tableData1:[],
        tableData2:[],
        id:'',
        documentId:'',
        name:'',
        docNo:'',
        version:'',
        type:'',
        statusList:['处理中','已完成','退回','已读'],

      }
    },
    created(){
      this.id=this.$route.query.id;
      this.documentId=this.$route.query.documentId;
      this.queryDetail();
      this.getFlowInfo();
      this.getHistoryVersion();
    },
    methods:{
      queryDetail(){
        let url="/api/Document/getDocumentInfo";
        let params={
  "id": this.id,
  "documentId": this.documentId,
   /* "pageIndex": 1,
   "pageSize": 0 */
}
        utils.request.post(url,params,true).then((res) => {
        	if(res){
            if(res.success==true){
              let result=res.result;
              this.name=result.name;
              this.docNo=result.docNo;
              this.version=result.version;
              this.type=result.type;
            }
          }
          });
      },
      getFlowInfo(){
        let url="/api/Document/getFlowInfo";
        let params={
  "id": this.id,
  "documentId": this.documentId,
  "pageIndex": 1,
  "pageSize": 10
}
        utils.request.post(url,params,true).then((res) => {
        	if(res){
            if(res.success==true){
              let totalCount=res.result.totalCount;
                 this.totalCount=totalCount;
                 this.maxPage=Math.ceil(totalCount/this.pageSize);
                let items=res.result.items;
                 this.tableData1=items;
                 }
          }
          });
      },
      getHistoryVersion(){
        let url="/api/Document/getHistoryVersion";
        let params={
  "id": this.id,
  "documentId": this.documentId,
  "pageIndex": 1,
  "pageSize": 10
}
        utils.request.post(url,params,true).then((res) => {
        	if(res){
            if(res.success==true){
              let totalCount=res.result.totalCount;
              this.totalCount=totalCount;
              this.maxPage=Math.ceil(totalCount/this.pageSize);
              let items=res.result.items;
              this.tableData2=items;
            }
          }
          });
      },
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
      height:76vh;
      overflow: auto;
    }
  }


</style>
