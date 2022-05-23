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
import { allUser, editProfile, getAllUser } from '../../redux/users/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import Item from 'antd/lib/list/Item';
import { isTemplateMiddle } from 'typescript';
import StarRatings from 'react-star-ratings';


const User = () => {
    const dispatch = useDispatch()
    const { path } = useRouteMatch();
    const history = useHistory()
    const [status, setStatus] = useState('active');
    const [perPage, setPerPage] = useState(20); // forpagination
    const [pageNumber, setPageNumber] = useState(1);
    const [userData, setUserData] = useState()
    const [userTable, setUserTable] = useState([])

    const { TabPane } = Tabs;

    const callback = key => {
        setStatus(key);
        setPageNumber(1);
    };
    const getData = () => {
        ApiGet(`user/auth/getAllUsers?per_page=${perPage}&page_number=${pageNumber}&status=${status}&type=USER`)
            .then((res) => {
                setUserData(res)
            })
            .catch((err) => console.log(err))
    }
    const onEdit = (id) => {
        history.push(`${path}/adduser?id=${id}`);
    }

    const onDelete = (id) => {
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
                avatar: 'dfd',
            };
            delete userForDelete.userTakenRatings
            dispatch(editProfile(userForDelete));
        }
    };

    useEffect(() => {
        console.log("----- userData", userData);
        if (userData && userData.data) {
            setUserTable(
                userData.data.data.map((item) => {
                    let userRank = item.userTakenRatings.map(item => item.rating);

                    var sum = 0;

                    for (var i = 0; i < userRank.length; i++) {
                        sum += parseInt(userRank[i]);
                    }

                    var avg = sum / userRank.length;

                    console.log("Rank", userRank)
                    return {
                        name: item.name,
                        email: item.email,
                        userTakenRatings: (
                            <StarRatings
                                rating={avg?avg:0}
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

    useEffect(() => {
        getData()
    }, [perPage, pageNumber, status])



    const userTableColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'UserRating',
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
                title="Employer"
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

                                <TabPane tab="Inactive Partner" key="inactive">
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



