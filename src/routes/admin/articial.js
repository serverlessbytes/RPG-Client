import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';


const articleComponent = lazy(() => import('../../container/article/article'));

const articial = () => {

    const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`} component={articleComponent} />
    </Switch>
  )
}

export default articial