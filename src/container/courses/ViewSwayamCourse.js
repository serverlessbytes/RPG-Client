import React from 'react'
import { Col, Image, Modal, Row } from 'antd';

const ViewSwayamCourse = ({ viewModal, type, setViewModal, data }) => {

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
          title="Swayam Courses"
          visible={viewModal}
          onOk={handleOk}
          onCancel={handleCancel}
          width={'991px'}
        >
          <Row gutter={10}>
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
              <span><label className='' style={{ fontWeight: 'bold' }} >Course Category:</label> {data?.courseCategory?.name}</span><br />
            </Col>
            <Col lg={8}>
              <span><label className='' style={{ fontWeight: 'bold' }} >Scheme Duration:</label> {data?.duration}</span><br />
            </Col>
            <Col lg={8}>
              <span> <label className='' style={{ fontWeight: 'bold' }} >Job Category:</label> {data?.jobTypes && data?.jobTypes.map((item, i) => (
                <span>{item.name}</span>
              ))}</span>
            </Col>

            <Col lg={8}>
              <span><label className='' style={{ fontWeight: 'bold' }} >Course name:</label> {data?.name}</span><br />
            </Col>
            <Col lg={8}>
              <span><label className='' style={{ fontWeight: 'bold' }} >Senquence:</label> {data?.sequence}</span><br />
            </Col>
            <Col lg={8}>
              <span> <label className='' style={{ fontWeight: 'bold' }} >Mode:</label> {data?.mode}</span><br />
            </Col>

            <Col lg={8}>
              <span> <label className='' style={{ fontWeight: 'bold' }} >Certification:</label> {data?.certificate === true ? "Yes" : "No"}</span><br />
            </Col>
            <Col lg={8}>
              <span><label style={{ fontWeight: 'bold' }} >Course Details:</label> {data?.detail}</span><br />
            </Col>

          </Row>
          {/* <h4>Name of the Course:{data?.name}</h4><br/> */}
          {/* <span>Course name:{data?.name}</span><br /> */}
          {/* <span>Thumbnail:</span> */}
          {/* <div className='thambail'>
            <span>thambail</span>
            <img width={200} src={data?.thumbnail} />
          </div> */}
          {/* <br />
          <div>
            <span>Course Category:{data?.courseCategory?.name}</span><br />
            <span>Course Duration:{data?.duration}</span><br />
            <span>Job Category:{data?.jobTypes && data?.jobTypes.map((item, i) => (
              <span>{item.name}</span>
            ))}</span><br />

          </div> */}
          {/* <span>Senquence:{data?.sequence}</span><br /> */}

          {/* <span>Mode:{data?.mode}</span><br /> */}
          {/* <span>Course Details:{data?.detail}</span><br /> */}
          {/* <span>Certification:{data?.certificate === true ? "Yes" : "No"}</span><br /> */}


        </Modal>
      </Col>
    </>
  )
}

export default ViewSwayamCourse