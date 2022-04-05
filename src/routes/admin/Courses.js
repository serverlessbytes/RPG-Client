
import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const SwayamCourses = lazy(() => import('../../container/courses/SwayamCourses'));
const PartnerCourses = lazy(() => import('../../container/courses/PartnerCourses'));
const CourseCategory = lazy(() => import('../../container/courses/CourseCategory'));
const AddCourses = lazy(() => import('../../container/courses/AddCourses'));

const Courses = () => {
    const { path } = useRouteMatch();
    console.log("path ============",path);
    return (
        <Switch>
            <Route exact path={`${path}`} component={SwayamCourses} />
            <Route exact path={`${path}/partnercourses`} component={PartnerCourses} />
            <Route exact path={`${path}/coursecategory`} component={CourseCategory} />
            <Route exact path={`${path}/addcourses`} component={AddCourses} />
        </Switch>
    )
}

export default Courses