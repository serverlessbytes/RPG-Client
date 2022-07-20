
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Col, Dropdown, Form, Input, Modal, Row, Space, Table, Tabs, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper } from '../pages/style';
import FeatherIcon from 'feather-icons-react';
import actions from '../../redux/query/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiPost } from '../../helper/API/ApiData';
import { addQueries, editQueries, getExportQueries, getQueries, getQueriesFromId } from '../../redux/query/actionCreator';
import { DownOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';

const query = () => {
    const dispatch = useDispatch();
    const { TabPane } = Tabs;
    const CSVLinkRef = useRef(null);
    const CSVLinkRefSingle = useRef(null);

    const { addQueriesSuccess, addQueriesErr, editQueriesSuccess, editQueriesErr, getExportQueriesSuccess } = actions;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [queryTableData, setQueryTableData] = useState([]); 
    const [perPage, setPerPage] = useState(20); 
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedQuery, setSelectedQuery] = useState();
    const [nameTog, setNameTog] = useState(false)
    const [status, setStatus] = useState('active')
    const [queryData, setQueryData] = useState({
        name: "",
        email: "",
        body: "",
    });
    const [formErrors, setFormErrors] = useState();
    const [exportQueries, setExportQueries] = useState([]);
    const [exportSingleQueries, setExportSingleQueries] = useState([]);
    const [exportTog, setExportTog] = useState('');

    const getQueriesData = useSelector((state) => state.queries.getQueriesData);
    const addQueriesData = useSelector((state) => state.queries.addQueriesData);
    const addQuerieError = useSelector((state) => state.queries.addQuerieErr);
    const getQueriesById = useSelector((state) => state.queries.getQueriesById);
    const editQueriesData = useSelector((state) => state.queries.editQueriesData);
    const editQuerieError = useSelector((state) => state.queries.editQuerieErr);
    const getExportQueriesData = useSelector((state) => state.queries.getExportQueriesData);
    const getExportQueriesError = useSelector((state) => state.queries.getExportQueriesError);

    const handleChange = (e) => {
        setQueryData({ ...queryData, [e.target.name]: e.target.value })
        setFormErrors({ ...formErrors, [e.target.name]: "" })
    }

    useEffect(() => {
        dispatch(getQueries(perPage, pageNumber, status));
    }, [perPage, pageNumber, status])

    useEffect(() => {
        if (addQueriesData && addQueriesData.status === 200) {
            dispatch(addQueriesSuccess(null))
            toast.success("Query added")
        }
        else if (addQueriesData && addQueriesData.status !== 200) {
            toast.error("Something went wrong")
        }
    }, [addQueriesData])

    useEffect(() => {
        if (addQuerieError) {
            dispatch(addQueriesErr(null))
            toast.error("Something went wrong")
        }
    }, [addQuerieError])

    useEffect(() => {
        if (editQueriesData && editQueriesData.status === 200) {
            dispatch(editQueriesSuccess(null))
            toast.success("Query updated")
        } else if (editQueriesData && editQueriesData.status !== 200) {
            toast.error("Something went wrong")
        }
    }, [editQueriesData])

    useEffect(() => {
        if (editQuerieError) {
            dispatch(editQueriesErr(null))
            toast.error("Something went wrong")
        }
    }, [editQuerieError])

    useEffect(() => {
        if (getQueriesById && getQueriesById.data) {
            setQueryData({
                ...queryData,
                body: getQueriesById.data.body,
                email: getQueriesById.data.email,
                name: getQueriesById.data.name,
            })
        }
        //dispatch(GetBanner());
    }, [getQueriesById])

    useEffect(() => {
        if (exportQueries?.length && exportTog === "all") {
            CSVLinkRef?.current?.link.click();
            toast.success('Query exported');
            setExportTog('');
            dispatch(getExportQueriesSuccess(null))
        }
        else if(exportSingleQueries?.length && exportTog === 'single'){
            CSVLinkRefSingle?.current?.link.click();
            toast.success('Query exported');
            setExportTog('');
        }
        else if (!exportQueries.length && exportTog) {
            toast.success('No data for export');
        }
    }, [exportTog, exportQueries])

    useEffect(() => {
        if (getExportQueriesData?.data) {
            setExportQueries(
                getExportQueriesData?.data.map(item => {
                    return {
                        ...item,
                        body: item.body,
                        createdAt: item.createdAt,
                        email: item.email,
                        id: item.id,
                        isActive: item.isActive,
                        isResolved: item.isResolved,
                        name: item.name,
                    }
                })
            )
            setExportTog('all')
        }
    }, [getExportQueriesData])

    useEffect(() => {
        if (getQueriesData && getQueriesData.data && getQueriesData.data.data) {
            setExportSingleQueries(getQueriesData && getQueriesData.data && getQueriesData.data.data.map(item => {
                return {
                    ...item,
                    body: item.body,
                    createdAt: item.createdAt,
                    email: item.email,
                    id: item.id,
                    isActive: item.isActive,
                    isResolved: item.isResolved,
                    name: item.name,
                }
            }))
        }
    }, [getQueriesData])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const callback = key => {
        setStatus(key);
        setPageNumber(1);
        // setExportTog(false);
    };

    const validation = () => {
        let flag = false;
        const error = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (queryData.email === '') {
            error.email = 'Email is required';
            flag = true;
        }
        if (queryData.email && !queryData.email.match(regex)) {
            error.email = 'Please enter a valid email address';
            flag = true;
        }
        if (queryData.name === '') {
            error.name = 'Name is required';
            flag = true;
        }
        if (queryData.body === '') {
            error.body = 'Body is required';
            flag = true;
        }

        setFormErrors(error);
        return flag
    }

    const handleOk = () => {
        if (validation()) {
            return
        }
        if (!selectedQuery) {
            let Data = {
                name: queryData.name,
                email: queryData.email,
                body: queryData.body,
            }
            dispatch(addQueries(Data));
            setIsModalVisible(false)
            // setArticleData({
            //     title: "",
            //     imageUrl: ""
            // })
            handleCancel();
        }
        else {
            let dataEdit = {
                id: selectedQuery.id,
                name: queryData.name,
                email: queryData.email,
                body: queryData.body,
                isActive: true,
                // isDeleted: false,
                isResolved: true,
            }
            dispatch(editQueries(dataEdit))
            setIsModalVisible(false)
            handleCancel()
        }
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setQueryData({
            name: "",
            email: "",
            body: "",
        })
        setSelectedQuery(null)
        setNameTog(false)
        setFormErrors("");
    };

    const onEdit = (id) => {
        let dataForEdit = getQueriesData && getQueriesData.data && getQueriesData.data.data.find((item) => item.id === id)
        if (dataForEdit) {
            setSelectedQuery(dataForEdit)
        }
        dispatch(getQueriesFromId(dataForEdit.id))
        setIsModalVisible(true)
        setNameTog(true)
    }

    const newQuery = userForDelete => {
        const newval = ApiPost("query/editQuery", userForDelete)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(getQueries(perPage, pageNumber, status))
                }
                return res;
            })
            .catch((err) => {
                return err;
            })
        return newval;
    }

    const onDelete = async (id) => {
        let dataForDelete = getQueriesData && getQueriesData.data && getQueriesData.data.data.find((item) => item.id === id)
        if (dataForDelete) {
            let userForDelete = {
                id: dataForDelete.id,
                name: dataForDelete.name,
                body: dataForDelete.body,
                email: dataForDelete.email,
                isActive: false,
                // isDeleted: true,
                isResolved: false,
            }
            // dispatch(editQueries(userForDelete))

            const deleteQuery = await newQuery(userForDelete)
            if (deleteQuery.status === 200) {
                toast.success("Query deleted")
            }
            else if (deletebanner.status !== 200) {
                toast.error("Something went wrong")
            }
        }
    }

    const onClick = ({ key }) => {
        if (key == 'addQuery') {
            showModal();
        }
        if (key === 'exportQuery') {
            exportQuery();
        }
        if (key === 'exportSingleQuery') {
            exportSingleQuery();
        }
    }

    const exportQuery = () => {
        dispatch(getExportQueries())
    }

    const exportSingleQuery = () => {
        dispatch(getQueries(perPage, pageNumber, status))
        setExportTog('single');
    }

    const header = [
        { label: 'body', key: 'body' },
        { label: 'createdAt', key: 'createdAt' },
        { label: 'email', key: 'email' },
        { label: 'id', key: 'id' },
        { label: 'isActive', key: 'isActive' },
        { label: 'isResolved', key: 'isResolved' },
        { label: 'name', key: 'name' },
    ];

    const headerSingle = [
        { label: 'body', key: 'body' },
        { label: 'createdAt', key: 'createdAt' },
        { label: 'email', key: 'email' },
        { label: 'id', key: 'id' },
        { label: 'isActive', key: 'isActive' },
        { label: 'isResolved', key: 'isResolved' },
        { label: 'name', key: 'name' },
    ];

    const onActive = async id => {
        let getActiveQueriesdata = getQueriesData && getQueriesData.data && getQueriesData.data.data.find(item => item.id === id);

        let data = {
            id: getActiveQueriesdata.id,
            name: getActiveQueriesdata.name,
            body: getActiveQueriesdata.body,
            email: getActiveQueriesdata.email,
            isActive: true,
            // isDeleted: true,
            isResolved: false,
        }

        const restoreQuery = await newQuery(data);

        if (restoreQuery.status === 200) {
            toast.success("Query actived")
        }
    };

    // const viewArticle = (id) => {
    //     history.push(`/admin/article/articleview?id=${id}`)
    // }

    useEffect(() => {
        if (getQueriesData && getQueriesData.data && getQueriesData.data.data) {
            setQueryTableData(getQueriesData && getQueriesData.data && getQueriesData.data.data.map((item) => {
                return {
                    title: (
                        <span className='For-Underline' onClick={() => viewArticle(item.id)}>
                            {item.title}
                        </span>
                    ),
                    name: item.name,
                    email: item.email,
                    body: item.body,
                    action: (
                        <div className='active-schemes-table'>
                            <div className="table-actions">
                                {
                                    status === 'active' ? (
                                        <>
                                            <Button className="btn-icon" type="info" to="#" onClick={() => onEdit(item.id)} shape="circle">
                                                <FeatherIcon icon="edit" size={16} />
                                            </Button>
                                            <Button className="btn-icon" type="danger" to="#" onClick={() => onDelete(item.id)} shape="circle">
                                                <FeatherIcon icon="trash-2" size={16} />
                                            </Button>
                                        </>
                                    ) : (
                                        <Button className="btn-icon" type="danger" to="#" onClick={() => onActive(item.id)} shape="circle">
                                            <FeatherIcon icon="rotate-ccw" size={16} />
                                        </Button>
                                    )
                                }

                            </div>
                        </div>
                    )
                }
            })
            )
        }
    }, [getQueriesData])

    const queryColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Body',
            dataIndex: 'body',
            sorter: (a, b) => a.body.localeCompare(b.body),
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Actions',
            dataIndex: 'action',
        },
    ];

    const menu = (
        <Menu
            onClick={onClick}
            items={[
                {
                    label: 'Add query',
                    key: 'addQuery',
                },
                {
                    label: 'Export all query',
                    key: 'exportQuery',
                },
                {
                    label: 'Export query',
                    key: 'exportSingleQuery',
                },
             
            ]}
        />
    );

    return (
        <>
            <PageHeader
                ghost
                title="Query"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Dropdown overlay={menu} trigger='click'>
                            <a onClick={e => e.preventDefault()}>
                                <Space>
                                    Actions
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                        <CSVLink
                            headers={header}
                            data={exportQueries}
                            ref={CSVLinkRef}
                            filename="Queries.csv"
                            style={{ opacity: 0 }}
                        ></CSVLink>

                        <CSVLink
                            headers={headerSingle}
                            data={exportSingleQueries}
                            ref={CSVLinkRefSingle}
                            filename="Queries.csv"
                            style={{ opacity: 0 }}
                        ></CSVLink>
                    </div>
                ]}
            />

            <Main>
                <Cards headless>
                    <Row gutter={15}>
                        <Col xs={24}>
                            <Tabs onChange={callback} >
                                <TabPane tab="Active query" key="active">
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive pb-30">
                                            <Table
                                                dataSource={queryTableData}
                                                columns={queryColumns}
                                                pagination={{
                                                    defaultPageSize: getQueriesData?.data.per_page,
                                                    total: getQueriesData?.data.page_count,
                                                    onChange: (page, pageSize) => {
                                                        setPageNumber(page);
                                                        setPerPage(pageSize);
                                                    },
                                                }}
                                            />
                                        </TableWrapper>
                                    </UserTableStyleWrapper>

                                </TabPane>
                                <TabPane tab="Inactive query" key="inactive">
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive">
                                            <Table
                                                dataSource={queryTableData}
                                                columns={queryColumns}
                                                pagination={{
                                                    defaultPageSize: getQueriesData?.data.per_page,
                                                    total: getQueriesData?.data.page_count,
                                                    onChange: (page, pageSize) => {
                                                        setPageNumber(page);
                                                        setPerPage(pageSize);
                                                    },
                                                }}
                                            />
                                        </TableWrapper>
                                    </UserTableStyleWrapper>
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Cards>
            </Main>

            {isModalVisible &&
                <Modal
                    onOk={() => handleOk()}
                    visible={isModalVisible}
                    onCancel={() => handleCancel()}
                    title="Query"
                    okText={nameTog ? "Edit" : "Add"}
                >
                    <Form name="query" layout="vertical">
                        <label htmlFor="name">Name</label>
                        <Form.Item>
                            <Input
                                placeholder="Enter name"
                                name="name"
                                value={queryData.name}
                                onChange={(e) => handleChange(e)}
                            />
                            {formErrors?.name && <span style={{ color: "red" }}>{formErrors.name}</span>}
                        </Form.Item>

                        <label htmlFor="email">Email</label>
                        <Form.Item>
                            <Input
                                type="text"
                                placeholder="Enter email"
                                name="email"
                                value={queryData.email}
                                onChange={(e) => handleChange(e)}
                            />
                            {formErrors?.email && <span style={{ color: "red" }}>{formErrors.email}</span>}
                        </Form.Item>

                        <label htmlFor="body">Body</label>
                        <Form.Item>
                            <Input
                                type="text"
                                placeholder="Enter body"
                                name="body"
                                value={queryData.body}
                                onChange={(e) => handleChange(e)}
                            />
                            {formErrors?.body && <span style={{ color: "red" }}>{formErrors.body}</span>}
                        </Form.Item>
                    </Form>
                </Modal>}
        </>
    )
}

export default query



