import axios from 'axios'
import qs from 'qs'

//import store from '../../store/indexs'
import store from '../../store/indexs';

//import {getToken} from './auth'
const service = axios.create({
  baseURL: process.env.BASE_API,
  withCredentials: true,
  timeout: 3000, // request timeout
});

service.defaults.withCredentials = true;
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
service.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
service.defaults.validateStatus = function (status) {
  return true;
};
service.defaults.transformRequest = [function (data) {

  return qs.stringify(data);//数据序列化
}
];

service.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error);
  Promise.reject(error)
})
service.interceptors.response.use(
  response => response,
  error => {
    console.log('net::err' + error);
    // import('../../store/indexs').then(store=>{
    //   //console.log(store)
    //   store.default.commit('showPosition',{
    //     flag:true,
    //     position:'defult',
    //     text: '网络出错请重新再试'
    //   });
    // });
    store.commit('showPosition', {
      flag: true,
      position: 'defult',
      text: '网络出错请重新再试'
    });
    return Promise.reject(error)
  });

export default service
