
import React, { useEffect, useState } from 'react'
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { Button } from '../../components/buttons/buttons';
import { Col, Form, Input, Modal, Pagination, Row, Select, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getStateData, postStateData } from '../../redux/state/actionCreator';
import { getLanguageData } from '../../redux/language/actionCreator';
import { ListButtonSizeWrapper, Main, ProjectPagination, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper } from '../pages/style';
import uuid from 'react-uuid';
import { getDistrictData, postDistrictData } from '../../redux/district/actionCreator';
import actions from '../../redux/district/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fromUnixTime } from 'date-fns';

const district = () => {
    const dispatch = useDispatch()
    const { Option } = Select;
    const {
        postDistrictSuccess, postDistrictErr,
    } = actions;
    const [form] = Form.useForm()
    const showModal = () => {
        setIsModalVisible(true);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [stateTableData, setstateTableData] = useState([])
    const [statedata, setStateData] = useState("");
    const [state, setState] = useState({
        name: '',
        stateId: ''
    })

    const diStrict = useSelector((state) => state.district.getDistrictData) // district
    const stateData = useSelector((state) => state.state.getStateData) //state
    const postDistrictdataa = useSelector((state) => state.district.postDistrictData) //state
    const postDistrictDataError = useSelector((state) => state.district.getStateData) //state

    const onstatedata = (e, name) => {
        if (name === "state") {
            setStateData(e)
        }
    }
    useEffect (()=>{
        console.log('statedata', statedata)
    },[statedata])

    const onChangeHandler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const onChnageValue = (e, name) => {
        if (name === "stateId") {
            setState({ ...state, stateId: e })
        }
    }

    useEffect(() => {
        if (postDistrictdataa && postDistrictdataa.status === 200) {
            dispatch(postDistrictSuccess(null))
            // dispatch(getJobsFilterForMainSuccess(null))
            toast.success("District Add successful");
            //toastAssetsAdd(true)
            //onHide()
        }
    }, [postDistrictdataa])

    useEffect(() => {
        if (postDistrictDataError) {
            dispatch(postDistrictErr(null))
            toast.error("Something Wrong")
        }
    }, [postDistrictDataError])

    useEffect(() => {
        if (stateData && stateData.data) {
            setStateData(stateData?.data[0]?.id)
        }
    }, [stateData]);


    useEffect(() => {
        if (diStrict && diStrict.data) {
            setstateTableData(diStrict.data)
        }
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
        dispatch(getDistrictData(statedata ? statedata : ""))
    }
    const clearFilter = () => {
        setStateData({ statedata: "" })
        dispatch(getDistrictData(statedata ? statedata : ""))
    }

    // useEffect(() => {
    //     if (statedata) {
    //         dispatch(getDistrictData(statedata))
    //     }
    // }, [statedata])
   
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
        dispatch(postDistrictData(data))
        setIsModalVisible(false);
        handleCancel()
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields()
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

                        <Col md={6} xs={24} className="mb-md-25">
                            <Form name="sDash_select" layout="vertical">
                                <Form.Item label="State" >
                                    <Select
                                        size="large"
                                        className={statedata ? "sDash_fullwidth-select" : 'select-option-typ-placeholder'}
                                        name="state"
                                        value={statedata}
                                        placeholder="Select State"
                                        onChange={(e) => onstatedata(e, "state")}
                                    >
                                        <Option value="">Select State</Option>
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
                                <Button size="small" type="light" onClick={() => clearFilter()}>
                                    Clear
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
                    {/* <ProjectPagination>

                        <Pagination
                            onChange={() => { }}
                            showSizeChanger
                            onShowSizeChange={() => { }}
                            pageSize={10}
                            defaultCurrent={1}
                            total={10}
                        />

                    </ProjectPagination> */}
                </Cards>
            </Main>
            <Modal title="District" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()} okText="Add">
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
                    <Form.Item label="State">
                        <Select placeholder="Select State" className={state.stateId ? "sDash_fullwidth-select" : 'select-option-typ-placeholder'} style={{ height: "50px" }} size="large" value={state.stateId} name="stateId" onChange={(e) => { onChnageValue(e, "stateId") }} >
                            <Option value='' >Select State</Option>
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