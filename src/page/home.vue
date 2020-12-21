<template>
  <a-layout id="components-layout-demo-custom-trigger" style="min-height:100vh">
   <!-- <a-layout-sider  theme="light" class="container" v-model="collapsed" collapsible collapsedWidth="80px" :trigger="null" :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
     <div class="menuLogo"><img src="../assets/img/logo_white.png"/></div>
      <a-menu theme="dark" mode="inline"   class="leftMenu" >
        <a-menu-item  @click="toUrl('myTask')">
         <i class="iconfont icon-renwu font16"></i>
        <span v-show="collapsed==false">我的任务</span>
        </a-menu-item>
        <a-sub-menu :key="'menu'+index" v-for="(obj,index) in menuList" style="background:none;" >
                   <span slot="title"><i :class="['iconfont','font16',obj.icon]"></i><span v-show="collapsed==false"> {{obj.name}}</span></span>
                   <a-menu-item :key="'subMenu'+index+index1" v-for="(obj1,index1) in obj.subMenuList" @click="toUrl(obj1.url)" style="background:none;">
                     {{obj1.name}}
                   </a-menu-item>
        </a-sub-menu>

      </a-menu>
    </a-layout-sider> -->
    <div class="sider pointer" :style="{width:collapsed?'.6rem':'1.5rem'}">
    <div class="menuLogo"><img src="../assets/img/logo_white.png"/></div>
      <div class="menuLarge" v-show="!collapsed">
        <div class="menu" v-for="obj in menuList">
          <div :class="['menuitem',choosen==obj.name?'choosen':'']" @click="toggleMenu(obj)"><i :class="['iconfont', obj.icon]"></i><span :class="['title',choosen==obj.name?'weight600':'']">{{obj.name}}</span><i class="announce" v-show="obj.announce&&obj.announce!=0">{{obj.announce}}</i><i :class="['iconfont', obj.subMenuList.length==0?'':'icon-jiantouarrow483',obj.toggle?'rotate':'','angle']"></i></div>
          <div class="subMenuitem flexCol" v-show="obj.toggle==true">
            <span :class="['subTitle',choosen==obj1.name?'choosen':'']" v-for="obj1 in obj.subMenuList" @click="toUrl(obj1)">{{obj1.name}}</span>
          </div>
        </div>
      </div>
      <div class="menuSmall textAlignC" v-show="collapsed">
        <div v-for="obj in menuList" class="iconMneu" @click="toUrl1(obj)"><i :class="['iconfont',choosen==obj.name||obj.subMenuList.find(item=>item.name==choosen)?'font30':'font18',obj.icon]" ></i></div>
      </div>
    </div>

    <a-layout :style="{ marginLeft: collapsed?'.6rem':'1.5rem' }">
      <a-layout-header style="background: #fff; padding: 0">
        <div class="pc-header">
          <div class="pc-header-one" >
             <el-popover trigger="hover" placement="bottom">
               <div class="pointer themeColor">{{collapsed?'点击展开':'点击收起'}}</div>
               <span slot="reference">
               <a-icon
                        class="trigger"
                        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="() => (collapsed = !collapsed)"
                      />
               </span>
             </el-popover>

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
      <transition name="t1">
        <router-view></router-view>
      </transition>
      </a-layout-content>
    </a-layout>
    <ChangePassword  :visible="visible" @closeModel="closeModel"/>
  </a-layout>
</template>
<script>
  import ChangePassword from '../components/changePassword'
