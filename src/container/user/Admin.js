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
import { getAllUser } from '../../redux/users/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import actions from '../../redux/users/actions';

const Admin = () => {
    const history = useHistory();
    const { TabPane } = Tabs;
    const { path } = useRouteMatch();
    const dispatch = useDispatch();

    const [status, setStatus] = useState('active');
    const [perPage, setPerPage] = useState(20); // forpagination
    const [pageNumber, setPageNumber] = useState(1);
    const [adminTable, setAdminTable] = useState([])
    const [type, setType] = useState("ADMIN")

    const { editProfileSuccess, editProfileErr } = actions;

    const adminData = useSelector(state => state.users.getAllUser)
    const editProfileData = useSelector(state => state.users.editProfileData)
    const editProfileError = useSelector(state => state.users.editProfileErr)

    const callback = key => {
        setStatus(key),
            setPageNumber(1)
    }

    // const getData = () => {
    //     ApiGet(`user/auth/getAllUsers?per_page=${perPage}&page_number=${pageNumber}&status=${status}&type=ADMIN`)
    //         .then((res) => {
    //             setAdminData(res)
    //             console.log("res", res);
    //         })
    //         .catch((err) => console.log(err))
    // }

    const onEdit = (id) => {
        history.push(`${path}/adduser?id=${id}`);
    }

    const activeAdmin = (id, dt) => {
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
        let adminDataForDelete = adminData && adminData.data && adminData.data.data.find(item => item.id === id);

        if (adminDataForDelete) {
            adminDataForDelete = {
                ...adminDataForDelete,
                id: adminDataForDelete.id,
                isActive: false,
                isDeleted: true,
                avatar: 'dfd',
            };
            delete adminDataForDelete.userTakenRatings
            // dispatch(editProfile(employerForDelete));
            // getData();
            const restoreActiveAdmin = await activeAdmin(id, adminDataForDelete);
            if (restoreActiveAdmin.status === 200) {
                toast.success("Admin deleted")
            }
        }
    };

    const onActive = async id => {
        let admindata = adminData && adminData.data && adminData.data.data.find(item => item.id === id);
        let data = {
            avatar: admindata.avatar,
            email: admindata.email,
            id: admindata.id,
            isActive: true,
            isDeleted: false,
            name: admindata.name,
            phone: admindata.phone,
            userType: admindata.userType,
        };
        const restoreActiveAdmin = await activeAdmin(id, data);

        if (restoreActiveAdmin.status === 200) {
            toast.success("Admin actived")
        }
    };

    useEffect(() => {
        if (editProfileData && editProfileData.data && editProfileData.data.isActive === true) {
            dispatch(editProfileSuccess(null))
            toast.success("Admin updated")
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
    //     getData()
    // }, [perPage, pageNumber, status])


    useEffect(() => {
        if (adminData && adminData.data) {
            setAdminTable(
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
                    };
                })
            )

        }
    }, [adminData])

    const adminTableColumns = [
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
                                <TabPane tab="Active admin" key="active">
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

                                <TabPane tab="Inactive admin" key="inactive">
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