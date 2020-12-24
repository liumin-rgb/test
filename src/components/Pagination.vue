<template>
	<div class="page">
	<div class="page-totalNum">共{{totalCount}}条</div>
	<div class="page-picker">
    <div class="page-picker-show"><span>展示数据</span><select class="pc-input inputOne" v-model="pageSizeCode" style="padding-left:0px;width:auto !important;"><option v-for="(obj,index) in pageSizeList" :value="index">{{obj}}</option></select></div>
		<div class="page-picker-num">
		<div class="page-picker-num-btn" @click="prePage"><i class="el-icon-arrow-left"></i>上一页</div>
		<div @click="num !== threeDot ? (pageNo = num) : ''"
		:class="{'page-picker-num-pageNo-on':num==pageNo,'page-picker-num-pageNo':num!=threeDot,'page-picker-num-noBorder':num===threeDot}"
		 v-for="(num,i) in pages" :key="i">{{num}}</div>
		<div class="page-picker-num-btn" @click="nextPage">下一页<i class="el-icon-arrow-right"></i></div>
		</div>
		<div class="page-picker-to">跳转<input   v-model="tempPageNo" :max="maxPage" :min="1" @keyup.enter="goPage">页</div>
		<div class="page-picker-go" @click="goPage">GO</div>
	</div>
	</div>
</template>

<script>
	export default{
		name: "Pagination",
		props:{
			maxPage: {
			  type: Number,
			  default: 1
			},
      totalCount:{
        type: Number,
        default: 0
      },
      pageSizeList:{
        type:Array,
        default:[10,20,30,50,100]
      }
		},
		data(){
			return{
			pageNo:1,
      pageSizeCode:0,
			threeDot: '···',
			tempPageNo:1,
     /* pageSizeList:[10,20,30,50,100], */
		}
		},
		watch: {
      pageSizeCode(val){
        let pageSize=this.pageSizeList[val];
        let parentVal={pageSize:pageSize,pageIndex:this.pageNo};
        this.$emit('changePage', parentVal);
      },
		  pageNo(val) {
        let parentVal={pageSize:this.pageSizeList[this.pageSizeCode],pageIndex:val};
		  this.$emit('changePage', parentVal);
			this.tempPageNo=val;
		  },
		  max(val) {
		    this.maxPage = val
		  },
		  tempPageNo(newVal,oldVal) {
		    const regex = /^([0-9]*[1-9][0-9]*(.[0-9]+)?|[0]+.[0-9]*[1-9][0-9]*)$/;
		    if(!regex.test(newVal)&&newVal!='') {//如果小于等于零
		      this.tempPageNo = 1 //恢复原值
		    }
		    if(newVal > this.maxPage) {
		      this.tempPageNo = this.maxPage
		    }
		  }
		},
		computed: {
		  pages() {
		    let pages = [];
		    pages = Array.from({length: this.maxPage}, (v,k) => k + 1);
		    if(this.maxPage >= 6) {
		      pages = pages.slice((this.pageNo - 1 > this.maxPage - 4) ? (this.maxPage - 4) : (this.pageNo - 1), 2 + this.pageNo);
		      if(this.pageNo > 2) pages.unshift(this.threeDot);
		      if(pages[0] !== 1) pages.unshift(1);
		      if(2 + this.pageNo < this.maxPage - 1) pages.push(this.threeDot);
		      if(pages[pages.length - 1] !== this.maxPage) pages.push(this.maxPage);
		    }
		    return pages
		  }
		},
		methods:{
			goPage(){
				  if(/^[1-9][0-9]{0,3}$/.test(this.tempPageNo * 1)) {
				    let num = this.tempPageNo * 1;
				    this.pageNo = num > this.maxPage ? this.maxPage : num;

				  }

			},
			prePage() {
			  let num = this.pageNo - 1;
			  num = num < 1 ? 1 : num;
			  this.pageNo = num;
			},
			nextPage() {
			  let num = this.pageNo + 1;
			  num = num > this.maxPage ? this.maxPage : num;
			  this.pageNo = num
			}
		}
	}
</script>

<style lang="less" scoped>
	.page{
		display: flex;
		justify-content: space-between;
    font-size:.12rem;
    color:#999;
	&-totalNum{
		font-weight: 600;
	}
	&-picker{
		display: flex;
		align-items: center;
    &-show{
    }
	&-num{
		display: flex;
		justify-content: space-around;
		align-items: center;
	&-btn{
		/* margin-right:.5vw; */
		 cursor: pointer;
     border: 1px solid #ececec;
     border-radius: 3px;
     padding:.01rem;
	}
	&-pageNo{
		border:1px solid #d1d1d1;
		text-align:center;
    padding:0rem 0.05rem;
		margin:.02rem;
		cursor: pointer;
    border-radius: 5px;
		&:hover{
			border-color:#2e6eb4;
			color:#2e6eb4;
		}
	   &-on{
		border-color:#2e6eb4;
		color:#2e6eb4;
	   }
	   &-noBorder{
		border:none;
	   }
	}
	&-pageNo-on{
		border-color:#2e6eb4;
		color:#2e6eb4;
	}
	}
	&-to{
	 input{
		 width:.3rem;
		 height:.2rem;
		 border:1px solid #d1d1d1;
		 margin:0 0.5vw;
		 outline:none;
		 text-align:center;
     border-radius: 5px;
	 }
	}
	&-go{
		color:#fff;
		background: #2e6eb4;
		margin-left:1vw;
    padding:0 0.05rem;
    border-radius: 5px;
		cursor: pointer;
	}
	}

	}


</style>
