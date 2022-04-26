
import React, { useEffect, useState } from 'react'
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { Button } from '../../components/buttons/buttons';
import { Form, Input, Modal, Select, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getStateData, postStateData } from '../../redux/state/actionCreator';
import { getLanguageData } from '../../redux/language/actionCreator';
import { Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper } from '../pages/style';
import uuid from 'react-uuid';

const State = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        name: '',
        key: ''
    })


    const usersTableData = [];
    //const [languageTableData, setLanguageTableData] = useState([])
    const [stateTableData, setstateTableData] = useState([])

    // const languageData = useSelector((state) => state.language.getLanguageData)

    // useEffect(() => {
    //     if (languageData && languageData.data) {
    //         setLanguageTableData(languageData.data)
    //     }
    //     console.log("languageData", languageData);
    // }, [languageData])

     const stateData = useSelector((state) => state.state.getStateData)
     

    useEffect(() => {
        if (stateData && stateData.data) {
            setstateTableData(stateData.data)
        }
    }, [stateData])
    const languagesTableColumns = [
        {
            title: 'State',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend', 'ascend'],
        }
    ];


    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const { Option } = Select;
    const handleOk = () => {
        let stateData = form.getFieldsValue()
        stateData = {
            ...stateData,
            key: uuid()
        }
        dispatch(postStateData(stateData))
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    useEffect(() => {
        dispatch(getStateData())
    }, []);

    return (
        <>
            <PageHeader
                ghost
                title="State"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" type="primary" onClick={showModal}>
                            Add state
                        </Button>
                    </div>
                ]}
            />

            <Main >
                <Cards headless>
                    <UserTableStyleWrapper>
                        <TableWrapper className="table-responsive pb-30">
                            <Table
                                //rowSelection={rowSelection}
                                dataSource={stateTableData}
                                columns={languagesTableColumns}
                                pagination={false}
                            />

                        </TableWrapper>
                    </UserTableStyleWrapper>
                </Cards>
            </Main>
            <Modal title="Enter State" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}>
                <Form name="login" form={form} layout="vertical">
                    <label htmlFor="name">State</label>
                    <Form.Item name="name">
                        <Input
                            placeholder="Enter State"
                            name="name"
                            defaultValue={data.name}
                        // onChange={(e)=>{onChangeHandler(e)}}
                        />
                    </Form.Item>
                    {/* <label htmlFor="name">Key</label>
                    <Form.Item name="key">
                        <Input
                            placeholder="Enter Key"
                            name="key"
                            defaultValue={data.key}
                        />
                    </Form.Item>
                    <Form.Item name="languageId" label="Language">
                        <Select style={{ height: "50px" }} size="large" defaultValue="Language" className="sDash_fullwidth-select" >
                            {
                                languageData && languageData.data.map((item) => (
                                    <Option value={item.id}> {item.name} </Option>
                                ))
                            }

                        </Select>
                    </Form.Item> */}
                </Form>

            </Modal>
        </>
    )
}

export default State