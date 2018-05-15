<template>
  <div class="user_pressure">

    <Scroll ref="scroll" :class="[scroll_normal,{my_scroll_height:showTopOption}]">

      <div class="pressure_box">
        <div class="pressure_title">动态血压文件</div>
        <table class="pressure_table report_table">
          <tr>
            <td class="report_filename">文件名</td>
            <td class="report_time">上传时间</td>
            <td class="report_status">状态</td>
          </tr>
          <tr v-for="report in reportCurrentList" :key="report.report_id"
              @click="openFile(report)">
            <td class="text_left">{{report.filename}}</td>
            <td class="text_focus">{{report.upload_time}}</td>
            <td class="text_notRead" v-if="report.has_badge">未读</td>
            <td class="text_focus" v-else>已读</td>
          </tr>
        </table>
        <div class="pressure_pages">
          <div class="page" @click="reportPrePage">上一页</div>
          <div class="page" @click="reportNextPage">下一页</div>
        </div>
      </div>

      <div class="pressure_box">
        <div class="pressure_title">最近血压记录</div>
        <table class="pressure_table">
          <tr>
            <td>时间</td>
            <td>高压</td>
            <td>低压</td>
            <td>心率</td>
          </tr>
          <tr v-for="last in lastCurrentList" :key="last.pressure_id">
            <td>{{last.upload_time}}</td>
            <td class="text_focus">
              <span>{{last.high_pressure}}</span>
              <div v-if="last.high_pressure_status==2" class="pressure_high pressure_tag"></div>
              <div v-if="last.high_pressure_status==1" class="pressure_low pressure_tag"></div>
              <div v-if="last.high_pressure_status==0" class="pressure_tag"></div>
            </td>
            <td class="text_focus">
              <span>{{last.low_pressure}}</span>
              <div v-if="last.low_pressure_status==2" class="pressure_high pressure_tag"></div>
              <div v-if="last.low_pressure_status==1" class="pressure_low pressure_tag"></div>
              <div v-if="last.low_pressure_status==0" class="pressure_tag"></div>
            </td>
            <td class="text_focus">
              <span>{{last.heart_rate}}</span>
              <div v-if="last.heart_rate_status==2" class="pressure_high pressure_tag"></div>
              <div v-if="last.heart_rate_status==1" class="pressure_low pressure_tag"></div>
              <div v-if="last.heart_rate_status==0" class="pressure_tag"></div>
            </td>
          </tr>
        </table>
        <div class="pressure_pages">
          <div class="page" @click="lastPrePage">上一页</div>
          <div class="page" @click="lastNextPage">下一页</div>
        </div>
      </div>

    </Scroll>

  </div>
</template>

