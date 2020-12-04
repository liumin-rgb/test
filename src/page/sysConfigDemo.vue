<template>
  <!--应用管理新建/编辑-->
  <div id="editApplication">
    <div class="allSearch">
      <div class="d_flex">
        <span>{{type === 'view' ? '查看' : '编辑'}} {{parseInt(id) === 1 ? '隐私政策' : '行为规范'}}</span>
      </div>
      <div style="margin-top: 20px;white-space: normal" v-if="type === 'view'">
        <div style="background: #fff;padding: 20px" v-html="htmlData.content">
        </div>
        <div style="margin-top: 20px;text-align: right;white-space: normal">
          <button @click="editApp" class="redButtonTwo">编辑</button>
          <button @click="allReturn" class="cancelButtonTwo">返回</button>
        </div>
      </div>
      <div style="padding-top: 20px" v-if="type === 'edit'">
        <Editor id="tinymce" v-model="tinymceHtml" :init="editorInit"></Editor>
        <div style="margin-top: 20px;;white-space: normal;text-align: right">
          <button @click="savePrive(1)" class="redButtonTwo">保存并发布</button>
          <button @click="savePrive(2)" class="redButtonTwo">保存</button>
          <button @click="allReturn" class="cancelButtonTwo">返回</button>
        </div>
      </div>
    </div>
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
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
export default {
  name: 'editApplication',
  data () {
    return {
      id: this.$route.params.id,
      type: this.$route.query.type,
      tinymceHtml: '',
      editorInit: {
        language_url: '/backendUI/static/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/backendUI/static/tinymce/skins/ui/oxide',
        height: 800,
        plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | removeformat',
        branding: false
      },
      htmlData: {
      }
    }
  },
  mounted () {
    tinymce.init({})
    this.getData()
  },
  methods: {
    editApp () {
      this.type = 'edit'
    },
    // 返回上一页
    allReturn () {
      this.$router.go(-1)
    },
    getData () {
      this.$axiox.get('/api/SystemSetting/PolicyFiles').then(msg => {
        if (parseInt(this.id) === 1) {
          this.htmlData = msg.result.items[0]
          this.tinymceHtml = this.htmlData.content
        } else {
          this.htmlData = msg.result.items[1]
          this.tinymceHtml = this.htmlData.content
        }
      })
    },
    savePrive (type) {
      if (type === 1) {
        let html = ''
        if (parseInt(this.id) === 1) {
          html = '您确认发布更新后的使用行为规范吗？重新发布之后，企业微信用户将需要重新阅读和同意此条使用隐私政策。'
        } else {
          html = '您确认发布更新后的使用行为规范吗？重新发布之后，企业微信用户将需要重新阅读和同意此条使用行为规范。'
        }
        this.$commonJs.doubleComfirm({
          content: html,
          successFun: msg => {
            let Data = {
              id: this.id,
              content: this.tinymceHtml
            }
            this.$axiox.put('/api/SystemSetting/PolicyFile/UpdateAndPublish', Data).then(msg => {
              this.$commonJs.alertTips({
                type: 'success',
                title: '成功',
                content: '保存成功',
                stayTime: 5
              })
            })
          },
          errorFun: msg => {
          }
        })
      } else {
        let Data = {
          id: this.id,
          content: this.tinymceHtml
        }
        this.$axiox.put('/api/SystemSetting/PolicyFile', Data).then(msg => {
          this.$commonJs.alertTips({
            type: 'success',
            title: '成功',
            content: '保存成功',
            stayTime: 5
          })
        })
      }
    }
  },
  components: {
    'Editor': Editor
  }
}
</script>

<style scoped>
</style>
