import React, { useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { ListButtonSizeWrapper, Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Col, Form, Input, Row, Select, Table, Tabs } from 'antd';
import ActiveSchemesTable from '../schemes/ActiveSchemesTable';
import { UserTableStyleWrapper } from '../pages/style';
import { useSelector } from 'react-redux';

const SwayamCourses = () => {

    const { Option } = Select;
    const [type, setType] = useState("Active")
    const [key, setKey] = useState("1")

    const usersTableData = [];
    const { users } = useSelector(state => {
        return {
            users: state.users,
        };
    });

    users.map(user => {

        const { id, name, designation, status } = user;
        return usersTableData.push({


            key: id,
            CourseName: 'Customer Interaction - Asking Right Questions',
            CourseCategory: 'Construction',
            CourseDuration: "	01:50",
            Certification: 'No',
            Location: "English",
            action: (
                <div className='active-schemes-table'>
                    <div className="table-actions">
                        <>

                            {key === "1" && <> <Button className="btn-icon" type="success" to="#" shape="circle">
                                <FeatherIcon icon="info" size={16} />
                            </Button>
                                <Button className="btn-icon" type="info" to="#" shape="circle">
                                    <FeatherIcon icon="edit" size={16} />
                                </Button>
                            </>}
                            <Button className="btn-icon" type="warning" to="#" shape="circle">
                                <FeatherIcon icon="file" size={16} />
                            </Button>
                        </>
                    </div>
                </div>
            ),
        });
    });

    const usersTableColumns = [

        {
            title: 'Course Name',
            dataIndex: 'CourseName',
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Course Category',
            dataIndex: 'CourseCategory',
        },
        {
            title: 'Course Duration (HH:MM)',
            dataIndex: 'CourseDuration',
        },
        {
            title: 'Certification',
            dataIndex: 'Certification',
        },
        {
            title: 'Language',
            dataIndex: 'Location',
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            width: '90px',
        },

    ];


    const { TabPane } = Tabs;

    const callback = (key) => {
        setKey(key)
        console.log(key);
    }
    return (
        <>
            <PageHeader
                ghost
                title="Courses"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" type="primary">
                            Create Course
                        </Button>
                    </div>
                ]}
            />

            <Main >
                <Cards headless>
                    <Row gutter={15}>
                        <Col xs={24}>
                            <Row gutter={30}>
                                <Col md={6} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item name="basic-select" label="Course Category">
                                            <Select size="large" className="sDash_fullwidth-select" placeholder="Select">
                                                <Option value="1">All Category</Option>
                                                <Option value="2">Healthcare</Option>
                                                <Option value="3">Retail</Option>
                                                <Option value="4">Driving</Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={6} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item name="basic-select" label="Language">
                                            <Select size="large" className="sDash_fullwidth-select" placeholder="Select Language">
                                                <Option value="1">All</Option>
                                                <Option value="2">Einglish</Option>
                                                <Option value="3">Hindi</Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={6} xs={24} className="mb-25">
                                    <ListButtonSizeWrapper>
                                        <Button size="small" type="primary">
                                            Apply
                                        </Button>
                                        <Button size="small" type="light">
                                            Clear
                                        </Button>
                                    </ListButtonSizeWrapper>
                                </Col>
                            </Row>
                            <Tabs onChange={callback}>
                                <TabPane tab="Active Courses" key="1">
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive">

                                            <Form name="sDash_select" layout="vertical">
                                                <Form.Item name="search" label="">
                                                    <Input placeholder="search" style={{ width: 200 }} />
                                                </Form.Item>
                                            </Form>

                                            <Table
                                                // rowSelection={rowSelection}
                                                dataSource={usersTableData}
                                                columns={usersTableColumns}
                                                pagination={{
                                                    defaultPageSize: 5,
                                                    total: usersTableData.length,
                                                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                                }}
                                            />
                                        </TableWrapper>
                                    </UserTableStyleWrapper>
                                </TabPane>
                                <TabPane tab="Inactive Courses" key="2">
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive">

                                            <Form name="sDash_select" layout="vertical">
                                                <Form.Item name="search" label="">
                                                    <Input placeholder="search" style={{ width: 200 }} />
                                                </Form.Item>
                                            </Form>

                                            <Table
                                                // rowSelection={rowSelection}
                                                dataSource={usersTableData}
                                                columns={usersTableColumns}
                                                pagination={{
                                                    defaultPageSize: 5,
                                                    total: usersTableData.length,
                                                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
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

export default SwayamCourses