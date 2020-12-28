<template>
  <div class="list-main">
  <div class="list-main-top">
    <span class="backButton" @click="goBack"><i class="iconfont icon-fanhui"></i><span>返回上一级</span></span>
   <span class="pc-button" v-show="flag=='add'||flag=='edit'" @click="saveInfo"><i class="iconfont icon-baocun"></i>保存</span>
   <!-- <div>
      <span class="pc-button" v-show="flag==1"><i class="iconfont icon-baocun"></i>保存</span>
      <span class="pc-button buttonNoback" v-show="flag==2"><i class="iconfont icon-tubiao09"></i>修改</span>
      </div> -->
  </div>
  <div class="list-main-body">
    <div class="list-head" @click="toggle=!toggle">
      <div><i class="iconfont icon-jiantou themeColor" v-show="toggle==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle==false"></i>{{basicInfo}}</div>
      </div>
      <transition name="t1">
     <div v-show="toggle==true">
      <!-- <div class="textAlignR">
          <span class="pc-button" v-show="flag=='add'||flag=='edit'" @click="saveInfo"><i class="iconfont icon-baocun"></i>保存</span>
       </div> -->
         <table class="table">
           <tr>
             <td><div class=" textInput"><span class="label font12 weight600">在职状态</span><input class="pc-input backGray borderGray" v-model="staffInfo.workingStatus==1?'在职':'离职'" readonly="readonly" /></div></td>
             <td><div class=" textInput"><span class="label font12 weight600"><span class="icon-xing">*</span>工号</span><input class="pc-input" v-model="staffInfo.employeeNo" /></div></td>
             <td  rowspan="4" class="center">
                 <a-upload
                     name="avatar"
                     list-type="picture-card"
                     class="avatar-uploader"
                     :show-upload-list="false"
                      :customRequest="upload"
                     :before-upload="beforeUpload"
                     @change="handleChange"
                   >
                     <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width:100%"/>
                     <div v-else>
                       <a-icon :type="loading ? 'loading' : 'plus'" />
                       <div class="ant-upload-text">
                         上传图片
                       </div>
                     </div>
                   </a-upload>
             </td>
           </tr>
            <tr>
            <td><div class=" textInput"><span class="label font12 weight600" ref="name"><span class="icon-xing">*</span>姓名</span><input class='pc-input' v-model="staffInfo.name"/></div></td>
             <td><div class=" textInput"><span class="label font12 weight600" ref="birthday">出生日期</span><el-date-picker  v-model="staffInfo.birthday" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" @change="getAge"></el-date-picker></div></td>
             <td></td></tr>
             <tr>
               <td><div class=" textInput"><span class="label font12 weight600" ref="age">年龄</span><input class='pc-input smallInput backGray'  v-model="staffInfo.age" readonly="true"/></div></td>
               <td><div class=" textInput"><span class="label font12 weight600" ref="sex"><span class="icon-xing">*</span>性别</span>
               <a-radio-group name="radioGroup" v-model="staffInfo.sex" @change="getRadioValue($event,'sex')"><a-radio :value="1"> 男</a-radio><a-radio :value="2"> 女</a-radio></a-radio-group>
               </div>
               </td>
               <td></td>
             </tr>
             <tr>
               <td><div class="textInput"><span class="label font12 weight600" ref="department"><span class="icon-xing">*</span>部门</span><span><a-tree-select
                 v-model="department"
                 allow-clear
                 tree-checkable
                 multiple
                 size="small"
                 style="width:2rem;height:.25rem;margin: .02rem 0.1rem;"
                 @change="onChange"
                 :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                 :tree-data="treemap"
                 tree-default-expand-all
               >
               </a-tree-select>
               </span>
              <!-- <input class='pc-input'  v-model="staffInfo.department"/> -->
               </div></td>
               <td><div class=" textInput"><span class="label font12 weight600">职称</span><input class='pc-input'  v-model="staffInfo.position"/></div></td>
               <td></td>
             </tr>
             <tr>
               <td><div class=" textInput"><span class="label font12 weight600">获得职称时间</span><input class='pc-input'  v-model="staffInfo.positionDate"/></div></td>
               <td><div class=" textInput"><span class="label font12 weight600">职务</span><input class='pc-input'  v-model="staffInfo.post"/></div></td>
               <td></td>
             </tr>
             <tr>
               <td><div class=" textInput"><span class="label font12 weight600" ref="workingDate">参加工作时间</span><el-date-picker  v-model="staffInfo.workingDate" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" @change="getworkAge"></el-date-picker></div></td>
               <td><div class=" textInput"><span class="label font12 weight600" ref="officeWorkingDate">科室工作时间</span><el-date-picker  v-model="staffInfo.officeWorkingDate" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" ></el-date-picker></div></td>
               <td><div class=" textInput"><span class="label font12 weight600">工作年限</span><input class='pc-input smallInput backGray'  v-model="staffInfo.seniority"/></div></td>
             </tr>
             <tr>
               <td><div class=" textInput"><span class="label font12 weight600">微信号</span><input class='pc-input'  v-model="staffInfo.wechart"/></div></td>
               <td><div class=" textInput"><span class="label font12 weight600">手机长号</span><input class='pc-input'  v-model="staffInfo.mobile"/></div></td>
               <td><div class=" textInput"><span class="label font12 weight600">手机短号</span><input class='pc-input smallInput '  v-model="staffInfo.shortMobile"/></div></td>
             </tr>
         </table>
       <div class="list-head" style="margin-left:2vw" @click="toggle11=toggle11==true?false:true">
         <div><i class="iconfont icon-jiantou themeColor" v-show="toggle11==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle11==false"></i>更多信息</div>
         </div>
         <transition name="t1">
             <table class="table " v-show="toggle11==true">
               <tr>
                 <td><div class=" textInput"><span class="label font12 weight600">身份证号</span><input class='pc-input'   v-model="staffInfo.idCard"/></div></td>
                 <td><div class=" textInput"><span class="label font12 weight600">学历</span><select class="pc-input" v-model="staffInfo.education" @change="getSelectInfo('education')" id="education"><option v-for="obj in educationList" :value="obj.code" >{{obj.text}}</option></select></div></td>
                 <td><div class=" textInput"><span class="label font12 weight600">籍贯</span><input class='pc-input'  v-model="staffInfo.native"/></div></td>
               </tr>
                <tr>
                <td><div class=" textInput"><span class="label font12 weight600">民族</span><input class='pc-input' v-model="staffInfo.nation" /></div></td>
                 <td><div class=" textInput"><span class="label font12 weight600"><span class="icon-xing">*</span>婚姻状况</span><a-radio-group name="radioGroup1" v-model="staffInfo.marriage" @change="getRadioValue($event,'marriage')"><a-radio :value="0"> 未知</a-radio><a-radio :value="1"> 已婚</a-radio><a-radio :value="2"> 未婚</a-radio></a-radio-group>
                 </div>
                 </td>
                 <td><div class=" textInput"><span class="label font12 weight600">政治面貌</span><select class="pc-input" v-model="staffInfo.political"  @change="getSelectInfo('political')" id="political"><option v-for="obj in politicalList" :value="obj.code" >{{obj.text}}</option></select></div></td>
                 </tr>
                 <tr>
                   <td><div class=" textInput"><span class="label font12 weight600">现居地址</span><input class='pc-input' v-model="staffInfo.address"/></div></td>
                   <td><div class=" textInput"><span class="label font12 weight600">毕业院校</span><input class='pc-input'  v-model="staffInfo.graduated"/></div></td>
                   <td><div class=" textInput"><span class="label font12 weight600">专业</span><input class='pc-input'   v-model="staffInfo.profession"/></div></td>
                 </tr>
                 <tr>
                   <td><div class=" textInput"><span class="label font12 weight600">学位</span><input class='pc-input'  v-model="staffInfo.degree"/></div></td>
                   <td><div class=" textInput"><span class="label font12 weight600">毕业时间</span><el-date-picker  v-model="staffInfo.graduationDate" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择" ></el-date-picker></div></td>
                   <td><div class=" textInput"><span class="label font12 weight600">邮箱</span><input class='pc-input'  v-model="staffInfo.email"/></div></td>
                 </tr>
             </table>
             </transition>
       </div>
       </transition>
       <a-spin :spinning="spinning"  >
      <div v-for="(obj,index) in tagList">
     <div class="list-head" @click="obj.toggle=!obj.toggle">
      <div><i class="iconfont icon-jiantou themeColor" v-show="obj.toggle==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="obj.toggle==false"></i>{{obj.name}}</div>
       <div>
       </div>
     </div>
     <transition>
    <div class="marginT1VH" v-show="obj.toggle==true">
   <Contract v-if="obj.name=='合同履历'" :flag="flag" :info="obj" :staffId="id"/>
   <Experience v-if="obj.name=='工作经历'" :flag="flag"/>
   <Qualifications v-if="obj.name=='执业资格'" :flag="flag"/>
   <ContinueEducation v-if="obj.name=='继续教育'" :flag="flag"/>
   <RewardPunish v-if="obj.name=='奖罚信息'" :flag="flag"/>
    <Teach v-if="obj.name=='教学情况'" :flag="flag"/>
    <PaperPublish v-if="obj.name=='论文发表'" :flag="flag"/>
   <HealthStatus v-if="obj.name=='健康状况'" :flag="flag"/>
   <ScientificResearch v-if="obj.name=='科研课题'" :flag="flag"/>
    <Certificate v-if="obj.name=='培训证书'" :flag="flag"/>
    <AcademicConference v-if="obj.name=='学术会议'" :flag="flag"/>

    </div>
    </transition>
    </div>
    </a-spin>
