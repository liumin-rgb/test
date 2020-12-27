<template>
  <div class="list-main">
    <div class="list-main-one">
      <div>
        <div class=" weight600">文件夹目录</div>

      </div>
      <div class="inner">
       <a-tree
           class="draggable-tree"
           draggable
		       show-icon
           :tree-data="gData"
           @dragenter="onDragEnter"
           @drop="onDrop"
           @select="onSelect"
           :icon='getIcon'
           defaultExpandParent
         >
         <template slot="custom" slot-scope="item">
                <span v-if="item.key==chooseKey1&&editable" contenteditable="true" @blur="insuerEdit($event,item)" @click.stop="">{{item.title}}</span>
                <span v-else>{{item.title}}</span>
                <span v-show="item.key==chooseKey1">
                 <i  class='iconfont icon-jiahao themeColor'  @click.stop="appendNode(item)"></i>
                 <i  class='iconfont icon-tubiao09 themeColor' @click.stop="editNode(item)"></i>
                 <i  class='iconfont icon-shanchu themeColor' @click.stop="deleteNode(item)"></i>
                </span>
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
            multiple
            show-icon
            :tree-data="gData1"
            @select="onSelect1"
            :icon='getIcon1'
            defaultExpandParent
          >
          </a-tree>
      </div>
    </div>
    <div class="list-main-two">
      <div class="list-search">
       <div class="list-search-one flexBtw">
         <div><span><span>状态：</span><select class="pc-input" @change="getSelectInfo('status')" id="status"><option  v-for="obj in statusList" :value="obj.code">{{obj.text}}</option></select></span>
         <span><span>文件名称：</span><input class="pc-input bigInput" v-model="fileName"/></span>
         </div>
         <span class="pc-button" @click="search"><i class="iconfont icon-sousuo"></i>搜索</span>

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
       <span :class="['pc-button',check1?'buttonNoback':'buttonGray']"  @click="addTags"><i class="iconfont icon-icontag"></i>打标签</span>
       <span :class="['pc-button',check1?'buttonNoback':'buttonGray']"  @click="download"><i class="iconfont icon-shangchuan1"></i>下载</span>
       <span :class="['pc-button',check2?'buttonNoback':'buttonGray']"  @click="abolish"><i class="iconfont icon-feichu"></i>废除</span>
       <span :class="['pc-button',check3?'buttonNoback':'buttonGray']"  @click="examine"><i class="iconfont icon-ziyuan202"></i>审核</span>
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
            <el-table-column prop="name"label="文件名称" width="200">
              <template slot="header" slot-scope="scope">
                 <span class="pointer" @click="takeOrder(true)"><span class="gray ">文件名称</span><i class="iconfont icon-paixu themeColor"></i></span>
               </template>
               <template slot-scope="scope">
                      <span class="themeColor text-line pointer" @click="toDetail(scope.row.id,scope.row.documentId)">{{scope.row.name}}</span>
               </template>
            </el-table-column>
            <el-table-column prop="docNo"label="编号" width="120">
              <template slot="header" slot-scope="scope">
                 <span class="pointer" @click="takeOrder(false)"><span class="gray ">编号</span><i class="iconfont icon-paixu themeColor"></i></span>
               </template>
            </el-table-column>
            <el-table-column prop="version" label="版本号">
            </el-table-column>
            <el-table-column prop="status"label="状态" align="center">
            <template  slot-scope="scope" >
                <span :style="{color:(scope.row.status==3?'#ea9900':scope.row.status==2?'#2e6eb4':'')}">{{scope.row.status |filter1(statusList)}}</span>
            </template>
            </el-table-column>
            <el-table-column prop="creator"label="创建人" align="center">
            </el-table-column>
            <el-table-column prop="tags" label="标签" align="center">
              <template slot-scope="scope">
                      <el-popover trigger="hover" placement="bottom">
                        <div class="pointer themeColor flex flexWrap" style="width:120px">
                        <span class="pc-button buttonNoback1 font10 " v-for="obj in scope.row.tags">{{obj.name}}</span>
                        </div>
                        <div slot="reference" class="name-wrapper" v-show="scope.row.tags!=null&&scope.row.tags.length>0">
                         <i class="iconfont icon-icontag themeColor"></i>
                        </div>
                      </el-popover>
                    </template>
            </el-table-column>
            <el-table-column prop="" label="操作" align="center">
       <template slot-scope="scope">
               <el-popover trigger="hover" placement="bottom">
                 <div class="pointer themeColor weight600 font12">
                 <p @click="toDetail(scope.row.id,scope.row.documentId)"><i class="iconfont icon-xiangqing"></i>文件详情</p>
                 <p @click="editHtml(scope.row.id)"><i class="iconfont icon-bianji"></i>编辑</p>
                 <p @click="readFile(scope.row.id)"><i class="iconfont icon-chuanyueicon"></i>传阅</p>
                 <p @click="openTagManage('single',scope.row.id,scope.row.tags)"><i class="iconfont icon-biaoqian"></i>标签管理</p>
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
     <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
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
        pageSize:10,
        totalCount:0,
        showSelect:false,
        visible1:false,
        visible2:false,
        sortField:true,
        order1:false,
        order2:false,
        isDescending:false,
        chooseKey1:1,
        chooseKey2:[],
        editable:false,
        check1:false,
        check2:false,
        check3:false,
        config:{
          operationType:1, //1：审核 2：废除 3：传阅
          ids:[]
        },
        status:0,
        fileName:'',
        statusList:[{code:'0',text:'全部'},{code:'1',text:'草稿'},{code:'2',text:'已生效'},{code:'3',text:'流转中'},{code:'4',text:'废除'}],
        operation:{type:'all',id:'',singleTag:[]},
        gData:[
  {
    title: '0-0',
    key: '0-0',
    scopedSlots: { title: 'custom' },
    multipleSelection:[],
    children: [
      {
        title: '0-0-1',
        key: '0-0-1',
        scopedSlots: { title: 'custom' },
        children: [
          { title: '0-0-1-0', key: '0-0-1-0', scopedSlots: { title: 'custom' },children:[] },
          { title: '0-0-1-1', key: '0-0-1-1', scopedSlots: { title: 'custom' },children:[] },
          { title: '0-0-1-2', key: '0-0-1-2', scopedSlots: { title: 'custom' },children:[] }
        ]
      },
    ]
  },
  {
    title: '0-1',
    key: '0-1',
    scopedSlots: { title: 'custom' },
    children: [
      { title: '0-1-0-0', key: '0-1-0-0', scopedSlots: { title: 'custom' },children:[] },
      { title: '0-1-0-1', key: '0-1-0-1', scopedSlots: { title: 'custom' },children:[] },
      { title: '0-1-0-2', key: '0-1-0-2', scopedSlots: { title: 'custom' },children:[] }
    ]
  },
],
        tableData: [],
        gData1:[{
            title: ' ',
            key: '0-0',
            scopedSlots: { title: 'custom' },
            multipleSelection:'',
            children: [
            ],
            }
        ]
      }
    },
    filters:{
      filter1:function(val1,val2){
        if(val1==0) return '';
         for(var i in val2){
           if(val2[i].code==val1){
             return val2[i].text;
           }
         }
      }
    },
    created(){
      this.queryAllTags();
     this.queryInfo();

      console.log(this.gData);
    },
    methods: {
      search(){
        this.pageIndex=1;
        this.queryInfo();
      },
      takeOrder(sortField){
        this.sortField=sortField;
        if(sortField==true){
          this.isDescending=this.order1==true?false:true;
        }else{
           this.isDescending=this.order2==true?false:true;
        }
        this.queryInfo()
      },
      changePage(val){
        this.pageIndex=val.pageIndex;
        this.pageSize=val.pageSize;
        this.queryInfo();
      },
      addTags(){
        if(this.check1){
          let ids=this.multipleSelection.map((item)=>{return item.id});
           this.openTagManage('single',ids);
        }
      },
      download(){
        if(this.check1){
              let url="/api/Document/batchDownload";
              let params={
                "folderId": 0,
                "ids": this.multipleSelection.map((item)=>{return item.id})
              };
              utils.request.post(url,params,true).then((res) => {
              	if(res){
                  if(res.success==true){
                    utils.box.toast("下载成功");
                  }else{
                    utils.box.toast(res.error.message);
                  }
                }
                });

        }
      },
      abolish(){
        if(this.check2){
          this.config={
          operationType:2,
            ids:this.multipleSelection.map((item)=>{return item.id})
          },
          this.visible1=true;
        }
      },
      examine(){
         if(this.check3){
        this.config={
          operationType:1,
          ids:this.multipleSelection.map((item)=>{return item.id})
        },
        this.visible1=true;
        }
      },
      queryAllTags(){
        let url="/api/Document/DocumentTagList";
        utils.request.post(url,{},false).then((res) => {
          this.spinning=false;
        	if(res){
            if(res.success==true){
              let arr=res.result;
              this.gData1[0].children=arr.map((item)=>{
                return  {
                isLeaf:true,
                title: item.name,
                key: item.id,
              }
              });
              console.log(this.gData1);
            }else{

            }
          }
          });
      },
      queryInfo(){
        let url = "/api/Document/getList";
        let params={
   "floderId": this.chooseKey1,
   "tagIds": this.chooseKey2,
  "fileName": this.fileName,
  "status": this.status,
  "sortField": this.sortField,
  "isDescending": this.isDescending,
  "pageIndex": this.pageIndex,
  "pageSize": this.pageSize
}
         this.spinning=true;
        	utils.request.post(url,params,false).then((res) => {
            this.spinning=false;
        		if(res){
              if(res.success==true){
                let totalCount=res.result.totalCount;
                 this.totalCount=totalCount;
                 this.maxPage=Math.ceil(totalCount/this.pageSize);
                let items=res.result.items;
                 this.tableData=items;
              }else{

              }

            }
            });

      },
      getSelectInfo(id){
        this[id]=utils.common.getSelectValue(id);
      },
      toDetail(id,documentId){
        this.$router.push({path:'fileDetail',query:{id:id,documentId:documentId}});
      },
      editHtml(){
        this.$router.push({path:'editHtml',query:{}});
      },
      readFile(id){
        let arr=[];
        arr.push(id);
        this.config={
         operationType:3,
         ids:arr,
        },
        this.visible1=true;
      },
      handleSelectionChange(val) {
         this.multipleSelection = val;
          this.check1=val.length==0?false:true;
          let index1=val.length==0?0:val.findIndex((item)=>{return item.status!=2});
          this.check2=index1==-1?true:false;
          let index2=val.length==0?0:val.findIndex((item)=>{return item.status!=1});
          this.check3=index2==-1?true:false;
       },
      checkSelection(){
            if(!this.multipleSelection||this.multipleSelection.length==0){
              utils.box.toast("您未选择任何文件");
              return false;
            }
            return true
          },
    onSelect(keys, event) {
      this.chooseKey1=keys[0]; //keys[0]||
      this.queryInfo();
    },
    onSelect1(keys, event) {  //点击标签过滤文件
    this.chooseKey2=keys;
    this.queryInfo();
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
        openTagManage(type,ids,tags){
          let arr=[];
          if(ids!=undefined){
            if(Array.isArray(ids)){
              arr=ids;
            }else{
              arr.push(ids);
            }
          }
          this.operation={
            type:type,
            ids:arr,//文件id
            singleTag:tags||[]
          }
          console.log(this.operation);
          this.visible2=true;
        },
        closeTagManage(val){
          this.visible2=false;
          if(val=='all'){
            this.queryAllTags();
          }else{
            this.queryInfo()
          }
        },
        closeCheckFile(val){
          this.visible1=false;
          if(val==true){
            this.queryInfo();
          }
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
                      const newChild = {
                        title: '新建文件夹',
                        key: 'ceshi1',
                        scopedSlots: { title: 'custom' },
                        children: [] ,
                        }
                      if (!data.children) {
                        this.$set(data, 'children', [])
                      }
                      data.children.push(newChild)
            },
            editNode(data){
              this.editable=true;

            },
            insuerEdit(e,data){
              this.editable=false;
              data.title=e.target.innerHTML;
             this.searchOption(data, this.gData, 'edit',data.title);
            },
            deleteNode(data){
            this.searchOption(data, this.gData,'delete');
            },
            //递归查找
           searchOption (option, arr, type = 'delete',title) {
                 console.log(option, arr)
                 for (let s = 0; s < arr.length; s++) {
                   console.log(arr[s].key, option.key)
                   if (arr[s].key === option.key) {
                     if (type === 'delete') {
                       arr.splice(s, 1)
                     } else {
                     //这是模拟数据编辑数据
                       /* this.$set(arr, s, {
                         title: title,
                         key: '12121212',
                         scopedSlots: { title: 'custom' }
                       }) */
                       arr[s].title=title;
                     }
                     break
                   } else if (arr[s].children && arr[s].children.length > 0) { // 递归条件
                     this.searchOption(option, arr[s].children,type,title)
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

      .inner{
        width:100%;
        height:82vh;
        overflow: auto;
      }
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
