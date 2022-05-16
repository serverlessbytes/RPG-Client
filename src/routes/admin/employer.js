import React,{ lazy } from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom';
const EmployerComponent = lazy(() => import('../../container/employer/Employer'));
const EmployerRating =lazy(()=>import('../../container/employer/EmployerRating'))

const Employer = () => {
    const { path } = useRouteMatch();
    return(
        <Switch>
            <Route exact path={`${path}`} component={EmployerComponent} />
            <Route exact path={`${path}/employerrating`} component={EmployerRating} />
        </Switch>    
    )
  
}

export default Employer