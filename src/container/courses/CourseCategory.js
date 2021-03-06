import { Form, Input, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, TableWrapper } from '../styled';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { editCategoryData, getCategoryData, postCategoryData } from '../../redux/course/actionCreator';
import uuid from 'react-uuid';
import actions from '../../redux/course/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiPost } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import bn from 'date-fns/esm/locale/bn/index.js';
import ImportCourseCategory from '../../components/modals/ImportCourseCategory';

const CourseCategory = () => {
    const {
        postCategorySuccess,
        postCategoryDataErr,
        editCategorySuccess,
        editcategoryErr,
        importCourseCategoryInBulkErr,
    } = actions;

    const [dataForEdit, setDataForEdit] = useState(); //foredit
    const dispatch = useDispatch();
    const usersTableData = [];
    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [nameTog, setNameTog] = useState(false)
    const [importModal, setImportModal] = useState(false);
    const [courseCategory, setCourseCategory] = useState()
    const [error, setError] = useState('')

    const { users } = useSelector(state => {
        return {
            users: state.users,
        };
    });

    const postcategorydata = useSelector((state) => state.category.postcategoryData)
    const editcategoryData = useSelector((state) => state.category.editcategoryData)
    // const postStateError = useSelector((state) => state.category.postStateErr)
    const postcategoryError = useSelector((state) => state.category.postcategoryError)
    const editCategoryError = useSelector((state) => state.category.editCategoryError)
    const importCourseCategory = useSelector((state) => state.category.importCourseCategoryData);
    const importCourseCategoryError = useSelector((state) => state.category.importCourseCategoryError);
    const getcategoryData = useSelector((state) => state.category.categoryData)

    useEffect(() => {
        if (postcategorydata && postcategorydata.status === 200) {
            dispatch(postCategorySuccess(null))
            toast.success("Category added");
        }
    }, [postcategorydata])

    useEffect(() => {
        if (postcategoryError) {
            dispatch(postCategoryDataErr(null))
            toast.error("Somthing went wrong");
        }
    }, [postcategoryError])

    useEffect(() => {
        if (editcategoryData && editcategoryData.status === 200) {
            dispatch(editCategorySuccess(null))
            toast.success("Category updated ");
            //toastAssetsAdd(true)
            //onHide()
        }
        // else if(editSchemedata && editSchemedata.data && editSchemedata.data.isActive === true){
        //   dispatch(editSchemeSuccess(null))
        //   toast.success("Jobs Update successful");
        // }
    }, [editcategoryData])

    useEffect(() => {
        if (editCategoryError) {
            dispatch(editcategoryErr(null))
            toast.error("Somthing went wrong");
        }
    }, [editCategoryError])

    useEffect(() => {
        if (importCourseCategory && importCourseCategory.status === 200) {
            toast.success("Category imported");
        } else if (importCourseCategory && importCourseCategory.status !== 200) {
            toast.error("Somthing went wrong");
        }
    }, [importCourseCategory])

    useEffect(() => {
        if (importCourseCategoryError) { //
            dispatch(importCourseCategoryInBulkErr(null))
            toast.error("Somthing went wrong");
        }
    }, [importCourseCategoryError])


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        form.resetFields(); // for blank field
        setIsModalVisible(false);
        setNameTog(false)
        setDataForEdit(null)
        setError('')
    };

    const newCourseCategory = dataForDelete => {
        const newVal = ApiPost(`course/editCategory?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, dataForDelete)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(getCategoryData())
                }
                return res
            })
        return newVal
    }

    const onDelete = async (id) => {
        let dataForDelete = getcategoryData && getcategoryData.data && getcategoryData.data.find((item) => item.id === id)
        if (dataForDelete) {
            delete dataForDelete.key
            delete dataForDelete.id
            dataForDelete = {
                ...dataForDelete,
                categoryId: id,
                isActive: false,
                isDeleted: true
            }
            // dispatch(editCategoryData(dataForDelete))
            const deleteCourseCategory = await newCourseCategory(dataForDelete)
            if (deleteCourseCategory.status === 200) {
                toast.success("Category deleted")
            }
        }
    }

    const onEdit = (id) => {
        let dataForEdit = getcategoryData && getcategoryData.data && getcategoryData.data.find((item) => item.id === id)
        if (dataForEdit) {
            setDataForEdit(dataForEdit)
            form.setFieldsValue({
                ...dataForEdit,
                name: dataForEdit.name,
            })
        }
        // dispatch(editBenefitsData(dataForEdit))
        setIsModalVisible(true)
        setNameTog(true)
    }

    const validation = (data) => {
        let error = {};
        let flag = false;

        if (!data.name) {
            error.name = "Benefit type is required";
            flag = true;
        }
        setError(error);
        return flag
    }

    const handleOk = () => {
        let data = form.getFieldsValue()
        if (dataForEdit) {
            let data = form.getFieldsValue()
            delete data.key;
            data = {
                ...data,
                categoryId: dataForEdit.id,
                "isActive": true,
                "isDeleted": false
            }
            dispatch(editCategoryData(data))
            handleCancel()
        }
        else {
            if (validation(data)) {
                return
            }
            data = {
                ...data,
                key: uuid()
            }
            dispatch(postCategoryData(data))
            setIsModalVisible(false);
        }

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

    useEffect(() => {
        dispatch(getCategoryData())
    }, [])

    useEffect(() => {
        if (getcategoryData && getcategoryData.data) {
            setCourseCategory(getcategoryData.data.map((item) => {
                return {
                    Category: item.name,
                    action: (
                        <div className='active-schemes-table'>
                            <div className="table-actions">
                                <>
                                    <Button className="btn-icon" type="info" onClick={() => onEdit(item.id)} to="#" shape="circle">
                                        <FeatherIcon icon="edit" size={16} />
                                    </Button>
                                    <Button className="btn-icon" type="danger" onClick={() => onDelete(item.id)} to="#" shape="circle">
                                        <FeatherIcon icon="trash-2" size={16} />
                                    </Button>
                                </>
                            </div>
                        </div>
                    ),
                }
            }
            ))
        }
    }, [getcategoryData])

    const coursetableColumns = [
        {
            title: 'Category',
            dataIndex: 'Category',
            sorter: (a, b) => a.Category.localeCompare(b.Category),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            width: '90px',
        },
    ];

    const importCategory = () => {
        setImportModal(true);

    }

    return (
        <>
            <PageHeader
                ghost
                title="Course Category"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button className="btn-signin ml-10" type="primary" size="medium" onClick={showModal}>
                            Add category
                        </Button>
                        <Button className="btn-signin ml-10" type="primary" size="medium" onClick={importCategory}>
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
                                dataSource={courseCategory}
                                columns={coursetableColumns}
                                pagination={false}
                            />

                        </TableWrapper>
                    </UserTableStyleWrapper>
                    {/* <ProjectPagination>
                        {usersTableData.length ? (
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

            <Modal title="Course category" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}

                okText={nameTog ? "Edit" : "Add"}
            >
                <Form name="login" form={form} layout="vertical">
                    <label htmlFor="name">Type of category</label>
                    <Form.Item name="name" className='mb-0'>
                        <Input
                            placeholder="Type of category"
                            name="name"
                        />
                    </Form.Item>
                    {
                        error.name && <span style={{ color: "red" }}>{error.name}</span>
                    }
                    {/* <label htmlFor="name">Sequence</label>
                    <Form.Item name="key">
                        <Input
                            placeholder=""
                            name="key"
                        />
                    </Form.Item> */}
                </Form>

            </Modal>

            {< ImportCourseCategory
                importModal={importModal}
                handleCancel={() => setImportModal(false)}
                modaltitle="Import course category" />}
        </>
    )
}

export default CourseCategory