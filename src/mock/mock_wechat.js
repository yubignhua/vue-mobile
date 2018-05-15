/**
 * Created by zdl on 2018/04/02.
 */
// 使用 Mock

import Mock from 'mockjs';

const BASEURL = 'https://biztest.chunyu.me';

/**
 * 设置延时时间
 */
Mock.setup({
  timeout: '200-2000', // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
});

var Random = Mock.Random;

// 用户详情
Mock.mock(`${BASEURL}/cdm/user/detail1`, 'post', function (req) {
  console.log("当前请求接口：用户详情");
  // var reqBody = JSON.parse(req.body);
  // var userId = parseInt(reqBody.data.user_id || 111);
  // console.log("当前请求userId:::" + userId);

  var template = {
    "error_code": 0,
    "error_msg": "success",
    "user_info": {
      "name": '@cname',
      "custom_tags": "小明爸爸",
      "remarks": '血压高'
    }
  }

  return Mock.mock(template);
})

// 获取用户健康基本信息
Mock.mock(`${BASEURL}/cdm/user/health/detail`, 'post', function (req) {
  console.log("当前请求接口：获取用户健康基本信息");
  console.log("请求参数：");
  console.log(req);

  var template = {
    "error_code": 0,
    "error_msg": "success",
    "user_info": {
      "CAD_relations|1-2": ["爸爸", "妈妈"],
      "DMS_relations|1-3": ["爷爷", "奶奶"],
      "HBP_relations|1-2": ["外公", "外婆"],
      "age|20-80": 80,
      "bmi|18.5-32": 1,
      "exercise|0-7": 1,
      "have_BL_exc|1-2": true,
      "have_BS_exc|1-2": true,
      "have_HTN|1-2": true,
      "have_UA_exc|1-2": true,
      "height|50-190": 1,
      "high_blood|70-170": 1,
      "low_blood|10-90": 1,
      "name": "@cname",
      "sex|": "女",
      "smoke|0-50": 1,
      "symptoms|1-2": ["头痛", "注意力不集中"],
      "user_remarks": "高血压",
      "custom_tags": "小明爸爸",
      "weight|40-100": 1
    }
  }

  return Mock.mock(template);
})

// 更新用户健康基本信息
Mock.mock(`${BASEURL}/cdm/user/health/update`, 'post', function (req) {
  console.log("当前请求接口：更新用户健康基本信息");
  console.log("请求参数：");
  console.log(req);

  var template = {
    "error_code": 0,
    "error_msg": "success"
  }

  return Mock.mock(template);
})

// 获取用户服药列表
Mock.mock(`${BASEURL}/cdm/user/get_drug_list`, 'post', function (req) {
  console.log("当前请求接口：用户服药列表");
  console.log("请求参数");
  console.log(req);

  var template = {
    "error_code": 0,
    "error_msg": "success",
    "total_count|40-60": 1,
    "drug_list|1-12": [{
      "dose|1": ["3mg", "6mg", "2mg", "0.015g"],
      "record_id": Random.natural(1, 100),
      "name|1": ["硝苯地平片", "盐酸普萘洛尔片", "非洛地平缓释片", "吲达帕胺片", "马来酸依那普利片", "西拉普利"],
      "record_time": Random.date("yyyy-MM-dd"),
      "remark|1": ["忌辛辣", "忌酒", "保持良好作息", "哺乳期禁用"],
      "status|1": ["init", "stop", "finish", "using"],
      "take_drug_feq|1": ["1/8", "1/12", "1/24"],
      "take_end_time": Random.date("yyyy/MM/dd"),
      "take_start_time": Random.date("yyyy/MM/dd")
    }]
  }

  return Mock.mock(template);
})

// 新增服用药品
Mock.mock(`${BASEURL}/cdm/user/drug/add`, 'post', function (req) {
  console.log("当前请求接口：新增服用药品");
  console.log("请求参数");
  console.log(req);

  var template = {
    "error_code": 0,
    "error_msg": "success"
  }

  return Mock.mock(template);
})

// 停止用药
Mock.mock(`${BASEURL}/cdm/user/drug/stop`, 'post', function (req) {
  console.log("当前请求接口：停止用药");
  console.log("请求参数");
  console.log(req);

  var template = {
    "error_code": 0,
    "error_msg": "success"
  }

  return Mock.mock(template);
})

