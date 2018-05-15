import request from '../../assets/mUtils/request'

const DRUG_ADD = "/cdm/user/drug/add"

export default {
  namespaced: true,
  state: {
    isUpdate: false
  },
  getters: {},
  mutations: {
    ["SET_USER_DRUG_UPDATE"](state, isUpdate) {
      state.isUpdate = isUpdate;
    }
  },
  actions: {
    addUserDrug({commit, state}, newDrug) {
      return new Promise((resolve, reject) => {
        var resState = {
          error_code: 0,
          error_msg: ""
        };
        request.post(DRUG_ADD, {
          user_id: newDrug.user_id,
          dose: newDrug.dose,
          name: newDrug.name,
          remark: newDrug.remark,
          take_drug_feq: newDrug.take_drug_feq,
          take_end_time: newDrug.take_end_time,
          take_start_time: newDrug.take_start_time
        }).then(res => {
          if (res.data.error_code === 0) {
            commit("SET_USER_DRUG_UPDATE", true);
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
