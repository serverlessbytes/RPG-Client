import { Form, Input, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from '../../components/buttons/buttons'
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers'
import { editTestimonial, getTestimonial } from '../../redux/testimonial/actionCreator';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, TableWrapper } from '../styled';
import FeatherIcon from 'feather-icons-react';

const Testimonial = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { path } = useRouteMatch();

    const [usertable, setUsertable] = useState([])

    const getAllUsers = useSelector((state) => state.testimonial.getTestimonialData)

    useEffect(() => {
        dispatch(getTestimonial())
    }, [])

    const onEdit = (id) => {
        history.push(`${path}/addtestimonial?id=${id}`)
    }

    const onDelete = (id) => {
        let userForDelete = getAllUsers && getAllUsers.data.find(item => item.id === id)
        console.log("userForDelete",userForDelete)
        if (userForDelete) {
            delete userForDelete.createdAt
            delete userForDelete.updatedAt
            //delete userForDelete.avatar,
            userForDelete = {
                ...userForDelete,

                id: userForDelete.id,
                isActive: false,
                isDeleted: true,
            }
            dispatch(editTestimonial(userForDelete))
        }
    }

    useEffect(() => {
        if (getAllUsers && getAllUsers.data) {
            setUsertable(getAllUsers.data?.map(item => {
                console.log("item", item)
                return ({
                    name: item.name,
                    role: item.role,
                    message: item.message,
                    action: (
                        <div className="table-actions">
                            <>
                                <Button className="btn-icon" type="info" to="#" onClick={() => onEdit(item.id)} shape="circle">
                                    <FeatherIcon icon="edit" size={16} />
                                </Button>
                                <Button className="btn-icon" type="danger" to="#" onClick={() => onDelete(item.id)} shape="circle">
                                    <FeatherIcon icon="trash-2" size={16} />
                                </Button>
                            </>
                        </div>
                    ),
                });
            })
            )
        }
    }, [getAllUsers])

    const reDirect = () => {
        history.push(`${path}/addtestimonial`);
    }
    const usersTableColumns = [

        {
            title: 'Name',
            dataIndex: 'name',
            // sorter: (a, b) => a.SchemeName.length - b.SchemeName.length,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Message',
            dataIndex: 'message',
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
                title="Testimonial"
                buttons={[
                    <div className="page-header-actions">
                        <Button onClick={reDirect} size="small" type="primary">
                            Add Testimonial
                        </Button>
                    </div>
                ]}
            />

            <Main >
                <Cards headless>

                    <UserTableStyleWrapper>
                        <TableWrapper className="table-responsive">

                            {/* <Form name="sDash_select" layout="vertical">
                        <Form.Item name="search" label="">
                            <Input placeholder="search" style={{ width: 200 }} />
                        </Form.Item>
                    </Form> */}

                            <Table
                                // rowSelection={rowSelection}
                                dataSource={usertable}
                                columns={usersTableColumns}
                            // pagination={{
                            //     defaultPageSize: getAllUsers?.data.per_page,
                            //     total: getAllUsers?.data.page_count,
                            //     // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                            //     onChange: (page, pageSize) => {
                            //         setPageNumber(page);
                            //         setPerPage(pageSize)
                            //     }
                            // }}
                            // size="middle"
                            // pagination={false}
                            />
                        </TableWrapper>
                    </UserTableStyleWrapper>
                </Cards>
            </Main>

        </>
    )
}

export default Testimonial