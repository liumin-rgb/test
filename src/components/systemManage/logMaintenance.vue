<template>
  <div class="list-main">
  <div class="list-main-top">
    <span class="backButton" @click="goBack"><i class="iconfont icon-fanhui"></i><span>返回上一级</span></span>
    <div>
      <span class="pc-button buttonNoback1 font12" v-show="ifPrivate==true" @click="visible=true"><i class="iconfont icon-yulan font12"></i>可见人员</span>

      </div>
  </div>
  <div class="list-main-body">
    <div class="list-head">
      <div><i class="iconfont icon-jiantou themeColor"></i>文档信息</div>
      <div>
        </div>
      </div>
     <div>

     </div>
     <div class="list-head">
       <div><i class="iconfont icon-jiantou themeColor"></i>流转情况</div>
       <div>
         </div>
       </div>
    <div class="marginT1VH">

    </div>
    <div class="list-head">
       <div><i class="iconfont icon-jiantou themeColor"></i>历史版本</div>
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
    }
  }


</style>
