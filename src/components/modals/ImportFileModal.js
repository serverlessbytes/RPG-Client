import { Col, Form, Input, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import * as XLSX from 'xlsx';
import { addSchemeInBulkImport } from '../../redux/schemes/actionCreator';

const ImportFileModal = ({ importModal, handleCancel, modaltitle }) => {
  const { Option } = Select;

  const dispatch = useDispatch();

  const userData = useSelector(state => state.auth.getUserData.data);

  const SchemeCategoryFromRedux = useSelector(state => state.scheme.schemecatogeryData.data);
  const SchemeBenefitDataFromRedux = useSelector(state => state.beneFit.getBenefitData.data);
  const language = localStorage.getItem('language');

  const [Error, setError] = useState();
  const [FileData, setFileData] = useState();

  const [schemeCategoryArray, setSchemeCategoryArray] = useState([]);
  const [schemeBanefitArray, setSchemeBanefitArray] = useState([]);
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
        e['langauge'] = language;
        e['createdByUser'] = userData.id;
        e['modifiedByUser'] = userData.id;
        e['schemeCategory'] = schemeCategoryID;
        e['schemeBenifit'] = schemeBanefitID;
        e['key'] = uuid();
      });
    }

    if (FileData && schemeCategoryID && schemeBanefitID) {
      dispatch(addSchemeInBulkImport(FileData, language));
      handleCancel();
    }
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
                <Input placeholder="File upload" name="name" type="file" onChange={readUploadFile} />
              </Form.Item>
            </Col>
            <Col md={12} xs={24} className="mb-25">
              {/* <Button onClick={() => {}} type="primary">
                Import
              </Button> */}
            </Col>
            <Col md={12} xs={24} className="mb-25">
              <Form layout="vertical">
                <Form.Item label="Scheme Category">
                  <Select
                    options={schemeCategoryArray}
                    size="large"
                    className="sDash_fullwidth-select "
                    name="category"
                    onChange={e => {
                      setSchemeCategoryID(e);
                    }}
                    placeholder="Select Scheme Category"
                  >
                    <Option value="">Select Scheme Category</Option>
                  </Select>
                </Form.Item>
              </Form>
            </Col>
            <Col md={12} xs={24} className="mb-25">
              <Form layout="vertical">
                <Form.Item label="Scheme Benefits">
                  <Select
                    options={schemeBanefitArray}
                    size="large"
                    className="sDash_fullwidth-select"
                    name="benefits"
                    onChange={e => {
                      setSchemeBanefitID(e);
                    }}
                    placeholder="Select Scheme Benefits"
                  >
                    <Option value="">Select Scheme Benefits</Option>
                  </Select>
                </Form.Item>
              </Form>
            </Col>
          </Row>

          {/* <Table
                        dataSource={usersTableData}
                        columns={usersTableColumns}
                    /> */}
        </Modal>
      </Col>
    </>
  );
};

export default ImportFileModal;
