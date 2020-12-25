<template>
  <div>
    <div class="marginB1VH">
      <span class="pc-button font12" v-show="flag=='edit'" @click="editInfo(1)">添加</span>
      <span class="pc-button font12" v-show="flag=='edit'" @click="deleteInfo">删除</span>
    </div>
    <div class="list-table">
      <el-table :data="tableData" border height="100" :header-cell-class-name="'table-header'">
        <el-table-column prop="" label="会议名称"></el-table-column>
        <el-table-column prop="" label="会议时间"></el-table-column>
        <el-table-column prop="" label="会议地点"></el-table-column>
        <el-table-column prop="" label="会议部门"></el-table-column>
        <el-table-column prop="" label="备注"></el-table-column>
      </el-table>
      <Pagination :maxPage="maxPage" @changePage="changePage" :totalCount="totalCount" />
    </div>
    <a-modal v-model="visible" title="学术会议" width="60%">
      <div class="format">
        <div class=" textInput">
          <span class="label font12 weight600"><span class="icon-xing">*</span>会议名称</span><input class="pc-input">
          <span class="label font12 weight600"><span class="icon-xing">*</span>会议级别</span><select class="pc-input"><option value="0">请选择</option><option value="1">会议</option><option value="2">学习班</option></select>
        </div>
        <div class=" textInput">
          <span class="label font12 weight600"><span class="icon-xing">*</span>会议时间</span>
          <el-date-picker v-model="tableObj.signDate" value-format="yyyy-MM-dd" type="date" placeholder=" 请选择"></el-date-picker>
         <span class="label font12 weight600"><span class="icon-xing">*</span>会议地点</span><input class="pc-input">
        </div>
        <div class=" textInput">
          <span class="label font12 weight600"><span class="icon-xing">*</span>部门</span><input class="pc-input">
        <span class="label font12 weight600"><span class="icon-xing">*</span>会议选项</span>
       <a-checkbox-group name="checkboxGroup" :default-value="[1]" @change="onChange"><a-checkbox value="1"> 参会</a-checkbox><a-checkbox value="2"> 培训</a-checkbox><a-checkbox value="3"> 发言</a-checkbox><a-checkbox value="4"> 壁报</a-checkbox></a-checkbox-group>
       </div>
       <div class=" textInput">
          <span class="label font12 weight600"><span class="icon-xing">*</span>备注</span><textarea class="pc-textarea" />
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
  </div>
</template>

<script>
  import Pagination from "../Pagination"
  export default {
    name: 'academicConference',
    components: {
      Pagination
    },
    props: {
      flag: {
        default: "check",
        type: String,
      },
      info: {
        default: () => {},
        type: Object,
      },
      staffId: {
        default: "",
        type: String,
      }
    },
    data() {
      return {
        tableData: [{
          "id": 0,
          "employeeId": 0,
          "signDate": "1",
          "validDate": "1",
          "invalidDate": "1"
        }],
        tableObj: {
          "id": 0,
          "employeeId": 0,
          "signDate": "",
          "validDate": "",
          "invalidDate": ""
        },
        visible: false,
        loading: false,
        pageIndex: 1,
        pageSize: 10,
        maxPage: 1,
        totalCount: 0,
        type: 1 ,//1添加 2修改
        ids:[]
      }
    },
    watch: {
      info: {
        handler: 'queryInfo',
        deep: true
      }
    },
    methods: {
      onChange(){

      },
      queryInfo() {
        if (this.info.toggle == false) return;
        let params = {
          id: this.staffId,
          infoType: this.info.id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
        utils.operateStaffInfo.getInfoByType(params).then((data) => {
          this.tableData = data.contractDtos || this.tableData;
        });
      },
      editInfo(type) {
        this.visible = true;
        this.type = type;
      },
      changePage(val) {
        this.pageIndex = val.pageIndex;
        this.pageSize = val.pageSize;
        this.queryInfo();
      },
      deleteInfo() {
           utils.box.confirm("是否确认删除？").then(()=>{
          	 this.confirmDeleteInfo();

          	 });
      },
      confirmDeleteInfo() {
        let params = {
          infoType: this.info.id,
          ids: this.ids
        }
        utils.operateStaffInfo.deleteInfoByType(params).then((data) => {
          this.queryInfo();
          this.handleCancel();
        });

      },
      handleOk() {
        let params = {
          isAdd: this.type == 1 ? true : false,
          infoType: this.info.id,
          data: this.tableObj
        }
        this.loading=true;
        utils.operateStaffInfo.addOrUpdateInfoByType(params).then((data) => {
          this.loading=false;
          this.queryInfo();
          this.handleCancel()
        });

      },
      handleCancel() {
        this.visible = false;
      },

    }
  };
</script>

<style lang="less" scoped>
  .label {
    width: 0.9rem;
  }

  /*时间控件*/
  /deep/.el-table th>.cell {
    padding-left: 5px;
    padding-right: 0;
  }

  /deep/.el-input__inner {
    height: .25rem;
    border: 1px solid #2e6eb4;
  }

  /deep/.el-input__icon {
    line-height: .25rem;
  }

  /deep/.el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 1.5rem;
    margin: .02rem 0.1rem;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1)
  }

  /deep/.el-input--suffix .el-input__inner {
    padding-right: 0
  }
</style>
