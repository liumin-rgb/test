<template>
  <div class="list-main">
  <div class="list-main-top">
    <span class="backButton" @click="goBack"><i class="iconfont icon-fanhui"></i><span>返回上一级</span></span>
   <span class="pc-button" v-show="flag=='add'||flag=='edit'" @click="saveInfo"><i class="iconfont icon-baocun"></i>保存</span>
  </div>
  <div class="list-main-body">
    <div class="list-head" @click="toggle=!toggle">
      <div><i class="iconfont icon-jiantou themeColor" v-show="toggle==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle==false"></i>{{basicInfo}}</div>
      </div>
      <transition name="t1">
     <div v-show="toggle==true">
         <table class="table">
           <tr>
             <td><div class=" textInput"><span class="label font12 weight600"><span class="icon-xing">*</span>仪器编号</span><input :class="['pc-input',pageFrom=='personal'?'backGray borderGray':'']" v-model="staffInfo.employeeNo"  :readonly="pageFrom=='personal'?'readonly':false" maxlength="36"/></div></td>
             <td><div class=" textInput"><span class="label font12 weight600"><span class="icon-xing">*</span>仪器名称</span><input :class="['pc-input',pageFrom=='personal'?'backGray borderGray':'']" v-model="staffInfo.employeeNo"  :readonly="pageFrom=='personal'?'readonly':false" maxlength="36"/></div></td>
             <td><div class=" textInput"><span class="label font12 weight600"><span class="icon-xing">*</span>制造厂商</span><input :class="['pc-input',pageFrom=='personal'?'backGray borderGray':'']" v-model="staffInfo.employeeNo"  :readonly="pageFrom=='personal'?'readonly':false" maxlength="36"/></div></td>
           </tr>
           <tr>
               <td><div class=" textInput"><span class="label font12 weight600">仪器分类</span><input class='pc-input'  v-model="staffInfo.position" maxlength="36"/></div></td>
               <td><div class=" textInput"><span class="label font12 weight600">设备价值</span><input class='pc-input'  v-model="staffInfo.positionDate" maxlength="36"/><span>(万元)</span></div></td>
               <td><div class=" textInput"><span class="label font12 weight600">资产编号</span><input class='pc-input'  v-model="staffInfo.post" maxlength="36"/></div></td>
             </tr>
             <tr>
               <td><div class=" textInput"><span class="label font12 weight600" ref="workingDate">使用部门</span><input class='pc-input'  v-model="staffInfo.position" maxlength="36"/></div></td>
               <td><div class=" textInput"><span class="label font12 weight600" ref="officeWorkingDate">仪器位置</span><input class='pc-input'  v-model="staffInfo.position" maxlength="36"/></div></td>
             </tr>
             <tr>
               <td><div class=" textInput"><span class="label font12 weight600">设备状态</span><input class='pc-input'  v-model="staffInfo.Wechat" maxlength="36"/></div></td>
               <td><div class=" textInput"><span class="label font12 weight600">设备负责人</span><input class='pc-input'  v-model="staffInfo.mobile" maxlength="36"/></div></td>
               <td><div class=" textInput"><span class="label font12 weight600">负责人电话</span><input class='pc-input ' v-model="staffInfo.shortMobile" maxlength="36"/></div></td>
             </tr>
             <tr>
               <td><div class=" textInput"><span class="label font12 weight600">到货日期</span><el-date-picker  v-model="staffInfo.graduationDate" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" ></el-date-picker></div></td>
               <td><div class=" textInput"><span class="label font12 weight600">启用日期</span><el-date-picker  v-model="staffInfo.graduationDate" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" ></el-date-picker></div></td>
               <td><div class=" textInput"><span class="label font12 weight600">登记日期</span><el-date-picker  v-model="staffInfo.graduationDate" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" ></el-date-picker></div></td>
             </tr>
             <tr>
               <td><div class=" textInput"><span class="label font12 weight600">国食药监域准字</span><input class='pc-input'  v-model="staffInfo.Wechat" maxlength="36"/></div></td>
               <td><div class=" textInput"><span class="label font12 weight600 verTop" ref="departments">备注</span><input class='pc-input'  v-model="staffInfo.mobile" maxlength="36"/></div></td>
             </tr>
         </table>
       <div class="list-head" style="margin-left:2vw" @click="toggle11=toggle11==true?false:true">
         <div><i class="iconfont icon-jiantou themeColor" v-show="toggle11==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle11==false"></i>供应商信息</div>
         </div>
         <transition name="t1">
             <table class="table " v-show="toggle11==true">
               <tr>
                 <td><div class=" textInput"><span class="label font12 weight600">供应商证件</span><span data-v-38740d0e="" class="pc-button">上传附件</span></div></td>
                 <td><div class=" textInput"><span class="label font12 weight600">操作手册</span><span data-v-38740d0e="" class="pc-button">上传附件</span></div></td>
               </tr>
              <tr>
                <td><div class=" textInput"><span class="label font12 weight600">投入运行时间</span><el-date-picker  v-model="staffInfo.graduationDate" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" ></el-date-picker></div></td>
                <td><div class=" textInput"><span class="label font12 weight600">维修期</span><el-date-picker  v-model="staffInfo.graduationDate" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" ><span>-</span></el-date-picker><el-date-picker  v-model="staffInfo.graduationDate" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" ></el-date-picker></div></td>
              </tr>
             </table>
          </transition>
        <div class="list-head" style="margin-left:2vw" @click="toggle3=toggle3==true?false:true">
         <div><i class="iconfont icon-jiantou themeColor" v-show="toggle3==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle3==false"></i>采购申请信息</div>
        </div>
         <transition name="t1">
             <table class="table " v-show="toggle3==true">
               <tr>
                 <td><div class=" textInput"><span class="label font12 weight600">采购申请附件</span><span  class="pc-button">上传附件</span></div></td>
               </tr>
              <tr>
                <td><div class=" textInput"><span class="label font12 weight600">采购日期</span><el-date-picker  v-model="staffInfo.graduationDate" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" ></el-date-picker></div></td>
              </tr>
             </table>
        </transition>
        <div class="list-head" style="margin-left:2vw" @click="toggle4=toggle4==true?false:true">
         <div><i class="iconfont icon-jiantou themeColor" v-show="toggle4==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle4==false"></i>验收信息</div>
        </div>
         <transition name="t1">
             <table class="table " v-show="toggle4==true">
              <tr>
                <!-- <td><div class=" textInput"><span class="label font12 weight600"><span class="icon-xing">*</span>仪器编号</span><input :class="['pc-input',pageFrom=='personal'?'backGray borderGray':'']" v-model="staffInfo.employeeNo"  :readonly="pageFrom=='personal'?'readonly':false" maxlength="36"/></div></td> -->
                <td><div class=" textInput"><span class="label font12 weight600"><span class="icon-xing">*</span>验收依据</span><el-date-picker  v-model="staffInfo.graduationDate" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" ></el-date-picker></div></td>
                <td><div class=" textInput"><span class="label font12 weight600"><span class="icon-xing">*</span>验收部门</span><el-date-picker  v-model="staffInfo.graduationDate" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" > - </el-date-picker><el-date-picker  v-model="staffInfo.graduationDate" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" ></el-date-picker></div></td>
                <td><div class=" textInput"><span class="label font12 weight600"><span class="icon-xing">*</span>验收日期</span><el-date-picker  v-model="staffInfo.graduationDate" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" ></el-date-picker></div></td>
              </tr>
              <tr>
                 <td><div class=" textInput"><span class="label font12 weight600">验收人</span><input class='pc-input'   v-model="staffInfo.idCard" maxlength="36"/></div></td>
                 <td><div class=" textInput"><span class="label font12 weight600">医院设备统一编号</span><input class="pc-input" v-model="staffInfo.education" maxlength="36"></div></td>
              </tr>
              <tr>
                 <td><div class=" textInput"><span class="label font12 weight600">验收附件</span><span data-v-38740d0e="" class="pc-button">上传附件</span></div></td>
              </tr>
             </table>
             </transition>
       <div class="list-head" style="margin-left:2vw" @click="toggle2=toggle2==true?false:true">
         <div><i class="iconfont icon-jiantou themeColor" v-show="toggle2==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle2==false"></i>关联模板</div>
         </div>
         <transition name="t1">
             <table class="table " v-show="toggle2==true">
               <tr>
                 <td><div class=" textInput"><span class="label font12 weight600">关联模板</span><span data-v-38740d0e="" class="pc-button">上传附件</span></div></td>
               </tr>
              </table>
          </transition>
       </div>
       </transition>
  </div>
  </div>
