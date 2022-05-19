import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Modal, PageHeader, Select, Table } from 'antd';
import { ComingsoonStyleWrapper, UserTableStyleWrapper } from '../pages/style';
import { Main, TableWrapper } from '../styled';
import { useHistory, useRouteMatch } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import { editCategoryRating, getCourseRatingData, getCourseRatingsByID } from '../../redux/course/actionCreator';
import { Cards } from '../../components/cards/frame/cards-frame';
import FeatherIcon from 'feather-icons-react';
import actions from '../../redux/course/actions';
import 'react-toastify/dist/ReactToastify.css';
import { ApiPost } from '../../helper/API/ApiData';
import { toast } from 'react-toastify';


const CourseRating = () => {
    const { editCategoryRatingSuccess } = actions;
    const { path } = useRouteMatch();
    let history = useHistory();
    let dispatch = useDispatch()

    const [courseRatingtable, setCourseRatingtable] = useState([]) //set data
    const [per_Page, setPerPage] = useState(20) // forpagination
    const [pageNumber, setPageNumber] = useState(1)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCourseRating, setSelectedCourseRating] = useState();
    const [data, setData] = useState({
        rating: "",
        comment: ""
    })

    const CourseRatingData = useSelector((state) => state.category.CourseRatingData)
    const CourseRatingByIdData = useSelector((state) => state.category.CourseRatingByIdData)
    const editCategoryRatingData = useSelector((state) => state.category.editCategoryRatingData)

    useEffect(() => {
        if (editCategoryRatingData && editCategoryRatingData.status === 200) {
            dispatch(editCategoryRatingSuccess(null))
            toast.success('CourseRating updated successful');
        }
    }, [editCategoryRatingData])


    useEffect(() => {
        dispatch(getCourseRatingData(per_Page, pageNumber))
    }, [per_Page, pageNumber])

    const newCourse =  data => {
        const newVal = ApiPost(`courseRating/editCourseRating`, data)
          .then(res => {
            if (res.status === 200) {
                dispatch(getCourseRatingData(per_Page, pageNumber))
            }
            return res;
          })
          .catch(err => {
            return err;
          });
        return newVal;
      };

    const onDelete = async id => {
        let CourseRatingDataDelete = CourseRatingData && CourseRatingData?.data && CourseRatingData?.data?.data.find((item) => item.id === id)
        if (CourseRatingDataDelete) {
            let data = {
                comment: CourseRatingDataDelete.comment,
                rating: CourseRatingDataDelete.rating,
                isDeleted: true,
                id: CourseRatingDataDelete.id,
                isActive: false,
            }
            const deleteCourseRating = await newCourse(data);
            if (deleteCourseRating.status === 200) {
                toast.success('CourseRating deleted successful');
            }
            // dispatch((editCategoryRating(data)))
        }
    }

    const onEdit = (id) => {
        setIsModalVisible(true)
        let CourseRatingDataEdit = CourseRatingData && CourseRatingData?.data && CourseRatingData?.data?.data.find((item) => item.id === id)
        if (CourseRatingDataEdit) {
            setSelectedCourseRating(CourseRatingDataEdit)
        }
        if (CourseRatingDataEdit) {
            dispatch(getCourseRatingsByID(CourseRatingDataEdit.id))
        }

    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleOk = () => {
        setIsModalVisible(false)
        if (selectedCourseRating) {
            let Data = {
                id: selectedCourseRating.id,
                comment: data.comment,
                rating: data.rating,
                isActive: true,
                isDeleted: false,
            }
            dispatch(editCategoryRating(Data))
        }
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (CourseRatingByIdData && CourseRatingByIdData.data) {
            setData({
                ...data,
                rating: CourseRatingByIdData.data.rating,
                comment: CourseRatingByIdData.data.comment,
            })
        }
    }, [CourseRatingByIdData])

    useEffect(() => {
        setCourseRatingtable(CourseRatingData?.data?.data?.map(item => {
            return ({
                course: item.course.name,
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
    }, [CourseRatingData])

    const CourseRatingTableColumns = [
        {
            title: 'Course',
            dataIndex: 'course',
            sorter: (a, b) => a?.course?.length - b?.course?.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
        },
        {
            title: 'User',
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
                title="Course Rating"
            />
            <Main>
                <Cards headless>
                    <UserTableStyleWrapper>
                        <TableWrapper className="table-responsive pb-30">
                            <Table
                                // rowSelection={rowSelection}
                                dataSource={courseRatingtable}
                                columns={CourseRatingTableColumns}
                                pagination={{
                                    defaultPageSize: CourseRatingData?.data.per_page,
                                    total: CourseRatingData?.data.page_count,
                                    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                    onChange: (page, pageSize) => {
                                        setPageNumber(page);
                                        setPerPage(pageSize);
                                    }
                                }}
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
                    title="Course Rating"
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

export default CourseRating;



