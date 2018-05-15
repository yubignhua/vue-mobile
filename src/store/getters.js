/**
 * Created by yubh on 2018/3/10.
 */
export default{
  token: state => state.$userInfo.token,
  avatar: state => state.$userInfo.avatar,
  name: state => state.$userInfo.name,
  roles: state => state.$userInfo.roles,
}