</template>

<script>
  import Contract from "../editStaff/contract"
  import Experience from "../editStaff/experience"
  import Qualifications from"../editStaff/qualifications"
  import ContinueEducation from"../editStaff/continueEducation"
  import RewardPunish from"../editStaff/rewardPunish"
  import Teach from"../editStaff/teach"
  import PaperPublish from"../editStaff/paperPublish"
  import HealthStatus from"../editStaff/healthStatus"
  import ScientificResearch from"../editStaff/scientificResearch"
  import Certificate from"../editStaff/certificate"
  import AcademicConference from"../editStaff/academicConference"
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  export default {
    name: 'editStaff',
    components:{Contract,Experience,Qualifications,ContinueEducation,RewardPunish,Teach,PaperPublish,HealthStatus,ScientificResearch,Certificate,AcademicConference},
    data() {
      return{
        toggle:true,
        toggle11:false,
        toggle2:false,
          toggle3:false,
        toggle4:false,
        flag:'add' ,//add 添加 edit 编辑 check 查看
        loading: false,
        // imageUrl: '',
        // basicInfo:'基本信息',
        // tagList:[],
        // treemap:[],
      //  id:'',//员工id
       staffInfo:{
  "workingStatus": 1,
  "employeeNo": "",
  "name": "",
  "birthday": "",
  "age": "",
  "sex": 0,
  "departments": [],
  "position": "",
  "positionDate": "",
  "post": "",
  "seniority": "",
  "workingDate": "",
  "officeWorkingDate": "",
  "shortMobile": "",
  "Wechat": "",
  "mobile": "",
  "photo": "",
  "idCard": "",
  "education": 0,
  "native": "",
  "nation": "",
  "marriage": 0,
  "political": 0,
  "address": "",
  "graduated": "",
  "profession": "",
  "degree": "",
  "graduationDate": "",
  "email": "",
  "id": 0
},
 departments:[],
 pageFrom:'',
      }
    },
    created(){
      this.flag=this.$route.query.flag;
      this.id=this.$route.query.id||'';
      this.pageFrom=utils.cache.getSession("pageFrom");
      if(this.flag!='add'){
        this.queryBasicInfo();
        this.queryCategory();
      }
      this.queryDepartment();
    },
    methods:{
      queryBasicInfo(){  //查询基本信息
     let url="/api/Employee/"+this.id;
        utils.request.get(url).then((res) => {
          if(res){
             if(res.success==true){
               this.staffInfo=res.result||this.staffInfo;
               this.imageUrl=this.staffInfo.photoURL;
               this.queryDepartment();
             }else{
               utils.box.toast(res.error.message);
             }
          }
          })
      },
      queryDepartment(){
          let url="/api/Organization/treemap";
          utils.request.get(url).then((res) => {
          	if(res){
              if(res.success==true){
              let list=res.result;
              this.treemap=JSON.parse(JSON.stringify(list).replace(/name/g,"title").replace(/id/g,"key"));
               this.departments=[];
               this.forTree(this.treemap);
               console.log(this.treemap);
              }else{

              }
            }
            });
      },
      forTree(treeList){
        for(var i in treeList){
           treeList[i].value=treeList[i].key;
           if(this.staffInfo.departments.includes(treeList[i].key)){
             let obj={value:treeList[i].key,lable:treeList[i].title};
             this.departments.push(obj);
           }
          if(treeList[i].children){
            this.forTree(treeList[i].children);
          }
        }
      },
      saveInfo(){  //添加/修改
      this.staffInfo.departments=this.departments.map((item)=>{
        return item.value
      });
        let staffInfo=this.staffInfo;
        for(var key in  staffInfo){
          if(this.$refs[key]){
            if(this.$refs[key].firstChild.className=='icon-xing'){
              if(staffInfo[key]==''||staffInfo[key]==[]){
                let text=this.$refs[key].innerText.substr(1);
                utils.box.toast("请填写"+text);
                return;
              }
            }
          }
        }
        if(this.flag=='add'){
         let url="/api/Employee";
         let params=staffInfo;;
         utils.request.post(url,params,true).then((res) => {
           if(res){
            if(res.success==true){
              utils.box.toast("添加成功","success");
              this.$router.push({path:'managePower'});
            }else{
              utils.box.toast(res.error.message);
            }
           }
           })
        }else{
          let url="/api/Employee/"+this.id;
          let params=staffInfo;;
          utils.request.put(url,params,true).then((res) => {
            if(res){
              if(res.success==true){
                utils.box.toast("修改成功","success");
              }else{
                utils.box.toast(res.error.message);
              }
            }
            })
        }
      },
      queryCategory(){
        this.spinning=true;
        let url="/api/Employee/getEmployeeInfoSequence"
        utils.request.get(url).then((res) => {
          this.spinning=false;
          if(res){
            if(res.success==true){
              let tagList=res.result.employeeInfoList||[];//categoryList
              this.basicInfo=tagList[0].name||'基本信息';
              tagList.shift();
              tagList.forEach((item)=>{
                item.toggle=false;
              })
              this.tagList=tagList;
            }else{
                utils.box.toast(res.error.message);
            }
          }
        })
      },
      onChange(value){
        this.departments=value;
       /* value.map((item)=>{
          return item.value;
        }); */
        console.log(this.departments);
      },
      getSelectInfo(id){
          this.staffInfo[id]=utils.common.getSelectValue(id);
          console.log(this.staffInfo);
      },
          getRadioValue(e,id){
            this.staffInfo[id]=e.target.value;
          },
          getAge(val){
            this.staffInfo.age=utils.common.getAge(val);
          },
          getworkAge(val){
             this.staffInfo.seniority=utils.common.getAge(val);
          },
      handleChange(info) {
            if (info.file.status === 'uploading') {
              this.loading = true;
              return;
            }
            if (info.file.status === 'done') {
              // Get this url from response in real world.
              getBase64(info.file.originFileObj, imageUrl => {
                this.imageUrl = imageUrl;
                this.loading = false;
              });
            }
          },
          beforeUpload(file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
              this.$message.error('只能上传图片');
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
          /*  if (!isLt2M) {
              this.$message.error('图片需小于2MB');
            } */
            return isJpgOrPng;
          },
          upload(item){
           	 		let url = "/api/Employee/uploadAttachment?type=1";
           			 const form = new FormData();
           			   // 文件对象
           			  form.append("file", item.file);
           			  // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
           			// form.append("clientType", 'xxx');
           	 		utils.request.post(url,form,{headers: {"content-type": "multipart/form-data"}}).then((res) => {
           	 			this.loading=false;
                  if(res){
           	 			if (res.success == true) {
                    utils.box.toast("上传成功","success");
                     this.staffInfo.photo=res.result[0].id;
                     this.imageUrl=res.result[0].path;
           	 			} else {
                   //  item.onSuccess(res, item.file);
           	 				utils.box.toast("上传失败");
           	 			}
           	 			 }else{
                    //  item.onSuccess(res, item.file);
                     utils.box.toast("上传失败");
                   }
           	 		});
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
      margin-top:.1rem;
      height:78vh;
      overflow: auto;
    }
  }
.table{width:100%;

}
.label{width:.9rem;}

.t1-enter-active {transition: all .5s ease;}
.t1-leave-active {transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
.t1-enter, .t1-leave-to{transform: translateX(5px);opacity: 0;}

/deep/.ant-select-selection{
  overflow:auto !important;
}

/deep/.ant-upload.ant-upload-select-picture-card{
  width: 1.04rem;
  height: 1.2rem;
}
 /deep/.avatar-uploader > .ant-upload {
  width: 1.04rem;
  height: 1.2rem;
}
/deep/.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

/deep/.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
 /*时间控件*/
  /deep/.el-table th>.cell{padding-left:5px;padding-right:0;}
  /deep/.el-input__inner{height:.25rem;border: 1px solid #e4e4e4;}
  /deep/.el-input__icon{line-height: .25rem;}
  /deep/.el-date-editor.el-input, .el-date-editor.el-input__inner{width:1.5rem;margin: .02rem 0.1rem;/* box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.1) */}
  /deep/.el-input--suffix .el-input__inner{padding-right:0}
</style>
