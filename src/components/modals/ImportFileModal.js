import { Col, Form, Input, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import * as XLSX from 'xlsx';
import STORAGEKEY from '../../config/APP/app.config';
import AuthStorage from '../../helper/AuthStorage';
import { addSchemeInBulkImport } from '../../redux/schemes/actionCreator';
import { getStateData } from '../../redux/state/actionCreator';

const ImportFileModal = ({ importModal, handleCancel, modaltitle }) => {
  const { Option } = Select;

  const dispatch = useDispatch();

  const userData = AuthStorage.getStorageJsonData(STORAGEKEY.userData);

  const SchemeCategoryFromRedux = useSelector(state => state.scheme.schemecatogeryData?.data);
  const SchemeBenefitDataFromRedux = useSelector(state => state.beneFit.getBenefitData?.data);
  const stateData = useSelector(state => state.state.getStateData?.data);
  const language = localStorage.getItem('language');

  const [Error, setError] = useState();
  const [error, seterror] = useState(); // for valadation
  const [FileData, setFileData] = useState();

  const [schemeCategoryArray, setSchemeCategoryArray] = useState([]);
  const [schemeBanefitArray, setSchemeBanefitArray] = useState([]);

  const [stateArray, setStateArray] = useState([]);
  const [selectedStateArray, setSelectedStateArray] = useState([]);

  const [schemeCategoryID, setSchemeCategoryID] = useState('');
  const [schemeBanefitID, setSchemeBanefitID] = useState('');

  //   SCHEME CATEGORY
  useEffect(() => {
    SchemeCategoryFromRedux.forEach(element => {
      element['label'] = element.name;
      element['value'] = element.id;
    });
    setSchemeCategoryArray(SchemeCategoryFromRedux);
  }, [SchemeCategoryFromRedux]);

  //   SCHEME BENEFITS
  useEffect(() => {
    SchemeBenefitDataFromRedux.forEach(element => {
      element['label'] = element.name;
      element['value'] = element.id;
    });
    setSchemeBanefitArray(SchemeBenefitDataFromRedux);
  }, [SchemeBenefitDataFromRedux]);

  // SETTING STATE
  useEffect(() => {
    if (stateData) {
      stateData.forEach(ele => {
        (ele.value = ele.id), (ele.label = ele.name);
      });
      setStateArray(stateData);
    }
  }, [stateData]);

  // GET STATE
  useEffect(() => {
    dispatch(getStateData());
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
  // const validation = () => {
  //   let error = {};
  //   let flage = false;
  //   if (schemeCategoryID === '') {
  //     error.schemeCategory = 'SchemeCategory is required';
  //     flage = true;
  //   }
  //   if (schemeBanefitID === '') {
  //     error.schemeBanefitID = 'SchemeBanefit is required';
  //     flage = true;
  //   }
  //   if (selectedStateArray.length == 0) {
  //     error.locations = 'Locations is required';
  //     flage = true;
  //   }
  //   if (!FileData) {
  //     error.name = 'File is required';
  //     flage = true;
  //   }
  //   seterror(error);
  //   return flage;
  // };
  const handleOk = () => {
    // if (validation()) {
    //   return;
    // }
    if (FileData) {
      FileData.forEach(e => {
        // e['language'] = language;
        // e['createdByUser'] = userData.id;
        // e['modifiedByUser'] = userData.id;
        // e['schemeCategory'] = schemeCategoryID;
        // e['schemeBenifit'] = schemeBanefitID;
        e['locations'] = selectedStateArray;
        e['isActive'] = true;
        // e['key'] = uuid();
      });
    }

    if (FileData) {
      dispatch(addSchemeInBulkImport(FileData));
      handleCancel();
    }
  };

  const stateSelected = event => {
    setSelectedStateArray(event);
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
            <Col md={24} lg={24} xs={24} className="mb-25">
              <Form.Item name="name">
                <Input placeholder="File upload" name="name" type="file" onChange={readUploadFile} />
                {Error ? <span style={{ color: 'red' }}>{Error}</span> :
                  error && error.name && <span style={{ color: 'red' }}>{error.name}</span>}
              </Form.Item>
            </Col>
            {/* <Col md={12} xs={24} className="mb-25"> */}
            {/* <Button onClick={() => {}} type="primary">
                Import
              </Button> */}
            {/* </Col> */}
            {/* <Col md={12} xs={24} className="mb-25">
              <Form layout="vertical">
                <Form.Item label="Scheme Category">
                  <Select
                    options={schemeCategoryArray}
                    size="large"
                    className="sDash_fullwidth-select "
                    name="schemeCategory"
                    onChange={e => {
                      setSchemeCategoryID(e);
                    }}
                    placeholder="Select Scheme Category"
                  >
                    <Option value="">Select Scheme Category</Option>
                  </Select>
                  {error && error.schemeCategory && <span style={{ color: 'red' }}>{error.schemeCategory}</span>}
                </Form.Item>
              </Form>
            </Col> */}
            {/* <Col md={12} xs={24} className="mb-25">
              <Form layout="vertical">
                <Form.Item label="Scheme Benefits">
                  <Select
                    options={schemeBanefitArray}
                    size="large"
                    className="sDash_fullwidth-select"
                    name="schemeBanefitID"
                    onChange={e => {
                      setSchemeBanefitID(e);
                    }}
                    placeholder="Select Scheme Benefits"
                  >
                    <Option value="">Select Scheme Benefits</Option>
                  </Select>
                  {error && error.schemeBanefitID && <span style={{ color: 'red' }}>{error.schemeBanefitID}</span>}
                </Form.Item>
              </Form>
            </Col> */}
          </Row>

          <Row>
            <Col md={24} xs={24} lg={24} className="mb-25">
              <Form layout="vertical">
                <Form.Item label="Select locations">
                  <Select
                    mode="multiple"
                    options={stateArray}
                    size="large"
                    className="sDash_fullwidth-select"
                    name="locations"
                    onChange={e => {
                      stateSelected(e);
                    }}
                    placeholder="Select locations"
                  >
                    <Option value="">Select locations</Option>
                  </Select>
                  {error && error.locations && <span style={{ color: 'red' }}>{error.locations}</span>}
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Modal>
      </Col>
    </>
  );
};

export default ImportFileModal;
