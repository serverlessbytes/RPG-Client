import { Col, Modal, Row } from 'antd';
import React from 'react'
import moment from 'moment';

const ViewJobPost = ({ viewModal, type, setViewModal, data }) => {
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
          title="Jobs Post"
          visible={viewModal}
          onOk={handleOk}
          onCancel={handleCancel}
          width={'991px'}
        >
          <Row gutter={10}>
            <Col lg={8}>
              <span><label style={{ fontWeight: 'bold' }} >Type of job post:</label> {data?.jobType?.name}</span><br />
            </Col>
            <Col lg={8}>
              <span><label style={{ fontWeight: 'bold' }} >Monthly Salary Offered:</label> {data?.salary}</span><br />
            </Col>
            <Col lg={8}>
              <span><label style={{ fontWeight: 'bold' }} >Job Role:</label> {data?.jobRole?.name}</span><br />
            </Col>

            <Col lg={8}>
              <span><label style={{ fontWeight: 'bold' }} >Benefits:</label> {data?.benifits}</span><br />
            </Col>
            <Col lg={8}>
              <span><label style={{ fontWeight: 'bold' }} >Name of the Employer:</label> {data?.name?.name}</span><br />
            </Col>
            <Col lg={8}>
              <span><label style={{ fontWeight: 'bold' }} >Vacancies:</label> {data?.vacancies}</span><br />
            </Col>

            <Col lg={8}>
              <span><label style={{ fontWeight: 'bold' }} >State:</label> {data?.state?.name}</span><br />
            </Col>
            <Col lg={8}>
              <span><label style={{ fontWeight: 'bold' }} >Type of Job:</label> {data?.type}</span><br />
            </Col>
            <Col lg={8}>
              <span><label style={{ fontWeight: 'bold' }} >District:</label> {data?.district?.name}</span><br />
            </Col>

            <Col lg={8}>
              <span><label style={{ fontWeight: 'bold' }} >Phone:</label> {data?.phone}</span><br />
            </Col>
            <Col lg={8}>
              <span><label style={{ fontWeight: 'bold' }} >Town / Village:</label> {data?.town}</span><br />
            </Col>
            <Col lg={8}>
              <span><label style={{ fontWeight: 'bold' }} >Email:</label> {data?.email}</span><br />
            </Col>

            <Col lg={8}>
              <span><label style={{ fontWeight: 'bold' }} >Pincode:</label> {data?.pincode}</span><br />
            </Col>
            <Col lg={8}>
              <span><label style={{ fontWeight: 'bold' }} >Description:</label> {data?.description}</span><br />
            </Col>
            <Col lg={8}>
              <span><label style={{ fontWeight: 'bold' }} >Shift:</label> {data?.shifts?.join(",")}</span><br />
            </Col>
            <Col lg={8}>
              <span><label style={{ fontWeight: 'bold' }} >Requried Experience:</label> {data?.reqExperience}</span><br />
            </Col>
            <Col lg={8}>
              <span><label style={{ fontWeight: 'bold' }} >Start Date:</label> {moment(data?.startDate).format('YYYY-MM-DD')}</span><br />
            </Col>
            <Col lg={8}>
              <span><label style={{ fontWeight: 'bold' }} >End Date:</label> {moment(data?.endDate).format('YYYY-MM-DD')}</span><br />
            </Col>

            <Col lg={8}>
              <span><label style={{ fontWeight: 'bold' }} >Requirements:</label> {data?.requirements}</span><br />
            </Col>
            <Col lg={8}>
              <span><label style={{ fontWeight: 'bold' }} >Type Of Field:</label> {data?.extraType}</span><br />
            </Col>

            
          </Row>
          {/* <span>Type of job post:{data?.jobType?.name}</span><br /> */}
          {/* <span>Monthly Salary Offered:{data?.salary}</span><br /> */}
          {/* <span>Job Role:{data?.jobRole?.name}</span><br /> */}
          {/* <span>Benefits:{data?.benifits}</span><br /> */}
          {/* <span>Name of the Employer:{data?.name}</span><br /> */}
          {/* <span>Vacancies:{data?.vacancies}</span><br /> */}
          {/* <span>State:{data?.state}</span><br />
          <span>Type of Job:{data?.type}</span><br />
          <span>District:{data?.district}</span><br /> */}
          {/* <span>Phone:{data?.phone}</span><br />
          <span>Town / Village:{data?.town}</span><br />
          <span>Email:{data?.email}</span><br /> */}
          {/* <span>Pincode:{data?.pincode}</span><br />
          <span>Description:{data?.description}</span><br />
          <span>Shift:{data?.shifts.join(",")}</span><br /> */}
          {/* <span>Requried Experience:{data?.reqExperience}</span><br /> */}
          {/* <span>Start Date:{moment(data?.startDate).format('YYYY-MM-DD')}</span><br /> */}
          {/* <span>Requirements:{data?.requirements}</span><br /> */}
          {/* <span>End Date:{moment(data?.endDate).format('YYYY-MM-DD')}</span><br /> */}
          {/* <span>Type Of Field:{data?.extraType}</span><br /> */}
        </Modal>
      </Col>
    </>
  )
}

export default ViewJobPost