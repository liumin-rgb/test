<template>
  <div class="list-main">
    <div class="list-main-one">
      <div>
        <div class="font12 weight600">文件夹目录</div>
        <div class="textAlignR">
          <span class="pc-button buttonNoback font10 ">新建文件夹</span>
          <span class="pc-button buttonNoback font10" @click="openTagManage('all')">标签管理</span>
        </div>
      </div>
       <a-tree
           class="draggable-tree"
           :default-expanded-keys="expandedKeys"
           draggable
           :tree-data="gData"
           @dragenter="onDragEnter"
           @drop="onDrop"
         />

    </div>
    <div class="list-main-two">
      <div class="list-search">
       <div class="list-search-one">
         <span><span>状态：</span><select class="pc-input"/></span>
         <span><span>文件名称：</span><input class="pc-input"/></span>
         <span class="pc-button">搜索</span>

       </div>
       <div class="list-search-two"></div>
       <div class="list-search-three">
       <span class="positionR">
        <span class="pc-button buttonNoback" @mouseenter="showSelect=true"><i class="iconfont icon-jiahao iconMargin"></i>新建<i class="iconfont icon-jiantou iconMargin"></i></span>
       <div @mouseleave="showSelect=false" class="pc-select selectOne" v-show="showSelect==true">
       	<div @click="toUrl('editHtml')">新建HTML文件</div>
        <div @click="toUrl('fileManage')">批量上传文件</div>
       </div>
       </span>
       <span class="pc-button buttonNoback"><i class="iconfont icon-shangchuan1 "></i>下载</span>
       <span class="pc-button buttonNoback"><i class="iconfont icon-feichu "></i>废除</span>
       <span class="pc-button buttonNoback"><i class="iconfont icon-jiahao "></i>审核</span>
       </div>
      </div>
      <div class="list-table">
        <el-table
            :data="tableData"
            border
            height="250"
            style="width: 100%"
            stripe
             @selection-change="handleSelectionChange"
            :header-cell-class-name="'table-header'"
            >
            <el-table-column
              type="selection"
            >
            </el-table-column>
            <el-table-column
              prop="date"
              label="文件名称"
             >
            </el-table-column>
            <el-table-column
              prop="name"
              label="编号"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="版本号">
            </el-table-column>
            <el-table-column
              prop="address"
              label="状态">
            </el-table-column>
            <el-table-column
              prop="address"
              label="创建人">
            </el-table-column>
            <el-table-column
              prop="address"
              label="标签">
            </el-table-column>
            <el-table-column
              prop="address"
              label="">
       <template slot-scope="scope">
             </template>
            </el-table-column>
          </el-table>
      </div>
      <div class="list-bottom">
       <Pagination :value="pageIndex" :maxPage="maxPage" @changePage="changePage"/>
      </div>
    </div>
    <TagManage :visible="visible" :operation="operation" @closeTagManage="closeTagManage"/>
  </div>
</template>

<script>
  import Pagination from '../Pagination'
  import TagManage from './tagManage'
  const x = 3;
  const y = 2;
  const z = 1;
  const gData = [];

  const generateData = (_level, _preKey, _tns) => {
    const preKey = _preKey || '0';
    const tns = _tns || gData;

    const children = [];
    for (let i = 0; i < x; i++) {
      const key = `${preKey}-${i}`;
      tns.push({ title: key, key });
      if (i < y) {
        children.push(key);
      }
    }
    if (_level < 0) {
      return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
      tns[index].children = [];
      return generateData(level, key, tns[index].children);
    });
  };
  generateData(z);
  export default {
    name: 'fileList',
    components:{Pagination,TagManage},
    data() {
      return {
        pageIndex:'1',
        maxPage:'10',
        showSelect:false,
        visible:false,
        operation:'all',
        gData,
        multipleSelection:'',
        tableData: [/* {
          date: '2016-05-02',
          name: '--',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '一一',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '一一',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '一一',
          address: '上海市普陀区金沙江路 1516 弄'
        } */]
      }
    },
    created(){
      console.log(this.gData);
    },
    methods: {
 onSelect(keys, event) {
      console.log('Trigger Select', keys, event);
    },
    onExpand() {
      console.log('Trigger Expand');
    },
 handleMenuClick(e) {
      console.log('click', e);
    },
        toUrl(url){
          this.showSelect=false;
          this.$router.push({path:url,query:{}});
        },
        openTagManage(type){
          this.operation=type;
          this.visible=true;
        },
        closeTagManage(){
          this.visible=false;
        },
          handleSelectionChange(val) {
                this.multipleSelection = val;
              },
         onDragEnter(info) {
              console.log(info);
              // expandedKeys 需要受控时设置
              // this.expandedKeys = info.expandedKeys
            },
            onDrop(info) {
              console.log(info);
              const dropKey = info.node.eventKey;
              const dragKey = info.dragNode.eventKey;
              const dropPos = info.node.pos.split('-');
              const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
              const loop = (data, key, callback) => {
                data.forEach((item, index, arr) => {
                  if (item.key === key) {
                    return callback(item, index, arr);
                  }
                  if (item.children) {
                    return loop(item.children, key, callback);
                  }
                });
              };
              const data = [...this.gData];

              // Find dragObject
              let dragObj;
              loop(data, dragKey, (item, index, arr) => {
                arr.splice(index, 1);
                dragObj = item;
              });
              if (!info.dropToGap) {
                // Drop on the content
                loop(data, dropKey, item => {
                  item.children = item.children || [];
                  // where to insert 示例添加到尾部，可以是随意位置
                  item.children.push(dragObj);
                });
              } else if (
                (info.node.children || []).length > 0 && // Has children
                info.node.expanded && // Is expanded
                dropPosition === 1 // On the bottom gap
              ) {
                loop(data, dropKey, item => {
                  item.children = item.children || [];
                  // where to insert 示例添加到尾部，可以是随意位置
                  item.children.unshift(dragObj);
                });
              } else {
                let ar;
                let i;
                loop(data, dropKey, (item, index, arr) => {
                  ar = arr;
                  i = index;
                });
                if (dropPosition === -1) {
                  ar.splice(i, 0, dragObj);
                } else {
                  ar.splice(i + 1, 0, dragObj);
                }
              }
              this.gData = data;
            },

    }
  };
</script>

<style lang="less" scoped>
  .list-main {
    height: 100%;
    //background:#fff;
    display: flex;
    display: -webkit-flex;

    &-one {
      width:20%;
      background: #fff;
      margin-right: .1rem;
      border-radius: 5px;
      padding:.05rem;
    }

    &-two {
      width:80%;
      background: #fff;
      border-radius: 5px;
      padding: .1rem;
      position: relative;
    }
  }
  .list-search {
      border: 1px dashed #cccccc;
      border-radius: 5px;
      margin-bottom: .1rem;
      padding:.1rem .05rem;
      &-one{
        color:#333;
       &>span{margin-right:.2rem;}
      }
      &-two{

      }
      &-three{
        text-align:right;
        margin-top:0.1rem;
      }
    }

  .list-table {}

  .resize-table-th {
    position: relative;
  }

  .table-draggable-handle {
    /* width: 10px !important; */
    height: 100% !important;
    left: auto !important;
    right: -5px;
    cursor: col-resize;
    touch-action: none;
    border: none;
  }
  .btPadding{padding:0.04rem 0.05rem}
  .iconMargin{margin-left:.3rem}

</style>
