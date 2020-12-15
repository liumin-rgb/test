<template>
  <div>
    <editor id='tinymce' v-model='tinymceHtml' :init='init'></editor>
    <!-- 预览功能，如不需要，可将下面一行代码注释删除 -->
    <div v-html='tinymceHtml'></div>
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'

export default {
  name: 'EditorTinymce',
  components: {
    Editor
  },
  data () {
    return {
      tinymceHtml: '',
      init: {
        // language_url: '/static/tinymce/zh_CN.js',   // vue-cli 2.x 使用这个
        language_url: '/static/tinymce/zh_CN.js',   // vue-cli 3.x 创建的 typescript 项目，将 url 中的 static 去掉，即 skin_url: '/tinymce/skins/lightgray'
        language: 'zh_CN',
        // skin_url: '/static/tinymce/skins/lightgray',   // vue-cli 2.x 使用这个
        skin_url: '/static/tinymce/skins/lightgray',  // vue-cli 3.x 创建的 typescript 项目，将 url 中的 static 去掉，即 skin_url: '/tinymce/skins/lightgray'
        height: 300,
        plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu  table image',
        toolbar:'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat | table image',
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        font_formats: '宋体=simsun,serif;;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;',
       
        branding: false,
      }
    }
  },
  mounted () {
    // 在 mounted 中也需要初始化一次
    tinymce.init({})
  },
}
</script>
