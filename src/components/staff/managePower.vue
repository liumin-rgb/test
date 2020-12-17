<template>
  <div class="list-main">
    <div class="list-main-one">
      <div>
        <div class="weight600">组织架构</div>
        <div class="textAlignR">
           <span class="pc-button buttonNoback" @click="addParent()">添加分院</span>
          <span :class="['pc-button','buttonNoback',showButton==true?'':'buttonGray']" @click="addBranch()"  >添加下属组织机构</span>
        </div>
      </div>
      <a-tree
       class="draggable-tree"
       draggable
       @dragstart="onDragStart"
       @dragenter="onDragEnter"
       @drop="onDrop"
       :load-data="onLoadData"
      :tree-data="treeData"
      show-icon
      :blockNode="'true'"
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
    <div class="list-main-two" ref="mainTwo">
    <div class="textAlignR border-bottom-line paddingTB1rem" ref="search">
       <span class="pc-button" @click="saveDetail()" v-show="status!=0">保存</span>
       <span class="pc-button" @click="startEdit()" v-show="status==0&&orgDetail.name!=''">编辑</span>
    </div>
    <div class="list-head" @click="toggle1=!toggle1" ref="head">
      <div><i class="iconfont icon-jiantou themeColor" v-show="toggle1==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle1==false"></i>详情</div>
    </div>
     <transition name="t1">
    <div class="textAlignL" v-show="toggle1==true" ref="body1">
       <div class="margin05rem">
         <span><span class="label1">名称：</span><input :class="['pc-input','bigInput',status==0?'backGray':'']" v-model="orgDetail.name" :readonly="status==0?true:false"/></span>
<!--         <a-radio-group name="radioGroup" :default-value="1" v-show="status==1&&chooseJob==false" @change="selectRadio"><a-radio :value="1"> 组织架构</a-radio><a-radio :value="2">岗位</a-radio></a-radio-group>
 -->        <span v-show="status!=1"><span class="label1">类型：</span><input class="pc-input backGray" readonly="true" v-model="orgDetail.type==3?'岗位':orgDetail.type==2?'部门':orgDetail.type==1?'分院':''"/></span>
       </div>
     <div class="flex">
       <span class="label1 verTop">描述：</span>
     <textarea :class="['pc-textarea', 'textareaOne', 'flex1',status==0?'backGray':'']" v-model="orgDetail.remark" :readonly="status==0?true:false"/>
     </div>
    </div>
    </transition>
    <div class="list-head" @click="toggle2=!toggle2" v-show="currentNodeType==3" ref="head">
      <div><i class="iconfont icon-jiantou themeColor" v-show="toggle2==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle2==false"></i>权限分配</div>
    </div>
    <transition name="t1">
    <div class="paddingTB1rem" v-show="currentNodeType==3&&toggle2==true" ref="body2">
      <!-- <div class="border-bottom-line paddingTB1rem">
        <span class="themeColor weight600">权限分配</span>
      </div> -->
      <div class="paddingTB1rem">
       <a-checkbox-group @change="onChange" >
           <a-row>
              <a-col :span="6" v-for="obj in permissionList"><a-checkbox :value="obj.permission" :default-checked="obj.selected" :disabled="status==0?true:false">{{obj.title}}</a-checkbox></a-col>
           </a-row>
         </a-checkbox-group>
      </div>
    </div>
    </transition>
    <div class="list-head" @click="toggle3=!toggle3" v-show="currentNodeType==3" ref="head">
      <div><i class="iconfont icon-jiantou themeColor" v-show="toggle3==true"></i><i class="iconfont icon-jiantou1 themeColor" v-show="toggle3==false"></i>人员列表</div>
    </div>
    <transition name="t1">
    <div class="paddingTB1rem" v-show="currentNodeType==3&&toggle3==true">
      <!-- <div class="border-bottom-line paddingTB1rem">
        <span class="themeColor weight600">人员列表</span>
      </div> -->
      <div class="margin05rem">
      <span class="pc-button" @click="visible=true">添加</span>
       <span class="pc-button" @click="removeStaff()">删除</span>
  <el-table :data="tableData" border :height="tableHeight" style="width:unset" :header-cell-class-name="'table-header'"  @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="name" label="姓名" >
          <template slot="header" slot-scope="scope">
                 <span class="pointer" @click="takeOrder(false)"><span class="gray ">姓名</span><i class="iconfont icon-paixu themeColor"></i></span>
          </template>
        </el-table-column>
        <el-table-column prop="employeeNo" label="工号" >
         <template slot="header" slot-scope="scope">
                <span class="pointer" @click="takeOrder(true)"><span class="gray ">工号</span><i class="iconfont icon-paixu themeColor"></i></span>
         </template>
        </el-table-column>
