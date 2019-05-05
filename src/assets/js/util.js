/**
 * @Author: Jzy
 * @Date: 2017/12/12
 * @Last Modified by:   jzy
 * @Last Modified time: 2018-02-21 17:52:11
 */
const ObjProto = Object.prototype;
const toString = ObjProto.toString;
const hasOwn = ObjProto.hasOwnProperty;

/**
 * No-op function
 */
export const noop = () => {};

/**
 * Checks for a own property in an object
 *
 * @param {object} obj - Object
 * @param {string} prop - Property to check
 */
export const has = (obj, prop) => hasOwn.call(obj, prop);

export const isInteger =
  Number.isInteger ||
  function(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
  };

export const isArray =
  Array.isArray ||
  function(value) {
    return toString.call(value) === '[object Array]';
  };

export const isFunction = value => toString.call(value) === '[object Function]';

export const isString = obj => {
  return Object.prototype.toString.call(obj) === '[object String]';
};

export const isObject = obj => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

export const isHtmlElement = node => {
  return node && node.nodeType === Node.ELEMENT_NODE;
};

export const isEmptyElement = node => {
  return !(node.tag || (node.text && node.text.trim() !== ''));
};

// 随机数
export const getRandom = (a, b) => {
  return Math.floor(Math.random() * (b - a + 1)) + a;
};

// 函数防抖
export const debounce = (fn, delay) => {
  return function(...args) {
    fn.timer && clearTimeout(fn.timer);
    fn.timer = setTimeout(() => fn.apply(this, args), delay);
  };
};

// 函数节流
export const throttle = (fn, delay) => {
  return function(...args) {
    let nowTime = +new Date();
    if (!fn.lastTime || nowTime - fn.lastTime > delay) {
      fn.apply(this, args);
      fn.lastTime = nowTime;
    }
  };
};

// 等待
export const sleep = async time => {
  return new Promise(resolve => setTimeout(resolve, time));
};

export const formatNumber = value => {
  if (!value) {
    return '0';
  }
  // 将整数部分逢三一断
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  return intPartFormat;
};

export const contains = (root, target) => {
  let node = target;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};
