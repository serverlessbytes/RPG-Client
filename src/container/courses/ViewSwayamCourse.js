import React from 'react'
import { Col, Image, Modal } from 'antd';

const ViewSwayamCourse = ({viewModal,type,setViewModal,data}) => {

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
          {/* <h4>Name of the Course:{data?.name}</h4><br/> */}
          <h3>{data?.name}</h3>
          {/* <span>Thumbnail:</span> */}
          <div className='thambail'>
          <img width={200} src={data?.thumbnail}/>
          </div>
          <br/>
          <div>
          <span>Course Category:{data?.courseCategory?.name}</span><br/>
          <span>Course Duration:{data?.duration}</span><br/>
          <span>Job Category:{data?.jobTypes && data?.jobTypes.map((item,i)=>(
              <span>{item.name}</span>
          ))}</span><br/>

          </div>
          <span>Senquence:{data?.sequence}</span><br/>
          
          <span>Mode:{data?.mode}</span><br/>
          <span>Course Details:{data?.detail}</span><br/>
          <span>Certification:{data?.certificate===true?"Yes":"No"}</span><br/>
          
          
      </Modal>
    </Col>
  </>
  )
}

export default ViewSwayamCourse