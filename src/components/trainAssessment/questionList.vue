<template>
  <div >
   <div class="block">
    <span>1.(单选)以下哪些定义为危险化学品</span><span class="tag green">正确</span>
    <div>
       <a-radio-group v-model="value" >
          <a-radio :style="radioStyle"  value="1"> A.聚乙烯</a-radio>
          <a-radio :style="radioStyle" value="2"> B.聚丙烯</a-radio>
          <a-radio :style="radioStyle" value="3"> C.乙醇</a-radio>
       </a-radio-group>
    </div>
   </div>
   <div class="block">
    <span>2.(多选)以下哪些定义为危险化学品</span><span class="tag red">错误</span>
    <div>
       <a-checkbox-group @change="onChange">
         <a-checkbox :style="radioStyle" value="A"> A.聚乙烯</a-checkbox>
         <a-checkbox :style="radioStyle" value="A"> B.聚丙烯</a-checkbox>
         <a-checkbox :style="radioStyle" value="A"> C.乙醇</a-checkbox>
       </a-checkbox-group>
    </div>
   </div>
   </div>
  </div>
</template>

<script>
  export default {
    name: 'questionList',
    data() {
      return{
       radioStyle: {
         display: 'block',
         height: '30px',
         lineHeight: '30px',
       },

      }
    },
    methods:{
    }
  };
</script>

<style scoped lang="less">
  .block{
    width: 100%;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16);
    padding:.1rem;
    margin:.08rem 0;
  }
/deep/.ant-checkbox-wrapper{
  margin-left:0.08rem;
}
.tag{
 font-size:.12rem;
  margin-left:.2rem;
  font-weight:600;

}
.green{
  color:#37a21e;
}
.red{
  color:#af1e2b
}
</style>
