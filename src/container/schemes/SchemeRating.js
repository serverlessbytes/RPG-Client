import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Select,Table } from 'antd';
import { UserTableStyleWrapper } from '../pages/style';
import { Main,TableWrapper } from '../styled';
import { useHistory, useRouteMatch } from 'react-router';
import { Cards } from '../../components/cards/frame/cards-frame';
import { getSchemeRating } from '../../redux/schemes/actionCreator';


const SchemeRating = () => { 
    const { path } = useRouteMatch();
    let history = useHistory();
    let dispatch = useDispatch()

    const [schemeRatingtable, setSchemeRatingtable] = useState([]) //set data
    const [per_Page, setPerPage] = useState(2) // forpagination
    const [pageNumber, setPageNumber] = useState(1)

    const schemeRatingData = useSelector((state) => state.scheme.schemeRatingData)

    useEffect(() => {
        dispatch(getSchemeRating(per_Page, pageNumber))
    }, [per_Page, pageNumber])

    useEffect(() => {
        setSchemeRatingtable(schemeRatingData?.data?.data?.map(item => {
            return ({
                scheme : item.scheme.name,
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
    }, [schemeRatingData])

    const SchemeRatingTableColumns = [
        {
            title: 'Scheme',
            dataIndex: 'scheme',
            // key: 'user',
              sorter: (a, b) => a?.scheme?.length - b?.scheme?.length,
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
                title="Scheme Rating"
            />
            <Main>
                <Cards headless>
                    <UserTableStyleWrapper>
                        <TableWrapper className="table-responsive pb-30 scheme-rating">
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
        </>
    );
};

export default SchemeRating;



