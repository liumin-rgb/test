<template>
  <div class="list-main positionR">
    <div class="list-main-top">
      <span class="backButton" @click="goBack"><i class="iconfont icon-fanhui"></i><span>返回上一级</span></span>
    </div>
    <div class="list-main-body">
      <div class="list-head" @click="toggle1=!toggle1">
        <div><i class="iconfont icon-jiantou themeColor" v-show="toggle1==true"></i><i class="iconfont icon-jiantou1 themeColor"
            v-show="toggle1==false"></i>文档信息</div>
        <div>
        </div>
      </div>
      <transition name="t1">
        <div v-show="toggle1==true">
          <div class="flex paddingLR2rem gray">
            <div class="width50 textInput"><span class="label">文件名称:</span><input v-model="name" class='pc-input middleInput backGray'
                readonly="true" /></div>
            <div class="width50 textInput"><span class="label">文档编号:</span><input v-model="docNo" class='pc-input middleInput backGray'
                readonly="true" /></div>
          </div>
          <div class="flex paddingLR2rem gray">
            <div class="width50 textInput"><span class="label">版本号:</span><input v-model="version" class='pc-input backGray'
                readonly="true" /></div>
            <div class="width50 textInput"><span class="label">文档类型:</span><input v-model="typeList[type]" class='pc-input backGray'
                readonly="true" /></div>
          </div>
        </div>
      </transition>
      <div class="list-head" @click="toggle3=!toggle3">
        <div><i class="iconfont icon-jiantou themeColor" v-show="toggle3==true"></i><i class="iconfont icon-jiantou1 themeColor"
            v-show="toggle3==false"></i>文档预览</div>
        <div>
        </div>
      </div>
      <transition name="t1">
        <div class="marginT1VH" v-show="toggle3==true">
          <div ><span class="label">附件</span><span class="preview flexBtw" @click="preview"><span class="file">{{name}}</span><span>预览</span></span>
          </div>


        </div>
      </transition>
      <div class="list-head" @click="toggle2=!toggle2">
        <div><i class="iconfont icon-jiantou themeColor" v-show="toggle2==true"></i><i class="iconfont icon-jiantou1 themeColor"
            v-show="toggle2==false"></i>流转情况</div>
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
               type="index"
                label="序号"
                width="50"
               >
              </el-table-column>
              <el-table-column
                prop="approveEmoloyeeName"
                label="当前节点"
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
                   <span>{{scope.row.status}}</span>
               </template>
              </el-table-column>
            </el-table>
        </div>
      </transition>
    </div>
    <div class="list-bottom textAlignR" v-if="operationType==1">
      <span class="pc-button buttonNoback" @click="operate(2)" ><i class="iconfont icon-wj-thwj"></i>退回</span>
      <span class="pc-button buttonNoback" @click="operate(3)"><i class="iconfont icon-wancheng"></i>生效</span>
      <span class="pc-button" @click="operate(1)"><i class="iconfont icon-tongguo1"></i>提交下一审核人</span>
    </div>
    <div class="list-bottom textAlignR" v-else-if="operationType==2">
      <span class="pc-button buttonNoback" @click="operate(2)" ><i class="iconfont icon-wj-thwj"></i>退回</span>
      <span class="pc-button buttonNoback" @click="operate(3)"><i class="iconfont icon-wancheng"></i>立即废除</span>
      <span class="pc-button" @click="operate(1)"><i class="iconfont icon-tongguo1"></i>提交下一审核人</span>
    </div>
    <div class="list-bottom textAlignR" v-else>
       <span class="pc-button buttonNoback" @click="operate(3)"><i class="iconfont icon-wancheng"></i>已阅</span>
    </div>
    <CheckFile  :visible="visible" :config="config" @closeModel="closeModel"/>
    <EnableFile  :visible="visible1"  @closeModel="closeModel1"/>
  </div>
</template>

