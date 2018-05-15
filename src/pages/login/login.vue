<template>
  <div class="login">
    <img src="../../assets/images/logo.png" class="top_logo"/>
    <div class="login_form">
      <group class="login_group">
        <x-input title="手机号" mask="99999999999" v-model="phone" :max="13" is-type="china-mobile"
                 placeholder="请输入手机号码"></x-input>
        <x-input title="验证码" v-model="vcode" class="weui-vcode" placeholder="短信验证码" :show-clear="false">
          <div slot="right" class="vode_btn" @click="showPicVCodeBox">获取验证码</div>
        </x-input>

      </group>
      <div class="btn_wrapper">
        <x-button action-type="button" @click.native="login">登 录</x-button>
        <div class="tip">如果您希望关联加入的健康信息，请使用手机号进行绑定</div>
      </div>
    </div>
    <div v-transfer-dom class="user_transfer_dom">
      <confirm v-model="showPicVCode" title="请输入图片中信息" @on-confirm="checkPicVCode">
        <div slot="default" class="picVCodeBox">
          <div class="inputBox">
            <input placeholder="请输入" class="picVCodeInput" v-model="userPicInput"/>
            <span class="picVCodeTip">点击图片刷新</span>
          </div>
          <img class="picVCodeImg" :src="picVCodeUrl" @click="getPicVCode">
        </div>
      </confirm>
    </div>
  </div>
</template>

