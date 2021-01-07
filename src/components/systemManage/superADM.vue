<template>
  <div class="list-main">
    <div class="list-main-top flexBtw">
      <span></span>
      <span class="pc-button" @click="save"><i class="iconfont icon-baocun"></i>保存</span>
    </div>
    <div class="list-main-body">
      <div class="list-head" @click="toggle1=!toggle1">
        <div><i class="iconfont icon-jiantou themeColor" v-show="toggle1==true"></i><i class="iconfont icon-jiantou1 themeColor"
            v-show="toggle1==false"></i>客户信息</div>
        <div>
        </div>
      </div>
      <transition name="t1">
        <div v-show="toggle1==true">
          <div class="width50 textInput"><span class="label"><span class="icon-xing">*</span>医院名称</span><input class='pc-input middleInput'
              v-model="name1" /></div>
          <div class="width50 textInput"><span class="label">显示名</span><input class='pc-input' v-model="name2" /></div>
        </div>
      </transition>
      <div class="list-head" @click="toggle2=!toggle2">
        <div><i class="iconfont icon-jiantou themeColor" v-show="toggle2==true"></i><i class="iconfont icon-jiantou1 themeColor"
            v-show="toggle2==false"></i>医院管理员</div>
        <div>
        </div>
      </div>
      <transition name="t1">
        <div v-show="toggle2==true">
          <span class="label"><span class="icon-xing">*</span>账号</span><input class='pc-input ' v-model="userName" />
          <span class="label"><span class="icon-xing">*</span>密码</span><input class='pc-input ' v-model="password" />
          <span class="pc-button buttonNoback" @click="getPassword">一键生成</span>
        </div>
      </transition>
      <div class="list-head" @click="toggle3=!toggle3">
        <div><i class="iconfont icon-jiantou themeColor" v-show="toggle3==true"></i><i class="iconfont icon-jiantou1 themeColor"
            v-show="toggle3==false"></i>上传logo</div>
        <div>
        </div>
      </div>
      <transition name="t1">
        <div v-show="toggle3==true" class="flex view">
          <div class="view1 flex1">
            <span class="label verTop marginR2Rem"><span class="icon-xing">*</span>上传图片</span>
            <a-upload name="avatar" list-type="picture-card" class="avatar-uploader" :show-upload-list="false"
              :customRequest="upload" :before-upload="beforeUpload" @change="handleChange">
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width:100%" />
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">
                  上传图片
                </div>
              </div>
            </a-upload>
            <span class="pc-button buttonNoback verTop" @click="deletePicture">删除</span>
          </div>
          <div class="flex1 view2">
            <!--  <span class="label verTop">展示预览</span>
         <span class="preview"><img src="../../assets/img/background_easy.png"/></span>
         <span class="pc-button buttonNoback verBottom">确认效果</span> -->
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'fileDetail',
    components: {},
    data() {
      return {
        toggle1: true,
        toggle2: true,
        toggle3: true,
        imageUrl: '',
        loading: false,
        name1: '',
        name2: '',
        userName: '',
        password: ''
      }
    },
    created() {
      this.queryInfo();
    },
    methods: {
      deletePicture(){
        this.imageUrl='';
      },
      queryInfo() {
        let url = '/api/SystemConfig/hospitalAdmin';
        utils.request.get(url, {}, true).then((res) => {
          if (res) {
            if (res.success == true) {
              let result = res.result;
              this.name1 = result.hospitalName;
              this.name2 = result.displayName;
              this.userName = result.account;
              this.password = result.password;
              this.imageUrl = result.logoPath;
            } else {
              utils.box.toast(res.error.message);
            }
          }
        })
      },
      getPassword() {
        let url = '/api/SystemConfig/password';
        utils.request.get(url, {}, true).then((res) => {
          if (res) {
            if (res.success == true) {
              this.password = res.result;
            } else {
              utils.box.toast(res.error.message);
            }
          }
        })

      },

      save() {
        if (this.check()) {
          let url = "/api/SystemConfig/initialization";
          let params = {
            "hospitalName": this.name1,
            "logoPath": this.imageUrl,
            "displayName": this.name2,
            "account": this.userName,
            "password": this.password
          }
          utils.request.put(url, params, true).then((res) => {
            if (res) {
              if (res.success == true) {
                utils.box.toast("配置成功", 'success');
              } else {
                utils.box.toast(res.error.message);
              }
            }
          })
        }
      },
      check() {
        if (this.name1 == '') {
          utils.box.toast('请输入医院名称');
          return false;
        }
        if (this.userName == '') {
          utils.box.toast('请输入账号');
          return false;
        }
        if (this.password == '') {
          utils.box.toast('请输入密码');
          return false;
        }
        /*  if (this.imageUrl == '') {
            utils.box.toast('请上传图片');
            return false;
          } */
        return true;
      },
      goBack() {
        this.$router.go(-1);
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
      upload(item) {
        let url = "/api/Employee/uploadAttachment?type=1";
        const form = new FormData();
        // 文件对象
        form.append("file", item.file);
        // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
        // form.append("clientType", 'xxx');
        utils.request.post(url, form, {
          headers: {
            "content-type": "multipart/form-data"
          }
        }).then((res) => {
          this.loading = false;
          if (res) {
            if (res.success == true) {
              utils.box.toast("上传成功", "success");
              //this.staffInfo.photo=res.result[0].id;
              this.imageUrl = res.result[0].path;
            } else {
              //  item.onSuccess(res, item.file);
              utils.box.toast("上传失败");
            }
          } else {
            //  item.onSuccess(res, item.file);
            utils.box.toast("上传失败");
          }
        });
      },

    }
  };
</script>

<style lang="less" scoped>
  .list-main {
    height: 100%;
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
    }
  }

  .preview {
    margin: 0 .2rem;

    img {
      max-width: 1rem;
    }
  }

  .view {
    margin-top: 5vh;
    height: 1.5rem;
  }

  .view1 {
    //border-right:1px dashed #707070;
  }

  .view2 {
    height: 1.5rem;
  }
</style>
