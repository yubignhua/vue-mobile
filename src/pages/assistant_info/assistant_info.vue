<template>
  <div class="assistant_info">
    <group>
      <cell title="手机" :value="assistantInfo.cellphone" value-align="left" class="mLabelWidth" is-link
            @click.native="showPhoneMenu(assistantInfo.cellphone)"></cell>
      <cell title="固话" :value="assistantInfo.telphone" value-align="left" class="mLabelWidth" is-link
            @click.native="showPhoneMenu(assistantInfo.telphone)"></cell>
      <cell title="微信" :value="assistantInfo.weixin" value-align="left" class="mLabelWidth"></cell>
    </group>
  </div>
</template>

<script>
  import {Group, Cell, Actionsheet} from 'vux'

  export default {
    name: "assistant_info",
    components: {
      Group,
      Cell,
      Actionsheet
    },
    data() {
      return {
        assistantInfo: {
          cellphone: "",
          telphone: "",
          weixin: ""
        }
      }
    },
    created() {
      var self = this;
      self.request.get('/cdm/assistant/contacts').then(function (res) {
        if (res.data.error_code === 0) {
          self.assistantInfo = res.data.assistant_info;
        }
        else {
          self.$vux.toast.show({
            type: "cancel",
            text: res.data.error_msg,
            position: "middle"
          })
        }
      })
    },
    methods: {
      showPhoneMenu(phone) {
        var myUrl = "tel:" + phone;
        window.location.href = myUrl;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../assets/style/mixin.scss';

  .assistant_info {
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
          left: 0;
        }

        .vux-label {
          color: #999999;
        }
        .weui-cell__ft {
          color: #323232;
        }
      }

      .mLabelWidth {
        .vux-label {
          width: rem(45);
        }
      }
    }
  }
</style>
