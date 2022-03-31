import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const Schemes = lazy(() => import('../../container/schemes/Schemes'));
const AddSchemes = lazy(() => import('../../container/schemes/AddSchemes'));

const schemes = () => {

    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}`} component={Schemes}/>
            <Route exact path={`${path}/addscheme`} component={AddSchemes} />
        </Switch>
    )
}

export default schemes