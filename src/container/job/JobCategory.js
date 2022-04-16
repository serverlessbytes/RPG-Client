import { Form, Input, Modal, Pagination, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, ProjectPagination, TableWrapper } from '../styled';
import FeatherIcon from 'feather-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { addJobcategory, editJobcategory, getJobcategory } from '../../redux/jobs/actionCreator';
import uuid from 'react-uuid';

const JobCategory = () => {


    const dispatch = useDispatch()
    const usersTableData = [];
    const [form] = Form.useForm()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [jobCategoryTableData, setJobCategoryTableData] = useState([]);
    const [selectedJobCategory, setSelectedJobCategory] = useState();
    const { users } = useSelector(state => {
        return {
            users: state.users,
        };
    });

    const jobData = useSelector((state) => state.job.jobCatogeryData)

    useEffect(() => {
        dispatch(getJobcategory()); 
    }, [])
    useEffect(() =>{
        console.log("jobDatajobData",jobData)
    },[jobData])

    const onEdit = (id) => {
        let dataForEdit = jobData && jobData.data && jobData.data.find((item) => item.id === id)
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
            dispatch(editJobcategory(dataForEdit))
        }
    }

    useEffect(() => {
        if (jobData && jobData.data) {
            console.log("-----",jobData)
            setJobCategoryTableData(jobData.data?
                jobData.data.map((item) => {
                  
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
    }, [jobData])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        form.resetFields()
        setIsModalVisible(false);
    };

    const handleOk = () => {
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

    users.map(user => {
        const { id, name, designation, status } = user;

        return usersTableData.push({
            Typeofbenefit: 'Agriculture & Fisheries',
            action: (
                <div className='active-jobs-table'>
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

    const jobTableColumns = [
        {
            title: 'Job Category',
            dataIndex: 'name',
            sorter: (a, b) => a.Typeofbenefit.length - b.Typeofbenefit.length,
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
                                dataSource={jobCategoryTableData}
                                columns={jobTableColumns}
                                pagination={false}
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

            </Modal>}
        </>
    )
}

export default JobCategory