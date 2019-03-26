/**
 * @Author: Jzy
 * @Date: 2017/12/12
 * @Last Modified by:   jzy
 * @Last Modified time: 2018-02-21 17:52:11
 */
import moment from 'moment';
// 去除 moment.js 中多余的语言包
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

function getRandom(a, b) {
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

// 函数防抖
function debounce(fn, delay) {
  return function(...args) {
    fn.timer && clearTimeout(fn.timer);
    fn.timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 函数节流
function throttle(fn, delay) {
  return function(...args) {
    let _nowTime = +new Date();
    if (!fn._lastTime || _nowTime - fn._lastTime > delay) {
      fn.apply(this, args);
      fn._lastTime = _nowTime;
    }
  };
}

// 异步等待
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

// moment 日期对象 -> 字符串
function dateFormat(date) {
  return moment(date).format('YYYY-MM-DD');
}

// moment 日期对象 -> 字符串
function dateTimeFormat(date) {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

// 字符串 -> moment 日期对象
function dateToMoment(dateStr) {
  return moment(dateStr, 'YYYY-MM-DD');
}

// 字符串 -> moment 日期对象
function dateTimeToMoment(dateStr) {
  return moment(dateStr, 'YYYY-MM-DD HH:mm:ss');
}

export { getRandom, debounce, throttle, sleep, dateFormat, dateTimeFormat, dateToMoment, dateTimeToMoment };
