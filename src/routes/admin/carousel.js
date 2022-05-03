import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';



const CarouselComponent = lazy(() => import('../../container/carousel/Carousel'));

const carousel = () => {

    const { path } = useRouteMatch();

    return (
        <>
            <Switch>
                <Route path={`${path}`} component={CarouselComponent} />
            </Switch>
        </>
    )
}

export default carousel