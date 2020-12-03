<template>
  <div class="list-main">
  <div class="list-main-top">
    <span class="backButton" @click="goBack"><i class="iconfont icon-fanhui"></i><span>返回上一级</span></span>
    <div>
      <span class="pc-button" v-show="flag==1"><i class="iconfont icon-baocun"></i>保存</span>
      <span class="pc-button buttonNoback" v-show="flag==2"><i class="iconfont icon-tubiao09"></i>修改</span>
      </div>
  </div>
  <div class="list-main-body">
    <div class="list-head" @click="toggle1=toggle1==true?false:true">
      <div><i class="iconfont icon-jiantou themeColor" v-show="toggle1==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle1==false"></i>基本信息</div>
      </div>
      <transition name="t1">
     <div v-show="toggle1==true">
         <table class="table">
           <tr>
             <td><div class=" textInput"><span class="label font12 weight600">在职状态</span><input class='pc-input' readonly="true"/></div></td>
             <td><div class=" textInput"><span class="label font12 weight600">工号</span><input class='pc-input' /></div></td>
             <td  rowspan="4">
               <div></div>
             </td>
           </tr>
            <tr>
            <td><div class=" textInput"><span class="label font12 weight600">姓名</span><input class='pc-input' /></div></td>
             <td><div class=" textInput"><span class="label font12 weight600">出生日期</span><input class='pc-input' /></div></td>
             <td></td></tr>
             <tr>
               <td><div class=" textInput"><span class="label font12 weight600">年龄</span><input class='pc-input' /></div></td>
               <td><div class=" textInput"><span class="label font12 weight600">性别</span>
               <a-radio-group name="radioGroup" :default-value="1"><a-radio :value="1"> 男</a-radio><a-radio :value="2"> 女</a-radio></a-radio-group>
               </div>
               </td>
               <td></td>
             </tr>
             <tr>
               <td><div class=" textInput"><span class="label font12 weight600">部门</span><input class='pc-input' /></div></td>
               <td><div class=" textInput"><span class="label font12 weight600">职称</span><input class='pc-input'/></div></td>
               <td></td>
             </tr>
             <tr>
               <td><div class=" textInput"><span class="label font12 weight600">获得职称时间</span><input class='pc-input'/></div></td>
               <td><div class=" textInput"><span class="label font12 weight600">职务</span><input class='pc-input'/></div></td>
               <td><div class=" textInput"><span class="label font12 weight600">工作年限</span><input class='pc-input' /></div></td>
             </tr>
             <tr>
               <td><div class=" textInput"><span class="label font12 weight600">参加工作时间</span><input class='pc-input'/></div></td>
               <td><div class=" textInput"><span class="label font12 weight600">科室工作时间</span><input class='pc-input'/></div></td>
               <td><div class=" textInput"><span class="label font12 weight600">手机短号</span><input class='pc-input'/></div></td>
             </tr>
             <tr>
               <td><div class=" textInput"><span class="label font12 weight600">微信号</span><input class='pc-input'/></div></td>
               <td><div class=" textInput"><span class="label font12 weight600">手机长号</span><input class='pc-input'/></div></td>
               <td></td>
             </tr>
         </table>
       <div class="list-head" @click="toggle11=toggle11==true?false:true">
         <div><i class="iconfont icon-jiantou themeColor" v-show="toggle11==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle11==false"></i>更多信息</div>
         </div>
         <transition name="t1">
             <table class="table" v-show="toggle11==true">
               <tr>
                 <td><div class=" textInput"><span class="label font12 weight600">身份证号</span><input class='pc-input' readonly="true"/></div></td>
                 <td><div class=" textInput"><span class="label font12 weight600">学历</span><input class='pc-input' /></div></td>
                 <td><div class=" textInput"><span class="label font12 weight600">籍贯</span><input class='pc-input' /></div></td>
               </tr>
                <tr>
                <td><div class=" textInput"><span class="label font12 weight600">民族</span><input class='pc-input' /></div></td>
                 <td><div class=" textInput"><span class="label font12 weight600">婚姻状况</span><a-radio-group name="radioGroup1" :default-value="0" @change="onChange"><a-radio :value="0"> 未知</a-radio><a-radio :value="1"> 已婚</a-radio><a-radio :value="2"> 未婚</a-radio></a-radio-group>
                 </div>
                 </td>
                 <td><div class=" textInput"><span class="label font12 weight600">政治面貌</span><input class='pc-input' /></div></td>
                 </tr>
                 <tr>
                   <td><div class=" textInput"><span class="label font12 weight600">现居地址</span><input class='pc-input'/></div></td>
                   <td><div class=" textInput"><span class="label font12 weight600">毕业院校</span><input class='pc-input'/></div></td>
                   <td><div class=" textInput"><span class="label font12 weight600">专业</span><input class='pc-input' /></div></td>
                 </tr>
                 <tr>
                   <td><div class=" textInput"><span class="label font12 weight600">学位</span><input class='pc-input'/></div></td>
                   <td><div class=" textInput"><span class="label font12 weight600">毕业时间</span><input class='pc-input'/></div></td>
                   <td><div class=" textInput"><span class="label font12 weight600">邮箱</span><input class='pc-input'/></div></td>
                 </tr>
             </table>
             </transition>
       </div>
       </transition>
     <div class="list-head">
       <div><i class="iconfont icon-jiantou themeColor"></i></div>
       <div>
         </div>
     </div>
    <div class="marginT1VH">

    </div>
    <div class="list-head">
       <div><i class="iconfont icon-jiantou themeColor"></i></div>
       <div>
         </div>
       </div>
    <div class="marginT1VH">
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'editStaff',
    components:{},
    data() {
      return{
        toggle1:true,
        toggle11:false,
        toggle2:false,
       flag:1 //1:新增 2：修改
      }
    },
    created(){
      this.flag=this.$route.query.flag;
    },
    methods:{
      goBack(){
        this.$router.go(-1);
      },
         onChange(e) {
            console.log(e.target.value);
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
      margin-top:.2rem;
      height:72vh;
      overflow: auto;
    }
  }
.table{width:100%;

}

.t1-enter-active {transition: all .5s ease;}
.t1-leave-active {transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
.t1-enter, .t1-leave-to{transform: translateX(5px);opacity: 0;}

</style>
