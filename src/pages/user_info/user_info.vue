<template>
  <div class="user_info">
    <div class="info_left">
      <div class="info_icon"></div>
      <div class="info_name">用户：{{userInfo.name}}</div>
      <div class="info_remark">{{userInfo.remarks}}</div>
    </div>
    <div class="info_tag">
      <div class="info_tag_text" v-if="userInfo.custom_tags.length>1">{{userInfo.custom_tags}}</div>
      <div class="info_tag_text" v-else>暂无标签</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "user_info",
    props: ["user_id"],
    data() {
      return {
        userInfo: {
          name: "",
          remarks: "",
          custom_tags: ""
        }
      }
    },
    watch: {
      "user_id": function () {
        this.getUserInfo();
      }
    },
    created() {
      this.getUserInfo();
    },
    methods: {
      getUserInfo() {
        var self = this;
        self.request.get('/cdm/user/detail', {
          params: {
            user_id: self.user_id
          }
        }).then(function (res) {
          if (res.data.error_code === 0) {
            self.userInfo.name = res.data.user_info.name;
            self.userInfo.remarks = res.data.user_info.remarks;
            self.userInfo.custom_tags = res.data.user_info.custom_tags;
          }
          else {
            self.$vux.toast.show({
              type: "cancel",
              text: res.data.error_msg,
              position: "middle"
            });
          }
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin.scss";

  .user_info {
    background: transparent;
    padding: 0 rem(16) 0 rem(10);
    height: rem(46);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .info_left {
      display: flex;
      align-items: center;

      .info_icon {
        height: rem(20);
        width: rem(20);
        background: url("../../assets/images/user_icon/user.png");
        background-size: 100% 100%;
      }

      .info_name {
        font-size: rem(15);
        color: #666666;
        letter-spacing: rem(-0.36);
        padding: 0 rem(8);
      }

      .info_remark {
        font-size: rem(13);
        color: #999999;
        letter-spacing: rem(-0.31);
      }
    }
    .info_tag {
      display: flex;
      align-items: center;
      justify-content: center;
      height: rem(18);
      padding: 0 rem(4);
      color: #50ACEA;
      background-color: #E1F1FD;
      border-radius: rem(2);
      font-size: rem(12);
      max-width: rem(80);

      .info_tag_text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>
