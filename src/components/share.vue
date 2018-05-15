<template>
  <div class="share_component"></div>
</template>

<script>
  import WXSDK from '../assets/mUtils/_wx_js_sdk';
  import util from '../assets/mUtils/utils.js';
  const isGreaterAppVersion = util.isGreaterAppVersion;


  export default {
    props: ['link','img','title','desc'],
    data(){
      return{
        BLACK_QUERY_KEYS: ['platform', 'systemVer', 'version', 'app_ver', 'vendor', 'phoneType', 'device_id', 'push_id', 'app'],
        DEFAULT_SHARE_IMG: 'https://' + 'dn-chunyu.qbox.me/@/media/images/2016/07/12/fbfceea4eef6_w300_h300_.png',
        optFromProps: {
          link: this.link || '',
          img: this.img || '',
          title: this.title || '',
          desc: this.desc || ''
        }
      }
    },

    mounted(){
      var that = this;
      WXSDK();
      console.log('that.optFromProps::',that.optFromProps)
      that.weixinShareSetup(that.optFromProps);
      that.chunyuAppShareSetup(that.optFromProps)
    },
    methods:{
      _debug(...args){
        if (window.console && window.console.log) {
          window.console.log.apply(console,args);
        }
      },
      urlSanitize(url) {
        let urls = '';
        let key = url.split("?")[1];
        let hostname = url.split("?")[0];
        let splitHostname = hostname.split("//");
        let allpath = splitHostname[1].split("/");
        let regprotocol = /(https|http|ftp|rtsp|mms):\/\//;
        let reghostname = /chunyuyisheng.com/;
        let http = regprotocol.exec(hostname);
        let path = "";
        for (let i = 1; i < allpath.length; i++) {
          path += allpath[i] + (i === allpath.length - 1 ? "" : "/");
        }
        let splitHost = key ? key.split("&") : [];
        //删除链接中的key
        this.BLACK_QUERY_KEYS.forEach(function (value) {
          for (let i = 0; i < splitHost.length; i++) {
            let arrHost = splitHost[i].split("=");
            if (arrHost[0] === value) {
              splitHost.splice(i, 1);
            }
          }
        })
        //将链接中的剩余参数连接起来
        let joinKey = splitHost.join("&");

        //处理分享链接为weixin
        if (allpath[0].match(reghostname)) {
          if (allpath[0].split(".")[0] === "activity") {
            //完整的链接
            hostname = "activity.chunyuyisheng.com";
            urls = http[0] + hostname + "/" + path + "?" + joinKey;
            return urls
          } else {
            //完整的链接
            hostname = "weixin.chunyuyisheng.com";
            urls = http[0] + hostname + "/" + path + "?" + joinKey;
            return urls
          }
        } else {
          //完整的链接
          urls = hostname + "?" + joinKey;
          return urls;

        }
      },
      fixShareMetaData(opt) {
        let _opt = $.extend({}, opt);
        // 给定默认值
        _opt.img = _opt.img || this.DEFAULT_SHARE_IMG;
        _opt.link = _opt.link || window.location.href;
        _opt.desc = _opt.desc || window.document.title;
        _opt.title = _opt.title || window.document.title;
        // 去除app无效GET参数，替换weixin.chunyuyisheng.com域名
        _opt.link = this.urlSanitize(_opt.link);
        return _opt;

      },
      weixinShareParamsSet(wx, opt) {
        let img = opt.img;
        let link = opt.link;
        let desc = opt.desc;
        let title = opt.title;
        let success = opt.success;


        console.log("微信对象:::",wx);

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
      },
      weixinShareSetup(opt) {
        // 如果是微信
        console.log("opt======",opt);
        let opts = '';
        var that = this;
        if ($.app.weixin) {
          if (!opt) {
            this._debug('分享参数错误');
            return;
          }
          opts = this.fixShareMetaData(opt);
          this._debug('微信分享参数：');
          this._debug(opts);
          // 这里的前提是，外部必须  require('./_wx_js_sdk') 来初始化签名，保证会触发 wx_bridge_ready 事件
          $(document).on('wx_bridge_ready', function (event, wx) {
            that._debug('微信jssdk初始化完毕，执行设置微信分享动作：');
            that._debug("分享内容: ",opts);
            that.weixinShareParamsSet(wx, opts);
          });

        }
      },
      chunyuAppShareSetup(opt) {
        let opts = '';

        // 如果是客户端
        if (window.ChunyuNativeBridge && window.ChunyuNativeBridge.invoke) {
          console.log("客户端:::")
          let version = isGreaterAppVersion('8.3.12', true);
          let shareTo = null;
          if (version) {
            shareTo = [
              'weixin_haoyou',
              'weixin_pengyouquan',
              'qq_haoyou',
              'qq',
              'weibo'
            ]
          } else {
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
            need_param: {
              version: true
            },
            share_to: shareTo
          };

          if (!opt) {
            this._debug('分享参数错误');
            return;
          }

          opts = this.fixShareMetaData(opt);
          opts = $.extend({}, DEFAULT_OPT, opts);

          this._debug('调用ChunyuNativeBridge，分享参数为：');
          this._debug(opts);

          window.ChunyuNativeBridge.invoke(
            '1.0',
            'share',
            JSON.stringify(opts)

          );
        }
      }
    },
  }
</script>

