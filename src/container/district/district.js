
import React, { useEffect, useState } from 'react'
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { Button } from '../../components/buttons/buttons';
import { Col, Form, Input, Modal, Row, Select, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getStateData, postStateData } from '../../redux/state/actionCreator';
import { getLanguageData } from '../../redux/language/actionCreator';
import { ListButtonSizeWrapper, Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper } from '../pages/style';
import uuid from 'react-uuid';
import { getDistrictData, postDistrictData } from '../../redux/district/actionCreator';

const district = () => {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        name: '',
        stateId: ''
    })

    const onstatedata = (e, name) => {
        if (name === "state") {
            setStateData({ ...statedata, state: e })
        }
    }

    const onChangeHandler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
       const onChnageValue = (e,name) => {
             if(name ==="stateId"){
              setState({...state,stateId:e})
             }
       }  

    const diStrict = useSelector((state) => state.district.getDistrictData) // district
    const stateData = useSelector((state) => state.state.getStateData) //state
    const [statedata, setStateData] = useState();
    useEffect(() => {
        if (stateData && stateData.data) {
            setStateData(stateData?.data[0]?.id );
            //console.log("stateData+++",stateData.data[0].id)
        }
    }, [stateData]);
    
    //const usersTableData = [];
    //const [languageTableData, setLanguageTableData] = useState([])
    const [stateTableData, setstateTableData] = useState([])
   
    useEffect(() => {
        if (diStrict && diStrict.data) {
            setstateTableData(diStrict.data)
        }
        console.log("stateData", stateData);
    }, [diStrict])

    const languagesTableColumns = [
        {
            title: 'District',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend', 'ascend'],
        }
    ];
    
    const onApply = () => {
        dispatch(getDistrictData(statedata.state))
    }
    useEffect(()=>{
        console.log("statedatause",statedata);
    },[statedata])
    useEffect(()=>{
        dispatch(getDistrictData(statedata))
    },[statedata])
    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const { Option } = Select;
    const handleOk = () => {
        // let stateData = form.getFieldsValue()
        // stateData = {
        //     ...stateData,
        //     key: uuid()
        // }
        let data = {
            name: state.name,
            stateId: state.stateId,
            key: uuid(),
        }
        console.log("datat", data)
        dispatch(postDistrictData(data))
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
                            {/* <FeatherIcon icon="plus" size={14} /> */}
                            Add District
                        </Button>
                    </div>
                ]}
            />

            <Main >
                <Cards headless>


                    <Row gutter={30}>

                        <Col md={6} xs={24} className="mb-25">
                            <Form name="sDash_select" layout="vertical">
                                <Form.Item name="basic-select" label="State">
                                    <Select
                                        size="large"
                                        className="sDash_fullwidth-select"
                                        name="state"
                                        value={statedata}
                                        placeholder="Select"
                                        onChange={(e) => onstatedata(e, "state")}
                                    >
                                        {
                                            stateData && stateData.data.map((item) => (
                                                <Option value={item.id}> {item.name} </Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col md={6} xs={24} className="mb-25">
                            <ListButtonSizeWrapper>
                                <Button size="small" type="primary" onClick={e => onApply(e)}>
                                    Apply
                                </Button>
                            </ListButtonSizeWrapper>
                        </Col>
                    </Row>



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
                            //defaultValue={data.name}
                            onChange={(e) => { onChangeHandler(e) }}
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
                    <Form.Item name="languageId" label="State">
                        <Select style={{ height: "50px" }} size="large" defaultValue="State" name="stateId" onChange={(e) => { onChnageValue(e, "stateId") }} className="sDash_fullwidth-select" >
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

export default district