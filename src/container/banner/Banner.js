
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Dropdown, Form, Input, Menu, Modal, Space, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addBanner, editBanner, GetBanner, getExportBanners, getOneBanner } from '../../redux/banner/actionCreator';
import { Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { UserTableStyleWrapper } from '../pages/style';
import FeatherIcon from 'feather-icons-react';
import actions from '../../redux/banner/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiPost } from '../../helper/API/ApiData';
import Importbanner from '../../components/modals/ImportBanner';
import { DownOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';

const Banner = () => {
    const dispatch = useDispatch();
    const CSVLinkRef = useRef(null);
    const { getOneBannerSuccess, addBannerSuccess, addBannerErr, editBannerSuccess, editBannerErr, addBulkBannerSuccess, addBulkBannerErr, getExportBannersSuccess } = actions;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [importModel, setImportModel] = useState(false);
    const [bannerTableData, setBannerTableData] = useState([]); // for table
    const [perPage, setPerPage] = useState(20)
    const [pageNumber, setPageNumber] = useState(1)
    const [selectedBanner, setSelectedBanner] = useState();
    const [nameTog, setNameTog] = useState(false)
    const [data, setData] = useState({
        title: "",
        imageUrl: null
    });
    const [fileError, setFileError] = useState('');
    const [formErrors, setFormErrors] = useState();
    const [exportBannerData, setExportBannerData] = useState([]);
    const [exportTog, setExportTog] = useState(false);

    const getBannerData = useSelector((state) => state.banner.getBannerData);
    const getOneBannerdata = useSelector((state) => state.banner.getOneBannerData);
    const addBannerdata = useSelector((state) => state.banner.addBannerData);
    const addBannerError = useSelector((state) => state.banner.addBannerError);
    const editBannerdata = useSelector((state) => state.banner.editBannerData);
    const editBannerError = useSelector((state) => state.banner.editBannerError);
    const addBulkbannerData = useSelector((state) => state.banner.addBulkbannerData);
    const addBulkbannerErr = useSelector((state) => state.banner.addBulkbannerErr);
    const getExportBannerData = useSelector((state) => state.banner.getExportBannerData);


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        setFormErrors({ ...formErrors, title: "" });
    }

    const fileUpload = (e, name) => {
        let firsttemp = e.target.files[0]?.name?.split('.');
        if (firsttemp) {
            let fileexten = ['jpeg', 'jpg', 'png']
            if (fileexten?.includes(firsttemp[firsttemp?.length - 1])) {
                setData({ ...data, [name]: e.target.files[0] })
                setFormErrors({ ...formErrors, imageUrl: "" });
            }
            else {
                setFormErrors({ ...formErrors, imageUrl: 'Please select valid document file' })
                setData({ ...data, imageUrl: '' })
            }
        }
        else {
            setFormErrors({ ...formErrors, imageUrl: 'Please select document file' })
        }
    }

    useEffect(() => {
        dispatch(GetBanner(perPage, pageNumber));
    }, [perPage, pageNumber])

    useEffect(() => {
        if (addBulkbannerData && addBulkbannerData.status === 200) {
            dispatch(addBulkBannerSuccess(null))
            toast.success("Import banner")
        }
        else if (addBulkbannerData && addBulkbannerData.status !== 200) {
            toast.error("Something went wrong")
        }
    }, [addBulkbannerData])

    useEffect(() => {
        if (addBulkbannerErr) {
            dispatch(addBulkBannerErr(null))
            toast.error("Something went wrong")
        }
    }, [addBulkbannerErr])

    useEffect(() => {
        if (addBannerdata && addBannerdata.status === 200) {
            dispatch(addBannerSuccess(null))
            toast.success("Banner added")
        }
    }, [addBannerdata])

    useEffect(() => {
        if (addBannerError) {
            dispatch(addBannerErr(null))
            toast.error("Something went wrong")
        }
    }, [addBannerError])

    useEffect(() => {
        if (editBannerdata && editBannerdata.status === 200) {
            dispatch(editBannerSuccess(null))
            toast.success("Banner updated")
        }
    }, [editBannerdata])

    useEffect(() => {
        if (editBannerError) {
            dispatch(editBannerErr(null))
            toast.error("Something went wrong")
        }
    }, [editBannerError])

    useEffect(() => {
        if (getOneBannerdata && getOneBannerdata.data) {
            setData({
                ...data,
                title: getOneBannerdata.data.title,
                imageUrl: getOneBannerdata.data.imageUrl,
            })
        }
    }, [getOneBannerdata])

    const header = [
        { label: 'createdAt', key: 'createdAt' },
        { label: 'id', key: 'id' },
        { label: 'imageUrl', key: 'imageUrl' },
        { label: 'isActive', key: 'isActive' },
        { label: 'isDeleted', key: 'isDeleted' },
        { label: 'title', key: 'title' },
        { label: 'updatedAt', key: 'updatedAt' },
    ];

    const showModal = () => {
        setIsModalVisible(true);
    };

    const showImportModal = () => {
        setImportModel(true);
    }

    const validation = () => {
        let flag = false;
        const error = {};

        if (!data.title) {
            error.title = "Please enter title"
            flag = true
        }
        if (!data.imageUrl) {
            error.imageUrl = "Please select image"
            flag = true
        }
        setFormErrors(error);
        return flag
    }

    const handleOk = () => {
        if (validation()) {
            return
        };
        if (!selectedBanner) {
            let Data = {
                title: data.title,
                imageUrl: data.imageUrl,
            }
            dispatch(addBanner(Data));
            setIsModalVisible(false)
            setData({
                title: "",
                imageUrl: ""
            })
        }
        else {
            if (validation()) {
                return
            }
            let dataEdit = {
                id: selectedBanner.id,
                title: data.title,
                imageUrl: data.imageUrl,
                isActive: true,
                isDeleted: false,
            }
            dispatch(editBanner(dataEdit))
            setIsModalVisible(false)
            handleCancel()
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setData({
            title: "",
            imageUrl: ""
        })
        setSelectedBanner(null);
        setNameTog(false);
        setFormErrors('');
        setFileError('');
    };

    useEffect(() => {
        return (() => {
            dispatch(getOneBannerSuccess([]))
        })
    }, [])

    const onEdit = (id) => {
        let dataForEdit = getBannerData && getBannerData.data && getBannerData.data.data.find((item) => item.id === id)
        if (dataForEdit) {
            setSelectedBanner(dataForEdit)
        }
        dispatch(getOneBanner(dataForEdit.id))
        setIsModalVisible(true);
        setNameTog(true);
    }

    const newBanner = userForDelete => {
        const newval = ApiPost("banner/editBanner", userForDelete)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(GetBanner(perPage, pageNumber))
                }
                return res;
            })
            .catch((err) => {
                return err;
            })
        return newval;
    }

    const onDelete = async (id) => {
        let dataForDelete = getBannerData && getBannerData.data && getBannerData.data.data.find((item) => item.id === id)
        if (dataForDelete) {
            let userForDelete = {
                id: dataForDelete.id,
                title: dataForDelete.title,
                imageUrl: dataForDelete.imageUrl,
                isActive: false,
                isDeleted: true,
            }
            const deletebanner = await newBanner(userForDelete)
            if (deletebanner.status === 200) {
                toast.success("Banner deleted")
            } else {
                toast.error("Something went wrong")
            }
        }
    }

    const exportBanner = () => {
        dispatch(getExportBanners())
    }

    useEffect(() => {
        if (exportBannerData?.length && exportTog) {
            CSVLinkRef?.current?.link.click();
            toast.success('Banner exported');
            setExportTog(false);
            dispatch(getExportBannersSuccess(null))
        }
        else if (!exportBannerData.length && exportTog) {
            toast.success('No data for export');
        }
    }, [exportTog, exportBannerData])

    useEffect(() => {
        if (getExportBannerData?.data) {
            setExportBannerData(
                getExportBannerData?.data.map(item => {
                    return {
                        ...item,
                        createdAt: item.createdAt,
                        id: item.id,
                        imageUrl: item.imageUrl,
                        isActive: item.isActive,
                        isDeleted: item.isDeleted,
                        title: item.title,
                        updatedAt: item.updatedAt,
                    }
                })
            )
            setExportTog(true);
        }
    }, [getExportBannerData])

    useEffect(() => {
        if (getBannerData && getBannerData.data) {
            setBannerTableData(getBannerData && getBannerData.data && getBannerData.data.data.map((item, i) => {
                return {
                    title: item.title,
                    imageUrl: item.imageUrl,
                    action: (
                        <div className='active-schemes-table' key={i}>
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
    }, [getBannerData])

    const bannerTableColumns = [
        {
            title: 'Title',
            dataIndex: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Image url',
            dataIndex: 'imageUrl',
            sorter: (a, b) => a.imageUrl.localeCompare(b.imageUrl),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            width: '90px',
        },
    ];

    const onClick = ({ key }) => {
        if (key == 'addBanner') {
            showModal();
        }
        if (key === 'importBanner') {
            showImportModal();
        }
        if (key === 'exportBanner') {
            exportBanner();
        }
    }

    const menu = (
        <Menu
            onClick={onClick}
            items={[
                {
                    label: 'Import banner',
                    key: 'importBanner',
                },
                {
                    label: 'Add banner',
                    key: 'addBanner',
                },
                {
                    label: 'Export banner',
                    key: 'exportBanner',
                }
            ]}
        />
    );
    
    return (
        <>
            <PageHeader
                ghost
                title="Banner"
                buttons={[
                    <div key="1" className="page-header-actions">
                        {/* <Button size="small" type="primary" onClick={showModal}>
                            Add banner
                        </Button>

                        <Button size="small" type="primary" onClick={showImportModal}>
                            Import banner
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
                            data={exportBannerData}
                            ref={CSVLinkRef}
                            filename="Banner.csv"
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
                                // rowSelection={rowSelection}
                                dataSource={bannerTableData}
                                columns={bannerTableColumns}
                                pagination={{
                                    defaultPageSize: getBannerData?.data.per_page,
                                    total: getBannerData?.data.page_count,
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

            {isModalVisible &&
                <Modal
                    onOk={() => handleOk()}
                    visible={isModalVisible}
                    onCancel={() => handleCancel()}
                    title="Banner"
                    okText={nameTog ? "Edit" : "Add"}
                >
                    <Form name="banner" layout="vertical">
                        <label htmlFor="title">Title</label>
                        <Form.Item>
                            <Input
                                placeholder="Enter title"
                                name="title"
                                value={data.title}
                                onChange={(e) => handleChange(e)}
                            />
                            {formErrors?.title && <span style={{ color: "red" }}>{formErrors.title}</span>}
                        </Form.Item>

                        <label htmlFor="imgUrl">Image</label>
                        <Form.Item>
                            <Input
                                type="file"
                                placeholder="Enter image"
                                name="imageUrl"
                                defaultValue={data.imageUrl}
                                onChange={(e) => fileUpload(e, "imageUrl")}
                            />
                            {formErrors?.imageUrl && <span style={{ color: "red" }}>{formErrors.imageUrl}</span>}
                        </Form.Item>
                    </Form>
                </Modal>}
            {importModel && <Importbanner modaltitle="Import banner" handleCancel={() => setImportModel(false)} importModel={importModel} />}
        </>
    )
}

export default Banner