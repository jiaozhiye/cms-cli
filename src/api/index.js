import axios from './fetch';
import config from '@/assets/js/config';

// 登录接口
export const doLogin = params => axios.post('/login/do', params);

// 侧边栏导航菜单
export const getSideMenu = params => axios.get('/api/menu/getList');

// 获取所有的数据字典值
export const getAllDict = params => axios.get('/api/dict/all');

// 获取角色列表
export const getRoleInfo = params => axios.get('/api/role/getList', { params });

// 获取角色记录
export const getRoleRecord = params => axios.get('/api/role/getOne', { params });

// 新增角色记录
export const addRoleRecord = params => axios.post('/api/role/insert', params);

// 修改角色记录
export const modRoleRecord = params => axios.post('/api/role/update', params);

// 删除角色记录
export const delRoleRecord = params => axios.get('/api/role/delete', { params });

// 获取用户列表
export const getUserList = params => axios.get('/api/user/getList', { params });

// 获取用户记录
export const getUserRecord = params => axios.get('/api/user/getOne', { params });

// 新增用户记录
export const addUserRecord = params => axios.post('/api/user/insert', params);

// 修改用户记录
export const modUserRecord = params => axios.post('/api/user/update', params);

// 删除用户记录
export const delUserRecord = params => axios.get('/api/user/delete', { params });

// 获取菜单列表
export const getMenuList = params => axios.get('/api/menu/getTree', { params });

// 上传富文本编辑器图片接口
export const editerUploadUrl = `${config.serverUrl}/api/uploadEditerFile`;

// 测试接口
export const testRequest = params => axios.get('/api/test', { params });
