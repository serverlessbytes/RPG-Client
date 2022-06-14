import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';


const queryComponent = lazy(() => import('../../container/query/query'));

const query = () => {

    const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`} component={queryComponent} />
    </Switch>
  )
}

export default query