
import React, { useEffect, useState } from 'react'
import { Cards } from '../../components/cards/frame/cards-frame';
import FeatherIcon from 'feather-icons-react';
import { Col, Row, Table, Tabs } from 'antd';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, TableWrapper } from '../styled';
import { ApiGet } from '../../helper/API/ApiData';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../../components/buttons/buttons';


const Admin = () => {
    const [adminData, setAdminData] = useState()
    const [adminTable, setAdminTable] = useState()
    const [perPage, setPerPage] = useState(20); // forpagination
    const [pageNumber, setPageNumber] = useState(1);
    const [status, setStatus] = useState('active');


    const getData = () => {
        ApiGet(`user/auth/getAllUsers?per_page=${perPage}&page_number=${pageNumber}&status=${status}&type=PARTNER`)
            .then((res) => {
                setAdminData(res)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        if (adminData && adminData.data) {
            setAdminData(
                adminData.data.data.map((item) => {
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
                    }
                })
            )
        }
    }, [adminData])

    useEffect(() => {
        getData()
    }, [perPage, pageNumber, status])

    const callback = key => {
        setStatus(key);
        setPageNumber(1);
    };
    const { TabPane } = Tabs;

    const adminTableColumns = [
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
            <Main>
                <Cards headless>
                    <Row gutter={15}>
                        <Col xs={24}>
                            <Tabs onChange={callback}>
                                <TabPane tab="Active Partner" key="active">
                                    <UserTableStyleWrapper>

                                        <TableWrapper className="table-responsive">
                                            <Table
                                                dataSource={adminTable}
                                                columns={adminTableColumns}
                                                pagination={{
                                                    defaultPageSize: adminData?.data.per_Page,
                                                    total: adminData?.data.page_count,
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
                                                dataSource={adminTable}
                                                columns={adminTableColumns}
                                                pagination={{
                                                    defaultPageSize: adminData?.data.per_Page,
                                                    total: adminData?.data.page_count,
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