import { Col, Row } from 'antd'
import React, { useState } from 'react'
import { Modal } from '../../components/modals/antd-modals'

const ViewModal = ({ viewModal, type, setViewModal, data }) => {

    const handleOk = () => {
        setViewModal(false)
    };

    const handleCancel = () => {
        setViewModal(false)
    };

    return (
        <>
            <Modal
                type={type}
                title="Govt Scheme"
                visible={viewModal}
                onOk={handleOk}
                onCancel={handleCancel}
                width={"991px"}
            >
                <Row gutter={10}>
                    <Col lg={12}>
                        {/* <label style={{fontWeight:'bold'}}>VideoUrl:</label> */}
                        <iframe width="100%" height="345" src={data?.videoUrl}></iframe>
                    </Col>
                    <Col lg={12}>
                        {/* <label style={{fontWeight:'bold'}}>Thumbnail:</label> */}
                        <img width="100%" height="345" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
                        // {data?.thumbnail}
                        />
                    </Col>
                    <Col lg={8}>
                        <span><label className='' style={{fontWeight:'bold'}} >Scheme Name:</label> {data?.name}</span><br />
                    </Col>
                    <Col lg={8}>
                        <span><label className='' style={{fontWeight:'bold'}} >Scheme Category:</label> {data?.schemeCategory?.name}</span><br />
                    </Col>
                    <Col lg={8}>
                        <span> <label className='' style={{fontWeight:'bold'}} >Type of Benefits:</label> {data?.schemeBenifit?.name}</span><br />
                    </Col>

                    <Col lg={8}>
                        <span><label className='' style={{fontWeight:'bold'}} >Website:</label> {data?.website}</span><br />
                    </Col>
                    <Col lg={8}>
                        <span> <label className='' style={{fontWeight:'bold'}} >Senquence:</label> {data?.sequence}</span><br />
                    </Col>
                    <Col lg={8}>
                        <span> <label className='' style={{fontWeight:'bold'}} >Type:</label> {data?.type}</span><br />
                    </Col>

                    <Col lg={8}>
                        <span><label className='' style={{fontWeight:'bold'}} >Grievance Redress:</label> {data?.grievanceRedress}</span><br />
                    </Col>
                    <Col lg={8}>
                        <span> <label className='' style={{fontWeight:'bold'}} >E Link:</label> {data?.elink}</span><br />
                    </Col>
                    <Col lg={8}>
                        <span> <label className='' style={{fontWeight:'bold'}} >SPOC:</label> {data?.spoc}</span><br />
                    </Col>

                    <Col lg={24}>
                        <span> <label className='' style={{fontWeight:'bold'}} >Senquence:</label> {data?.sequence}</span><br />
                    </Col>
                    <Col lg={24}>
                        <span> <label className='' style={{fontWeight:'bold'}} >Visible to User:</label> {data?.isActive == true ? 'Yes' : 'No'}</span><br />
                    </Col>

                    <Col lg={24}>
                        <span> <label className='' style={{fontWeight:'bold'}} >Benefit 1-Line:</label> {data?.benifitLine}</span><br />
                    </Col>
                    <Col lg={24}>
                        <span> <label className='' style={{fontWeight:'bold'}} >Target Beneficiary:</label> {data?.benificiary}</span><br />
                    </Col>
                    <Col lg={24}>
                        <span> <label className='' style={{fontWeight:'bold'}} >Documentation:</label> {data?.documentation}</span><br />
                    </Col>
                    <Col lg={24}>
                        <span> <label className='' style={{fontWeight:'bold'}} >Scheme Summary:</label> {data?.detail}</span><br />
                    </Col>
                    <Col lg={24}>
                        <span> <label className='' style={{fontWeight:'bold'}} >Location:</label> {data?.locations.map((item, i) => (item.name)).join(',')}</span><br />
                    </Col>


                    {/* <span>Senquence:{data?.sequence}</span><br /> */}
                    {/* <span>Benefit 1-Line:{data?.benifitLine}</span><br />
                    <span>Target Beneficiary:{data?.benificiary}</span><br /> */}
                    {/* <span>Scheme Summary:{data?.detail}</span><br /> */}
                    {/* <span>Documentation:{data?.documentation}</span><br />
                    <span>Location:{data?.locations && data?.locations.map((item, i) => (item.name)).join(',')}</span><br /> */}
                    {/* <span>{data?.website}</span><br /> */}
                    {/* <span>Type:{data?.type}</span><br /> */}
                    {/* <span>Grievance Redress:{data?.grievanceRedress}</span><br /> */}
                    {/* <span>E Link:{data?.elink}</span><br /> */}
                    {/* <span>SPOC:{data?.spoc}</span><br /> */}

                    {/* <br />

                    <br /> */}
                    {/* <span>Visible to User:{data?.isActive == true ? 'Yes' : 'No'}</span> */}
                </Row>


            </Modal>
        </>
    )
}

export default ViewModal