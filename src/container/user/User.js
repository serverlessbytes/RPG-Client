import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { ListButtonSizeWrapper, Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Col, Form, Input, Row, Select, Table, Tabs } from 'antd';
import { UserTableStyleWrapper } from '../pages/style';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useRouteMatch } from 'react-router-dom';
import { editSchemeData, getSchemecategory, getSchemeData } from '../../redux/schemes/actionCreator';
import moment from 'moment';
import { getBenefitsData } from '../../redux/benefitsType/actionCreator';
import { editProfile, getAllUser } from '../../redux/users/actionCreator';

const User = () => {

    const { path } = useRouteMatch();
    let history = useHistory();
    let dispatch = useDispatch();
    const [usertable, setUsertable] = useState([]) //set data



    const [status, setStatus] = useState("active")
    const callback = (key) => {
        setStatus(key)
    }
    const [perPage, setPerPage] = useState(10)
    const [pageNumber, setPageNumber] = useState(1)
    const [userType, setUserType] = useState('USER')

    const selectValue = (e, name) => {
        if (name === 'userType') {
            setUserType(e)
        }
    }

    const onApply = () => {
        dispatch(getAllUser(perPage, pageNumber, status, userType))
    }


     const getAllUsers = useSelector((state) => state.users.getAllUser)

     useEffect(() => {
        console.log("status", status);
    }, [status])
    // const schemeData = useSelector((state) => state.scheme.schemecatogeryData)

    const reDirect = () => {
        history.push(`${path}/adduser`);
    }

    const onEdit = (id) => {
        history.push(`${path}/adduser?id=${id}`)
    }

    const onDelete = (id) => {
        let userForDelete = getAllUsers && getAllUsers.data&&getAllUsers.data.data.find(item => item.id === id)
        
        if (userForDelete) {
            //delete userForDelete.key
            //delete userForDelete.updatedAt
            //delete userForDelete.avatar,
            userForDelete = {
                ...userForDelete,
               
                id :userForDelete.id,
                isActive: false,
                isDeleted: true,
                avatar:"dfd",
            }
            console.log("userForDelete",userForDelete)
            dispatch(editProfile(userForDelete))
        }
    }
    const { TabPane } = Tabs;

    const { Option } = Select;
    const usersTableData = [];

    useEffect(() => {
        if (getAllUsers && getAllUsers.data) {
            console.log("getAllUsers",getAllUsers)
          setUsertable(getAllUsers.data?.data?.map(item => {
             
            return ({
              name: item.name,
              email: item.email,
              phone: item.phone,
              userType: item.userType,
              avatar : "",
              action: (
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
              ),
            });
          })
          )
        }
      }, [getAllUsers])
      useEffect(()=>{ console.log("usertable",usertable)},[usertable])
    const usersTableColumns = [

        // {
        //     title: 'Sequence',
        //     dataIndex: 'Sequence',
        //     sorter: (a, b) => a.Sequence.length - b.Sequence.length,
        //     sortDirections: ['descend', 'ascend'],
        // },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.SchemeName.length - b.SchemeName.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'UserType',
            dataIndex: 'userType',
        },
        // {
        //     title: 'Location',
        //     dataIndex: 'Location',
        //     sorter: (a, b) => a.status.length - b.status.length,
        //     sortDirections: ['descend', 'ascend'],
        // },
        // {
        //     title: 'Last Updated',
        //     dataIndex: 'LastUpdated',
        // },
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
                title="Users"
                buttons={[
                    <div className="page-header-actions">
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
                            <Row gutter={30}>
                                <Col md={6} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item name="basic-select" label="Users Type">
                                            <Select size="large" placeholder="Select Category" className="sDash_fullwidth-select" value={userType} name="userType" onChange={(e) => selectValue(e, "userType")}>
                                                <option value={"USER"}>USER</option>
                                                <option value={"PARTNER"}>PARTNER</option>
                                                <option value={"EMPLOYER"}>EMPLOYER</option>
                                                <option value={"ADMIN"}>ADMIN</option>
                                                <option value={"SUPERADMIN"}>SUPERADMIN</option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col md={6} xs={24} className="mb-25">
                                    <ListButtonSizeWrapper>
                                        <Button size="small" type="primary" onClick={(e) => onApply(e)}>
                                            Apply
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
                                <TabPane tab="Active Schemes" key="active">
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive">

                                            <Form name="sDash_select" layout="vertical">
                                                <Form.Item name="search" label="">
                                                    <Input placeholder="search" style={{ width: 200 }} />
                                                </Form.Item>
                                            </Form>

                                            <Table
                                                // rowSelection={rowSelection}
                                                dataSource={usertable}
                                                columns={usersTableColumns}
                                                pagination={{
                                                    defaultPageSize: getAllUsers?.per_page,
                                                    total: getAllUsers?.page_count,
                                                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                                    onChange: (page, pageSize) => {
                                                        setPageNumber(page);
                                                        setPerPage(pageSize)
                                                    }
                                                }}
                                            />
                                        </TableWrapper>
                                    </UserTableStyleWrapper>
                                </TabPane>
                                <TabPane tab="Inactive Schemes" key='inactive'>
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive">

                                            <Form name="sDash_select" layout="vertical">
                                                <Form.Item name="search" label="">
                                                    <Input placeholder="search" style={{ width: 200 }} />
                                                </Form.Item>
                                            </Form>

                                            <Table
                                                // rowSelection={rowSelection}
                                                dataSource={usertable}
                                                columns={usersTableColumns.filter(item => item.title !== "Actions")}
                                                pagination={{
                                                    defaultPageSize: getAllUsers?.per_page,
                                                    total: getAllUsers?.page_count,
                                                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                                    onChange: (page, pageSize) => {
                                                        setPageNumber(page);
                                                        setPerPage(pageSize)
                                                    }
                                                    // defaultPageSize: 5,
                                                    // total: usersTableData.length,
                                                    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
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

export default User