import React, { useEffect, useState } from 'react'
import { Cards } from '../../components/cards/frame/cards-frame';
import FeatherIcon from 'feather-icons-react';
import { Col, PageHeader, Row, Table, Tabs } from 'antd';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, TableWrapper } from '../styled';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../../components/buttons/buttons';
import {getAllUser } from '../../redux/users/actionCreator';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import actions from '../../redux/users/actions';

const Employer = () => {
    const dispatch = useDispatch()
    const { TabPane } = Tabs;
    const { path } = useRouteMatch();
    const history = useHistory()

    const [status, setStatus] = useState('active');
    const [perPage, setPerPage] = useState(20); // forpagination
    const [pageNumber, setPageNumber] = useState(1);
    const [employerTable, setEmployerTable] = useState([])
    const [type, setType] = useState("EMPLOYER")

    const { editProfileSuccess, editProfileErr } = actions;

    const employerData = useSelector(state => state.users.getAllUser)
    const editProfileData = useSelector(state => state.users.editProfileData)
    const editProfileError = useSelector(state => state.users.editProfileErr)

    const callback = key => {
        setStatus(key);
        setPageNumber(1);
    };

    const onEdit = (id) => {
        history.push(`${path}/adduser?id=${id}`);
    }

    const onDelete = async id => {
        let employerForDelete = employerData && employerData.data && employerData.data.data.find(item => item.id === id);

        if (employerForDelete) {
            employerForDelete = {
                ...employerForDelete,
                id: employerForDelete.id,
                isActive: false,
                isDeleted: true,
                avatar: employerForDelete.avatar,
            };
            delete employerForDelete.userTakenRatings
            const restoreActiveEmployer = await activeEmployer(id, employerForDelete);

            if (restoreActiveEmployer.status === 200) {
                toast.success("Employer deleted")
            } else {
                toast.error("Something went wrong")
            }
        }
    };

    const activeEmployer = (id, dt) => {
        delete dt.id;
        delete dt.userType;
        const newVal = ApiPost(`user/auth/editProfile?id=${id}`, dt)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(getAllUser(perPage, pageNumber, status, type))
                }
                return res
            }).catch(error => error)
        return newVal
    }

    const onActive = async id => {
        let employerdata = employerData && employerData.data && employerData.data.data.find(item => item.id === id);
        let data = {
            avatar: employerdata.avatar,
            email: employerdata.email,
            id: employerdata.id,
            isActive: true,
            isDeleted: false,
            name: employerdata.name,
            phone: employerdata.phone,
            userType: employerdata.userType,
        };
        const restoreActiveEmployer = await activeEmployer(id, data);

        if (restoreActiveEmployer.status === 200) {
            toast.success("Employer actived")
        } else {
            toast.error("Something went wrong")
        }
    };

    useEffect(() => {
        if (editProfileData && editProfileData.data && editProfileData.data.isActive === true) {
            dispatch(editProfileSuccess(null))
            toast.success("Employer updated")
        }
        else if (editProfileData && editProfileData.message === "User already exists") {
            dispatch(editProfileSuccess(null))
            toast.success("User already exists")
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

    useEffect(() => {
        if (employerData && employerData.data) {
            setEmployerTable(
                employerData.data.data.map((item) => {
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
    }, [employerData])

    const employerTableColumns = [
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
                title="Employer"
            />
            <Main>
                <Cards headless>
                    <Row gutter={15}>
                        <Col xs={24}>
                            <Tabs onChange={callback}>
                                <TabPane tab="Active employer" key="active">
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive">
                                            <Table
                                                dataSource={employerTable}
                                                columns={employerTableColumns}
                                                pagination={{
                                                    defaultPageSize: employerData?.data.per_Page,
                                                    total: employerData?.data.page_count,
                                                    onChange: (page, pageSize) => {
                                                        setPageNumber(page);
                                                        setPerPage(pageSize);
                                                    },
                                                }}
                                            />
                                        </TableWrapper>
                                    </UserTableStyleWrapper>
                                </TabPane>

                                <TabPane tab="Inactive employer" key="inactive">
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive">
                                            <Table
                                                dataSource={employerTable}
                                                columns={employerTableColumns}
                                                pagination={{
                                                    defaultPageSize: employerData?.data.per_Page,
                                                    total: employerData?.data.page_count,
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

export default Employer



