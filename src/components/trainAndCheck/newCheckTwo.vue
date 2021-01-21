<template>
    <div v-show="step==2">
    <div class="flexBtw">
      <div >
      </div>
      <div>
       <span class="pc-button buttonNoback" @click="prevStep">返回上一步</span>
       <span class="pc-button buttonNoback" @click="saveDraft">保存草稿</span>
       <span class="pc-button" @click="nextStep">保存并进入下一步</span>
      </div>
    </div>
   <div class="list-main-body">
      <div class="list-head" >
        <div ><i class="iconfont icon-jiantou themeColor"></i>选择题目</div>
        </div>
        <div >
       <a-radio-group name="radioGroup" :default-value="1" ><a-radio :value="1">手动选择题目</a-radio><a-radio :value="2">自动选择题目</a-radio></a-radio-group>
       <div class="marginT2VH">
         <div class="flex">
           <div><span class="pc-button buttonNoback" @click="chooseQuestion">选择题目</span></div>
           <div class=" textInput"><span class="label2"><span class="icon-xing">*</span>及格分数</span><input class='pc-input middleInput' placeholder="请输入"/></div>
         </div>
         <div class="tab">
         <div>
           <span>单选题</span>
          <el-table
                :data="tableData1"
                border
                style="width: 100%"
                height="30vh"
               :header-cell-class-name="'table-header'">
               <el-table-column align="center" width="60">
                 <template slot-scope="scope">
                   <i class="iconfont icon-shanchu themeColor font20 pointer" ></i>
                  </template>
                 </el-table-column>
               <el-table-column type="expand">
                    <template slot-scope="props">
                      <div>以下哪些定义为危险化学品</div>
                      <div><span>A.三乙基铝</span><span>B.三异丁基铝</span><span>C.铝粉</span><span>D.镁粉</span></div>
                    </template>
               </el-table-column>
              <el-table-column prop="number" label="试题编号"></el-table-column>
              <!--  <el-table-column prop="type" label="试题类型"></el-table-column> -->
               <el-table-column prop="category" label="试题分类"></el-table-column>
                <el-table-column prop="easy" label="难易程度"></el-table-column>
               <!-- <el-table-column prop="type1" label="试题类别"></el-table-column> -->
                <el-table-column prop="trueOption" label="正确选项"></el-table-column>
                <el-table-column prop="content" label="试题题目内容（文字）"  min-width="120"></el-table-column>
                <el-table-column prop="score" label="试题题目分数"></el-table-column>

              </el-table>
         </div>
         <div>
           <span>多选题</span>
           <el-table
                 :data="tableData2"
                 border
                 style="width: 100%"
                 height="30vh"
                :header-cell-class-name="'table-header'">
                <el-table-column align="center" width="60">
                  <template slot-scope="scope">
                    <i class="iconfont icon-shanchu themeColor font20 pointer" ></i>
                   </template>
                  </el-table-column>
                <el-table-column type="expand">
                     <template slot-scope="props">
                       <div>以下哪些定义为危险化学品</div>
                       <div><span>A.三乙基铝</span><span>B.三异丁基铝</span><span>C.铝粉</span><span>D.镁粉</span></div>
                     </template>
                </el-table-column>
                 <el-table-column prop="number" label="试题编号"></el-table-column>
                 <el-table-column prop="type" label="试题类型"></el-table-column>
                 <el-table-column prop="category" label="专业分类"></el-table-column>
                 <el-table-column prop="easy" label="难易程度"></el-table-column>
                 <el-table-column prop="type1" label="试题类别"></el-table-column>
                 <el-table-column prop="trueOption" label="正确选项"></el-table-column>
                 <el-table-column prop="content" label="试题题目内容（文字）"  min-width="120"></el-table-column>
                 <el-table-column prop="score" label="试题题目分数"></el-table-column>

               </el-table>
         </div>
         <div>
           <span>不定项选择题</span>
           <el-table
                 :data="tableData3"
                 border
                 style="width: 100%"
                 height="30vh"
                :header-cell-class-name="'table-header'">
                <el-table-column align="center" width="60">
                  <template slot-scope="scope">
                    <i class="iconfont icon-shanchu themeColor font20 pointer" ></i>
                   </template>
                  </el-table-column>
                <el-table-column type="expand">
                      <template slot-scope="props">
                        <div>以下哪些定义为危险化学品</div>
                        <div><span>A.三乙基铝</span><span>B.三异丁基铝</span><span>C.铝粉</span><span>D.镁粉</span></div>
                      </template>
                 </el-table-column>
                <el-table-column prop="number" label="试题编号"></el-table-column>
                  <el-table-column prop="type" label="试题类型"></el-table-column>
                  <el-table-column prop="category" label="专业分类"></el-table-column>
                  <el-table-column prop="easy" label="难易程度"></el-table-column>
                  <el-table-column prop="type1" label="试题类别"></el-table-column>
                  <el-table-column prop="trueOption" label="正确选项"></el-table-column>
                  <el-table-column prop="content" label="试题题目内容（文字）"  min-width="120"></el-table-column>
                  <el-table-column prop="score" label="试题题目分数"></el-table-column>
               </el-table>
         </div>
         </div>
       </div>
      </div>
    </div>
    <ChooseQuestion :visible="visible" @closeModel="closeModel"/>
    </div>
  </template>
  <script>
    import ChooseQuestion from './chooseQuestion'
   export default {
      name: 'newCheckTwo',
      components:{ChooseQuestion},
      props:{
        step:{
          type:Number,
          default:1
        },
      },
      data(){
        return{
        pageIndex: 1,
        pageSize:10,
        maxPage: 1,
        totalCount:0,
        tableData1:[
          {
            number:'1',
            type:'单选',
            category:'入职考试',
            easy:'简单',
            type1:'',
            trueOption:'A',
            content:'',
            score:'5'
          }
        ],
        tableData2:[
            {
              number:'2',
              type:'多选',
              category:'入职考试',
              easy:'简单',
              type1:'',
              trueOption:'A',
              content:'',
              score:'5'
            }

        ],
        tableData3:[
          {
              number:'3',
              type:'不定项',
              category:'入职考试',
              easy:'简单',
              type1:'',
              trueOption:'A',
              content:'',
              score:'5'
            }],
        visible:false,

        }
      },
     methods:{
       prevStep(){
        this.$emit("changeStep",1);
       },
       chooseQuestion(){
          this.visible=true;
       },
       saveDraft(){

       },

       deleteFile(){

       },
       nextStep(){
        this.$emit("changeStep",3);
       },
       closeModel(){
         this.visible=false;
       },
     },
   }

  </script>
  <style scoped lang="less">
.tab{
  height:55vh;
  overflow: auto;
}
/deep/.el-table__expanded-cell{
  padding:5px 50px !important;
  }
 </style>
