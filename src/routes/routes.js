import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import Layout from '@/pages/layout';
import Loading from '@/components/Loading';

// 异步加载组件 - 按需加载
const Home = Loadable({
  loader: () => import('@/pages/home'),
  loading: Loading
});

const Role = Loadable({
  loader: () => import('@/pages/role'),
  loading: Loading
});

const User = Loadable({
  loader: () => import('@/pages/user'),
  loading: Loading
});

const Menu = Loadable({
  loader: () => import('@/pages/menu'),
  loading: Loading
});

const Demo = Loadable({
  loader: () => import('@/pages/demo'),
  loading: Loading
});

const NoMatch = Loadable({
  loader: () => import('@/pages/no-match'),
  loading: Loading
});
// 异步加载组件 END

const Routes = props => {
  return (
    <Layout {...props}>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/system/role" component={Role} />
        <Route exact path="/system/user" component={User} />
        <Route exact path="/system/menu" component={Menu} />
        <Route exact path="/system/permission" component={Home} />
        <Redirect exact from="/system" to="/system/role" />
        <Route exact path="/site/classify" component={Home} />
        <Route exact path="/site/article" component={Demo} />
        <Route exact path="/site/web" component={Home} />
        <Redirect exact from="/site" to="/site/classify" />
        <Redirect exact from="/" to="/home" />
        <Route component={NoMatch} />
      </Switch>
    </Layout>
  );
};

export default Routes;
