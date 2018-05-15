'use strict';
import util from './utils.js';
util.detectApp();
//升级JSSDK到1.2.0
var WEIXIN_JS_SDK_JS = '//res.wx.qq.com/open/js/jweixin-1.2.0.js';
var WEIXIN_JS_SDK_SIGN_URL = '/publicwap/wx_js_sdk_sign/?url=';
var WEIXIN_JS_SDK_API_LIST = [
  'checkJsApi',
  'onMenuShareTimeline',
  'onMenuShareAppMessage',
  'onMenuShareQQ',
  'onMenuShareWeibo',
  'hideMenuItems',
  'showMenuItems',
  'hideAllNonBaseMenuItem',
  'showAllNonBaseMenuItem',
  'translateVoice',
  'startRecord',
  'stopRecord',
  'onRecordEnd',
  'playVoice',
  'pauseVoice',
  'stopVoice',
  'uploadVoice',
  'downloadVoice',
  'chooseImage',
  'previewImage',
  'uploadImage',
  'downloadImage',
  'getNetworkType',
  'openLocation',
  'getLocation',
  'hideOptionMenu',
  'showOptionMenu',
  'closeWindow',
  'scanQRCode',
  'chooseWXPay',
  'openProductSpecificView',
  'addCard',
  'chooseCard',
  'openCard'
];

(function() {
      /**
       * 动态加载js文件
       * @param  {string}   url      js文件的url地址
       * @param  {Function} callback 加载完成后的回调函数
       */
  var _getScript = function(url, callback) {
    var head = document.getElementsByTagName('head')[0],
      js = document.createElement('script');

    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', url);

    head.appendChild(js);

        //执行回调
    var callbackFn = function(){
      if(typeof callback === 'function'){
        callback();
      }
    };

    if (document.all) { //IE
      js.onreadystatechange = function() {
        if (js.readyState === 'loaded' || js.readyState === 'complete') {
          callbackFn();
        }
      }
    } else {
      js.onload = function() {
        callbackFn();
      }
    }
  }

     //如果使用的是zepto，就添加扩展函数

     if(typeof($)==='function'){
         $.getScript = _getScript;
     }
})();
function signWeixinJsSdk(sdkSignUrl, isDebug) {

  if ($.app.weixin && !window.wx) {
    $.getScript(WEIXIN_JS_SDK_JS, function () {
      //注册js sdk签名
      var url = (sdkSignUrl || WEIXIN_JS_SDK_SIGN_URL) + window.location.href.split('#')[0];
      console.log("url:::::",url);
      $.ajax({
        url: url,
        global: false,
        cache: false,
        success: function (d) {
          console.log("==============/publicwap/wx_js_sdk_sign/?url= net::: res===============",d);
          var _config = {
            appId: d.appid, // 必填，公众号的唯一标识
            timestamp: d.timestamp, // 必填，生成签名的时间戳
            nonceStr: d.noncestr, // 必填，生成签名的随机串
            signature: d.signature // 必填，签名，见附录1
          };

          _config.debug=!!isDebug;
          _config.jsApiList = WEIXIN_JS_SDK_API_LIST;

          window.wx.config(_config);

          //注意config失败也会调用wx.ready方法，且无参数
          window.wx.error(function(res) {
            $(document).trigger('wx_bridge_error', [res]);
          });

          window.wx.ready(function () {
            $(document).trigger('wx_bridge_ready', [window.wx]);
          });

        }
      });
    });
  }
}


export default signWeixinJsSdk;
