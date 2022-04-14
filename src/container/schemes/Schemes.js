import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { ListButtonSizeWrapper, Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Col, Form, Input, Row, Select, Table, Tabs } from 'antd';
import ActiveSchemesTable from './ActiveSchemesTable';
import { UserTableStyleWrapper } from '../pages/style';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useRouteMatch } from 'react-router-dom';
import { editSchemeData, getSchemeData } from '../../redux/schemes/actionCreator';
import moment from 'moment';

const Schemes = () => {

    const { path } = useRouteMatch();
    let history = useHistory();
    let dispatch = useDispatch();
    const users = useSelector((state) => state.scheme.getAllSchemeData)

    const reDirect = () => {
        history.push(`${path}/addscheme`);
    }

    const reDirectSchemes = (key) => {
        history.push(`${path}/addscheme?key=${key}`)
    }

    const deleteSchemes = (key) => {
        let userForDelete = users && users.data.find(item => item.key === key)
        if (userForDelete) {
            // console.log(userForDelete);
            delete userForDelete.key
            delete userForDelete.updatedAt
            userForDelete = {
                ...userForDelete,
                schemeBenifit: userForDelete.schemeBenifit.id,
                schemeCategory: userForDelete.schemeCategory.id,
                isActive: false,
                isDeleted: true,
            }
            dispatch(editSchemeData(userForDelete))
            // dispatch(getSchemeData(perPage, pageNumber))   
            //history.push(`/admin/scheme`)
        }
    }

    // const { Option } = Select;
    const [key, setKey] = useState("1")
    const [perPage, setPerPage] = useState(10)
    const [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {
        dispatch(getSchemeData(perPage, pageNumber))
    }, [perPage, pageNumber])
    const { TabPane } = Tabs;

    const callback = (key) => {
        setKey(key)
        console.log(key);
    }

    // const { users } = useSelector(state => {
    //     return {
    //         users: state.users,
    //     };
    // });
    // useEffect(() => {
    //     console.log("users", users)
    // }, [users])
    const { Option } = Select;
    const usersTableData = [];

    users && users.data.map((item) => {

        return usersTableData.push({

            SchemeName: item.name,
            TypeOfBenefits: item.schemeBenifit.name,
            TargetBeneficiary: item.benificiary,
            Website: item.website,
            // Location: item.locations,
            LastUpdated: moment(item.updatedAt).format("DD-MM-YYYY"),
            action: (
                <div className='active-schemes-table'>
                    <div className="table-actions">
                        <>
                            {key === "1" && <Button className="btn-icon" onClick={() => reDirectSchemes(item.key)} type="info" to="#" shape="circle">
                                <FeatherIcon icon="edit" size={16} />
                            </Button>}
                            <Button className="btn-icon" type="warning" to="#" onClick={() => deleteSchemes(item.key)} shape="circle">
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
        // {
        //     title: 'Location',
        //     dataIndex: 'Location',
        //     sorter: (a, b) => a.status.length - b.status.length,
        //     sortDirections: ['descend', 'ascend'],
        // },
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
                        {/* <Button size="small" type="link">
                            Export Schemes
                        </Button>
                        <Button size="small" type="light">
                            Import Schemes
                        </Button> */}
                        <Button onClick={reDirect} size="small" type="success">
                            Create Scheme
                        </Button>
                        {/* <Button size="small" type="warning">
                            Deactivate All Schemes
                        </Button> */}
                    </div>
                ]}
            />
            <Main >
                <Cards headless>
                    <Row gutter={15}>
                        <Col xs={24}>
                            {/* <Row gutter={30}>
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
                            </Row> */}
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
                                <TabPane tab="Active Schemes" key="1">
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
                                                    defaultPageSize: users?.per_page,
                                                    total: users?.page_count,
                                                    showTotal: (total, range) =>`${range[0]}-${range[1]} of ${total} items`,
                                                    onChange: (page, pageSize) => {
                                                        setPageNumber(page);
                                                        setPerPage(pageSize)
                                                    }
                                                }}
                                            />
                                        </TableWrapper>
                                    </UserTableStyleWrapper>
                                </TabPane>
                                {/* <TabPane tab="Inactive Schemes" key="2">
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
                                </TabPane> */}
                            </Tabs>
                        </Col>
                    </Row>
                </Cards>
            </Main>
        </>
    )
}

export default Schemes