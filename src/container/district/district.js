
import React, { useEffect, useState } from 'react'
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Col, Form, Input, Modal, Row, Select, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getStateData } from '../../redux/state/actionCreator';
import { ListButtonSizeWrapper, Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper } from '../pages/style';
import uuid from 'react-uuid';
import { getDistrictData, postDistrictData } from '../../redux/district/actionCreator';
import actions from '../../redux/district/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { getDistrictSuccess } = actions;

const district = () => {
    const dispatch = useDispatch()
    const { Option } = Select;
    const { postDistrictSuccess, postDistrictErr } = actions;
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
    const postDistrictdataa = useSelector((state) => state.district.postDistrictData)
    const postDistrictDataError = useSelector((state) => state.district.getStateData)

    useEffect(() => {
        dispatch(getStateData())
    }, []);

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
            toast.success("District added");
        }
    }, [postDistrictdataa])

    useEffect(() => {
        if (postDistrictDataError) {
            dispatch(postDistrictErr(null))
            toast.error("Something went wrong")
        }
    }, [postDistrictDataError])

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
        dispatch(getDistrictSuccess(null))
        setStateData("")
    }

    const validation = () => {

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

    return (
        <>
            <PageHeader
                ghost
                title="District"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" type="primary" onClick={showModal}>
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
                                            stateData && stateData.data.map((item, i) => (
                                                <Option key={i} value={item.id}> {item.name} </Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col md={6} xs={24} className="mb-25">
                            <ListButtonSizeWrapper>
                                <Button size="small" type="primary" onClick={() => onApply()}>
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
                                dataSource={stateTableData}
                                columns={districtTableColumns}
                                pagination={false}
                            />

                        </TableWrapper>
                    </UserTableStyleWrapper>
                </Cards>
            </Main>
            <Modal title="District" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()} okText="Add">
                <Form name="login" form={form} layout="vertical">
                    <label htmlFor="name">District</label>
                    <Form.Item name="name">
                        <Input
                            placeholder="Enter district"
                            name="name"
                            onChange={(e) => { onChangeHandler(e) }}
                        />
                        {error?.name && <span style={{ color: "red" }}>{error.name}</span>}
                    </Form.Item>
                    <Form.Item name='stateId' label="State">
                        <Select placeholder="Select state" className={state.stateId ? "sDash_fullwidth-select" : 'select-option-typ-placeholder'} style={{ height: "50px" }} size="large" value={state.stateId} name="stateId" onChange={(e) => { onChnageValue(e, "stateId") }} >
                            <Option value='' >Select state</Option>
                            {
                                stateData && stateData.data.map((item, i) => (
                                    <Option key={i} value={item.id}> {item.name} </Option>
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