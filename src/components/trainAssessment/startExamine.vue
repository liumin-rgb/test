<template>
  <div class="list-main">
    <span class="backButton" @click="goBack"><i class="iconfont icon-fanhui"></i><span>返回上一级</span></span>
  <div class="list-main-top marginT2VH">
       <div><span>考核名称：</span><span>考核时长：30分钟</span></div>
       <span>倒计时：00:30:00</span>
    </div>

  <div class="list-main-body">
   <span class="block flexAround">
   <!-- <span class="flexCol">
      <img src="../../assets/img/exit.png"/>
      <span class="themeColor marginT1VH">退出答题</span>
   </span> -->
   <span class="flexCol">
      <img src="../../assets/img/start.png"/>
      <span class="themeColor marginT1VH">开始答题</span>
   </span>
  <!-- <span class="flexCol">
      <img src="../../assets/img/restart.png"/>
      <span class="themeColor marginT1VH">继续答题</span>
   </span> -->
   </span>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'fileDetail',
    components:{},
    data() {
      return{

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
      position:relative;
      height:70vh;
    }
  }
.block{
  width: 3rem;
  height: 1.5rem;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
  padding:.2rem;
  position: absolute;
  left:50%;
  top:50%;
  transform:translate(-60%,-50%);
}
.block img{
  height:.6rem;
}

</style>
