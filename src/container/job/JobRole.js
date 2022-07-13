import { Form, Input, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, TableWrapper } from '../styled';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobcategory, getJobroles, addJobrole, editJobrole } from '../../redux/jobs/actionCreator';
import uuid from 'react-uuid';
import { toast } from 'react-toastify';
import actions from '../../redux/jobs/actions';
import ImportJobRole from '../../components/modals/ImportJobRole';
import { ApiPost } from '../../helper/API/ApiData';

const JobRole = () => {
    const { editJobroleSuccess, editJobroleErr, addJobroleSuccess,
        addJobroleErr, addBulkJobRolesSuccess, addBulkJobRolesErr } = actions;

    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [importModal, setImportModel] = useState(false);
    const [jobRolesTableData, setJobRolesTableData] = useState([]);
    const [selectedJobRole, setSelectedJobCategory] = useState('');
    const [nameTog, setNameTog] = useState(false)
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
            toast.success("Import job role");
        }
        else if (importJobRole && importJobRole.status !== 200) {
            toast.error("Something went wrong");
        }
    }, [importJobRole])

    useEffect(() => {
        if (importJobRoleErr) {
            dispatch(addBulkJobRolesErr(null))
            toast.error("Something went wrong");
        }
    }, [importJobRoleErr])

    useEffect(() => {
        if (editJobRoleData && editJobRoleData.status === 200) {
            dispatch(editJobroleSuccess(null))
            toast.success("Job role updated");
        }
    }, [editJobRoleData])

    useEffect(() => {
        if (addJobRoledata && addJobRoledata.status === 200) {
            dispatch(addJobroleSuccess(null))
            toast.success("Job role added");
        }
    }, [addJobRoledata])

    useEffect(() => {
        if (addJobRoleError) {
            dispatch(addJobroleErr(null))
            toast.error("Something went wrong");
        }
    }, [addJobRoleError])

    useEffect(() => {
        if (editJobRoleError) {
            dispatch(editJobroleErr(null))
            toast.error("Something went wrong");
        }
    }, [editJobRoleError])

    useEffect(() => {
        dispatch(getJobcategory());
        dispatch(getJobroles());
    }, [])

    const onEdit = (id) => {
        let dataForEdit = jobRolesData && jobRolesData.find((item) => item.id === id)
        if (dataForEdit) {
            setSelectedJobCategory(dataForEdit.id)
            form.setFieldsValue({
                name: dataForEdit.name,
                jobCategoryId: dataForEdit.jobType.name,
            })
            setIsModalVisible(true);
            setNameTog(true)
        }
    }

    const newJobRole = (dataForDelete) => {
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
            const deleteJobRole = await newJobRole(dataForDelete)
            if (deleteJobRole.status === 200) {
                toast.success("Job role deleted")
            }
        }
    }

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
        setSelectedJobCategory('')
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
            error.jobCategoryId = "Jobcategory is required";
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
        if (!selectedJobRole) {
            data = {
                ...data,
                key: uuid()
            }
            dispatch(addJobrole(data))
        } else {
            data = {
                jobId: selectedJobRole,
                name: data.name,
                isActive: true,
                isDeleted: false
            }
            dispatch(editJobrole(data))
            setSelectedJobCategory('')
        }
        form.resetFields()
        setIsModalVisible(false);
        setNameTog(false)
    };

    const jobTableColumns = [
        {
            title: 'Job roles',
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
                title="Job roles"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button className="btn-signin ml-10" type="primary" size="medium" onClick={showModal}>
                            Add role
                        </Button>
                        <Button className="btn-signin ml-10" type="primary" size="medium" onClick={showImportModal}>
                            Import role
                        </Button>
                    </div>
                ]}
            />
            <Main >
                <Cards headless>
                    <UserTableStyleWrapper>
                        <TableWrapper className="table-responsive pb-30">
                            <Table
                                // rowSelection={rowSelection}
                                dataSource={jobRolesTableData}
                                columns={jobTableColumns}
                                pagination={false}
                            />

                        </TableWrapper>
                    </UserTableStyleWrapper>
                </Cards>
            </Main>

            <Modal title="Job role" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}
                okText={nameTog ? "Edit" : "Add"}>
                <Form name="login" form={form} layout="vertical">
                    <label>Job category</label>
                    <Form.Item name="jobCategoryId" className='mb-0'>
                        <Select size="large" placeholder="Select category" className="sDash_fullwidth-select">
                            {jobData?.data && jobData?.data?.map((items) => (
                                <Option value={items.id}>{items.name} </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {error?.jobCategoryId && <span style={{ color: "red" }}>{error.jobCategoryId}</span>}
                </Form>
                <Form name="login" form={form} layout="vertical" style={{ marginTop: '15px' }}>
                    <label htmlFor="name" className='mt-3'>Job role name</label>
                    <Form.Item name="name" className='mb-0'>
                        <Input
                            placeholder="Enter job role name"
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