<!--
    <div class="list-head">
       <div><i class="iconfont icon-jiantou themeColor"></i></div>
       <div>
         </div>
       </div>
    <div class="marginT1VH">
    </div> -->
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
        flag:'add' ,//add 添加 edit 编辑 check 查看
        loading: false,
        imageUrl: '',
        basicInfo:'基本信息',
        tagList:[],
        treemap:[],
        workStatusList:[{code:'0',text:'请选择'},{code:'1',text:'在职'},{code:'2',text:'离职'}],
        politicalList:[{code:'0',text:'请选择'},{code:'1',text:'党员'},{code:'2',text:'团员'},{code:'3',text:'群众'}],
        educationList:[{code:'0',text:'请选择'},{code:'1',text:'博士'},{code:'2',text:'硕士'},{code:'3',text:'本科'},{code:'4',text:'大专'},{code:'5',text:'中专'},{code:'6',text:'初中'}],
       spinning:false,
       id:'',//员工id
       staffInfo:{
  "workingStatus": 1,
  "employeeNo": "",
  "name": "",
  "birthday": "",
  "age": "",
  "sex": 0,
  "department": "",
  "position": "",
  "positionDate": "",
  "post": "",
  "seniority": "",
  "workingDate": "",
  "officeWorkingDate": "",
  "shortMobile": "",
  "wechart": "",
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
 department:[],
      }
    },
    created(){
      this.flag=this.$route.query.flag;
      this.id=this.$route.query.id||'';
      if(this.flag!='add'){
        this.queryBasicInfo();
        this.queryCategory();
      }
      this.queryDepartment();
    },
    methods:{
      queryBasicInfo(){  //查询基本信息
     let url="/api/Employee/"+this.id+"/Employee";
        utils.request.get(url).then((res) => {
          if(res){
             if(res.success==true){
               this.staffInfo=res.result||this.staffInfo;
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
               this.department=[];
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
           if(this.staffInfo.department.includes(treeList[i].key)){
             this.department.push(treeList[i].key);
           }
          if(treeList[i].children){
            this.forTree(treeList[i].children);
          }
        }
      },
      saveInfo(){  //添加/修改
      this.staffInfo.department=this.department;
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
         let url="/api/Employee/insertEmployee";
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
          let url="/api/Employee/updateEmployee";
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
        this.department= value;
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
                     this.photo=res.result[0].id;
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
