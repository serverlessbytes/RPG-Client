import { Form, Input, Modal, Pagination, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, ProjectPagination, TableWrapper } from '../styled';
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
    } = actions;

    const [dataForEdit, setDataForEdit] = useState(); //foredit
    const dispatch = useDispatch();
    const usersTableData = [];
    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [nameTog, setNameTog] = useState(false)
    const [importModal, setImportModal] = useState(false);

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

    useEffect(() => {
        if (postcategorydata && postcategorydata.status === 200) {
            dispatch(postCategorySuccess(null))
            toast.success("Category add successful");
        }
    }, [postcategorydata])

    useEffect(() => {
        if (postcategoryError) {
            dispatch(postCategoryDataErr(null))
            toast.error("Something wrong");
        }
    }, [postcategoryError])

    useEffect(() => {
        if (editcategoryData && editcategoryData.status === 200) {
            dispatch(editCategorySuccess(null))
            toast.success("Category updated successful");
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
            toast.error("Something wrong");
        }
    }, [editCategoryError])

    useEffect(() => {
        console.log("importCourseCategory", importCourseCategory);
        if (importCourseCategory && importCourseCategory.status === 200) {
            toast.success("Category imported");
        } else if (importCourseCategory && importCourseCategory.status !== 200) {
            toast.error("Something wrong");
        }
    }, [importCourseCategory])


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        form.resetFields(); // for blank field
        setIsModalVisible(false);
        setNameTog(false)
        setDataForEdit(null)
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
                toast.success("Category deleted successful")
            }
        }
    }

    const onEdit = (id) => {
        let dataForEdit = getcategoryData && getcategoryData.data && getcategoryData.data.find((item) => item.id === id)
        // useEffect(()=>{},[dataForEdit])
        // console.log("dataForEdit",dataForEdit)
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
            data = {
                ...data,
                key: uuid()
            }
            dispatch(postCategoryData(data))
            setIsModalVisible(false);
        }

    };
    // const handleOk = () => {
    //     if (dataForEdit) {
    //         let data = form.getFieldsValue() //get value from form field
    //         //console.log("========>data<==========", data);
    //         //delete data.key;
    //         data = {
    //             ...data, 
    //             id: dataForEdit.id, 
    //             "isActive": true,
    //             "isDeleted": false
    //         }
    //         dispatch(editBenefitsData(data))
    //         console.log("data",data) 
    //     }
    //     else {
    //         let data = form.getFieldsValue()
    //         //console.log("========>data<==========", data);
    //         data = {
    //             ...data,
    //             key: uuid()
    //         }
    //         dispatch(postBenefitsData(data))
    //         console.log("data", data)
    //     }
    //     form.resetFields()
    //     setIsModalVisible(false);

    // };
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
        // console.log("getCategoryData",getCategoryData); 
    }, [])

    const getcategoryData = useSelector((state) => state.category.categoryData)
    useEffect(() => {
        console.log("getcategoryData", getcategoryData);
    }, [getcategoryData])

    getcategoryData && getcategoryData.data.map((item) => {
        // const { id, name, designation, status } = user;

        return usersTableData.push({
            Category: item.name,
            // Sequence: '7',
            action: (
                <div className='active-schemes-table'>
                    <div className="table-actions">
                        <>
                            <Button className="btn-icon" type="info" onClick={() => onEdit(item.id)} to="#" shape="circle">
                                <FeatherIcon icon="edit" size={16} />
                            </Button>
                            <Button className="btn-icon" type="danger" onClick={() => onDelete(item.id)} to="#" shape="circle">
                                <FeatherIcon icon="x-circle" size={16} />
                            </Button>
                        </>
                    </div>
                </div>
            ),
        });
    });

    const usersTableColumns = [
        {
            title: 'Category',
            dataIndex: 'Category',
            sortDirections: ['descend', 'ascend'],
        },
        // {
        //     title: 'Sequence',
        //     dataIndex: 'Sequence',
        // },
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
                            Add Category
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
                                dataSource={usersTableData}
                                columns={usersTableColumns}
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

            <Modal title="Course Category" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}

                okText={nameTog ? "Edit" : "Add"}
            >
                <Form name="login" form={form} layout="vertical">
                    <label htmlFor="name">Type of Category</label>
                    <Form.Item name="name">
                        <Input
                            placeholder=""
                            name="name"
                        />
                    </Form.Item>
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
                modaltitle="Import Course Category" />}
        </>
    )
}

export default CourseCategory