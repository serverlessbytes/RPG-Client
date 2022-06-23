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
  const [error, seterror] = useState({}); // for valadation
  const [fileData, setFileData] = useState();

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
    if (JobCategory && 'data' in JobCategory) {
      JobCategory.data.forEach(element => {
        element['label'] = element.name;
        element['value'] = element.id;
      });
      setJobCategoryArray(JobCategory.data);
    }
  }, [JobCategory]);

  useEffect(() => {
    if (stateData && 'data' in stateData) {
      stateData.data.forEach(element => {
        element['label'] = element.name;
        element['value'] = element.id;
      });
      setStateArray(stateData.data);
    }
  }, [stateData]);

  useEffect(() => {
    if (district && 'data' in district) {
      district.data.forEach(element => {
        element['label'] = element.name;
        element['value'] = element.id;
      });
      setDistrictArray(district.data);
    }
  }, [district]);

  useEffect(() => {
    if (employer && 'data' in employer) {
      employer.data.data.forEach(element => {
        element['label'] = element.name;
        element['value'] = element.id;
      });
      setEmployerArray(employer.data.data);
    }
  }, [employer]);

  useEffect(() => {
    if (JobRole) {
      JobRole.forEach(element => {
        element['label'] = element.name;
        element['value'] = element.id;
      });
      setJobRoleArray(JobRole);
    }
  }, [JobRole]);

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
    // if (jobCategoryID === '') {
    //   error.jobCategoryID = 'JobCategory is required';
    //   flage = true;
    // }
    // if (jobRoleID === '') {
    //   error.jobRoleId = 'JobRole is required';
    //   flage = true;
    // }
    // if (stateID === '') {
    //   error.state = 'State is required';
    //   flage = true;
    // }
    // if (districtID === '') {
    //   error.district = 'District is required';
    //   flage = true;
    // }
    // if (employertID === '') {
    //   error.employertID = 'Employer is required';
    //   flage = true;
    // }
    if (!fileData) {
      error.name = 'File is required';
      flage = true;
    }

    seterror(error);
    return flage;
  };

  const handleOk = () => {
    // if (validation()) {
    //   return;
    // }
    if (fileData) {
      fileData.forEach(e => {
        // e['vacancies'] = +e.vacancies;
        // e['language'] = language;
        // e['state'] = stateID;
        // e['name'] = employertID;
        // e['district'] = district ID;
        e['isActive'] = true;
        // e['createdByUser'] = userData.id;
        // e['modifiedByUser'] = userData.id;
        // e['name']
        // e['jobRoleId'] = jobRoleID;
        // e['jobCategoryId'] = jobCategoryID;
        // e['key'] = uuid();
      });
    }
    if (fileData) {
      dispatch(addBulkJobs(fileData));
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
                {Error ? <span style={{ color: 'red' }}>{Error}</span> :
                  error && error.name && <span style={{ color: 'red' }}>{error.name}</span>}
              </Form.Item>
            </Col>
            <Col md={12} xs={24} className="mb-25"></Col>
            <Col md={12} xs={24} className="mb-25">
              {/* <Form layout="vertical">
                <Form.Item label="employer">
                  <Select
                    options={employerArray}
                    size="large"
                    className="sDash_fullwidth-select "
                    name="employertID"
                    onChange={e => {
                      setEmployerID(e);
                    }}
                    placeholder="Select employer"
                  >
                    <Option value="">Select employer</Option>
                  </Select>
                  {error.employertID && <span style={{ color: 'red' }}>{error.employertID}</span>}
                </Form.Item>

                <Form.Item label="Job Category">
                  <Select
                    options={jobCategoryArray}
                    size="large"
                    className="sDash_fullwidth-select "
                    name="jobCategoryID"
                    onChange={e => {
                      setJobCategoryID(e);
                    }}
                    placeholder="Select job category"
                  >
                    <Option value="">Select job category</Option>
                  </Select>
                  {error.jobCategoryID && <span style={{ color: 'red' }}>{error.jobCategoryID}</span>}
                </Form.Item>

                <Form.Item label="Job role">
                  <Select
                    options={jobRoleArray}
                    size="large"
                    className="sDash_fullwidth-select "
                    name="jobRoleId"
                    onChange={e => {
                      setJobRoleID(e);
                    }}
                    placeholder="Select job role"
                  >
                    <Option value="">Select job role</Option>
                  </Select>
                  {error.jobRoleId && <span style={{ color: 'red' }}>{error.jobRoleId}</span>}
                </Form.Item>

                <Form.Item label="Select state">
                  <Select
                    options={stateArray}
                    size="large"
                    className="sDash_fullwidth-select "
                    name="state"
                    onChange={e => {
                      setStateID(e);
                    }}
                    placeholder="Select state"
                  >
                    <Option value="">Select state</Option>
                  </Select>
                  {error.state && <span style={{ color: 'red' }}>{error.state}</span>}
                </Form.Item>

                <Form.Item label="Select district">
                  <Select
                    options={districtArray}
                    size="large"
                    className="sDash_fullwidth-select "
                    name="district"
                    onChange={e => {
                      setDistrictID(e);
                    }}
                    placeholder="Select district"
                  >
                    <Option value="">Select district</Option>
                  </Select>
                  {error.district && <span style={{ color: 'red' }}>{error.district}</span>}
                </Form.Item>
              </Form> */}
            </Col>
          </Row>
        </Modal>
      </Col>
    </>
  );
};

export default ImportJobPost;
