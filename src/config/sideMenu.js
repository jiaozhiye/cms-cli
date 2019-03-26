export default [
  {
    title: '首页',
    key: '/home',
    icon: 'home'
  },
  {
    title: '系统管理',
    key: '/site',
    icon: 'appstore',
    children: [
      {
        title: '部门管理',
        key: '/site/dept',
        icon: 'user'
      },
      {
        title: '员工管理',
        key: '/site/employ',
        icon: 'user'
      }
    ]
  },
  {
    title: '学生管理',
    key: '/student',
    icon: 'setting',
    children: [
      {
        title: '在校学生',
        key: '/student/school',
        icon: 'user'
      },
      {
        title: '学员池',
        key: '/student/pool',
        icon: 'user'
      }
    ]
  }
];
