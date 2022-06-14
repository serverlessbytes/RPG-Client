import { Button, Col, Form, Input, PageHeader, Row, Modal, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getoneJobPost } from '../../redux/jobs/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { Main } from '../styled';
import { useHistory } from 'react-router';
import { Cards } from '../../components/cards/frame/cards-frame';
import { ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';
import FeatherIcon from 'feather-icons-react';

function JobPostPage({ data }) {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    const dispatch = useDispatch();
    const history = useHistory();
    const [form] = Form.useForm()

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [remark, setRemark] = useState('')
    const [error, setError] = useState({});

    const getOneJobPostData = useSelector(state => state.job.getOneJobPostData);

    useEffect(() => {
        if (id) {
            dispatch(getoneJobPost(id));
        } else {
            history.push(`/admin/job/post`)
        }
    }, [id])

    const onChangeHandler = (e) => {
        setRemark(e.target.value)
    }

    const onEdit = (id) => {
        history.push(`/admin/job/new?id=${id}`)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
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

    const handleOk = (id, isAp) => {
        form.resetFields()
        if (validation()) {
            return;
        }
        if (getOneJobPostData?.data?.isApproved) {
            let data = {
                isApproved: !isAp,
                remark : remark,
            };
            ApiPost(`job/updateIsApproved?jobId=${id}`, data)
                .then(res => {
                    // console.log('res', res);
                    dispatch(getoneJobPost(id));
                    toast.success(res.data.isApproved ? 'Approved successful' : 'Disapproved successful ');
                })
                .catch(err => console.log('Error', err));
        }
        setRemark('')
        setIsModalVisible(false)
    }

    const onApproved = (id, isAp) => {
        // if (status !== 'active') {
        //   return;
        // }
        let data = {
            isApproved: !isAp,
        };
        ApiPost(`job/updateIsApproved?jobId=${id}`, data)
            .then(res => {
                // console.log('res', res);
                dispatch(getoneJobPost(id));
                toast.success(res.data.isApproved ? 'Approved successful' : 'Disapproved successful ');
            })
            .catch(err);
    };

    return (
        <>
            <PageHeader
                title="View JobPost"
            />
            <Main>
                <Cards headless>
                    <Col md={24}>
                        <Button
                            // className="btn-icon"
                            onClick={() => history.push(`/admin/job/post`)}
                            type="info"
                            to="#"
                            shape="arrow-left"
                            style={{ marginBottom: "20px" }}
                        >
                            <FeatherIcon icon="arrow-left" size={24} />
                        </Button>
                        {
                            getOneJobPostData?.data?.isApproved === false ?
                                <Button size="small" className='edit-view' style={{ float: 'right', bottom: '-5px' }} onClick={() => onApproved(getOneJobPostData?.data?.id, getOneJobPostData?.data?.isApproved)} type="light">
                                    Approved
                                </Button>
                                :
                                <Button size="small" className='edit-view' style={{ float: 'right', bottom: '-5px' }} onClick={() => setIsModalVisible(true)} type="primary">
                                    DisApproved
                                </Button>
                        }

                        <Row gutter={10}>
                            <Col lg={8} className="mb">
                                <span><label style={{ fontWeight: 'bold' }} className="pr">Type of job post:</label> {getOneJobPostData?.data?.jobType?.name}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label style={{ fontWeight: 'bold' }} className="pr" >Monthly Salary Offered:</label> {getOneJobPostData?.data?.salary}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label style={{ fontWeight: 'bold' }} className="pr" >Job Role:</label> {getOneJobPostData?.data?.jobRole?.name}</span><br />
                            </Col>

                            <Col lg={8} className="mb">
                                <span><label style={{ fontWeight: 'bold' }} className="pr" >Benefits:</label> {getOneJobPostData?.data?.benifits}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label style={{ fontWeight: 'bold' }} className="pr" >Name of the Employer:</label> {getOneJobPostData?.data?.name?.name}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label style={{ fontWeight: 'bold' }} className="pr" >Vacancies:</label> {getOneJobPostData?.data?.vacancies}</span><br />
                            </Col>

                            <Col lg={8} className="mb">
                                <span><label style={{ fontWeight: 'bold' }} className="pr" >State:</label> {getOneJobPostData?.data?.state?.name}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label style={{ fontWeight: 'bold' }} className="pr" >Type of Job:</label> {getOneJobPostData?.data?.type}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label style={{ fontWeight: 'bold' }} className="pr" >District:</label> {getOneJobPostData?.data?.district?.name}</span><br />
                            </Col>

                            <Col lg={8} className="mb">
                                <span><label style={{ fontWeight: 'bold' }} className="pr" >Phone:</label> {getOneJobPostData?.data?.phone}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label style={{ fontWeight: 'bold' }} className="pr" >Town / Village:</label> {getOneJobPostData?.data?.town}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label style={{ fontWeight: 'bold' }} className="pr" >Email:</label> {getOneJobPostData?.data?.email}</span><br />
                            </Col>

                            <Col lg={8} className="mb">
                                <span><label style={{ fontWeight: 'bold' }} className="pr" >Pincode:</label> {getOneJobPostData?.data?.pincode}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label style={{ fontWeight: 'bold' }} className="pr" >Description:</label> {getOneJobPostData?.data?.description}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label style={{ fontWeight: 'bold' }} className="pr" >Shift:</label> {getOneJobPostData?.data?.shifts}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label style={{ fontWeight: 'bold' }} className="pr" >Requried Experience:</label> {getOneJobPostData?.data?.reqExperience}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label style={{ fontWeight: 'bold' }} className="pr" >Start Date:</label> {moment(getOneJobPostData?.data?.startDate).format('YYYY-MM-DD')}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label style={{ fontWeight: 'bold' }} className="pr" >End Date:</label> {moment(getOneJobPostData?.data?.endDate).format('YYYY-MM-DD')}</span><br />
                            </Col>

                            <Col lg={8} className="mb">
                                <span><label style={{ fontWeight: 'bold' }} className="pr" >Requirements:</label> {getOneJobPostData?.data?.requirements}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label style={{ fontWeight: 'bold' }} className="pr" >Type Of Field:</label> {getOneJobPostData?.data?.extraType}</span><br />
                            </Col>

                            {/* <Col lg={8} className="mb">
                                <div onClick={() => onApproved(getOneJobPostData?.data?.id, getOneJobPostData?.data?.isApproved)}>
                                    <label style={{ fontWeight: 'bold' }} className="pr" >Approved:</label>
                                    <Switch checked={getOneJobPostData?.data?.isApproved} ></Switch>
                                </div>
                            </Col> */}

                        </Row>
                        <Button size="small" className='edit-view' style={{ float: 'left', bottom: '-5px' }} onClick={() => onEdit(getOneJobPostData?.data?.id)} type="primary">
                            Edit
                        </Button>

                        <Modal title="Remark" visible={isModalVisible} onOk={() => handleOk(getOneJobPostData?.data?.id, getOneJobPostData?.data?.isApproved)} onCancel={() => handleCancel()} okText="Add">
                            <Form form={form} layout="vertical">
                                <label htmlFor="remark">Remark</label>
                                <Form.Item name="remark">
                                    <Input
                                        placeholder="Enter Remark"
                                        name="remark"
                                        defaultValue={remark}
                                        onChange={(e) => { onChangeHandler(e) }}
                                    />
                                    {error.remark && <span style={{ color: 'red' }}>{error.remark}</span>}
                                </Form.Item>
                            </Form>
                        </Modal>
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

export default JobPostPage