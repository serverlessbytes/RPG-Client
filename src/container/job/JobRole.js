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

const JobRole = () => {


    const dispatch = useDispatch()
    const usersTableData = [];
    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [jobCategoryTableData, setJobCategoryTableData] = useState([]);
    const [jobRolesTableData, setJobRolesTableData] = useState([]);
    const [selectedJobRole, setSelectedJobCategory] = useState();
    const { users } = useSelector(state => {
        return {
            users: state.users,
        };
    });

    const jobData = useSelector((state) => state.job.jobcatogeryData)
    const jobRolesData = useSelector((state) => state.job.jobRoleData)
    console.log(jobData)
    console.log('jobRoles' , jobRolesData)

    useEffect(() => {
        dispatch(getJobcategory());
        dispatch(getJobroles());
    }, [])

    const onEdit = (id) => {
        let dataForEdit = jobRolesData  && jobRolesData.find((item) => item.id === id)
        if (dataForEdit) {
            setSelectedJobCategory(dataForEdit)
            form.setFieldsValue({
                name: dataForEdit.name
            })
            setIsModalVisible(true);
        }
    }

    const onDelete = (id) => {
        let dataForEdit = jobData && jobData.data && jobData.data.find((item) => item.id === id)
        if (dataForEdit) {
            delete dataForEdit.key
            dataForEdit = {
                ...dataForEdit,
                isActive: false,
                isDeleted: true
            }
            dispatch(editJobrole(dataForEdit))
        }
    }

    useEffect(() => {
     if(jobData && jobData.Data){
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
                                    <FeatherIcon icon="x-circle" size={16} />
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

    const handleCancel = () => {
        form.resetFields()
        setIsModalVisible(false);
    };

    const handleOk = () => {
        let data = form.getFieldsValue()
        console.log(data)
        if (!selectedJobRole) {
            data = {
                ...data,
                key: uuid()
            }
            dispatch(addJobrole(data))
        } else {
            delete selectedJobRole.key
            data = {
                id: selectedJobRole.id,
                name: data.name,
                isActive: true,
                isDeleted: false
            }
            dispatch(editJobrole(data))
        }
        form.resetFields()
        setIsModalVisible(false);
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
            
            sorter: (a, b) => a.name.length - b.name.length,
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
                    </div>
                ]}
            />
            <Main >
                <Cards headless>
                    <UserTableStyleWrapper>
                        <TableWrapper className="table-responsive pb-30">

                            <Form name="sDash_select" layout="vertical">
                                <Form.Item name="search" label="">
                                    <Input placeholder="search" style={{ width: 200 }} />
                                </Form.Item>
                            </Form>

                            <Table
                                // rowSelection={rowSelection}
                                dataSource={jobRolesData}
                                columns={jobTableColumns}
                                pagination={true}
                            />

                        </TableWrapper>
                    </UserTableStyleWrapper>
                    <ProjectPagination>
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
                    </ProjectPagination>
                </Cards>
            </Main>

            {isModalVisible && <Modal title="Add Job Category" visible={isModalVisible} onOk={() => handleOk()} onCancel={() => handleCancel()}>
                <Form name="login" form={form} layout="vertical">
                <Form.Item initialValue="Select a job category " name="jobCategoryId">
                                <Select size="large" placeholder="Select Category"  className="sDash_fullwidth-select">
                                    {jobData?.data && jobData?.data?.map((items) => (
                                        <Option value={items.id}>{items.name} </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                    <label htmlFor="name">Type of role</label>
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

            </Modal>}
        </>
    )
}

export default JobRole