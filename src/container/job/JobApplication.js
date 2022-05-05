import { Button, Col, Form, Row, Select, Table, Tabs } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Cards } from '../../components/cards/frame/cards-frame';
import SampleCardSix from '../../components/cards/sampleCard/SampleCardSix';
import { PageHeader } from '../../components/page-headers/page-headers';
import { cardSix } from '../../demoData/sampleCards.json';
import { getJobApplication,getJobroles,getJobcategory} from '../../redux/jobs/actionCreator';
import { UserTableStyleWrapper } from '../pages/style';
import { ListButtonSizeWrapper, Main, TableWrapper } from '../styled';
import FeatherIcon from 'feather-icons-react';

const JobApplication = () => {

    const dispatch = useDispatch();
    const [status, setStatus] = useState('all');
    const [jobApplicatiobtable, setjobApplicatiobtable] = useState([]); //set data
    const [perPage, setPerPage] = useState(15) // forpagination
    const [pageNumber, setPageNumber] = useState(1)


    const getJobApplicationData = useSelector((state)=>state.job.getJobApplicationData)
    const jobRolesData = useSelector((state) => state.job.jobRoleData)
    const jobcatogerydata = useSelector((state) => state.job.jobCatogeryData)

    // useEffect(() => { console.log("jobcatogerydata", jobcatogerydata) }, [jobcatogerydata])

    const callback = (key) => {
        setStatus(key);
    }

    useEffect(()=>{
        dispatch(getJobApplication(perPage,pageNumber))
    },[])

    useEffect(() => {
        dispatch(getJobroles());  
    }, [])

    useEffect(()=>{
        dispatch(getJobcategory());
    },[])

    useEffect(() => {
        if (getJobApplicationData && getJobApplicationData.data) {
            setjobApplicatiobtable(getJobApplicationData?.data?.data?.map(item => {
            console.log("item",item)
          return ({
            name: item.user_details.name,
            email: item.user_details.email,
            phone: item.user_details.phone,
            jobRole: item.job_details.jobRole.name,
            action: (
              <div className="table-actions">
                  <>
                    <Button className="btn-icon" type="info" to="#" onClick={() => onEdit(item.id)} shape="circle">
                      <FeatherIcon icon="edit" size={16} />
                    </Button>
                    <Button className="btn-icon" type="danger" to="#" onClick={() => onDelete(item.id)} shape="circle">
                      <FeatherIcon icon="trash-2" size={16} />
                    </Button>
                    <Button className="btn-icon" type="success" onClick={() => viewJobdata(item.id)} shape="circle">
                      <FeatherIcon icon="eye" size={16} />
                    </Button>
                  </>
              </div>
            ),
          });
        })
    )
    }}
      ,[getJobApplicationData])

    const jobApplicationTableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
        },
        {
            title: 'JobRole',
            dataIndex: 'jobRole',
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            width: '90px',
        },
    ];

    const { TabPane } = Tabs;
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
                            // onClick={() => {
                            //     history.push(`${path}/`);
                            // }}
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
                                    <Form name="sDash_select" layout="vertical">
                                        
                                        <Form.Item  label="Job Role">
                                            <Select size="large" value  name="jobRole" placeholder="Select Job Role">
                                            <Option value="">Select Job Role</Option>
                                                {jobRolesData && jobRolesData.map((items) => (
                                                    <Option value={items.id}>{items.name} </Option>
                                                ))}
                                            </Select>
                                        
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={6} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        
                                        <Form.Item  label="Job Category">
                                            <Select size="large" value  name="jobCategory" placeholder="Select Job Categoty">
                                            <Option value="">Select Job Category</Option>
                                                {/* {jobcatogerydata && jobcatogerydata.map((items) => (
                                                    <Option value={items.id}>{items.name} </Option>
                                                ))} */}
                                            </Select>
                                        
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={6} xs={24} className="mb-25">
                                    <ListButtonSizeWrapper>
                                        <Button size="small" type="primary" >
                                            Apply
                                        </Button>
                                        <Button size="small" type="light">
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
                            <Tabs defaultActiveKey="1" onChange={callback}>
                                <TabPane tab="All" key="all">
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive">
                                            {/* <Form name="sDash_select" layout="vertical">
                        <Form.Item name="search" label="">
                          <Input placeholder="search" style={{ width: 200 }} />
                        </Form.Item>
                      </Form> */}

                                            <Table
                                                // rowSelection={rowSelection}
                                                dataSource={jobApplicatiobtable}
                                                columns={jobApplicationTableColumns}
                                                pagination={{
                                                    // defaultPageSize: courseData?.per_page,
                                                    // defaultPageSize: courseData?.data.per_page,
                                                    //   defaultPageSize: courseData?.data.per_page,
                                                    //   total: courseData?.data.page_count,
                                                    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                                    //   onChange: (page, pageSize) => {
                                                    //     setPageNumber(page);
                                                    //     setPerPage(pageSize);
                                                    //     setExportTog(false)
                                                    //   },
                                                    // defaultPageSize: 5,
                                                    // total: usersTableData.length,
                                                    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                                }}
                                            />
                                        </TableWrapper>
                                    </UserTableStyleWrapper>
                                </TabPane>
                                <TabPane tab="Select" key="select">
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive">
                                            {/* <Form name="sDash_select" layout="vertical">
                        <Form.Item name="search" label="">
                          <Input placeholder="search" style={{ width: 200 }} />
                        </Form.Item>
                      </Form> */}

                                            <Table
                                                // rowSelection={rowSelection}
                                                dataSource={jobApplicatiobtable}
                                                // columns={usersTableColumns.filter(item => item.title !== 'Actions')}
                                                columns={jobApplicationTableColumns}
                                                pagination={{
                                                    // defaultPageSize: 5,
                                                    // total: usersTableData.length,
                                                    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                                    //defaultPageSize: courseData?.data.per_page,
                                                    //total: courseData?.data.page_count,
                                                    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                                    //   onChange: (page, pageSize) => {
                                                    //     setPageNumber(page);
                                                    //     setPerPage(pageSize);
                                                    //     setExportTog(false)
                                                    //   },
                                                }}
                                            />
                                        </TableWrapper>
                                    </UserTableStyleWrapper>
                                </TabPane>

                                <TabPane tab="Hired" key="hired">
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive">
                                            {/* <Form name="sDash_select" layout="vertical">
                        <Form.Item name="search" label="">
                          <Input placeholder="search" style={{ width: 200 }} />
                        </Form.Item>
                      </Form> */}

                                            <Table
                                                // rowSelection={rowSelection}
                                                dataSource={jobApplicatiobtable}
                                                // columns={usersTableColumns.filter(item => item.title !== 'Actions')}
                                                columns={jobApplicationTableColumns}
                                                pagination={{
                                                    // defaultPageSize: 5,
                                                    // total: usersTableData.length,
                                                    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                                    //defaultPageSize: courseData?.data.per_page,
                                                    //total: courseData?.data.page_count,
                                                    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                                    //   onChange: (page, pageSize) => {
                                                    //     setPageNumber(page);
                                                    //     setPerPage(pageSize);
                                                    //     setExportTog(false)
                                                    //   },
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