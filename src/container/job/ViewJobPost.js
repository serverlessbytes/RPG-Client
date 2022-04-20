import { Col, Modal } from 'antd';
import React from 'react'
import moment from 'moment';

const ViewJobPost = ({ viewModal, type, setViewModal,data}) => {
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
          <span>Type of job post:{data?.jobType?.name}</span><br/>
          <span>Monthly Salary Offered:{data?.salary}</span><br/>
          <span>Job Role:{data?.jobRole?.name}</span><br/>
          <span>Benefits:{data?.benifits}</span><br/>
          <span>Name of the Employer:{data?.name}</span><br/>
          <span>Vacancies:{data?.vacancies}</span><br/>
          <span>State:{data?.state}</span><br/>
          <span>Type of Job:{data?.type}</span><br/>
          <span>District:{data?.district}</span><br/>
          <span>Phone:{data?.phone}</span><br/>
          <span>Town / Village:{data?.town}</span><br/>
          <span>Email:{data?.email}</span><br/>
          <span>Pincode:{data?.pincode}</span><br/>
          <span>Description:{data?.description}</span><br/>
          <span>Shift:{data?.shifts.join(",")}</span><br/>
          <span>Requried Experience:{data?.reqExperience}</span><br/>
          <span>Start Date:{moment(data?.startDate).format('YYYY-MM-DD') }</span><br/>
          <span>Requirements:{data?.requirements}</span><br/>
          <span>End Date:{moment(data?.endDate).format('YYYY-MM-DD')}</span><br/>
          <span>Type Of Field:{data?.extraType}</span><br/>
        </Modal>
      </Col>
    </>
  )
}

export default ViewJobPost