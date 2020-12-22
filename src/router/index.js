import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
   //mode:'history',
   //base: '/',
  routes: [
     {
        path: '/',
        redirect : 'login',
        meta : {
            title : '登录页'

	}
  },
  {
        path: '/login',
        name:'login',
        component: resolve => require(['@/page/login'], resolve),
        meta : {
            title : '登录页',
  		      noLogin:true
        }
  },
 {
       path: '/home',
       name:'home',
       component: resolve => require(['@/page/home'], resolve),
       meta : {
           title : '首页'
       },
       children:[
         {
           path: '/fileList',
           name:'fileList',
           component: resolve => require(['@/components/file/fileList'], resolve),
           meta : {
               title : '文件列表'
           },
         },
         {
           path: '/fileManage',
           name:'fileManage',
           component: resolve => require(['@/components/file/fileManage'], resolve),
           meta : {
               title : '文件管理'
           },
         },
         {
           path: '/editHtml',
           name:'editHtml',
           component: resolve => require(['@/components/file/editHtml'], resolve),
           meta : {
               title : '编辑html'
           },
         },
         {
           path: '/fileDetail',
           name:'fileDetail',
           component: resolve => require(['@/components/file/fileDetail'], resolve),
           meta : {
               title : '文件详情'
           },
         },
         {
           path: '/myTask',
           name:'myTask',
           component: resolve => require(['@/components/task/myTask'], resolve),
           meta : {
               title : '我的任务'
           },
         },
         {
           path: '/examineFile',
           name:'examineFile',
           component: resolve => require(['@/components/task/examineFile'], resolve),
           meta : {
               title : '审批文档'
           },
         },
         {
           path: '/staffInfo',
           name:'staffInfo',
           component: resolve => require(['@/components/staff/staffInfo'], resolve),
           meta : {
               title : '人员信息'
           },
         },
         {
           path: '/editStaff',
           name:'editStaff',
           component: resolve => require(['@/components/staff/editStaff'], resolve),
           meta : {
               title : '编辑人员信息'
           },
         },
         {
           path: '/managePower',
           name:'managePower',
           component: resolve => require(['@/components/staff/managePower'], resolve),
           meta : {
               title : '权限分配'
           },

         },
         {
          path: '/trainIndex',
          name:'trainIndex',
          component: resolve => require(['@/components/trainAndCheck/trainIndex'], resolve),
          meta : {
              title : '培训考核首页'
          },
        },
        {
          path: '/newIndex',
          name:'newIndex',
          component: resolve => require(['@/components/trainAndCheck/newIndex'], resolve),
          meta : {
              title : '新建培训考核'
          },
        },
        {
          path: '/questionBank',
          name:'questionBank',
          component: resolve => require(['@/components/trainAndCheck/questionBank'], resolve),
          meta : {
              title : '题库管理'
          },
        },
       ],
 },
 {
       path: '/personalHome',
       name:'personalHome',
       component: resolve => require(['@/page/personalHome'], resolve),
       meta : {
           title : '主页',
       },
       children:[
         {
               path: '/changePassword',
               name:'changePassword',
               component: resolve => require(['@/page/changePassword'], resolve),
               meta : {
                   title : '修改密码',
               }
         },
         {
               path: '/superADM',
               name:'superADM',
               component: resolve => require(['@/page/superADM'], resolve),
               meta : {
                   title : 'superADM',

               }
         },
       ]
 },

 /* {
   path: '/tinymce',
   name:'tinymce',
   component: resolve => require(['@/page/tinymce'], resolve),
   meta : {
       title : '编辑'
   },
 }, */
 {
   path: '/sysConfigEdit',
   name:'sysConfigEdit',
   component: resolve => require(['@/page/sysConfigEdit'], resolve),
   meta : {
       title : '编辑1'
   },
 }
  ]
})


router.beforeEach((to, from, next) => {
 /* if(!to.meta.noLogin) {
    const token = utils.cache.get('TOKEN') || ''

		if(token) {
		  //TODO 验证TOKEN获取用户信息
		} else {
		  return router.push('login')
		}
  } */
  next();
});
 router.afterEach((to,from)=>{
	document.title=to.meta.title||'';
})
export default router
