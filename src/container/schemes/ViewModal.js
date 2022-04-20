import { Col } from 'antd'
import React, { useState } from 'react'
import { Modal } from '../../components/modals/antd-modals'

const ViewModal = ({viewModal,type,setViewModal}) => {

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
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </Col>
        </>
    )
}

export default ViewModal