<template>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="pc-header">
          <div class="pc-header-one" >
           <img src="../assets/img/logo_blue.png"/>
           <span class="font16 themeColor">{{title}}</span>
          </div>
          <div class="pc-header-two flex">
            <span><img src="../assets/img/background_easy.png" class="headerImg"/></span>
            <div class="color999  flexCol headerUser"><span>Liza<br>系统管理员</span></div>
            <el-popover trigger="hover" placement="bottom">
              <div class="pointer themeColor weight600 font12">
              <p @click="setting"><i class="iconfont icon-mima"></i>修改密码</p>
              <p @click="logout"><i class="iconfont icon-tuichu2"></i>退出</p>
              </div>
              <i class="iconfont icon-kaishi1 font16  pointer color999" slot="reference"></i>
            </el-popover>
        <!--   <i class="iconfont icon-mima font20 themeColor pointer" @click="setting"></i> -->
           <!-- <i class="iconfont icon-mima font20 themeColor pointer" @click="setting"></i>
            <i class="iconfont icon-tuichu2 font20 themeColor pointer" @click="logout"></i> -->
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
    return {
      title:'创建医院管理员'
    };
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
  body>div:nth-child(1){
     height: 100%;
      }
  .ant-layout{
     height: 100%;
      }
  .headerImg{
    width:.3rem;
    height:.3rem;
    border-radius: .3rem;
    margin-right:.1rem;
      }
  .headerUser{
     text-align: center;
     font-size: .1rem;
     line-height: .15rem;
     margin-top:.1rem;
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
