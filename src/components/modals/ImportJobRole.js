import { Col, Form, Input, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import * as XLSX from 'xlsx';
import { addBulkJobRoles } from '../../redux/jobs/actionCreator';

function ImportJobRole({ modaltitle, handleCancel, importModel }) {

    const dispatch = useDispatch();

    const [Error, setError] = useState();
    const [error, seterror] = useState(); // for valadation
    const [FileData, setFileData] = useState();

    useEffect(() => {
        console.log("FileData", FileData)
    }, [FileData])

    const readUploadFile = (e) => {
        if (e?.target?.value.split('.').lastIndexOf('xlsx') === 1) {
            setError('');
            const file = e.target.files[0];
            // console.log("file",file)
            const reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = event => {
                // console.log("event",event)
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
    }

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
            dispatch(addBulkJobRoles(FileData));
        }
        handleCancel();
    }

    return (
        <>
            <Col md={16}>
                <Modal
                    type="primery"
                    title={modaltitle}
                    visible={importModel}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={'500px'}
                >
                    <Form.Item name="name">
                        <Input placeholder="File upload" name="name" type="file" onChange={(e) => readUploadFile(e)} />
                        {Error ? <span style={{ color: 'red' }}>{Error}</span> :
                            error && error.name && <span style={{ color: 'red' }}>{error.name}</span>}
                    </Form.Item>
                </Modal>
            </Col>
        </>
    );
}

export default ImportJobRole