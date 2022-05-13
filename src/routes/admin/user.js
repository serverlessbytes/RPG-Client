import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';



const StateComponent = lazy(() => import('../../container/user/User'));
const AddUser = lazy(() => import('../../container/user/Adduser'));
const UserRating = lazy (()=>import('../../container/user/UserRating'));

const user = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}`} component={StateComponent} />
            <Route exact path={`${path}/adduser`} component={AddUser} />
            <Route exact path={`${path}/userrating`} component={UserRating} />
        </Switch>
    )
}

export default user