/****
 *
 * 公共类型、枚举、选项等定义
 *
 * ****/

// 根据px计算rem，返回字符串
function getRem(px) {
  return (px / 23.4375) + "rem"
}

// 获得当前日期格式化后的字符串
function getFormatDate(format) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  if (hour < 10) {
    hour = "0" + hour;
  }

  if (minute < 10) {
    minute = "0" + minute;
  }

  if (second < 10) {
    second = "0" + second;
  }

  var result = year + "-" + month + "-" + day;

  if (format.search("ss") > -1) {
    result = result + "  " + hour + ":" + minute + ":" + second;
  }
  else if (format.search("mm") > -1) {
    result = result + "  " + hour + ":" + minute;
  }

  return result;
}

// 服务类型
function getServiceType() {
  return [
    {key: 1, value: "电话回访"},
    {key: 2, value: "短信回访"},
    {key: 3, value: "微信回访"},
    {key: 4, value: "医生建议"},
    {key: 9, value: "其他"}
  ];
}

// 获得服务类型value
function getServiceTypeValue(typeKey) {
  var typeValue = "";
  switch (typeKey) {
    case 1:
      typeValue = "电话回访";
      break;
    case 2:
      typeValue = "短信回访";
      break;
    case 3:
      typeValue = "微信回访";
      break;
    case 4:
      typeValue = "医生建议";
      break;
    case 9:
      typeValue = "其他";
      break;
    default:
      typeValue = "其他";
  }
  return typeValue;
}

// 获得服药剂量
function getDrugFeq() {
  return ["1/6h", "1/8h", "1/12h", "1/24h"];
}

// 获得睡眠时间
function getSleepTime() {
  return ["<6小时", "6~7小时（不包含7小时）", "7~8小时（不包含8小时）", "8小时以上"]
}

module.exports = {
  getRem: getRem,
  getFormatDate: getFormatDate,
  getServiceTypeValue: getServiceTypeValue,
  getDrugFeq: getDrugFeq,
  getServiceType: getServiceType,
  getSleepTime: getSleepTime
}