<!--        <el-table-column prop="" label="部门"></el-table-column>
 -->  </el-table>
      </div>
      <div class="list-bottom">
        <Pagination  :maxPage="maxPage"  @changePage="changePage" :totalCount="totalCount"/>
      </div>
    </div>
    </transition>

    </div>
    <AddStaff :visible="visible" @closeModel="closeModel" :orgId="currentNodeId"/>
     <CreateOrgnization :visible="visible1" @closeModel="closeModel1"/>
     <CreateDepartment :visible="visible2" :parentId="parentId" @closeModel="closeModel2" />
  </div>
</template>

<script>
  import AddStaff from "../staff/addStaff"
  import CreateOrgnization from "../staff/createOrgnization"
  import CreateDepartment from "../staff/createDepartment"
  import Pagination from '../Pagination'
  export default {
    name: 'managePower',
    components:{AddStaff,CreateOrgnization,CreateDepartment,Pagination},
    data() {
      return {
    tableHeight:0,
    showButton:false, //是否显示添加下属机构
    status:0, //0:只读状态 1：添加状态 2：编辑状态
    radioValue:1,
    tableData:[],
    multipleSelection:[],
    toggle1:true,
    toggle2:false,
    toggle3:false,
    visible:false,
    visible1:false,
    visible2:false,
    parentId:'',
    currentNodeId:'',
    currentNodeType:'',
    treeData:[],
    permissionList:[],
    permissions:[],
    orgDetail:{
          "id": "",
          "name": "",
          "parentId": "",
          "type": "",
          "remark": ""
    },
     totalCount:0,
     pageIndex: 1,
     pageSize:10,
     maxPage: 1,
     sortField:true,
     order1:false,
     order2:false,
     isDescending:false,
     drag1:{},
     drag2:{}
      }
    },
    watch:{
      toggle1:function(){
       this.tableHeight=this.$refs.mainTwo.offsetHeight-this.$refs.search.offsetHeight-this.$refs.head.offsetHeight*3-this.$refs.body1.offsetHeight-this.$refs.body2.offsetHeight-34-24;
      },
      toggle2:function(){
       this.tableHeight=this.$refs.mainTwo.offsetHeight-this.$refs.search.offsetHeight-this.$refs.head.offsetHeight*3-this.$refs.body1.offsetHeight-this.$refs.body2.offsetHeight-34-24;
      },
      toggle3:function(){
       this.tableHeight=this.$refs.mainTwo.offsetHeight-this.$refs.search.offsetHeight-this.$refs.head.offsetHeight*3-this.$refs.body1.offsetHeight-this.$refs.body2.offsetHeight-34-24;
      },
    },
    filters:{

    },
    created(){
      this.queryParent();
    },
    mounted(){
      this.tableHeight=this.$refs.mainTwo.offsetHeight-this.$refs.search.offsetHeight-this.$refs.head.offsetHeight*3-this.$refs.body1.offsetHeight-this.$refs.body2.offsetHeight-34-24;
    },
    methods: {
      queryParent(){
           let url="/api/Organization/organization/0/children";
           utils.request.get(url,true).then((res) => {
             if(res){
              if(res.success==true){
               let data=res.result;
               this.treeData=data.map((item)=>{
                 return{
                   title: item.name,
                   key: item.id,
                   parentId:item.parentId, //0代表分院
                   isLeaf: !item.haveChildren,
                   type:item.type
                 }
               });
              }else{
                utils.box.toast(res.error.message);
              }
             }
             })
      },
      onLoadData(treeNode){
        return new Promise(resolve=>{
          if (treeNode.dataRef.children) {
            resolve();
            return;
          }
             let url="/api/Organization/organization/"+treeNode.dataRef.key+"/children";
             utils.request.get(url,false).then((res) => {
               if(res){
                if(res.success==true){
                 let data=res.result;
                 treeNode.dataRef.children =data.map((item)=>{
                   return{
                     title: item.name,
                     key: item.id,
                     parentId:item.parentId, //0代表分院
                     isLeaf: !item.haveChildren,
                     type:item.type
                   }
                 });
                 this.treeData= [...this.treeData];
                 resolve();
                }
               }
               })
              });
      },
   onSelect(selectedKeys, info) {
      this.parentId=info.node.dataRef.key;//用作添加
      this.currentNodeId=info.node.dataRef.key;//用作查询和修改
      this.currentNodeType=info.node.dataRef.type;//
      if(info.node.dataRef.type==1||info.node.dataRef.type==2){
        this.showButton=true;
       // this.chooseJob=false;
      }else{
        this.showButton=false;
        //this.chooseJob=true;
      }
      this.status=0;
      if(this.currentNodeType==3){
        this.queryPermission(this.currentNodeId);
        this.queryStaff();
      }
      this.queryOrgDetail(this.currentNodeId);
    },
    addParent(){  //添加分院
      this.visible1=true;
    },
    addBranch(){ //添加下属组织机构
     //this.status=1;
     if(this.showButton==false) return;
     this.visible2=true;
    },
    onCheck(checkedKeys, info) {
      console.log('onCheck', checkedKeys, info);
    },
    selectRadio(e){
      this.radioValue=e.target.value;
      console.log(e);
    },
    onChange(e){
     this.permissions=e;
    },
    handleSelectionChange(val) {
       this.multipleSelection = val.map((item)=>{return item.id});
        },
    closeModel(val){
         this.visible = false;
         if(val==true){
           this.queryStaff();
         }
    },
    closeModel1(val){
         this.visible1 = false;
         if(val!=null&&val!=undefined){
           this.addParentOrgnize(val)
         }
    },
    closeModel2(val){
         this.visible2= false;
         if(val!=null&&val!=undefined){
           this.editBranchOrgize(val)
         }
    },
    addParentOrgnize(val){  //添加分院
       let url="/api/Organization/branch";
       let params={
         name:val.name,
         remark:val.remark
       }
       utils.request.post(url,params,true).then((res) => {
         if(res){
          if(res.success==true){
            utils.box.toast("添加成功","success");
            this.queryParent();
          }else{
            utils.box.toast(res.error.message);
          }
         }
         })
    },
    startEdit(){
      this.status=2;
    },
    saveDetail(){
      let params=JSON.parse(JSON.stringify(this.orgDetail));
      params.permissions=this.permissions;
       this.editBranchOrgize(params,'2');
    },
    editBranchOrgize(val,status){  //添加或修改组织机构
       let url="/api/Organization/organization";
       let params={
         "organizationId": val.id||'',
         "permissions": val.permissions,
          "name": val.name,
          "parentId": val.parentId,
          "type": val.type,
          "remark": val.remark
       }
       utils.request.put(url,params,true).then((res) => {
         if(res){
          if(res.success==true){
            if(status==2){
              utils.box.toast("修改成功","success");
              this.status=0;
              this.queryParent();
            }else{
              utils.box.toast("添加成功","success");
              this.queryParent();
            }
          }else{
            utils.box.toast(res.error.message);
          }
         }
         })
    },
    queryOrgDetail(id){ //查询组织机构详情
      let url="/api/Organization/organization/"+id;
      utils.request.get(url,true).then((res) => {
         if(res){
          if(res.success==true){
            this.orgDetail=res.result;
          }
          }
      })
    },
    queryPermission(id){ //查询组织机构详情
      let url="/api/Organization/organization/"+id+"/permission";
      utils.request.get(url,true).then((res) => {
         if(res){
          if(res.success==true){
           this.permissionList=res.result;
          }
          }
      })
    },
    queryStaff(){ //查询员工列表
      let url="/api/Organization/getEmployeeByOrg";
      let params={
  "orgId": this.currentNodeId,
  "sortField": this.sortField,
  "isDescending": this.isDescending,
  "pageIndex": this.pageIndex,
  "pageSize": this.pageSize
}
      utils.request.post(url,params,true).then((res) => {
         if(res){
          if(res.success==true){
            let data=res.result;
           this.totalCount=data.totalCount;
           this.maxPage=Math.ceil(this.totalCount/(this.pageSize*3));
           this.tableData=data.items;
          }
          }
      })
    },
    takeOrder(sortField){
      this.sortField=sortField;
      if(sortField==true){
        this.isDescending=this.order1==true?false:true;
      }else{
         this.isDescending=this.order2==true?false:true;
      }
      this.queryStaff()
    },
    removeStaff(){
      if(this.multipleSelection==[]){
        utils.box.toast("请先勾选员工！");
        return
      }
       utils.box.confirm("是否确认删除?").then(()=>{
         this.insureRemoveStaff();
       });
    },
    insureRemoveStaff(){
      let url="/api/Organization/removeEmployeeFromOrg";
        let params={
          ids:this.multipleSelection
        }
            utils.request.delete(url,params,true).then((res) => {
               if(res){
                if(res.success==true){
                  utils.box.toast("删除成功","success");
                  this.queryStaff();
                }else{
                   utils.box.toast("删除失败");
                }
                }
            })
    },
    changePage(val){
      this.pageIndex=val.pageIndex;
      this.pageSize=val.pageSize;
      this.queryStaff();
    },
    onDragStart(info){
      this.drag1=info.node.dataRef;
       console.log(info);
    },
    onDragEnter(info) {
         console.log(info);
         // expandedKeys 需要受控时设置
         // this.expandedKeys = info.expandedKeys
       },
       //拖动完成触发
       onDrop(info) {
         this.drag2=info.node.dataRef;
         if(this.drag1.type==1){

         }else if(this.drag1.type==2){

         }else{

         }
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