<script>
  //import {MixinSetInterval,MixinRouterState} from '../../assets/mUtils/mixin.js';
  //import {ToastPlugin,AlertPlugin,XHeader,Toast,Actionsheet,XButton,Group, Cell,XSwitch} from 'vux'
  //将 vux toastPlugin 对象注入 vue组件 可以调用 toastPlugin相关方法 => this.$vux.show()

  import {mapActions, mapMutations} from 'vuex'
  import {XInput, Group, Cell, XButton, Confirm, TransferDomDirective as TransferDom} from 'vux'
  import {isvalidPhone} from '../../assets/mUtils/validate'
  import Cookies from 'js-cookie'

  export default {
    name: "login",
    directives: {
      TransferDom
    },
    components: {
      XInput,
      Group,
      Cell,
      XButton,
      Confirm
    },
    data() {
      return {
        vcode: Cookies.get('pass') || '',
        phone: Cookies.get('mPhone') || '',
        picVCodeUrl: "",
        picVCodeKey: "",
        userPicInput: "",
        showPicVCode: false,
      }
    },
    methods: {
      ...mapActions(['getUerInfo']),
      ...mapMutations('userHealth', ['SAVE_USER_HEALTH_DATA']),
      /**
       * 登录方法
       */
      login() {
        var self = this;
        if (self.phone.trim().length < 1) {
          self.$vux.toast.show({
            type: 'text',
            text: "电话不能为空",
          });
          return;
        }
        if (self.vcode.trim().length < 1) {
          self.$vux.toast.show({
            type: 'text',
            text: "验证码不能为空",
          });
          return;
        }
        const valid = isvalidPhone(self.phone);
        if (valid) {
          Cookies.set('mPhone', self.phone);
          Cookies.set('pass', self.vcode);
          self.getUerInfo({phone: self.phone, vcode: self.vcode}).then((res) => {
          	console.log(':::',res)
            if (res.error_code === 0) {//登录成功
              switch (res.role[0]) {
                case 'assistant'://医助权限
                  self.$router.replace('/cdm/cdm_mobile/userlist');
                  break;
                case 'doctor'://医生权限
                  self.$router.replace('/cdm/cdm_mobile/userlist');
                  break;
                case 'user'://用户权限
                  this.request.get('/cdm/user/health/detail', {
                    params: {
                      user_id: 0
                    }
                  }).then(function (res) {
                    if (res.data.error_code === 0) {
                      let userInfo = res.data.user_info;
                      self.SAVE_USER_HEALTH_DATA(userInfo);
                      if (userInfo.name === ""
                        || userInfo.sex === ""
                        || userInfo.age === "" || userInfo.age <= 0
                        || userInfo.height === "" || userInfo.height <= 0
                        || userInfo.weight === "" || userInfo.weight <= 0
                        || userInfo.illness_history === "") {
                        self.$router.replace({
                          path: "/cdm/cdm_mobile/health_edit",
                          query: {
                            "user_id": self.user_id
                          }
                        });
                      }
                      else {
                        self.$router.replace('/cdm/cdm_mobile/userdetail');
                      }
                    }
                    else {
                      self.$vux.toast.show({
                        type: 'cancel',
                        text: "用户健康信息获取失败！" + res.data.error_msg,
                        position: 'middle'
                      });
                    }
                  })
                  break;
              }
            }
            else {
              self.$vux.toast.show({
                type: 'cancel',
                text: res.error_msg,
                position: 'middle'
              });
            }
          })
        } else {
          self.$vux.toast.show({
            type: 'cancel',
            text: "请输入正确的手机号码",
            position: 'middle'
          });
        }
      },
      /**
       * 获取验证码
       */
      async getVcode() {
        const vCode = await this.request.post('/cdm/accounts/send_sms_code', {
          cellphone: this.phone
        });
        if (vCode.data.error_code === 0) {
          this.$vux.toast.show({
            type: 'success',
            text: "获取验证码成功",
            position: "middle"
          });
        } else {
          this.$vux.toast.show({
            type: 'warn',
            text: vCode.data.error_msg,
            position: "middle"
          });
        }
      },
      // 显示图形验证码
      showPicVCodeBox() {
        this.getPicVCode();
        this.showPicVCode = true;
      },
      // 获取图形验证码
      async getPicVCode() {
        const picVCode = await this.request.get('/api/accounts/captcha/request');
        if (picVCode.data.image_url) {
          this.picVCodeUrl = picVCode.data.image_url;
          this.picVCodeKey = picVCode.data.key;
        }
        else {
          this.$vux.toast.show({
            type: "text",
            text: "图形验证码获取失败！"
          })
        }
      },
      // 验证图形验证码
      async checkPicVCode() {
        var self = this;
        if (this.userPicInput.trim().length < 1) {
          self.$vux.toast.show({
            type: "text",
            text: "输入信息不能为空！",
            onHide() {
              self.showPicVCodeBox();
            }
          })
          return;
        }
        const checkResult = await self.request.post('/api/accounts/captcha/check/', {
          captcha_0: self.picVCodeKey,
          captcha_1: self.userPicInput,
          phone_num: self.phone
        });
        if (checkResult.data.success) {
          self.$vux.toast.show({
            type: "text",
            text: "验证成功！",
            onHide() {
              self.getVcode();
            }
          })
        }
        else {
          self.$vux.toast.show({
            type: "text",
            text: "验证失败！" + checkResult.data.error_msg,
            onHide() {
              self.showPicVCodeBox();
            }
          })
        }
      }
    },
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../assets/style/mixin.scss';

  .login {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: #FFFFFF;

    .top_logo {
      width: rem(187);
      margin-top: rem(42);
    }

    .login_form {
      width: 100%;

      .login_group {
        padding: 0 rem(15);
        .weui-cells {
          &:before {
            border-top: none;
          }
          &:after {
            left: 0;
          }
          .weui-cell {
            padding: rem(21) 0 rem(12) 0;
            &:before {
              left: 0;
            }

            .weui-label {
              width: rem(75);
              font-size: rem(15);
              color: #323232;
              line-height: rem(16);
            }

            .weui-input {
              font-size: rem(15);
              line-height: rem(16);

              &::-webkit-input-placeholder {
                color: #C2C2C2;
                font-family: 'PingFangSC-Light';
              }
              &:-moz-placeholder {
                color: #C2C2C2;
                font-family: 'PingFangSC-Light';
              }
              &:-ms-input-placeholder {
                color: #C2C2C2;
                font-family: 'PingFangSC-Light';
              }
            }
            .vode_btn {
              font-size: rem(15);
              color: #1E8FE0;
              line-height: rem(16);
            }
          }
        }
      }
      .btn_wrapper {
        padding: rem(30) rem(15) 0 rem(15);

        .weui-btn {
          height: rem(45);
          color: #FFFFFF;
          font-size: rem(16);
          font-weight: 200;
          background-color: #1B91E0;
          border: 1px solid #1B91E0;
          border-radius: rem(2);

          &:after {
            border: 1px solid #1B91E0;
            border-radius: rem(2);
          }
        }

        .tip {
          font-size: rem(13);
          color: #999999;
          line-height: rem(13);
          margin-top: rem(14);
          text-align: center;
        }
      }
    }
  }

  .user_transfer_dom {
    .weui-dialog__btn_primary {
      color: #1B91E0;
    }
    .picVCodeBox {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;

      .picVCodeImg {
        flex: 1;
        height: rem(45);
        width: rem(90);
      }

      .inputBox {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        .picVCodeInput {
          flex: 1;
          width: rem(130);
          border: 1px solid #999999;
          border-radius: 0;
          padding: rem(8) 0 rem(8) rem(10);
          color: #323232;
          font-size: rem(15);
          line-height: rem(16);
          letter-spacing: rem(-0.36);
        }

        .picVCodeTip {
          flex: 1;
          font-size: rem(12);
          color: #666666;
          margin-top: rem(5);
        }
      }
    }
  }

</style>
