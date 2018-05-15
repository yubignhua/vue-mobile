<template>
  <div class="user_list_box">
    <div class="user_list_line" v-for="user in userList" :key="user.user_id">
      <div class="user_details" @click="goUserDetails(user)">
        <div class="user_details_text">
          <div class="user_details_line">
            <div class="user_name">{{user.user_name}}</div>
            <div class="user_age">{{user.user_age}}岁</div>
            <div class="user_remark">{{user.user_remarks}}</div>
          </div>
          <div class="user_details_line">
            <div class="user_text">最近血压：{{user.bp_h}}/{{user.bp_l}}</div>
            <div class="user_text" v-if="isAssistant">医学助理：{{user.assistant_name}}</div>
            <div class="user_text" v-if="isDoctor">医生姓名：{{user.doctor_name}}</div>
          </div>
        </div>
        <div class="user_details_link">
          <div class="user_details_isNew" v-if="user.has_badge"></div>
          <div class="link"></div>
        </div>
      </div>
      <div class="user_actions">
        <div class="user_badge" @click="showCalendar(user.user_id)">
          <img class="user_badge_calendar" src="../../assets/images/user_icon/calendar.png">
          <span class="user_badge_text">健康日历</span>
        </div>
        <div class="user_actions_right">
          <a class="user_badge" :href="'tel:'+user.user_cellphone">
            <img class="user_badge_phone" src="../../assets/images/user_icon/phone.png">
            <div class="user_badge_text">电话</div>
          </a>
          <div class="user_badge user_badge_tag" v-model="changeTag" @click="showChangeTag(user)">
            <div class="user_badge_text" v-if="user.user_custom_tags.length>1">{{user.user_custom_tags}}</div>
            <div class="user_badge_text" v-else>请添加标签</div>
          </div>
        </div>
      </div>
    </div>
    <div v-transfer-dom class="user_transfer_dom">
      <confirm ref="inputUserTag" v-model="changeTag" title="修改用户标签"
               show-input
               :input-attrs="{type: 'string'}"
               @on-show="onShowChangeTag"
               @on-confirm="subChangeTag">
      </confirm>
    </div>
  </div>
</template>

<script>
  import {Confirm, TransferDomDirective as TransferDom} from 'vux'

  export default {
    name: "user_list_box",
    directives: {
      TransferDom
    },
    components: {
      Confirm
    },
    props: ["userList"],
    data() {
      return {
        changeTag: false,
        currentUserTag: "",
        isAssistant: true,
        isDoctor: false,
        editUserId: 0
      }
    },
    methods: {
      showChangeTag(user) {
        this.currentUserTag = user.user_custom_tags;
        this.changeTag = true;
        this.editUserId = user.user_id;
      },
      showCalendar(userId) {
        this.$router.push({
          path: '/cdm/cdm_mobile/calendar',
          query: {
            "user_id": userId
          }
        })
      },
      onShowChangeTag() {
        var self = this;
        self.$refs.inputUserTag.setInputValue(self.currentUserTag);
        self.currentUserTag = "";
      },
      goUserDetails(user) {
        this.$router.push({
          path: '/cdm/cdm_mobile/userdetail/health',
          query: {
            "user_id": user.user_id
          }
        });
      },
      subChangeTag(value) {
        var self = this;
        self.request.post('/cdm/user/edit', {
          user_id: self.editUserId,
          custom_tags: value
        }).then(res => {
          if (res.data.error_code === 0) {
            self.$emit("changeUserTag", self.editUserId, value);
            self.editUserId = 0;
            self.$vux.toast.show({
              type: "success",
              text: "用户标签修改成功！",
              position: "middle"
            })
          }
          else {
            self.$vux.toast.show({
              type: "warn",
              text: "用户标签修改失败！" + res.data.error_msg,
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

  .user_list_box {
    background: #FFFFFF;

    .user_list_line {
      border-bottom: 1px solid #E7E7E7;
      padding: rem(17) rem(15) rem(13) rem(15);

      .user_details {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .user_details_text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;

          .user_details_line {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: baseline;
            line-height: rem(15);
            padding-bottom: rem(12);

            .user_name {
              font-size: rem(16);
              color: #323232;
              padding-right: rem(10);
            }

            .user_age,
            .user_remark {
              font-size: rem(13);
              color: #999999;
              padding-right: rem(13);
            }

            .user_text {
              font-size: rem(13);
              color: #666666;
              padding-right: rem(15);
            }
          }
        }

        .user_details_link {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;

          .user_details_isNew {
            width: rem(8);
            height: rem(8);
            background: #FC623E;
            border-radius: 100%;
            margin-right: rem(8);
          }

          .link {
            width: rem(7);
            height: rem(13);
            background: url("../../assets/images/user_icon/next.png");
            background-size: 100% 100%;
          }
        }
      }

      .user_actions {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-top: rem(5);

        .user_actions_right {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
          margin-right: rem(10);

          .user_badge {
            margin-right: rem(10);

            &:last-child {
              margin-right: 0;
            }
          }
        }

        .user_badge {
          height: rem(25);
          width: rem(88);
          border: 1px solid #D4D4D4;
          border-radius: rem(100);
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          img {
            margin-right: rem(4);

            &.user_badge_calendar {
              height: rem(14);
              width: rem(15);
            }

            &.user_badge_phone {
              height: rem(11);
              width: rem(11);
            }
          }

          .user_badge_text {
            font-size: rem(13);
            color: #666666;
          }

          &.user_badge_tag {
            border: 1px solid #2A9EF1;
            border-radius: rem(100);

            .user_badge_text {
              color: #1C91E0;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }

  .user_transfer_dom {

    .weui-dialog {
      width: rem(270);
      height: rem(154);

      .weui-dialog__hd {
        padding: rem(21) 0 rem(10) 0;
        font-size: rem(16);
        line-height: rem(16);
        font-weight: normal;
        color: #323232;
      }

      .vux-prompt {
        padding: rem(10) rem(25) rem(20) rem(25);

        .vux-prompt-msgbox {
          border: 1px solid #999999;
          border-radius: 0;
          width: 100%;
          padding: rem(8) 0 rem(8) rem(10);
          color: #323232;
          font-size: rem(15);
          line-height: rem(16);
          letter-spacing: rem(-0.36);
        }
      }

      .weui-dialog__ft {
        font-size: rem(17);
        line-height: normal;
        &:after {
          border-top: 1px solid #C1C1C1;
        }

        .weui-dialog__btn {
          padding: rem(10) 0;
          line-height: rem(19);

          &.weui-dialog__btn_default {
            color: #666666;
            font-weight: normal;
          }

          &.weui-dialog__btn_primary {
            color: #1B91E0;
          }

          &:after {
            border-left: 1px solid #C1C1C1;
          }
        }
      }
    }
  }
</style>
