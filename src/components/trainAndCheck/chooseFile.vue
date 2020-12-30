<template>
  <a-modal v-model="visible" title="选择文件" :afterClose="handleCancel" :dialogClass="'bigModel'">
    <div class="format ">
      <div class="flexBtw">
        <div><select class="pc-input" placeholder="选择文件夹">
            <option>0-1</option>
          </select>
          <input placeholder="请输入文件名" class="pc-input"/>
        </div>
        <span class="pc-button">搜索</span>
      </div>
      <div class="marginT1VH">
        <el-table :data="tableData" border style="width: 100%" height="25vh" @selection-change="handleSelectionChange"
          :header-cell-class-name="'table-header'">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="" label="文件名"></el-table-column>
          <el-table-column prop="" label="文件名"></el-table-column>
          <el-table-column prop="" label="编号"></el-table-column>
          <el-table-column prop="" label="版本号"></el-table-column>
          <el-table-column prop="" label="创建人"></el-table-column>
          <el-table-column prop="" label="标签"></el-table-column>
        </el-table>
      </div>
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
    name: '',
    props: {
      visible: {
        default: false,
        type: Boolean
      }
    },
    data() {
      return {
        loading: false,
        tableData: [],
        multipleSelection: [],
      }
    },
    watch: {
      visible: function(newVal) {
        if (newVal == true) {
          this.searchStaff();
        }
      }
    },
    created() {

    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleCancel() {
        this.$emit("closeModel");
      },
      handleOk() {
        if(this.multipleSelection.length==0){
          utils.box.toast("请勾选文件");
          return;
        }
        this.handleCancel()
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
