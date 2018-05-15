/**
 * Created by yubh on 2018/3/10.
 */
import {getToken} from '../assets/mUtils/auth'
export default {
  $userInfo:{
    account:'',//账号
    role:'',//权限
    user: '',
    status: '',
    code: '',
    token: getToken() || '',
    name: '',
    avatar: '',
    introduction: '',
    roles: '',
  },
};
