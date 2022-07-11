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
import ImportTestimonial from '../../components/modals/ImportTestimonial';

const Testimonial = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { path } = useRouteMatch();

    const { addTestimonialSuccess, addTestimonialErr, editTestimonialSuccess,
        editTestimonialErr, addBulkTestimonialSuccess, addBulkTestimonialErr,
    } = actions;

    const [testiMonialtable, setTestiMonial] = useState([]);
    const [perPage, setPerPage] = useState(10)
    const [pageNum, setPageNum] = useState(1)
    const [importModel, setImportModel] = useState(false)

    const getAllUsers = useSelector((state) => state.testimonial.getTestimonialData)
    const addTestimonialdata = useSelector((state) => state.testimonial.addTestimonialData)
    const addTestimonialDataError = useSelector((state) => state.testimonial.addTestimonialDataError)
    const editTestimonialdata = useSelector((state) => state.testimonial.editTestimonialData)
    const editTestimonialDataError = useSelector((state) => state.testimonial.editTestimonialDataError)
    const addBulkTestimonialData = useSelector((state) => state.testimonial.addBulkTestimonialData)
    const addBulkTestimonialError = useSelector((state) => state.testimonial.addBulkTestimonialErr)

    useEffect(() => {
        if (addBulkTestimonialData && addBulkTestimonialData.status === 200) {
            dispatch(addBulkTestimonialSuccess(null))
            toast.success("Import Testimonial successful");
        }
        else if (addBulkTestimonialData && addBulkTestimonialData.status !== 200) {
            toast.error("Something Wrong")
        }
    }, [addBulkTestimonialData])

    useEffect(() => {
        if (addBulkTestimonialError) {
            dispatch(addBulkTestimonialErr(null))
            toast.error("Something Wrong")
        }
    }, [addBulkTestimonialError])

    useEffect(() => {
        if (addTestimonialdata && addTestimonialdata.status === 200) {
            dispatch(addTestimonialSuccess(null))
            toast.success("Testimonial added successfully");
        }
    }, [addTestimonialdata])

    useEffect(() => {
        if (addTestimonialDataError) {
            dispatch(addTestimonialErr(null))
            toast.error("Something Wrong")
        }
    }, [addTestimonialDataError])

    useEffect(() => {
        if (editTestimonialdata && editTestimonialdata.status === 200) {
            dispatch(editTestimonialSuccess(null))
            toast.success("Testimonial updated successfully");
            //toastAssetsAdd(true)
            //onHide()
        }
    }, [editTestimonialdata])

    useEffect(() => {
        if (editTestimonialDataError) {
            dispatch(editTestimonialErr(null))
            toast.error("Something Wrong")
        }
    }, [editTestimonialDataError])

    useEffect(() => {
        dispatch(getTestimonial(perPage, pageNum))
    }, [perPage, pageNum])

    const onEdit = (id) => {
        history.push(`${path}/addtestimonial?id=${id}`)
    }

    const newTestimonial = userForDelete => {
        const newVal = ApiPost(`testimonial/editTestimonial`, userForDelete)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(getTestimonial(perPage, pageNum))
                }
                return res
            })
        return newVal
    }

    const onDelete = async (id) => {
        let userForDelete = getAllUsers && getAllUsers.data && getAllUsers.data.data.find(item => item.id === id)
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
            const deleteTestimonial = await newTestimonial(userForDelete)
            if (deleteTestimonial.status === 200) {
                toast.success("Testimonial deleted successfully")
            }
        }
    }

    useEffect(() => {
        if (getAllUsers && getAllUsers.data && getAllUsers.data.data) {
            setTestiMonial(getAllUsers && getAllUsers.data && getAllUsers.data.data?.map(item => {
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
    const reDirectModel = () => {
        setImportModel(true);
    }
    const testiMonialColumns = [

        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Role',
            dataIndex: 'role',
            sorter: (a, b) => a.role.localeCompare(b.role),
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Message',
            dataIndex: 'message',
            sorter: (a, b) => a.message.localeCompare(b.message),
            sortDirections: ['descend', 'ascend']
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
                            Add testimonial
                        </Button>
                        <Button onClick={reDirectModel} size="small" type="primary">
                            Import testimonial
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
                                dataSource={testiMonialtable}
                                columns={testiMonialColumns}
                                pagination={{
                                    defaultPageSize: getAllUsers?.data.per_page,
                                    total: getAllUsers?.data.page_count,
                                    onChange: (page, pageSize) => {
                                        setPageNum(page);
                                        setPerPage(pageSize)
                                    }
                                }}
                            // size="middle"
                            // pagination={false}
                            />
                        </TableWrapper>
                    </UserTableStyleWrapper>
                </Cards>
            </Main>
            {importModel && <ImportTestimonial modaltitle="Import testimonial" handleCancel={() => setImportModel(false)} importModel={importModel} />}
        </>
    )
}

export default Testimonial