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
// import { Switch } from 'react-router-dom/cjs/react-router-dom.min';

function ViewScheme() {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('key');
    const dispatch = useDispatch();
    const history = useHistory();

    const getOneSchemedata = useSelector(state => state.scheme.getOneSchemeData);

    useEffect(() => { console.log("getOneSchemedata", getOneSchemedata) }, [getOneSchemedata])
    useEffect(() => { console.log("id", id) }, [id])

    useEffect(() => {
        if (id) {
            console.log("id", id)
            dispatch(getOneSchemeData(id));
        } else {
            history.push(`/admin/scheme`)
        }
    }, [id])

    const onEdit = (key) => {
        history.push(`/admin/scheme/addscheme?key=${key}`)
    }

    const onApproved = (key, isAp,id) => {
        // if (status !== 'active') {
        //   return;
        // }
        let data = {
            id: id,
            isApproved: !isAp,
        };
        ApiPost(`scheme/updateIsApproved?`, data)
            .then((res) => {
                console.log("res", res)
                toast.success(data.isApproved ? "Approved successful" : "Disapproved successful ")
                dispatch(getOneSchemeData(key));
            })
            .catch((err) => console.log("Error", err))
    };

    return (
        <>
            <PageHeader
                title="View Scheme"
            />
            <Main>
                <Cards headless>
                    <Col md={24}>
                        <Row gutter={10}>
                            <Col lg={12} className="mb">
                                {/* <label style={{fontWeight:'bold'}}>VideoUrl:</label> */}
                                <iframe width="100%" height="345" src={getOneSchemedata?.videoUrl}></iframe>
                            </Col>
                            <Col lg={12} className="mb">
                                {/* <label style={{fontWeight:'bold'}}>Thumbnail:</label> */}
                                <img width="100%" height="345" src={getOneSchemedata?.thumbnail}
                                // {data?.thumbnail}
                                />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Scheme Name:</label> {getOneSchemedata?.name}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Scheme Category:</label> {getOneSchemedata?.schemeCategory?.name}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Type of Benefits:</label> {getOneSchemedata?.schemeBenifit?.name}</span><br />
                            </Col>

                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Website:</label> {getOneSchemedata?.website}</span><br />
                            </Col>
                            {/* <Col lg={8} className="mb">
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Senquence:</label> {getOneSchemedata?.sequence}</span><br />
                            </Col> */}
                            <Col lg={8} className="mb">
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Type:</label> {getOneSchemedata?.type}</span><br />
                            </Col>

                            <Col lg={8} className="mb">
                                <span><label className='pr' style={{ fontWeight: 'bold' }} >Grievance Redress:</label> {getOneSchemedata?.grievanceRedress}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >E Link:</label> {getOneSchemedata?.elink}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >SPOC:</label> {getOneSchemedata?.spoc}</span><br />
                            </Col>

                            <Col lg={8} className="mb">
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Visible to User:</label> {getOneSchemedata?.isActive == true ? 'Yes' : 'No'}</span><br />
                            </Col>

                            <Col lg={8} className="mb">
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Benefit 1-Line:</label> {getOneSchemedata?.benifitLine}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Target Beneficiary:</label> {getOneSchemedata?.benificiary}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Documentation:</label> {getOneSchemedata?.documentation}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Scheme Summary:</label> {getOneSchemedata?.detail}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <span> <label className='pr' style={{ fontWeight: 'bold' }} >Location:</label> {getOneSchemedata?.locations.map((item, i) => (item.name)).join(',')}</span><br />
                            </Col>
                            <Col lg={8} className="mb">
                                <div onClick={() => onApproved(getOneSchemedata?.key, getOneSchemedata?.isApproved,getOneSchemedata?.id)}>
                                    <label style={{ fontWeight: 'bold' }} className="pr" >Approved:</label>
                                    <Switch checked={getOneSchemedata?.isApproved} ></Switch>
                                </div>
                            </Col>
                            <Button size="small" className='edit-view' style={{ float: 'left', bottom: '-5px' }} onClick={() => onEdit(getOneSchemedata?.key)} type="primary">
                                Edit
                            </Button>
                            <Button
                                className='edit-view'
                                // type="light"
                                size="medium"
                                style={{ marginLeft: '14px' }}
                                // onClick={() => {
                                //     history.push(`/admin/job/post`);
                                // }}
                                onClick={() => history.push(`/admin/scheme`)}
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

export default ViewScheme;