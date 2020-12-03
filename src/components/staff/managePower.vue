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
      <a-tree :tree-data="treeData" show-icon default-expand-all :default-selected-keys="['0-0-0']" @select="onSelect" @onCheck="onCheck">
          <a-icon slot="switcherIcon" type="down" />
         <!-- <a-icon slot="smile" type="smile-o" />
          <a-icon slot="meh" type="smile-o" /> -->
       <!--   <template slot="custom" slot-scope="{ selected }">
            <a-icon :type="selected ? 'frown' : 'frown-o'" />
          </template> -->
        </a-tree>

    </div>
    <div class="list-main-two">

    </div>
  </div>
</template>

<script>

  export default {
    name: 'managePower',
    data() {
      return {
    treeData:[
  {
    title: 'parent 1',
    key: '0-0',
   /* slots: {
      icon: 'smile',
    }, */
    children: [
      { title: 'leaf', key: '0-0-0',  },
      { title: 'leaf', key: '0-0-1',  },
    ],
  },
]
      }
    },
    methods: {
   onSelect(selectedKeys, info) {
      console.log('selected', selectedKeys, info);
    },
    onCheck(checkedKeys, info) {
      console.log('onCheck', checkedKeys, info);
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



</style>
