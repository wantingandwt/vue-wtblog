import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import home from '@/page/home.vue'

import myarticle from '@/page/myarticle.vue'
import articleeye from '@/page/articleeye'
import index from '@/page/index.vue'

import articleclass from '@/page/articleclass.vue'

import system from '@/page/system.vue'
import banner from '@/page/banner.vue'

import info from '@/page/info.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      component: home,
      name: 'home',
			children: [
				{
					path: '/index',
					component: index,
					iconCls: 'el-icon-menu',
					name: '系统首页'
				},
					{
						path: '/myarticle',
						component: myarticle,
						iconCls: 'el-icon-document',
						name: '文章管理',
					},
					{
						path: '/articleclass',
						component: articleclass,
						name: '文章分类管理',
						iconCls: 'el-icon-date',
					},
					{
						path: '/banner',
						component: banner,
						name: '轮播图管理',
						iconCls: 'el-icon-picture-outline',
					},
					{
						path: '/system',
						component: system,
						name: '基础信息',
						iconCls: 'el-icon-setting',
					},
					{
						path: '/info',
						component: info,
						name: '个人信息',
						iconCls: 'el-icon-news',
					},
					{
						path: '/articleeye/:id',
						component: articleeye,
						name: '文章详情页'
					}
			]
		}
  ]
})
