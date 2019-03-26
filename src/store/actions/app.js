import { DO_LOGIN, CREATE_MENU, LOADING_STATE, DICT_DATA } from '../types';
import { doLogin, getSideMenu, getAllDict } from '@/api';
import dictData from '@/config/dictData';
import { sleep } from '@/assets/js/util';
// 测试数据
import menuList from '@/config/sideMenu';
import dictDemo from '@/config/dictDemo';

/**
 * 登录
 * @params: { username, password }
 */
export const createLogin = (params = {}) => async (dispatch, getState) => {
  const res = await doLogin(params);
  // console.log(res)
  if (res.code === 1) {
    // 成功登录
    // 这里的 type 一定要全局唯一，因为每次 dispatch，所有的 reducer 都会根据类型比对一遍
    dispatch({
      type: DO_LOGIN,
      payload: res.data
    });
  }
  return res;
};

/**
 * 侧边栏导航菜单
 * @params:
 */
export const createSideMenu = () => async (dispatch, getState) => {
  const {
    app: { menus }
  } = getState();
  if (menus.length) return;
  const res = await getSideMenu();
  // await sleep(500);

  // ============================
  // dispatch({
  //   type: CREATE_MENU,
  //   payload: menuList
  // });
  // ============================

  if (res.code === 1) {
    dispatch({
      type: CREATE_MENU,
      payload: res.data
    });
  }
};

/**
 * 页面按钮加载中状态
 * @params: { Boolean }
 */
export const createBtnLoadingState = (params = false) => ({
  type: LOADING_STATE,
  payload: params
});

/**
 * 数据字典、筛选条件数据
 * @params:
 */
export const createDictData = () => async (dispatch, getState) => {
  const {
    app: { dict }
  } = getState();
  if (Object.keys(dict).length) return;
  const res = await getAllDict();
  // await sleep(500);

  // ============================
  dispatch({
    type: DICT_DATA,
    payload: { ...dictData, ...dictDemo }
  });
  // ============================

  if (res.code === 1) {
    dispatch({
      type: DICT_DATA,
      payload: { ...dictData, ...res.data }
    });
  }
};
