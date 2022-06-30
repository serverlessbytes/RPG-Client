import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Modal, PageHeader, Select, Table } from 'antd';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, TableWrapper } from '../styled';
import { useHistory, useRouteMatch } from 'react-router';
import { Cards } from '../../components/cards/frame/cards-frame';
import { editSchemeRating, getOneSchemeRating, getSchemeRating } from '../../redux/schemes/actionCreator';
import FeatherIcon from 'feather-icons-react';
import actions from '../../redux/schemes/actions';
import 'react-toastify/dist/ReactToastify.css';
import { ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';
import { Button } from '../../components/buttons/buttons';


const SchemeRating = () => {
    const { path } = useRouteMatch();
    let history = useHistory();
    let dispatch = useDispatch()

    const { editSchemeRatingSuccess } = actions;
    const [schemeRatingtable, setSchemeRatingtable] = useState([]) //set data
    const [per_Page, setPerPage] = useState(20) // forpagination
    const [pageNumber, setPageNumber] = useState(1)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedSchemeRating, setSelectedSchemeRating] = useState();
    const [data, setData] = useState({
        rating: "",
        comment: ""
    });

    const schemeRatingData = useSelector((state) => state.scheme.schemeRatingData)
    const getOneSchemeRatingData = useSelector((state) => state.scheme.getOneSchemeRatingData)
    const editSchemeRatingData = useSelector((state) => state.scheme.editSchemeRatingData)

    useEffect(() => {
        dispatch(getSchemeRating(per_Page, pageNumber))
    }, [per_Page, pageNumber])

    useEffect(() => {
        if (editSchemeRatingData && editSchemeRatingData.status === 200) {
            dispatch(editSchemeRatingSuccess(null))
            toast.success('SchemeRating updated successful');
        }
    }, [editSchemeRatingData])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const newScheme = data => {
        const newVal = ApiPost(`schemeRating/editSchemeRating`, data)
            .then(res => {
                if (res.status === 200) {
                    dispatch(getSchemeRating(per_Page, pageNumber))
                }
                return res;
            })
            .catch(err => {
                return err;
            });
        return newVal;
    };

    const onDelete = async id => {
        let schemeRatingForDelete = schemeRatingData && schemeRatingData?.data && schemeRatingData?.data?.data.find((item) => item.id === id)
        if (schemeRatingForDelete) {
            let data = {
                id: schemeRatingForDelete.id,
                comment: schemeRatingForDelete.comment,
                rating: schemeRatingForDelete.rating,
                isActive: false,
                isDeleted: true,
            }
            // dispatch(editSchemeRating(data))
            const deleteSchemeRating = await newScheme(data);
            if (deleteSchemeRating.status === 200) {
                toast.success('SchemeRating deleted successful');
            }
        }
    }

    const onEdit = (id) => {
        setIsModalVisible(true)
        let schemeRatingForEdit = schemeRatingData && schemeRatingData?.data && schemeRatingData?.data?.data.find((item) => item.id === id)
        if (schemeRatingForEdit) {
            setSelectedSchemeRating(schemeRatingForEdit)
        }
        if (schemeRatingForEdit) {
            dispatch(getOneSchemeRating(schemeRatingForEdit.id))
        }
    }

    const handleOk = () => {
        if (selectedSchemeRating) {
            let Data = {
                id: selectedSchemeRating.id,
                comment: data.comment,
                rating: data.rating,
                isActive: true,
                isDeleted: false,
            }
            dispatch(editSchemeRating(Data))
            setIsModalVisible(false)
        }
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }


    useEffect(() => {
        if (getOneSchemeRatingData && getOneSchemeRatingData.data) {
            setData({
                ...data,
                rating: getOneSchemeRatingData.data.rating,
                comment: getOneSchemeRatingData.data.comment,
            })
        }
    }, [getOneSchemeRatingData])

    useEffect(() => {
        setSchemeRatingtable(schemeRatingData?.data?.data?.map(item => {
            return ({
                scheme: item.scheme.name,
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
    }, [schemeRatingData])

    const SchemeRatingTableColumns = [
        {
            title: 'Scheme',
            dataIndex: 'scheme',
            // key: 'user',
            // sorter: (a, b) => a?.scheme?.length - b?.scheme?.length,
            sorter: (a, b) => a.scheme.localeCompare(b.scheme),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a?.rating - b?.rating,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'User',
            dataIndex: 'createdByUser',
            sorter: (a, b) => a.createdByUser.localeCompare(b.createdByUser),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
            sorter: (a, b) => a.comment.localeCompare(b.comment),
            sortDirections: ['descend', 'ascend'],
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
                title="Scheme Rating"
            />
            <Main>
                <Cards headless>
                    <UserTableStyleWrapper>
                        <TableWrapper className="table-responsive pb-30">
                            <Table
                                // rowSelection={rowSelection}
                                dataSource={schemeRatingtable}
                                columns={SchemeRatingTableColumns}
                                pagination={{
                                    defaultPageSize: schemeRatingData?.data.per_page,
                                    total: schemeRatingData?.data.page_count,
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
                    title="Scheme Rating"
                    okText={"Edit"}
                >
                    <Form name="banner" layout="vertical">
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

export default SchemeRating;



