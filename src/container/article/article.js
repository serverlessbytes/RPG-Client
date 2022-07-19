
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Col, Dropdown, Form, Input, Menu, Modal, Space, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper } from '../pages/style';
import FeatherIcon from 'feather-icons-react';
import actions from '../../redux/article/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiPost } from '../../helper/API/ApiData';
import { addArticle, editArticles, getArticleById, getArticles, getExportArticles } from '../../redux/article/actionCreator';
import { DownOutlined } from '@ant-design/icons';
import ImportArticle from '../../components/modals/ImportArticle';
import { CSVLink } from 'react-csv';

const article = () => {
    const dispatch = useDispatch();
    const CSVLinkRef = useRef(null);
    const CSVLinkRefSingle = useRef(null);
    const { addArticleSuccess, addArticleErr, editArticlesSuccess, editArticlesErr, addBulkArticleSuccess, addBulkArticleErr, getExportArticlesSuccess } = actions;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [articleTableData, setarticleTableData] = useState([]);
    const [perPage, setPerPage] = useState(20);
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedArticle, setSelectedArticle] = useState();
    const [nameTog, setNameTog] = useState(false)
    const [articledata, setArticleData] = useState({
        title: "",
        imageUrl: "",
        videoUrl: "",
        body: "",
        priority: "",
    });
    const [priority, setPriority] = useState(false);
    const [formErrors, setFormErrors] = useState();
    const [importModal, setImportModal] = useState(false);
    const [exportArticle, setExportArticle] = useState([])
    const [exportsingleArticle, setExportSingleArticle] = useState([])
    const [exportTog, setExportTog] = useState('');

    const getArticlesData = useSelector((state) => state.articles.getArticlesData);
    const getArticleByIdData = useSelector((state) => state.articles.getArticleByIdData);
    const addArticleData = useSelector((state) => state.articles.addArticleData);
    const addArticleError = useSelector((state) => state.articles.addArticleErr);
    const editArticlesData = useSelector((state) => state.articles.editArticlesData);
    const editArticlesError = useSelector((state) => state.articles.editArticlesErr);
    const addBulkArticleData = useSelector((state) => state.articles.addBulkArticleData);
    const addBulkArticleError = useSelector((state) => state.articles.addBulkArticleError);
    const getExportArticleData = useSelector((state) => state.articles.getExportArticleData);

    const header = [
        { label: 'body', key: 'body' },
        { label: 'createdAt', key: 'createdAt' },
        { label: 'id', key: 'id' },
        { label: 'imageUrl', key: 'imageUrl' },
        { label: 'isActive', key: 'isActive' },
        { label: 'isDeleted', key: 'isDeleted' },
        { label: 'priority', key: 'priority' },
        { label: 'title', key: 'title' },
        { label: 'updatedAt', key: 'updatedAt' },
        { label: 'videoUrl', key: 'videoUrl' },
    ];
    const headerSingle = [
        { label: 'body', key: 'body' },
        { label: 'createdAt', key: 'createdAt' },
        { label: 'id', key: 'id' },
        { label: 'imageUrl', key: 'imageUrl' },
        { label: 'isActive', key: 'isActive' },
        { label: 'isDeleted', key: 'isDeleted' },
        { label: 'priority', key: 'priority' },
        { label: 'title', key: 'title' },
        { label: 'updatedAt', key: 'updatedAt' },
        { label: 'videoUrl', key: 'videoUrl' },
    ];

    const handleChange = (e) => {
        setArticleData({ ...articledata, [e.target.name]: e.target.value })
        setFormErrors({ ...formErrors, [e.target.name]: "" });
    }

    const onHandleChange = (e, name) => {
        const input = document.getElementById('priority')
        input.onkeydown = (e) => {
            if (e.which === 38 || e.which === 40) {
                e.preventDefault();
            }
        }
        if (name === "priority") {
            if (e.target.value > 0) {
                setArticleData({ ...articledata, [e.target.name]: e.target.value })
            }
            else {
                setArticleData({ ...articledata, [e.target.name]: 0 })
            }
            setFormErrors({ ...formErrors, [e.target.name]: "" });

        }
    }

    const fileUpload = (e, name) => {
        let firsttemp = e.target.files[0].name?.split('.');
        let fileexten = ['jpeg', 'jpg', 'png']

        if (fileexten.includes(firsttemp[firsttemp.length - 1])) {
            setArticleData({ ...articledata, [name]: e.target.files[0] })
            setFormErrors({ ...formErrors, imageUrl: "" });
        }
        else {
            setFormErrors({ ...formErrors, imageUrl: 'Please select valid document file' })
            setArticleData({ ...articledata, imageUrl: '' })
        }
    }

    const validation = () => {
        let flag = false;
        const error = {};
        let videoUrlReg = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})?$/

        if (!articledata.title) {
            error.title = "Please enter title"
            flag = true
        }
        if (!articledata.imageUrl) {
            error.imageUrl = "Please select image"
            flag = true
        }
        if (!articledata.videoUrl) {
            error.videoUrl = "Please enter video url"
            flag = true
        } else if (!videoUrlReg.test(articledata.videoUrl)) {
            error.videoUrl = 'Enter valid video url';
            flag = true;
        }
        if (!articledata.body) {
            error.body = "Please enter body"
            flag = true
        }
        if (!articledata.priority) {
            error.priority = "Please enter priority"
            flag = true
        }
        setFormErrors(error);
        return flag
    }

    useEffect(() => {
        dispatch(getArticles(perPage, pageNumber));
    }, [perPage, pageNumber])

    useEffect(() => {
        if (addBulkArticleData && addBulkArticleData.status === 200) {
            dispatch(addBulkArticleSuccess(null))
            toast.success("Import article")
        }
    }, [addBulkArticleData])

    useEffect(() => {
        if (addBulkArticleError) {
            dispatch(addBulkArticleErr(null))
            toast.error("Something went wrong")
        }
    }, [addBulkArticleError])

    useEffect(() => {
        if (addArticleData && addArticleData.status === 200) {
            dispatch(addArticleSuccess(null))
            toast.success("Article added")
        }
    }, [addArticleData])

    useEffect(() => {
        if (addArticleError) {
            dispatch(addArticleErr(null))
            toast.error("Something went wrong")
        }
    }, [addArticleError])

    useEffect(() => {
        if (editArticlesData && editArticlesData.status === 200) {
            dispatch(editArticlesSuccess(null))
            toast.success("Article updated")
        } else if (editArticlesData && editArticlesData.status !== 200) {
            toast.error("Something went wrong")
        }
    }, [editArticlesData])

    useEffect(() => {
        if (editArticlesError) {
            dispatch(editArticlesErr(null))
            toast.error("Something went wrong")
        }
    }, [editArticlesError])

    useEffect(() => {
        if (getArticleByIdData && getArticleByIdData.data) {
            setArticleData({
                ...articledata,
                title: getArticleByIdData.data.title,
                imageUrl: getArticleByIdData.data.imageUrl,
                videoUrl: getArticleByIdData.data.videoUrl,
                body: getArticleByIdData.data.body,
            })
        }
    }, [getArticleByIdData])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (validation()) {
            return
        }
        if (!selectedArticle) {
            let Data = {
                title: articledata.title,
                imageUrl: articledata.imageUrl,
                videoUrl: articledata.videoUrl,
                body: articledata.body,
            }
            dispatch(addArticle(Data));
            setIsModalVisible(false)
            handleCancel();
            setPriority(false);
        }
        else {
            if (validation()) {
                return
            }
            let dataEdit = {
                id: selectedArticle.id,
                title: articledata.title,
                imageUrl: articledata.imageUrl,
                videoUrl: articledata.videoUrl,
                body: articledata.body,
                priority: articledata.priority,
                isActive: true,
                isDeleted: false,
            }
            dispatch(editArticles(dataEdit))
            setIsModalVisible(false)
            handleCancel()
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setArticleData({
            title: "",
            imageUrl: "",
            videoUrl: "",
            body: "",
        })
        setSelectedArticle(null)
        setNameTog(false)
        setPriority(false);
        setFormErrors('');
    };

    const onEdit = (id) => {
        let dataForEdit = getArticlesData && getArticlesData.data && getArticlesData.data.data.find((item) => item.id === id)
        if (dataForEdit) {
            setSelectedArticle(dataForEdit)
        }
        dispatch(getArticleById(dataForEdit.id))
        setIsModalVisible(true)
        setNameTog(true)
        setPriority(true);
    }

    const newArticle = userForDelete => {
        const newval = ApiPost("article/editArticle", userForDelete)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(getArticles(perPage, pageNumber))
                }
                return res;
            })
            .catch((err) => {
                return err;
            })
        return newval;
    }

    const onDelete = async (id) => {
        let dataForDelete = getArticlesData && getArticlesData.data && getArticlesData.data.data.find((item) => item.id === id)
        if (dataForDelete) {
            let userForDelete = {
                id: dataForDelete.id,
                title: dataForDelete.title,
                body: dataForDelete.body,
                imageUrl: dataForDelete.imageUrl,
                videoUrl: dataForDelete.videoUrl,
                priority: dataForDelete.priority,
                isActive: false,
                isDeleted: true,
            }

            const deletebanner = await newArticle(userForDelete)
            if (deletebanner.status === 200) {
                toast.success("Article deleted")
            } else {
                toast.error("Something went wrong")
            }
        }
    }

    const exportArticles = () => {
        dispatch(getExportArticles())
    }

    const exportSingleArticle = () => {
        dispatch(getArticles(perPage, pageNumber))
        setExportTog('single');
    }

    useEffect(() => {
        if (exportArticle?.length && exportTog === 'all') {
            CSVLinkRef?.current?.link.click();
            toast.success('Article exported');
            setExportTog('');
            dispatch(getExportArticlesSuccess(null))
        }
        else if (exportsingleArticle?.length && exportTog === 'single') {
            CSVLinkRefSingle?.current?.link.click();
            toast.success('Article exported');
            setExportTog('');
        }
        else if (!exportArticle.length && exportTog) {
            toast.success('No data for export');
        }
    }, [exportTog, exportArticle])

    useEffect(() => {
        if (getExportArticleData?.data.length) {
            setExportArticle(
                getExportArticleData?.data.map(item => {
                    return {
                        ...item,
                        body: item.body,
                        createdAt: item.createdAt,
                        id: item.id,
                        imageUrl: item.imageUrl,
                        isActive: item.isActive,
                        isDeleted: item.isDeleted,
                        priority: item.priority,
                        title: item.title,
                        updatedAt: item.updatedAt,
                        videoUrl: item.videoUrl,
                    }
                })
            )
            setExportTog('all')
        }
    }, [getExportArticleData])

    const onClick = ({ key }) => {
        if (key == 'addArticle') {
            showModal();
        }
        if (key === 'import') {
            setImportModal(true);
        }
        if (key === 'exportArticle') {
            exportArticles()
        }
        if (key === 'exportSingleArticle') {
            exportSingleArticle()
        }
    }


    useEffect(() => {
        if (getArticlesData && getArticlesData.data && getArticlesData.data.data) {
            setExportSingleArticle(getArticlesData && getArticlesData.data && getArticlesData.data.data.map(item => {
                return {
                    ...item,
                    body: item.body,
                    createdAt: item.createdAt,
                    id: item.id,
                    imageUrl: item.imageUrl,
                    isActive: item.isActive,
                    isDeleted: item.isDeleted,
                    priority: item.priority,
                    title: item.title,
                    updatedAt: item.updatedAt,
                    videoUrl: item.videoUrl,
                }
            }))
        }
    }, [getArticlesData])

    useEffect(() => {
        if (getArticlesData && getArticlesData.data && getArticlesData.data.data) {
            setarticleTableData(getArticlesData && getArticlesData.data && getArticlesData.data.data.map((item, id) => {
                return {
                    priority: item.priority,
                    srno: id + 1,
                    title: item.title,
                    body: item.body,
                    imageUrl: item.imageUrl,
                    videoUrl: item.videoUrl,
                    action: (
                        <div className='active-schemes-table' key={id}>
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
    }, [getArticlesData])

    const articleTableColumns = [
        {
            title: 'Priority',
            dataIndex: 'priority',
            sorter: (a, b) => a.title.length - b.title.length,
            sortDirections: ['descend', 'ascend'],
        },

        {
            title: 'srno',
            dataIndex: 'srno',
            sorter: (a, b) => a.title.length - b.title.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Title',
            dataIndex: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Body',
            dataIndex: 'body',
            sorter: (a, b) => a.body.localeCompare(b.body),
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Image url',
            dataIndex: 'imageUrl',
            sorter: (a, b) => a.imageUrl.localeCompare(b.imageUrl),
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Video url',
            dataIndex: 'videoUrl',
            sorter: (a, b) => a.videoUrl.localeCompare(b.videoUrl),
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            width: '90px',
        },
    ];

    const menu = (
        <Menu
            onClick={onClick}
            items={[
                {
                    label: 'Add article',
                    key: 'addArticle',
                },
                {
                    label: 'Export all article',
                    key: 'exportArticle',
                },
                {
                    label: 'Export article',
                    key: 'exportSingleArticle',
                },
                {
                    label: 'Import article',
                    key: 'import',
                },
            ]}
        />
    );

    return (
        <>
            <PageHeader
                ghost
                title="Article"
                buttons={[
                    <div key="1" className="page-header-actions">
                        {/* <Button size="small" type="primary" onClick={showModal}>
                            Add article
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
                            headers={header}
                            data={exportArticle}
                            ref={CSVLinkRef}
                            filename="Article.csv"
                            style={{ opacity: 0 }}
                        ></CSVLink>

                        <CSVLink
                            headers={headerSingle}
                            data={exportsingleArticle}
                            ref={CSVLinkRefSingle}
                            filename="Article.csv"
                            style={{ opacity: 0 }}
                        ></CSVLink>
                    </div>
                ]}
            />

            <Main >
                <Cards headless>
                    <UserTableStyleWrapper>
                        <TableWrapper className="table-responsive pb-30">
                            <Table
                                dataSource={articleTableData}
                                columns={articleTableColumns}
                                pagination={{
                                    defaultPageSize: getArticlesData?.data.per_page,
                                    total: getArticlesData?.data.page_count,
                                    // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                    onChange: (page, pageSize) => {
                                        setPageNumber(page);
                                        setPerPage(pageSize);
                                    },
                                }}
                            />
                        </TableWrapper>
                    </UserTableStyleWrapper>
                </Cards>
            </Main>

            {
                importModal && <ImportArticle importModal={importModal} handleCancel={() => setImportModal(false)} modaltitle="Import article" />
            }

            {isModalVisible &&
                <Modal
                    onOk={() => handleOk()}
                    visible={isModalVisible}
                    onCancel={() => handleCancel()}
                    title="Article"

                    okText={nameTog ? "Edit" : "Add"}
                >
                    <Form name="banner" layout="vertical">
                        <label htmlFor="title">Title</label>
                        <Form.Item>
                            <Input
                                placeholder="Enter title"
                                name="title"
                                value={articledata.title}
                                onChange={(e) => handleChange(e)}
                            />
                            {formErrors?.title && <span style={{ color: "red" }}>{formErrors.title}</span>}

                        </Form.Item>
                        <label htmlFor="imgUrl">Image</label>
                        <Form.Item>
                            <Input
                                type="file"
                                placeholder="Select image"
                                name="imageUrl"
                                // defalutValue={articledata.imageUrl}
                                onChange={(e) => fileUpload(e, "imageUrl")}
                            />
                            {formErrors?.imageUrl && <span style={{ color: "red" }}>{formErrors.imageUrl}</span>}

                        </Form.Item>

                        <label htmlFor="videoUrl">Video url</label>
                        <Form.Item>
                            <Input
                                placeholder="Enter video url"
                                name="videoUrl"
                                value={articledata.videoUrl}
                                onChange={(e) => handleChange(e)}
                            />
                            {formErrors?.videoUrl && <span style={{ color: "red" }}>{formErrors.videoUrl}</span>}
                        </Form.Item>

                        <label htmlFor="body">Body</label>
                        <Form.Item>
                            <Input
                                type="text"
                                placeholder="Enter body"
                                name="body"
                                value={articledata.body}
                                onChange={(e) => handleChange(e)}
                            />
                            {formErrors?.body && <span style={{ color: "red" }}>{formErrors.body}</span>}
                        </Form.Item>

                        {
                            priority ?
                                <>
                                    <label htmlFor="priority">Priority</label>
                                    <Form.Item>
                                        <Input
                                            // type="text"
                                            type="number"
                                            placeholder="Enter priority"
                                            name="priority"
                                            value={articledata.priority}
                                            onChange={(e) => onHandleChange(e, "priority")}
                                            className='experience-input'
                                            id='priority'
                                        />
                                        {formErrors?.priority && <span style={{ color: "red" }}>{formErrors.priority}</span>}
                                    </Form.Item>
                                </> : ""
                        }

                    </Form >
                </Modal >
            }
        </>
    )
}

export default article



