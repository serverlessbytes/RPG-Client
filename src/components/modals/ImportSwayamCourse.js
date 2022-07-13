import { Col, Form, Input, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import * as XLSX from 'xlsx';
import STORAGEKEY from '../../config/APP/app.config';
import AuthStorage from '../../helper/AuthStorage';
import { addSwayamCourseInBulk } from '../../redux/course/actionCreator';
import { getJobcategory } from '../../redux/jobs/actionCreator';

const ImportSwayamCourse = ({ importModal, handleCancel, modaltitle }) => {
  const { Option } = Select;

  const dispatch = useDispatch();

  const userData = AuthStorage.getStorageJsonData(STORAGEKEY.userData);

  const CourseCategoryFromRedux = useSelector(state => state.category.categoryData);
  const jobCategoryData = useSelector(state => state.job.jobCatogeryData);
  const language = localStorage.getItem('language');

  const [Error, setError] = useState();
  const [error, seterror] = useState(); // for valadation
  const [fileData, setFileData] = useState();

  const [courseCategoryArray, setCourseCategoryArray] = useState([]);
  const [jobCategoryArray, setJobCategoryArray] = useState([]);
  const [courseCategoryID, setCourseCategoryID] = useState('');
  const [jobCategoryID, setJobCategoryID] = useState();
  useEffect(() => {
    console.log("jobCategoryID", jobCategoryID);
  }, [jobCategoryID])


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

  useEffect(() => {
    if (jobCategoryData && 'data' in jobCategoryData) {
      jobCategoryData.data.forEach(element => {
        element['label'] = element.name;
        element['value'] = element.id;
      });
      setJobCategoryArray(jobCategoryData.data);
    }
  }, [jobCategoryData]);

  useEffect(() => {
    // dispatch(getCategoryData());
    dispatch(getJobcategory());
  }, []);

  const readUploadFile = e => {
    if (e?.target?.value.split('.').lastIndexOf('xlsx') === 1) {
      setError('');
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
      // toastError(true)
      setError('Please select valid file');
      // e.target.value = '';
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
    console.log("jobCategoryID", jobCategoryID);
    if (!jobCategoryID) {
      error.jobCategoryID = 'JobCategory is required';
      flage = true;
    }
    if (!fileData) {
      error.name = 'File is required';
      flage = true;
    }
    seterror(error);
    return flage;
  };

  const handleOk = () => {
    if (validation()) {
      return;
    }
    if (fileData) {
      fileData.forEach(e => {
        e['jobCategoryIds'] = [jobCategoryID];
      });
    }
    // if (fileData && courseCategoryID && jobCategoryID.length > 0) {
    //   dispatch(addSwayamCourseInBulk(fileData));
    //   handleCancel();
    // }
    if (fileData) {
      dispatch(addSwayamCourseInBulk(fileData));
      handleCancel();
    }
  };

  return (
    <>
      <Col md={24}>
        <Modal
          type="primery"
          title={modaltitle}
          visible={importModal}
          onOk={handleOk}
          onCancel={handleCancel}
          width={'600px'}
        >
          <Row gutter={30}>
            <Col md={24} xs={24} className="mb-25">
              <Form.Item name="name">
                <Input placeholder="File upload" name="name" type="file" onChange={readUploadFile} />
                {Error ? <span style={{ color: 'red' }}>{Error}</span> :
                  error && error.name && <span style={{ color: 'red' }}>{error.name}</span>}
              </Form.Item>
            </Col>
            <Col md={24} xs={24} className="mb-25"></Col>
            <Col md={24} xs={24} className="mb-25">
              <Form layout="vertical">
                {/* <Form.Item label="Course Category">
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
                </Form.Item> */}

                <Form.Item label="Job Category">
                  <Select
                    // mode="multiple"
                    options={jobCategoryArray}
                    size="large"
                    className="sDash_fullwidth-select "
                    name="jobCategoryID"
                    onChange={(e) => setJobCategoryID(e)}
                    // setJobCategoryID([...jobCategoryID, e]);
                    placeholder="Select job Category"
                  >
                    <Option value="">Select job category</Option>
                  </Select>
                  {error && error.jobCategoryID && <span style={{ color: 'red' }}>{error.jobCategoryID}</span>}
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Modal>
      </Col>
    </>
  );
};

export default ImportSwayamCourse;
