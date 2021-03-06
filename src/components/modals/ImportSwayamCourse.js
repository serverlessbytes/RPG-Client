import { Col, Form, Input, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import { addSwayamCourseInBulk } from '../../redux/course/actionCreator';
import { getJobcategory } from '../../redux/jobs/actionCreator';

const ImportSwayamCourse = ({ importModal, handleCancel, modaltitle }) => {
  const { Option } = Select;

  const dispatch = useDispatch();

  const CourseCategoryFromRedux = useSelector(state => state.category.categoryData);
  const jobCategoryData = useSelector(state => state.job.jobCatogeryData);

  const [Error, setError] = useState();
  const [error, seterror] = useState();
  const [fileData, setFileData] = useState();

  const [jobCategoryArray, setJobCategoryArray] = useState([]);
  const [jobCategoryID, setJobCategoryID] = useState();

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
    dispatch(getJobcategory());
  }, []);

  const readUploadFile = (e) => {
    if (e?.target?.value.split('.').lastIndexOf('xlsx') === 1) {
      setError('');
      seterror({ ...error, fileData: '' })
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
      e.target.value = '';
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
    if (!jobCategoryID) {
      error.jobCategoryID = 'JobCategory is required';
      flage = true;
    }
    if (!fileData) {
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
    if (fileData) {
      fileData.forEach(e => {
        e['jobCategoryIds'] = [jobCategoryID];
      });
    }
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
                  error && error.fileData && <span style={{ color: 'red' }}>{error.fileData}</span>}
              </Form.Item>
            </Col>
            <Col md={24} xs={24} className="mb-25"></Col>
            <Col md={24} xs={24} className="mb-25">
              <Form layout="vertical">

                <Form.Item label="Job Category">
                  <Select
                    options={jobCategoryArray}
                    size="large"
                    className="sDash_fullwidth-select "
                    name="jobCategoryID"
                    onChange={(e) => {
                      setJobCategoryID(e);
                      seterror({ ...error, jobCategoryID: '' })
                    }}
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
