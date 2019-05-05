import moment from 'moment';
// 去除 moment.js 中多余的语言包
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export default {
  // moment 日期对象 -> 字符串
  dateFormat: date => {
    return moment(date).format('YYYY-MM-DD');
  },

  // moment 日期对象 -> 字符串
  dateTimeFormat: date => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  },

  // 字符串 -> moment 日期对象
  dateToMoment: dateStr => {
    return moment(dateStr, 'YYYY-MM-DD');
  },

  // 字符串 -> moment 日期对象
  dateTimeToMoment: dateStr => {
    return moment(dateStr, 'YYYY-MM-DD HH:mm:ss');
  }
};
