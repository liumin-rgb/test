<template>
  <div class="list-main">
    <div class="textAlignR">
        <span class="pc-button"><i class="iconfont icon-jiahao"></i>确认新建</span>

    </div>
    <div class="list-main-body flexCol">
     <!-- <span><span class="label2">当前密码：</span><input class="pc-input bigInput" type="password" placeholder="请输入" autocomplete="off" /></span>
      <span class="marginT1VH"><span class="label2">设置新密码：</span><input class="pc-input bigInput" type="password" placeholder="请输入" autocomplete="off"/></span>
      <span class="marginT1VH"><span class="label2">确认新密码：</span><input class="pc-input bigInput" type="password" placeholder="请输入" autocomplete="off"/></span>
   --> </div>
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
      &-body{
        width:100%;
        margin-top:.1rem;
      }
    }
</style>
