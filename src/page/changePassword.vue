<template>
  <div class="list-main">
    <div class="list-main-top">
      <span class="backButton" @click="goBack"><i class="iconfont icon-fanhui"></i><span>返回上一级</span></span>
      <div>
        <span class="pc-button">确认修改</span>
        </div>
    </div>
    <div class="list-main-body flexCol">
     <span><span class="label2">当前密码：</span><input class="pc-input bigInput" type="password" placeholder="请输入" autocomplete="off" /></span>
      <span class="marginT1VH"><span class="label2">设置新密码：</span><input class="pc-input bigInput" type="password" placeholder="请输入" autocomplete="off"/></span>
      <span class="marginT1VH"><span class="label2">确认新密码：</span><input class="pc-input bigInput" type="password" placeholder="请输入" autocomplete="off"/></span>
    </div>
  </div>

</template>

<script>
  export default {
    name:'changePassword',
    data() {
      return {

      };
    },
    methods:{
   goBack(){
     this.$router.go(-1);
   },
    }
  }
</script>

<style lang="less" scoped="">
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
        margin-top:.1rem;
      }
    }
</style>
