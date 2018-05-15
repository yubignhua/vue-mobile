/**
 * Created by zongkelong on 2017/4/7.
 */
function _detectApp(ua) {
  var app = this.app = this.app || {},
    // 春雨App（包括用户端/医生端等）
    chunyuApp = ua.match(/Chunyu.+?\s*?([\d.]+)/),
    //春雨悦读
    chunyuyuedu = ua.match(/ChunyuNews\s*?[\/]{0,1}\s*?([\d.]+)/),
    //春雨医生
    chunyuyisheng = ua.match(/Chunyuyisheng\s*?[\/]{0,1}\s*?([\d.]+)/),
    // 春雨诊所
    chunyuclinic = ua.match(/ChunyuClinic\s*?[\/]{0,1}\s*?([\d.]+)/),
    //微信
    weixin = ua.match(/MicroMessenger\s*?[\/]{0,1}\s*?([\d.]+)/),
    //微博
    weibo = ua.match(/Weibo/);

  if (chunyuApp) app.chunyuApp = chunyuApp[1];
  if (chunyuyuedu) app.chunyuyuedu = chunyuyuedu[1];
  if (chunyuyisheng) app.chunyuyisheng = chunyuyisheng[1];
  if (chunyuclinic) app.chunyuclinic = chunyuclinic[1];
  if (weixin) app.weixin = weixin[1];
  if (weibo) app.weibo = true;
}

function detectApp() {
  _detectApp.call($, navigator.userAgent);
}

// 春雨app
function isFromCYall() {
  if (!$.app) {
    detectApp();
  }
  return !!$.app.chunyuApp;
}

// 春雨医生
function isFromCY() {
  if (!$.app) {
    detectApp();
  }
  return !!$.app.chunyuyisheng;
}

// 春雨诊所
function isFromCYClinic() {
  if (!$.app) {
    detectApp();
  }
  return !!$.app.chunyuclinic;
}

//判断是否大于等于某个app version
function isGreaterAppVersion(appVersion, includeEqual) {
  if (!$.app) {
    detectApp();
  }
  if (!$.app.chunyuApp) {
    return false;
  }
  var currentVersions = $.app.chunyuApp.split('.'),
    appVersions = appVersion.split('.'),
    currentLen = currentVersions.length,
    len = appVersions.length,
    currentV = null,
    appV = null;
  for (var i = 0; i < currentLen && i < len; i++) {
    currentV = parseFloat(currentVersions[i][0] === 0 ? '0.' + currentVersions[i] : currentVersions[i]) || 0;
    appV = parseFloat(appVersions[i][0] === 0 ? '0.' + appVersions[i] : appVersions[i]) || 0;
    if (currentV > appV) {
      return true;
    } else if (currentV < appV) {
      return false;
    }
  }
  //实际版本号等于传入的appVersion,根据includeEqual判断是否包含等于关系
  //includeEqual为true则实际大于等于appVersion时返回true
  //includeEqual为false则实际大于appVersion时返回true
  if (includeEqual) {
    return true;
  } else {
    return false;
  }
}


// 获取url中参数
function getQueryStr(key) {
  var queryString = location.search.match(new RegExp("[\?\&]" + key + "=([^\&]*)(\&?)", "i")),
    val = (queryString && queryString.length > 1 && queryString[1]) || "";
  return decodeURIComponent(val);
}

//
// function getVersion() {
//   if (!$.app) {
//     detectApp();
//   }
//   if (!$.app.chunyuApp) {
//     return false;
//   }
//   var currentVersions = $.app.chunyuApp.split('.'),
//     currentLen = currentVersions.length,
//     currentV = null;
//   for (var i = 0; i < currentLen; i++) {
//     currentV = parseFloat(currentVersions[i][0] === 0 ? '0.' + currentVersions[i] : currentVersions[i]) || 0;
//     if(currentV){
//       return currentV
//     }
//   }
// }
//



module.exports = {
  getQueryStr: getQueryStr,
  detectApp: detectApp,
  isFromCYall: isFromCYall,
  isFromCY: isFromCY,
  isFromCYClinic: isFromCYClinic,
  isGreaterAppVersion: isGreaterAppVersion,
};
