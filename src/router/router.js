/**
 * Created by yubh on 2018/3/10.
 */
import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/indexs';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({showSpinner: false});
//引入内嵌页面
// import Home from '../pages/home/home'
// import TabHome from '../pages/tab_home/tab_home'
// import OnlineAsk from '../pages/online_ask/online_ask'
import Login from '../pages/login/login'
import AppWrapper from '../pages/app_container/app_container'
//引入懒加载页面
const cat = r => require.ensure([], () => r(require('../pages/cat/cat')), 'cat');
// const pageMore = r => require.ensure([], () => r(require('../pages/page_one/page_one')), 'page_one');

// 慢性病用户列表
const UserList = r => require.ensure([], () => r(require('../pages/user_list/user_list')), 'user_list');

// 慢性病用户信息
const UserDetail = r => require.ensure([], () => r(require('../pages/user_detail/user_detail')), 'user_detail');

const UserHealth = r => require.ensure([], () => r(require('../pages/user_health/user_health')), 'user_health');
const UserHealthEdit = r => require.ensure([], () => r(require('../pages/user_health_edit/user_health_edit')), 'user_health_edit');

const UserDrug = r => require.ensure([], () => r(require('../pages/user_drug/user_drug')), 'user_drug');
const UserDrugAdd = r => require.ensure([], () => r(require('../pages/user_drug_add/user_drug_add')), 'user_drug_add');

const UserPressure = r => require.ensure([], () => r(require('../pages/user_pressure/user_pressure')), 'user_pressure');
const UserPressureUpload = r => require.ensure([], () => r(require('../pages/user_pressure_upload/user_pressure_upload')), 'user_pressure_upload');
const UserPressureReport = r => require.ensure([], () => r(require('../pages/user_pressure_report/user_pressure_report')), 'user_pressure_report');

const UserService = r => require.ensure([], () => r(require('../pages/user_service/user_service')), 'user_service');
const UserServiceAdd = r => require.ensure([], () => r(require('../pages/user_service_add/user_service_add')), 'user_service_add');
const UserServiceDetail = r => require.ensure([], () => r(require('../pages/user_service_detail/user_service_detail')), 'user_service_detail');

// 健康助理信息
const AssistantInfo = r => require.ensure([], () => r(require('../pages/assistant_info/assistant_info')), 'assistant_info');

// 健康日历
const UserCalendar = r => require.ensure([], () => r(require('../pages/user_calendar/user_calendar')), 'user_calendar');

// 配置页面路由
const routes = [
  {path: '/cdm', redirect: 'cdm/cdm_mobile/login'},
  {path: '/cdm/cdm_mobile', redirect: 'cdm/cdm_mobile/login'},
  {
    path: '/cdm/cdm_mobile',
    component: AppWrapper,
    children:
      [
        {path: 'login', meta: {title: '登录', keepAlive: true}, component: Login,},
        {path: 'cat', meta: {title: '个人中心', keepAlive: true}, component: cat,},
        {
          path: '404',
          meta: {title: '404'},
          component: r => require.ensure([], () => r(require('../pages/errorPage/404')), '404'),
          hidden: true
        },
        {
          path: '401',
          meta: {title: '401'},
          component: r => require.ensure([], () => r(require('../pages/errorPage/401')), '401'),
          hidden: true
        },

        //测试用
        // {
        //   path: 'home',
        //   component: TabHome,
        //   children: [
        //     {
        //       path: 'mainHome',
        //       component: Home,
        //       meta: {title: '慢性病管理'},
        //       children: [{path: 'page_one', meta: {title: 'page_one'}, component: pageMore}]
        //     },
        //     {path: 'cat', component: cat, meta: {title: '个人中心'}, children: [{path: 'mainPage', component: OnlineAsk}]},
        //     {path: 'online_ask', component: OnlineAsk, meta: {title: '在线问诊'}}
        //   ]
        // },

        // 用户详情
        {
          path: 'userdetail',
          component: UserDetail,
          redirect: 'userdetail/health',
          children: [
            {path: 'health', component: UserHealth, meta: {title: '慢性病用户信息', keepAlive: true}},
            {path: 'drug', component: UserDrug, meta: {title: '慢性病用户信息', keepAlive: true}},
            {path: 'pressure', component: UserPressure, meta: {title: '慢性病用户信息', keepAlive: true}},
            {path: 'service', component: UserService, meta: {title: '慢性病用户信息', keepAlive: true}},
          ]
        },
        {path: 'health_edit', component: UserHealthEdit, meta: {title: '基本信息', keepAlive: false}},
        {path: 'drug_add', component: UserDrugAdd, meta: {title: '新增服用药物', keepAlive: false}},
        {path: 'pressure_upload', component: UserPressureUpload, meta: {title: '手动上传血压记录', keepAlive: false}},
        {path: 'pressure_report', component: UserPressureReport, meta: {title: '上传动态血压', keepAlive: false}},
        {path: 'service_add', component: UserServiceAdd, meta: {title: '新增服务记录', keepAlive: false}},
        {path: 'service_detail', component: UserServiceDetail, meta: {title: '服务记录详情', keepAlive: false}},
        // 用户列表
        {path: 'userlist', component: UserList, meta: {title: '慢性病用户管理', keepAlive: true}},
        // 医助信息
        {path: 'assistant', component: AssistantInfo, meta: {title: '健康助理信息', keepAlive: false}},
        // 健康日历
        {path: "calendar", component: UserCalendar, meta: {title: '健康日历', keepAlive: false}}
      ]
  },
];


// 实例化路由对象
Vue.use(Router);
// export default new Router({ mode: 'history', routes });

const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return {x: 0, y: 0};
  },
});

// router.beforeEach((to, from, next) => {
//     NProgress.start()
//     if (to.matched.length === 0) {
//       from.name ? next({name: from.name}) : next('cdm/cdm_mobile/404');
//     } else {
//       store.commit('updateLoadingStatus', {isLoading: true})
//       next();
//     }
//   }
// );
//
// router.afterEach(function (to) {
//   store.commit('updateLoadingStatus', {isLoading: false});
//   NProgress.done();
//
// });


export default router
