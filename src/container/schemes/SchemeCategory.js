import { Form, Input, Modal, Pagination, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, ProjectPagination, TableWrapper } from '../styled';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { addSchemecategory, editSchemecategory, getSchemecategory } from '../../redux/schemes/actionCreator';
import uuid from 'react-uuid';
import { toast } from 'react-toastify';
import actions from '../../redux/schemes/actions';
import { ApiPost } from '../../helper/API/ApiData';
import ImportSchemeCategory from '../../components/modals/ImportSchemeCategory';
const SchemeCategory = () => {
    const { editSchemecategorySuccess, addSchemecategorySuccess, addSchemecategoryErr, editSchemecategoryErr, addSchemeCategoryInBulkSuccess } = actions;


    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [schemeCategoryTableData, setSchemeCategoryTableData] = useState([]);
    const [selectedSchemeCategory, setSelectedSchemeCategory] = useState();
    const [nameTod, setnameTod] = useState(false)
    const [importModal, setImportModal] = useState(false);
    const [error, setError] = useState('')

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
    const ImportCategory = useSelector((state) => state.scheme.importSchemeCategoryData);

    useEffect(() => {
        dispatch(getSchemecategory());
    }, [])

    useEffect(() => {
        if (editSchemeCatogeryData && editSchemeCatogeryData.status === 200) {
            dispatch(editSchemecategorySuccess(null))
            toast.success("Scheme category updated");
            //toastAssetsAdd(true)
            //onHide()
        }
    }, [editSchemeCatogeryData])

    useEffect(() => {
        if (addSchemeCatogeryData && addSchemeCatogeryData.status === 200) {
            dispatch(addSchemecategorySuccess(null))
            toast.success("Scheme category added");
            //toastAssetsAdd(true)
            //onHide()
        }
    }, [addSchemeCatogeryData])

    useEffect(() => {
        if (addSchemeCatogeryError) {
            dispatch(addSchemecategoryErr(null))
            toast.error("Something went wrong");
        }
    }, [addSchemeCatogeryError])

    useEffect(() => {
        if (editSchemeCatogeryError) {
            dispatch(editSchemecategoryErr(null))
            toast.error("Something went wrong");
        }
    }, [editSchemeCatogeryError])

    useEffect(() => {
        if (ImportCategory && ImportCategory.status === 200) {
            toast.success("Category imported");
            dispatch(addSchemeCategoryInBulkSuccess(null))
        } else if (ImportCategory && ImportCategory.status !== 200) {
            toast.error("Something went wrong");
        }
    }, [ImportCategory])

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
    const newSchemeCategory = dataForEdit => {
        const newVal = ApiPost("scheme/editSchemeCategory", dataForEdit)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(getSchemecategory())
                } return res
            })
        return newVal
    }

    const onDelete = async (id) => {
        let dataForEdit = schemeData && schemeData.data && schemeData.data.find((item) => item.id === id)
        if (dataForEdit) {
            delete dataForEdit.key
            dataForEdit = {
                ...dataForEdit,
                isActive: false,
                isDeleted: true
            }
            // dispatch(editSchemecategory(dataForEdit))
            const deleteSchemesCategory = await newSchemeCategory(dataForEdit)
            if (deleteSchemesCategory.status === 200) {
                toast.success("Scheme category deleted")
            }
        }
    }

    useEffect(() => {
        if (schemeData && schemeData.data) {
            setSchemeCategoryTableData(
                schemeData.data.map((item) => {
                    return {
                        // ...item,
                        SchemeCategory: item.name,
                        action: (

                            <div className='active-schemes-table'>
                                <div className="table-actions">
                                    <>
                                        <Button className="btn-icon" type="info" to="#" onClick={() => onEdit(item.id)} shape="circle">
                                            <FeatherIcon icon="edit" size={16} />
                                        </Button>
                                        <Button className="btn-icon" type="danger" to="#" onClick={() => onDelete(item.id)} shape="circle">
                                            <FeatherIcon icon="trash-2" size={16} />
                                        </Button>
                                    </>
                                </div>
                            </div>
                        )
                    }
                }))
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
        setError('')
    };

    const validation = (data) => {
        let error = {};
        let flag = false;

        if (!data.name) {
            error.name = "Category is required";
            flag = true;
        }
        setError(error);
        return flag
    }

    const handleOk = () => {
        let data = form.getFieldsValue()
        if (validation(data)) {
            return
        }
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
    const schemeTableColumns = [
        {
            title: 'Scheme category',
            dataIndex: 'SchemeCategory',
            sorter: (a, b) => a.SchemeCategory.localeCompare(b.SchemeCategory),
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
                title="Scheme category"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button className="btn-signin ml-10" type="primary" size="medium" onClick={() => showModal()}>
                            Add category
                        </Button>
                        <Button className="btn-signin ml-10" type="primary" size="medium" onClick={() => setImportModal(true)}>
                            Import
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

            <Modal title="Scheme category" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}
                okText={nameTod ? "Edit" : "Add"}>
                <Form name="login" form={form} layout="vertical">
                    <label htmlFor="name">Type of category</label>
                    <Form.Item name="name" className='mb-0'>
                        <Input
                            placeholder="Scheme category"
                            name="name"
                        />
                    </Form.Item>
                    {error.name && <span style={{ color: "red" }}>{error.name}</span>}
                </Form>
            </Modal>


            {< ImportSchemeCategory
                importModal={importModal}
                handleCancel={() => setImportModal(false)}
                modaltitle="Import scheme category" />}
        </>
    )
}

export default SchemeCategory