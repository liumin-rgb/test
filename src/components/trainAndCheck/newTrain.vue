<template>
  <div>
    <div v-show="step==1">
      <div class="flexBtw">
        <div>
          <span class="pc-button ">培训模块</span>
          <span class="pc-button buttonNoback" @click="changeType(2)">考核模块</span>
          <span class="pc-button buttonNoback" @click="changeType(3)">培训+考核</span>
        </div>
        <div>
          <span class="pc-button buttonNoback" @click="goBack">返回</span>
          <span class="pc-button buttonNoback" @click="saveDraft">保存草稿</span>
          <span class="pc-button" @click="nextStep">保存并进入下一步</span>
        </div>
      </div>
      <div class="list-main-body">
        <div class="list-head" @click="toggle1=!toggle1">
          <div><i class="iconfont icon-jiantou themeColor" v-show="toggle1==true"></i><i class="iconfont icon-jiantou1 themeColor"
              v-show="toggle1==false"></i>基本信息</div>
        </div>
        <transition name="t1">
          <div v-show="toggle1==true">
            <div class="flex paddingLR2rem gray">
              <div class=" textInput"><span class="label2"><span class="icon-xing">*</span>培训名称</span>
                <input class='pc-input middleInput' v-model="trainInfo.name"/></div>
              <div class=" textInput marginL2VW"><span class="label2"><span class="icon-xing">*</span>培训负责人</span>
                <span>
                  <a-tree-select allow-clear tree-checkable size="small" style="width:2.5rem;height:.25rem;margin: .02rem 0.1rem;"
                    @change="onChange" :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" :tree-data="treemap"
                    tree-default-expand-all>
                    <!-- :show-checked-strategy="SHOW_PARENT" -->
                  </a-tree-select>
                </span>
                </div>
            </div>
            <div class="flex paddingLR2rem gray">
              <div class=" textInput"><span class="label2">培训讲师</span>
                <input class='pc-input middleInput' v-model="trainInfo.speaker"/></div>
              <div class=" textInput marginL2VW"><span class="label2">培训地点</span>
                <input class='pc-input middleInput' v-model="trainInfo.address"/></div>
            </div>
            <div class="flex paddingLR2rem gray">
              <div class=" textInput"><span class="label2"><span class="icon-xing">*</span>培训开始时间</span><el-date-picker  type="datetime" v-model="trainInfo.startDate" value-format="yyyy-MM-dd"  placeholder=" 请选择"></el-date-picker>
              </div>
              <div class=" textInput marginL2VW"><span class="label2"><span class="icon-xing">*</span>培训结束时间</span><el-date-picker  type="datetime" v-model="trainInfo.endDate" value-format="yyyy-MM-dd"  placeholder=" 请选择"></el-date-picker>
              </div>
            </div>
            <div class="flex paddingLR2rem gray">
            <div class=" textInput"><span class="label2"><span class="icon-xing">*</span>培训分类</span>
              <select class="pc-input middleInput" @change="getSelectInfo('trainingType')" id="trainingType"><option v-for="obj in trainingTypeList" :value="obj.code" >{{obj.text}}</option></select>
            </div>
            </div>
            <div class="flex paddingLR2rem gray">
              <div class=" textInput"><span class="label2 verTop">培训内容介绍</span>
              <textarea class='pc-textarea textareaOne' style="width:6.5rem" v-model="trainInfo.description"/></div>
    </div>
    </div>
  </transition>
    <div class="list-head" @click="toggle2=!toggle2">
      <div><i class="iconfont icon-jiantou themeColor" v-show="toggle2==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle2==false"></i>资料</div>
    </div>
    <transition name="t1">
     <div v-show="toggle2==true">
       <div class="marginB1VH"><span class="pc-button" @click="openModel">从文档中心选择</span>
        <a-upload name="file" :multiple="true" :show-upload-list="false" :before-upload="beforeUpload"
           :customRequest="upload"
           @change="handleChange">
           <span class="pc-button">本地上传</span>
         </a-upload>
         </div>
   <el-table
         :data="tableData"
         border
         style="width: 100%"
         height="26vh"
        :header-cell-class-name="'table-header'">
         <el-table-column
           prop=""
           label="附件名称"
           >
         </el-table-column>
         <el-table-column
           prop=""
           label="操作"
           >
           <template slot-scope="scope">
              <i class="iconfont icon-shanchu themeColor font16" @click="deleteFile(scope.row.id)"></i>
           </template>
         </el-table-column>
       </el-table>
     <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
     </div>
   </transition>
  </div>
  </div>
  <LastStep :step="step" @changeStep="changeStep"/>
  <ChooseFile :visible="visible" @closeModel="closeModel"/>
</div>
</template>

<script>
  import LastStep from './lastStep'
  import Pagination from '../Pagination'
  import ChooseFile from './chooseFile'
 export default {
    name: 'newTrain',
    components:{Pagination,LastStep,ChooseFile},
    data(){
      return{
      toggle1:true,
      toggle2:false,
      pageIndex: 1,
      pageSize:10,
      maxPage: 1,
      totalCount:0,
      tableData:[],
      step:1,
      treemap:[],
      visible:false,
      id:'',
      trainInfo:{
  "type": 1,
  "name": "",
  "trainingTypeName": "",
  "employeeName": "",
  "speaker": "",
  "address": "",
  "startDate": "",
  "endDate": "",
  "description": ""
    },
    trainingTypeList:[]
      }
    },
    created(){
      this.id=this.$route.query.id;
    },
   methods:{
     getSelectInfo(id){
         this.trainInfo[id]=utils.common.getSelectValue(id);
         console.log(this.staffInfo);
     },
     openModel(){
       this.visible=true;
     },
     onChange(){

     },
     goBack(){
      this.$router.go(-1);
     },
     changeStep(val){
       this.step=val||1;
     },
     saveDraft(){
      this.edit();
     },
     nextStep(){
       this.edit();
       this.changeStep(3);
     },
     deleteFile(){

     },
       changePage(val){
        this.pageIndex=val.pageIndex;
        this.pageSize=val.pageSize;
        //this.queryInfo();
      },
      closeModel(){
        this.visible=false;
      },
      changeType(val){
        this.$emit("changeType",val);
      },
      edit(){
         if(this.id==''){
         let params=this.trainInfo;
          let url = "/api/Training/Training";
         	utils.request.post(url,params,true).then((res) => {
          if(res){
              if(res.success==true){
                //utils.box.toast("新建成功",'success');

              }else{
               utils.box.toast(res.error.message);
              }
            }
            });
         }else{
       let params=this.trainInfo;
        let url = "/api/Training/"+this.id+"/Training";
       	utils.request.put(url,params,true).then((res) => {
        if(res){
            if(res.success==true){
              //utils.box.toast("新建成功",'success');

            }else{
             utils.box.toast(res.error.message);
            }
          }
          });

         }
      },
      upload(){

      },
   },

 }

</script>

<style scoped lang="less">
  /*时间控件*/
   /deep/.el-table th>.cell{padding-left:5px;padding-right:0;}
   /deep/.el-input__inner{height:.25rem;/* border: 1px solid #2e6eb4; */}
   /deep/.el-input__icon{line-height: .25rem;}
   /deep/.el-date-editor.el-input, .el-date-editor.el-input__inner{width:2.5rem;margin: .02rem 0.1rem;/* box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.1) */}
   /deep/.el-input--suffix .el-input__inner{padding-right:0}
</style>
