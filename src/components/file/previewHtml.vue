<template>
  <div class="main">
    <div class="content" v-html="htmlContent"></div>
    </div>
</template>

<script>
  export default{
    name:'',
    components:{},
    data(){
      return{
       id:'',
       htmlContent:'',
      }
    },
    created(){
     this.id=this.$route.query.id||'';
     if(this.id!=''){
          this.queryHtml();
     }else{
       this.htmlContent=utils.cache.getSession("htmlContent");
     }
  
    },
    methods:{
      queryHtml(){
          let url = "/api/Document/getHtmlDocVersion?docVersionId="+this.id;
          utils.request.get(url, {}, true).then((res) => {
            if (res) {
              if (res.success == true) {
                let result=res.result;
               /* this.name=result.name;
                this.docNo=result.docNo;
                this.version=result.version; */
                this.htmlContent=result.htmlStr;
              } else {
                utils.box.toast(res.error.message);
              }
            }
          });

      },
    }
  }
</script>

<style scoped lang="less">
  .main{
    overflow: auto;
    height:100vh;
    background:#efefef;
    padding:0 20%;
  }
  .content{
    min-height:100%;
    background:#fff;
    padding:5%;
    -webkit-box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
  }
</style>
