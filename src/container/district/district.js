
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
    const stateData = useSelector((state) => state.state.getStateData)
    useEffect(() => {
        if (stateData && stateData.data) {
            setstateTableData(stateData.data)
        }
        console.log("stateData", stateData);
    }, [stateData])

    
     

    useEffect(() => {
        if (stateData && stateData.data) {
            setstateTableData(stateData.data)
        }
    }, [stateData])
    const languagesTableColumns = [
        {
            title: 'District',
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
                title="District"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" type="primary" onClick={showModal}>
                            <FeatherIcon icon="plus" size={14} />
                            Add District
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
            <Modal title="Enter District" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}>
                <Form name="login" form={form} layout="vertical">
                    <label htmlFor="name">District</label>
                    <Form.Item name="name">
                        <Input
                            placeholder="Enter District"
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
                    </Form.Item> */}
                    <Form.Item name="languageId" label="District">
                        <Select style={{ height: "50px" }} size="large" defaultValue="District" className="sDash_fullwidth-select" >
                            {
                                stateData && stateData.data.map((item) => (
                                    <Option value={item.id}> {item.name} </Option>
                                ))
                            }

                        </Select>
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}

export default State