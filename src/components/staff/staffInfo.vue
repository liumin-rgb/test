<template>
  <div class="list-main">
    <div class="list-search">
      <div>
        <span><span class="label">姓名：</span><input class="pc-input" /></span>
        <span><span class="label">工号：</span><input class="pc-input" /></span>
        <span v-show="queryType=='high'"><span class="label">在职状态：</span><select class="pc-input" /></span>
        <span class="floatR">
          <span class="backButton" @click="queryType=queryType=='low'?'high':'low'"><i class="iconfont icon-zhuanhuan1"></i><span
              class="weight600">{{queryType=='low'?'普通搜索':'高级搜索'}}</span></span>
          <span class="pc-button">搜索</span>
        </span>
      </div>
      <div>
        <span v-show="queryType=='high'"><span class="label">政治面貌：</span><select class="pc-input" /></span>
        <span v-show="queryType=='high'"><span class="label">学历：</span><select class="pc-input" /></span>
        <span v-show="queryType=='high'"><span class="label">部门：</span><select class="pc-input" /></span>
      </div>
      <div>
        <span v-show="queryType=='high'"><span class="label">工作年限：</span><input class="pc-input" style="width:.6rem" />--<input
            class="pc-input" style="width:.6rem" /></span>
        <span v-show="queryType=='high'"><span class="label">入职时间：</span><input class="pc-input" /></span>
      </div>
      <div class="list-search-three">
        <span class="pc-button buttonNoback" @click="openImport"><i class="iconfont icon-shangchuan1 "></i>批量导入</span>
        <span class="pc-button buttonNoback" @click="addStaff"><i class="iconfont icon-jiahao"></i>添加</span>
        <span class="pc-button buttonNoback" @click="changeCategory">修改详情页类目名称</span>
      </div>
    </div>
    <div class="list-table">
      <el-table :data="tableData" border height="250" style="width:unset" :header-cell-class-name="'table-header'">
        <el-table-column prop="" label="工号" sortable></el-table-column>
        <el-table-column prop="date" label="姓名" sortable></el-table-column>
        <el-table-column prop="name" label="性别"></el-table-column>
        <el-table-column prop="address" label="出生日期"></el-table-column>
        <el-table-column prop="address" label="年龄"></el-table-column>
        <el-table-column prop="address" label="婚姻"></el-table-column>
        <el-table-column prop="address" label="政治面貌"></el-table-column>
        <el-table-column prop="address" label="入职时间"></el-table-column>
        <el-table-column prop="address" label="手机长号"></el-table-column>
        <el-table-column prop="address" label="工作年限"></el-table-column>
        <el-table-column prop="address" label="部门"></el-table-column>
        <el-table-column prop="address" label="学历"></el-table-column>
        <el-table-column prop="address" label="在职状态"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
                  <el-popover trigger="hover" placement="bottom">
                    <p>编辑</p>
                    <p>离职</p>
                    <p>重置密码</p>
                    <div slot="reference" class="name-wrapper">
                     :
                    </div>
                  </el-popover>
                </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="list-bottom">
      <Pagination :value="pageIndex" :maxPage="maxPage" @changePage="changePage" />
    </div>
    <ImportStaff :visible="visible1" @closeModel="closeModel" @openModel2="openModel2" />
    <InsureImport :visible="visible2" @closeModel="closeModel2" />
    <CategoryManage :visible="visible3" @closeModel="closeModel3" />
  </div>
</template>

<script>
  import Pagination from '../Pagination'
  import ImportStaff from './importStaff'
  import InsureImport from './insureImport'
  import CategoryManage from './categoryManage'
  export default {
    name: 'staffInfo',
    components: {
      Pagination,
      ImportStaff,
      InsureImport,
      CategoryManage
    },
    data() {
      return {
        visible1: false,
        visible2: false,
        visible3: false,
        pageIndex: '',
        maxPage: '',
        queryType: 'low',
        tableData: [

        ]
      }
    },
    methods: {
      openImport() {
        this.visible1 = true;
      },
      closeModel() {
        this.visible1 = false;

      },
      closeModel2() {
        this.visible2 = false;
      },
      closeModel3() {
        this.visible3 = false;
      },
      addStaff() {
        this.$router.push({
          path: 'editStaff',
          query: {
            flag: 1
          }
        });
      },
      openModel2() {
        this.visible2 = true;
      },
      changeCategory() {
        this.visible3 = true;
      },

    }
  };
</script>

<style lang="less" scoped>
  .list-main {
    height: 100%;
    border-radius: 5px;
    background: #fff;
    padding: .1rem;
    position: relative;
  }

  .list-search {
    border: 1px dashed #cccccc;
    border-radius: 5px;
    margin-bottom: .1rem;
    padding: .1rem .05rem;

    &-three {
      text-align: right;
      margin-top: 0.1rem;
    }
  }

  /deep/.el-table th>.cell{padding-left:5px;padding-right:0;}
</style>
