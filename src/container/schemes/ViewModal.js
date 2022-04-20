import { Col } from 'antd'
import React, { useState } from 'react'
import { Modal } from '../../components/modals/antd-modals'

const ViewModal = ({viewModal,type,setViewModal,data}) => {

    const handleOk = () => {
        setViewModal(false)
    };

    const handleCancel = () => {
        setViewModal(false)
    };

    return (
        <>
            <Col md={16}>
                <Modal
                    type={type}
                    title="View Data"
                    visible={viewModal}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={"768px"}
                >
                    <span>Scheme Name:{data?.name}</span><br/>
                    <span>Scheme Category:{data?.schemeCategory?.name}</span><br/>
                    <span>Type of Benefits:{data?.schemeBenifit?.name}</span><br/>
                    <span>Senquence:{data?.sequence}</span><br/>
                    <span>Benefit 1-Line:{data?.benifitLine}</span><br/>
                    <span>Target Beneficiary:{data?.benificiary}</span><br/>
                    <span>Scheme Summary:{data?.detail}</span><br/>
                    <span>Documentation:{data?.documentation}</span><br/>
                    <span>Location:{data?.locations && data?.locations.map((item,i)=>(item.name)).join(',') }</span><br/>
                    <span>Website:{data?.website}</span><br/>
                    <span>Type:{data?.type}</span><br/>
                    <span>Grievance Redress:{data?.grievanceRedress}</span><br/>
                    <span>E Link:{data?.elink}</span><br/>
                    <span>SPOC:{data?.spoc}</span><br/>
                    <span>VideoUrl:</span>
                    <iframe width="420" height="345" src={data?.videoUrl}></iframe>
                    <br/>
                    <span>Thumbnail:</span>
                    <img width={200} src={data?.thumbnail}/>
                    <br/>
                    <span>Visible to User:{data?.isActive==true ? 'Yes':'No'}</span>
                </Modal>
            </Col>
        </>
    )
}

export default ViewModal