<script>
  import Scroll from '../../components/scroll'
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: "user_pressure",
    components: {
      Scroll
    },
    data() {
      return {
        pressure: {
          reportList: [],  // 动态血压记录
          lastList: []  // 最近血压记录
        },
        user_id: 0,
        userRole: "",

        reportCurrentPage: 1,
        reportCurrentList: [],
        reportPerPage: 5,
        lastCurrentPage: 1,
        lastCurrentList: [],

        showTopOption: false,

        scroll_normal: "my_scroll",
      }
    },
    computed: {
      ...mapState("userPressure", {
        isReportUpdate: state => state.isReportUpdate,
        isLastUpdate: state => state.isLastUpdate
      })
    },
    watch: {
      "isLastUpdate": function (isLastUpdate) {
        if (isLastUpdate) {
          this.SET_USER_PRESSURE_LAST_UPDATE(false);
          this.initLastData();
        }
      },
      "isReportUpdate": function (isReportUpdate) {
        if (isReportUpdate) {
          this.SET_USER_PRESSURE_REPORT_UPDATE(false);
          this.initReportData();
        }
      },
      "user_id": function () {
        this.initLastData();
        this.initReportData();
      }
    },
    created() {
      this.userRole = this.$store.state.$userInfo.roles[0];
      if (this.userRole === "user") {
        this.initLastData();
        this.initReportData();
      }
    },
    activated() {
      this.user_id = this.$route.query.user_id || 0;
      this.userRole = this.$store.state.$userInfo.roles[0];

      if (this.userRole !== "doctor") {
        this.showTopOption = true;
      }
      else {
        this.showTopOption = false;
      }

      this.$refs.scroll.refresh();
    },
    methods: {
      ...mapMutations("userPressure", ["SET_USER_PRESSURE_REPORT_UPDATE"]),
      ...mapMutations("userPressure", ["SET_USER_PRESSURE_LAST_UPDATE"]),
      initLastData() {
        this.pressure.lastList = [];
        this.pressure.lastCurrentPage = 1;
        this.getLastPressure();
      },
      initReportData() {
        this.pressure.reportList = [];
        this.pressure.reportCurrentPage = 1;
        this.getReportPressure();
      },
      openFile(report) {
        var self = this;
        if (self.userRole === "user") {
          report.has_badge = false;
          self.request.post('/cdm/user/pressure/report/read',{
            report_id:report.report_id
          }).then(function () {
            window.location.href = report.url;
          })
        }
      },
      getReportPressure() {
        var self = this;
        self.request.get('/cdm/user/pressure/report_list', {
          params: {
            user_id: self.user_id,
            page: self.reportCurrentPage,
            count_per_page: self.reportPerPage
          }
        }).then(function (res) {
          if (res.data.error_code === 0) {
            if (res.data.report_list.length <= 0) {
              if (self.reportCurrentPage > 1) {
                self.reportCurrentPage--;
                self.$vux.toast.show({
                  type: "text",
                  text: "动态血压文件暂无更多数据！"
                });
              }
            }
            else {
              self.pressure.reportList.push({page: self.reportCurrentPage, pressure: res.data.report_list});
              self.reportCurrentList = res.data.report_list;
              self.$refs.scroll.forceUpdate();
            }
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
      getLastPressure() {
        var self = this;
        self.request.get('/cdm/user/pressure/last/list', {
          params: {
            user_id: self.user_id,
            page: self.lastCurrentPage
          }
        }).then(function (res) {
          if (res.data.error_code === 0) {
            if (res.data.pressure_list.length <= 0) {
              if (self.lastCurrentPage > 1) {
                self.lastCurrentPage--;
                self.$vux.toast.show({
                  type: "text",
                  text: "最近血压记录暂无更多数据！"
                });
              }
            }
            else {
              self.pressure.lastList.push({page: self.lastCurrentPage, pressure: res.data.pressure_list});
              self.lastCurrentList = res.data.pressure_list;
              self.$refs.scroll.forceUpdate();
            }
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
      reportPrePage() {
        if (this.reportCurrentPage === 1) {
          this.$vux.toast.show({
            type: "text",
            text: "当前位置为第1页！"
          });
        }
        else {
          this.reportCurrentPage--;

          if (!this.findReportData()) {
            this.getReportPressure();
          }
        }
      },
      reportNextPage() {
        this.reportCurrentPage++;
        if (!this.findReportData()) {
          this.getReportPressure();
        }
      },
      findReportData() {
        var self = this;
        var isFind = false;
        for (let i = 0; i < self.pressure.reportList.length; i++) {
          if (self.pressure.reportList[i].page === self.reportCurrentPage) {
            self.reportCurrentList = self.pressure.reportList[i].pressure;
            isFind = true;
            break;
          }
        }
        return isFind;
      },
      lastPrePage() {
        if (this.lastCurrentPage === 1) {
          this.$vux.toast.show({
            type: "text",
            text: "当前位置为第1页！"
          });
        }
        else {
          this.lastCurrentPage--;
          if (!this.findLastData()) {
            this.getLastPressure();
          }
        }
      },
      lastNextPage() {
        this.lastCurrentPage++;
        if (!this.findLastData()) {
          this.getLastPressure();
        }
      },
      findLastData() {
        var self = this;
        var isFind = false;
        for (let i = 0; i < self.pressure.lastList.length; i++) {
          if (self.pressure.lastList[i].page === self.lastCurrentPage) {
            self.lastCurrentList = self.pressure.lastList[i].pressure;
            isFind = true;
            break;
          }
        }
        return isFind;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin.scss";

  .user_pressure {

    .my_scroll {
      top: rem(92);
      background: transparent;

      &.my_scroll_height {
        top: rem(170);
      }

      .pressure_box {
        border-bottom: 1px solid #E7E7E7;
        padding: rem(14) rem(10);
        background: #FFFFFF;

        .pressure_title {
          font-size: rem(13);
          letter-spacing: rem(-0.32);
          color: #323232;
          padding-left: rem(5);
          padding-bottom: rem(10);
        }

        .pressure_table {
          &.report_table {
            table-layout: fixed;
          }
          width: 100%;
          border-collapse: collapse;
          border-top: 1px solid #F4F4F4;
          border-left: 1px solid #F4F4F4;

          tr {
            &:nth-child(2n) {
              background: #FBFBFB;
            }

            td {
              border-right: 1px solid #F4F4F4;
              border-bottom: 1px solid #F4F4F4;
              padding: rem(8) rem(10);
              font-size: rem(13);
              color: #666666;
              overflow: hidden;
              text-align: center;

              &.report_name {
                width: 50%;
              }

              &.report_time {
                width: 30%;
              }

              &.report_status {
                width: 20%;
              }

              &.text_left {
                text-align: left;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }

              &.text_focus {
                color: #323232;
              }

              &.text_notRead {
                color: #FF6134;
              }

              .pressure_tag {
                width: rem(6);
                height: rem(9);
                margin-left: rem(3);
                display: inline-block;

                &.pressure_high {
                  background: url("../../assets/images/user_icon/pressure_high.png");
                  background-size: 100% 100%;
                }

                &.pressure_low {
                  background: url("../../assets/images/user_icon/pressure_low.png");
                  background-size: 100% 100%;
                }
              }
            }
          }
        }

        .pressure_pages {
          padding-top: rem(15);
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;

          .page {
            width: rem(70);
            height: rem(33);
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #E7E7E7;
            margin-left: rem(8);

            &:first-child {
              margin-left: 0;
            }
          }
        }
      }
    }
  }
</style>
