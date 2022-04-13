import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const DistrictComponent = lazy(() => import('../../container/district/district'));

const district = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}`} component={DistrictComponent} />
        </Switch>
    )
}

export default district