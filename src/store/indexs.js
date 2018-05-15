/**
 * Created by yubh on 2018/3/7.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import state from './state';
import modules from '../modules_conf/modules_conf';

Vue.use(Vuex);// 应用 Vuex
const debug = process.env.NODE_ENV !== 'production';
const store =  new Vuex.Store({
  strict: debug,
  state,
  mutations,
  getters,
  actions,
  modules,
});

const shouldUseTransition = !/transition=none/.test(location.href)

store.registerModule('vux', {
  state : {
    isLoading : false,
    position : 'default',
    toastDes : '',
    showPositionValue : false,
    toast:false,
    demoScrollTop : 0,
    direction : shouldUseTransition ? 'forward' : '',
  },
  mutations: {
    showPosition (state,payload) {
      if(payload.position) state.position = payload.position;
      state.toast = payload.flag;
      state.toastDes = payload.text;
        
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateDirection (state, payload) {
      if (!shouldUseTransition) {
        return
      }
      state.direction = payload.direction
    }
  }
});

export default store
