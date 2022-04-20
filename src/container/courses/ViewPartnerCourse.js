import { Col, Modal } from 'antd';
import React from 'react';

const ViewPartnerCourse = ({ viewModal, type, setViewModal }) => {
  const handleOk = () => {
    setViewModal(false);
  };

  const handleCancel = () => {
    setViewModal(false);
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
          width={'768px'}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Col>
    </>
  );
};

export default ViewPartnerCourse;
