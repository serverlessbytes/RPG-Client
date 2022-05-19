import React, { useEffect, useState } from 'react'
import { Cards } from '../../components/cards/frame/cards-frame';
import FeatherIcon from 'feather-icons-react';
import { Col, PageHeader, Row, Table, Tabs } from 'antd';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, TableWrapper } from '../styled';
import { ApiGet } from '../../helper/API/ApiData';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../../components/buttons/buttons';
import { useHistory, useRouteMatch } from 'react-router-dom';

const Admin = () => {
  const history = useHistory()
  const { path } = useRouteMatch()
  const [status, setStatus] = useState('active');
  const [perPage, setPerPage] = useState(20); // forpagination
  const [pageNumber, setPageNumber] = useState(1);
  const [superAdminData, setSuperAdminData] = useState()
  const [superAdminTable, setSuperAdminTable] = useState([])

  const callback = key => {
    setStatus(key),
      setPageNumber(1)
  }
  const { TabPane } = Tabs

  const getData = () => {
    ApiGet(`user/auth/getAllUsers?per_page=${perPage}&page_number=${pageNumber}&status=${status}&type=SUPERADMIN`)
      .then((res) => {
        setSuperAdminData(res)
        console.log("res", res);
      })
      .catch((err) => console.log(err))
  }
  const onEdit = (id) => {
    history.push(`${path}/adduser?id=${id}`);
  }


  useEffect(() => {
    console.log("----- superadmin", superAdminData);
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
  useEffect(() => {
    getData()
  }, [perPage, pageNumber, status])


  const superAdminTableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
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
      title: 'Actions',
      dataIndex: 'action',
      width: '90px',
    },
  ];



  return (
    <>
      <PageHeader
        ghost
        title="Admin"
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
                <TabPane tab="Active Partner" key="active">
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

                <TabPane tab="Inactive Partner" key="inactive">
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

export default Admin