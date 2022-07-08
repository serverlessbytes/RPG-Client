
import React, { useEffect, useState } from 'react'
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Form, Input, Modal, Pagination, Select, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getStateData, postStateData } from '../../redux/state/actionCreator';
import { Main, ProjectPagination, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper } from '../pages/style';
import uuid from 'react-uuid';
import actions from '../../redux/state/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const State = () => {
    const {
        postStateSuccess, postStateErr
    } = actions;

    const dispatch = useDispatch()
    const [form] = Form.useForm()

    const [stateTableData, setstateTableData] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState({
        name: '',
        key: ''
    })
    const [error, setError] = useState('')

    const stateData = useSelector((state) => state.state.getStateData)
    const postStatedata = useSelector((state) => state.state.postStateData)
    const postStateError = useSelector((state) => state.state.postStateErr)

    useEffect(() => {
        if (postStatedata && postStatedata.status === 200) {
            dispatch(postStateSuccess(null))
            toast.success("State Add successful");
            //toastAssetsAdd(true)
            //onHide()
        }
        // else if(editSchemedata && editSchemedata.data && editSchemedata.data.isActive === true){
        //   dispatch(editSchemeSuccess(null))
        //   toast.success("Jobs Update successful");
        // }
    }, [postStatedata])

    useEffect(() => {
        if (postStateError) {
            dispatch(postStateErr(null))
            toast.error("Something Wrong")
        }
    }, [postStateError])

    useEffect(() => {
        if (stateData && stateData.data) {
            setstateTableData(stateData.data)
        }
    }, [stateData])

    useEffect(() => {
        dispatch(getStateData())
    }, []);

    const stateTableColumns = [
        {
            title: 'State',
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

    const showModal = () => {
        setIsModalVisible(true);
    };

    const validation = (data) => {

        let error = {};
        let flag = false;

        if (!data.name) {
            error.name = "State is required";
            flag = true;
        }
        setError(error);
        return flag
    }

    const handleOk = () => {
        let stateData = form.getFieldsValue()
        stateData = {
            ...stateData,
            key: uuid()
        }
        if (validation(stateData)) {
            return
        }
        dispatch(postStateData(stateData))
        setIsModalVisible(false);
        handleCancel()
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields()
        setError("")
    };

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
                                columns={stateTableColumns}
                                pagination={false}
                            />

                        </TableWrapper>
                    </UserTableStyleWrapper>
                </Cards>
            </Main>
            <Modal title="State" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()} okText="Add">
                <Form name="login" form={form} layout="vertical" >
                    <label htmlFor="name">State</label>
                    <Form.Item name="name" className='mb-0'>
                        <Input
                            placeholder="Enter State"
                            name="name"
                            defaultValue={data.name}
                        // onChange={(e)=>{onChangeHandler(e)}}
                        />
                    </Form.Item>
                    {
                        error.name && <span style={{ color: "red" }}>{error.name}</span>
                    }
                </Form>

            </Modal>
        </>
    )
}

export default State