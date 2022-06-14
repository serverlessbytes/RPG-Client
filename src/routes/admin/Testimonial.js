import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';


const StateComponent = lazy(() => import('../../container/testimonial/Testimonial'));
const Addtestimonial = lazy(() => import('../../container/testimonial/Addtestimonial'));

const Testimonial = () => {

    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}`} component={StateComponent} />
            <Route exact path={`${path}/addtestimonial`} component={Addtestimonial} />
        </Switch>
    )
}

export default Testimonial