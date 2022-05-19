import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Modal, PageHeader, Select, Table } from 'antd';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, TableWrapper } from '../styled';
import { useHistory, useRouteMatch } from 'react-router';
import { Cards } from '../../components/cards/frame/cards-frame';
import { edituserRating, getOneUserRating, getUserRating } from '../../redux/users/actionCreator';
import FeatherIcon from 'feather-icons-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import actions from '../../redux/users/actions';
import { ApiPost } from '../../helper/API/ApiData';

const UserRating = () => {
    let dispatch = useDispatch()

    const { edituserRatingSuccess } = actions;
    const [userRatingtable, setUserRatingtable] = useState([])
    const [per_Page, setPerPage] = useState(20)
    const [pageNumber, setPageNumber] = useState(1)
    const [isModalVisible, setisModalVisible] = useState(false)
    const [selectedUserRating, setSelectedUserRating] = useState();
    const [data, setData] = useState({
        rating: "",
        comment: "",
    })

    const getUserRatingData = useSelector((state) => state.users.getUserRatingData)
    const getOneUserRatingData = useSelector((state) => state.users.getOneUserRatingData)
    const editUserRatingdata = useSelector((state) => state.users.editUserRatingData)

    // useEffect(()=>{
    //     console.log("editUserRatingdata",editUserRatingdata)
    // },[editUserRatingdata])

    useEffect(() => {
        if (editUserRatingdata && editUserRatingdata.status === 200) {
            dispatch(edituserRatingSuccess(null));
            toast.success('UserRating updated successful');
        }
    }, [editUserRatingdata])

    const onEdit = (id) => {
        setisModalVisible(true)
        let getUserRatingDataEdit = getUserRatingData && getUserRatingData.data && getUserRatingData.data.data.find((item) => item.id === id)
        if (getUserRatingDataEdit) {
            setSelectedUserRating(getUserRatingDataEdit)
        }
        if (getUserRatingDataEdit) {
            dispatch(getOneUserRating(getUserRatingDataEdit.id))
        }
    }

    const newUser =  data => {
        const newVal = ApiPost(`userRating/editUserRating`, data)
          .then(res => {
            if (res.status === 200) {
                dispatch(getUserRating(per_Page, pageNumber));
            }
            return res;
          })
          .catch(err => {
            return err;
          });
        return newVal;
      };

    const onDelete = async id => {
        let getUserRatingDataDelete = getUserRatingData && getUserRatingData.data && getUserRatingData.data.data.find((item) => item.id === id)
        let data = {
            id: getUserRatingDataDelete.id,
            comment: getUserRatingDataDelete.comment,
            rating: getUserRatingDataDelete.rating,
            isActive: false,
            isDeleted: true,
        };
        const deleteUserRating = await newUser(data);
        if (deleteUserRating.status === 200) {
            toast.success('UserRating deleted successful');
        }
        // dispatch(edituserRating(data))
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleOk = () => {
        if (selectedUserRating) {
            let Data = {
                id: selectedUserRating.id,
                comment: data.comment,
                rating: data.rating,
                isActive: true,
                isDeleted: false,
            }
            setisModalVisible(false)
            dispatch(edituserRating(Data))
        }

    }

    const handleCancel = () => {
        setisModalVisible(false)
    }

    useEffect(() => {
        if (getOneUserRatingData && getOneUserRatingData.data) {
            setData({
                ...data,
                rating: getOneUserRatingData.data.rating,
                comment: getOneUserRatingData.data.comment,
            })
        }
    }, [getOneUserRatingData])

    useEffect(() => {
        dispatch(getUserRating(per_Page, pageNumber))
    }, [per_Page, pageNumber])

    useEffect(() => {
        setUserRatingtable(getUserRatingData?.data?.data?.map(item => {
            return ({
                user: item.user.name,
                rating: item.rating,
                createdByUser: item.createdByUser.name,
                comment: item.comment,
                action: (
                    <div className="table-actions">
                        <>
                            <Button className="btn-icon" type="info" onClick={() => onEdit(item.id)} to="#" shape="circle">
                                <FeatherIcon icon="edit" size={16} />
                            </Button>
                            <Button className="btn-icon" type="danger" to="#" onClick={() => onDelete(item.id)} shape="circle">
                                <FeatherIcon icon="trash-2" size={16} />
                            </Button>
                            {/* <Button className="btn-icon" type="success" shape="circle">
                                <FeatherIcon icon="eye" size={16} />
                            </Button> */}
                        </>
                    </div>
                ),
            });
        })
        )
    }, [getUserRatingData])

    const userRatingTableColumns = [
        {
            title: 'User',
            dataIndex: 'user',
            sorter: (a, b) => a?.user?.length - b?.user?.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
        },
        {
            title: 'CreatedByUser',
            dataIndex: 'createdByUser',
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
        },
        {
            title: 'Action',
            dataIndex: 'action',
        },
    ];

    return (
        <>
            <PageHeader
                ghost
                title="User Rating"
            />
            <Main>
                <Cards headless>
                    <UserTableStyleWrapper>
                        <TableWrapper className="table-responsive pb-30">
                            <Table
                                // rowSelection={rowSelection}
                                dataSource={userRatingtable}
                                columns={userRatingTableColumns}
                                pagination={{
                                    defaultPageSize: getUserRatingData?.data.per_page,
                                    total: getUserRatingData?.data.page_count,
                                    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                    onChange: (page, pageSize) => {
                                        setPageNumber(page);
                                        setPerPage(pageSize);
                                    }
                                }}
                            // pagination={false}
                            />
                        </TableWrapper>
                    </UserTableStyleWrapper>
                </Cards>
            </Main>

            {isModalVisible &&
                <Modal
                    onOk={() => handleOk()}
                    visible={isModalVisible}
                    onCancel={() => handleCancel()}
                    title="User Rating"
                    okText={"Edit"}
                >
                    <Form name="course" layout="vertical">
                        <label htmlFor="rating">Rating</label>
                        <Form.Item>
                            <Input
                                placeholder="Enter Rating"
                                name="rating"
                                value={data.rating}
                                onChange={(e) => handleChange(e)}
                            />
                        </Form.Item>
                        <label htmlFor="Comment">Comment</label>
                        <Form.Item>
                            <Input
                                type="text"
                                placeholder="Enter Comment"
                                name="comment"
                                value={data.comment}
                                onChange={(e) => handleChange(e)}
                            />
                        </Form.Item>
                    </Form>
                </Modal>}
        </>
    );
};

export default UserRating;



