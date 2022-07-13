import { Col, Form, Input, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import { addPartnerCourseInBulk } from '../../redux/course/actionCreator';

const ImportPartnerCourse = ({ importModal, handleCancel, modaltitle }) => {

  const dispatch = useDispatch();

  const CourseCategoryFromRedux = useSelector(state => state.category.categoryData);

  const [Error, setError] = useState();
  const [error, seterror] = useState();
  const [FileData, setFileData] = useState();

  const [courseCategoryArray, setCourseCategoryArray] = useState([]);

  //  CATEGORY
  useEffect(() => {
    if (CourseCategoryFromRedux && 'data' in CourseCategoryFromRedux) {
      CourseCategoryFromRedux.data.forEach(element => {
        element['label'] = element.name;
        element['value'] = element.id;
      });
      setCourseCategoryArray(CourseCategoryFromRedux.data);
    }
  }, [CourseCategoryFromRedux]);

  const readUploadFile = (e) => {
    if (e?.target?.value.split('.').lastIndexOf('xlsx') === 1) {
      setError('');
      seterror('')
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = event => {
        const binaryData = event.target.result;
        const workBook = XLSX.read(binaryData, { type: 'binary' });
        workBook.SheetNames.forEach(sheet => {
          const data = XLSX.utils.sheet_to_csv(workBook.Sheets[sheet]);
          setFileData(convertToJson(data));
        });
      };
    } else {
      setError('Please select valid file');
    }
  };

  const convertToJson = csv => {
    var lines = csv.split('\n');
    var result = [];
    var headers = lines[0].split(',');

    for (var i = 1; i < lines.length - 1; i++) {
      var obj = {};
      var currentline = lines[i].split(',');
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);
    }
    return result;
  };

  const validation = () => {
    let error = {};
    let flage = false;
    // if (courseCategoryID === '') {
    //   error.courseCategoryID = 'CourseCategory is required';
    //   flage = true;
    // }
    if (!FileData) {
      error.fileData = 'File is required';
      flage = true;
    }
    seterror(error);
    return flage;
  };

  const handleOk = () => {
    if (validation()) {
      return;
    }
    // if (FileData) {
    // FileData.forEach(e => {
    // e['language'] = language;
    // e['createdByUser'] = userData.id;
    // e['modifiedByUser'] = userData.id;
    // e['categoryId'] = courseCategoryID;
    // e['key'] = uuid();
    // });
    // }
    if (FileData) {
      dispatch(addPartnerCourseInBulk(FileData));
      handleCancel();
    }
    // if (FileData && courseCategoryID) {
    //   dispatch(addPartnerCourseInBulk(FileData));
    //   handleCancel();
    // }
  };

  return (
    <>
      <Col md={16}>
        <Modal
          type="primery"
          title={modaltitle}
          visible={importModal}
          onOk={handleOk}
          onCancel={handleCancel}
          width={'991px'}
        >
          <Row gutter={30}>
            <Col md={12} xs={24} className="mb-25">
              <Form.Item name="name">
                <Input placeholder="File upload" name="name" accept="*" type="file" onChange={(e) => readUploadFile(e)} />
                {Error ? <span style={{ color: 'red' }}>{Error}</span> :
                  error && error.fileData && <span style={{ color: 'red' }}>{error.fileData}</span>}
              </Form.Item>
            </Col>
            <Col md={12} xs={24} className="mb-25"></Col>
            {/* <Col md={12} xs={24} className="mb-25">
              <Form layout="vertical">
                <Form.Item label="Course Category">
                  <Select
                    options={courseCategoryArray}
                    size="large"
                    className="sDash_fullwidth-select "
                    name="courseCategoryID"
                    onChange={e => {
                      setCourseCategoryID(e);
                    }}
                    placeholder="Select Course Category"
                  >
                    <Option value="">Select course category</Option>
                  </Select>
                  {error && error.courseCategoryID && <span style={{ color: 'red' }}>{error.courseCategoryID}</span>}
                </Form.Item>
              </Form>
            </Col> */}
          </Row>
        </Modal>
      </Col>
    </>
  );
};

export default ImportPartnerCourse;
