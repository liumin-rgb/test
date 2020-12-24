<template>
  <div class="list-main">
    <span class="backButton" @click="goBack"><i class="iconfont icon-fanhui"></i><span>返回上一级</span></span>
  <div class="list-main-top marginT2VH">
       <div><span>考核名称：</span><span>考核时长：30分钟</span></div>
       <div>
         <span>用时：00:24:00</span>
          <span class="pc-button" @click="restart">重新答题</span>
         </div>
    </div>
 <div>
   <span>状态：<span class="green">已及格</span></span><span>得分：<span class="green">80分</span></span><span>总分：100分</span>
 </div>
  <div class="list-main-body">
  <!-- <div class="block">
    <span>1.(多选)以下哪些定义为危险化学品</span><span></span>
    <div>
      <span>A.聚乙烯</span>
      <span>B.聚丙烯</span>
      <span>C.乙醇</span>
    </div>
   </div>
   <div class="block">
    <span>1.(单选)以下哪些定义为危险化学品</span>
    <div>
      <span>A.聚乙烯</span>
      <span>B.聚丙烯</span>
      <span>C.乙醇</span>
    </div>
   </div> -->
   <QuestionList />
  </div>
  </div>
</template>

<script>
  import QuestionList from './questionList'
  export default {
    name: 'examine',
    components:{QuestionList},
    data() {
      return{

      }
    },
    methods:{
      goBack(){
        this.$router.go(-1);
      },
      restart(){
        this.$router.push({path:'startExamine'});
      },
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
      position:relative;
      height:70vh;
      padding:.1rem;
      overflow:auto;
    }
  }
  .green{
    color:#37a21e;
  }
  .red{
    color:#af1e2b
  }
</style>
