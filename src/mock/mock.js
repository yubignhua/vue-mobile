/**
 * Created by yubh on 2018/3/21.
 */
// 使用 Mock

import Mock from 'mockjs';
const BASEURL = 'http://biztest.chunyu.me';

/**
 * 设置延时时间
 */
Mock.setup({
  timeout: '200-2000', // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
});

Mock.mock('/api/account', {
  'page|1-10': 10,
  'total_num|1-1000': 1000,
  'account_list|20': [{
    'index|+1': 1,
    'id|+1': 10000,
    nick_name: '@cname',
    wx_alias: '@name',
    'invite_num|0-1000': 1000,
    'status_text|1-5': 5,
    'is_blocked|1': true,
  }],
});

// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function () {
  const articles = [];
  for (let i = 0; i < 100; i++) {
    const newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: `${Random.date()} ${Random.time()}`, // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    };
    articles.push(newArticleObject);
  }

  return {
    articles,
  };
};

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/index', 'post', produceNewsData);


Mock.mock(`${BASEURL}/cdm/accounts/login`,{
    'user_name': '于炳华',
    'role':['assistant'],
});
//获取权限
Mock.mock(`${BASEURL}/cdm/accounts/role`,{
  'role':['assistant'],
});


