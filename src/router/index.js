import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import notFound from '@/page/404'
import home from '@/page/home.vue'

import myarticle from '@/page/myarticle/myarticle.vue'
import articlerecommend from '@/page/myarticle/articlerecommend.vue'

import articleclass from '@/page/articleclass/articleclass.vue'

import system from '@/page/system/system.vue'
import aboutme from '@/page/system/aboutme.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/404',
      component: notFound,
      name: '',
      hidden: true
    },{
      path: '/',
      component: home,
      name: '我的文章',
      iconCls: 'el-icon-news', //图标样式class
      children: [
        {
          path: '/myarticle',
          component: myarticle,
          name: '文章列表'
        },{
          path: '/articleRecommend',
          component: articlerecommend,
          name: '推荐文章'
      }
      ]
    },
    {
        path: '/',
        component: home,
        name: '分类管理',
        iconCls: 'el-icon-date',
        children: [
          {
                path: '/articleclass/articleclass',
                component: articleclass,
                name: '文章分类管理'
            }
        ]
    },{
      path: '/',
      component: home,
      name: '系统设置',
      iconCls: 'el-icon-news', //图标样式class
      children: [
        {
          path: '/system',
          component: system,
          name: '基础信息'
        },{
          path: '/aboutme',
          component: aboutme,
          name: '关于我'
      }
      ]
    },
  ]
})