// 动态血压信息列表
Mock.mock(`${BASEURL}/cdm/user/pressure/report_list`, 'post', function (req) {
  console.log("当前请求接口：动态血压信息列表");
  console.log("请求参数：");
  console.log(req);

  var template = {
    "error_code": 0,
    "error_msg": "success",
    "total_count|40-60": 1,
    "pressure_list|1-5": [{
      "filename": Random.string(7, 20),
      "has_badge|1-2": true,
      "report_id|1-60": 1,
      "upload_time": Random.date("yyyy/MM/dd"),
      "url": Random.url(),
    }]
  }

  return Mock.mock(template);
})

// 最近血压记录
Mock.mock(`${BASEURL}/cdm/user/pressure/last_pressure_record/list`, 'post', function (req) {
  console.log("当前请求接口：最近血压记录");
  console.log("请求参数：");
  console.log(req);

  var template = {
    "error_code": 0,
    "error_msg": "success",
    "total_count|40-60": 1,
    "pressure_list|1-12": [{
      "created_time": Random.date("yyyy/MM/dd HH:mm"),
      "heart_rate|50-150": 1,
      "high_pressure|70-170": 1,
      "high_pressure_status|1": [0,1,2],
      "low_pressure|10-70": 1,
      "low_pressure_status|1": [0,1,2],
      "pressure_id|1-60": 1
    }]
  }

  return Mock.mock(template);
})

// 手动上传血压信息
Mock.mock(`${BASEURL}/cdm/user/pressure/common/upload`, 'post', function (req) {
  console.log("当前请求接口：手动上传血压信息");
  console.log("请求参数：");
  console.log(req);

  var template = {
    "error_code": 0,
    "error_msg": "success"
  }

  return Mock.mock(template);
})

// 服务记录列表
Mock.mock(`${BASEURL}/cdm/staff/service/list`, 'post', function (req) {
  console.log("当前请求接口：服务记录列表");
  console.log("请求参数：");
  console.log(req);

  var template = {
    "error_code": 0,
    "error_msg": "success",
    "total_count|40-60": 1,
    "advice_list|1-12": [{
      "content": Random.cparagraph(),
      "created_time": Random.date("yyyy-MM-dd HH:mm"),
      "has_badge|1-2": true,
      "service_type|1": ["电话回访", "医生建议", "其他"],
      "user_id|1-60": 1,
      "advice_id|1-60": 1
    }]
  }

  return Mock.mock(template);
})

// 服务记录详情
Mock.mock(`${BASEURL}/cdm/staff/service/detail`, 'post', function (req) {
  console.log("当前请求接口：服务记录详情");
  console.log("请求参数：");
  console.log(req);

  var template = {
    "error_code": 0,
    "error_msg": "success",
    "advice_info": {
      "content": Random.cparagraph(),
      "created_time": Random.date("yyyy-MM-dd"),
      "oper_user_name": '@cname',
      "service_type|1": ["电话回访", "医生建议", "其他"],
      "user_id|1-60": 1,
      "advice_id|1-60": 1
    }
  }

  return Mock.mock(template);
})

// 新增服务记录
Mock.mock(`${BASEURL}/cdm/staff/service/create`, 'post', function (req) {
  console.log("当前请求接口：新增服务记录");
  console.log("请求参数：");
  console.log(req);

  var template = {
    "error_code": 0,
    "error_msg": "success"
  }

  return Mock.mock(template);
})

// 健康助理信息
Mock.mock(`${BASEURL}/cdm/assistant/contacts`, 'post', function (req) {
  console.log("当前请求接口：健康助理信息");

  var template = {
    "error_code": 0,
    "error_msg": "success",
    "assistant_info": {
      "cellphone": /^1[385][1-9]\d{8}/,
      "telphone": /^1[385][1-9]\d{8}/,
      "weixin": Random.string(7, 13)
    }
  }

  return Mock.mock(template);
})

