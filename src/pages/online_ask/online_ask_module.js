/**
 * Created by yubh on 2018/3/14.
 */

import Axios from 'axios';
//import {getOnlineAskData} from '../../service/api'
const ONLINE_ASK ='/cyhospital/weihospital/yanda/clinicZxwz/?is_json=1';
export default {
  namespaced: true,
  state: {
    loadding: true,
    dataList: [],
    empList: [],
    deptList: [],
    export_teams: [],
  },
  getters:{},
  mutations:{
    ["SAVE_ONLINE_ASK_DATA"](state,data){
      state.empList = data.empList;
      state.deptList = data.deptList;
      state.export_teams = data.export_teams;
    },
    ['CHANGE_LOADING_STATE'](state,mState){
      state.loadding = mState;
    }

  },
  actions:{
    async getOnlineAsk({commit,state}){
      if(state.deptList.length>0) return;
      const res = await Axios.get(ONLINE_ASK);
      let dataList = res.data.data;
      dataList && commit('SAVE_ONLINE_ASK_DATA',dataList)
    },
  },
};
