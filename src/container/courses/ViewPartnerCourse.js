import { Col, Modal, Row } from 'antd';
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
          title="Partner Courses"
          visible={viewModal}
          onOk={handleOk}
          onCancel={handleCancel}
          width={'991px'}
        >  <Row gutter={10}>
        <Col lg={24}>
          <div className='label' style={{ fontWeight: 'bold', textAlign: "center" }}>
            {/* <label >Thumbnail:</label> */}
          </div>
          <div className='thambail'>
            <img width="100%" height="245" src={data?.thumbnail}
            // {data?.thumbnail}
            /></div>
        </Col>

        <Col lg={8}>
          <span><label className='' style={{ fontWeight: 'bold' }} >Name:</label> {data?.name}</span><br />
        </Col>
        <Col lg={8}>
          <span><label className='' style={{ fontWeight: 'bold' }} >Time:</label> {data?.duration}</span><br />
        </Col>
        <Col lg={8}>
          <span> <label className='' style={{ fontWeight: 'bold' }} >CategoryId:</label> {data?.courseCategory?.name} </span>
        </Col>

        <Col lg={8}>
          <span><label className='' style={{ fontWeight: 'bold' }} >Organization:</label> {data?.organization}</span><br />
        </Col>
        <Col lg={8}>
          <span><label className='' style={{ fontWeight: 'bold' }} >Detail:</label> {data?.detail}</span><br />
        </Col>
        <Col lg={8}>
          <span> <label className='' style={{ fontWeight: 'bold' }} >Certification Body:</label> {data?.certificationBody}</span><br />
        </Col>

        <Col lg={8}>
          <span> <label className='' style={{ fontWeight: 'bold' }} >Eligibility:</label> {data?.eligibility} </span><br />
        </Col>
        <Col lg={8}>
          <span><label style={{ fontWeight: 'bold' }} >Component:</label> {data?.component}</span><br />
        </Col>
        <Col lg={8}>
          <span><label style={{ fontWeight: 'bold' }} >Contact Person Name:</label> {data?.contactPersonName}</span><br />
        </Col>

        <Col lg={8}>
          <span><label style={{ fontWeight: 'bold' }} >Contact Person Email:</label> {data?.contactPersonEmail}</span><br />
        </Col>
        <Col lg={8}>
          <span><label style={{ fontWeight: 'bold' }} >Contact Person Phone:</label> {data?.contactPersonPhone}</span><br />
        </Col>
        <Col lg={8}>
          <span><label style={{ fontWeight: 'bold' }} >State:</label> {data?.state}</span><br />
        </Col>

        <Col lg={8}>
          <span><label style={{ fontWeight: 'bold' }} >District:</label> {data?.district}</span><br />
        </Col>
        <Col lg={8}>
          <span><label style={{ fontWeight: 'bold' }} >Pincode:</label> {data?.pincode}</span><br />
        </Col>
        <Col lg={8}>
          <span><label style={{ fontWeight: 'bold' }} >Location:</label> {data?.location}</span><br />
        </Col>

        <Col lg={8}>
          <span><label style={{ fontWeight: 'bold' }} >Sequence:</label> {data?.sequence}</span><br />
        </Col>
        <Col lg={8}>
          <span><label style={{ fontWeight: 'bold' }} >Certification:</label> {data?.certificate===true?'Yes':'No'}</span><br />
        </Col>

      </Row>
            {/* <span>Name:{data?.name}</span><br/>
            <span>Time:{data?.duration}</span><br/>
            <span>CategoryId:{data?.courseCategory?.name}</span><br/> */}
            {/* <span>Organization:{data?.organization}</span><br/>
            <span>Detail:{data?.detail}</span><br/>
            <span>Certification Body:{data?.certificationBody}</span><br/> */}
            {/* <span>Eligibility:{data?.eligibility}</span><br/>
            <span>Component:{data?.component}</span><br/>
            <span>Contact Person Name:{data?.contactPersonName}</span><br/>
            <span>Contact Person Email:{data?.contactPersonEmail}</span><br/>
            <span>Contact Person Phone:{data?.contactPersonPhone}</span><br/> */}
            {/* <span>State:{data?.state}</span><br/>
            <span>District:{data?.district}</span><br/>
            <span>Pincode:{data?.pincode}</span><br/>
            <span>Location:{data?.location}</span><br/>
            <span>Sequence:{data?.sequence}</span><br/> */}
            {/* <span>Thumbnail:</span>
            <img width={200} src={data?.thumbnail}/><br/> */}
            {/* <span>Certification:{data?.certificate===true?'Yes':'No'}</span><br/> */}
        </Modal>
      </Col>
    </>
  );
};

export default ViewPartnerCourse;
