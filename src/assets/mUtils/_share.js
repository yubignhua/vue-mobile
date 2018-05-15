import $ from 'zepto';
require("./../../../../fis-medweb/widget/share/_wx_js_sdk.js").init();
var isGreaterAppVersion = require("/widget/utils/utils").isGreaterAppVersion;

var BLACK_QUERY_KEYS = ['platform', 'systemVer', 'version', 'app_ver', 'vendor', 'phoneType', 'device_id', 'push_id', 'app'];

var DEFAULT_SHARE_IMG = 'https://' + 'dn-chunyu.qbox.me/@/media/images/2016/07/12/fbfceea4eef6_w300_h300_.png';

function _debug() {
    if (window.console && window.console.log) {
        window.console.log.apply(console, arguments);
    }
}

function urlSanitize(url) {
    var key = url.split("?")[1];
    var hostname = url.split("?")[0];
    var splitHostname = hostname.split("//");
    var allpath = splitHostname[1].split("/");
    var regprotocol = /(https|http|ftp|rtsp|mms):\/\//;
    var reghostname = /chunyuyisheng.com/;
    var http = regprotocol.exec(hostname);
    var path = "";
    for(var i = 1; i < allpath.length; i++){
        path += allpath[i] + (i==allpath.length-1 ? "" : "/");
    }
    var splitHost = key ? key.split("&") : [];
    //删除链接中的key
    BLACK_QUERY_KEYS.forEach(function (value) {
        for (var i = 0; i < splitHost.length; i++) {
            var arrHost = splitHost[i].split("=");
            if (arrHost[0] == value) {
                splitHost.splice(i, 1);
            }
        }
    })
    //将链接中的剩余参数连接起来
    var joinKey = splitHost.join("&");

    //处理分享链接为weixin
    if(allpath[0].match(reghostname)){
        if(allpath[0].split(".")[0] === "activity"){
          //完整的链接
          hostname = "activity.chunyuyisheng.com";
          return http[0] + hostname + "/" + path + "?" + joinKey;
        } else {
          //完整的链接
          hostname = "weixin.chunyuyisheng.com";
          return http[0] + hostname + "/" + path + "?" + joinKey;
        }
    }else {
        //完整的链接
        return hostname + "?" + joinKey;
    }
}

function fixShareMetaData(opt) {

    var _opt = $.extend({}, opt);

    // 给定默认值
    _opt.img = _opt.img || DEFAULT_SHARE_IMG;
    _opt.link = _opt.link || window.location.href;
    _opt.desc = _opt.desc || window.document.title;
    _opt.title = _opt.title || window.document.title;

    // 去除app无效GET参数，替换weixin.chunyuyisheng.com域名
    _opt.link = urlSanitize(_opt.link);

    return _opt;

}

function weixinShareParamsSet(wx, opt) {

    var img = opt.img;
    var link = opt.link;
    var desc = opt.desc;
    var title = opt.title;
    var success = opt.success;

    //分享到朋友圈
    wx.onMenuShareTimeline({
        title: title,   // 分享标题
        link: link,     // 分享链接
        imgUrl: img     // 分享图标
    });

    //分享给好友
    wx.onMenuShareAppMessage({
        title: title,   // 分享标题
        desc: desc,     // 分享描述
        link: link,     // 分享链接
        imgUrl: img,    // 分享图标
        type: 'link',   // 分享类型,music、video或link，不填默认为link
        dataUrl: '',     // 如果type是music或video，则要提供数据链接，默认为空,
        success: success
    });

    //分享到QQ
    wx.onMenuShareQQ({
        title: title,   // 分享标题
        desc: desc,     // 分享描述
        link: link,     // 分享链接
        imgUrl: img     // 分享图标
    });

    //分享到微博
    wx.onMenuShareWeibo({
        title: title,   // 分享标题
        desc: desc,     // 分享描述
        link: link,     // 分享链接
        imgUrl: img     // 分享图标
    });

    //分享到QQ空间
    wx.onMenuShareQZone({
        title: title,   // 分享标题
        desc: desc,     // 分享描述
        link: link,     // 分享链接
        imgUrl: img     // 分享图标
    });
}

function weixinShareSetup(opt) {

    // 如果是微信
    if ($.app.weixin) {

        if (!opt) {
            _debug('分享参数错误');
            return;
        }

        var _opt = fixShareMetaData(opt);

        _debug('微信分享参数：');
        _debug(_opt);

        // 这里的前提是，外部必须  require('./_wx_js_sdk') 来初始化签名，保证会触发 wx_bridge_ready 事件
        $(document).on('wx_bridge_ready', function (event, wx) {

            _debug('微信jssdk初始化完毕，执行设置微信分享动作：');
            _debug(_opt);

            weixinShareParamsSet(wx, _opt);
        });

    }
}

function chunyuAppShareSetup(opt) {

    // 如果是客户端
    if (window.ChunyuNativeBridge && window.ChunyuNativeBridge.invoke) {
        var version = isGreaterAppVersion('8.3.12',true);
        var shareTo = null;
        if(version){
            shareTo = [
                'weixin_haoyou',
                'weixin_pengyouquan',
                'qq_haoyou',
                'qq',
                'weibo'
            ]
        }else{
            shareTo = [
                'weixin_haoyou',
                'weixin_pengyouquan',
                'qq',
                'weibo'
            ]
        }
        var DEFAULT_OPT = {
            btn_visible: true, // 右上角分享按钮的可见性
            do_share: false, // 不立即弹出分享菜单
            need_param:{
                version:true
            },
            share_to: shareTo
        };

        if (!opt) {
            _debug('分享参数错误');
            return;
        }

        var _opt = fixShareMetaData(opt);
        _opt = $.extend({}, DEFAULT_OPT, _opt);

        _debug('调用ChunyuNativeBridge，分享参数为：');
        _debug(_opt);

        window.ChunyuNativeBridge.invoke(
            '1.0',
            'share',
            JSON.stringify(_opt)
        );
    }
}

// jquery插件
/* eslint-disable */
$.fn.chunyuShareSet = function (opt) {
    var $this = this;
    opt = opt || {};

    var optFromDom = {};
    optFromDom.link = $this.data('link');
    optFromDom.img = $this.data('img');
    optFromDom.title = $this.data('title');
    optFromDom.desc = $this.data('desc');

    opt = $.extend({}, optFromDom, opt);

    weixinShareSetup(opt);
    chunyuAppShareSetup(opt);
};
/* eslint-enable */

module.exports = {
    // 这里的前提是，外部必须  require('./_wx_js_sdk') 来初始化签名，保证会触发 document的wx_bridge_ready 事件
    weixinShareSetup: weixinShareSetup,
    chunyuAppShareSetup: chunyuAppShareSetup
};
