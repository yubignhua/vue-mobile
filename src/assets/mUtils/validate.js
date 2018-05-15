/**
 * Created by yubh on 2018/3/27.
 */
//电话校验
export const isvalidPhone = (str)=> {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(str)
};

//验证帐号是否合法
//验证规则：字母、数字、下划线组成，字母开头，4-16位。
export const checkAccount = str => {
  const re = /^[a-zA-z]\w{3,15}$/;
  return re.test(str)
}