<script>
  import CheckFile from './checkFile'
 import EnableFile from '../file/enableFile'

  export default {
    name: 'examineFile',
    components:{CheckFile,EnableFile},
    data() {
      return {
        visible: false,
        visible1:false,
        enableDate:'',
        config:{
          operationType:1, //1：审核 2：废除 3：传阅
          ids:[]
        },
        ifPrivate: false,
        toggle1: true,
        toggle2: true,
        toggle3: true,
        tableData: [],
        docVersionId: '',
        docApproveNoteId:'',
        name: '',
        docNo: '',
        version: '',
        type: 3,
        typeList: ['', '文档', '视频', 'PDF', '图片'],
        totalCount:0,
        pageIndex: 1,
        pageSize:10,
        htmlStr:'',
        url:'',
        operationType:'',
        approveResult:'',//1：通过 2：退回 3：生效、已阅、废除
        flowStatusList:[{code:0,text:''},{code:1,text:'处理中'},{code:2,text:'已完成'},{code:3,text:'退回'},{code:4,text:'已读'}],
      }
    },
    filters:{
      filter1:function(val1,val2){
          let index=val2.findIndex((item)=>{return item.code==val1})||0;
          return val2[index].text;
      }
    },
    created() {
      this.docVersionId = this.$route.query.docVersionId;
      this.docApproveNoteId=this.$route.query.docApproveNoteId;
      this.operationType=this.$route.query.operationType;
      this.queryDetail();
      this.queryPreview();
      this.queryFlowList();
    },
    methods: {
      operate(approveResult){
        this.approveResult=approveResult;
        if(approveResult==3){ //  生效/立即废除/已阅
         if(this.operationType==2||this.operationType==3){ // 传阅/废除任务
           this.enableFile();
           return;
         }
         this.visible1=true; //生效任务需要打开model选择生效时间
          return;
        }
       this.config={
        operationType:this.operationType, //1：审核 2：废除
        approveResult:approveResult,    //1：通过 2：退回 3：立刻生效
        docVersionId:this.docVersionId,
        docApproveNoteId:this.docApproveNoteId,
       }
       this.visible=true;
      },
      enableFile(){ //生效/已阅/废除专用
          let url = "/api/Task/approveDocVersion";
          let params={
              "docVersionId": this.docVersionId,
              "docApproveNoteId": this.docApproveNoteId,
              "operationType": this.operationType,
              "approveResult": this.approveResult,
              "nextEmployeeId": 0,
              "suggesion": "",
              "effectiveDate":this.enableDate,
          };
          utils.request.post(url,params,true).then((res) => {
            if (res) {
              if (res.success == true) {
                 utils.box.toast("提交成功",'success');
                 this.goBack();
              } else {
                utils.box.toast(res.error.message);
              }
            }
          })

      },
      preview(){
        if(this.type==1){
        //  utils.cache.setSession("htmlContent",this.htmlStr);
          const {href} = this.$router.resolve({
            path: 'previewHtml',
            query:{id:this.docVersionId}
          });
          window.open(href, '_blank')
        }else{
          window.open(this.url);
        }
      },
      queryDetail() {
        let url = "/api/Task/getDocVersionInfo?docVersionId=" + this.docVersionId+"&approveNoteId="+this.docApproveNoteId;
        utils.request.get(url, true).then((res) => {
          if (res) {
            if (res.success == true) {
              let result = res.result;
              this.name = result.name;
              this.docNo = result.docNo;
              this.version = result.version;
              this.type = result.type;
            } else {
              utils.box.toast(res.error.message);
            }
          }
        })
      },
      queryPreview(){
          let url ="/api/Task/previewDocVerion?docVersionId="+this.docVersionId;
          utils.request.get(url, true).then((res) => {
            if (res) {
              if (res.success == true) {
                let data=res.result;
                this.htmlStr=data.htmlStr;
                this.url=data.url;
              } else {
                utils.box.toast(res.error.message);
              }
            }
          })

      },
      queryFlowList(){
          let url = "/api/Task/getFlowInfo?docVersionId="+this.docVersionId+"&pageIndex="+this.pageIndex+"&pageSize="+this.pageSize;
          utils.request.get(url,true).then((res) => {
            if (res) {
              if (res.success == true) {
                  let data=res.result;
                 this.totalCount=data.totalCount||0;
                 this.maxPage=Math.ceil(this.totalCount/(this.pageSize));
                 this.tableData=data.items;
              } else {
                utils.box.toast(res.error.message);
              }
            }
          })

      },
      changePage(val){
        this.pageIndex=val.pageIndex;
        this.pageSize=val.pageSize;
        this.queryFlowList();
      },
      onChange(checked) {
        this.ifPrivate = checked;
      },
      closeModel(val) {
        this.visible = false;
        if(val==true){
          this.goBack();
        }
      },
      closeModel1(val) {
        this.visible1 = false;
        if(val){
          this.enableDate=val.date;
          this.enableFile();
        }
      },
      goBack() {
        this.$router.go(-1);
      },


    }
  };
</script>

<style lang="less" scoped>
  .list-main {
    height: 100%;
    //background:#fff;
    /*    display: flex;
    display: -webkit-flex; */
    border-radius: 5px;
    background: #fff;
    padding: .1rem;

    &-top {
      width: 100%;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;

    }

    &-body {
      width: 100%;
      margin-top: .2rem;
      height:70vh;
      overflow: auto;
    }
  }

  .preview {
    padding: 0.05rem 0.05rem;
    display: inline-block;
    margin-left: .1rem;
    border: 1px solid #e4e4e4;
    border-radius: 5px;
    color: #2e6eb4;
    cursor:pointer;
    .file {
      text-decoration: underline;
      margin-right: .5rem;
    }
  }
  .htmlStyle{
    height:50vh;
    overflow: auto;
  }
</style>
