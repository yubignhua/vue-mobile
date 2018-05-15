<template>
  <div class="user_pressure_upload">
    <group>
      <datetime title="时间" v-model="pressure.upload_time" value-text-align="left" format="YYYY-MM-DD HH:mm">
        <div slot="title" class="my_cell_title">
          <img src="../../assets/images/user_icon/tip.png" class="title_icon">
          <span class="title_text">时间</span>
        </div>
      </datetime>
      <x-input title="高压" v-model="pressure.high_pressure" placeholder="请输入" value-text-align="left"
               :show-clear="false">
        <div slot="label" class="my_cell_title">
          <img src="../../assets/images/user_icon/tip.png" class="title_icon">
          <span class="title_text">高压</span>
        </div>
      </x-input>
      <x-input title="低压" v-model="pressure.low_pressure" placeholder="请输入" value-text-align="left"
               :show-clear="false">
        <div slot="label" class="my_cell_title">
          <img src="../../assets/images/user_icon/tip.png" class="title_icon">
          <span class="title_text">低压</span>
        </div>
      </x-input>
      <x-input title="心率" v-model="pressure.heart_rate" placeholder="请输入" value-text-align="left" :show-clear="false">
        <div slot="label" class="my_cell_title">
          <img src="../../assets/images/user_icon/tip.png" class="title_icon">
          <span class="title_text">心率</span>
        </div>
      </x-input>
    </group>
    <div class="formAction">
      <div class="subBtn" @click="submitPressure">保存</div>
    </div>
  </div>
</template>

<script>
  import {Group, Datetime, XInput} from 'vux'
  import {getFormatDate} from '../../assets/mUtils/common'
  import {mapActions, mapMutations} from 'vuex'

  export default {
    name: "user_pressure_upload",
    components: {
      Group,
      Datetime,
      XInput,
    },
    data() {
      return {
        pressure: {
          upload_time: "",
          high_pressure: "",
          low_pressure: "",
          heart_rate: "",
          user_id: 0
        }
      }
    },
    created() {
      this.pressure.user_id = this.$route.query.user_id || 0;
      this.pressure.upload_time = getFormatDate("yyyy-MM-dd HH:mm");
    },
    methods: {
      ...mapActions("userPressure", ["uploadLastPressure"]),
      ...mapMutations("userHealth", ["SET_USER_HEALTH_UPDATE"]),
      submitPressure() {
        var self = this;
        if (self.pressure.high_pressure.trim().length < 1 || self.pressure.high_pressure === "0") {
          self.$vux.toast.show({
            type: "text",
            text: "高压不能为空或0！"
          })
          return;
        }
        if (self.pressure.low_pressure.trim().length < 1 || self.pressure.low_pressure === "0") {
          self.$vux.toast.show({
            type: "text",
            text: "低压不能为空或0！"
          })
          return;
        }
        if (self.pressure.heart_rate.trim().length < 1 || self.pressure.heart_rate === "0") {
          self.$vux.toast.show({
            type: "text",
            text: "心率不能为空或0！"
          })
          return;
        }
        self.uploadLastPressure(self.pressure).then(res => {
          if (res.error_code === 0) {
            self.$vux.toast.show({
              type: "success",
              text: "血压信息上传成功！",
              middle: "position",
              onHide() {
                self.SET_USER_HEALTH_UPDATE(true);
                self.$router.replace({
                  path: '/cdm/cdm_mobile/userdetail/pressure',
                  query: {
                    "user_id": self.pressure.user_id
                  }
                })
              }
            })
          }
          else {
            self.$vux.toast.show({
              type: "success",
              text: "血压信息上传失败！" + res.error_msg,
              middle: "position"
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

    .user_pressure_upload {
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
          .weui-select {
            height: auto;
            line-height: rem(14);
            color: #323232;
          }

          .weui-cell__bd {
            input {
              font-size: rem(14);
              color: #323232;
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

          .my_cell_title {
            width: rem(55);
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            .title_icon {
              width: rem(6);
              height: rem(7);
              margin-right: rem(4);
            }
          }
        }

        .vux-datetime {
          color: #999999;

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
