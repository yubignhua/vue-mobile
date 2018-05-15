import request from '../../assets/mUtils/request';

const HEALTH_DETAIL = '/cdm/user/health/detail';
const HEALTH_UPDATE = '/cdm/user/health/update';

export default {
  namespaced: true,
  state: {
    userHealth: {
      name: "",  //姓名
      sex: "",  //性别
      age: 0,  //年龄
      height: 0,  //身高
      weight: 0,  //体重
      bmi: 0,  //BMI指数
      exercise: 0,  //锻炼次数
      smoke: 0,  //吸烟次数
      illness_history: "无",  //疾病史
      sleep_time: "",  //睡眠时间
      have_HTN: false,  //有无高血压
      high_blood: 0,  //高压
      low_blood: 0,  //低压
      have_BS_exc: false, //血糖异常
      have_BL_exc: false,  //血脂异常
      have_UA_exc: false,  //尿酸异常
      symptoms: [],  //症状
      HBP_relations: [], //亲属高血压病史
      DMS_relations: [],  //亲属糖尿病史
      CAD_relations: [],  //亲属冠心病史

    },
    isUpdate: false
  },
  getters: {},
  mutations: {
    ["SAVE_USER_HEALTH_DATA"](state, healthData) {
      state.userHealth = healthData;
    },
    ["SET_USER_HEALTH_UPDATE"](state, isUpdate) {
      state.isUpdate = isUpdate;
    }
  },
  actions: {
    saveUserHealth({commit, state}, userId) {
      var resState = {
        error_code: 0,
        error_msg: ""
      };
      return new Promise((resolve, reject) => {
        request.get(HEALTH_DETAIL, {
          params: {
            user_id: userId
          }
        }).then(res => {
          if (res.data.error_code === 0) {
            commit("SAVE_USER_HEALTH_DATA", res.data.user_info);
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
    updateUserHealth({commit, state}, updateData) {
      var resState = {
        error_code: 0,
        error_msg: ""
      };
      return new Promise((resolve, reject) => {
        request.post(HEALTH_UPDATE, {
          user_id: updateData.user_id,
          CAD_relations: JSON.stringify(updateData.userHealth.CAD_relations),
          DMS_relations: JSON.stringify(updateData.userHealth.DMS_relations),
          HBP_relations: JSON.stringify(updateData.userHealth.HBP_relations),
          age: updateData.userHealth.age,
          exercise: updateData.userHealth.exercise,
          have_BL_exc: updateData.userHealth.have_BL_exc,
          have_BS_exc: updateData.userHealth.have_BS_exc,
          have_HTN: updateData.userHealth.have_HTN,
          have_UA_exc: updateData.userHealth.have_UA_exc,
          height: updateData.userHealth.height,
          illness_history: updateData.userHealth.illness_history,
          sex: updateData.userHealth.sex,
          sleep_time: updateData.userHealth.sleep_time,
          smoke: updateData.userHealth.smoke,
          symptoms: JSON.stringify(updateData.userHealth.symptoms),
          weight: updateData.userHealth.weight,
          name: updateData.userHealth.name
        }).then(res => {
          if (res.data.error_code === 0) {
            commit("SET_USER_HEALTH_UPDATE", true);
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
