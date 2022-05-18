import { Button, Col, PageHeader, Row, Switch } from 'antd';
import React, { useEffect } from 'react';
import moment from 'moment';
import { getoneJobPost } from '../../redux/jobs/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { Main } from '../styled';
import { useHistory } from 'react-router';
import { Cards } from '../../components/cards/frame/cards-frame';
import { ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';
import { getOneSchemeData } from '../../redux/schemes/actionCreator';
import { getOneCoursefilter } from '../../redux/course/actionCreator';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
// import { Switch } from 'react-router-dom/cjs/react-router-dom.min';

function ViewCourse() {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    const dispatch = useDispatch();
    const history = useHistory();

    const getOneCoursedata = useSelector(state => state.category.editFilterData);

    useEffect(() => {
        if (getOneCoursedata) {
            console.log("getOneCoursedata", getOneCoursedata)
        }
    }

        , [getOneCoursedata])
    useEffect(() => { console.log("id", id) }, [id])

    useEffect(() => {
        if (id) {
            console.log("id", id)
            dispatch(getOneCoursefilter(id));
        } else {
            history.push(`/admin/courses`)
        }
    }, [id])

    const onEdit = (id) => {
        history.push(`/admin/courses/addcourses?id=${id}`)
    }

    const onApproved = (key,isAp,id) => {
        // if (status !== 'active') {
        //   return;
        // }
        let data = {
          courseId: id,
          key: key,
          isApproved: !isAp,
        };
        ApiPost(`course/updateIsApproved?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, data).then(res => {
          toast.success(res.data.isApproved ? 'Approved successful' : 'Disapproved successful');
          dispatch(getOneCoursefilter(id));
        });
      };

    return (
        <>
            <PageHeader
                title="View SwayamCourse"
            />
            <Main>
                <Cards headless>
                    <Col md={24}>
                        <Row gutter={10}>
                            <Col lg={24} className="mb">
                                {/* <div className='label' style={{ fontWeight: 'bold', textAlign: "center" }}>
                                    <label >Thumbnail:</label>
                                </div> */}
                                <div className='thambail'>
                                    <img width="100%" height="245" src={getOneCoursedata?.data?.thumbnail}
                                    // {data?.thumbnail}
                                    /></div>
                            </Col>

                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Course Category:</label> {getOneCoursedata?.data?.courseCategory?.name}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Scheme Duration:</label> {getOneCoursedata?.data?.duration}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Job Category:</label> {getOneCoursedata?.data?.jobTypes && getOneCoursedata.data?.jobTypes.map((item, i) => (
                                    <span>{item.name}</span>
                                ))}</span>
                            </Col>

                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Course name:</label> {getOneCoursedata?.data?.name}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Senquence:</label> {getOneCoursedata?.data?.sequence}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Mode:</label> {getOneCoursedata?.data?.mode}</span><br />
                            </Col>

                            <Col lg={8} className="mb">
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Certification:</label> {getOneCoursedata?.data?.certificate === true ? "Yes" : "No"}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Course Details:</label> {getOneCoursedata?.data?.detail}</span><br />
                            </Col>
                        
                            <Col lg={8} className="mb">
                                <div onClick={() => onApproved(getOneCoursedata?.data?.key, getOneCoursedata?.data?.isApproved,getOneCoursedata.data?.id)}>
                                    <label style={{ fontWeight: 'bold' }} className="pr" >Approved:</label>
                                    <Switch checked={getOneCoursedata?.data?.isApproved}  ></Switch>
                                </div>
                            </Col>
                            <Button size="small" className='edit-view' style={{ float: 'left', bottom: '-5px' }} onClick={() => onEdit(getOneCoursedata?.data.id)} type="primary">
                                Edit
                            </Button>
                            <Button
                                className='edit-view'
                                size="medium"
                                style={{ marginLeft: '14px' }}
                                onClick={() => history.push(`/admin/courses`)}
                            >
                                Cancel
                            </Button>
                    </Row>

                    {/* <Row gutter={10}>
                            <Col lg={8} className="mb">
                                <span><label style={{ fontWeight: 'bold' }} className="pr">Type of job post:</label> {getOneJobPostData?.data?.jobType.name}</span><br />
                            </Col>
                          
                        

                        {/* <Button
                            className='edit-view'
                            // type="light"
                            size="medium"
                            style={{ marginLeft: '14px' }}
                            // onClick={() => {
                            //     history.push(`/admin/job/post`);
                            // }}
                            onClick={() => history.push(`/admin/job/post`)}
                        >
                            Cancel
                        </Button> */}
                </Col>
            </Cards>
        </Main>

        </>
    )
}

export default ViewCourse;