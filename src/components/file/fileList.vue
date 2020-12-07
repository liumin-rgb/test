<template>
  <div class="list-main">
    <div class="list-main-one">
      <div>
        <div class="font12 weight600">文件夹目录</div>
        <div class="textAlignR">
          <!-- <span class="pc-button buttonNoback font10 ">新建文件夹</span> -->
          <span class="pc-button buttonNoback font10" @click="openTagManage('all')">标签管理</span>
        </div>
      </div>
       <a-tree
           class="draggable-tree"
           draggable
		       show-icon
           blockNode="true"
           :tree-data="gData"
           @dragenter="onDragEnter"
           @drop="onDrop"
           @select="onSelect"
           :icon='getIcon'
           defaultExpandParent
         >
         <template slot="custom" slot-scope="item">
                <span>{{item.title}}</span>
                <i :class="['iconfont icon-jiahao themeColor',item.showBtn?'':'displayN']"  @click.stop="appendNode(item)"></i>
                 <i :class="['iconfont icon-tubiao09 themeColor',item.showBtn?'':'displayN']" @click.stop="editNode(item)"></i>
                 <i :class="['iconfont icon-shanchu themeColor',item.showBtn?'':'displayN']" @click.stop="deleteNode(item)"></i>
         </template>
        <!-- <template slot='switcherIcon'>
         <i class="iconfont icon-wenjianjia" :selected="!selected"></i>
          <i class="iconfont icon-dakaizhuangtaiwenjianjia" :selected="selected"></i>
        </template> -->
         </a-tree>

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
       <Pagination :value="pageIndex" :maxPage="maxPage" />
      </div>
    </div>
    <TagManage :visible="visible" :operation="operation" @closeTagManage="closeTagManage"/>
  </div>
</template>

<script>
  import Pagination from '../Pagination'
  import TagManage from './tagManage'
  export default {
    name: 'fileList',
    components:{Pagination,TagManage},
    data() {
      return {
        pageIndex:1,
        maxPage:10,
        showSelect:false,
        visible:false,
        operation:'all',
        gData:[
  {
    title: '0-0',
    key: '0-0',
    scopedSlots: { title: 'custom' },
    showBtn:false,
    children: [
      {
        title: '0-0-1',
        key: '0-0-1',
        scopedSlots: { title: 'custom' },
        showBtn:true,
        children: [
          { title: '0-0-1-0', key: '0-0-1-0', showBtn:false,scopedSlots: { title: 'custom' } },
          { title: '0-0-1-1', key: '0-0-1-1', showBtn:false,scopedSlots: { title: 'custom' } },
          { title: '0-0-1-2', key: '0-0-1-2', showBtn:false,scopedSlots: { title: 'custom' } }
        ]
      },
    ]
  },
  {
    title: '0-1',
    key: '0-1',
    scopedSlots: { title: 'custom' },
    showBtn:false,
    children: [
      { title: '0-1-0-0', key: '0-1-0-0', showBtn:false,scopedSlots: { title: 'custom' } },
      { title: '0-1-0-1', key: '0-1-0-1',showBtn:false, scopedSlots: { title: 'custom' } },
      { title: '0-1-0-2', key: '0-1-0-2', showBtn:false,scopedSlots: { title: 'custom' } }
    ]
  },
],
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
            appendNode(data){
                //模拟添加
                      const newChild = { title: '新建文件夹',
                        key: 'ceshi1',
                        scopedSlots: { title: 'custom' },
                        children: [] }
                      if (!data.children) {
                        this.$set(data, 'children', [])
                      }
                      data.children.push(newChild)
            },
            editNode(data){
           this.searchOption(data, this.treeData, 'edit');
            },
            deleteNode(data){
            this.searchOption(data, this.treeData,'delete');
            },
            //递归查找
           searchOption (option, arr, type = 'delete') {
                 console.log(option, arr)
                 for (let s = 0; s < arr.length; s++) {
                   console.log(arr[s].key, option.key)
                   if (arr[s].key === option.key) {
                     if (type === 'delete') {
                       arr.splice(s, 1)
                     } else {
                     //这是模拟数据编辑数据
                       this.$set(arr, s, {
                         title: '12121212',
                         key: '12121212',
                         scopedSlots: { title: 'custom' }
                       })
                     }
                     break
                   } else if (arr[s].children && arr[s].children.length > 0) { // 递归条件
                     this.searchOption(option, arr[s].children,type)
                   } else {
                     continue
                   }
                 }
               },
            getIcon(props){
               const { isLeaf, expanded } = props;
                      /* if (isLeaf) {
                        return <a-icon type="home" />;
                      } */
                    /*  return <a-icon type={expanded ? "folder-open" : "folder"} />; */
                    return <i class={expanded?"iconfont icon-dakaizhuangtaiwenjianjia themeColor":"iconfont icon-wenjianjia themeColor"}></i>;
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
