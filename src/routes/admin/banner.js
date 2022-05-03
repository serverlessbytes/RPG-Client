import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';


const BannerComponent = lazy(() => import('../../container/banner/Banner'));

const banner = () => {

    const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`} component={BannerComponent} />
    </Switch>
  )
}

export default banner