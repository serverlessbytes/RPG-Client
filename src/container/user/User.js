import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
import { allUser, editProfile, getAllUser } from '../../redux/users/actionCreator';
import { CSVLink } from 'react-csv';
import { ApiGet } from '../../helper/API/ApiData';
import actions from '../../redux/users/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const User = () => {
    const {addUserSignupSuccess,editProfileSuccess} = actions;
    const { path } = useRouteMatch();
    let history = useHistory();
    let dispatch = useDispatch();
    const CSVLinkRef = useRef(null)
    const { Option } = Select;
    const usersTableData = [];

    const [usertable, setUsertable] = useState([]) //set data
    const [state, setState] = useState([]) //set data for export
    const [state2, setState2] = useState([]) //set data
    const [status, setStatus] = useState("active")
    const [perPage, setPerPage] = useState(5)
    const [pageNumber, setPageNumber] = useState(1)
    const [userType, setUserType] = useState("")

    const getAllUsers = useSelector((state) => state.users.getAllUser)
    const alluser = useSelector((state) => state.users.allUser)
    const addUserSignupData = useSelector((state) => state.users.addUserSignupData)
    const userSignupErr = useSelector((state) => state.users.userSignupErr)
    const editProfileData = useSelector((state) => state.users.editProfileData)
    const editProfileErr = useSelector((state) => state.users.editProfileErr)

    useEffect(() => {
        console.log("editProfileData", editProfileData);
    }, [editProfileData])

    useEffect(() => {
        if (addUserSignupData && addUserSignupData.message === "user created") {
            dispatch(addUserSignupSuccess(null))
            toast.success("User Add successful");
            //toastAssetsAdd(true)
            //onHide()
        }
    }, [addUserSignupData])
 
    useEffect(()=>{
        if(userSignupErr){ 
          toast.error("Something Wrong")
        }
      },[userSignupErr])

      useEffect(() => {
        if (editProfileData && editProfileData.message === "user updated") {
            dispatch(editProfileSuccess(null))
            toast.success("User Updated successful");
            //toastAssetsAdd(true)
            //onHide()
        }
    }, [editProfileData])

    useEffect(()=>{
        if(editProfileErr){ 
          toast.error("Something Wrong")
        }
      },[editProfileErr])

    const callback = (key) => {
        setStatus(key)
        setPageNumber(1)
    }
  
    useEffect(() => {
        if (state.length) {
            CSVLinkRef?.current?.link.click()  // 
        }
        console.log("state", state);
    }, [state])

    useEffect(() => {
        console.log("state2", state2);
    }, [state2])

    const selectValue = (e, name) => {
        if (name === 'userType') {
            setUserType(e)
        }
    }
    useEffect(() => {
        if (status) {
            dispatch(getAllUser(perPage, pageNumber, status, userType));
        }
    }, [perPage, pageNumber, status]);

    const onApply = () => {
        dispatch(getAllUser(perPage, pageNumber, status, userType))
    }

    const onClear = () => {
        //console.log("-------", e)
        setUserType("", 'userType');
        dispatch(getAllUser(perPage, pageNumber, status, ""))
    }


    const reDirect = () => {
        history.push(`${path}/adduser`);
    }

    const onEdit = (id) => {
        history.push(`${path}/adduser?id=${id}`)
    }

    //setState({...state,alluser}) // all user

    useEffect(() => {
        if (alluser?.data?.data) {
            setState(alluser.data.data)  //set a state for export word

        }
    }, [alluser])

    const onDelete = (id) => {
        let userForDelete = getAllUsers && getAllUsers.data && getAllUsers.data.data.find(item => item.id === id)

        if (userForDelete) {
            //delete userForDelete.key
            //delete userForDelete.updatedAt
            //delete userForDelete.avatar,
            userForDelete = {
                ...userForDelete,

                id: userForDelete.id,
                isActive: false,
                isDeleted: true,
                avatar: "dfd",
            }
            console.log("userForDelete", userForDelete)
            dispatch(editProfile(userForDelete))
        }
    }

    const onActive = (id) => {
     let  users = getAllUsers && getAllUsers.data && getAllUsers.data.data.find((item)=>item.id === id)
         let data= {
            avatar :users.avatar,
            email :users.email,
            id:id,
            isActive:true,
            isDeleted:false,
            name:users.name,
            phone:users.phone,
            userType:users.userType,
         }
         dispatch(editProfile(data))
    }
    const { TabPane } = Tabs;

    useEffect(() => {
        if (getAllUsers && getAllUsers.data) {
            // console.log("getAllUsers", getAllUsers)
            setUsertable(getAllUsers.data?.data?.map(item => {

                return ({
                    name: item.name,
                    email: item.email,
                    phone: item.phone,
                    userType: item.userType,
                    avatar: "",
                    action: (
                        <div className="table-actions">
                            {
                                status === "active" ?
                                <>
                                <Button className="btn-icon" type="info" to="#" onClick={() => onEdit(item.id)} shape="circle">
                                    <FeatherIcon icon="edit" size={16} />
                                </Button>
                                <Button className="btn-icon" type="danger" to="#" onClick={() => onDelete(item.id)} shape="circle">
                                    <FeatherIcon icon="trash-2" size={16} />
                                </Button>
                            </>:<Button className="btn-icon" type="danger" to="#" onClick={() => onActive(item.id)} shape="circle">
                                    <FeatherIcon icon="rotate-ccw" size={16} />
                                </Button>
                            }
                            
                        </div>
                    ),
                });
            })
            )
        }
    }, [getAllUsers])
    useEffect(() => {
        console.log("usertable", usertable)
    }, [usertable])
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

    const exPortuser = () => {
        dispatch(allUser(userType))
    }
    const allexPortuser = () => {
        ApiGet(`user/auth/allUsers`).then((res) => {
            setState(res?.data?.data)
        })
    }

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
                        
                        <Button onClick={exPortuser} size="small" type="info">
                            Export User
                        </Button>
                        <Button onClick={allexPortuser} size="small" type="info">
                            Export All User
                        </Button>
                        <Button onClick={reDirect} size="small" type="primary">
                            Add User
                        </Button>
                        <CSVLink data={state} ref={CSVLinkRef} filename="User.csv" style={{ opacity: 0 }}></CSVLink>
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
                                        <Form.Item label="Users Type">
                                            <Select size="large" value={userType} placeholder="Select" className="sDash_fullwidth-select" name="userType" onChange={(e) => selectValue(e, "userType")}>
                                                <option value={""}>Select User</option>
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
                                        <Button size="small" type="light" onClick={() => onClear()} >
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
                            </Row> */}
                            {/* <ActiveSchemesTable type={type} /> */}

                            <Tabs onChange={callback}>
                                <TabPane tab="Active Users" key="active">
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
                                                    defaultPageSize: getAllUsers?.data.per_page,
                                                    total: getAllUsers?.data.page_count,
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
                                <TabPane tab="Inactive Users" key='inactive'>
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
                                                // columns={usersTableColumns.filter(item => item.title !== "Actions")}
                                                columns={usersTableColumns} 
                                                pagination={{
                                                    defaultPageSize: getAllUsers?.data.per_page,
                                                    total: getAllUsers?.data.page_count,
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