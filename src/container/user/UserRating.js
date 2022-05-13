import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Select, Table } from 'antd';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, TableWrapper } from '../styled';
import { useHistory, useRouteMatch } from 'react-router';
import { Cards } from '../../components/cards/frame/cards-frame';
import { getUserRating } from '../../redux/users/actionCreator';

const UserRating = () => {
    let dispatch = useDispatch()

    const [userRatingtable, setUserRatingtable] = useState([])
    const [per_Page, setPerPage] = useState(2)
    const [pageNumber, setPageNumber] = useState(1)

    const getUserRatingData = useSelector((state) => state.users.getUserRatingData)

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
                        <TableWrapper className="table-responsive pb-30 scheme-rating">
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
        </>
    );
};

export default UserRating;



