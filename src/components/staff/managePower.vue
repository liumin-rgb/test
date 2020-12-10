<template>
  <div class="list-main">
    <div class="list-main-one">
      <div>
        <div class="font12 weight600">组织架构</div>
        <div class="textAlignR">
          <!-- <span class="pc-button buttonNoback font10">添加分院</span> -->
          <span class="pc-button buttonNoback font10" @click="addBranch()" v-show="showButton">添加下属组织机构</span>
        </div>
      </div>
      <a-tree
       class="draggable-tree"
       draggable
       @dragenter="onDragEnter"
       @drop="onDrop"
      :tree-data="treeData"
      show-icon
      blockNode="true"
      defaultExpandParent
      :default-selected-keys="['0-0-0']"
      @select="onSelect"
      @onCheck="onCheck">
          <a-icon slot="switcherIcon" type="down" />
         <!-- <a-icon slot="smile" type="smile-o" />
          <a-icon slot="meh" type="smile-o" /> -->
       <!--   <template slot="custom" slot-scope="{ selected }">
            <a-icon :type="selected ? 'frown' : 'frown-o'" />
          </template> -->
        </a-tree>

    </div>
    <div class="list-main-two">
    <div class="flexBtw border-bottom-line paddingTB1rem">
      <span class="themeColor weight600">详情</span>
       <span class="pc-button" @click="save()" v-show="status!=0">保存</span>
       <span class="pc-button" @click="status=2" v-show="status==0">编辑</span>
    </div>
    <div class="textAlignL">
       <div class="margin05rem">
         <span><span class="label1">名称：</span><input class="pc-input bigInput" /></span>
         <a-radio-group name="radioGroup" :default-value="1" v-show="status==1&&chooseJob==false" @change="selectRadio"><a-radio :value="1"> 组织架构</a-radio><a-radio :value="2">岗位</a-radio></a-radio-group>
        <span v-show="status!=1"><span class="label1">类型：</span><input class="pc-input bigInput" readonly="true"/></span>
       </div>
     <div class="flex">
       <span class="label1 verTop">描述：</span>
     <textarea class='pc-textarea textareaOne flex1'/>
     </div>
    </div>
    <div class="paddingTB1rem" v-show="chooseJob==true||radioValue==2">
      <div class="border-bottom-line paddingTB1rem">
        <span class="themeColor weight600">权限分配</span>
      </div>
      <div class="paddingTB1rem">
       <a-checkbox-group @change="onChange">
           <a-row>
             <a-col :span="6"><a-checkbox value="A">A</a-checkbox></a-col>
             <a-col :span="6"><a-checkbox value="B">A</a-checkbox></a-col>
             <a-col :span="6"><a-checkbox value="C">A</a-checkbox></a-col>
            <a-col  :span="6"><a-checkbox value="A">A</a-checkbox></a-col>
            <a-col :span="6"><a-checkbox value="A">A</a-checkbox></a-col>
            <a-col :span="6"><a-checkbox value="A">A</a-checkbox></a-col>

           </a-row>
         </a-checkbox-group>
      </div>
    </div>
    <div class="paddingTB1rem" v-show="chooseJob==true">
      <div class="border-bottom-line paddingTB1rem">
        <span class="themeColor weight600">人员列表</span>
      </div>
      <div class="margin05rem">
      <span class="pc-button font10" @click="visible=true">添加</span>
       <span class="pc-button font10" @click="removeStaff()">删除</span>
  <el-table :data="tableData" border height="50" style="width:unset" :header-cell-class-name="'table-header'"  @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="" label="姓名" sortable></el-table-column>
        <el-table-column prop="" label="工号" sortable></el-table-column>
        <el-table-column prop="" label="部门"></el-table-column>
  </el-table>
      </div>
    </div>
    </div>
    <AddStaff :visible="visible" @closeModel="closeModel"/>
  </div>
</template>

<script>
  import AddStaff from "../staff/addStaff"
  export default {
    name: 'managePower',
    components:{AddStaff},
    data() {
      return {
    showButton:false, //是否显示添加下属机构
    chooseJob:false,//是否选择岗位
    status:0, //0:只读状态 1：添加状态 2：编辑状态
    radioValue:1,
    tableData:[],
    multipleSelection:'',
    visible:false,
    treeData:[
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      { title: 'leaf', key: '0-0-0',  },
      { title: 'leaf', key: '0-0-1',  },
    ],
  },
  {
    title: 'parent 2',
    key: '0-1',
    children: [
      { title: 'leaf', key: '0-1-0',
      children: [
      { title: 'leaf', key: '0-1-0-0',  },
      { title: 'leaf', key: '0-1-1-0',  },
    ],
    },
      { title: 'leaf', key: '0-1-1',  },
    ],
  },
]
      }
    },
    methods: {
   onSelect(selectedKeys, info) {
     // console.log('selected', selectedKeys, info);
      if(info.node.$children.length!=0){
        this.showButton=true;
        this.chooseJob=false;
      }else{
        this.showButton=false;
        this.chooseJob=true;
      }
       this.status=0;
    },
    addBranch(){
     this.status=1;
    },
    onCheck(checkedKeys, info) {
      console.log('onCheck', checkedKeys, info);
    },
    selectRadio(e){
      this.radioValue=e.target.value;
      console.log(e);
    },
    onChange(e){
     console.log(e);
    },
    handleSelectionChange(val) {
       this.multipleSelection = val;
        },
    closeModel(){
         this.visible = false;
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
         const data = [...this.treeData];

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
         this.treeData = data;
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
      padding: .1rem .2rem;
      position: relative;
    }
  }
/deep/.ant-checkbox-group {
  width:100%;
}
/deep/.ant-col-6{margin:0.03rem 0;}

</style>
