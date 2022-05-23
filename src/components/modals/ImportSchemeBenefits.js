import { Col, Form, Input, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import { addSchemeBenefitBulk } from '../../redux/benefitsType/actionCreator';

const ImportSchemeBenefits = ({ importModal, handleCancel, modaltitle }) => {
    // const inputRef = useRef(null)
    const dispatch = useDispatch();
    const [Error, setError] = useState();
    const [error, seterror] = useState(); // for valadation
    const [FileData, setFileData] = useState();

    const readUploadFile = e => {
        if (e?.target?.value.split('.').lastIndexOf('xlsx') === 1) {
            // console.log("e+++",e)
            // e.persist();
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
        console.log("FileData", FileData)
        if (validation()) {
            return;
        }
        if (FileData) {
            dispatch(addSchemeBenefitBulk(FileData));
            // inputRef?.current?.target?.value = null
            // inputRef.current.input.files = null
            // console.log(inputRef.current.input.files = null)
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
                    width={'500px'}
                >
                    <Row gutter={30}>
                        <Col md={12} xs={24} className="mb-25">
                            <Form.Item >
                                <Input placeholder="File upload" name="name" type="file" onChange={readUploadFile} />
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

export default ImportSchemeBenefits;
