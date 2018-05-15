import request from '../../assets/mUtils/request';

const SERVICE_ADD = '/cdm/staff/service/create';

export default {
  namespaced: true,
  state: {
    isUpdate: false,
  },
  getters: {},
  mutations: {
    ["SET_USER_SERVICE_UPDATE"](state, isUpdate) {
      state.isUpdate = isUpdate;
    }
  },
  actions: {
    addUserService({commit, state}, newService) {
      var resState = {
        error_code: 0,
        error_msg: ""
      };
      return new Promise((resolve, reject) => {
        request.post(SERVICE_ADD, {
          user_id: newService.user_id,
          service_type: newService.currentServiceType,
          service_time: newService.service_time,
          content: newService.content
        }).then(res => {
          if (res.data.error_code === 0) {
            commit("SET_USER_SERVICE_UPDATE", true);
          }
          else {
            resState.error_code = res.data.error_code;
            resState.error_msg = res.data.error_msg;
          }
          resolve(resState);
        }).catch(error => {
          reject(error);
        })
      })
    }
  }
}
