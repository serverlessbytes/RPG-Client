import { Button, Col, Form, Input, Modal, PageHeader, Row, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getoneJobPost } from '../../redux/jobs/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { Main } from '../styled';
import { useHistory } from 'react-router';
import { Cards } from '../../components/cards/frame/cards-frame';
import { ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';
import { getOneSchemeData } from '../../redux/schemes/actionCreator';
// import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import FeatherIcon from 'feather-icons-react';

function ViewScheme() {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('key');
    const dispatch = useDispatch();
    const history = useHistory();
    const [form] = Form.useForm()

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [remark, setRemark] = useState('');
    const [error, setError] = useState({});

    const getOneSchemedata = useSelector(state => state.scheme.getOneSchemeData);

    // useEffect(()=>{console.log("remark=====",remark)},[remark])

    useEffect(() => {
        if (id) {
            dispatch(getOneSchemeData(id));
        } else {
            history.push(`/admin/scheme`)
        }
    }, [id])

    const onEdit = (key) => {
        history.push(`/admin/scheme/addscheme?key=${key}`)
    }

    const onChangeHandler = (e) => {
        setRemark(e.target.value)
    }

    const onApproved = (key, isAp, id) => {
        // if (status !== 'active') {
        //   return;
        // }
        let data = {
            id: id,
            isApproved: !isAp,
        };
        ApiPost(`scheme/updateIsApproved?`, data)
            .then((res) => {
                toast.success(data.isApproved ? "Approved successful" : "Disapproved successful ")
                dispatch(getOneSchemeData(key));
            })
            .catch((err) => console.log("Error", err))
    };

    const handleOk = (key, isAp, id) => {
        form.resetFields()
        if (validation()) {
            return;
        }

        if (getOneSchemedata?.isApproved) {
            setIsModalVisible(true);
            let Data = {
                id: id,
                isApproved: !isAp,
                remark: remark,
            };
            ApiPost(`scheme/updateIsApproved?`, Data)
                .then((res) => {
                    toast.success(Data.isApproved ? "Approved successful" : "Disapproved successful ")
                    dispatch(getOneSchemeData(key));
                })
                .catch((err) => console.log("Error", err))
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

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    return (
        <>
            <PageHeader
                title="View Scheme"
            />
            <Main>
                <Cards headless>
                    <Col md={24}>
                        <Button
                            // className="btn-icon"
                            onClick={() => history.push(`/admin/scheme`)}
                            type="info"
                            to="#"
                            shape="arrow-left"
                            style={{ marginBottom: "20px" }}
                        >
                            <FeatherIcon icon="arrow-left" size={24} />
                        </Button>

                        {
                            getOneSchemedata?.isApproved === false ?
                                <Button size="small" className='edit-view' style={{ float: 'right', bottom: '-5px' }} onClick={() => onApproved(getOneSchemedata?.key, getOneSchemedata?.isApproved, getOneSchemedata?.id)} type="light">
                                    Approved
                                </Button>
                                :
                                <Button size="small" className='edit-view' style={{ float: 'right', bottom: '-5px' }} onClick={() => setIsModalVisible(true)} type="primary">
                                    DisApproved
                                </Button>
                        }

                        <Row gutter={10}>
                            <Col lg={12} className="mb" style={{overflow:"hidden", textOverflow:"ellipsis"}}>
                                {/* <label style={{fontWeight:'bold'}}>VideoUrl:</label> */}
                                {/* <iframe width="100%" height="345" src={getOneSchemedata?.videoUrl}></iframe> */}
                                <img width="100%" height="345" src={getOneSchemedata?.videoUrl} />
                            </Col>
                            <Col lg={12} className="mb" style={{overflow:"hidden", textOverflow:"ellipsis"}}>
                                {/* <label style={{fontWeight:'bold'}}>Thumbnail:</label> */}
                                <img width="100%" height="345" src={getOneSchemedata?.thumbnail}
                                // {data?.thumbnail}
                                />
                            </Col>
                            <Col lg={8} className="mb" style={{overflow:"hidden", textOverflow:"ellipsis"}}>
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Scheme Name:</label> {getOneSchemedata?.name}</span><br />
                            </Col>
                            <Col lg={8} className="mb" style={{overflow:"hidden", textOverflow:"ellipsis"}}>
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Scheme Category:</label> {getOneSchemedata?.schemeCategory?.name}</span><br />
                            </Col>
                            <Col lg={8} className="mb" style={{overflow:"hidden", textOverflow:"ellipsis"}}>
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Type of Benefits:</label> {getOneSchemedata?.schemeBenifit?.name}</span><br />
                            </Col>

                            <Col lg={8} className="mb" style={{overflow:"hidden", textOverflow:"ellipsis"}}>
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Website:</label> {getOneSchemedata?.website}</span><br />
                            </Col>
                            {/* <Col lg={8} className="mb">
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Senquence:</label> {getOneSchemedata?.sequence}</span><br />
                            </Col> */}
                            <Col lg={8} className="mb" style={{overflow:"hidden", textOverflow:"ellipsis"}}>
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Type:</label> {getOneSchemedata?.type}</span><br />
                            </Col>

                            <Col lg={8} className="mb" style={{overflow:"hidden", textOverflow:"ellipsis"}}>
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Grievance Redress:</label> {getOneSchemedata?.grievanceRedress}</span><br />
                            </Col>
                            <Col lg={8} className="mb" style={{overflow:"hidden", textOverflow:"ellipsis"}}>
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >E Link:</label> {getOneSchemedata?.elink}</span><br />
                            </Col>
                            <Col lg={8} className="mb" style={{overflow:"hidden", textOverflow:"ellipsis"}}>
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >SPOC:</label> {getOneSchemedata?.spoc}</span><br />
                            </Col>

                            <Col lg={8} className="mb" style={{overflow:"hidden", textOverflow:"ellipsis"}}>
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Visible to User:</label> {getOneSchemedata?.isActive == true ? 'Yes' : 'No'}</span><br />
                            </Col>

                            <Col lg={8} className="mb" style={{overflow:"hidden", textOverflow:"ellipsis"}}>
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Benefit 1-Line:</label> {getOneSchemedata?.benifitLine}</span><br />
                            </Col>
                            <Col lg={8} className="mb" style={{overflow:"hidden", textOverflow:"ellipsis"}}>
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Target Beneficiary:</label> {getOneSchemedata?.benificiary}</span><br />
                            </Col>
                            <Col lg={8} className="mb" style={{overflow:"hidden", textOverflow:"ellipsis"}}>
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Documentation:</label> {getOneSchemedata?.documentation}</span><br />
                            </Col>
                            <Col lg={8} className="mb" style={{overflow:"hidden", textOverflow:"ellipsis"}}>
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Scheme Summary:</label> {getOneSchemedata?.detail}</span><br />
                            </Col>
                            <Col lg={8} className="mb" style={{overflow:"hidden", textOverflow:"ellipsis"}}>
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Location:</label> {getOneSchemedata?.locations.map((item, i) => (item.name)).join(',')}</span><br />
                            </Col>
                            {/* <Col lg={8} className="mb">
                                <div onClick={() => onApproved(getOneSchemedata?.key, getOneSchemedata?.isApproved, getOneSchemedata?.id)}>
                                    <label style={{ fontWeight: 'bold' }} className="pr" >Approved:</label>
                                    <Switch checked={getOneSchemedata?.isApproved} ></Switch>
                                </div>
                            </Col> */}
                            {/* <Button
                                className='edit-view'
                                // type="light"
                                size="medium"
                                style={{ marginLeft: '14px' }}
                                onClick={() => history.push(`/admin/scheme`)}
                            >
                                Cancel
                            </Button> */}
                        </Row>
                        <Button size="small" className='edit-view' style={{ float: 'left', bottom: '-5px' }} onClick={() => onEdit(getOneSchemedata?.key)} type="primary">
                            Edit
                        </Button>

                        <Modal title="Remark" visible={isModalVisible} onOk={() => handleOk(getOneSchemedata?.key, getOneSchemedata?.isApproved, getOneSchemedata?.id)} onCancel={() => handleCancel()} okText="Add">
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

export default ViewScheme;