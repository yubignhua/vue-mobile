<template>
  <div class="user_service_add">
    <group>
      <selector title="服务类型" :options="serviceInfo.service_type" v-model="serviceInfo.currentServiceType"></selector>
      <datetime title="服务时间" v-model="serviceInfo.service_time" value-text-align="left">
        <span class="weui-label" slot="title">服务时间</span>
      </datetime>
      <cell title="服务记录" value-align="left"></cell>
      <x-textarea name="description" placeholder="请输入服务记录" v-model="serviceInfo.content"></x-textarea>
    </group>
    <div class="formAction">
      <div class="subBtn" @click="submitService">确认</div>
    </div>
  </div>
</template>

<script>
  import {Group, Datetime, Selector, Cell, XTextarea} from 'vux'
  import {getFormatDate, getServiceType} from '../../assets/mUtils/common'
  import {mapActions} from 'vuex'

  export default {
    name: "user_service_add",
    components: {
      Group,
      Datetime,
      Selector,
      Cell,
      XTextarea
    },
    data() {
      return {
        serviceInfo: {
          user_id: 0,
          service_time: "",
          service_type: [],
          currentServiceType: 1,
          content: ""
        }
      }
    },
    created() {
      this.serviceInfo.service_time = getFormatDate("yyyy-MM-dd");
      this.serviceInfo.service_type = getServiceType();

      this.serviceInfo.user_id = this.$route.query.user_id || 0;
    },
    methods: {
      ...mapActions("userService", ["addUserService"]),
      submitService() {
        var self = this;
        if (self.serviceInfo.content.trim().length < 1) {
          self.$vux.toast.show({
            type: "text",
            text: "服务记录内容不能为空！"
          });
          return;
        }

        self.addUserService(self.serviceInfo).then(res => {
          if (res.error_code === 0) {
            self.$vux.toast.show({
              type: "success",
              text: "新增服务记录成功！",
              position: "middle",
              onHide() {
                self.$router.replace({
                  path: '/cdm/cdm_mobile/userdetail/service',
                  query: {
                    "user_id": self.serviceInfo.user_id
                  }
                });
              }
            })
          }
          else {
            self.$vux.toast.show({
              type: "success",
              text: "新增服务记录失败！" + res.error_msg,
              position: "middle"
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/style/mixin.scss";

  body {
    background: #F1F1F1;

    .user_service_add {
      .weui-cells {
        margin-top: 0;
        font-size: rem(14);
        color: #999999;
        &:before {
          border-top: none;
        }

        .weui-cell {
          padding: rem(12) rem(15);
          &:before {
            left: 0;
          }

          &:last-child {
            &:before {
              border-top: none;
            }
          }

          &.vux-x-textarea {
            padding-top: 0;

            .weui-textarea {
              font-size: rem(14);
              color: #323232;
              min-height: rem(332);
              font-family: 'PingFangSC-Light';

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
          }

          .weui-label {
            width: rem(100);
          }
          .weui-select {
            height: auto;
            line-height: rem(14);
            color: #323232;
            font-family: 'PingFangSC-Light';
          }
        }

        .vux-datetime {
          .vux-cell-value {
            color: #323232;
          }
        }
      }

      .formAction {
        position: absolute;
        bottom: 0;
        left: 0;
        padding-bottom: rem(10);
        display: flex;
        justify-content: center;
        width: 100%;

        .subBtn {
          background: #1B91E0;
          height: rem(45);
          border-radius: rem(2);
          color: #FFFFFF;
          width: rem(345);
          font-size: rem(16);

          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .dp-header {
      .dp-item {
        &.dp-right {
          color: #1B91E0;
        }
      }
    }
  }

</style>
