import request from '../../assets/mUtils/request';

const UPLOAD_LAST = '/cdm/user/pressure/common/upload';
const UPLOAD_REPORT = '/cdm/user/pressure/report/upload';

export default {
  namespaced: true,
  state: {
    isReportUpdate: false,
    isLastUpdate: false
  },
  getters: {},
  mutations: {
    ["SET_USER_PRESSURE_REPORT_UPDATE"](state, data) {
      state.isReportUpdate = data;
    },
    ["SET_USER_PRESSURE_LAST_UPDATE"](state, data) {
      state.isLastUpdate = data;
    }
  },
  actions: {
    uploadReportPressure({commit, state}, reportPressure) {
      var resState = {
        error_code: 0,
        error_msg: ""
      }
      return new Promise((resolve, reject) => {
        request.post(UPLOAD_REPORT, {
          user_id: reportPressure.user_id,
          url: reportPressure.fileUrl,
          filename: reportPressure.fileName
        }).then(res => {
          if (res.data.error_code === 0) {
            commit("SET_USER_PRESSURE_REPORT_UPDATE", true);
          }
          else {
            resState.error_code = res.data.error_code;
            resState.error_msg = res.data.error_msg;
          }
          resolve(resState)
        }).catch(error => {
          reject(error)
        })
      })
    },
    uploadLastPressure({commit, state}, lastPressure) {
      var resState = {
        error_code: 0,
        error_msg: ""
      };
      return new Promise((resolve, reject) => {
        request.post(UPLOAD_LAST, {
          user_id: lastPressure.user_id,
          high_pressure: lastPressure.high_pressure,
          low_pressure: lastPressure.low_pressure,
          heart_rate: lastPressure.heart_rate,
          upload_time: lastPressure.upload_time + ":00"
        }).then(res => {
          if (res.data.error_code === 0) {
            commit("SET_USER_PRESSURE_LAST_UPDATE", true);
          }
          else {
            resState.error_code = res.data.error_code;
            resState.error_msg = res.data.error_msg;
          }
          resolve(resState)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

