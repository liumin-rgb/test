<template>
  <div class="list-main">
    <span class="backButton" @click="goBack"><i class="iconfont icon-fanhui"></i><span>返回上一级</span></span>
  <div class="list-main-top marginT2VH">
       <div><span>考核名称：</span><span>考核时长：30分钟</span></div>
       <div>
         <span>倒计时：00:30:00</span>
         <span class="pc-button buttonNoback">保存进度</span>
          <span class="pc-button buttonNoback">暂停答题</span>
          <span class="pc-button">重新答题</span>
         </div>
    </div>

  <div class="list-main-body">
   <div class="block">
    <span>1.(多选)以下哪些定义为危险化学品</span>
    <div>
      <span>A.聚乙烯</span>
      <span>B.聚丙烯</span>
      <span>C.乙醇</span>
    </div>
   </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'examine',
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
      padding:.1rem;
      overflow:auto;
    }
  }
.block{
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
  padding:.1rem;
}


</style>
