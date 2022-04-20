import { Col, Modal } from 'antd';
import React from 'react';

const ViewPartnerCourse = ({ viewModal, type, setViewModal,data }) => {
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
            <span>Name:{data?.name}</span><br/>
            <span>Time:{data?.duration}</span><br/>
            <span>CategoryId:{data?.courseCategory?.name}</span><br/>
            <span>Organization:{data?.organization}</span><br/>
            <span>Detail:{data?.detail}</span><br/>
            <span>Certification Body:{data?.certificationBody}</span><br/>
            <span>Eligibility:{data?.eligibility}</span><br/>
            <span>Component:{data?.component}</span><br/>
            <span>Contact Person Name:{data?.contactPersonName}</span><br/>
            <span>Contact Person Email:{data?.contactPersonEmail}</span><br/>
            <span>Contact Person Phone:{data?.contactPersonPhone}</span><br/>
            <span>State:{data?.state}</span><br/>
            <span>District:{data?.district}</span><br/>
            <span>Pincode:{data?.pincode}</span><br/>
            <span>Location:{data?.location}</span><br/>
            <span>Sequence:{data?.sequence}</span><br/>
            <span>Thumbnail:</span>
            <img width={200} src={data?.thumbnail}/><br/>
            <span>Certification:{data?.certificate===true?'Yes':'No'}</span><br/>
        </Modal>
      </Col>
    </>
  );
};

export default ViewPartnerCourse;
