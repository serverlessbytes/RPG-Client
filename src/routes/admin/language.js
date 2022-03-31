import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';


const LanguageComponent = lazy(() => import('../../container/language/Language'));

const LanguageRoutes = () => {

    const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}`} component={LanguageComponent} />
    </Switch>
  )
}

export default LanguageRoutes