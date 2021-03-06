import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { ListButtonSizeWrapper, Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Col, Form, Input, Row, Select, Table, Tabs, Switch } from 'antd';
import { UserTableStyleWrapper } from '../pages/style';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { addPartnerCourse, deleteCourses, editPartnerCoursefilter, getallSwayamCourse, getCategoryData, getCoursefilter, getOneCoursefilter, } from '../../redux/course/actionCreator';
import ViewPartnerCourse from './ViewPartnerCourse';
import { CSVLink } from 'react-csv';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import actions from '../../redux/course/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImportPartnerCourse from '../../components/modals/ImportPartnerCourses';
import { Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import StarRatings from 'react-star-ratings';
import ConfirmModal from '../../components/modals/confirm_modal';
import SweetAlert from 'react-bootstrap-sweetalert';

const PartnerCourses = () => {
  const { addPartnerCourseSuccess, addPartnerCourseErr, getallSwayamCourseSuccess, editPartnerCourseSuccess, editPartnerCourseErr, addPartnerCourseInBulkSuccess, deleteCourseSuccess,
    deleteCourseErr, } = actions;
  const history = useHistory();
  let dispatch = useDispatch();
  const { path } = useRouteMatch();
  const CSVLinkRef = useRef(null);
  const { TabPane } = Tabs;

  const [viewModal, setViewModal] = useState(false);
  const [state, setState] = useState({
    category: '',
    mode: 'PARTNER',
    search: ''
  });
  const [importModal, setImportModal] = useState(false);
  const [data, setData] = useState([]);
  const [partnertable, setPartnertable] = useState([]); //set data
  const [activeCoursetog, setActiveCourseTog] = useState(true);
  const [perPage, setPerPage] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const [status, setStatus] = useState('active');
  const [exportTog, setExportTog] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false)
  const [selectedLanguageData, setSelectedLanguageData] = useState()
  const [langIds, setLangIds] = useState({
    hindi: '',
    marathi: ''
  });
  const [languageID, setLanguageIds] = useState();
  const [id, setID] = useState();
  const [isAscend, setIsAscend] = useState(false);
  const [showAlert, setShowAlert] = useState(false)
  const [idForDelete, setIdForDelete] = useState('')
  const [keyForDelete, setKeyForDelete] = useState('')
  const [typeForDelete, setTypeForDelete] = useState('single')
  const [typeForMultipleDelete, setTypeForMultipleDelete] = useState('multiple')

  const languageData = useSelector(state => state.language.getLanguageData);
  const courseData = useSelector(state => state.category.courseFilterData);
  const catdata = useSelector(state => state.category.categoryData);
  const allCategortData = useSelector(state => state.category.getAllCourse); //export
  const onePartnerCourseData = useSelector(state => state.category.editFilterData);
  const postPartnerCourseData = useSelector(state => state.category.postPartnerCourseData);
  const postPartnerCourseDataerr = useSelector(state => state.category.postPartnerCourseDataerr);
  const editPartnerCourseData = useSelector(state => state.category.editPartnerCourseData);
  const editPartnerCourseError = useSelector(state => state.category.editPartnerCourseError);
  const ImportPartnerCoursedata = useSelector(state => state.category.addPartnerCourseInBulkData);
  const addPartnerCourseModulError = useSelector(state => state.category.addPartnerCourseInBulkError)
  const deleteCourseData = useSelector(state => state.category.deleteCourseData)
  const deleteCourseError = useSelector(state => state.category.deleteCourseError)

  useEffect(() => {
    if (data.length && exportTog) {
      CSVLinkRef?.current?.link.click(); //
      toast.success('Partner course data exported');
    } else if (exportTog) {
      toast.success('No Partner course data for export');
    }
  }, [data]);

  // useEffect(() => {
  //   if (courseData?.data?.data) {
  //     courseData?.data?.data.map((item,i) => {
  //       let x = Math.floor((Math.random() * 5) + 1);
  //       let data = {
  //         "comment": "test rating",
  //         "rating": x,
  //         "courseId": item.id
  //       }
  //       ApiPost('courseRating/addCourseRating',data).then((res) => {
  //       })
  //     })
  //   }
  // }, [courseData])

  useEffect(() => {
    if (deleteCourseData && deleteCourseData.status === 200) {
      dispatch(deleteCourseSuccess(null))
      toast.success("Swayam course deleted");
    }
  }, [deleteCourseData])

  useEffect(() => {
    if (deleteCourseError) {
      dispatch(deleteCourseErr(null))
      toast.error('Something went wrong');
    }
  }, [deleteCourseError])

  useEffect(() => {
    if (ImportPartnerCoursedata && ImportPartnerCoursedata.status === 200) {
      toast.success("Partner course imported")
      dispatch(addPartnerCourseInBulkSuccess(null))
      dispatch(getCoursefilter(state.category, perPage, pageNumber, state.mode ? state.mode : '', status, "", langIds.hindi, langIds.marathi));
    }
  }, [ImportPartnerCoursedata])

  useEffect(() => {
    return () => {
      dispatch(getallSwayamCourseSuccess(null));
    };
  }, [])


  useEffect(() => {
    if (postPartnerCourseData && postPartnerCourseData.status === 200) {
      dispatch(addPartnerCourseSuccess(null));
      toast.success('Partner course added');
    }
  }, [postPartnerCourseData]);

  useEffect(() => {
    if (addPartnerCourseModulError) {
      toast.error('Somthing went wrong');
    }
  }, [addPartnerCourseModulError])


  useEffect(() => {
    if (postPartnerCourseDataerr) {
      dispatch(addPartnerCourseErr(null));
      // toast.error('Something Wrong');
    }
  }, [postPartnerCourseDataerr]);

  useEffect(() => {
    if (editPartnerCourseData && editPartnerCourseData.data.isDeleted === false) {
      dispatch(editPartnerCourseSuccess(null));
      toast.success('Partner course updated');
    } else if (editPartnerCourseData && editPartnerCourseData.data.isDeleted === true) {
      dispatch(editPartnerCourseSuccess(null));
      toast.success('Partner course deleted');
    }
  }, [editPartnerCourseData]);

  const getOneCourseDetailByKey = async (languageId, key, id) => {
    await ApiGet(`course/getOneCourseDetailByKey?langId=${languageId}&key=${key}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Course alredy exist in this language!")
        }
      })
      .catch((e) => {
        if (e.response.status) {
          setIsConfirmModal(true)
          setLanguageIds(languageId);
          setID(id)
          // history.push(`${path}/addcourses?langId=${languageId}?key=${key}`)
        }
      })
  }

  const deleteCourse = (id, key) => {
    setShowAlert(true);
    setKeyForDelete(key)
    setIdForDelete(id)
  }

  const onDelete = (idForDelete, keyForDelete, typeForDelete) => {
    dispatch(deleteCourses(idForDelete, keyForDelete, typeForDelete))
    setKeyForDelete('')
    setIdForDelete('')
    setShowAlert(false)
  }

  const onDeleteAll = (idForDelete, keyForDelete, typeForMultipleDelete) => {
    dispatch(deleteCourses(idForDelete, keyForDelete, typeForMultipleDelete))
    setKeyForDelete('')
    setIdForDelete('')
    setShowAlert(false)
  }

  useEffect(() => {
    let temp = {
      hindi: '',
      marathi: ''
    }
    languageData && languageData.data && languageData.data.map((item) => {
      if (item.name.toLowerCase() === "marathi") {
        temp.marathi = item.id
      } else if (item.name.toLowerCase() === "hindi") {
        temp.hindi = item.id
      }
    })
    setLangIds(temp)
  }, [languageData])

  const languageHandalCancle = () => {
    setIsConfirmModal(false)
  }

  const callback = key => {
    setStatus(key);
    setPageNumber(1);
    setExportTog(false);
  };

  const onePartnercourseData = () => {
    dispatch(getallSwayamCourse(state.mode));
    setExportTog(true);
  };

  const onClick = ({ key }) => {
    if (key == 'exportCourses') {
      onePartnercourseData();
    }
    if (key == 'addCourses') {
      history.push(`${path}/addpartnercourses`);
    }
    if (key == 'import') {
      setImportModal(true)
    }
  };

  const languageHandalOk = () => {
    history.push(`${path}/addpartnercourses?langid=${languageID}&id=${id}`);
  }
  const addLanguagePartnerCourses = (body, languageID) => {
    ApiPost(`course/addPartnerCourse?langId=${languageID}&mode=PARTNER`, body)
      .then((res) => {
        return dispatch(addPartnerCourseSuccess(res))
      })
      .catch((err) => dispatch(addPartnerCourseErr(err)))
  }

  const header = [
    { label: 'id', key: 'id' },
    { label: 'name', key: 'name' },
    { label: 'location', key: 'location' },
    { label: 'contactPersonEmail', key: 'contactPersonEmail' },
    { label: 'contactPersonName', key: 'contactPersonName' },
    { label: 'contactPersonPhone', key: 'contactPersonPhone' },
    { label: 'district', key: 'district' },
    { label: 'createdAt', key: 'createdAt' },
    { label: 'detail', key: 'detail' },
    { label: 'duration', key: 'duration' },
    { label: 'eligibility', key: 'eligibility' },
    { label: 'isActive', key: 'isActive' },
    { label: 'isApproved', key: 'isApproved' },
    { label: 'isDeleted', key: 'isDeleted' },
    { label: 'key', key: 'key' },
    { label: 'mode', key: 'mode' },
    { label: 'organization', key: 'organization' },
    { label: 'pincode', key: 'pincode' },
    { label: 'thumbnail', key: 'thumbnail' },
    // { label: 'sequence', key: 'sequence' },
    { label: 'certificationBody', key: 'certificationBody' },
    { label: 'certificate', key: 'certificate' },
    { label: 'component', key: 'component' },
  ];
  useEffect(() => {
    if (allCategortData?.data?.data) {
      setData(allCategortData?.data?.data);
    }
  }, [allCategortData]);

  useEffect(() => {
    dispatch(getCategoryData());
  }, []);

  // useEffect(() => {
  //   if (catdata && catdata.data && catdata.data.length > 0) {
  //     setState({ ...state, category: catdata.data[0].id });
  //   }
  // }, [catdata]);

  // useEffect(() => { //
  //   if (state && state.category && activeCoursetog) {
  //     Submit();
  //   }
  // }, [state]);

  useEffect(() => {
    if (status && langIds.hindi && langIds.marathi) {
      dispatch(getCoursefilter(state.category, perPage, pageNumber, state.mode ? state.mode : '', status, "", langIds.hindi, langIds.marathi));
    }
  }, [perPage, pageNumber, state.mode, status, langIds]); //pagination

  const onChangehandle = (e, name) => {
    setActiveCourseTog(false);
    if (name == 'category') {
      setState({ ...state, category: e });
    }
    else if (name == 'search') {
      setState({ ...state, search: e })
    }
  };

  const onEdit = id => {
    history.push(`${path}/addpartnercourses?id=${id}`);
  };

  const viewPartnerCoursedata = id => {
    history.push(`/admin/courses/viewpartnercourse?id=${id}`)
  };
  // const onDelete = id => {
  //   let activeCourseDelete = courseData && courseData.data && courseData.data.data.find(item => item.id === id);
  //   let certification = activeCourseDelete.certificate;
  //   let categoryId = activeCourseDelete.courseCategory.id;
  //   if (activeCourseDelete) {
  //     delete activeCourseDelete.id;
  //     delete activeCourseDelete.certificate;
  //     delete activeCourseDelete.jobTypes;
  //     delete activeCourseDelete.courseCategory;
  //     delete activeCourseDelete.viewCount;
  //     delete activeCourseDelete.isApproved;
  //     delete activeCourseDelete.createdAt;
  //     delete activeCourseDelete.courseRatings;
  //     delete activeCourseDelete.courseRatingSum;
  //     delete activeCourseDelete.bannerSelected;
  //     delete activeCourseDelete.saved;
  //     delete activeCourseDelete.enrolled;
  //     delete activeCourseDelete.hindi;
  //     delete activeCourseDelete.marathi;
  //     activeCourseDelete = {
  //       ...activeCourseDelete,
  //       isActive: false,
  //       isDeleted: true,
  //       courseId: id,
  //       categoryId: categoryId,
  //       certification: certification,
  //     };
  //     dispatch(editPartnerCoursefilter(activeCourseDelete, langIds.hindi, langIds.marathi));
  //   }
  // };

  const activePartnerCourses = dt => {
    const newVal = ApiPost(`course/editPartnerCourse?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, dt)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getCoursefilter(state.category, perPage, pageNumber, state.mode, status, "", langIds.hindi, langIds.marathi));
        }
        return res
      })
    return newVal
  }

  const Submit = () => {
    dispatch(getCoursefilter(state.category, perPage, pageNumber, state.mode ? state.mode : '', status, state.search, langIds.hindi, langIds.marathi));
  };

  const clearFilter = () => {
    setState({ ...state, category: '', search: '' });
    dispatch(getCoursefilter('', perPage, pageNumber, state.mode ? state.mode : '', status, '', langIds.hindi, langIds.marathi));
  };

  const onActive = async id => {
    let activedata = courseData && courseData.data && courseData.data.data.find(item => item.id === id);
    let certification = activedata.certificate;
    let categoryId = activedata.courseCategory.id;
    if (activedata) {
      delete activedata.id;
      delete activedata.certificate;
      delete activedata.jobTypes;
      delete activedata.courseCategory;
      delete activedata.viewCount;
      delete activedata.isApproved;
      delete activedata.createdAt;
      delete activedata.courseRatings;
      delete activedata.courseRatingSum;
      delete activedata.bannerSelected;
      delete activedata.saved;
      delete activedata.enrolled;
      delete activedata.hindi;
      delete activedata.marathi;
      activedata = {
        ...activedata,
        isActive: true,
        isDeleted: false,
        courseId: id,
        categoryId: categoryId,
        certification: certification,
      };
      // dispatch(editPartnerCoursefilter(activedata));
      const restorePartnerCourses = await activePartnerCourses(activedata);
      if (restorePartnerCourses.status === 200) {
        toast.success("Partner course active")
      }
    }
  };

  useEffect(() => {
    if (courseData && courseData.data) {
      setPartnertable(
        courseData.data?.data?.map((item, index) => {
          let courseRatings = item.courseRatings.map(item => item.rating)
          var sum = 0;

          for (var i = 0; i < courseRatings.length; i++) {
            sum += parseInt(courseRatings[i]);
          }

          var avg = sum / courseRatings.length;

          return {
            key: index,
            CourseName: (
              <span className='For-Underline' onClick={() => viewPartnerCoursedata(item.id)}>{item.name}</span>
            ),
            CourseCategory: item.courseCategory?.name,
            courseRatings: (
              <StarRatings
                rating={avg ? avg : 0}
                starRatedColor="#f57c00"
                numberOfStars={5}
                name="patnerCourse"
                starDimension="13px"
              />
            ),
            CourseType: item.mode,
            selectLanguage: (
              <div className="">
                <div className="">
                  <>
                    <Button size="small" type={item.hindi ? "success" : "primary"} shape='round'
                      onClick={() => {
                        getOneCourseDetailByKey(langIds?.hindi, item?.key, item?.id)
                        setSelectedLanguageData(item)
                      }}
                    >
                      HN
                    </Button>
                    <Button size="small" type={item.marathi ? "success" : "primary"} shape='round'
                      onClick={() => {
                        getOneCourseDetailByKey(langIds?.marathi, item?.key, item?.id)
                      }}
                    >
                      MT
                    </Button>

                    {/* <Button
                        className="btn-icon"
                        type="success"
                        onClick={() => viewSwayamCoursedata(item.id)}
                        shape="circle"
                      >
                        <FeatherIcon icon="eye" size={16} />
                      </Button> */}
                  </>
                </div>
              </div>
            ),
            action: (
              <div className="active-schemes-table">
                <div className="table-actions">
                  {status === 'active' ? (
                    <>
                      <Button className="btn-icon" onClick={() => onEdit(item.id)} type="info" to="#" shape="circle">
                        <FeatherIcon icon="edit" size={16} />
                      </Button>
                      <Button
                        className="btn-icon"
                        type="danger"
                        onClick={() => deleteCourse(item.id, item.key)}
                        to="#"
                        shape="circle"
                      >
                        <FeatherIcon icon="trash-2" size={16} />
                      </Button>
                      {/* <Button
                        className="btn-icon"
                        type="success"
                        onClick={() => viewPartnerCoursedata(item.id)}
                        shape="circle"
                      >
                        <FeatherIcon icon="eye" size={16} />
                      </Button> */}
                    </>
                  ) : (
                    <Button className="btn-icon" type="success" onClick={() => onActive(item.id)} shape="circle">
                      <FeatherIcon icon="rotate-ccw" size={16} />
                    </Button>
                  )
                  }

                  {/* <Button className="btn-icon" type="info" to="#" shape="circle">
                                <FeatherIcon icon="edit" size={16} />
                            </Button> */}
                </div>
              </div>
            ),
          };
        }),
      );
    }
  }, [courseData, isAscend]);

  const sorting = () => {
    if (isAscend) {
      courseData && courseData.data && courseData.data.data.sort((a, b) => a.name.localeCompare(b.name))
    }
    else {
      courseData && courseData.data && courseData.data.data.sort((a, b) => b.name.localeCompare(a.name))
    }
    setIsAscend(!isAscend)
  }

  const partnerCourseTableColumns = [
    {
      title: 'Course name',
      dataIndex: 'CourseName',
      sorter: (a, b) => sorting(),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Course category',
      dataIndex: 'CourseCategory',
      sorter: (a, b) => a.CourseCategory.localeCompare(b.CourseCategory),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Course ratings',
      dataIndex: 'courseRatings',
    },
    {
      title: 'Course type',
      dataIndex: 'CourseType',
    },
    {
      title: 'Select language',
      dataIndex: 'selectLanguage',
      width: '90px',
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
          label: 'Export courses',
          key: 'exportCourses',
        },
        {
          label: 'Add courses',
          key: 'addCourses',
        },
        {
          label: 'Import',
          key: 'import',
        },
      ]}
    />
  );

  const rowSelection = {
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <>
      <PageHeader
        ghost
        title="Partner Courses"
        buttons={[
          <div key="1" className="page-header-actions">
            <Dropdown overlay={menu} trigger="click">
              <a onClick={e => e.preventDefault()}>
                <Space>
                  Actions
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <CSVLink
              data={data}
              ref={CSVLinkRef}
              headers={header}
              filename="Partner.csv"
              style={{ opacity: 0 }}
            ></CSVLink>
          </div>,
        ]}
      />
      <Main>
        <Cards headless>
          <Row gutter={15}>
            <Col xs={24}>
              <Row gutter={30}>
                <Col md={6} xs={24} className="mb-25">
                  <Form name="sDash_select" layout="vertical">
                    <Form.Item label="Course category">
                      <Select
                        size="large"
                        className={state.category ? 'sDash_fullwidth-select' : 'select-option-typ-placeholder'}
                        name="category"
                        value={state.category}
                        placeholder="Select category"
                        onChange={e => onChangehandle(e, 'category')}
                      >
                        <Option value="">Select Category</Option>
                        {catdata && catdata.data.map((items, i) => <Option key={i} value={items.id}>{items.name} </Option>)}
                      </Select>
                    </Form.Item>
                  </Form>
                </Col>

                <Col md={6} xs={24} className="mb-25">
                  <Form name="sDash_select" layout="vertical">
                    <Form.Item label="Search">
                      <Input placeholder="Search" value={state.search} name='search' onChange={e => onChangehandle(e.target.value, 'search')} />
                    </Form.Item>
                  </Form>
                </Col>

                <Col md={6} xs={24} className="mb-25">
                  <ListButtonSizeWrapper>
                    <Button size="small" type="primary" onClick={e => Submit(e)}>
                      Apply
                    </Button>
                    <Button size="small" type="light" onClick={e => clearFilter(e)}>
                      Clear
                    </Button>
                  </ListButtonSizeWrapper>
                </Col>
              </Row>
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Active Courses" key="active">
                  <UserTableStyleWrapper>
                    <TableWrapper className="table-responsive">
                      <Table
                        rowSelection={rowSelection}
                        dataSource={partnertable}
                        columns={partnerCourseTableColumns}
                        pagination={{
                          defaultPageSize: courseData?.data.per_page,
                          total: courseData?.data.page_count,
                          onChange: (page, pageSize) => {
                            setPageNumber(page);
                            setPerPage(pageSize);
                            setExportTog(false);
                          },
                        }}
                      />
                    </TableWrapper>
                  </UserTableStyleWrapper>
                </TabPane>

                <TabPane tab="Inactive Courses" key="inactive">
                  <UserTableStyleWrapper>
                    <TableWrapper className="table-responsive">
                      {/* <Form name="sDash_select" layout="vertical">
                        <Form.Item name="search" label="">
                          <Input placeholder="search" style={{ width: 200 }} />
                        </Form.Item>
                      </Form> */}

                      <Table
                        rowSelection={rowSelection}
                        dataSource={partnertable}
                        // columns={usersTableColumns.filter(item => item.title !== 'Actions')}
                        columns={partnerCourseTableColumns}
                        pagination={{
                          defaultPageSize: courseData?.data.per_page,
                          total: courseData?.data.page_count,
                          // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                          onChange: (page, pageSize) => {
                            setPageNumber(page);
                            setPerPage(pageSize);
                            setExportTog(false);
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

      {viewModal && (
        <ViewPartnerCourse
          viewModal={viewModal}
          type="primary"
          setViewModal={setViewModal}
          data={onePartnerCourseData && onePartnerCourseData.data ? onePartnerCourseData.data : ''}
        />
      )}

      {importModal && <ImportPartnerCourse importModal={importModal} handleCancel={() => setImportModal(false)} modaltitle="Import Partner Courses" />}

      {isConfirmModal && (
        <ConfirmModal
          onOk={() => { setIsConfirmModal(false) }}
          onCancel={() => { setIsConfirmModal(false) }}
          visible={isConfirmModal}
          footer={
            <>
              <Button size="small" type="primary" onClick={() => {
                languageHandalCancle()

              }}>
                No
              </Button>
              <Button size="small" type="primary" onClick={() => {

                languageHandalOk()
              }} >
                Yes
              </Button>
            </>
          }
          children={"This coures in not available in this language. You want to add?"}
        />
      )}

      {showAlert &&
        <SweetAlert
          danger
          cancelBtnText="Cancel"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
        >
          You want to delete course.
          <div style={{ marginTop: '20px', display: "flex", gap: "5px", justifyContent: "center" }}>
            <Button className="ant-btn-delete" variant="success" onClick={() => onDelete(idForDelete, keyForDelete, typeForDelete)}  >
              Single delete
            </Button>
            <Button className="ant-btn-delete" variant="danger" onClick={() => onDeleteAll(idForDelete, keyForDelete, typeForMultipleDelete)} >
              All delete
            </Button>
            <Button className="ant-btn-light" variant="danger" onClick={() => setShowAlert(false)}  >
              Cancel
            </Button>
          </div>
        </SweetAlert>
      }

    </>
  );
};

export default PartnerCourses;
