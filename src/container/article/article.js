
import React, { useEffect, useState } from 'react'
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Col, Form, Input, Modal, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper } from '../pages/style';
import FeatherIcon from 'feather-icons-react';
import actions from '../../redux/article/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { set } from 'js-cookie';
import { ApiPost } from '../../helper/API/ApiData';
import { async } from '@firebase/util';
import { addArticle, editArticles, getArticleById, getArticles } from '../../redux/article/actionCreator';
import { useHistory } from 'react-router';

//import { data, data } from 'browserslist';

const article = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { addArticleSuccess, addArticleErr, editArticlesSuccess, editArticlesErr } = actions;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [articleTableData, setarticleTableData] = useState([]); // for table
    const [perPage, setPerPage] = useState(20); // forpagination
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedArticle, setSelectedArticle] = useState();
    const [nameTog, setNameTog] = useState(false)
    const [articledata, setArticleData] = useState({
        title: "",
        imageUrl: "",
        videoUrl: "dfd",
        body: "",
    });
    const [formErrors, setFormErrors] = useState();

    const getArticlesData = useSelector((state) => state.articles.getArticlesData);
    const getArticleByIdData = useSelector((state) => state.articles.getArticleByIdData);
    const addArticleData = useSelector((state) => state.articles.addArticleData);
    const addArticleError = useSelector((state) => state.articles.addArticleErr);
    const editArticlesData = useSelector((state) => state.articles.editArticlesData);
    const editArticlesError = useSelector((state) => state.articles.editArticlesErr);

    const handleChange = (e) => {
        setArticleData({ ...articledata, [e.target.name]: e.target.value })
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

    const fileUploadVideo = (e, name) => {

        let firsttemp = e.target.files[0].name?.split('.');
       
        let fileexten = ['mp4', 'mkv', 'avi', 'wmv', 'flv']

        // if (fileexten.includes(firsttemp[firsttemp.length - 1])) {
        //     setArticleData({ ...articledata, [name]: e.target.files[0] })
        //     setFormErrors({ ...formErrors, videoUrl: "" });
        // }
        // else {
        //     setFormErrors({ ...formErrors, videoUrl: 'Please select valid document file' })
        //     setArticleData({ ...articledata, videoUrl: '' })
        // }
    }

    const validation = () => {
        let flag = false;
        const error = {};

        if (!articledata.title) {
            error.title = "Please enter title"
            flag = true
        }
        if (!articledata.imageUrl) {
            error.imageUrl = "Please select document file"
            flag = true
        }
        // if (!articledata.videoUrl) {
        //     error.videoUrl = "Please select document file"
        //     flag = true
        // }
        if (!articledata.body) {
            error.body = "Please enter  body"
            flag = true
        }
        setFormErrors(error);
        return flag
    }


    useEffect(() => {
        dispatch(getArticles(perPage, pageNumber));
    }, [perPage, pageNumber])

    useEffect(() => {
        if (addArticleData && addArticleData.status === 200) {
            dispatch(addArticleSuccess(null))
            toast.success("Article add successful")
        }
    }, [addArticleData])

    useEffect(() => {
        if (addArticleError) {
            dispatch(addArticleErr(null))
            toast.error("Something Wrong")
        }
    }, [addArticleError])

    useEffect(() => {
        if (editArticlesData && editArticlesData.status === 200) {
            dispatch(editArticlesSuccess(null))
            toast.success("Article update successful")
        } else if (editArticlesData && editArticlesData.status !== 200) {
            toast.error("Something Wrong")
        }
    }, [editArticlesData])

    useEffect(() => {
        if (editArticlesError) {
            dispatch(editArticlesErr(null))
            toast.error("Something Wrong")
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
        //dispatch(GetBanner());
    }, [getArticleByIdData])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (!selectedArticle) {
            if (validation()) {
                return
            }
            let Data = {
                title: articledata.title,
                imageUrl: articledata.imageUrl,
                videoUrl: articledata.videoUrl,
                body: articledata.body,
            }
            dispatch(addArticle(Data));
            setIsModalVisible(false)
            // setArticleData({
            //     title: "",
            //     imageUrl: ""
            // })
            handleCancel();
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
    };

    const onEdit = (id) => {
        let dataForEdit = getArticlesData && getArticlesData.data && getArticlesData.data.data.find((item) => item.id === id)
        if (dataForEdit) {
            setSelectedArticle(dataForEdit)
        }
        dispatch(getArticleById(dataForEdit.id))
        setIsModalVisible(true)
        setNameTog(true)
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
                isActive: false,
                isDeleted: true,
            }
            // dispatch(editArticles(userForDelete))

            const deletebanner = await newArticle(userForDelete)
            if (deletebanner.status === 200) {
                toast.success("Article delete successful")
            }
        }
    }

    // const viewArticle = (id) => {
    //     history.push(`/admin/article/articleview?id=${id}`)
    // }

    useEffect(() => {
        if (getArticlesData && getArticlesData.data && getArticlesData.data.data) {
            setarticleTableData(getArticlesData && getArticlesData.data && getArticlesData.data.data.map((item) => {
                return {
                    title: (
                        <span className='For-Underline' onClick={() => viewArticle(item.id)}>
                            {item.title}
                        </span>
                    ),
                    body: item.body,
                    imageUrl: item.imageUrl,
                    videoUrl: item.videoUrl,
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
    }, [getArticlesData])

    const articleTableColumns = [
        {
            title: 'Title',
            dataIndex: 'title',
            // sorter: (a, b) => a.getArticlesData.data.data.length - b.getArticlesData.data.data.length,
            // sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Body',
            dataIndex: 'body',

        },
        {
            title: 'ImageUrl',
            dataIndex: 'imageUrl',
        },
        {
            title: 'VideoUrl',
            dataIndex: 'videoUrl',
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
                title="Article"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" type="primary" onClick={showModal}>
                            Add Article
                        </Button>
                    </div>
                ]}
            />

            <Main >
                <Cards headless>
                    <UserTableStyleWrapper>
                        <TableWrapper className="table-responsive pb-30">
                            <Table
                                // rowSelection={rowSelection}
                                dataSource={articleTableData}
                                columns={articleTableColumns}
                                // pagination={false}
                                pagination={{
                                    defaultPageSize: getArticlesData?.data.per_page,
                                    total: getArticlesData?.data.page_count,
                                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                                    onChange: (page, pageSize) => {
                                        setPageNumber(page);
                                        setPerPage(pageSize);
                                    },
                                }}
                            />
                        </TableWrapper>
                    </UserTableStyleWrapper>
                    {/* <ProjectPagination>
                        {schemeCategoryTableData.length ? (
                            <Pagination
                                onChange={onHandleChange}
                                showSizeChanger
                                onShowSizeChange={onShowSizeChange}
                                pageSize={10}
                                defaultCurrent={1}
                                total={10}
                            />
                        ) : null}
                    </ProjectPagination> */}
                </Cards>
            </Main>

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
                        <label htmlFor="imgUrl">Image URL</label>
                        <Form.Item>
                            <Input
                                type="file"
                                placeholder="Enter image URL"
                                name="imageUrl"
                                defalutValue={articledata.imageUrl}
                                onChange={(e) => fileUpload(e, "imageUrl")}
                            />
                            {formErrors?.imageUrl && <span style={{ color: "red" }}>{formErrors.imageUrl}</span>}

                        </Form.Item>

                        <label htmlFor="videoUrl">Video URL</label>
                        <Form.Item>
                            <Input
                                type="file"
                                placeholder="Enter Video URL"
                                name="videoUrl"
                                defalutValue={articledata.videoUrl}
                                onChange={(e) => fileUploadVideo(e,"videoUrl")}
                            />
                            {/* {formErrors?.videoUrl && <span style={{ color: "red" }}>{formErrors.videoUrl}</span>} */}
                        </Form.Item>

                        <label htmlFor="body">Body</label>
                        <Form.Item>
                            <Input
                                type="text"
                                placeholder="Enter Body"
                                name="body"
                                value={articledata.body}
                                onChange={(e) => handleChange(e)}
                            />
                            {formErrors?.body && <span style={{ color: "red" }}>{formErrors.body}</span>}
                        </Form.Item>
                    </Form>
                </Modal>}
        </>
    )
}

export default article



