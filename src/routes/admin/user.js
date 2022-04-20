import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';



const StateComponent = lazy(() => import('../../container/user/User'));
const AddUser = lazy(() => import('../../container/user/Adduser'));

const user = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}`} component={StateComponent} />
            <Route exact path={`${path}/adduser`} component={AddUser} />
        </Switch>
    )
}

export default user