<template>
  <div class="user_detail">

    <div class="upload_pressure" v-if="showUpload">
      <div class="upload_box">
        <div class="upload_btn" v-if="userRole==='assistant'" @click="uploadReport">
          <img class="pressure_icon" src="../../assets/images/user_icon/report_pressure.png">
          <span class="pressure_text">上传动态血压</span>
        </div>
        <div class="upload_btn" v-if="userRole==='user'" @click="showAssistant">
          <img class="pressure_icon" src="../../assets/images/user_icon/assistant.png">
          <span class="pressure_text">健康助理</span>
        </div>
        <div class="upload_btn" @click="uploadLast">
          <img class="pressure_icon" src="../../assets/images/user_icon/last_pressure.png">
          <span class="pressure_text">手动上传血压</span>
        </div>
      </div>
    </div>

    <user-info v-if="userRole==='doctor'" :user_id="user_id"></user-info>

    <tab class="user_tab"
         :line-width="tabStyle.lineWidth"
         :default-color="tabStyle.defaultColor"
         :active-color="tabStyle.activeColor"
         :custom-bar-width="tabStyle.getBarWidth()">
      <tab-item v-for="(tab,index) in tabList" @on-item-click="goPages(tab)" :key="index"
                :selected="currentCate===tab.cate">{{tab.name}}
      </tab-item>
    </tab>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
  import {Tab, TabItem} from 'vux'
  import UserInfo from '../../pages/user_info/user_info'
  import {getRem} from '../../assets/mUtils/common'

  export default {
    name: "user_detail",
    components: {
      Tab,
      TabItem,
      UserInfo
    },
    data() {
      return {
        baseURL: "/cdm/cdm_mobile/userdetail",
        tabList: [
          {name: "基本信息", url: "/health", cate: "health"},
          {name: "药物记录", url: "/drug", cate: "drug"},
          {name: "血压数据", url: "/pressure", cate: "pressure"},
          {name: "服务记录", url: "/service", cate: "service"}
        ],
        tabStyle: {
          lineWidth: 2,
          defaultColor: "#666666",
          activeColor: "#1B91E0",
          getBarWidth: function () {
            return getRem(48);
          }
        },
        showUpload: false,
        currentCate: "",

        //用户基本信息
        user_id: 0,
        userRole: "",
        userInfo: {
          name: "",
          remark: "",
          tag: ""
        }
      }
    },
    activated() {
      this.user_id = this.$route.query.user_id || 0;
      this.userRole = this.$store.state.$userInfo.roles[0];

      if (this.userRole !== "doctor") {
        this.showUpload = true;
      }
      else {
        this.showUpload = false;
      }
      this.setCurrentCate();
    },
    methods: {
      goPages(tab) {
        var self = this;
        self.currentCate = tab.cate;
        var url = this.baseURL + tab.url;
        this.$router.replace({
          path: url,
          query: {
            "user_id": this.user_id
          }
        });
      },
      setCurrentCate() {
        var self = this;
        var currentPath = this.$route.path;
        for (var i = 0; i < self.tabList.length; i++) {
          if (currentPath.search(self.tabList[i].cate) > -1) {
            self.currentCate = self.tabList[i].cate;
            break;
          }
        }
      },
      uploadLast() {
        this.$router.push({
          path: '/cdm/cdm_mobile/pressure_upload',
          query: {
            "user_id": this.user_id
          }
        })
      },
      uploadReport() {
        this.$router.push({
          path: '/cdm/cdm_mobile/pressure_report',
          query: {
            "user_id": this.user_id
          }
        })
      },
      showAssistant() {
        this.$router.push('/cdm/cdm_mobile/assistant');
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/style/mixin.scss";

  .user_detail {
    background: #F1F1F1;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;

    .upload_pressure {
      padding: rem(10) rem(8) rem(10) rem(12);

      .upload_box {
        width: 100%;
        height: rem(104);
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #FFFFFF;
        background-image: url("../../assets/images/user/top_bg.png");
        background-position: bottom;
        background-repeat: no-repeat;
        background-size: 100% rem(28);
        border-radius: rem(4);

        .upload_btn {
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;

          .pressure_icon {
            height: rem(48);
            width: rem(48);
            margin-right: rem(8);
          }

          .pressure_text {
            font-size: rem(13);
            color: #666666;
          }
        }
      }
    }

    .vux-tab-container {
      height: rem(45);
    }

  }

</style>
