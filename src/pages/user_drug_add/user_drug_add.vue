<template>
  <div class="user_drug_add">
    <group>
      <x-input title="药物名称" v-model="drug.name" placeholder="请输入" value-text-align="left" :show-clear="false"
               required>
        <div slot="label" class="my_cell_title">
          <img src="../../assets/images/user_icon/tip.png" class="title_icon">
          <span class="title_text">药物名称</span>
        </div>
      </x-input>
      <x-input title="剂量" v-model="drug.dose" placeholder="请输入" value-text-align="left" :show-clear="false" required>
        <div slot="label" class="my_cell_title">
          <img src="../../assets/images/user_icon/tip.png" class="title_icon">
          <span class="title_text">剂量/mg,m</span>
        </div>
      </x-input>
      <cell value-align="left" style="padding-right: 0">
        <div slot="default" class="my_selector_slot">
          <div class="my_cell_title">
            <img src="../../assets/images/user_icon/tip.png" class="title_icon">
            <span class="title_text">服药频次</span>
          </div>
          <selector :options="drug.feqArr" v-model="drug.take_drug_feq" class="my_selector"></selector>
        </div>
      </cell>
      <datetime title="服药开始时间" v-model="drug.take_start_time" value-text-align="left" format="YYYY-MM-DD">
        <div slot="title" class="my_cell_title">
          <img src="../../assets/images/user_icon/tip.png" class="title_icon">
          <span class="title_text">服药开始时间</span>
        </div>
      </datetime>
      <datetime title="服药结束时间" v-model="drug.take_end_time" value-text-align="left" format="YYYY-MM-DD"
                placeholder="请选择">
        <div slot="title" class="my_cell_title">
          <img src="../../assets/images/user_icon/tip.png" class="title_icon">
          <span class="title_text">服药结束时间</span>
        </div>
      </datetime>
      <cell title="用药备注" value-align="left"></cell>
      <x-textarea name="remark" placeholder="请输入用药备注" v-model="drug.remark"></x-textarea>
    </group>
    <div class="formAction" v-show="isShowBtn">
      <div class="subBtn" @click="saveDrug">保存</div>
    </div>
  </div>
</template>

<script>
  import {Group, Datetime, XInput, XTextarea, Cell, Selector} from 'vux'
  import {getFormatDate, getDrugFeq} from '../../assets/mUtils/common'
  import {mapActions} from 'vuex'

  export default {
    name: "user_drug_add",
    components: {
      Group,
      Datetime,
      XInput,
      XTextarea,
      Cell,
      Selector
    },
    watch: {
      "screenHeight": function (val) {
        if (this.originHeight > val + 100) {
          this.isShowBtn = false;
        }
        else {
          this.isShowBtn = true;
        }
      }
    },
    data() {
      return {
        drug: {
          user_id: 0,
          name: "",  // 药物名称
          dose: "",  // 用药剂量
          feqArr: [],  //服药频次选项
          take_drug_feq: "1/6h",  // 服药频次
          take_start_time: "",  // 服药开始时间
          take_end_time: "",  // 服药结束时间
          remark: ""  // 备注
        },
        isShowBtn: true,
        screenHeight: document.documentElement.clientHeight,
        originHeight: document.documentElement.clientHeight
      }
    },
    created() {
      this.drug.user_id = this.$route.query.user_id || 0;
      this.drug.take_start_time = getFormatDate("yyyy-MM-dd");
      this.drug.feqArr = getDrugFeq();
    },
    mounted() {
      let self = this;
      window.onresize = function () {
        return (function () {
          self.screenHeight = document.documentElement.clientHeight;
        })();
      }
    },
    methods: {
      ...mapActions("userDrug", ["addUserDrug"]),
      saveDrug() {
        var self = this;

        if (self.drug.name.trim().length < 1) {
          self.$vux.toast.show({
            type: "text",
            text: "药物名称不能为空！"
          });
          return;
        }

        if (self.drug.dose.trim().length < 1) {
          self.$vux.toast.show({
            type: "text",
            text: "剂量不能为空！"
          });
          return;
        }

        if (self.drug.take_drug_feq.trim().length < 1) {
          self.$vux.toast.show({
            type: "text",
            text: "服药频次不能为空！"
          });
          return;
        }

        var regDate = /^(\d{4})-(\d{2})-(\d{2})$/;

        if (self.drug.take_start_time.trim().length < 10 || !regDate.test(self.drug.take_start_time)) {
          self.$vux.toast.show({
            type: "text",
            text: "请输入正确的服药开始时间！"
          });
          return;
        }

        if (self.drug.take_end_time.trim().length < 10 || !regDate.test(self.drug.take_end_time)) {
          self.$vux.toast.show({
            type: "text",
            text: "请输入正确的服药结束时间！"
          });
          return;
        }
        else {
          var startTime = new Date(Date.parse(self.drug.take_start_time));
          var endTime = new Date(Date.parse(self.drug.take_end_time));
          if (endTime < startTime) {
            self.$vux.toast.show({
              type: "text",
              text: "服药结束时间不得小于服药开始时间！"
            });
            return;
          }
        }

        self.addUserDrug(self.drug).then(res => {
          if (res.error_code === 0) {
            self.$vux.toast.show({
              type: "success",
              text: "新增服用药物成功!",
              position: "middle",
              onHide() {
                self.$router.replace({
                  path: '/cdm/cdm_mobile/userdetail/drug',
                  query: {
                    "user_id": self.drug.user_id
                  }
                });
              }
            })
          }
          else {
            self.$vux.toast.show({
              type: "warn",
              text: "新增服用药物失败！" + res.error_msg,
              position: "middle"
            })
          }
        });
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/style/mixin.scss";

  body {
    background: #F1F1F1;

    .user_drug_add {
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
              min-height: rem(220);
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
            width: rem(105);
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

          .my_selector_slot {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;

            .my_selector {
              padding: 0;
              -webkit-box-flex: 1;
              flex: 1;

              .weui-select {
                height: auto;
                line-height: rem(14);
                color: #323232;
                font-family: 'PingFangSC-Light';
                padding-left: 0;
              }
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
