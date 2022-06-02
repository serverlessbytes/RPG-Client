import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Form, Input, Modal, Table } from 'antd';
import { Main, TableWrapper } from '../styled';
import { UserTableStyleWrapper } from '../pages/style';
import { Cards } from '../../components/cards/frame/cards-frame';
import { useDispatch, useSelector } from 'react-redux';
import { addCarousel, carousel, editCarousel, getCarousel, getOneCarousel } from '../../redux/carousel/actionCreator';
import FeatherIcon from 'feather-icons-react';
import actions from '../../redux/carousel/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApiPost } from '../../helper/API/ApiData';
import ImportCarousel from '../../components/modals/ImportCarousel';

const Carousel = () => {
  const dispatch = useDispatch();

  const { getOneCarouselSuccess, addCarouselSuccess, addCarouselErr, editCarouselSuccess, editCarouselErr,addBulkCarouselSuccess,addBulkCarouselErr } = actions;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [carouselTableData, setcarouselTableData] = useState();
  const [selectedCarousel, setSelectedCarousel] = useState(); // for edit
  const [nameTod, setNameTod] = useState(false);
  const [data, setData] = useState({
    title: '',
    imageUrl: '',
  });
  const [perPage, setPerPage] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)
  const [importModel, setImportModel] = useState(false);

  const getCarouseldata = useSelector(state => state.carousel.getCarouselData);
  const getOneCarouselData = useSelector(state => state.carousel.getOneCarouselData);
  const addCarouseldata = useSelector(state => state.carousel.addCarouselData);
  const addCarouselError = useSelector(state => state.carousel.addCarouselError);
  const editCarouselData = useSelector(state => state.carousel.editCarouselData);
  const editCarouselError = useSelector(state => state.carousel.editCarouselError);
  const addBulkCarouselData = useSelector(state => state.carousel.addBulkCarouselData);
  const addBulkCarouselError = useSelector(state => state.carousel.addBulkCarouselError);

  // useEffect(() => {
  //   console.log("getCarouseldata", getCarouseldata)
  // }, [getCarouseldata])

  useEffect(() => {
    if (addBulkCarouselData && addBulkCarouselData.status === 200) {
      dispatch(addBulkCarouselSuccess(null));
      toast.success('Import Carousel successful');
    }
    else if (addBulkCarouselData && addBulkCarouselData.status !== 200){
     toast.error("Something Wrong")
    }
  }, [addBulkCarouselData]);

  useEffect(() => {
    if (addBulkCarouselError) {
      dispatch(addBulkCarouselErr(null));
      toast.error('Something Wrong');
    }
  }, [addBulkCarouselError]);

  useEffect(() => {
    if (addCarouseldata && addCarouseldata.status === 200) {
      dispatch(addCarouselSuccess(null));
      toast.success('Carousel add successful');
    }
  }, [addCarouseldata]);

  useEffect(() => {
    if (addCarouselError) {
      dispatch(addCarouselErr(null));
      toast.error('Something Wrong');
    }
  }, [addCarouselError]);

  useEffect(() => {
    if (editCarouselData && editCarouselData.status === 200) {
      dispatch(editCarouselSuccess(null));
      toast.success('Carousel update successful');
    }
  }, [editCarouselData]);

  useEffect(() => {
    if (editCarouselError) {
      dispatch(editCarouselErr(null));
      toast.error('Something Wrong');
    }
  }, [editCarouselError]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showImportModal = () => {
    setImportModel(true);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
    setNameTod(false);
    setSelectedCarousel(null);
    setData({
      title: '',
      imageUrl: '',
    });
  };
  useEffect(() => {
    return () => {
      dispatch(getOneCarouselSuccess(null));
    };
  }, []);

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(getCarousel(perPage, pageNumber));
  }, [perPage, pageNumber]);

  useEffect(() => {
    if (getOneCarouselData && getOneCarouselData.data) {
      console.log('getOneCarouselData', getOneCarouselData);
      setData({
        imageUrl: getOneCarouselData.data.imageUrl,
        title: getOneCarouselData.data.title,
      });
    }
  }, [getOneCarouselData]);

  const onEdit = id => {
    let dataForEdit = getCarouseldata && getCarouseldata.data && getCarouseldata.data.data.find(item => item.id === id);
    if (dataForEdit) {
      setSelectedCarousel(dataForEdit);
    }
    dispatch(getOneCarousel(dataForEdit.id));
    setIsModalVisible(true);
    setNameTod(true);
  };

  const handleOk = () => {
    if (!selectedCarousel) {
      let Data = {
        title: data.title,
        imageUrl: data.imageUrl,
      };
      dispatch(addCarousel(Data));
      setIsModalVisible(false);
      handleCancel();
    } else {
      let dataEdit = {
        id: selectedCarousel.id,
        title: data.title,
        imageUrl: data.imageUrl,
        isActive: true,
        isDeleted: false,
      };
      //console.log("data",dataEdit)
      dispatch(editCarousel(dataEdit));
      setIsModalVisible(false);
      handleCancel();
    }
    setNameTod(false);
  };

  const newCarousel = userForDelete => {
    const newVal = ApiPost(`carousel/editCarousel`, userForDelete)
      .then(res => {
        if (res.status === 200) {
          dispatch(getCarousel(perPage,pageNumber));
        }
        return res;
      })
      .catch(err => {
        return err;
      });
    return newVal;
  };

  const onDelete = async id => {
    let dataForDelete = getCarouseldata && getCarouseldata.data && getCarouseldata.data.data.find(item => item.id === id);
    console.log('dataForDelete', dataForDelete);
    if (dataForDelete) {
      console.log('dataForDelete', dataForDelete);
      let userForDelete = {
        id: dataForDelete.id,
        title: dataForDelete.title,
        imageUrl: dataForDelete.imageUrl,
        isActive: false,
        isDeleted: true,
      };
      // dispatch(editCarousel(userForDelete))
      const deleteCarousel = await newCarousel(userForDelete);
      if (deleteCarousel.status === 200) {
        toast.success('Carousel deleted successful');
      }
    }
  };

  useEffect(() => {
    if (getCarouseldata && getCarouseldata.data) {
      setcarouselTableData(
        getCarouseldata && getCarouseldata.data &&
        getCarouseldata.data.data.map(item => {
          return {
            title: item.title,
            imageUrl: item.imageUrl,
            action: (
              <div className="active-schemes-table">
                <div className="table-actions">
                  <>
                    <Button className="btn-icon" type="info" to="#" onClick={() => onEdit(item.id)} shape="circle">
                      <FeatherIcon icon="edit" size={16} />
                    </Button>
                    <Button
                      className="btn-icon"
                      type="danger"
                      to="#"
                      onClick={() => onDelete(item.id)}
                      shape="circle"
                    >
                      <FeatherIcon icon="trash-2" size={16} />
                    </Button>
                  </>
                </div>
              </div>
            ),
          };
        }),
      );
    }
  }, [getCarouseldata]);

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
            <Button size="small" type="primary" onClick={showImportModal}>
              Import carousel
            </Button>
          </div>,
        ]}
      />

      <Main>
        <Cards headless>
          <UserTableStyleWrapper>
            <TableWrapper className="table-responsive pb-30">
              <Table
                // rowSelection={rowSelection}
                dataSource={carouselTableData}
                columns={carouselTableColumns}
                pagination={{
                  defaultPageSize: getCarouseldata?.data.per_page,
                  total: getCarouseldata?.data.page_count,
                  onChange: (page, pageSize) => {
                    setPageNumber(page);
                    setPerPage(pageSize);
                  },
                }}
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

      {isModalVisible && (
        <Modal
          onOk={() => handleOk()}
          visible={isModalVisible}
          onCancel={() => handleCancel()}
          title="Carousel"
          okText={nameTod ? 'Edit' : 'Add'}
        >
          <Form name="carousel" layout="vertical">
            <label htmlFor="title">Title</label>
            <Form.Item>
              <Input placeholder="Enter title" name="title" onChange={e => handleChange(e)} value={data.title} />
            </Form.Item>
            <label htmlFor="imgUrl">Image URL</label>
            <Form.Item>
              <Input
                type="text"
                placeholder="Enter image URL"
                name="imageUrl"
                value={data.imageUrl}
                onChange={e => handleChange(e)}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}

      {importModel && <ImportCarousel modaltitle="Import Carousel" handleCancel={() => setImportModel(false)} importModel={importModel} />}
    </>
  );
};

export default Carousel;
