
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
import { ApiPost } from '../../helper/API/ApiData';
import ImportCarousel from '../../components/modals/ImportCarousel';

const Carousel = () => {
  const dispatch = useDispatch();

  const { getOneCarouselSuccess, addCarouselSuccess, addCarouselErr, editCarouselSuccess, editCarouselErr, addBulkCarouselSuccess, addBulkCarouselErr } = actions;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [carouselTableData, setCarouselTableData] = useState([]);
  const [selectedCarousel, setSelectedCarousel] = useState(); // for edit
  const [nameTod, setNameTod] = useState(false);

  const [perPage, setPerPage] = useState(20)
  const [pageNumber, setPageNumber] = useState(1)
  const [importModel, setImportModel] = useState(false);
  const [formErrors, setFormErrors] = useState();
  const [data, setData] = useState({
    title: '',
    imageUrl: '',
  });

  const getCarouselData = useSelector(state => state.carousel.getCarouselData);
  const getOneCarouselData = useSelector(state => state.carousel.getOneCarouselData);
  const addCarouseldata = useSelector(state => state.carousel.addCarouselData);
  const addCarouselError = useSelector(state => state.carousel.addCarouselError);
  const editCarouselData = useSelector(state => state.carousel.editCarouselData);
  const editCarouselError = useSelector(state => state.carousel.editCarouselError);
  const addBulkCarouselData = useSelector(state => state.carousel.addBulkCarouselData);
  const addBulkCarouselError = useSelector(state => state.carousel.addBulkCarouselError);

  useEffect(() => {
    if (addBulkCarouselData && addBulkCarouselData.status === 200) {
      dispatch(addBulkCarouselSuccess(null));
      toast.success('Import carousel');
    }
    else if (addBulkCarouselData && addBulkCarouselData.status !== 200) {
      toast.error("Something went wrong")
    }
  }, [addBulkCarouselData]);

  useEffect(() => {
    if (addBulkCarouselError) {
      dispatch(addBulkCarouselErr(null));
      toast.error('Something went wrong');
    }
  }, [addBulkCarouselError]);

  useEffect(() => {
    if (addCarouseldata && addCarouseldata.status === 200) {
      dispatch(addCarouselSuccess(null));
      toast.success('Carousel added');
    }
  }, [addCarouseldata]);

  useEffect(() => {
    if (addCarouselError) {
      dispatch(addCarouselErr(null));
      toast.error('Something went wrong');
    }
  }, [addCarouselError]);

  useEffect(() => {
    if (editCarouselData && editCarouselData.status === 200) {
      dispatch(editCarouselSuccess(null));
      toast.success('Carousel updated');
    }
  }, [editCarouselData]);

  useEffect(() => {
    if (editCarouselError) {
      dispatch(editCarouselErr(null));
      toast.error('Something went wrong');
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
    setFormErrors('');
    // setFileError('');
  };

  useEffect(() => {
    return () => {
      dispatch(getOneCarouselSuccess(null));
    };
  }, []);

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, title: "" });
  };

  const fileUpload = (e, name) => {
    let firsttemp = e.target.files[0]?.name?.split('.');

    if (firsttemp) {
      let fileexten = ['jpeg', 'jpg', 'png']
      if (fileexten.includes(firsttemp[firsttemp.length - 1])) {
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

  useEffect(() => {
    dispatch(getCarousel(perPage, pageNumber));
  }, [perPage, pageNumber]);

  useEffect(() => {
    if (getOneCarouselData && getOneCarouselData.data) {
      setData({
        imageUrl: getOneCarouselData.data.imageUrl,
        title: getOneCarouselData.data.title,
      });
    }
  }, [getOneCarouselData]);

  const onEdit = id => {
    let dataForEdit = getCarouselData && getCarouselData.data && getCarouselData.data.data.find(item => item.id === id);
    if (dataForEdit) {
      setSelectedCarousel(dataForEdit);
    }
    dispatch(getOneCarousel(dataForEdit.id));
    setIsModalVisible(true);
    setNameTod(true);
  };

  const handleOk = () => {

    if (!selectedCarousel) {
      if (validation()) {
        return
      }

      let Data = {
        title: data.title,
        imageUrl: data.imageUrl,
      };
      dispatch(addCarousel(Data));
      setIsModalVisible(false);
      handleCancel();
    }

    else {
      if (validation()) {
        return
      }
      let dataEdit = {
        id: selectedCarousel.id,
        title: data.title,
        imageUrl: data.imageUrl,
        isActive: true,
        isDeleted: false,
      };

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
          dispatch(getCarousel(perPage, pageNumber));
        }
        return res;
      })
      .catch(err => {
        return err;
      });
    return newVal;
  };

  const onDelete = async id => {
    let dataForDelete = getCarouselData && getCarouselData.data && getCarouselData.data.data.find(item => item.id === id);
    if (dataForDelete) {
      let userForDelete = {
        id: dataForDelete.id,
        title: dataForDelete.title,
        imageUrl: dataForDelete.imageUrl,
        isActive: false,
        isDeleted: true,
      };
      const deleteCarousel = await newCarousel(userForDelete);
      if (deleteCarousel.status === 200) {
        toast.success('Carousel deleted');
      } else {
        toast.error("Something went wrong")
      }
    }
  };

  useEffect(() => {
    if (getCarouseldata && getCarouseldata.data) {
      setcarouselTableData(getCarouseldata && getCarouseldata.data && getCarouseldata.data.data.map(item => {
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
  }, [getCarouselData]);

  const carouselTableColumns = [
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

  return (
    <>
      <PageHeader
        ghost
        title="Carousel"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button size="small" type="primary" onClick={showModal}>
              Add carousel
            </Button>
            <Button size="small" type="primary" onClick={showImportModal}>
              Import carousel
            </Button>
          </div>
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
                  defaultPageSize: getCarouselData?.data.per_page,
                  total: getCarouselData?.data.page_count,
                  showSizeChanger: true,
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
              {formErrors?.title && <span style={{ color: "red" }}>{formErrors.title}</span>}
            </Form.Item>

            <label htmlFor="imgUrl">Image</label>
            <Form.Item>
              <Input
                type="file"
                placeholder="Select image"
                name="imageUrl"
                defalutValue={data.imageUrl}
                onChange={e => fileUpload(e, "imageUrl")}
              />
              {formErrors?.imageUrl && <span style={{ color: "red" }}>{formErrors.imageUrl}</span>}
            </Form.Item>
          </Form>
        </Modal>
      )}
      {importModel && <ImportCarousel modaltitle="Import carousel" handleCancel={() => setImportModel(false)} importModel={importModel} />}
    </>
  );
};

export default Carousel;
