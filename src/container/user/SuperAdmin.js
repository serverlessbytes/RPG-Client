import React, { useEffect, useState } from 'react'
import { Cards } from '../../components/cards/frame/cards-frame';
import FeatherIcon from 'feather-icons-react';
import { Col, PageHeader, Row, Table, Tabs } from 'antd';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, TableWrapper } from '../styled';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../../components/buttons/buttons';
import { useHistory, useRouteMatch } from 'react-router-dom';
import actions from '../../redux/users/actions';
import { getAllUser } from '../../redux/users/actionCreator';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

const SuperAdmin = () => {
  const { TabPane } = Tabs;
  const history = useHistory();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();

  const [status, setStatus] = useState('active');
  const [perPage, setPerPage] = useState(20); // forpagination
  const [pageNumber, setPageNumber] = useState(1);
  const [superAdminTable, setSuperAdminTable] = useState([]);
  const [type, setType] = useState('SUPERADMIN');

  const { editProfileSuccess, editProfileErr } = actions;

  const superAdminData = useSelector(state => state.users.getAllUser)
  const editProfileData = useSelector(state => state.users.editProfileData)
  const editProfileError = useSelector(state => state.users.editProfileErr)

  // const getData = () => {
  //   ApiGet(`user/auth/getAllUsers?per_page=${perPage}&page_number=${pageNumber}&status=${status}&type=SUPERADMIN`)
  //     .then((res) => {
  //       setSuperAdminData(res)
  //     })
  //     .catch((err) => console.log(err))
  // }

  const callback = key => {
    setStatus(key),
      setPageNumber(1)
  }

  const onEdit = (id) => {
    history.push(`${path}/adduser?id=${id}`);
  }

  const activeSuperAdmin = (id, dt) => {
    delete dt.id;
    delete dt.userType;
    const newVal = ApiPost(`user/auth/editProfile?id=${id}`, dt)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAllUser(perPage, pageNumber, status, type))
        }
        return res
      })
    return newVal
  }

  const onDelete = async id => {
    let superAdminDataForDelete = superAdminData && superAdminData.data && superAdminData.data.data.find(item => item.id === id);

    if (superAdminDataForDelete) {
      superAdminDataForDelete = {
        ...superAdminDataForDelete,
        id: superAdminDataForDelete.id,
        isActive: false,
        isDeleted: true,
        avatar: 'dfd',
      };
      delete superAdminDataForDelete.userTakenRatings

      const restoreActiveSuperAdmin = await activeSuperAdmin(id, superAdminDataForDelete);
      if (restoreActiveSuperAdmin.status === 200) {
        toast.success("Superadmin deleted")
      }
    }
  };

  const onActive = async id => {
    let superAdmindata = superAdminData && superAdminData.data && superAdminData.data.data.find(item => item.id === id);
    let data = {
      avatar: superAdmindata.avatar,
      email: superAdmindata.email,
      id: superAdmindata.id,
      isActive: true,
      isDeleted: false,
      name: superAdmindata.name,
      phone: superAdmindata.phone,
      userType: superAdmindata.userType,
    };

    const restoreActiveSuperAdmin = await activeSuperAdmin(id, data);
    if (restoreActiveSuperAdmin.status === 200) {
      toast.success("Superadmin actived")
    }
  };

  useEffect(() => {
    if (editProfileData && editProfileData.data && editProfileData.data.isActive === true) {
      dispatch(editProfileSuccess(null))
      toast.success("Superadmin updated")
    }
  }, [editProfileData])

  useEffect(() => {
    if (editProfileError) {
      dispatch(editProfileErr(null))
      toast.error("Something went wrong")
    }
  }, [editProfileError])

  useEffect(() => {
    dispatch(getAllUser(perPage, pageNumber, status, type))
  }, [perPage, pageNumber, status, type])

  // useEffect(() => {
  //   getData()
  // }, [perPage, pageNumber, status])

  useEffect(() => {
    if (superAdminData && superAdminData.data) {
      setSuperAdminTable(
        superAdminData.data.data.map((item) => {
          return {
            name: item.name,
            email: item.email,
            phone: item.phone,
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
        })
      )

    }
  }, [superAdminData])

  const superAdminTableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
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
        title="Super admin"
      // buttons={[
      //     <div className="page-header-actions">
      //         <Button size="small" type="primary" onClick={allEmployerExport}>
      //             Export All
      //         </Button>
      //         <CSVLink data={exportEmployer} ref={CSVLinkRef} filename="Employer.csv" style={{ opacity: 0 }}></CSVLink>
      //     </div>
      // ]}
      />
      <Main>
        <Cards headless>
          <Row gutter={15}>
            <Col xs={24}>
              <Tabs onChange={callback}>
                <TabPane tab="Active Super admin" key="active">
                  <UserTableStyleWrapper>
                    <TableWrapper className="table-responsive">
                      <Table
                        dataSource={superAdminTable}
                        columns={superAdminTableColumns}
                        pagination={{
                          defaultPageSize: superAdminData?.data.per_Page,
                          total: superAdminData?.data.page_count,
                          onChange: (page, pageSize) => {
                            setPageNumber(page);
                            setPerPage(pageSize);
                          },
                        }}
                      />
                    </TableWrapper>
                  </UserTableStyleWrapper>
                </TabPane>

                <TabPane tab="Inactive Super admin" key="inactive">
                  <UserTableStyleWrapper>
                    <TableWrapper className="table-responsive">
                      <Table
                        dataSource={superAdminTable}
                        columns={superAdminTableColumns}
                        pagination={{
                          defaultPageSize: superAdminData?.data.per_Page,
                          total: superAdminData?.data.page_count,
                          onChange: (page, pageSize) => {
                            setPageNumber(page);
                            setPerPage(pageSize);
                          },
                        }}
                      />
                    </TableWrapper>
                  </UserTableStyleWrapper>
                </TabPane>
              </Tabs >
            </Col>
          </Row>
        </Cards>
      </Main>
    </>
  )
}

export default SuperAdmin