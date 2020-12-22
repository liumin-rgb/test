<template>
  <div class="list-main">
  <div class="list-main-top">
    <span class="backButton" @click="goBack"><i class="iconfont icon-fanhui"></i><span>返回上一级</span></span>
    <div>
      <span class="pc-button" @click="saveDraft"><i class="iconfont icon-baocun"></i>保存草稿</span>
       <span class="pc-button" @click="submitCheck"><i class="iconfont icon-tijiao"></i>提交审核</span>
       <span class="pc-button" @click="submit"><i class="iconfont icon-tongguo1"></i>生效</span>

      </div>
  </div>
  <div class="list-main-body">
    <div class="list-head" @click="toggle1=!toggle1">
      <div><i class="iconfont icon-jiantou themeColor"></i>基本信息</div>
      <div>
        <span class="marginR2VW">文件目录：问卷11</span>
        <span>申请人：1-R</span>
        </div>
      </div>
     <!-- <transition-group name="t1"> -->
      <div v-show="toggle1==true">
    <div class="flex paddingLR2rem gray">
      <div class=" textInput"><span class="label"><span class="icon-xing">*</span>文件名称</span><input class='pc-input middleInput' v-model="name"/></div>
      <div class=" textInput"><span class="label"><span class="icon-xing">*</span>文档编号</span><input  class='pc-input middleInput' v-model="docNo"/></div>
      <div class=" textInput"><span class="label">版本号</span><input  class='pc-input' v-model="version"/></div>
    </div>
    <div class="flex paddingLR2rem gray">
<!--      <div class="width50 textInput"><span class="label">版本号</span><input  class='pc-input'/></div>
 --><!--      <div class="width50 textInput"><span class="label">文档类型</span><input  class='pc-input'/></div>
 -->    </div>
    </div>
   <!-- </transition-group> -->
    <div class="list-head" @click="toggle2=!toggle2">
      <div><i class="iconfont icon-jiantou themeColor"></i>编辑文档</div>
    </div>
  <!--  <transition-group name="t1"> -->
     <div v-show="toggle2==true">
      <Editor id="tinymce"  :init="editorInit" v-model='tinymceHtml'></Editor>
     </div>
   <!--  </transition-group> -->
  </div>
  <CheckFile :visible="visible" :config="config" @closeModel="closeModel"/>
  </div>
</template>

<script>
  import tinymce from 'tinymce/tinymce'
  import 'tinymce/themes/silver/theme'
  import Editor from '@tinymce/tinymce-vue'
  import "tinymce/plugins/image"
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/wordcount'
  import 'tinymce/icons/default'
  import CheckFile from './checkFile'
  export default {
    name: 'editHtml',
    components: {Editor,CheckFile},
    data() {
      return{
        toggle1:true,
        toggle2:true,
        visible:false,
        name:'',
        docNo:'',
        version:'',
        config:{
         title:'提交审核',
         label:'审批人',
        },
        tinymceHtml:'',
       editorInit: {
         language_url: './static/tinymce/zh_CN.js',
         language: 'zh_CN',
         skin_url: './static/tinymce/skins/ui/oxide',
         min_height: 280,
         max_height:500,
        toolbar:'forecolor backcolor bold italic underline   | alignleft aligncenter alignright alignjustify outdent indent | \
                   fontselect fontsizeselect | bullist numlist | table image | link',
        plugins:'table image link'	,
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        font_formats: '宋体=simsun,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;',
           link_list: [
               { title: '预置链接1', value: 'http://www.tinymce.com' },
               { title: '预置链接2', value: 'http://tinymce.ax-z.cn' }
           ],
           image_class_list: [
           { title: 'None', value: '' },
           { title: 'Some class', value: 'class-name' }
           ],
           importcss_append: true,
           //自定义文件选择器的回调内容
           file_picker_callback: function (callback, value, meta) {
               /* if (meta.filetype === 'file') {
                 callback('https://www.baidu.com/img/bd_logo1.png', { text: 'My text' });
               } */
               if (meta.filetype === 'image') {
                 callback('https://www.baidu.com/img/bd_logo1.png', { alt: 'My alt text' });
               }

           },
            automatic_uploads: false,
            images_upload_url: '',
             images_upload_base_path: '/demo',
           autosave_ask_before_unload: false,
        branding: false
       },
      }
    },
    mounted(){
      tinymce.init({});
    },
    methods:{
      check(){
        if(this.name==''){
          utils.box.toast("文件名称必填");
          return false;
        }
        if(this.docNo==''){
          utils.box.toast("文件编号必填");
          return false;
        }
        if(this.tinymceHtml==''){
         utils.box.toast("请输入文档内容");
         return false;
        }
        return true;
      },
      saveDraft(){
        if(this.check()){

        }
      },
      submitCheck(){
           if(this.check()){

           }
      },
      submit(){
         if(this.check()){

         }
      },
      goBack(){
        this.$router.go(-1);
      },
      closeModel(){
        this.visible=false;
      },
    },
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
      margin-top:.1rem;
    }
  }
.t1-enter-active {transition: all .5s ease;}
.t1-leave-active {transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);}
.t1-enter, .t1-leave-to{transform: translateX(5px);opacity: 0;}

</style>
