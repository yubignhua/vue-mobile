<template>
  <div :class="[normal,{hasTopOption:showTopOption}]">
    <Scroll class="my_scroll" :class="{noAdd:!showAdd}" ref="scroll" @pullingUp="loadMore" pullUpLoad="true">
      <div class="service" v-for="service in serviceList" :key="service.id" @click="goDetails(service)">
        <div class="service_head">
          <div class="service_head_left">
            <div class="service_title">{{getService(service.service_type)}}</div>
            <div class="service_time">{{service.created_time}}</div>
          </div>
          <div class="service_head_right">
            <div class="service_news" v-if="service.has_badge"></div>
            <div class="service_next"></div>
          </div>
        </div>
        <div class="service_content">{{service.content}}</div>
      </div>
    </Scroll>
    <div class="add_service" v-if="allowAdd">
      <div class="service_btn" @click="newService">＋ 新增服务记录</div>
    </div>
  </div>
</template>

<script>
  import Scroll from '../../components/scroll'
  import {mapState, mapMutations} from 'vuex'
  import {getServiceTypeValue} from '../../assets/mUtils/common'

  export default {
    name: "user_service",
    components: {
      Scroll
    },
    data() {
      return {
        serviceList: [],
        allowAdd: false,
        user_id: 0,
        userRole: "",
        currentPage: 1,
        showTopOption: false,
        showAdd: false,
        normal: "user_service",
        getService: function (key) {
          return getServiceTypeValue(key);
        }
      }
    },
    computed: {
      ...mapState("userService", {
        isUpdate: state => state.isUpdate
      })
    },
    watch: {
      "isUpdate": function (isUpdate) {
        if (isUpdate) {
          this.SET_USER_SERVICE_UPDATE(false);
          this.initData();
        }
      },
      "user_id": function () {
        this.initData();
      }
    },
    created() {
      this.userRole = this.$store.state.$userInfo.roles[0];
      if (this.userRole === "user") {
        this.initData();
      }
    },
    activated() {
      this.user_id = this.$route.query.user_id || 0;
      this.userRole = this.$store.state.$userInfo.roles[0];

      if (this.userRole !== "user") {
        this.allowAdd = true;
      }
      else {
        this.allowAdd = false;
      }

      if (this.userRole !== "doctor") {
        this.showTopOption = true;
      }
      else {
        this.showTopOption = false;
      }

      if (this.userRole === "user") {
        this.showAdd = false;
      }
      else {
        this.showAdd = true;
      }

      this.$refs.scroll.refresh();
    },
    methods: {
      ...mapMutations("userService", ["SET_USER_SERVICE_UPDATE"]),
      initData() {
        this.currentPage = 1;
        this.getServiceList(true);
      },
      getServiceList(isInit) {
        var self = this;
        self.request.get('/cdm/staff/service/search', {
          params: {
            user_id: self.user_id,
            page: self.currentPage
          }
        }).then(function (res) {
          if (res.data.error_code === 0) {
            if(isInit){
              self.serviceList=res.data.service_list;
            }
            else{
              self.serviceList = [...self.serviceList, ...res.data.service_list];
            }
            self.$refs.scroll.forceUpdate();
          }
          else {
            self.$vux.toast.show({
              type: "cancel",
              text: res.data.error_msg,
              position: "middle"
            })
          }
        });
      },
      newService() {
        var self = this;
        self.$router.push({
          path: '/cdm/cdm_mobile/service_add',
          query: {
            "user_id": self.user_id
          }
        })
      },
      goDetails(service) {
        var self = this;
        service.has_badge = false;
        self.$router.push({
          path: '/cdm/cdm_mobile/service_detail',
          query: {
            "service_id": service.id
          }
        })
      },
      loadMore() {
        this.currentPage++;
        this.getServiceList();
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin.scss";

  .user_service {
    position: absolute;
    top: rem(92);
    bottom: rem(0);
    width: 100%;

    &.hasTopOption {
      top: rem(170)
    }

    .my_scroll {
      bottom: rem(65);
      background: transparent;

      &.noAdd {
        bottom: 0;
      }

      .service {
        padding: rem(19) rem(15);
        border-top: 1px solid #E7E7E7;
        background: #FFFFFF;

        display: flex;
        flex-direction: column;
        justify-content: center;

        &:first-child {
          border-top: none;
        }

        .service_head {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding-bottom: rem(8);

          .service_head_left {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            .service_title {
              color: #323232;
              font-size: rem(15);
              letter-spacing: rem(-0.38);
              margin-right: rem(10);
            }

            .service_time {
              color: #999999;
              font-size: rem(13);
            }
          }

          .service_head_right {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;

            .service_news {
              width: rem(8);
              height: rem(8);
              background: #FC623E;
              border-radius: 100%;
              margin-right: rem(8);
            }

            .service_next {
              width: rem(7);
              height: rem(13);
              background: url("../../assets/images/user_icon/next.png");
              background-size: 100% 100%;
            }
          }
        }

        .service_content {
          color: #999999;
          font-size: rem(13);
          line-height: rem(20);

          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }

    .add_service {
      position: fixed;
      bottom: 0;
      left: 0;
      padding-bottom: rem(10);
      display: flex;
      justify-content: center;
      width: 100%;

      .service_btn {
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
</style>
