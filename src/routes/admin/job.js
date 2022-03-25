import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const Dashboard = lazy(() => import('../../container/job/JobDashboard'));
// const Invoice = lazy(() => import('../../container/ecommerce/Invoice'));
const JobPost = lazy(() => import('../../container/job/JobPost'));

const JobRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/dashboard`} component={Dashboard} />
      <Route exact path={`${path}/post`} component={JobPost} />
      {/* <Route path={`${path}/social`} component={Dashboard} /> */}
    </Switch>
  );
};

export default JobRoutes;