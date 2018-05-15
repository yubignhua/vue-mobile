// 放置全局 action
const LOGIN = '/cdm/accounts/weixin/login';
import request from '../assets/mUtils/request';

const GETROLE = '/cdm/accounts/role';
import {setToken, removeToken} from '../assets/mUtils/auth'

export default {
  /**
   * 登录获取用户基本信息
   * @param commit
   * @param userInfo
   */
  async getUerInfo({commit}, userInfo) {
    const loginData = await request.post(LOGIN, {
      cellphone: userInfo.phone,
      sms_verify_code: userInfo.vcode,
    });

    console.log('loginData', loginData);
    loginData.data.role && commit("SET_ROLE", loginData.data.role);
    loginData.data.user_name && commit("SET_NAME", loginData.data.user_name);
    //setToken(loginData.data.token);
    //setToken('2===234234');
    return {...loginData.data};
  },

  async logOut({commit}) {
    const loginState = await reuqest.post(LOGIN);
    if (loginState) {
      commit('SET_TOKEN', '');
      commit('CLEAR_ROLE');
      //removeToken()
    }
  },


  /**
   * 登出
   * @param commit
   * @param state
   * @returns {Promise}
   * @constructor
   */
  LogOuts({commit, state}) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 获取用户角色 如果有则表示已经登录 如果没有则表示未登录
   */
  async getRole({commit}) {
    const res = await request.get(GETROLE);
    res.data.role && commit('SET_ROLE', res.data.role);
    return res.data
  }
};
