import { Dropdown, Menu, Space, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from '../../components/buttons/buttons'
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers'
import { getExportTestimonials, getTestimonial } from '../../redux/testimonial/actionCreator';
import { UserTableStyleWrapper } from '../pages/style';
import { Main, TableWrapper } from '../styled';
import FeatherIcon from 'feather-icons-react';
import actions from '../../redux/testimonial/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiPost } from '../../helper/API/ApiData';
import ImportTestimonial from '../../components/modals/ImportTestimonial';
import { DownOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';

const Testimonial = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { path } = useRouteMatch();
    const CSVLinkRefAll = useRef(null);
    const CSVLinkRef = useRef(null);

    const { addTestimonialSuccess, addTestimonialErr, editTestimonialSuccess,
        editTestimonialErr, addBulkTestimonialSuccess, addBulkTestimonialErr,
        getExportTestimonialsSuccess, 
    } = actions;

    const [testiMonialtable, setTestiMonial] = useState([]);
    const [perPage, setPerPage] = useState(10)
    const [pageNum, setPageNum] = useState(1)
    const [importModel, setImportModel] = useState(false)
    const [exportAlltestimonial, setExportAllTestimonial] = useState([])
    const [exportTestimonial, setExportTestimonial] = useState([])
    const [exportTog, setExportTog] = useState('');

    const getAllUsers = useSelector((state) => state.testimonial.getTestimonialData)
    const addTestimonialdata = useSelector((state) => state.testimonial.addTestimonialData)
    const addTestimonialDataError = useSelector((state) => state.testimonial.addTestimonialDataError)
    const editTestimonialdata = useSelector((state) => state.testimonial.editTestimonialData)
    const editTestimonialDataError = useSelector((state) => state.testimonial.editTestimonialDataError)
    const addBulkTestimonialData = useSelector((state) => state.testimonial.addBulkTestimonialData)
    const addBulkTestimonialError = useSelector((state) => state.testimonial.addBulkTestimonialErr)
    const getExportTestimonialData = useSelector((state) => state.testimonial.getExportTestimonialData)

    useEffect(() => {
        if (addBulkTestimonialData && addBulkTestimonialData.status === 200) {
            dispatch(addBulkTestimonialSuccess(null))
            toast.success("Import testimonial");
        }
        else if (addBulkTestimonialData && addBulkTestimonialData.status !== 200) {
            toast.error("Something went wrong")
        }
    }, [addBulkTestimonialData])

    useEffect(() => {
        if (addBulkTestimonialError) {
            dispatch(addBulkTestimonialErr(null))
            toast.error("Something went wrong")
        }
    }, [addBulkTestimonialError])

    useEffect(() => {
        if (addTestimonialdata && addTestimonialdata.status === 200) {
            dispatch(addTestimonialSuccess(null))
            toast.success("Testimonial added");
        }
    }, [addTestimonialdata])

    useEffect(() => {
        if (addTestimonialDataError) {
            dispatch(addTestimonialErr(null))
            toast.error("Something went wrong")
        }
    }, [addTestimonialDataError])

    useEffect(() => {
        if (editTestimonialdata && editTestimonialdata.status === 200) {
            dispatch(editTestimonialSuccess(null))
            toast.success("Testimonial updated");
        }
    }, [editTestimonialdata])

    useEffect(() => {
        if (editTestimonialDataError) {
            dispatch(editTestimonialErr(null))
            toast.error("Something went wrong")
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
            }).catch(error => error)
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
            const deleteTestimonial = await newTestimonial(userForDelete)
            if (deleteTestimonial.status === 200) {
                toast.success("Testimonial deleted")
            } else {
                toast.error("Something went wrong")
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

    useEffect(() => {
        if(getAllUsers && getAllUsers.data && getAllUsers.data.data){
            setExportTestimonial(getAllUsers && getAllUsers.data && getAllUsers.data.data.map(item => {
                return{
                    ...item,
                    createdAt: item.createdAt,
                    id: item.id,
                    imageUrl: item.imageUrl,
                    isActive: item.isActive,
                    isDeleted: item.isDeleted,
                    message: item.message,
                    name: item.name,
                    role: item.role,
                    videoUrl: item.videoUrl,
                }
            }))
        }
    },[getAllUsers])

    useEffect(() => {
        if (getExportTestimonialData?.data) {
            setExportAllTestimonial(
                getExportTestimonialData?.data.map(item => {
                    return {
                        ...item,
                        createdAt: item.createdAt,
                        id: item.id,
                        imageUrl: item.imageUrl,
                        isActive: item.isActive,
                        isDeleted: item.isDeleted,
                        message: item.message,
                        name: item.name,
                        role: item.role,
                        updatedAt: item.updatedAt,
                        videoUrl: item.videoUrl,
                    }
                })
            )
            setExportTog("all");
        }
    }, [getExportTestimonialData])

    useEffect(() => {
        if (exportAlltestimonial.length && exportTog === 'all') {
            CSVLinkRefAll?.current?.link.click();
            toast.success('Testimonial exported');
            setExportTog('');
            dispatch(getExportTestimonialsSuccess(null))
        } 
        else if (exportTestimonial.length && exportTog === 'single') {
            CSVLinkRef?.current?.link.click();
            toast.success('Testimonial exported');
            setExportTog('');
        } 
        else if (!exportAlltestimonial.length && exportTog) {
            toast.success('No data for export');
        }
    }, [exportTog]);

    const headerAll = [
        {label: 'createdAt', key:'createdAt'},
        {label: 'id', key:'id'},
        {label: 'imageUrl', key:'imageUrl'},
        {label: 'isActive', key:'isActive'},
        {label: 'isDeleted', key:'isDeleted'},
        {label: 'message', key:'message'},
        {label: 'name', key:'name'},
        {label: 'role', key:'role'},
        {label: 'updatedAt', key:'updatedAt'},
        {label: 'videoUrl', key:'videoUrl'},
    ];

    const header = [
        {label: 'createdAt', key:'createdAt'},
        {label: 'id', key:'id'},
        {label: 'imageUrl', key:'imageUrl'},
        {label: 'isActive', key:'isActive'},
        {label: 'isDeleted', key:'isDeleted'},
        {label: 'message', key:'message'},
        {label: 'name', key:'name'},
        {label: 'role', key:'role'},
        {label: 'videoUrl', key:'videoUrl'},
    ];

    const onExportTestimonial = () => {
        dispatch(getTestimonial(perPage, pageNum))
        setExportTog('single');
    }

    const exportAllTestimonial = () => {
        dispatch(getExportTestimonials())
    }

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
    const onClick = ({ key }) => {
        if (key == 'exportTestimonial') {
            onExportTestimonial()
        }
        if (key == 'exportAllTestimonial') {
            exportAllTestimonial()
        }
        if (key == 'addTestimonial') {
            reDirect();
        }
        if (key == 'import') {
            reDirectModel()
        }
    }

    const menu = (
        <Menu
            onClick={onClick}
            items={[
                {
                    label: 'Add testimonial',
                    key: 'addTestimonial',
                },
                {
                    label: 'Export all testimonial',
                    key: 'exportAllTestimonial',
                },
                {
                    label: 'Export testimonial',
                    key: 'exportTestimonial',
                },
                {
                    label: 'Import testimonial',
                    key: 'import',
                },
            ]}
        />
    );

    return (
        <>
            <PageHeader
                ghost
                title="Testimonial"
                buttons={[
                    <div className="page-header-actions">
                        {/* <Button onClick={reDirect} size="small" type="primary">
                            Add testimonial
                        </Button>
                        <Button onClick={reDirectModel} size="small" type="primary">
                            Import testimonial
                        </Button> */}

                        <Dropdown overlay={menu} trigger='click'>
                            <a onClick={e => e.preventDefault()}>
                                <Space>
                                    Actions
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                        <CSVLink
                            headers={headerAll}
                            data={exportAlltestimonial}
                            ref={CSVLinkRefAll}
                            filename="Testimonial.csv"
                            style={{ opacity: 0 }}
                        ></CSVLink>
                         <CSVLink
                            headers={header}
                            data={exportTestimonial}
                            ref={CSVLinkRef}
                            filename="Testimonial.csv"
                            style={{ opacity: 0 }}
                        ></CSVLink>
                    </div>
                ]}
            />

            <Main >
                <Cards headless>

                    <UserTableStyleWrapper>
                        <TableWrapper className="table-responsive">
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