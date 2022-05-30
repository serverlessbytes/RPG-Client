
import React, { useEffect, useState } from 'react'
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Col, Form, Input, Modal, Row, Table, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addBanner, editBanner, GetBanner, getOneBanner } from '../../redux/banner/actionCreator';
import { Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper } from '../pages/style';
import FeatherIcon from 'feather-icons-react';
import actions from '../../redux/query/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set } from 'js-cookie';
import { ApiPost } from '../../helper/API/ApiData';
import { async } from '@firebase/util';
import { addArticle, editArticles, getArticleById, getArticles } from '../../redux/article/actionCreator';
import { useHistory } from 'react-router';
import { addQueries, editQueries, getQueries, getQueriesFromId } from '../../redux/query/actionCreator';

//import { data, data } from 'browserslist';

const query = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { TabPane } = Tabs;
    const { addQueriesSuccess, addQueriesErr, editQueriesSuccess, editQueriesErr } = actions;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [queryTableData, setQueryTableData] = useState([]); // for table
    const [perPage, setPerPage] = useState(20); // forpagination
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedQuery, setSelectedQuery] = useState();//For Edit
    const [nameTog, setNameTog] = useState(false)
    const [status, setStatus] = useState('active')
    const [queryData, setQueryData] = useState({
        name: "",
        email: "",
        body: "",
    });

    const getQueriesData = useSelector((state) => state.queries.getQueriesData);
    const addQueriesData = useSelector((state) => state.queries.addQueriesData);
    const addQuerieError = useSelector((state) => state.queries.addQuerieErr);
    const getQueriesById = useSelector((state) => state.queries.getQueriesById);
    const editQueriesData = useSelector((state) => state.queries.editQueriesData);
    const editQuerieError = useSelector((state) => state.queries.editQuerieErr);

    const handleChange = (e) => {
        setQueryData({ ...queryData, [e.target.name]: e.target.value })
    }

    // useEffect(() => { console.log("getQueriesById", getQueriesById) }, [getQueriesById])

    useEffect(() => {
        dispatch(getQueries(perPage, pageNumber, status));
    }, [perPage, pageNumber, status])

    useEffect(() => {
        if (addQueriesData && addQueriesData.status === 200) {
            dispatch(addQueriesSuccess(null))
            toast.success("Query add successful")
        }
        else if (addQueriesData && addQueriesData.status !== 200) {
            toast.error("Something Wrong")
        }
    }, [addQueriesData])

    useEffect(() => {
        if (addQuerieError) {
            dispatch(addQueriesErr(null))
            toast.error("Something Wrong")
        }
    }, [addQuerieError])

    useEffect(() => {
        if (editQueriesData && editQueriesData.status === 200) {
            dispatch(editQueriesSuccess(null))
            toast.success("Query update successful")
        } else if (editQueriesData && editQueriesData.status !== 200) {
            toast.error("Something Wrong")
        }
    }, [editQueriesData])

    useEffect(() => {
        if (editQuerieError) {
            dispatch(editQueriesErr(null))
            toast.error("Something Wrong")
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

    const showModal = () => {
        setIsModalVisible(true);
    };

    const callback = key => {
        setStatus(key);
        setPageNumber(1);
        // setExportTog(false);
    };

    const handleOk = () => {
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
            //console.log("data",dataEdit)
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

            const deletebanner = await newQuery(userForDelete)
            if (deletebanner.status === 200) {
                toast.success("Query delete successful")
            }
            else if (deletebanner.status !== 200) {
                toast.error("Something Wrong")
            }
        }
    }

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
                                <>
                                    <Button className="btn-icon" type="info" to="#" onClick={() => onEdit(item.id)} shape="circle">
                                        <FeatherIcon icon="edit" size={16} />
                                    </Button>
                                    <Button className="btn-icon" type="danger" to="#" onClick={() => onDelete(item.id)} shape="circle">
                                        <FeatherIcon icon="trash-2" size={16} />
                                    </Button>
                                </>
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
            // sorter: (a, b) => a.getArticlesData.data.data.length - b.getArticlesData.data.data.length,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Email',
            dataIndex: 'email',

        },
        {
            title: 'Body',
            dataIndex: 'body',
        },
        {
            title: 'Actions',
            dataIndex: 'action',
        },
    ];

    return (
        <>
            <PageHeader
                ghost
                title="Query"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" type="primary" onClick={showModal}>
                            Add Query
                        </Button>
                    </div>
                ]}
            />

            <Main>
                <Cards headless>
                    <Row gutter={15}>
                        <Col xs={24}>
                            <Tabs onChange={callback} >
                                <TabPane tab="Active Query" key="active">
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive pb-30">
                                            <Table
                                                dataSource={queryTableData}
                                                columns={queryColumns}
                                            // pagination={false}
                                            // pagination={{
                                            //     defaultPageSize: users?.per_page,
                                            //     total: users?.page_count,

                                            //     onChange: (page, pageSize) => {
                                            //         setPageNumber(page);
                                            //         setPerPage(pageSize);
                                            //     },

                                            // }}
                                            />
                                        </TableWrapper>
                                    </UserTableStyleWrapper>

                                </TabPane>
                                <TabPane tab="Inactive Query" key="inactive">
                                    <UserTableStyleWrapper>
                                        <TableWrapper className="table-responsive">
                                            <Table
                                                dataSource={queryTableData}
                                                columns={queryColumns}
                                            // pagination={{
                                            //     defaultPageSize: users?.per_page,
                                            //     total: users?.page_count,
                                            //     onChange: (page, pageSize) => {
                                            //         setPageNumber(page);
                                            //         setPerPage(pageSize);
                                            //     },

                                            // }}
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
                                placeholder="Enter Name"
                                name="name"
                                value={queryData.name}
                                onChange={(e) => handleChange(e)}
                            />
                           
                        </Form.Item>
                        <label htmlFor="email">Email</label>
                        <Form.Item>
                            <Input
                                type="text"
                                placeholder="Enter Email"
                                name="email"
                                value={queryData.email}
                                onChange={(e) => handleChange(e)}
                            />
                          
                        </Form.Item>

                        <label htmlFor="body">Body</label>
                        <Form.Item>
                            <Input
                                type="text"
                                placeholder="Enter Body"
                                name="body"
                                value={queryData.body}
                                onChange={(e) => handleChange(e)}
                            />
                             
                        </Form.Item>
                    </Form>
                </Modal>}
        </>
    )
}

export default query



