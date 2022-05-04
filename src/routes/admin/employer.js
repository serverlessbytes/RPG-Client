import React,{ lazy } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom';
const EmployerComponent = lazy(() => import('../../container/employer/Employer'));

const employer = () => {
    const { path } = useRouteMatch();
    return(
        <Switch>
            <Route exact path={`${path}`} component={EmployerComponent} />
        </Switch>    
    )
  
}

export default employer