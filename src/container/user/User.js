import React, { useEffect, useState } from 'react'
import { Cards } from '../../components/cards/frame/cards-frame';
import FeatherIcon from 'feather-icons-react';
import { Col, PageHeader, Row, Table, Tabs } from 'antd';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, TableWrapper } from '../styled';
import { ApiPost } from '../../helper/API/ApiData';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../../components/buttons/buttons';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { getAllUser } from '../../redux/users/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { toast } from 'react-toastify';
import actions from '../../redux/users/actions';

const User = () => {
    const dispatch = useDispatch()
    const { path } = useRouteMatch();
    const history = useHistory()
    const { TabPane } = Tabs;
    const { editProfileSuccess, editProfileErr } = actions;

    const [status, setStatus] = useState('active');
    const [perPage, setPerPage] = useState(20);
    const [pageNumber, setPageNumber] = useState(1);
    const [userTable, setUserTable] = useState([])
    const [type, setType] = useState("USER")

    
    const userData = useSelector(state => state.users.getAllUser)
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
        let userForDelete = userData && userData.data && userData.data.data.find(item => item.id === id);
        if (userForDelete) {
            //delete userForDelete.key
            //delete userForDelete.updatedAt
            //delete userForDelete.avatar,
            userForDelete = {
                ...userForDelete,
                id: userForDelete.id,
                isActive: false,
                isDeleted: true,
                avatar: userForDelete.avatar,
            };
            delete userForDelete.userTakenRatings
            const restoreActiveUser = await activeUser(id, userForDelete);
            if (restoreActiveUser.status === 200) {
                toast.success("User deleted")
            } else {
                toast.error("Something went wrong")
            }
        }
    };

    const activeUser = (id, dt) => {

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
        let activeData = userData && userData.data && userData.data.data.find(item => item.id === id);
        if (activeData) {
            activeData = {
                ...activeData,
                id: activeData.id,
                isActive: true,
                isDeleted: false,
                avatar:activeData.avatar,
            };
            delete activeData.userTakenRatings
        }
        const restoreActiveUser = await activeUser(id, activeData);

        if (restoreActiveUser.status === 200) {
            toast.success("User actived")
        } else {
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        if (editProfileData && editProfileData.data && editProfileData.data.isActive === true) {
            dispatch(editProfileSuccess(null))
            toast.success("User updated")
        }
        else if(editProfileData && editProfileData.message === "User already exists"){
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
        if (userData && userData.data) {
            setUserTable(
                userData.data.data.map((item) => {
                    let userRank = item.userTakenRatings.map(item => item.rating);

                    var sum = 0;

                    for (var i = 0; i < userRank.length; i++) {
                        sum += parseInt(userRank[i]);
                    }

                    var avg = sum / userRank.length;
                    return {
                        name: item.name,
                        email: item.email,
                        userTakenRatings: (
                            <StarRatings
                                rating={avg ? avg : 0}
                                starRatedColor="#f57c00"
                                numberOfStars={5}
                                name="swayamCourse"
                                starDimension="13px"
                            />
                        ),
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
    }, [userData])

    const userTableColumns = [
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
            title: 'User rating',
            dataIndex: 'userTakenRatings',
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
                title="User"
            />
            <Main>
                <Cards headless>
                    <Row gutter={15}>
                        <Col xs={24}>
                            <Tabs onChange={callback}>
                                <TabPane tab="Active user" key="active">
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive">
                                            <Table
                                                dataSource={userTable}
                                                columns={userTableColumns}
                                                pagination={{
                                                    defaultPageSize: userData?.data.per_Page,
                                                    total: userData?.data.page_count,
                                                    onChange: (page, pageSize) => {
                                                        setPageNumber(page);
                                                        setPerPage(pageSize);
                                                    },
                                                }}
                                            />
                                        </TableWrapper>
                                    </UserTableStyleWrapper>
                                </TabPane>

                                <TabPane tab="Inactive user" key="inactive">
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive">
                                            <Table
                                                dataSource={userTable}
                                                columns={userTableColumns}
                                                pagination={{
                                                    defaultPageSize: userData?.data.per_Page,
                                                    total: userData?.data.page_count,
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

export default User



