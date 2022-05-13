import { Col, Form, Input, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import * as XLSX from 'xlsx';
import STORAGEKEY from '../../config/APP/app.config';
import AuthStorage from '../../helper/AuthStorage';
import { addBulkJobs, getEmployerData, getJobcategory } from '../../redux/jobs/actionCreator';
import { getDistrictData } from '../../redux/district/actionCreator';

const ImportJobPost = ({ importModal, handleCancel, modaltitle }) => {
  const { Option } = Select;

  const dispatch = useDispatch();

  const userData = AuthStorage.getStorageJsonData(STORAGEKEY.userData);

  const JobCategory = useSelector(state => state.job.jobCatogeryData);
  const JobRole = useSelector(state => state.job.jobRoleData);
  const district = useSelector(state => state.district.getDistrictData);
  const stateData = useSelector(state => state.state.getStateData);
  const employer = useSelector(state => state.job.getEmployerData);

  const language = localStorage.getItem('language');

  const [Error, setError] = useState();
  const [FileData, setFileData] = useState();

  const [jobRoleArray, setJobRoleArray] = useState([]);
  const [jobCategoryArray, setJobCategoryArray] = useState([]);
  const [stateArray, setStateArray] = useState([]);
  const [districtArray, setDistrictArray] = useState([]);
  const [employerArray, setEmployerArray] = useState([]);

  const [jobCategoryID, setJobCategoryID] = useState('');
  const [jobRoleID, setJobRoleID] = useState('');
  const [stateID, setStateID] = useState('');
  const [districtID, setDistrictID] = useState('');
  const [employertID, setEmployerID] = useState('');

  useEffect(() => {
    dispatch(getJobcategory());
    dispatch(getEmployerData());
  }, []);

  useEffect(() => {
    if (stateID) dispatch(getDistrictData(stateID));
  }, [stateID]);

  //  CATEGORY
  useEffect(() => {
    console.log('JobCategory', JobCategory);
    if (JobCategory && 'data' in JobCategory) {
      JobCategory.data.forEach(element => {
        element['label'] = element.name;
        element['value'] = element.id;
      });
      setJobCategoryArray(JobCategory.data);
    }
  }, [JobCategory]);

  useEffect(() => {
    console.log('stateData', stateData);
    if (stateData && 'data' in stateData) {
      stateData.data.forEach(element => {
        element['label'] = element.name;
        element['value'] = element.id;
      });
      setStateArray(stateData.data);
    }
  }, [stateData]);

  useEffect(() => {
    console.log('district', district);
    if (district && 'data' in district) {
      district.data.forEach(element => {
        element['label'] = element.name;
        element['value'] = element.id;
      });
      setDistrictArray(district.data);
    }
  }, [district]);

  useEffect(() => {
    console.log('employer', employer);
    if (employer && 'data' in employer) {
      employer.data.data.forEach(element => {
        element['label'] = element.name;
        element['value'] = element.id;
      });
      setEmployerArray(employer.data.data);
    }
  }, [employer]);

  useEffect(() => {
    console.log('jobCategoryArray', jobCategoryArray);
  }, [jobCategoryArray]);

  useEffect(() => {
    console.log('JobRole', JobRole);
    if (JobRole) {
      JobRole.forEach(element => {
        element['label'] = element.name;
        element['value'] = element.id;
      });
      setJobRoleArray(JobRole);
    }
  }, [JobRole]);

  const readUploadFile = e => {
    if (e.target.files[0].name.split('.').lastIndexOf('xlsx') === 1) {
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

  const handleOk = () => {
    if (FileData) {
      FileData.forEach(e => {
        e['vacancies'] = +e.vacancies;
        e['language'] = language;
        e['state'] = stateID;
        e['name'] = employertID;
        e['district'] = districtID;
        e['isActive'] = true;
        e['createdByUser'] = userData.id;
        e['modifiedByUser'] = userData.id;
        e['jobRoleId'] = jobRoleID;
        e['jobCategoryId'] = jobCategoryID;
        e['key'] = uuid();
      });
    }

    if (FileData && jobCategoryID && jobRoleID) {
      dispatch(addBulkJobs(FileData));
      handleCancel();
    }
  };

  return (
    <>
      <Col md={10}>
        <Modal
          type="primary"
          title={modaltitle}
          visible={importModal}
          onOk={handleOk}
          onCancel={handleCancel}
          width={'991px'}
        >
          <Row gutter={30}>
            <Col md={12} xs={24} className="mb-25">
              <Form.Item name="name">
                <Input placeholder="File upload" name="name" type="file" onChange={readUploadFile} />
              </Form.Item>
            </Col>
            <Col md={12} xs={24} className="mb-25"></Col>
            <Col md={12} xs={24} className="mb-25">
              <Form layout="vertical">
                <Form.Item label="employer">
                  <Select
                    options={employerArray}
                    size="large"
                    className="sDash_fullwidth-select "
                    name="category"
                    onChange={e => {
                      setEmployerID(e);
                    }}
                    placeholder="Select employer"
                  >
                    <Option value="">Select employer</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Job Category">
                  <Select
                    options={jobCategoryArray}
                    size="large"
                    className="sDash_fullwidth-select "
                    name="category"
                    onChange={e => {
                      setJobCategoryID(e);
                    }}
                    placeholder="Select job category"
                  >
                    <Option value="">Select job category</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Job role">
                  <Select
                    options={jobRoleArray}
                    size="large"
                    className="sDash_fullwidth-select "
                    name="category"
                    onChange={e => {
                      setJobRoleID(e);
                    }}
                    placeholder="Select job role"
                  >
                    <Option value="">Select job role</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Select state">
                  <Select
                    options={stateArray}
                    size="large"
                    className="sDash_fullwidth-select "
                    name="category"
                    onChange={e => {
                      setStateID(e);
                    }}
                    placeholder="Select state"
                  >
                    <Option value="">Select state</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Select district">
                  <Select
                    options={districtArray}
                    size="large"
                    className="sDash_fullwidth-select "
                    name="category"
                    onChange={e => {
                      setDistrictID(e);
                    }}
                    placeholder="Select district"
                  >
                    <Option value="">Select district</Option>
                  </Select>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Modal>
      </Col>
    </>
  );
};

export default ImportJobPost;