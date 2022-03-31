import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const StateComponent = lazy(() => import('../../container/state/State'));

const State = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}`} component={StateComponent} />
        </Switch>
    )
}

export default State