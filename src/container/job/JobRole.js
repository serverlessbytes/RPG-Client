import { Form, Input, Modal, Pagination, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, ProjectPagination, TableWrapper } from '../styled';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { addJobcategory, editJobcategory, getJobcategory, getJobroles, addJobrole, editJobrole } from '../../redux/jobs/actionCreator';
import uuid from 'react-uuid';
import { toast } from 'react-toastify';
import actions from '../../redux/jobs/actions';
import ImportJobRole from '../../components/modals/ImportJobRole';
import { ApiPost } from '../../helper/API/ApiData';

const JobRole = () => {
    const { editJobroleSuccess, editJobroleErr, addJobroleSuccess,
        addJobroleErr, addBulkJobRolesSuccess, addBulkJobRolesErr } = actions;

    const dispatch = useDispatch()
    const usersTableData = [];
    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [importModal, setImportModel] = useState(false);
    const [jobCategoryTableData, setJobCategoryTableData] = useState([]);
    const [jobRolesTableData, setJobRolesTableData] = useState([]);
    const [selectedJobRole, setSelectedJobCategory] = useState();
    const [isDisabled, setIsDisabled] = useState(true);
    const [nameTog, setNameTog] = useState(false)
    const [jobCategoryId, setJobCategoryId] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')

    const { users } = useSelector(state => {
        return {
            users: state.users,
        };
    });

    const jobData = useSelector((state) => state.job.jobCatogeryData)
    const jobRolesData = useSelector((state) => state.job.jobRoleData)
    const editJobRoleData = useSelector((state) => state.job.editJobRoleData)
    const addJobRoledata = useSelector((state) => state.job.addJobRoleData)
    const addJobRoleError = useSelector((state) => state.job.addJobRoleError)
    const editJobRoleError = useSelector((state) => state.job.editJobRoleError)
    const importJobRole = useSelector((state) => state.job.importJobRole)
    const importJobRoleErr = useSelector((state) => state.job.importJobRoleErr)

    useEffect(() => {
        if (importJobRole && importJobRole.status === 200) {
            dispatch(addBulkJobRolesSuccess(null))
            toast.success("Import Job Role successful");
        }
        else if (importJobRole && importJobRole.status !== 200) {
            toast.error("Something wrong");
        }
    }, [importJobRole])

    useEffect(() => {
        if (importJobRoleErr) {
            dispatch(addBulkJobRolesErr(null))
            toast.error("Something wrong");
        }
    }, [importJobRoleErr])

    useEffect(() => {
        if (editJobRoleData && editJobRoleData.status === 200) {
            dispatch(editJobroleSuccess(null))
            toast.success("Job Role update successful");
        }
    }, [editJobRoleData])

    useEffect(() => {
        if (addJobRoledata && addJobRoledata.status === 200) {
            dispatch(addJobroleSuccess(null))
            toast.success("Job Role add successful");
        }
    }, [addJobRoledata])

    useEffect(() => {
        if (addJobRoleError) {
            dispatch(addJobroleErr(null))
            toast.error("Something wrong");
        }
    }, [addJobRoleError])

    useEffect(() => {
        if (editJobRoleError) {
            dispatch(editJobroleErr(null))
            toast.error("Something wrong");
        }
    }, [editJobRoleError])

    useEffect(() => {
        dispatch(getJobcategory());
        dispatch(getJobroles());
    }, [])

    useEffect(() => {
        if (!isModalVisible) {
            setIsDisabled(true)
        }
    }, [isModalVisible])

    const onEdit = (id) => {
        let dataForEdit = jobRolesData && jobRolesData.find((item) => item.id === id)
        if (dataForEdit) {
            setSelectedJobCategory(dataForEdit)
            form.setFieldsValue({
                name: dataForEdit.name,
                jobCategoryId: dataForEdit.jobType.name,
            })
            setIsModalVisible(true);
            setIsDisabled(false);
            setNameTog(true)
        }
    }

    const newJobRole = dataForDelete => {
        const newVal = ApiPost("job/editRole", dataForDelete)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(getJobroles())
                }
                return res
            })
        return newVal
    }


    const onDelete = async (id) => {
        let dataForDelete = jobRolesData && jobRolesData.find((item) => item.id === id)
        if (dataForDelete) {
            delete dataForDelete.key,
                delete dataForDelete.id,
                delete dataForDelete.jobType,
                dataForDelete = {
                    ...dataForDelete,
                    jobId: id,
                    isActive: false,
                    isDeleted: true
                }
            // dispatch(editJobrole(dataForDelete))
            const deleteJobRole = await newJobRole(dataForDelete)
            if (deleteJobRole.status === 200) {
                toast.success("Job Role delete successful")
            }
        }
    }

    useEffect(() => {
        if (jobData && jobData.Data) {
            setJobCategoryTableData(jobData.Data)
        }
    }, [])

    useEffect(() => {
        if (jobRolesData && jobRolesData.length > 0) {

            setJobRolesTableData(jobRolesData.length > 0 ?
                jobRolesData.map((item) => {
                    return {
                        ...item,
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
    }, [jobRolesData])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const showImportModal = () => {
        setImportModel(true);
    }

    const handleCancel = () => {
        form.resetFields()
        setIsModalVisible(false);
        setNameTog(false)
        setError("")
    };

    const validation = (data) => {

        let error = {};
        let flag = false;

        if (!data.name) {
            error.name = "Name is required";
            flag = true;
        }
        if (!data.jobCategoryId) {
            error.jobCategoryId = "jobCategory is required";
            flag = true;
        }
        setError(error);
        return flag
    }

    const handleOk = () => {

        let data = form.getFieldsValue()
        if (!selectedJobRole) {
            if (validation(data)) {
                return
            }
            setName(data.name)
            setJobCategoryId(data.jobCategoryId)
            data = {
                ...data,
                key: uuid()
            }
            dispatch(addJobrole(data))
        } else {
            delete selectedJobRole.key
            data = {
                jobId: selectedJobRole.id,
                name: data.name,
                isActive: true,
                isDeleted: false
            }
            dispatch(editJobrole(data))
        }
        form.resetFields()
        setSelectedJobCategory()
        setIsModalVisible(false);
        setNameTog(false)
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

    const jobTableColumns = [
        {
            title: 'Job Roles',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            width: '100px',
        },
    ];

    return (
        <>
            <PageHeader
                ghost
                title="Job Roles"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button className="btn-signin ml-10" type="primary" size="medium" onClick={showModal}>
                            Add Role
                        </Button>
                        <Button className="btn-signin ml-10" type="primary" size="medium" onClick={showImportModal}>
                            Import Role
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
                                dataSource={jobRolesTableData}
                                columns={jobTableColumns}
                                pagination={false}
                            // pagination={{
                            //     defaultPageSize: users?.per_page,
                            //     total: users?.page_count,
                            //     // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                            //     onChange: (page, pageSize) => {
                            //       setPageNumber(page);
                            //       setPerPage(pageSize);
                            //     },
                            //     // defaultPageSize: 5,
                            //     // total: usersTableData.length,
                            //     // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                            //   }}
                            />

                        </TableWrapper>
                    </UserTableStyleWrapper>
                    {/* <ProjectPagination>
                        {jobCategoryTableData.length ? (
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

            <Modal title="Job Role" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}
                okText={nameTog ? "Edit" : "Add"}>
                <Form name="login" form={form} layout="vertical">

                    <label>Job category</label>
                    <Form.Item name="jobCategoryId" className='mb-0'>
                        <Select size="large" placeholder="Select Category" className="sDash_fullwidth-select">
                            {jobData?.data && jobData?.data?.map((items) => (
                                <Option value={items.id}>{items.name} </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {error?.jobCategoryId && <span style={{ color: "red" }}>{error.jobCategoryId}</span>}



                    <label htmlFor="name">Job role name</label>
                    <Form.Item name="name" className='mb-0'>
                        <Input
                            placeholder="Enter job role name"
                        // name="name"
                        />
                    </Form.Item>
                    {error?.name && <span style={{ color: "red" }}>{error.name}</span>}

                </Form>
            </Modal>

            {importModal && <ImportJobRole modaltitle="Import Carousel" handleCancel={() => setImportModel(false)} importModel={importModal} />}

        </>
    )
}

export default JobRole