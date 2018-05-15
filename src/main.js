import Vue from 'vue';
import FastClick from 'fastclick';
import App from './App';
import 'babel-polyfill';
import router from './router/router';
import store from './store/indexs';
import request from './assets/mUtils/request'
import './assets/mUtils/rem';
import './limit'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body);
  }, false);
}


import { DatetimePlugin, CloseDialogsPlugin, ConfigPlugin, BusPlugin, LocalePlugin, DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin, AppPlugin } from 'vux'
Vue.use(LocalePlugin);
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX'
});
Vue.use(DevicePlugin);
Vue.use(ToastPlugin);
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(LoadingPlugin);
Vue.use(WechatPlugin);
Vue.use(BusPlugin);
Vue.use(DatetimePlugin);

Vue.use(CloseDialogsPlugin, router);



console.warn('process.env.NODE_ENV === ',process.env.NODE_ENV );

if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
  //require('./mock/mock.js');
  //require('./mock/mock_wechat');
}

Vue.config.productionTip = false;
Vue.use(require('vue-wechat-title'));

Vue.prototype.request = request;
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});




/**
 * -------------------------- 微信分享 ----------------------
 *  提示无效域名// 需要在微信公众号平台绑定 appid 的安全域名 biztest.chunyu.me
 */
//const wx = Vue.wechat;
//console.log('Vue.wechat:::::::::',wx)
// wx.ready(() => {
//   console.log('wechat ready')
//   wx.onMenuShareAppMessage({
//     title: 'VUX', // 分享标题
//     desc: '基于 WeUI 和 Vue 的移动端 UI 组件库',
//     link: 'https://vux.li?x-page=wechat_share_message',
//     imgUrl: 'https://static.vux.li/logo_520.png'
//   })
//
//   wx.onMenuShareTimeline({
//     title: 'VUX', // 分享标题
//     desc: '基于 WeUI 和 Vue 的移动端 UI 组件库',
//     link: 'https://vux.li?x-page=wechat_share_timeline',
//     imgUrl: 'https://static.vux.li/logo_520.png'
//   })
// })
//
// const permissions = ['onMenuShareTimeline', 'onMenuShareAppMessage'];
// const url = document.location.href;
// console.log('permissions',permissions)
// console.log('url',url)
// Axios.post('/publicwap/wx_js_sdk_sign/?url=' + encodeURIComponent(url.split('#')[0])).then(res => {
//   console.log('res:::::::',res)
//
//   var _config = {
//     appId: res.data.appid, // 必填，公众号的唯一标识
//     timestamp: res.data.timestamp, // 必填，生成签名的时间戳
//     nonceStr: res.data.noncestr, // 必填，生成签名的随机串
//     signature: res.data.signature // 必填，签名，见附录1
//   };
//
//   _config.jsApiList = permissions;
//   wx.config(_config)
// })

