
import React, { useEffect, useState } from 'react'
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { Button } from '../../components/buttons/buttons';
import { Form, Input, Modal, Pagination, Select, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getStateData, postStateData } from '../../redux/state/actionCreator';
import { getLanguageData } from '../../redux/language/actionCreator';
import { Main, ProjectPagination, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper } from '../pages/style';
import uuid from 'react-uuid';
import actions from '../../redux/state/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const State = () => {
    const {
        postStateSuccess,postStateErr
      } = actions;
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
     const postStatedata = useSelector((state) => state.state.postStateData)
     const postStateError = useSelector((state) => state.state.postStateErr)
     
     useEffect(()=>{console.log("postStatedata",postStatedata)},[postStatedata])

     useEffect(() => {
        if (postStatedata && postStatedata.status  === 200) {
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
      
      useEffect(()=>{
        if(postStateError){ 
            dispatch(postStateErr(null))
          toast.error("Something Wrong")
        }
      },[postStateError])

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

//  useEffect(() => {
//   setData({
//       name: "",
//       key : "",
//   })
//  }, [showModal])
 

    const { Option } = Select;
    const handleOk = () => {
        let stateData = form.getFieldsValue()
        stateData = {
            ...stateData,
            key: uuid()
        }
        dispatch(postStateData(stateData))
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
            <Modal title="State" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()} okText="Add">
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