import { Button, Checkbox, Col, Form, Row, Select, Table, Tabs } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Cards } from '../../components/cards/frame/cards-frame';
import SampleCardSix from '../../components/cards/sampleCard/SampleCardSix';
import { PageHeader } from '../../components/page-headers/page-headers';
import { cardSix } from '../../demoData/sampleCards.json';
import { getJobApplication, getJobroles, getJobcategory, updateIsSelectedJobApplication, updateIsHired } from '../../redux/jobs/actionCreator';
import { UserTableStyleWrapper } from '../pages/style';
import { ListButtonSizeWrapper, Main, TableWrapper } from '../styled';
import FeatherIcon from 'feather-icons-react';
import { useHistory, useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import actions from "../../redux/jobs/actions";

const JobApplication = () => {

    const dispatch = useDispatch();
    const { path } = useRouteMatch();
    const history = useHistory();
    const { addJobApplicationSuccess, addJobApplicationErr } = actions;
    const { TabPane } = Tabs;

    const [status, setStatus] = useState('all');
    const [jobApplicatiobtable, setjobApplicatiobtable] = useState([]); //set data
    const [perPage, setPerPage] = useState(20) // forpagination
    const [pageNumber, setPageNumber] = useState(1)
    const [jobApplication, setJobApplication] = useState({
        jobCategory: "",
        jobRole: "",
    })

    const getJobApplicationData = useSelector((state) => state.job.getJobApplicationData)
    const jobRolesData = useSelector((state) => state.job.jobRoleData)
    const jobcatogerydata = useSelector((state) => state.job.jobCatogeryData)
    const addJobsApplicationdata = useSelector((state) => state.job.addJobsApplicationData)
    const addJobsApplicationError = useSelector((state) => state.job.addJobsApplicationErr)

    const callback = (key) => {
        setStatus(key);
        setPageNumber(1)
    }

    useEffect(() => {
        if (addJobsApplicationdata && addJobsApplicationdata.status === 200) {
            dispatch(addJobApplicationSuccess(null))
            toast.success("Jobs Application Add successful")
        }
        else if (addJobsApplicationdata && addJobsApplicationdata.status !== 200) {
            toast.error("Something Wrong");
        }
    }, [addJobsApplicationdata])

    useEffect(() => {
        if (addJobsApplicationError) {
            dispatch(addJobApplicationErr(null))
            toast.error("Something Wrong")
        }
    }, [addJobsApplicationError])

    useEffect(() => {
        if (status !== "all") {
            dispatch(getJobApplication(perPage, pageNumber, status))
        }
        else {
            dispatch(getJobApplication(perPage, pageNumber))
        }
    }, [perPage, pageNumber, status])

    useEffect(() => {
        dispatch(getJobroles());
    }, [])

    useEffect(() => {
        dispatch(getJobcategory());
    }, [])

    const onselect = (id, selected) => {
        dispatch(updateIsSelectedJobApplication(id, !selected))
    }

    const onHired = (id, hired) => {
        dispatch(updateIsHired(id, !hired))
    }

    const onApply = () => {
        dispatch(getJobApplication(perPage, pageNumber, "", jobApplication.jobRole, jobApplication.jobCategory))
    }

    const clearFilter = () => {
        setJobApplication({ ...jobApplication, jobCategory: "", jobRole: "" })
        dispatch(getJobApplication(perPage, pageNumber, ""))
    }

    const onChangeHandle = (e, name) => {
        if (name === 'jobCategory') {
            setJobApplication({ ...jobApplication, jobCategory: e })
        }
        else if (name === 'jobRole') {
            setJobApplication({ ...jobApplication, jobRole: e })
        }
    }

    useEffect(() => {
        if (getJobApplicationData && getJobApplicationData.data) {
            setjobApplicatiobtable(getJobApplicationData?.data?.data?.map(item => {
                return ({
                    name: item.user_details.name,
                    email: item.user_details.email,
                    phone: item.user_details.phone,
                    jobRole: item.job_details.jobRole.name,
                    Select: (
                        <div>
                            {status === "all" ?
                                <>
                                    {/* <Checkbox id='visible' name="selected" checked={state.selected} onChange={(e)=>onChangehandle(e)}></Checkbox> */}
                                    <Button
                                        className="btn-signin ml-10"
                                        type="primary"
                                        onClick={() => onselect(item.id, item.selected)}
                                    >
                                        {!item.selected ? 'Select' : 'Unselect'}
                                    </Button>
                                    {/* {item.selected === true ? <label>Selected</label> : ""} */}
                                </>
                                : status === "selected" ?
                                    <>
                                        <Button
                                            className="btn-signin ml-10"
                                            type="primary"
                                            onClick={() => onselect(item.id, item.selected)}
                                        >
                                            {!item.selected ? 'Select' : 'Unselect'}
                                        </Button>
                                        <Button
                                            className="btn-signin ml-10"
                                            type="primary"
                                            onClick={() => onHired(item.id, item.hired)}
                                        >
                                            {!item.hired ? 'Hired' : 'Unhired'}
                                        </Button>
                                        {/* {item.selected === true ? <label>Selected</label> : ""} */}
                                    </>
                                    : <Button
                                        className="btn-signin ml-10"
                                        type="primary"
                                        onClick={() => onHired(item.id, item.hired)}
                                    >
                                        {!item.hired ? 'Hired' : 'Unhired'}
                                    </Button>
                            }
                        </div>
                    ),
                    // action: (
                    //     <div className="table-actions">
                    //         <>
                    //             <Button className="btn-icon" type="info" to="#" onClick={() => onEdit(item.id)} shape="circle">
                    //                 <FeatherIcon icon="edit" size={16} />
                    //             </Button>
                    //             <Button className="btn-icon" type="danger" to="#" onClick={() => onDelete(item.id)} shape="circle">
                    //                 <FeatherIcon icon="trash-2" size={16} />
                    //             </Button>
                    //             <Button className="btn-icon" type="success" onClick={() => viewJobdata(item.id)} shape="circle">
                    //                 <FeatherIcon icon="eye" size={16} />
                    //             </Button>
                    //         </>
                    //     </div>
                    // ),
                });
            })
            )
        }
    }, [getJobApplicationData])

    const jobApplicationTableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
        },
        {
            title: 'JobRole',
            dataIndex: 'jobRole',
            sorter: (a, b) => a.jobRole.localeCompare(b.jobRole),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Select',
            dataIndex: 'Select',
        },
        // {
        //     title: 'Actions',
        //     dataIndex: 'action',
        //     width: '90px',
        // },
    ];

    
    return (
        <>
            <PageHeader
                ghost
                title="Job Application"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button
                            size="small"
                            type="primary"
                            onClick={() => {
                                history.push(`addjobapplication`);
                            }}
                        >
                            Add JobApplication
                        </Button>
                    </div>,
                ]}
            />
            <Main>
                <Cards headless>
                    <Row gutter={25}>
                        <Col xs={24}>
                            <Row gutter={30}>
                                <Col md={6} xs={24} className="mb-25">
                                    <Form layout="vertical">
                                        <Form.Item label="Job Role">
                                            <Select size="large" name="jobRole" value={jobApplication.jobRole} placeholder="Select Job Role" onChange={(e) => onChangeHandle(e, 'jobRole')} >
                                                <Option value="">Select Job Role</Option>
                                                {jobRolesData && jobRolesData.map((items) => (
                                                    <Option value={items.id}>{items.name} </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={6} xs={24} className="mb-25">
                                    <Form layout="vertical">
                                        <Form.Item label="Job Category">
                                            <Select size="large" name="jobCategory" value={jobApplication.jobCategory} placeholder="Select Job Categoty" onChange={(e) => onChangeHandle(e, 'jobCategory')} >
                                                <Option value="">Select Job Categoty</Option>
                                                {jobcatogerydata && jobcatogerydata.data.map((items) => (
                                                    <Option value={items.id}>{items.name} </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={6} xs={24} className="mb-25">
                                    <ListButtonSizeWrapper>
                                        <Button type="primary" onClick={() => onApply()} >
                                            Apply
                                        </Button>
                                        <Button type="light" onClick={() => clearFilter()}>
                                            Clear
                                        </Button>
                                    </ListButtonSizeWrapper>
                                </Col>
                            </Row>
                            {/* {cardSix.map(item => {
                        return (
                            <Col key={item.id} xxl={6} md={12} sm={12} xs={24}>
                                <SampleCardSix item={item} />
                            </Col>
                        );
                    })} */}
                            <Tabs onChange={callback}>
                                <TabPane tab="All" key="all">
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive job-application">
                                            <Table
                                                dataSource={jobApplicatiobtable}
                                                columns={jobApplicationTableColumns}
                                                pagination={{
                                                    defaultPageSize: getJobApplicationData?.data.per_page,
                                                    total: getJobApplicationData?.data.page_count,
                                                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                                    onChange: (page, pageSize) => {
                                                        setPageNumber(page);
                                                        setPerPage(pageSize);
                                                    },
                                                }}
                                            />
                                        </TableWrapper>
                                    </UserTableStyleWrapper>
                                </TabPane>
                                <TabPane tab="Selected" key="selected">
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive job-application">
                                            <Table
                                                dataSource={jobApplicatiobtable}
                                                // columns={usersTableColumns.filter(item => item.title !== 'Actions')}
                                                columns={jobApplicationTableColumns}
                                                pagination={{
                                                    defaultPageSize: getJobApplicationData?.data.per_page,
                                                    total: getJobApplicationData?.data.page_count,
                                                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                                    onChange: (page, pageSize) => {
                                                        setPageNumber(page);
                                                        setPerPage(pageSize);

                                                    },
                                                }}
                                            />
                                        </TableWrapper>
                                    </UserTableStyleWrapper>
                                </TabPane>

                                <TabPane tab="Hired" key="hired">
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive job-application">
                                            <Table
                                                // rowSelection={rowSelection}
                                                dataSource={jobApplicatiobtable}
                                                // columns={usersTableColumns.filter(item => item.title !== 'Actions')}
                                                columns={jobApplicationTableColumns}
                                                pagination={{
                                                    defaultPageSize: getJobApplicationData?.data.per_page,
                                                    total: getJobApplicationData?.data.page_count,
                                                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                                    onChange: (page, pageSize) => {
                                                        setPageNumber(page);
                                                        setPerPage(pageSize);

                                                    },
                                                }}
                                            />
                                        </TableWrapper>
                                    </UserTableStyleWrapper>
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Cards>
            </Main>
        </>
    )
}

export default JobApplication