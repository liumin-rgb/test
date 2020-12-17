<template>
  <div class="list-main">
    <div class="list-main-one">
      <div>
        <div class=" weight600">文件夹目录</div>

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
         <div class="marginB2VH"></div>
         <div class="textAlignR">
           <!-- <span class="pc-button buttonNoback font10 ">新建文件夹</span> -->
           <span class="pc-button buttonNoback" @click="openTagManage('all')">标签管理</span>
         </div>
        <a-tree
            class="draggable-tree"
            draggable
            show-icon
            blockNode="true"
            :tree-data="gData1"
            @select="onSelect"
            :icon='getIcon1'
            defaultExpandParent
          >
          </a-tree>


    </div>
    <div class="list-main-two">
      <div class="list-search">
       <div class="list-search-one flexBtw">
         <div><span><span>状态：</span><select class="pc-input"><option  value="草稿" >草稿</option><option  value="流转中" >流转中</option></select></span>
         <span><span>文件名称：</span><input class="pc-input bigInput"/></span>
         </div>
         <span class="pc-button"><i class="iconfont icon-sousuo"></i>搜索</span>

       </div>
       <div class="list-search-two"></div>
       <div class="list-search-three">
       <span class="positionR">
        <span class="pc-button buttonNoback" @mouseenter="showSelect=true"><i class="iconfont icon-jiahao "></i>新建<i class="iconfont icon-jiantou "></i></span>
       <div @mouseleave="showSelect=false" class="pc-select selectOne" v-show="showSelect==true">
       	<div @click="toUrl('editHtml')">新建HTML</div>
        <div @click="toUrl('fileManage')">批量上传</div>
       </div>
       </span>
       <span class="pc-button buttonNoback"><i class="iconfont icon-shangchuan1 "></i>下载</span>
       <span class="pc-button buttonNoback"><i class="iconfont icon-feichu "></i>废除</span>
       <span class="pc-button buttonNoback"><i class="iconfont icon-ziyuan202 "></i>审核</span>
       </div>
      </div>
      <div class="list-table">
        <el-table
            :data="tableData"
            border
            height="380"
            style="width: 100%"
            stripe
             @selection-change="handleSelectionChange"
            :header-cell-class-name="'table-header'"
            >
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="fileName"label="文件名称" width="200">
              <template slot="header" slot-scope="scope">
                 <span class="pointer"><span class="gray ">文件名称</span><i class="iconfont icon-paixu themeColor"></i></span>
               </template>
               <template slot-scope="scope">
                      <span class="themeColor text-line pointer" @click="toDetail()">{{scope.row.fileName}}</span>
               </template>
            </el-table-column>
            <el-table-column prop="number"label="编号" width="120">
              <template slot="header" slot-scope="scope">
                 <span class="pointer"><span class="gray ">编号</span><i class="iconfont icon-paixu themeColor"></i></span>
               </template>
            </el-table-column>
            <el-table-column prop="version" label="版本号">
            </el-table-column>
            <el-table-column prop="status"label="状态" align="center">
            <template  slot-scope="scope" >
                <span :style="{color:(scope.row.status=='流转中'?'#ea9900':scope.row.status=='已生效'?'#2e6eb4':'')}">{{scope.row.status}}</span>
                  </template>
            </el-table-column>
            <el-table-column prop="creator"label="创建人" align="center">
            </el-table-column>
            <el-table-column prop="tags" label="标签" align="center">
              <template slot-scope="scope">
                      <el-popover trigger="hover" placement="bottom">
                        <div class="pointer themeColor flex flexWrap" style="width:120px">
                        <span class="pc-button buttonNoback1 font10 " v-for="obj in scope.row.tags">{{obj}}</span>
                        </div>
                        <div slot="reference" class="name-wrapper">
                         <i class="iconfont icon-icontag themeColor"></i>
                        </div>
                      </el-popover>
                    </template>
            </el-table-column>
            <el-table-column prop="" label="操作" align="center">
       <template slot-scope="scope">
               <el-popover trigger="hover" placement="bottom">
                 <div class="pointer themeColor weight600 font12">
                 <p @click="toDetail()"><i class="iconfont icon-xiangqing"></i>文件详情</p>
                 <p @click="editHtml()"><i class="iconfont icon-bianji"></i>编辑</p>
                 <p @click="readFile()"><i class="iconfont icon-chuanyueicon"></i>传阅</p>
                 <p @click="openTagManage('single')"><i class="iconfont icon-biaoqian"></i>标签管理</p>
                 </div>
                 <div slot="reference" class="name-wrapper">
                  <img src="../../assets/img/threeDot.png" style="width:.03rem" class="pointer"/>
                 </div>
               </el-popover>
             </template>
            </el-table-column>
          </el-table>
      </div>
      <div class="list-bottom">
       <Pagination :value="pageIndex" :maxPage="maxPage" />
      </div>
    </div>
    <TagManage :visible="visible2" :operation="operation" @closeTagManage="closeTagManage"/>
   <CheckFile :visible="visible1" :config="config" @closeModel="closeCheckFile"/>
  </div>
</template>

<script>
  import Pagination from '../Pagination'
  import TagManage from './tagManage'
  import CheckFile from './checkFile'
  export default {
    name: 'fileList',
    components:{Pagination,TagManage,CheckFile},
    data() {
      return {
        pageIndex:1,
        maxPage:1,
        showSelect:false,
        visible2:false,
        visible1:false,
        config:{
          title:'提交传阅',
          label:'传阅人',
        },
        operation:'all',
        gData:[
  {
    title: '0-0',
    key: '0-0',
    scopedSlots: { title: 'custom' },
    showBtn:false,
    multipleSelection:'',
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
        tableData: [
          {
            fileName:'文件1',
            number:'123',
            version:'1.2',
            status:'草稿',
            creator:'lisa',
            tags:['组织管理','质量体系','外部服务和供应'],
          },
          {
            fileName:'文件2',
            number:'123',
            version:'1.2',
            status:'流转中',
            creator:'lisa',
            tags:['组织管理','质量体系','外部服务和供应'],
          }
        ],
        gData1:[{
            title: '0-0',
            key: '0-0',
            scopedSlots: { title: 'custom' },
            multipleSelection:'',
            children: [
              { isLeaf:true,
                title: '0-0-1',
                key: '0-0-1',
                scopedSlots: { title: 'custom' },
              },
              { isLeaf:true,
                title: '0-0-2',
                key: '0-0-2',
                scopedSlots: { title: 'custom' },
              },
            ],
            }

        ]
      }
    },
    created(){
      console.log(this.gData);
    },
    methods: {
      toDetail(){
        this.$router.push({path:'fileDetail',query:{}});
      },
      editHtml(){
        this.$router.push({path:'editHtml',query:{}});
      },
      readFile(){
        this.visible1=true;
      },
      handleSelectionChange(val) {
         this.multipleSelection = val;
          },
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
          this.visible2=true;
        },
        closeTagManage(){
          this.visible2=false;
        },
        closeCheckFile(){
          this.visible1=false;
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
            getIcon1(props){
               const { isLeaf, expanded } = props;
               if(isLeaf){
                 return <i class="iconfont icon-biaoqian1 themeColor"></i>;
               }else{
                 return <i class="iconfont icon-biaoqian themeColor"></i>
               }
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
