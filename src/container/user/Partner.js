import React, { useEffect, useState } from 'react'
import { Cards } from '../../components/cards/frame/cards-frame';
import FeatherIcon from 'feather-icons-react';
import { Col, PageHeader, Row, Table, Tabs } from 'antd';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, TableWrapper } from '../styled';
import { ApiPost } from '../../helper/API/ApiData';
import 'react-toastify/dist/ReactToastify.css';
import { allUser, editProfile, getAllUser } from '../../redux/users/actionCreator';
import { Button } from '../../components/buttons/buttons';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import actions from '../../redux/users/actions';

const Partner = () => {
  const { path } = useRouteMatch();
  const history = useHistory()
  const dispatch = useDispatch()

  const [status, setStatus] = useState('active');
  const [perPage, setPerPage] = useState(20); // forpagination
  const [pageNumber, setPageNumber] = useState(1);
  // const [partnerData, setPartnerData] = useState()
  const [partnertable, setPartnertable] = useState([])
  const [type, setType] = useState("PARTNER")

  const { TabPane } = Tabs;

  const callback = key => {
    setStatus(key);
    setPageNumber(1);
  };

  const partnerData = useSelector(state => state.users.getAllUser);
  const editProfileData = useSelector(state => state.users.editProfileData);

  const { editProfileSuccess } = actions;

  // const getData = () => {
  //   ApiGet(`user/auth/getAllUsers?per_page=${perPage}&page_number=${pageNumber}&status=${status}&type=PARTNER`)
  //     .then((res) => {
  //       setPartnerData(res)
  //     })
  //     .catch((err) => console.log(err))
  // }

  const onEdit = (id) => {
    history.push(`${path}/adduser?id=${id}`);
  }

  const onDelete = async id => {
    let partnerForDelete = partnerData && partnerData.data && partnerData.data.data.find(item => item.id === id);
    if (partnerForDelete) {
      partnerForDelete = {
        ...partnerForDelete,
        id: partnerForDelete.id,
        isActive: false,
        isDeleted: true,
        avatar: 'dfd',
      };
      delete partnerForDelete.userTakenRatings
      const restoreActivePartner = await activePartner(id, partnerForDelete);

      if (restoreActivePartner.status === 200) {
        toast.success("Partner deleted")
      }
    }
  }

  const activePartner = (id, dt) => {
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

  const onActive = async id => {
    let users = partnerData && partnerData.data && partnerData.data.data.find(item => item.id === id);
    let data = {
      avatar: users.avatar,
      email: users.email,
      id: users.id,
      isActive: true,
      isDeleted: false,
      name: users.name,
      phone: users.phone,
      userType: users.userType,
    };
    const restoreActivePartner = await activePartner(id, data);

    if (restoreActivePartner.status === 200) {
      toast.success("Partner actived")
    }
  };

  useEffect(() => {
    if (editProfileData && editProfileData.data && editProfileData.data.isActive === true) {
      dispatch(editProfileSuccess(null))
      toast.success("Partner Updated")
    }
  }, [editProfileData])

  useEffect(() => {
    dispatch(getAllUser(perPage, pageNumber, status, type))
  }, [perPage, pageNumber, status, type])


  useEffect(() => {
    if (partnerData && partnerData.data) {
      setPartnertable(
        partnerData.data?.data?.map(item => {
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
                  <>
                    <Button className="btn-icon" type="danger" to="#" onClick={() => onActive(item.id)} shape="circle">
                      <FeatherIcon icon="rotate-ccw" size={16} />
                    </Button>
                  </>
                )}
              </div>
            ),
          };
        }),
      );
    }
  }, [partnerData])

  const usersTableColumns = [
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
        title="Partner"
      />
      <Main>
        <Cards headless>
          <Row gutter={15}>
            <Col xs={24}>
              <Tabs onChange={callback}>
                <TabPane tab="Active partner" key="active">
                  <UserTableStyleWrapper>

                    <TableWrapper className="table-responsive">
                      <Table
                        dataSource={partnertable}
                        columns={usersTableColumns}
                        pagination={{
                          defaultPageSize: partnerData?.data.per_Page,
                          total: partnerData?.data.page_count,
                          onChange: (page, pageSize) => {
                            setPageNumber(page);
                            setPerPage(pageSize);
                          },
                        }}
                      />
                    </TableWrapper>
                  </UserTableStyleWrapper>
                </TabPane>

                <TabPane tab="Inactive partner" key="inactive">
                  <UserTableStyleWrapper>
                    <TableWrapper className="table-responsive">
                      <Table
                        dataSource={partnertable}
                        columns={usersTableColumns}
                        pagination={{
                          defaultPageSize: partnerData?.data.per_Page,
                          total: partnerData?.data.page_count,
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

export default Partner



