import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { ListButtonSizeWrapper, Main, ProjectPagination, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Col, Form, Input, Pagination, Row, Select, Table, Tabs } from 'antd';
import { UserTableStyleWrapper } from '../pages/style';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { allUser, editProfile, getAllUser } from '../../redux/users/actionCreator';
import { CSVLink } from 'react-csv';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import actions from '../../redux/users/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Menu, Dropdown, message, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
// import ReactStars from 'react-rating-stars-component';
// import ReactStars from "react-rating-stars-component";
import { data } from 'browserslist';

const User = () => {
  const { addUserSignupSuccess, editProfileSuccess, addUserSignupErr, editProfileErr } = actions;
  const { path } = useRouteMatch();
  let history = useHistory();
  let dispatch = useDispatch();
  const CSVLinkRef = useRef(null);
  const { Option } = Select;
  const usersTableData = [];

  const [usertable, setUsertable] = useState([]); //set data
  const [state, setState] = useState([]); //set data for export
  const [state2, setState2] = useState([]); //set data
  const [status, setStatus] = useState('active');
  const [perPage, setPerPage] = useState(20); // forpagination
  const [pageNumber, setPageNumber] = useState(1);
  const [userType, setUserType] = useState('');
  const [exportTog, setExportTog] = useState(false);

  const getAllUsers = useSelector(state => state.users.getAllUser);
  const alluser = useSelector(state => state.users.allUser);
  const addUserSignupData = useSelector(state => state.users.addUserSignupData);
  const userSignupError = useSelector(state => state.users.userSignupErr);
  const editProfileData = useSelector(state => state.users.editProfileData);
  const editProfileError = useSelector(state => state.users.editProfileErr);

  useEffect(() => {
    if (addUserSignupData && addUserSignupData.status === 200) {
      dispatch(addUserSignupSuccess(null));
      toast.success('User Add successful');
      //toastAssetsAdd(true)
      //onHide()
    }
  }, [addUserSignupData]);

  useEffect(() => {
    if (userSignupError) {
      dispatch(addUserSignupErr(null));
      toast.error('Something Wrong');
    }
  }, [userSignupError]);

  useEffect(() => {
    if (editProfileData && editProfileData.status === 200) {
      dispatch(editProfileSuccess(null));
      toast.success('User Updated successful');
      //toastAssetsAdd(true)
      //onHide()
    }
  }, [editProfileData]);

  useEffect(() => {
    if (editProfileError) {
      dispatch(editProfileErr(null));
      toast.error('Something Wrong');
    }
  }, [editProfileError]);

  const callback = key => {
    setStatus(key);
    setPageNumber(1);
  };

  useEffect(() => {
    if (state.length && exportTog) {
      CSVLinkRef?.current?.link.click();
      toast.success('User data exported successfully');
    } else if (exportTog) {
      toast.success('No user data for export');
    }
  }, [state]);

  const selectValue = (e, name) => {
    if (name === 'userType') {
      setUserType(e);
    }
  };
  useEffect(() => {
    if (status) {
      dispatch(getAllUser(perPage, pageNumber, status, userType));
    }
  }, [perPage, pageNumber, status]);

  const onApply = () => {
    dispatch(getAllUser(perPage, pageNumber, status, userType));
  };

  const onClear = () => {
    setUserType('', 'userType');
    dispatch(getAllUser(perPage, pageNumber, status, ''));
  };

  const reDirect = () => {
    history.push(`${path}/adduser`);
  };

  const onEdit = id => {
    history.push(`${path}/adduser?id=${id}`);
  };

  useEffect(() => {
    if (alluser?.data?.data) {
      setState(alluser.data.data); //set a state for export excel
    }
  }, [alluser]);

  const newUser = userForDelete => {
    const newVal = ApiPost(`user/auth/editProfile?id=${id}`, userForDelete).then(res => {
      if (res.status === 200) {
        dispatch(allUser());
      }
      return res;
    });
    return newVal;
  };

  const onDelete = async id => {
    let userForDelete = getAllUsers && getAllUsers.data && getAllUsers.data.data.find(item => item.id === id);
    if (userForDelete) {
      //delete userForDelete.key
      //delete userForDelete.updatedAt
      //delete userForDelete.avatar,
      userForDelete = {
        ...userForDelete,

        id: userForDelete.id,
        isActive: false,
        isDeleted: true,
        avatar: 'dfd',
      };
      console.log('userForDelete', userForDelete);
      dispatch(editProfile(userForDelete));
      const deleteUser = await newUser(userForDelete);
      if (deleteUser.status === 200) {
        toast.success('User delete successful');
      }
    }
  };

  const activeUser = data => {
    const newVal = ApiPost(`user/auth/editProfile?id=${id}`, data).then(res => {
      if (res.status === 200) {
        dispatch(allUser());
      }
      return res;
    });
    return newVal;
  };
  const onActive = async id => {
    let users = getAllUsers && getAllUsers.data && getAllUsers.data.data.find(item => item.id === id);
    let data = {
      avatar: users.avatar,
      email: users.email,
      id: id,
      isActive: true,
      isDeleted: false,
      name: users.name,
      phone: users.phone,
      userType: users.userType,
    };
    const restoreUsre = await activeUser(data);
    if (restoreUsre.status === 200) {
      toast.success(' User active successful');
    }
    // dispatch(editProfile(data))
  };
  const { TabPane } = Tabs;

  useEffect(() => {
    if (getAllUsers && getAllUsers.data) {
      setUsertable(
        getAllUsers.data?.data?.map(item => {
          return {
            name: item.name,
            email: item.email,
            phone: item.phone,
            userType: item.userType,
            avatar: '',
            action: (
              <div className="table-actions">
                {status === 'active' ? (
                  <>
                    <Button className="btn-icon" type="info" to="#" onClick={() => onEdit(item.id)} shape="circle">
                      <FeatherIcon icon="edit" size={16} />
                    </Button>
                    <Button className="btn-icon" type="danger" to="#" onClick={() => onDelete(item.id)} shape="circle">
                      <FeatherIcon icon="trash-2" size={16} />
                    </Button>
                  </>
                ) : (
                  <Button className="btn-icon" type="danger" to="#" onClick={() => onActive(item.id)} shape="circle">
                    <FeatherIcon icon="rotate-ccw" size={16} />
                  </Button>
                )}
              </div>
            ),
          };
        }),
      );
    }
  }, [getAllUsers]);
  const usersTableColumns = [
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
    dispatch(allUser(userType));
    setExportTog(true);
  };
  const allexPortuser = () => {
    setExportTog(true);
    ApiGet(`user/auth/allUsers`).then(res => {
      setState(res?.data?.data);
    });
  };

  const onClick = ({ key }) => {
    if (key == 'exportUser') {
      exPortuser();
    }
    if (key == 'exportAllUser') {
      allexPortuser();
    }
    if (key == 'addUser') {
      reDirect();
    }
  };

  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: 'Export User',
          key: 'exportUser',
        },
        {
          label: 'Export All User',
          key: 'exportAllUser',
        },
        {
          label: 'Add User',
          key: 'addUser',
        },
      ]}
    />
  );

  return (
    <>
      <PageHeader
        ghost
        title="Users"
        buttons={[
          <div className="page-header-actions">
            {/* <Button onClick={exPortuser} size="small" type="info">
                            Export User
                        </Button>
                        <Button onClick={allexPortuser} size="small" type="info">
                            Export All User
                        </Button>
                        <Button onClick={reDirect} size="small" type="primary">
                            Add User
                        </Button>
                        <CSVLink data={state} ref={CSVLinkRef} filename="User.csv" style={{ opacity: 0 }}></CSVLink> */}
            {/* <Button size="small" type="warning">
                            Deactivate All Schemes
                        </Button> */}
            <Dropdown overlay={menu} trigger="click">
              <a onClick={e => e.preventDefault()}>
                <Space>
                  Click menu item
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <CSVLink
              // headers={header}
              data={state}
              ref={CSVLinkRef}
              filename="User.csv"
              style={{ opacity: 0 }}
            ></CSVLink>
          </div>,
        ]}
      />
      <Main>
        <Cards headless>
          <Row gutter={15}>
            <Col xs={24}>
              <Row gutter={30}>
                <Col md={6} xs={24} className="mb-25">
                  <Form name="sDash_select" layout="vertical">
                    <Form.Item label="Users Type">
                      <Select
                        size="large"
                        value={userType}
                        placeholder="Select"
                        className={userType ? 'sDash_fullwidth-select' : 'select-option-typ-placeholder'}
                        name="userType"
                        onChange={e => selectValue(e, 'userType')}
                      >
                        <option value={''}>Select User</option>
                        <option value={'USER'}>USER</option>
                        <option value={'PARTNER'}>PARTNER</option>
                        <option value={'EMPLOYER'}>EMPLOYER</option>
                        <option value={'ADMIN'}>ADMIN</option>
                        <option value={'SUPERADMIN'}>SUPERADMIN</option>
                      </Select>
                    </Form.Item>
                  </Form>
                </Col>
                <Col md={6} xs={24} className="mb-25">
                  <ListButtonSizeWrapper>
                    <Button size="small" type="primary" onClick={e => onApply(e)}>
                      Apply
                    </Button>
                    <Button size="small" type="light" onClick={() => onClear()}>
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
                      {/* --- search bar --- */}
                      {/* <Form name="sDash_select" layout="vertical">
                                                <Form.Item name="search" label="">
                                                    <Input placeholder="search" style={{ width: 200 }} />
                                                </Form.Item>
                                            </Form> */}

                      <Table
                        // rowSelection={rowSelection}  
                        dataSource={usertable}
                        columns={usersTableColumns}
                        pagination={{
                          defaultPageSize: getAllUsers?.data.per_page,
                          total: getAllUsers?.data.page_count,
                          // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                          onChange: (page, pageSize) => {
                            setPageNumber(page);
                            setPerPage(pageSize);
                          },
                        }}
                      // size="middle"
                      // pagination={false}
                      />
                    </TableWrapper>
                  </UserTableStyleWrapper>
                  {/* <ProjectPagination>
                                        <Pagination
                                            onChange={() => { }}
                                            showSizeChanger
                                            onShowSizeChange={() => { }}
                                            pageSize={10}
                                            defaultCurrent={1}
                                            total={10}
                                        />
                                    </ProjectPagination> */}
                </TabPane>
                <TabPane tab="Inactive Users" key="inactive">
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
                          // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                          onChange: (page, pageSize) => {
                            setPageNumber(page);
                            setPerPage(pageSize);
                          },
                          // defaultPageSize: 5,
                          // total: usersTableData.length,
                          // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        }}
                      // size="middle"
                      // pagination={false}
                      />
                    </TableWrapper>
                  </UserTableStyleWrapper>
                  {/* <ProjectPagination>
                                        <Pagination
                                            onChange={() => { }}
                                            showSizeChanger
                                            onShowSizeChange={() => { }}
                                            pageSize={10}
                                            defaultCurrent={1}
                                            total={10}
                                        />
                                    </ProjectPagination> */}
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </Cards>
      </Main>
    </>
  );
};

export default User;
