<template>
  <div class="list-main">
  <div class="list-main-top flexBtw">
    <span></span>
  <span class="pc-button"><i class="iconfont icon-jiahao"></i>确认新建</span>
  </div>
  <div class="list-main-body">
  <div class="list-head" @click="toggle1=!toggle1">
    <div><i class="iconfont icon-jiantou themeColor" v-show="toggle1==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle1==false"></i>客户信息</div>
    <div>
      </div>
    </div>
    <transition name="t1">
   <div v-show="toggle1==true">
       <div class="width50 textInput"><span class="label"><span class="icon-xing">*</span>医院名称</span><input class='pc-input middleInput'  v-model="name1"/></div>
       <div class="width50 textInput"><span class="label"><span class="icon-xing">*</span>显示名</span><select  class='pc-input middleInput' ></select></div>
   </div>
   </transition>
   <div class="list-head" @click="toggle2=!toggle2">
     <div><i class="iconfont icon-jiantou themeColor" v-show="toggle2==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle2==false"></i>医院管理员</div>
     <div>
       </div>
     </div>
     <transition name="t1">
    <div v-show="toggle2==true">
      <span class="label"><span class="icon-xing">*</span>账号</span><input class='pc-input '  />
      <span class="label"><span class="icon-xing">*</span>密码</span><input class='pc-input '  />
    </div>
    </transition>
   <div class="list-head" @click="toggle3=!toggle3">
     <div><i class="iconfont icon-jiantou themeColor" v-show="toggle3==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle3==false"></i>上传logo</div>
     <div>
       </div>
     </div>
     <transition name="t1">
    <div v-show="toggle3==true" class="flex view">
       <div class="view1 flex1">
        <span class="label verTop marginR2Rem"><span class="icon-xing">*</span>上传图片</span>
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
         </div>
         <div class="flex1 view2">
         <span class="label verTop">展示预览</span>
         <span class="preview"><img src="../../assets/img/background_easy.png"/></span>
         <span class="pc-button buttonNoback verBottom">确认效果</span>
         </div>
    </div>
    </transition>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'fileDetail',
    components:{},
    data() {
      return{
      toggle1:true,
      toggle2:true,
      toggle3:true
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1);
      }
    }
  };

</script>

<style lang="less" scoped>
  .list-main{
    height:100%;
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
  margin:0 .2rem;
  img{max-width: 1rem;}
}
.view{
  margin-top:5vh;
  height:1.5rem;
}
.view1{
  border-right:1px dashed #707070;
}
.view2{
  height:1.5rem;
}
</style>