export default {
  components:{ChangePassword},
  data() {
    return {
   collapsed: false,
   transitionName:'',
   choosen:'',
   visible:false,
   menuList: [{name:'我的任务',icon:'icon-renwu',url:'myTask',announce:1,toggle:false,subMenuList:[]},
             {name:'文件管理',icon:'icon-wenjian',url:'',toggle:false,subMenuList:[{name:'文档中心',url:'fileList'}]},
             {name:'培训管理',icon:'icon-kejipeixun',url:'',toggle:false,subMenuList:[{name:'培训考核管理',url:'trainIndex'},{name:'题库管理',url:''},{name:'培训分类',url:''},{name:'参与培训考核',url:''}]},
             {name:'人员管理',icon:'icon-renyuan',url:'',toggle:false,subMenuList:[{name:'人员信息',url:'staffInfo'},{name:'权限分配',url:'managePower'}]},
             ]
    };
  },

 created(){
   this.choosen=utils.cache.getSession("choosen");
 },
  methods:{
    toUrl1(obj){
      let name='';
      let url='';
      if(obj.subMenuList.length==0){
        name=obj.name;
        url=obj.url;
      }else{
        name=obj.subMenuList[0].name;
        url=obj.subMenuList[0].url;
      }
      this.choosen=name;
      utils.cache.setSession("choosen",this.choosen);
      this.$router.push({path:url,query:{}})
    },
    toggleMenu(obj){
      if(obj.subMenuList.length==0){
        this.toUrl(obj);
        return;
      }
      obj.toggle=!obj.toggle;
      // utils.cache.setSession("toggle",this.obj.toggle);
    },
    toUrl(obj){
      this.choosen=obj.name;
      utils.cache.setSession("choosen",this.choosen);
      this.$router.push({path:obj.url,query:{}})
    },
    logout(){
      utils.cache.removeItem('TOKEN');
      this.$router.push({path: 'login'});
    },
    setting(){
      this.visible=true;
     //this.$router.push({path: 'changePassword'});
    },
    closeModel(){
      this.visible=false;
    }
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
#components-layout-demo-custom-trigger .trigger {
  font-size: 24px;
  line-height: 64px;
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
.menuLogo{
      text-align: center;
      margin: 0.1rem 0 0.3rem 0;
    img{width:.5rem}
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
.ant-menu-dark .ant-menu-inline.ant-menu-sub{background: none !important;box-shadow: none !important;}
.container{background: url(../assets/img/leftBackground.png) !important;}
.leftMenu{background: none !important;color:#fff !important;}

/*
侧边栏菜单
*/
.sider{
  height:100vh;
  position: fixed;
  left:0;
  overflow: auto;
  width:0.6rem;
  background: url(../assets/img/leftBackground.png) no-repeat;
  color:#fff;
}

.menuLarge{
  margin-top:.4rem;
  .menu{
   // padding:.1rem;
    .menuitem{
      padding:.1rem 0.1rem;
      .title{margin:0 0.2rem 0 0.05rem;}
    }
    .subMenuitem{
    .subTitle{
      padding:.08rem 0 0.08rem 0.4rem;

    }
    }
  }

}
.choosen{
  background:#fff !important;
  color:#2e6eb4 !important;
  font-weight: 600 !important;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  margin-left:.1rem;
}
.menuSmall{
  .iconMneu{
     padding:.1rem 0.1rem;
  }
}
.angle{
   transition:all 2s;
}

.rotate:before{
 transform:rotateX(180deg);
  transition: 0.8s;
  /* animation: ani 0.5s infinite;
  -moz-animation: ani 0.5 infinite;
  -webkit-animation: ani 0.5 infinite;
  -o-animation: ani 0.5 infinite; */
  display: inline-block;

}


@keyframes ani{
  from {transform:rotateX(0deg);}
  to {transform:rotateX(180deg);}
}
@-moz-keyframes ani{
  from {transform:rotateX(0deg);}
  to {transform:rotateX(180deg);}
}
@-webkit-keyframes ani{
  from {transform:rotateX(0deg);}
  to {transform:rotateX(180deg);}
}

@-o-keyframes ani{
  from {transform:rotateX(0deg);}
  to {transform:rotateX(180deg);}
}

.announce{
  width:.15rem;
  height:.15rem;
  border-radius: 20px;
  background: #af1e2b;
  color:#fff;
  font-size:.12rem;
  display: inline-block;
  text-align: center;
  line-height: .15rem;
}

</style>
