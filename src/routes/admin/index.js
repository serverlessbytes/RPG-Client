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
import Courses from './Courses';
import district from './district';
 import user from './user'; 
import Testimonial from './Testimonial';
import Banner from '../../container/banner/Banner';
import Carousel from '../../container/carousel/Carousel';
import Employer from '../../container/employer/Employer';

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
        <Route path={`${path}/district`} component={district} />
        <Route path={`${path}/profile`} component={Profile} />
        <Route path={`${path}/language`} component={LanguageRoutes} />
        <Route path={`${path}/scheme`} component={schemes} />
        <Route path={`${path}/courses`} component={Courses} />
        <Route path={`${path}/testimonial`} component={Testimonial} />
        <Route path={`${path}/user`} component={user} />
        <Route path={`${path}/banner`} component={Banner} />
        <Route path={`${path}/carousel`} component={Carousel} />
        <Route path={`${path}/employer`} component={Employer} />
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Admin);
