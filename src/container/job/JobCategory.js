import { Form, Input, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, TableWrapper, } from '../styled';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { addJobcategory, editJobcategory, getJobcategory } from '../../redux/jobs/actionCreator';
import uuid from 'react-uuid';
import { toast } from 'react-toastify';
import actions from '../../redux/jobs/actions';
import { ApiPost } from '../../helper/API/ApiData';
import ImportJobCategory from '../../components/modals/ImportJobCategory';

const JobCategory = () => {
    const { editJobcategorySuccess, editJobcategoryErr, addJobcategorySuccess,
        addJobcategoryErr, } = actions;

    const dispatch = useDispatch()

    const jobData = useSelector((state) => state.job.jobCatogeryData)
    const editJobCatogeryData = useSelector((state) => state.job.editJobCatogeryData)
    const addJobCatogerydata = useSelector((state) => state.job.addJobCatogeryData)
    const importJobCategoryError = useSelector((state) => state.job.importJobCategoryError)
    const editJobCatogeryError = useSelector((state) => state.job.editJobCatogeryError)
    const importJob = useSelector((state) => state.job.importJobCategory)

    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [jobCategoryTableData, setJobCategoryTableData] = useState([]);
    const [selectedJobCategory, setSelectedJobCategory] = useState();
    const [nameTog, setNameTog] = useState(false)
    const [importModal, setImportModal] = useState(false);
    // const [error, setError] = useState({})

    const { users } = useSelector(state => {
        return {
            users: state.users,
        };
    });

    useEffect(() => {
        if (addJobCatogerydata && addJobCatogerydata.status === 200) {
            dispatch(addJobcategorySuccess(null))
            toast.success("Job Category add successful");
            //toastAssetsAdd(true)
            //onHide()
        }
    }, [addJobCatogerydata])

    useEffect(() => {
        if (importJob && importJob.status === 200) {
            toast.success("Category imported");
        }
        else if (importJob && importJob.status !== 200) {
            toast.error("Something wrong");
        }
    }, [importJob])

    useEffect(() => {
        if (importJobCategoryError) {
            dispatch(addJobcategoryErr(null))
            toast.error("Something wrong");
        }
    }, [importJobCategoryError])

    useEffect(() => {
        if (editJobCatogeryData && editJobCatogeryData.data && editJobCatogeryData.data.isActive) {
            dispatch(editJobcategorySuccess(null))
            toast.success("Job Category update successful");
        } else if (editJobCatogeryData && editJobCatogeryData.data && !editJobCatogeryData.data.isActive) {
            dispatch(editJobcategorySuccess(null))
            toast.success("Job Category delete successful");
        }
    }, [editJobCatogeryData])

    useEffect(() => {
        if (editJobCatogeryError) {
            dispatch(editJobcategoryErr(null))
            toast.error("Something wrong");
        }
    }, [editJobCatogeryError])

    useEffect(() => {
        dispatch(getJobcategory());
    }, [])

    const onEdit = (id) => {
        let dataForEdit = jobData && jobData.data && jobData.data.find((item) => item.id === id)
        if (dataForEdit) {
            setSelectedJobCategory(dataForEdit)
            form.setFieldsValue({
                ...dataForEdit,
                name: dataForEdit.name
            })
        }
        setIsModalVisible(true);
        setNameTog(true)
    }

    const newJobCategory = dataForEdit => {
        const newVal = ApiPost("job/editCategory", dataForEdit)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(getJobcategory())
                }
                return res
            })
        return newVal
    }

    const onDelete = async (id) => {
        let dataForEdit = jobData && jobData.data && jobData.data.find((item) => item.id === id)
        if (dataForEdit) {
            delete dataForEdit.key
            dataForEdit = {
                ...dataForEdit,
                isActive: false,
                isDeleted: true
            }
            // dispatch(editJobcategory(dataForEdit))
            const deleteJobcatrgory = await newJobCategory(dataForEdit)
            if (deleteJobcatrgory.status === 200) {
                toast.success("Job Category delete successful")
            }
        }
    }

    useEffect(() => {
        if (jobData && jobData.data.length > 0) {
            setJobCategoryTableData(jobData.data.length > 0 ?
                jobData.data.map((item) => {
                    return {
                        name: item.name,
                        action: (
                            <div className='active-jobs-table'>
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
                }) : [])
        }
    }, [jobData])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        form.resetFields()
        setIsModalVisible(false);
        setNameTog(false)
    };

    // const validation = () => {
    //     let error = {};
    //     let flag = false;
    //     let data = form.getFieldsValue();
    
    //     if (data === "") {
    //         error.name = "JobCategory is required";
    //         flag = true;
    //     }
    //     setError(error);
    //     return flag
    // }

    const handleOk = () => {
        // if (validation) {
        //     return;
        // }
        let data = form.getFieldsValue()
        if (!selectedJobCategory) {
            data = {
                ...data,
                key: uuid()
            }
            dispatch(addJobcategory(data))
        } else {
            delete selectedJobCategory.key
            data = {
                id: selectedJobCategory.id,
                name: data.name,
                isActive: true,
                isDeleted: false
            }
            dispatch(editJobcategory(data))
        }
        form.resetFields()
        setSelectedJobCategory()
        setIsModalVisible(false);
        setNameTog(false)
    };

    const jobTableColumns = [
        {
            title: 'Job Category',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
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
                title="Job Category"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button className="btn-signin ml-10" type="primary" size="medium" onClick={showModal}>
                            Add Category
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
                                dataSource={jobCategoryTableData}
                                columns={jobTableColumns}
                                pagination={false}
                            />
                        </TableWrapper>
                    </UserTableStyleWrapper>
                </Cards>
            </Main>

            <Modal title="Job Category" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}
                okText={nameTog ? "Edit" : "Add"}>
                <Form name="login" form={form} layout="vertical">
                    <label htmlFor="name">Type of Category</label>
                    <Form.Item name="name">
                        <Input
                            placeholder="Job Category"
                            name="name"
                        />
                    {/* {
                        error.name && <span style={{ color: "red" }}>{error.name}</span>
                    } */}
                    </Form.Item>
                </Form>
            </Modal>

            {< ImportJobCategory
                importModal={importModal}
                handleCancel={() => setImportModal(false)}
                modaltitle="Import Job Category" />}
        </>
    )
}

export default JobCategory