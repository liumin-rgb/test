<template>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="pc-header">
          <div class="pc-header-one"><img src="../assets/img/logo_blue.png"></div>
          <div class="pc-header-two">
            <span class="color999 font16 verTop">系统管理员</span>
            <i class="iconfont icon-tuichu2 font30 themeColor pointer" @click="logout"></i>
             <i class="iconfont icon-mima font30 themeColor pointer" @click="set"></i>
            </div>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '.14rem .14rem',minHeight: '2.8rem' }"
      >
      <transition name="fadeLeft">
        <router-view></router-view>
      </transition>
      </a-layout-content>
    </a-layout>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods:{
    logout(){
      utils.cache.removeItem('TOKEN');
      this.$router.push({path: 'login'});
    },
    set(){
     this.$router.push({path: 'changePassword'});
    },
  }
}
</script>
<style  lang="less">
  body>div{
     height: 100%;
      }
  .ant-layout{
     height: 100%;
      }


.pc-header{
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  padding:0 16px;
  &-one{
    color: #2e6eb4;
   img{width:.6rem;}
  }
  &-two{

  }
}

</style>
