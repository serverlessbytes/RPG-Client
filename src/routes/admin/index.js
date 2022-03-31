import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Dashboard from './dashboard';
import withAdminLayout from '../../layout/withAdminLayout';
import Job from './job';
import Profile from './Profile';
import State from './state';
import LanguageRoutes from './language';
import schemes from './schemes';

const Admin = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route path={path} component={Dashboard} />
        <Route path={`${path}/job`} component={Job} />
        <Route path={`${path}/state`} component={State} />
        <Route path={`${path}/profile`} component={Profile} />
        <Route path={`${path}/language`} component={LanguageRoutes} />
        <Route path={`${path}/scheme`} component={schemes} />
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Admin);
