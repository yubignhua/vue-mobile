<template>
  <div class="user_calendar">
    <full-calendar lang="zh" :events="pressureData" first-day="1" @eventClick="eventClick"
                   @changeMonth="changeMonth"></full-calendar>

    <div v-transfer-dom>
      <confirm v-model="showConfirm">
        <p style="text-align:left">{{confirmPressure}}</p>
        <br/>
        <p style="text-align:left">{{confirmDateTime}}</p>
      </confirm>
    </div>
  </div>
</template>

<script>
  import FullCalendar from '../../components/vue-fullcalendar/fullCalendar'
  import {Confirm, TransferDomDirective as TransferDom} from 'vux'
  import {getFormatDate} from '../../assets/mUtils/common'

  export default {
    name: "user_calendar",
    directives: {
      TransferDom
    },
    components: {
      FullCalendar,
      Confirm
    },
    data() {
      return {
        pressureData: [],
        user_id: 0,
        startDate: "",
        endDate: "",
        showConfirm: false,
        confirmPressure: "",
        confirmDateTime: ""
      }
    },
    created() {
      this.user_id = this.$route.query.user_id || 0;

      var now = new Date();
      this.startDate = this.getStartDate(now.getFullYear(), now.getMonth() + 1);
      this.endDate = getFormatDate("yyyy-MM-dd");

      this.getCalendarData(this.startDate, this.endDate);
    },
    methods: {
      getStartDate(year, month) {
        if (month < 10) {
          return year + "-0" + month + "-01";
        }
        else {
          return year + "0" + month + "-01";
        }
      },
      eventClick(event) {
        this.confirmPressure = "血压值：" + event.pressure;
        this.confirmDateTime = "测量时间：" + event.upload_time;
        this.showConfirm = true;
      },
      changeMonth(start, end) {
        this.getCalendarData(start, end);
      },
      getCalendarData(startDate, endDate) {
        var self = this;
        self.request.get('/cdm/user/pressure/calendar/list', {
          params: {
            user_id: self.user_id,
            start_date: startDate,
            end_date: endDate
          }
        }).then(function (res) {
          if (res.data.error_code === 0) {
            var tempPressureList = [];

            for (let pressure of res.data.pressure_list) {
              var temp = {
                "cssClass": "",
                "start": "",
                "title": "",
                "pressure": "",
                "upload_time": ""
              };
              if (pressure.high_pressure_status !== 0 || pressure.low_pressure_status !== 0) {
                temp.cssClass = "red";
              }
              else {
                temp.cssClass = "blue";
              }
              var pressureDate = pressure.upload_time.split(" ");
              temp.start = pressureDate[0];
              temp.title = pressureDate[1].substr(0, 5);
              temp.pressure = pressure.high_pressure + "/" + pressure.low_pressure;
              temp.upload_time = pressure.upload_time;

              tempPressureList.push(temp);
            }
            self.pressureData = tempPressureList;
          }
          else {
            self.$vux.toast.show({
              type: "warn",
              text: "健康日历数据获取失败！" + res.data.error_msg,
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

  .user_calendar {
    padding: rem(20) rem(10);
    background: #FFFFFF;

    .comp-full-calendar {
      padding: 0;

      .full-calendar-body {
        .dates {
          .week-row {
            .day-cell {
              min-height: rem(61);
            }
          }
          .dates-events {
            .events-week {
              .events-day {
                min-height: rem(70);

                .event-box {
                  .event-item {
                    &.blue {
                      background: #1B91E0;
                      color: #FFFFFF;
                    }
                    &.red {
                      background: #FC623E;
                      color: #FFFFFF;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .weui-dialog__btn_primary {
    color: #1B91E0;
  }
</style>
