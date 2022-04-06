import React, { useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { ListButtonSizeWrapper, Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Col, Form, Input, Row, Select, Table, Tabs } from 'antd';
import ActiveSchemesTable from './ActiveSchemesTable';
import { UserTableStyleWrapper } from '../pages/style';
import { useSelector } from 'react-redux';

const Schemes = () => {

    // const { Option } = Select;
    const [key, setKey] = useState("1")

    const { TabPane } = Tabs;

    const callback = (key) => {
        setKey(key)
        console.log(key);
    }

    const { users } = useSelector(state => {
        return {
            users: state.users,
        };
    });

    const { Option } = Select;
    const usersTableData = [];

    users.map(user => {
        const { id, name, designation, status } = user;

        return usersTableData.push({


            key: id,
            // user: name,
            // Sequence: (
            //     <div className="user-info">
            //         <Form name="sDash_select" layout="vertical">
            //             <Form.Item name="basic-select" label="">
            //                 <Select className="sDash_fullwidth-select" style={{ width: 80, }} placeholder="1">
            //                     <Option value="1">1</Option>
            //                     <Option value="2">2</Option>
            //                     <Option value="3">639</Option>
            //                 </Select>
            //             </Form.Item>
            //         </Form>
            //     </div>
            // ),
            SchemeName: 'Mahatma Gandhi National',
            TypeOfBenefits: 'Business Development',
            TargetBeneficiary: "Target Beneficiary",
            Website: 'Website',
            Location: "Location",
            LastUpdated: 'Last Updated',
            action: (
                <div className='active-schemes-table'>
                    <div className="table-actions">
                        <>
                            {key === "1" && <Button className="btn-icon" type="info" to="#" shape="circle">
                                <FeatherIcon icon="edit" size={16} />
                            </Button>}
                            <Button className="btn-icon" type="warning" to="#" shape="circle">
                                <FeatherIcon icon="file" size={16} />
                            </Button>
                            {key === '1' && <Button className="btn-icon" type="success" to="#" shape="circle">
                                <FeatherIcon icon="star" size={16} />
                            </Button>}
                        </>
                    </div>
                </div>
            ),
        });
    });


    const usersTableColumns = [

        // {
        //     title: 'Sequence',
        //     dataIndex: 'Sequence',
        //     sorter: (a, b) => a.Sequence.length - b.Sequence.length,
        //     sortDirections: ['descend', 'ascend'],
        // },
        {
            title: 'Scheme Name',
            dataIndex: 'SchemeName',
            sorter: (a, b) => a.SchemeName.length - b.SchemeName.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Type Of Benefits',
            dataIndex: 'TypeOfBenefits',
        },
        {
            title: 'Target Beneficiary',
            dataIndex: 'TargetBeneficiary',
        },
        {
            title: 'Website',
            dataIndex: 'Website',
        },
        {
            title: 'Location',
            dataIndex: 'Location',
            sorter: (a, b) => a.status.length - b.status.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Last Updated',
            dataIndex: 'LastUpdated',
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            width: '90px',
        },

    ];

    const rowSelection = {
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };


    return (
        <>
            <PageHeader
                ghost
                title="Schemes"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" type="link">
                            Export Schemes
                        </Button>
                        <Button size="small" type="light">
                            Import Schemes
                        </Button>
                        <Button size="small" type="success">
                            Create Scheme
                        </Button>
                        <Button size="small" type="warning">
                            Deactivate All Schemes
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
                                        <Form.Item name="basic-select" label="Language">
                                            <Select size="large" className="sDash_fullwidth-select" placeholder="Select">
                                                <Option value="1">All </Option>
                                                <Option value="2">Einglish</Option>
                                                <Option value="3">Hindi</Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={6} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item name="basic-select" label="Type of Benefits">
                                            <Select size="large" className="sDash_fullwidth-select" placeholder="Select">
                                                <Option value="1">All</Option>
                                                <Option value="2">  Food, Shelter & Financial aid </Option>
                                                <Option value="3"> Education & Training </Option>
                                                <Option value="4">  Agriculture & Fisheries </Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={6} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item name="basic-select" label="Location">
                                            <Select size="large" className="sDash_fullwidth-select" placeholder="Select">
                                                <Option value="2">  All India </Option>
                                                <Option value="3">  Andra Pradesh  </Option>
                                                <Option value="4">  Assam  </Option>
                                                <Option value="5">  Chandigarh  </Option>
                                                <Option value="6">  Dadar and Nagar Haveli   </Option>
                                                <Option value="7">   Daman and Diu   </Option>
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
                                    Active Schemes
                                </Button>
                                <Button size="small" type={type === "Inactive" ? "primary" : "light"} onClick={() => setType("Inactive")}>
                                    Inactive Schemes
                                </Button>
                            </Row>
                             <ActiveSchemesTable type ={type}/> */}

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

export default Schemes