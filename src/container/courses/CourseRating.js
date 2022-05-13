import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Select,Table } from 'antd';
import { UserTableStyleWrapper } from '../pages/style';
import { Main,TableWrapper } from '../styled';
import { useHistory, useRouteMatch } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import { getCourseRatingData } from '../../redux/course/actionCreator';
import { Cards } from '../../components/cards/frame/cards-frame';


const CourseRating = () => { 
    const { path } = useRouteMatch();
    let history = useHistory();
    let dispatch = useDispatch()
  
    const [courseRatingtable, setCourseRatingtable] = useState([]) //set data
    const [per_Page, setPerPage] = useState(5) // forpagination
    const [pageNumber, setPageNumber] = useState(1)

    const CourseRatingData = useSelector((state) => state.category.CourseRatingData)

    useEffect(() => {
        dispatch(getCourseRatingData(per_Page, pageNumber))
    }, [per_Page, pageNumber])

    // const onDelete = (id) => {
    //     let CourseRatingDataDelete = CourseRatingData && CourseRatingData?.data && CourseRatingData?.data?.data.find((item) => item.id === id)
    //     console.log("CourseRatingDataDelete", CourseRatingDataDelete)
    //     if (CourseRatingDataDelete) {
    //         let data = {
    //             comment: CourseRatingDataDelete.comment,
    //             rating: CourseRatingDataDelete.rating,
    //             isDeleted: true,
    //             id: CourseRatingDataDelete.id,
    //             isActive: false,
    //         }
    //         dispatch((editCategoryRating(data)))
    //     }
    // }

    useEffect(() => {
        setCourseRatingtable(CourseRatingData?.data?.data?.map(item => {
            return ({
                course : item.course.name,
                rating: item.rating,
                createdByUser: item.createdByUser.name,
                comment: item.comment,
                // action: (
                //     <div className="table-actions">
                //         <>
                //             <Button className="btn-icon" type="info" onClick={() => onEdit(item.id)} to="#" shape="circle">
                //                 <FeatherIcon icon="edit" size={16} />
                //             </Button>
                //             <Button className="btn-icon" type="danger" to="#" onClick={() => onDelete(item.id)} shape="circle">
                //                 <FeatherIcon icon="trash-2" size={16} />
                //             </Button>
                //             <Button className="btn-icon" type="success" shape="circle">
                //                 <FeatherIcon icon="eye" size={16} />
                //             </Button>
                //         </>
                //     </div>
                // ),
            });
        })
        )
    }, [CourseRatingData])

    const CourseRatingTableColumns = [
        {
            title: 'Course',
            dataIndex: 'course',
            // key: 'user',
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
                        <TableWrapper className="table-responsive pb-30 course-rating">
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
        </>
    );
};

export default CourseRating;



