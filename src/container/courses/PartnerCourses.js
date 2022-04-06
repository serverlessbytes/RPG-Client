import React, { useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { ListButtonSizeWrapper, Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Col, Form, Input, Row, Select, Table, Tabs } from 'antd';
import { UserTableStyleWrapper } from '../pages/style';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const PartnerCourses = () => {

    const { Option } = Select;
    const history = useHistory()
    const { path } = useRouteMatch();
    console.log("===>path<===",path);
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
            CourseName: 'GENERAL DUTY ASSISTANT',
            CourseCategory: 'स्वास्थ्य सेवा',
            State: "महाराष्ट्र",
            CourseType: 'Offline',
            Language: "	Hindi",
            action: (
                <div className='active-schemes-table'>
                    <div className="table-actions">
                        <>
                            <Button className="btn-icon" type="success" to="#" shape="circle">
                                <FeatherIcon icon="info" size={16} />
                            </Button>
                            {/* <Button className="btn-icon" type="info" to="#" shape="circle">
                                <FeatherIcon icon="edit" size={16} />
                            </Button> */}
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
            title: 'State',
            dataIndex: 'State',
        },
        {
            title: 'Course Type',
            dataIndex: 'CourseType',
        },
        {
            title: 'Language',
            dataIndex: 'Language',
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
        //     console.log(key);
    }
    


    return (
        <>
            <PageHeader
                ghost
                title="Partner Courses"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" type="primary" onClick={()=>{history.push(`${path}/addpartnercourses`)}}>
                            Add Courses
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
                                            <Select size="large" className="sDash_fullwidth-select" placeholder="Select Category">
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
                                        <Form.Item name="basic-select" label="State">
                                            <Select size="large" className="sDash_fullwidth-select" placeholder="Select State">
                                                <Option value="1"> All India </Option>
                                                <Option value="2"> Andaman and Nicobar Islands </Option>
                                                <Option value="3"> Arunachal Pradesh </Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={6} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item name="basic-select" label="Course Type">
                                            <Select size="large" className="sDash_fullwidth-select" placeholder="Select Course Type">
                                                <Option value="1">All</Option>
                                                <Option value="2">Online</Option>
                                                <Option value="3">Offline</Option>
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
                            {/* <Row className="mb-25">
                                <Button size="small" type={type === "Active" ? "primary" : "light"} onClick={() => setType("Active")}>
                                    Active Courses
                                </Button>
                                <Button size="small" type={type === "Inactive" ? "primary" : "light"} onClick={() => setType("Inactive")}>
                                    Inactive Courses
                                </Button>
                            </Row> */}

                            <Tabs defaultActiveKey="1" onChange={callback}>
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

export default PartnerCourses