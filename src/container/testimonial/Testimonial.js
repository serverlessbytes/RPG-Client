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
import actions from '../../redux/testimonial/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiPost } from '../../helper/API/ApiData';

const Testimonial = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { path } = useRouteMatch();

    const { addTestimonialSuccess, addTestimonialErr, editTestimonialSuccess,
        editTestimonialErr,
    } = actions;

    const [usertable, setUsertable] = useState([])

    const getAllUsers = useSelector((state) => state.testimonial.getTestimonialData)
    const addTestimonialdata = useSelector((state) => state.testimonial.addTestimonialData)
    const addTestimonialDataError = useSelector((state) => state.testimonial.addTestimonialDataError)
    const editTestimonialdata = useSelector((state) => state.testimonial.editTestimonialData)
    const editTestimonialDataError = useSelector((state) => state.testimonial.editTestimonialDataError)

    useEffect(() => {
        console.log("editTestimonialdata", editTestimonialdata);
    }, [editTestimonialdata])

    useEffect(() => {
        if (addTestimonialdata && addTestimonialdata.status === 200) {
            dispatch(addTestimonialSuccess(null))
            toast.success("Testimonial add successful");
            //toastAssetsAdd(true)
            //onHide()
        }
    }, [addTestimonialdata])

    useEffect(()=>{
        if(addTestimonialDataError){ 
          dispatch(addTestimonialErr(null))
          toast.error("Something Wrong")
        }
      },[addTestimonialDataError])

      useEffect(() => {
        if (editTestimonialdata && editTestimonialdata.status === 200) {
            dispatch(editTestimonialSuccess(null))
            toast.success("Testimonial update successful");
            //toastAssetsAdd(true)
            //onHide()
        }
    }, [editTestimonialdata])

    useEffect(()=>{
        if(editTestimonialDataError){ 
          dispatch(editTestimonialErr(null))
          toast.error("Something Wrong")
        }
      },[editTestimonialDataError])

    useEffect(() => {
        dispatch(getTestimonial())
    }, [])

    const onEdit = (id) => {
        history.push(`${path}/addtestimonial?id=${id}`)
    }

    const newTestimonial = userForDelete => {
        const newVal  = ApiPost("testimonial/editTestimonial",userForDelete )
        .then((res) =>{
        if (res.status === 200) {
            dispatch(editTestimonial())
        }
        return res
        })
        return newVal
    }

    const onDelete = async(id) => {
        let userForDelete = getAllUsers && getAllUsers.data.find(item => item.id === id)
        console.log("userForDelete", userForDelete)
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
            // dispatch(editTestimonial(userForDelete))
           const deleteTestimonial =  await newTestimonial(userForDelete)
           if (deleteTestimonial.status === 200) {
               toast.success("Testimonial delete successful")
           }
        }
    }

    useEffect(() => {
        if (getAllUsers && getAllUsers.data) {
            setUsertable(getAllUsers.data?.map(item => {
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