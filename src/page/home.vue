<template>
  <a-layout id="components-layout-demo-custom-trigger" >
    <a-layout-sider :trigger="null" theme="light" class="container">
     <div class="menuLogo"><img src="../assets/img/logo_white.png"/></div>
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']"  class="leftMenu">
        <a-menu-item  @click="toUrl('myTask')" >
         <i class="iconfont icon-renwu font16"></i>
        <span>我的任务</span>
        </a-menu-item>
        <a-sub-menu :key="'menu'+index" v-for="(obj,index) in menuList" style="background:none;" >
                   <span slot="title"><i :class="['iconfont','font16',obj.icon]"></i>{{obj.name}}</span>
                   <a-menu-item :key="'subMenu'+index+index1" v-for="(obj1,index1) in obj.subMenuList" @click="toUrl(obj1.url)" style="background:none;">
                     {{obj1.name}}
                   </a-menu-item>
        </a-sub-menu>

      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="pc-header">
          <div class="pc-header-one"></div>
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
      <transition name="t1">
        <router-view></router-view>
      </transition>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
   transitionName:'',
   menuList: [{name:'文件管理',icon:'icon-wenjian',url:'',subMenuList:[{name:'文档中心',url:'fileList'}]},
             {name:'培训管理',icon:'icon-kejipeixun',url:'',subMenuList:[{name:'培训考核管理',url:''},{name:'题库管理',url:''},{name:'培训分类',url:''},{name:'参与培训考核',url:''}]},
             {name:'人员管理',icon:'icon-renyuan',url:'',subMenuList:[{name:'人员信息',url:'staffInfo'},{name:'权限分配',url:'managePower'}]},
             ]
    };
  },

  methods:{
    toUrl(url){
      this.$router.push({path:url,query:{}})
    },
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
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.ant-menu-dark .ant-menu-inline.ant-menu-sub{background: none;box-shadow: none;}
.menuLogo{
      text-align: center;
      margin: 0.1rem 0 0.3rem 0;
    img{width:.6rem}
}

.pc-header{
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  padding:0 16px;
  &-one{
    color: #2e6eb4;
    &>span:nth-child(1){font-size:.18rem;color: #2e6eb4;font-weight:700;margin-right:.1rem}
  }
  &-two{

  }
}

.t1-enter-active {transition: all 0.3s ease;}
.t1-leave-active {transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
.t1-enter, .t1-leave-to{transform: translateX(10px);opacity: 0;}

/*菜单样式*/
.container{background: url(../assets/img/leftBackground.png);}
.leftMenu{background: none;color:#fff;}


</style>
