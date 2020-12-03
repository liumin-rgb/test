<template>
  <!--应用管理新建/编辑-->
  <div id="editApplication">

      <Editor id="tinymce" v-model="tinymceHtml" :init="editorInit"></Editor>

  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/wordcount'
import 'tinymce/icons/default'
export default {
  name: 'editApplication',
  data () {
    return {
      tinymceHtml: '',
      editorInit: {
        language_url: '/static/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/static/tinymce/skins/ui/oxide',
        height: 300,
       toolbar:'forecolor backcolor bold italic underline   | alignleft aligncenter alignright alignjustify outdent indent | \
                  fontselect fontsizeselect | bullist numlist | \
       		   table image',
       plugins:'table image'	,
       fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
          font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
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
              if (meta.filetype === 'file') {
                callback('https://www.baidu.com/img/bd_logo1.png', { text: 'My text' });
              }
              if (meta.filetype === 'image') {
                callback('https://www.baidu.com/img/bd_logo1.png', { alt: 'My alt text' });
              }
              if (meta.filetype === 'media') {
                callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.baidu.com/img/bd_logo1.png' });
              }
          },
          autosave_ask_before_unload: false,
       branding: false
      },
      htmlData: {
      }
    }
  },
  mounted () {
    tinymce.init({})
  },
  methods: {},
  components: {
    'Editor': Editor
  }
}
</script>

<style scoped>
</style>
