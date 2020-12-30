<template>
  <div class="pdf-conatiner">
          <div class="pdfbox">
              <iframe :src=' "./static/pdfjs/web/viewer.html?file=" + pdfUrl ' style="width:100%;height:100vh"></iframe>
          </div>
      </div>
</template>

<script>
  export default{
    data(){
      return{
        pdfUrl:''
      }
    },
    created(){
      this.pdfUrl=utils.cache.getSession('pdfurl');
    },
    methods:{

    }
  }
</script>

<style scoped lang="less">
  .pdf-conatiner{
    width:100%;
  }
  .pdfbox{
    width:100%;
  }

</style>
