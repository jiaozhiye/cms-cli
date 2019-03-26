import { DO_LOGIN, CREATE_MENU, LOADING_STATE, DICT_DATA } from '../types';
import { setToken } from '@/assets/js/auth';

/**
 * 初始化state
 */
const initState = {
  userInfo: {}, // 当前用户基本信息
  menus: [], // 当前用户所有已授权的菜单
  roles: [], // 当前用户拥有的所有角色
  btnLoading: false, // 按钮的加载中状态
  dict: {} // 数据字典、筛选条件
};

const setUserInfo = (state, payload) => {
  setToken(payload.token);
  return Object.assign({}, state, {
    userInfo: payload,
    roles: payload.roles || []
  });
};

// 递归添加父节点
const addParentNode = list => {
  (function func(arr, obj) {
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i].children) && arr[i].children.length > 0) {
        let { title, key, icon } = arr[i];
        func(arr[i].children, { title, key, icon });
      }
      if (typeof obj !== 'undefined') {
        arr[i].parent = obj;
      }
    }
  })(list);
  return list;
};

const setSideMenu = (state, payload) => {
  return Object.assign({}, state, {
    menus: addParentNode(payload)
  });
};

const setBtnLoading = (state, payload) => {
  return Object.assign({}, state, {
    btnLoading: payload
  });
};

const setDictData = (state, payload) => {
  return Object.assign({}, state, {
    dict: payload
  });
};

// 必须要给 state 参数默认赋值 initState
export const appReducer = (state = initState, action) => {
  switch (action.type) {
    case DO_LOGIN:
      return setUserInfo(state, action.payload);
    case CREATE_MENU:
      return setSideMenu(state, action.payload);
    case LOADING_STATE:
      return setBtnLoading(state, action.payload);
    case DICT_DATA:
      return setDictData(state, action.payload);
    default:
      return state;
  }
};
