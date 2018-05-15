// 放置全局mutations
export default {
  ["SET_TOKEN"](state,token){
    state.$userInfo.token = token;
  },
  ["SET_ROLE"](state,roles){
    state.$userInfo.roles = [...roles];
  },
  ["CLEAR_ROLE"](state){
    state.$userInfo.roles = [];
  },
  ["SET_NAME"](state,name){
    state.$userInfo.name = name;
  },
  ["SET_AVATAR"](state,avatar){
    state.$userInfo.avatar = avatar;
  },
};
