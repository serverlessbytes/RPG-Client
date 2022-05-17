import { Form, Input, Modal, Pagination, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, ProjectPagination, TableWrapper } from '../styled';
import FeatherIcon from 'feather-icons-react';
import ActiveSchemesTable from './ActiveSchemesTable'
import { useDispatch, useSelector } from 'react-redux';
import { addSchemecategory, editSchemecategory, getSchemecategory } from '../../redux/schemes/actionCreator';
import uuid from 'react-uuid';
import { toast } from 'react-toastify';
import actions from '../../redux/schemes/actions';
import { set } from 'js-cookie';
import { ApiPost } from '../../helper/API/ApiData';
import { async } from '@firebase/util';
const SchemeCategory = () => {
    const {editSchemecategorySuccess,addSchemecategorySuccess,addSchemecategoryErr,editSchemecategoryErr} = actions;


    const dispatch = useDispatch()
    const usersTableData = [];
    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [schemeCategoryTableData, setSchemeCategoryTableData] = useState([]);
    const [selectedSchemeCategory, setSelectedSchemeCategory] = useState();
    const [nameTod, setnameTod] = useState(false)
    const { users } = useSelector(state => {
        return {
            users: state.users,
        };
    });

    const schemeData = useSelector((state) => state.scheme.schemecatogeryData)
    const editSchemeCatogeryData = useSelector((state) => state.scheme.editSchemeCatogeryData)
    const addSchemeCatogeryData = useSelector((state) => state.scheme.addSchemeCatogeryData)
    const addSchemeCatogeryError = useSelector((state) => state.scheme.addSchemeCatogeryError)
    const editSchemeCatogeryError = useSelector((state) => state.scheme.editSchemeCatogeryError)

    useEffect(() => {
        dispatch(getSchemecategory());
    }, [])

    useEffect(() => {
        console.log("addSchemeCatogeryData",addSchemeCatogeryData)
    }, [addSchemeCatogeryData])
    
    useEffect(() => {
        if (editSchemeCatogeryData && editSchemeCatogeryData.status === 200) {
            dispatch(editSchemecategorySuccess(null))
            toast.success("Scheme Category update successfull");
            //toastAssetsAdd(true)
            //onHide()
        }
    }, [editSchemeCatogeryData])  

    useEffect(() => {
        if (addSchemeCatogeryData && addSchemeCatogeryData.status === 200) {
            dispatch(addSchemecategorySuccess(null))
            toast.success("Scheme Category add successfull");
            //toastAssetsAdd(true)
            //onHide()
        }
    }, [addSchemeCatogeryData])  

    useEffect(()=>{
        if(addSchemeCatogeryError){
            dispatch(addSchemecategoryErr(null))
            toast.error("Something wrong");
        }
    },[addSchemeCatogeryError])

    useEffect(()=>{
        if(editSchemeCatogeryError){
            dispatch(editSchemecategoryErr(null))
            toast.error("Something wrong");
        }
    },[editSchemeCatogeryError])

    const onEdit = (id) => {
        let dataForEdit = schemeData && schemeData.data && schemeData.data.find((item) => item.id === id)
        if (dataForEdit) {
            setSelectedSchemeCategory(dataForEdit)
            form.setFieldsValue({
                name: dataForEdit.name
            })
            setIsModalVisible(true);
        }
        setnameTod(true)
    }

    const newSchemeCategory =  dataForEdit =>{
        const newVal = ApiPost("scheme/editSchemeCategory" ,dataForEdit)
        .then((res) =>{
            if (res.status === 200) {
                dispatch(getSchemecategory())
            } return res
        })
        return newVal
    }

    const onDelete = async(id) => {
        let dataForEdit = schemeData && schemeData.data && schemeData.data.find((item) => item.id === id)
        if (dataForEdit) {
            delete dataForEdit.key
            dataForEdit = {
                ...dataForEdit,
                isActive: false,
                isDeleted: true
            }
            // dispatch(editSchemecategory(dataForEdit))
            const deleteSchemesCategory =  await newSchemeCategory(dataForEdit)
            if (deleteSchemesCategory.status === 200) {
                toast.success("Scheme Category delete successfull")
            }
        }
    }

    useEffect(() => {
        if (schemeData && schemeData.data) {
            setSchemeCategoryTableData(schemeData.data ?
                schemeData.data.map((item) => {
                    console.log("item",item);
                    return {
                        ...item,  
                        SchemeCategory: item.name,
                        action: (
                        
                            <div className='active-schemes-table'>
                                <div className="table-actions">
                                    <>
                                        <Button className="btn-icon" type="info" to="#" onClick={() => onEdit(item.id)} shape="circle">
                                            <FeatherIcon icon="edit" size={16} />
                                        </Button>
                                        <Button className="btn-icon" type="danger" to="#" onClick={() => onDelete(item.id)} shape="circle">
                                            <FeatherIcon icon="x-circle" size={16} />
                                        </Button>
                                    </>
                                </div>
                            </div>
                        )
                    }
                }) : [])
        }
    }, [schemeData])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        form.resetFields()
        setIsModalVisible(false);
        setnameTod(false)
        setSelectedSchemeCategory(null)
    };

    const handleOk = () => {
        let data = form.getFieldsValue()
        if (!selectedSchemeCategory) {
            data = {
                ...data,
                key: uuid()
            }
            dispatch(addSchemecategory(data))
            setIsModalVisible(false)
        } 
        else {
            delete selectedSchemeCategory.key
            data = {
                id: selectedSchemeCategory.id,
                name: data.name,
                isActive: true,
                isDeleted: false
            }
            dispatch(editSchemecategory(data))
        }
        form.resetFields()
        setIsModalVisible(false);
        setnameTod(false)
        handleCancel()
    };

    const [state, setState] = useState({
        projects: usersTableData,
        current: 0,
        pageSize: 0,
    });

    const onShowSizeChange = (current, pageSize) => {
        setState({ ...state, current, pageSize });
    };

    const onHandleChange = (current, pageSize) => {
        // You can create pagination in here
        setState({ ...state, current, pageSize });
    };

    users?.data?.map(user => {
        // const { id, name, designation, status } = user;
        return usersTableData.push({
            Typeofbenefit: 'Agriculture & Fisheries',
            action: (
                <div className='active-schemes-table'>
                    <div className="table-actions">
                        <>
                            <Button className="btn-icon" type="info" to="#" shape="circle" >
                                <FeatherIcon icon="edit" size={16} />
                            </Button>
                            <Button className="btn-icon" type="danger" to="#" shape="circle">
                                <FeatherIcon icon="x-circle" size={16} />
                            </Button>
                        </>
                    </div>
                </div>
            ),
        });
    });

    const schemeTableColumns = [
        {
            title: 'SchemeCategory',
            dataIndex: 'name',
            sorter: (a, b) => a.SchemeCategory.length - b.SchemeCategory.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            width: '90px',
        },
    ];



    return (
        <>
            <PageHeader
                ghost
                title="Scheme Category"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button className="btn-signin ml-10" type="primary" size="medium" onClick={showModal}>
                            Add Category
                        </Button>
                    </div>
                ]}
            />
            <Main >
                <Cards headless>
                    <UserTableStyleWrapper>
                        <TableWrapper className="table-responsive pb-30">
                                {/* --- search bar --- */}            
                            {/* <Form name="sDash_select" layout="vertical">
                                <Form.Item name="search" label="">
                                    <Input placeholder="search" style={{ width: 200 }} />
                                </Form.Item>
                            </Form> */}

                            <Table
                                // rowSelection={rowSelection}
                                dataSource={schemeCategoryTableData}
                                columns={schemeTableColumns}
                                pagination={false}
                            />

                        </TableWrapper>
                    </UserTableStyleWrapper>
                    {/* <ProjectPagination>
                        {schemeCategoryTableData.length ? (
                            <Pagination
                                onChange={onHandleChange}
                                showSizeChanger
                                onShowSizeChange={onShowSizeChange}
                                pageSize={10}
                                defaultCurrent={1}
                                total={10}
                            />
                        ) : null}
                    </ProjectPagination> */}
                </Cards>
            </Main>

            <Modal title="Scheme Category" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()} 
            
            okText={nameTod ? "Edit" :"Add"}>
                <Form name="login" form={form} layout="vertical">
                    <label htmlFor="name">Type of Category</label>
                    <Form.Item name="name">
                        <Input
                            placeholder=""
                            name="name"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default SchemeCategory