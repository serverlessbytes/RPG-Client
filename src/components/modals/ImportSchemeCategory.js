import { Col, Form, Input, Modal, Row, Select } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as XLSX from 'xlsx';
import { addSchemeCategoryInBulk } from '../../redux/schemes/actionCreator';

const ImportSchemeCategory = ({ importModal, handleCancel, modaltitle }) => {
  const dispatch = useDispatch();
  const [Error, setError] = useState();
  const [error, seterror] = useState({}); // for valadation
  const [FileData, setFileData] = useState();
  const [input, setInput] = useState('');



  const readUploadFile = e => {
    setError('');
    setError('');
    if (e?.target?.value.split('.').lastIndexOf('xlsx') === 1) {
      const file = e.target.files[0];
      setInput(e?.target?.value)
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
    if (!FileData) {
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
    if (FileData) {
      dispatch(addSchemeCategoryInBulk(FileData));
      setFileData(null)
      handleCancel();
    }
    setInput('');
    setFileData('')
  };

  return (
    <>
      <Col md={24}>
        <Modal
          type="primary"
          title={modaltitle}
          visible={importModal}
          onOk={handleOk}
          onCancel={() => { setInput(''); setError(''); seterror(''); setFileData(''); handleCancel() }}
          width={'500px'}
        >
          <Row gutter={30}>
            <Col md={24} xs={24} >
              <Form.Item name="name">
                <Input placeholder="File upload" value={input} name="name" type="file" onChange={readUploadFile} />
                {Error ? <span style={{ color: 'red' }}>{Error}</span> :
                  error && error.name && <span style={{ color: 'red' }}>{error.name}</span>}
              </Form.Item>
            </Col>
          </Row>
        </Modal>
      </Col>
    </>
  );
};

export default ImportSchemeCategory;
