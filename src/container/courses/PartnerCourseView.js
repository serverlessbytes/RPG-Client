import { Button, Col, Form, Input, Modal, PageHeader, Row, Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router'
import { Cards } from '../../components/cards/frame/cards-frame'
import { getOneCoursefilter } from '../../redux/course/actionCreator'
import { Main } from '../styled';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import { ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';
import FeatherIcon from 'feather-icons-react';

function PartnerCourseView() {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    const history = useHistory();
    const dispatch = useDispatch();
    const { path } = useRouteMatch();
    const [form] = Form.useForm()

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [remark, setRemark] = useState('')
    const [error, setError] = useState({});

    const getPartnerCourseData = useSelector(state => state.category.editFilterData)

    useEffect(() => {
        if (id) {
            dispatch(getOneCoursefilter(id));
        }
        else {
            history.push(`/admin/courses/partnercourses`)
        }
    }, [id])

    const onEdit = (id) => {
        // history.push(`${path}/addpartnercourses?id=${id}`);
        history.push(`/admin/courses/partnercourses/addpartnercourses?id=${id}`);
    }

    const onChangeHandler = (e) => {
        setRemark(e.target.value)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleOk = (key, isAp, id) => {
        if (validation()) {
            return;
        }
        form.resetFields();
        if (getPartnerCourseData?.data?.isApproved) {
            let data = {
                courseId: id,
                key: key,
                isApproved: !isAp,
                remark: remark,
            }
            ApiPost(`course/updateIsApproved?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, data).then(res => {
                toast.success(res.data.isApproved ? 'Approved successful' : 'Disapproved successful');
                dispatch(getOneCoursefilter(id));
            });
        }
        setRemark('')
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
                title="View partnerCourse"
            />
            <Main>
                <Cards headless>
                    <Col md={24}>
                        <Button
                            // className="btn-icon"
                            onClick={() => history.push(`/admin/courses/partnercourses`)}
                            type="info"
                            to="#"
                            shape="arrow-left"
                            style={{ marginBottom: "20px" }}
                        >
                            <FeatherIcon icon="arrow-left" size={24} />
                        </Button>
                        {
                            getPartnerCourseData?.data?.isApproved === false ?
                                <Button size="small" className='edit-view' style={{ float: 'right', bottom: '-5px' }} onClick={() => onApproved(getPartnerCourseData?.data?.key, getPartnerCourseData?.data?.isApproved, getPartnerCourseData.data?.id)} type="light">
                                    Approved
                                </Button>
                                :
                                <Button size="small" className='edit-view' style={{ float: 'right', bottom: '-5px' }} onClick={() => setIsModalVisible(true)} type="primary">
                                    DisApproved
                                </Button>
                        }
                        <Row gutter={10}>
                            <Col lg={24}>
                                <div className='label' style={{ fontWeight: 'bold', textAlign: "center" }}>
                                    {/* <label >Thumbnail:</label> */}
                                </div>
                                <div className='thambail'>
                                    <img width="100%" height="245" src={getPartnerCourseData?.data?.thumbnail}
                                    // {data?.thumbnail}
                                    /></div>
                            </Col>

                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Name:</label> {getPartnerCourseData?.data?.name}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Time:</label> {getPartnerCourseData?.data?.duration}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >CategoryId:</label> {getPartnerCourseData?.data?.courseCategory?.name} </span>
                            </Col>

                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Organization:</label> {getPartnerCourseData?.data?.organization}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Detail:</label> {getPartnerCourseData?.data?.detail}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Certification Body:</label> {getPartnerCourseData?.data?.certificationBody}</span><br />
                            </Col>

                            <Col lg={8} className="mb">
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Eligibility:</label> {getPartnerCourseData?.data?.eligibility} </span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Component:</label> {getPartnerCourseData?.data?.component}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Contact Person Name:</label> {getPartnerCourseData?.data?.contactPersonName}</span><br />
                            </Col>

                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Contact Person Email:</label> {getPartnerCourseData?.data?.contactPersonEmail}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Contact Person Phone:</label> {getPartnerCourseData?.data?.contactPersonPhone}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >State:</label> {getPartnerCourseData?.data?.state}</span><br />
                            </Col>

                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >District:</label> {getPartnerCourseData?.data?.district}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Pincode:</label> {getPartnerCourseData?.data?.pincode}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Location:</label> {getPartnerCourseData?.data?.location}</span><br />
                            </Col>

                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Certification:</label> {getPartnerCourseData?.data?.certificate === true ? 'Yes' : 'No'}</span><br />
                            </Col>
                            {/* <Col lg={8} className="mb">
                                <div onClick={() => onApproved(getPartnerCourseData?.data?.key, getPartnerCourseData?.data?.isApproved, getPartnerCourseData.data?.id)}>
                                    <label style={{ fontWeight: 'bold' }} className="pr" >Approved:</label>
                                    <Switch checked={getPartnerCourseData?.data?.isApproved}></Switch>
                                </div>
                            </Col> */}


                        </Row>
                        {/* <Button
                            className='edit-view'
                            size="medium"
                            style={{ marginLeft: '14px' }}
                            onClick={() => history.push(`/admin/courses/partnercourses`)}
                        >
                            Cancel
                        </Button> */}
                        <Button size="small" className='edit-view' style={{ float: 'left', bottom: '-5px' }} onClick={() => onEdit(getPartnerCourseData?.data.id)} type="primary">
                            Edit
                        </Button>
                        <Modal title="Remark" visible={isModalVisible} onOk={() => handleOk(getPartnerCourseData?.data?.key, getPartnerCourseData?.data?.isApproved, getPartnerCourseData.data?.id)} onCancel={() => handleCancel()} okText="Add">
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

export default PartnerCourseView