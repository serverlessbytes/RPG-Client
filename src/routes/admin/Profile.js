import React, { lazy } from 'react'
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';


const MyProfile = lazy(() => import('../../container/profile/myProfile'));

const Profile = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}/myprofile`} component={MyProfile} />
        </Switch>
    )
}

export default Profile