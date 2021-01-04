<template>
  <div class="list-main">
    <div class="list-main-top">
      <span class="backButton" @click="goBack"><i class="iconfont icon-fanhui"></i><span>返回上一级</span></span>
      <div>
        <!--      <span class="pc-button" @click="saveDraft"><i class="iconfont icon-baocun"></i>打标签</span>
 --> <span
          class="pc-button" @click="saveDraft"><i class="iconfont icon-baocun"></i>保存草稿</span>
        <span class="pc-button" @click="submitCheck"><i class="iconfont icon-tijiao"></i>提交审核</span>
        <span class="pc-button" @click="enable"><i class="iconfont icon-tongguo1"></i>生效</span>

      </div>
    </div>
    <div class="list-main-body">
      <div class="list-head" @click="toggle1=!toggle1">
        <div><i class="iconfont icon-jiantou themeColor" v-show="toggle1==true"></i><i class="iconfont icon-jiantou1 themeColor"
            v-show="toggle1==false"></i>基本信息</div>
        <div>
          <span class="marginR2VW">文件目录：{{folderName}}</span>
          <span>申请人：1-R</span>
        </div>
      </div>
      <transition name="t1">
        <div v-show="toggle1==true">
          <div class="flex paddingLR2rem gray">
            <div class=" textInput"><span class="label"><span class="icon-xing">*</span>文件名称</span><input class='pc-input middleInput'
                v-model="name" /></div>
            <div class=" textInput"><span class="label"><span class="icon-xing">*</span>文档编号</span><input class='pc-input middleInput'
                v-model="docNo" /></div>
            <div class=" textInput"><span class="label">版本号</span><input class='pc-input' v-model="version" /></div>
          </div>
          <div class="flex paddingLR2rem gray">
            <!--      <div class="width50 textInput"><span class="label">版本号</span><input  class='pc-input'/></div>
 -->
            <!--      <div class="width50 textInput"><span class="label">文档类型</span><input  class='pc-input'/></div>
 -->
          </div>
        </div>
      </transition>
      <div class="list-head" @click.stop="toggle2=!toggle2">
        <div><i class="iconfont icon-jiantou themeColor" v-show="toggle2==true"></i><i class="iconfont icon-jiantou1 themeColor"
            v-show="toggle2==false"></i>编辑文档

        </div>
      </div>
      <transition name="t1">
        <div v-show="toggle2==true" :class="fullScreen?'modelEditor':'pageEditor'">
          <div :class="fullScreen?'modelEditor2':'pageEditor2'">
            <div class="iconPosition">
              <span class="pc-button buttonNoback" @click="saveTemplate">保存模板</span>
              <span class="pc-button buttonNoback" @click="loadTemplate">加载模板</span>
              <span class="pc-button buttonNoback" @click="openTag">打标签</span>
              <el-popover trigger="hover" placement="bottom">
                <div>点击缩小编辑器</div>
                <i class="iconfont icon-suoxiao themeColor font20  pointer" v-show="fullScreen==true" slot="reference"
                  @click="fullScreen=false"></i>
              </el-popover>
              <el-popover trigger="hover" placement="bottom">
                <div>点击放大编辑器</div>
                <i class="iconfont icon-fangda themeColor font20  pointer" @click.stop="fullScreen=true" slot="reference"
                  v-show="fullScreen==false"></i>
              </el-popover>
            </div>
            <Editor id="tinymce" :init="editorInit" v-model='tinymceHtml'></Editor>
          </div>
        </div>
      </transition>
      <div class="list-head" @click="toggle3=!toggle3">
        <div><i class="iconfont icon-jiantou themeColor" v-show="toggle3==true"></i><i class="iconfont icon-jiantou1 themeColor"
            v-show="toggle3==false"></i>附录
        </div>
      </div>
      <transition name="t1">
        <div v-show="toggle3==true">
          <div class="textAlignR"><span class="pc-button buttonNoback">添加</span></div>
          <div class="flexCol marginL2VW" style="align-items: flex-start;">
            <span class="themeColor text-line">附录4.1临床差错事故等级记录</span>
            <span class="themeColor text-line">附录4.2保修记录</span>
          </div>
        </div>
      </transition>
    </div>
    <CheckFile :visible="visible" :config="config" @closeModel="closeModel" />
    <TagManage :visible="visible1" :operation="operation" @closeTagManage="closeTagManage" />
    <SaveTemplate :visible="visible2" :htmlContext="tinymceHtml" @closeModel="closeModel1"/>
    <LoadTemplate :visible="visible3" @closeModel="closeModel2"/>
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
  import TagManage from './tagManage'
  import SaveTemplate from './saveTemplate'
  import LoadTemplate from './loadTemplate'
  export default {
    name: 'editHtml',
    components: {
      Editor,
      CheckFile,
      TagManage,
      SaveTemplate,
      LoadTemplate
    },
    data() {
      return {
        id:'',//文档id
        toggle1: true,
        toggle2: true,
        toggle3: false,
        visible: false,
        visible1: false,
        visible2: false,
        visible3:false,
        operation: {
          type: 'single',
          id: '',
          singleTag: []
        },
        folderId:'',
        folderName:'',
        creatorId:0,
        name: '',
        docNo: '',
        version: '',
        fullScreen: false,
        singleTags: [],
        config: {
        operationType:1, //1：审核 2：废除 3：传阅
        ids:[]
        },
        tinymceHtml: '',
        editorInit: {
          language_url: './static/tinymce/zh_CN.js',
          language: 'zh_CN',
          skin_url: './static/tinymce/skins/ui/oxide',
          height: '100%',
          // min_height: 300,
          //max_height:550,
          menu: {
            edit: {
              title: '编辑',
              items: 'undo redo | cut copy paste pastetext | selectall'
            },
            insert: {
              title: '插入',
              items: 'link media | template hr'
            },
            format: {
              title: '格式',
              items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'
            },
            table: {
              title: '表格',
              items: 'inserttable tableprops deletetable | cell row column'
            },
            tools: {
              title: '工具',
              items: 'spellchecker code'
            },
          },
          menubar: 'edit insert  format table ',
          toolbar: 'forecolor backcolor bold italic underline   | alignleft aligncenter alignright alignjustify outdent indent | \
                   fontselect fontsizeselect | bullist numlist | table image | link',
          plugins: 'table image link',
          fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
          font_formats: '黑体=SimHei;宋体=simsun,serif;Arial=arial,helvetica;Arial Black=arial black,avant garde;',
          link_list: [
            //  { title: '预置链接1', value: 'http://www.tinymce.com' },
            // { title: '预置链接2', value: 'http://tinymce.ax-z.cn' }
          ],
        /*  image_class_list: [{
              title: 'None',
              value: ''
            },
          ], */
          importcss_append: true,
          //自定义文件选择器的回调内容
        //  file_picker_type: 'image',
         // file_picker_callback: function(callback, value, meta) {
            /* if (meta.filetype === 'file') {
              callback('https://www.baidu.com/img/bd_logo1.png', { text: 'My text' });
            } */
          /*  if (meta.filetype === 'image') {
              callback('https://www.baidu.com/img/bd_logo1.png', {
                alt: 'My alt text'
              });
            } */

        //  },
          automatic_uploads: false,
          /*  images_upload_url: '',
           images_upload_base_path: '/demo', */
          // autosave_ask_before_unload: false,
          branding: false,
          images_upload_handler: function(blobInfo, succFun, failFun) {
            /*
                          console.log(blobInfo);
                            	 		let url = "/api/Employee/uploadAttachment?type=1";
                            			 const form = new FormData();
                            			   // 文件对象
                            			  form.append('files', blobInfo.blob(), blobInfo.filename());
                            	 		utils.request.post(url,form,{headers: {"content-type": "multipart/form-data"}}).then((res) => {
                                   if(res){
                            	 			if (res.success == true) {
                                      succFun("success");

                            	 			} else {
                                       failFun("failed");
                            	 			}
                            	 			 }else{
                                       failFun("failed");
                                    }
                            	 		});

                        */
          },
        },
      }
    },
    watch: {
      fullScreen: function(val) {
        if (val == true) {
          //this.editorInit.height='100vh';
          //tinymce.theme.resizeTo('100%','100%');
        } else {

        }
      }
    },
    mounted() {
      tinymce.init({});
      this.folderId=utils.cache.getSession("folderId")||'';
      this.folderName=utils.cache.getSession("folderName")||'';
      this.id=this.$route.query.id||'';
      if(this.id!=''){
         this.queryHtml();
      }
    },
    methods: {
      queryHtml(){
          let url = "/api/Document/getHtmlDocVersion?docVersionId="+this.id;
          utils.request.get(url, {}, true).then((res) => {
            if (res) {
              if (res.success == true) {
                let result=res.result;
                this.name=result.name;
                this.docNo=result.docNo;
                this.version=result.version;
                this.tinymceHtml=result.htmlStr;
              } else {
                utils.box.toast(res.error.message);
              }
            }
          });

      },
      saveTemplate(){
        if(this.tinymceHtml==''){
          utils.box.toast("文本内容不能为空");
          return;
        }
        this.visible2=true;
      },
      loadTemplate(){
        this.visible3=true;
      },
      enable() {
        if (this.check()) {
          let url = "/api/Document/enableDocVersion";
          let params = {
            "folderId": this.folderId,
            "creatorId": this.creatorId,
            "name": this.name,
            "docNo": this.docNo,
            "version": this.version,
            "htmlStr": this.tinymceHtml,
            "tagIds": this.singleTags
          }
          utils.request.post(url, params, true).then((res) => {
            if (res) {
              if (res.success == true) {
                utils.box.toast("已生效","success");
                this.goBack();
              } else {
                utils.box.toast(res.error.message);
              }
            }
          });
        }
      },
      openTag() {
        this.operation = {
          type: 'single',
          ids: [], //文件id
          singleTag: this.singleTags
        }
        this.visible1 = true;
      },
      closeTagManage(val) {
        this.visible1 = false;
        this.singleTags = val.singleTags;
      },
      check() {
        if (this.name == '') {
          utils.box.toast("文件名称必填");
          return false;
        }
        if (this.docNo == '') {
          utils.box.toast("文件编号必填");
          return false;
        }
        if (this.tinymceHtml == '') {
          utils.box.toast("请输入文档内容");
          return false;
        }
        return true;
      },
      saveDraft() {
        if (this.check()) {
          //console.log(this.tinymceHtml);
            let url = "/api/Document/saveDocVersion";
            let params = {
              "folderId": this.folderId,
              "creatorId": this.creatorId,
              "name": this.name,
              "docNo": this.docNo,
              "version": this.version,
              "htmlStr": this.tinymceHtml,
              "tagIds": this.singleTags
            }
            utils.request.post(url, params, true).then((res) => {
              if (res) {
                if (res.success == true) {
                  utils.box.toast("保存成功","success");
                  this.goBack();
                } else {
                  utils.box.toast(res.error.message);
                }
              }
            });
        }
      },
      submitCheck() {
        if (this.check()) {
         this.visible=true;
         this.config.params={
           "folderId": this.folderId,
           "creatorId": this.creatorId,
           "name": this.name,
           "docNo": this.docNo,
           "version": this.version,
           "htmlStr": this.tinymceHtml,
           "tagIds": this.singleTags
         }
        }
      },
      upload(blobInfo) {
        let url = "/api/Employee/uploadAttachment?type=1";
        const form = new FormData();
        // 文件对象
        form.append("file", 'files', blobInfo.blob(), blobInfo.filename());
        utils.request.post(url, form, {
          headers: {
            "content-type": "multipart/form-data"
          }
        }).then((res) => {
          this.loading = false;
          if (res) {
            if (res.success == true) {
              utils.box.toast("上传成功", "success");

            } else {
              utils.box.toast("上传失败");
            }
          } else {
            utils.box.toast("上传失败");
          }
        });
      },
      goBack() {
        this.$router.go(-1);
      },
      closeModel2(val){
        this.visible3=false;
        if(val){
          this.tinymceHtml=val.htmlContext;
        }
      },
      closeModel1(){
        this.visible2=false;
      },
      closeModel(val) {
        this.visible = false;
        if(val==true){
         this.goBack();
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  .list-main {
    height: 100%;
    //background:#fff;
    /*    display: flex;
    display: -webkit-flex; */
    border-radius: 5px;
    background: #fff;
    padding: .1rem;

    &-top {
      width: 100%;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;

    }

    &-body {
      width: 100%;
      margin-top: .1rem;
      height: 75vh;
      overflow: auto;
    }
  }

  .t1-enter-active {
    transition: all .5s ease;
  }

  .t1-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .t1-enter,
  .t1-leave-to {
    transform: translateX(5px);
    opacity: 0;
  }

  .modelEditor {
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.45);
    top: 0;
    left: 0;
    z-index: 1000;
    bottom: 0;
    right: 0;
  }

  .modelEditor2 {
    position: relative;
    height: 100%;
  }

  .iconPosition {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1001;
  }

  .pageEditor {
    height: 55vh;
  }

  .pageEditor2 {
    position: relative;
    height: 100%;
  }
</style>
