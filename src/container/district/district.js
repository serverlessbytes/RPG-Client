
import React, { useEffect, useState } from 'react'
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Col, Form, Input, Modal, Pagination, Row, Select, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getStateData, postStateData } from '../../redux/state/actionCreator';
import { ListButtonSizeWrapper, Main, ProjectPagination, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper } from '../pages/style';
import uuid from 'react-uuid';
import { getDistrictData, postDistrictData } from '../../redux/district/actionCreator';
import actions from '../../redux/district/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const [error, setError] = useState('')

    const diStrict = useSelector((state) => state.district.getDistrictData) // district
    const stateData = useSelector((state) => state.state.getStateData) //state
    const postDistrictdataa = useSelector((state) => state.district.postDistrictData) //state
    const postDistrictDataError = useSelector((state) => state.district.getStateData) //state

    const onstatedata = (e, name) => {
        if (name === "state") {
            setStateData(e)
        }
    }

    const onChangeHandler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
        setError({ ...error, [e.target.name]: "" })
    }
    const onChnageValue = (e, name) => {
        if (name === "stateId") {
            setState({ ...state, stateId: e })
            setError({ ...error, stateId: "" })

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
            dispatch(getDistrictData(stateData?.data[0]?.id))
        }
    }, [stateData]);


    useEffect(() => {
        if (diStrict && diStrict.data) {
            setstateTableData(diStrict.data)
        }
    }, [diStrict])

    const districtTableColumns = [
        {
            title: 'District',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: '',
            dataIndex: '',
            width: '1px',
        },
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

    const validation = (data) => {

        let error = {};
        let flag = false;

        if (!state.name) {
            error.name = "State is required";
            flag = true;
        }
        if (!state.stateId) {
            error.stateId = "District is required";
            flag = true;
        }
        setError(error);
        return flag
    }

    const handleOk = () => {
        if (validation()) {
            return
        }

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
        form.resetFields();
        setState({
            name: "",
            stateId: "",
        })
        setError("");
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
                            <Form layout="vertical">
                                <Form.Item label="State" >
                                    <Select
                                        size="large"
                                        className={statedata ? "sDash_fullwidth-select" : 'select-option-typ-placeholder'}
                                        name="state"
                                        value={statedata}
                                        onChange={(e) => onstatedata(e, "state")}
                                        placeholder="Select State"
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
                                columns={districtTableColumns}
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
                            placeholder="Enter district"
                            name="name"
                            //defaultValue={data.name}
                            onChange={(e) => { onChangeHandler(e) }}
                        />
                        {error?.name && <span style={{ color: "red" }}>{error.name}</span>}
                    </Form.Item>
                    {/* <label htmlFor="name">Key</label>
                    <Form.Item name="key">
                        <Input
                            placeholder="Enter Key"
                            name="key"
                            defaultValue={data.key}
                        />
                    </Form.Item> */}
                    <Form.Item name='stateId' label="State">
                        <Select placeholder="Select state" className={state.stateId ? "sDash_fullwidth-select" : 'select-option-typ-placeholder'} style={{ height: "50px" }} size="large" value={state.stateId} name="stateId" onChange={(e) => { onChnageValue(e, "stateId") }} >
                            <Option value='' >Select state</Option>
                            {
                                stateData && stateData.data.map((item) => (
                                    <Option value={item.id}> {item.name} </Option>
                                ))
                            }

                        </Select>
                        {error?.stateId && <span style={{ color: "red" }}>{error.stateId}</span>}
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}

export default district