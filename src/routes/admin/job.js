import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
//import JobApplication from '../../container/job/JobApplication';

const Dashboard = lazy(() => import('../../container/job/JobDashboard'));
// const Invoice = lazy(() => import('../../container/ecommerce/Invoice'));
const JobPost = lazy(() => import('../../container/job/JobPost'));
const JobListTable = lazy(() => import('../../container/job/JobListTable'));
const AddJobPost = lazy(() => import('../../container/job/AddJobPost'));
const JobCategory = lazy(() => import('../../container/job/JobCategory'))
const JobRole = lazy(() => import('../../container/job/JobRole'))
const JobApplication = lazy(() => import('../../container/job/JobApplication'))

const JobRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/dashboard`} component={Dashboard} />
      <Route exact path={`${path}/post`} component={JobPost} />
      <Route exact path={`${path}/post/private`} component={JobListTable} />
      <Route exact path={`${path}/new`} component={AddJobPost} />
      <Route exact path={`${path}/category`} component={JobCategory} />
      <Route exact path={`${path}/role`} component={JobRole} />
      <Route exact path={`${path}/application`} component={JobApplication} />
    </Switch>
  );
};

export default JobRoutes;