// 血压月历
Mock.mock(`${BASEURL}/cdm/user/pressure/month/list`, 'post', function (req) {
  console.log("当前请求接口：血压月历");
  console.log("请求参数：");
  console.log(req);

  var template = {
    "error_code": 0,
    "error_msg": "success",
    "pressure_list": [
      {
        "upload_time": "2018-04-01 18:07:36",
        "high_pressure|50-190": 1,
        "high_pressure_status|1": [0,1,2],
        "low_pressure|10-90": 1,
        "low_pressure_status|1":[0,1,2]
      },
      {
        "upload_time": "2018-04-01 19:07:36",
        "high_pressure|50-190": 1,
        "high_pressure_status|1": [0,1,2],
        "low_pressure|10-90": 1,
        "low_pressure_status|1":[0,1,2]
      },
      {
        "upload_time": "2018-04-10 18:07:36",
        "high_pressure|50-190": 1,
        "high_pressure_status|1": [0,1,2],
        "low_pressure|10-90": 1,
        "low_pressure_status|1":[0,1,2]
      },
      {
        "upload_time": "2018-04-10 19:07:36",
        "high_pressure|50-190": 1,
        "high_pressure_status|1": [0,1,2],
        "low_pressure|10-90": 1,
        "low_pressure_status|1":[0,1,2]
      },
      {
        "upload_time": "2018-04-19 18:07:36",
        "high_pressure|50-190": 1,
        "high_pressure_status|1": [0,1,2],
        "low_pressure|10-90": 1,
        "low_pressure_status|1":[0,1,2]
      },
      {
        "upload_time": "2018-04-19 19:07:36",
        "high_pressure|50-190": 1,
        "high_pressure_status|1": [0,1,2],
        "low_pressure|10-90": 1,
        "low_pressure_status|1":[0,1,2]
      },
      {
        "upload_time": "2018-04-24 18:07:36",
        "high_pressure|50-190": 1,
        "high_pressure_status|1": [0,1,2],
        "low_pressure|10-90": 1,
        "low_pressure_status|1":[0,1,2]
      },
      {
        "upload_time": "2018-04-24 19:07:36",
        "high_pressure|50-190": 1,
        "high_pressure_status|1": [0,1,2],
        "low_pressure|10-90": 1,
        "low_pressure_status|1":[0,1,2]
      },
      {
        "upload_time": "2018-04-30 18:07:36",
        "high_pressure|50-190": 1,
        "high_pressure_status|1": [0,1,2],
        "low_pressure|10-90": 1,
        "low_pressure_status|1":[0,1,2]
      },
      {
        "upload_time": "2018-04-30 19:07:36",
        "high_pressure|50-190": 1,
        "high_pressure_status|1": [0,1,2],
        "low_pressure|10-90": 1,
        "low_pressure_status|1":[0,1,2]
      }
    ]
  }

  return Mock.mock(template);
})

// 查询服务列表
Mock.mock(`${BASEURL}/cdm/service/search`, 'post', function (req) {
  console.log("当前请求接口：查询服务列表");
  console.log("请求参数：");
  console.log(req);

  var serviceListTemplate = {
    'error_code': 0,
    'error_msg': "success",
    'total_count|40-60': 1,
    'service_list|6-12': [{
      'user_id': Random.natural(1, 100), //用户id
      'user_name': '@cname',  //用户姓名
      'user_age|30-100': 100,  //用户年龄
      'user_remarks': '血压高',  //用户备注
      'bp_h': '160',  //最近高压
      'bp_l': '70',  //最近低压
      'assistant_name': '@cname',  //医助姓名
      'user_cellphone': /^1[385][1-9]\d{8}/,  //用户手机号
      'user_custorm_tags': '小明爸爸',  //用户标签
      'has_badge|1-2': true  //是否有新消息
    }]
  }

  return Mock.mock(serviceListTemplate);
})

// 获取验证码
Mock.mock(`${BASEURL}/cdm/accounts/send_sms_code`, 'post', function (req) {
  console.log("当前请求接口：获取验证码");
  console.log("请求参数：");
  console.log(req);

  var template = {
    "error_code": 0,
    "error_msg": "success"
  }

  return template;
})

// 获取图形验证码
Mock.mock(`${BASEURL}/api/accounts/captcha/request`, 'post', function (req) {
  console.log("当前请求接口：获取图形验证码");
  console.log("请求参数：");
  console.log(req);

  var template = {
    "image_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524129344837&di=4ce815ae7df383b152b98d6e988694e6&imgtype=jpg&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D2367966581%2C875119178%26fm%3D214%26gp%3D0.jpg",
    "key": "123"
  }

  return template;
})

// 验证图形验证码
Mock.mock(`${BASEURL}/api/accounts/captcha/check`, 'post', function (req) {
  console.log("当前请求接口：验证图形验证码");
  console.log("请求参数：");
  console.log(req);

  var template = {
    "error_code": 0,
    "error_msg": "success"
  }

  return template;
})
