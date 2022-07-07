import { Button, Col, Form, Input, Modal, PageHeader, Row, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
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
import FeatherIcon from 'feather-icons-react';

function ViewCourse() {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    const dispatch = useDispatch();
    const history = useHistory();
    const [form] = Form.useForm()

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [remark, setRemark] = useState('');
    const [error, setError] = useState({});

    const getOneCoursedata = useSelector(state => state.category.editFilterData); //fetch single data from redux

    useEffect(() => {
        if (id) {
            dispatch(getOneCoursefilter(id));
        } else {
            history.push(`/admin/courses`)
        }
    }, [id])


    const onEdit = (id) => {
        history.push(`/admin/courses/addcourses?id=${id}`)
    }
    const onChangeHandler = (e) => {
        setRemark(e.target.value)
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    const validation = () => {
        let error = {};
        let flage = false;
        if (remark === '') {
            error.remark = 'Remark is required';
            flage = true;
        }
        setError(error);
        return flage;
    }

    const handleOk = (key, isAp, id) => {
        if (validation()) {
            return;
        }
        form.resetFields();
        if (getOneCoursedata?.data?.data.isApproved) {
            let data = {
                courseId: id,
                key: key,
                isApproved: !isAp,
                remark: remark,
            };
            ApiPost(`course/updateIsApproved?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, data).then(res => {
                toast.success(res.data.isApproved ? 'Approved successful' : 'Disapproved successful');
                dispatch(getOneCoursefilter(id));
            });
        }
        setRemark('')
        setIsModalVisible(false);
    }

    const onApproved = (key, isAp, id) => {
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
                        <Button
                            // className="btn-icon"
                            onClick={() => history.push(`/admin/courses`)}
                            type="info"
                            to="#"
                            shape="arrow-left"
                            style={{ marginBottom: "20px" }}
                        >
                            <FeatherIcon icon="arrow-left" size={24} />
                        </Button>

                        {
                            getOneCoursedata?.data?.data.isApproved === false ?
                                <Button size="small" className='edit-view' style={{ float: 'right', bottom: '-5px' }} onClick={() => onApproved(getOneCoursedata?.data?.data?.key, getOneCoursedata?.data?.isApproved, getOneCoursedata.data?.data?.id)} type="light">
                                    Approved
                                </Button>
                                :
                                <Button size="small" className='edit-view' style={{ float: 'right', bottom: '-5px' }} onClick={() => setIsModalVisible(true)} type="primary">
                                    DisApproved
                                </Button>
                        }

                        <Row gutter={10}>
                            <Col lg={24} className="mb">
                                {/* <div className='label' style={{ fontWeight: 'bold', textAlign: "center" }}>
                                    <label >Thumbnail:</label>
                                </div> */}
                                <div className='thambail'>
                                    <img width="100%" height="245" src={getOneCoursedata?.data?.data?.thumbnail}
                                    // {data?.thumbnail}
                                    /></div>
                            </Col>

                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Course Category:</label> {getOneCoursedata?.data?.data?.courseCategory?.name}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Scheme Duration:</label> {getOneCoursedata?.data?.data?.duration}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Job Category:</label> {getOneCoursedata?.data?.data?.jobTypes && getOneCoursedata.data?.data?.jobTypes.map((item, i) => (
                                    <span>{item.name}</span>
                                ))}</span>
                            </Col>

                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Course name:</label> {getOneCoursedata?.data?.data?.name}</span><br />
                            </Col>
                            {/* <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Senquence:</label> {getOneCoursedata?.data?.data?.sequence}</span><br />
                            </Col> */}
                            <Col lg={8} className="mb">
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Mode:</label> {getOneCoursedata?.data?.data?.mode}</span><br />
                            </Col>

                            <Col lg={8} className="mb">
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Certification:</label> {getOneCoursedata?.data?.data?.certificate === true ? "Yes" : "No"}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Course Details:</label> {getOneCoursedata?.data?.data?.detail}</span><br />
                            </Col>

                            <Col lg={8} className="mb">
                                {/* <div onClick={() => onApproved(getOneCoursedata?.data?.key, getOneCoursedata?.data?.isApproved, getOneCoursedata.data?.id)}>
                                    <label style={{ fontWeight: 'bold' }} className="pr" >Approved:</label>
                                    <Switch checked={getOneCoursedata?.data?.isApproved}  ></Switch>
                                </div> */}
                            </Col>
                            {/* <Button
                                className='edit-view'
                                size="medium"
                                style={{ marginLeft: '14px' }}
                                onClick={() => history.push(`/admin/courses`)}
                            >
                                Cancel
                            </Button> */}
                        </Row>
                        <Button size="small" className='edit-view' style={{ float: 'left', bottom: '-5px' }} onClick={() => onEdit(getOneCoursedata?.data.data?.id)} type="primary">
                            Edit
                        </Button>
                        <Modal title="Remark" visible={isModalVisible} onOk={() => handleOk(getOneCoursedata?.data?.data?.key, getOneCoursedata?.data?.data.isApproved, getOneCoursedata.data?.data?.id)} onCancel={() => handleCancel()} okText="Add">
                            <Form form={form} layout="vertical">
                                <label htmlFor="remark">Remark</label>
                                <Form.Item name="remark">
                                    <Input
                                        placeholder="Enter Remark"
                                        name="remark"
                                        // defaultValue={remark}
                                        onChange={(e) => { onChangeHandler(e) }}
                                    />
                                    {error.remark && <span style={{ color: 'red' }}>{error.remark}</span>}
                                </Form.Item>
                            </Form>
                        </Modal>
                    </Col>
                </Cards>
            </Main>

        </>
    )
}

export default ViewCourse;