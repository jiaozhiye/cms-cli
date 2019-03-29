import React, { Component, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { getToken } from '@/assets/js/auth';
import RoutesMap from './routes';

import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式

// App -> 应用的根组件，承载一级路由( 页面级路由：登录页、主页、详情页 ... )
import App from '@/App';
// Login -> 登陆页面
import Login from '@/pages/login';

// 自定义私有路由，用于校验用户是否登录 - 无状态组件
const PrivateRoute = ({ component: Component, ...rest }) => {
  NProgress.start();
  const { state } = rest.location;
  if (state && state.title) {
    document.title = state.title;
  }
  useEffect(() => {
    NProgress.done();
  });
  return <Route {...rest} render={props => (getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)} />;
};

export default class AppRouter extends Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute path="/" component={RoutesMap} />
          </Switch>
        </App>
      </Router>
    );
  }
}
