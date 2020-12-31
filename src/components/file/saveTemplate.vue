<template>
  <a-modal v-model="visible" title="保存模板" :afterClose="handleCancel">
    <div class="format ">
      <span>请输入模板名称:</span><input class="pc-input middleInput" v-model="name"/>
    </div>
    <template slot="footer">
      <a-button key="back" @click="handleCancel">
        取消
      </a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
        提交
      </a-button>
    </template>
  </a-modal>
</template>
<script>
  export default {
    name: 'saveTemplate',
    props: {
      visible: {
        default: false,
        type: Boolean
      },
      htmlContext:{
        default: '',
        type: String
      },
    },
    data() {
      return {
        loading: false,
        name:'',
      }
    },
    watch: {
      visible: function(newVal) {

      }
    },
    created() {

    },
    methods: {
      handleCancel() {
        this.$emit("closeModel");
      },
      handleOk() {
        if(this.name==''){
          utils.box.toast("请输入模板名称");
          return;
        }
        let url = "/api/Document/saveDocTemplate";
        let params = {
          "id": 0,
          "name": this.name,
          "htmlContext": this.htmlContext
        }
        this.loading=true;
        utils.request.post(url, params,).then((res) => {
          this.loading=false;
          if (res) {
            if (res.success == true) {
              utils.box.toast("保存成功","success");
              this.handleCancel()
            } else {
              utils.box.toast(res.error.message);
            }
          }
        });

      }


    }
  }
</script>

<style lang="less">
  .format {
    padding: 0 0.2rem;
    color: #333;
    font-size: .12rem;

  }
</style>
