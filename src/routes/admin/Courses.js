
import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const SwayamCourses = lazy(() => import('../../container/courses/SwayamCourses'));
const PartnerCourses = lazy(() => import('../../container/courses/PartnerCourses'));
const AddPartnerCourses = lazy(() => import('../../container/courses/AddPartnerCourses'));
const CourseCategory = lazy(() => import('../../container/courses/CourseCategory'));
const AddCourses = lazy(() => import('../../container/courses/AddCourses'));
const CourseRating = lazy(() => import('../../container/courses/CourseRating'))
const ViewCourse = lazy(() => import('../../container/courses/ViewCourse'))
const PartnerCourseView = lazy(() => import('../../container/courses/PartnerCourseView'))

const Courses = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}`} component={SwayamCourses} />
            <Route exact path={`${path}/partnercourses`} component={PartnerCourses} />
            <Route exact path={`${path}/partnercourses/addpartnercourses`} component={AddPartnerCourses} />
            <Route exact path={`${path}/coursecategory`} component={CourseCategory} />
            <Route exact path={`${path}/addcourses`} component={AddCourses} />
            <Route exact path={`${path}/courserating`} component={CourseRating} />
            <Route exact path={`${path}/viewcourse`} component={ViewCourse} />
            <Route exact path={`${path}/viewpartnercourse`} component={PartnerCourseView} />
        </Switch>
    )
}

export default Courses