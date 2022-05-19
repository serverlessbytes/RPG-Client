import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// const StateComponent = lazy(() => import('../../container/user/UserOld'));
const AddUser = lazy(() => import('../../container/user/Adduser'));


const StateUser = lazy(() => import('../../container/user/User'));
const UserRating = lazy(() => import('../../container/user/UserRating'));
const Partner = lazy(() => import('../../container/user/Partner'));
const Employer = lazy(() => import('../../container/user/Employer'));
const Admin = lazy(() => import('../../container/user/Admin'));
const SuperAdmin = lazy(() => import('../../container/user/SuperAdmin'));
const EmployerRating = lazy(() => import('../../container/user/EmployerRating'));



// const User = lazy(() => import('../../container/user/Partner'));



const user = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}/adduser`} component={AddUser} />
            <Route exact path={`${path}/partner/adduser`} component={AddUser} />
            <Route exact path={`${path}/employer/adduser`} component={AddUser} />
            <Route exact path={`${path}/useradmin/adduser`} component={AddUser} />
            <Route exact path={`${path}/superadmin/adduser`} component={AddUser} />
            <Route exact path={`${path}`} component={StateUser} />
            <Route exact path={`${path}/userrating`} component={UserRating} />
            <Route exact path={`${path}/partner`} component={Partner} />
            <Route exact path={`${path}/employer`} component={Employer} />
            <Route exact path={`${path}/employerrating`} component={EmployerRating} />
            <Route exact path={`${path}/useradmin`} component={Admin} />
            <Route exact path={`${path}/superadmin`} component={SuperAdmin} />

            {/* <Route exact path={`${path}`} component={StateComponent} /> */}
        </Switch>
    )
}

export default user