<template>
  <div class="user_service_detail">

    <group>
      <cell title="服务类型" :value="serviceInfo.service_type" value-align="left"></cell>
      <cell title="服务时间" :value="serviceInfo.service_time" value-align="left"></cell>
      <cell title="服务人员" :value="serviceInfo.oper_user_name" value-align="left"></cell>
      <cell title="服务记录内容" value-align="left"></cell>
      <x-textarea name="description" :value="serviceInfo.content" readonly></x-textarea>
    </group>

  </div>
</template>

<script>
  import {Group, Cell, XTextarea} from 'vux'
  import {getServiceTypeValue} from '../../assets/mUtils/common'

  export default {
    name: "user_service_detail",
    components: {
      Group,
      Cell,
      XTextarea
    },
    data() {
      return {
        serviceInfo: {
          service_id: 0,
          content: "",
          created_time: "",
          oper_user_name: "",
          service_type: ""
        },
      }
    },
    created() {
      var self = this;
      this.serviceInfo.service_id = self.$route.query.service_id;
      this.getService();
    },
    methods: {
      getService() {
        var self = this;
        self.request.get('/cdm/staff/service/detail', {
          params: {
            service_id: self.serviceInfo.service_id
          }
        }).then(function (res) {
          if (res.data.error_code === 0) {
            res.data.service_info.service_type = getServiceTypeValue(res.data.service_info.service_type);
            self.serviceInfo = res.data.service_info;
          }
          else {
            self.$vux.toast.show({
              type: "cancel",
              text: res.data.error_msg,
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

    .user_service_detail {
      .weui-cells {
        margin-top: 0;
        font-size: rem(14);
        &:before {
          border-top: none;
        }
        &:after {
          border-bottom: none;
        }

        .weui-cell {
          padding: rem(12) rem(15);
          &:before {
            border-top: none;
          }

          .vux-label {
            color: #999999;
            width: rem(100);
          }
          .weui-cell__ft {
            color: #323232;
          }

          &.vux-x-textarea {
            padding-top: 0;
            .weui-textarea {
              font-size: rem(14);
              color: #323232;
              min-height: rem(332);
              font-family: 'PingFangSC-Light';
              line-height: rem(22);
            }
          }
        }
      }
    }
  }

</style>
