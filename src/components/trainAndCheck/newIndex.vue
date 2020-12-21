<template>
  <div class="list-main">
  <NewTrain v-show="type==1"/>
  <NewCheck v-show="type==2"/>
  <NewTrainCheck  v-show="type==3"/>
  </div>
</template>

<script>
  import NewTrain from './newTrain'
  import NewCheck from './newCheck'
  import NewTrainCheck from './newTrainCheck'
  export default {
    name: 'newIndex',
    components:{NewTrain,NewCheck,NewTrainCheck},
    data() {
      return{
      type:1,
      }
    },
    created(){
      this.type=this.$route.query.type;
    },
    methods:{

    }
  };

</script>

<style lang="less" scoped>
  .list-main{
   height:100%;
   border-radius: 5px;
   background:#fff;
   padding:.1rem;

  }


</style>
