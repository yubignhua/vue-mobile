/**
 * Created by yubh on 2018/3/10.
 */

import Axios from 'axios';
//import {getMainHomeData} from '../../service/api';
const MAIN_HOME = '/cyhospital/weihospital/yanda/clinicIndex/?is_json=1'

export default {
  namespaced: true,
  
  state: {
    level_1_list: [],
    level_2_list: [],
    level_3_list: [],
    level_4_list: [],
    count: 0,
    name: '于炳华',
    colorList: ['apple', 'water', 'cheer'],
  },
  mutations: {
    SAVEHOMEDATA (state, obj) {
      state.level_1_list = obj.level_1_list;
      state.level_2_list = obj.level_2_list;
      state.level_3_list = obj.level_3_list;
      state.level_4_list = obj.level_4_list;
    },
  },
  actions: {
    async getHomeData ({ commit, state }) {
      if (state.level_2_list.length > 0) return;
      const homeData = await Axios.get(MAIN_HOME);
      homeData && commit('SAVEHOMEDATA', homeData.data.data);
    }
  },
  getters: {},
};
