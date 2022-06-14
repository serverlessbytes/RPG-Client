import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const   Schemes = lazy(() => import('../../container/schemes/Schemes'));
const AddSchemes = lazy(() => import('../../container/schemes/AddSchemes'));
const SchemeCategory = lazy(() => import('../../container/schemes/SchemeCategory'));
const BenefitsType = lazy(() => import('../../container/schemes/BenefitsType'));
const SchemeRating = lazy(() => import('../../container/schemes/SchemeRating'));
const ViewScheme = lazy(() => import('../../container/schemes/ViewScheme'));

const schemes = () => {

    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}`} component={Schemes}/>
            <Route exact path={`${path}/addscheme`} component={AddSchemes} />
            <Route exact path={`${path}/schemecategory`} component={SchemeCategory} />
            <Route exact path={`${path}/benefitstype`} component={BenefitsType} />
            <Route exact path={`${path}/schemerating`} component={SchemeRating} />
            <Route exact path={`${path}/view`} component={ViewScheme} />
        </Switch>
    )
}

export default schemes