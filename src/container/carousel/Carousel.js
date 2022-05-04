import React, { useEffect, useState } from 'react'
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Form, Input, Modal, Table } from 'antd';
import { Main, TableWrapper } from '../styled';
import { UserTableStyleWrapper } from '../pages/style';
import { Cards } from '../../components/cards/frame/cards-frame';
import { useDispatch, useSelector } from 'react-redux';
import { addCarousel, editCarousel, getCarousel, getOneCarousel } from '../../redux/carousel/actionCreator';
import FeatherIcon from 'feather-icons-react';
import actions from '../../redux/carousel/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Carousel = () => {
    const dispatch = useDispatch()

    const { getOneCarouselSuccess, addCarouselSuccess, addCarouselErr, editCarouselSuccess, editCarouselErr } = actions;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [carouselTableData, setcarouselTableData] = useState([{ title: 'ABC' }, { title: 'BCD' }]);
    const [selectedCarousel, setSelectedCarousel] = useState(); // for edit
    const [data, setData] = useState({
        title: "",
        imageUrl: "",
    });
    // const [languageTableData, setLanguageTableData] = useState([{title:'ABC'},{title:'BCD'}]);

    const getCarouseldata = useSelector((state) => state.carousel.getCarouselData)
    const getOneCarouselData = useSelector((state) => state.carousel.getOneCarouselData)
    const addCarouseldata = useSelector((state) => state.carousel.addCarouselData)
    const addCarouselError = useSelector((state) => state.carousel.addCarouselError)
    const editCarouselData = useSelector((state) => state.carousel.editCarouselData)
    const editCarouselError = useSelector((state) => state.carousel.editCarouselError)
    
    useEffect(() => {
        if (addCarouseldata && addCarouseldata.status === 200) {
            dispatch(addCarouselSuccess(null))
            toast.success("Carousel add successful")
        }
    }, [addCarouseldata])

    useEffect(() => {
        if (addCarouselError) {
            dispatch(addCarouselErr(null))
            toast.error("Something Wrong")
        }
    }, [addCarouselError])

    useEffect(() => {
        if (editCarouselData && editCarouselData.status === 200) {
            dispatch(editCarouselSuccess(null))
            toast.success("Carousel update successful")
        }
    }, [editCarouselData])

    useEffect(() => {
        if (editCarouselError) {
            dispatch(editCarouselErr(null))
            toast.error("Something Wrong")
        }
    }, [editCarouselError])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setData({
            title: "",
            imageUrl: ""
        })
        dispatch(getOneCarouselSuccess(null))
        setSelectedCarousel(null)
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        dispatch(getCarousel())
    }, [])

    useEffect(() => {
        if (getOneCarouselData && getOneCarouselData.data) {
            console.log("getOneCarouselData", getOneCarouselData)
            setData({
                imageUrl: getOneCarouselData.data.imageUrl,
                title: getOneCarouselData.data.title,
            })
        }
    }, [getOneCarouselData])

    const onEdit = (id) => {
        let dataForEdit = getCarouseldata && getCarouseldata.data.find((item) => item.id === id)
        if (dataForEdit) {
            setSelectedCarousel(dataForEdit)
        }
        dispatch(getOneCarousel(dataForEdit.id))
        setIsModalVisible(true);
    }

    const handleOk = () => {
        if (!selectedCarousel) {
            let Data = {
                title: data.title,
                imageUrl: data.imageUrl,
            }
            dispatch(addCarousel(Data))
            handleCancel()
        }

        else {
            let dataEdit = {
                id: selectedCarousel.id,
                title: data.title,
                imageUrl: data.imageUrl,
                isActive: true,
                isDeleted: false,
            }
            //console.log("data",dataEdit)
            dispatch(editCarousel(dataEdit))
            handleCancel()
        }

    };

    const onDelete = (id) => {
        let dataForDelete = getCarouseldata && getCarouseldata.data.find((item) => item.id === id)
        console.log("dataForDelete",dataForDelete)
          if(dataForDelete){
            console.log("dataForDelete",dataForDelete)
            let userForDelete = {
                id: dataForDelete.id,
                title: dataForDelete.title,
                imageUrl: dataForDelete.imageUrl,
                isActive: false,
                isDeleted: true,
            }
            dispatch(editCarousel(userForDelete))
          }
    }

    useEffect(() => {
        if (getCarouseldata && getCarouseldata.data) {
            setcarouselTableData(getCarouseldata && getCarouseldata.data.map((item) => {
                return {
                    title: item.title,
                    imageUrl: item.imageUrl,
                    action: (
                        <div className='active-schemes-table'>
                            <div className="table-actions">
                                <>
                                    <Button className="btn-icon" type="info" to="#" onClick={() => onEdit(item.id)} shape="circle">
                                        <FeatherIcon icon="edit" size={16} />
                                    </Button>
                                    <Button className="btn-icon" type="danger" to="#" onClick={() => onDelete(item.id)} shape="circle">
                                        <FeatherIcon icon="x-circle" size={16} />
                                    </Button>
                                </>
                            </div>
                        </div>
                    )
                }
            })
            )
        }
    }, [getCarouseldata])

    const carouselTableColumns = [
        {
            title: 'Title',
            dataIndex: 'title',
            sorter: (a, b) => a.title.length - b.title.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'ImageUrl',
            dataIndex: 'imageUrl',
            sorter: (a, b) => a.imageUrl.length - b.imageUrl.length,
            sortDirections: ['descend', 'ascend'],
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
                title="Carousel"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" type="primary" onClick={showModal}>
                            Add Carousel
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
                                dataSource={carouselTableData}
                                columns={carouselTableColumns}
                                pagination={false}
                            />

                        </TableWrapper>
                    </UserTableStyleWrapper>
                    {/* <ProjectPagination>

                        <Pagination
                            onChange={() => { }}
                            showSizeChanger
                            onShowSizeChange={() => { }}
                            pageSize={10}
                            defaultCurrent={1}
                            total={10}
                        />

                    </ProjectPagination> */}
                </Cards>
            </Main>

            {isModalVisible &&
                <Modal
                    onOk={() => handleOk()}
                    visible={isModalVisible}
                    onCancel={() => handleCancel()}
                    title="Carousel"
                    okText="Add"
                >
                    <Form name="carousel" layout="vertical">
                        <label htmlFor="title">Title</label>
                        <Form.Item>
                            <Input
                                placeholder="Enter title"
                                name="title"
                                onChange={(e) => handleChange(e)}
                                value={data.title}

                            />
                        </Form.Item>
                        <label htmlFor="imgUrl">Image URL</label>
                        <Form.Item>
                            <Input
                                type="text"
                                placeholder="Enter image URL"
                                name="imageUrl"
                                value={data.imageUrl}
                                onChange={(e) => handleChange(e)}
                            />
                        </Form.Item>
                    </Form>
                </Modal>}
        </>
    )
}

export default Carousel