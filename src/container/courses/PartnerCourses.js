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
import {
  editPartnerCoursefilter,
  getallSwayamCourse,
  getCategoryData,
  getCoursefilter,
  getOneCoursefilter,
} from '../../redux/course/actionCreator';
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


const PartnerCourses = () => {
  const {
    addPartnerCourseSuccess,
    addPartnerCourseErr,
    getallSwayamCourseSuccess,
    editPartnerCourseSuccess,
    editPartnerCourseErr,
    addPartnerCourseInBulkSuccess
  } = actions;

  const { Option } = Select;
  const history = useHistory();
  let dispatch = useDispatch();
  const { path } = useRouteMatch();
  const CSVLinkRef = useRef(null);

  const [viewModal, setViewModal] = useState(false);
  const [state, setState] = useState({
    category: '',
    mode: 'PARTNER',
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

  const courseData = useSelector(state => state.category.courseFilterData);
  const catdata = useSelector(state => state.category.categoryData);
  const allCategortData = useSelector(state => state.category.getAllCourse); //export
  const onePartnerCourseData = useSelector(state => state.category.editFilterData);
  const postPartnerCourseData = useSelector(state => state.category.postPartnerCourseData);
  const postPartnerCourseDataerr = useSelector(state => state.category.postPartnerCourseDataerr);
  const editPartnerCourseData = useSelector(state => state.category.editPartnerCourseData);
  const editPartnerCourseError = useSelector(state => state.category.editPartnerCourseError);
  const addPartnerCourseModulData = useSelector(state => state.category.addPartnerCourseInBulkData)

  useEffect(() => {
    if (data.length && exportTog) {
      CSVLinkRef?.current?.link.click(); //
      toast.success('Partner course data exported successfully');
    } else if (exportTog) {
      toast.success('No Partner course data for export');
    }
  }, [data]);

  // useEffect(() => {
  //   console.log("courseData", courseData)
  //   if (courseData?.data?.data) {
  //     courseData?.data?.data.map((item,i) => {
  //       let x = Math.floor((Math.random() * 5) + 1);
  //       let data = {
  //         "comment": "test rating",
  //         "rating": x,
  //         "courseId": item.id
  //       }
  //       ApiPost('courseRating/addCourseRating',data).then((res) => {
  //         console.log('index', i)
  //       })
  //     })
  //   }
  // }, [courseData])

  useEffect(() => {
    if (addPartnerCourseModulData && addPartnerCourseModulData.status === 200) {
      toast.success("Add PartnerCourse Import uccessful")
      dispatch(addPartnerCourseInBulkSuccess(null))
    }
  }, [addPartnerCourseModulData])

  useEffect(() => {
    return () => {
      // setState([])
      dispatch(getallSwayamCourseSuccess(null)); //FOR CLEAR A STATE OF A EXPORT
    };
  }, []);

  useEffect(() => {
    console.log('postPartnerCourseData', postPartnerCourseData);
  }, [postPartnerCourseData]);

  useEffect(() => {
    if (postPartnerCourseData && postPartnerCourseData.status === 200) {
      dispatch(addPartnerCourseSuccess(null));
      toast.success('Partner Course Add successful');
    }
  }, [postPartnerCourseData]);

  useEffect(() => {
    if (postPartnerCourseDataerr) {
      dispatch(addPartnerCourseErr(null));
      toast.error('Something Wrong');
    }
  }, [postPartnerCourseDataerr]);

  useEffect(() => {
    if (editPartnerCourseData && editPartnerCourseData.isActive === false) {
      dispatch(editPartnerCourseSuccess(null));
      toast.success('Partner Course Delete successful');
    } else if (editPartnerCourseData && editPartnerCourseData.isActive === true) {
      dispatch(editPartnerCourseSuccess(null));
      toast.success('Partner Course Update successful');
    }
  }, [editPartnerCourseData]);

  useEffect(() => {
    if (editPartnerCourseError) {
      dispatch(editPartnerCourseErr(null));
      toast.error('Something Wrong');
    }
  }, [editPartnerCourseError]);


  const getOneCourseDetailByKey = async (languageId, key) => {
    await ApiGet(`course/getOneCourseDetailByKey?langId=${languageId}&key=${key}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Course alredy exist in this language!")
        }
      })
      .catch((e) => {
        if (e.response.status) {
          setIsConfirmModal(true)
          // history.push(`${path}/addcourses?langId=${languageId}?key=${key}`)
        }
      })

  }

  const languageHandalCancle = () => {
    console.log((" languageHandalCancle------------------"));
  }

  const languageHandalOk = () => {
    console.log("languageHandalOk ---------");
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
      //set a state for export excel
      setData(allCategortData?.data?.data);
    }
  }, [allCategortData]);

  useEffect(() => {
    dispatch(getCategoryData());
  }, []);

  useEffect(() => {
    if (catdata && catdata.data && catdata.data.length > 0) {
      setState({ ...state, category: catdata.data[0].id });
    }
  }, [catdata]);

  useEffect(() => {
    if (state && state.category && activeCoursetog) {
      Submit();
    }
  }, [state]);

  const usersTableData = [];

  const onChangehandle = (e, name) => {
    setActiveCourseTog(false);
    if (name == 'category') {
      setState({ ...state, category: e });
    } else if (name == 'mode') {
      setState({ ...state, mode: e });
    }
  };
  const onEdit = id => {
    history.push(`${path}/addpartnercourses?id=${id}`);
  };

  const viewPartnerCoursedata = id => {
    // dispatch(getOneCoursefilter(id));
    // setViewModal(true);
    history.push(`/admin/courses/viewpartnercourse?id=${id}`)
  };

  const onDelete = id => {
    let activeCourseDelete = courseData && courseData.data && courseData.data.data.find(item => item.id === id);
    let certification = activeCourseDelete.certificate;
    let categoryId = activeCourseDelete.courseCategory.id;

    if (activeCourseDelete) {
      delete activeCourseDelete.id;
      delete activeCourseDelete.certificate;
      delete activeCourseDelete.jobTypes;
      delete activeCourseDelete.courseCategory;
      delete activeCourseDelete.viewCount;
      delete activeCourseDelete.isApproved;
      delete activeCourseDelete.createdAt;
      delete activeCourseDelete.courseRatings;

      activeCourseDelete = {
        ...activeCourseDelete,
        isActive: false,
        isDeleted: true,
        courseId: id,
        categoryId: categoryId,
        certification: certification,
      };
      dispatch(editPartnerCoursefilter(activeCourseDelete, state.category, perPage, pageNumber, state.mode));
    }
  };

  const onActive = id => {
    //for inactive toactive data
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

      activedata = {
        ...activedata,
        isActive: true,
        isDeleted: false,
        courseId: id,
        categoryId: categoryId,
        certification: certification,
      };
      dispatch(editPartnerCoursefilter(activedata));
    }
  };

  // const onApproved = (id, isAp, key) => {
  //   if (status !== 'active') {
  //     return;
  //   }
  //   let data = {
  //     courseId: id,
  //     key: key,
  //     isApproved: !isAp,
  //   };

  //   ApiPost(`course/updateIsApproved?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, data).then(res => {
  //     console.log('res', res);
  //     toast.success(res.data.isApproved ? 'Approved successful' : 'Disapproved successful');
  //     dispatch(getCoursefilter(state.category, perPage, pageNumber, state.mode ? state.mode : '', status));
  //   });
  // };

  useEffect(() => {
    if (courseData && courseData.data) {
      setPartnertable(
        courseData.data?.data?.map(item => {
          console.log("courseData", courseData)
          let courseRatings = item.courseRatings.map(item => item.rating)
          console.log("courseRating", courseRatings)

          var sum = 0;

          for (var i = 0; i < courseRatings.length; i++) {
            sum += parseInt(courseRatings[i]);
          }

          var avg = sum / courseRatings.length;

          return {
            //key: id,
            CourseName: (
              <span onClick={() => viewPartnerCoursedata(item.id)}>{item.name}</span>
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
            // approved: (
            //   <>
            //     <div onClick={() => onApproved(item.id, item.isApproved, item.key)}>
            //       <Switch checked={item.isApproved} disabled={status === 'active' ? false : true}></Switch>
            //     </div>
            //   </>
            // ),
            // Language: "Hindi",


            selectLanguage: (
              <div className="">
                {/* <div className="active-schemes-table"> */}
                <div className="">
                  {/* <div className="table-actions"> */}

                  <>
                    <Button size="small" type="primary" shape='round'
                      onClick={() => {
                        console.log("lof ============>", item);
                        getOneCourseDetailByKey(langIds?.hindi, item?.key)
                        // setSelectedLanguageData(item)
                      }}
                    >
                      {/* <FeatherIcon icon="edit" size={16} /> */}
                      HN
                    </Button>
                    <Button size="small" type="primary" shape='round'
                      onClick={() => {
                        console.log("lof ============>", item);
                        getOneCourseDetailByKey(langIds?.marathi, item?.key)
                      }}
                    >
                      {/* <FeatherIcon icon="edit" size={16} /> */}
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
                        onClick={() => onDelete(item.id)}
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
                  )}

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
  }, [courseData]);

  const Submit = () => {
    dispatch(getCoursefilter(state.category ? state.category : '', perPage, pageNumber, state.mode ? state.mode : '', status));
  };

  // const clearFilter = () => {
  //   setState({ category: '' });
  //   dispatch(getCoursefilter('', perPage, pageNumber, '', status));
  // };

  useEffect(() => {
    if (state.category) {
      dispatch(getCoursefilter('', perPage, pageNumber, '', status));
      // dispatch(getCoursefilter(state.category, perPage, pageNumber, state.mode ? state.mode : '', status));
    }
  }, [perPage, pageNumber, state.mode, status]); //paganation

  const partnerCourseTableColumns = [
    {
      title: 'Course Name',
      dataIndex: 'CourseName',
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Course Category',
      dataIndex: 'CourseCategory',
    },
    {
      title: 'Course Ratings',
      dataIndex: 'courseRatings',
    },
    {
      title: 'Course Type',
      dataIndex: 'CourseType',
    },
    {
      title: 'Select Language',
      dataIndex: 'selectLanguage',
      width: '90px',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      width: '90px',
    },

  ];

  const { TabPane } = Tabs;

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

  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: 'Export Courses',
          key: 'exportCourses',
        },
        {
          label: 'Add Courses',
          key: 'addCourses',
        },
        {
          label: 'Import',
          key: 'import',
        },
      ]}
    />
  );

  return (
    <>
      <PageHeader
        ghost
        title="Partner Courses"
        buttons={[
          <div key="1" className="page-header-actions">
            {/* <Button
              size="small"
              type="info"
              onClick={() => {
                onePartnercourseData();
              }}
            >
              Export Courses
            </Button>
            <CSVLink
              data={data}
              ref={CSVLinkRef}
              headers={header}
              filename="Partner.csv"
              style={{ opacity: 0 }}
            ></CSVLink> */}
            {/* <Button size="small" type="info" onClick={() => onAllPartnerCourse()}>
              Export All Course
            </Button> */}
            {/* <Button
              size="small"
              type="primary"
              onClick={() => {
                history.push(`${path}/addpartnercourses`);
              }}
            >
              Add Courses
            </Button>
            <Button size="small" type="primary" onClick={() => setImportModal(true)}>
              Import
            </Button> */}
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
                {/* <Col md={6} xs={24} className="mb-25">
                  <Form name="sDash_select" layout="vertical">
                    <Form.Item label="Course Category">
                      <Select
                        size="large"
                        className="sDash_fullwidth-select"
                        name="category"
                        value={state.category}
                        placeholder="Select Category"
                        onChange={e => onChangehandle(e, 'category')}
                      >
                        {catdata && catdata.data.map(items => <Option value={items.id}>{items.name} </Option>)}
                      </Select>
                    </Form.Item>
                  </Form>
                </Col> */}
                {/* <Col md={6} xs={24} className="mb-25">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item label="Mode">
                                            <Select size="large" className="sDash_fullwidth-select" name="mode" value={state.mode} onChange={(e) => onChangehandle(e, "mode")} placeholder="Select Mode Type">
                                                <Option value="ONLINE">Online</Option>
                                                <Option value="OFFLINE">Offline</Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col> */}
                <Col md={6} xs={24} className="mb-25">
                  <ListButtonSizeWrapper>
                    {/* <Button size="small" type="primary" onClick={e => Submit(e)}>
                      Apply
                    </Button>
                    <Button size="small" type="light" onClick= {e => clearFilter(e)}>
                      Clear
                    </Button> */}
                  </ListButtonSizeWrapper>
                </Col>
              </Row>
              {/* <Row className="mb-25">
                                <Button size="small" type={type === "Active" ? "primary" : "light"} onClick={() => setType("Active")}>
                                    Active Courses
                                </Button>
                                <Button size="small" type={type === "Inactive" ? "primary" : "light"} onClick={() => setType("Inactive")}>
                                    Inactive Courses
                                </Button>
                            </Row> */}

              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Active Courses" key="active">
                  <UserTableStyleWrapper>
                    <TableWrapper className="table-responsive">
                      {/* <Form name="sDash_select" layout="vertical">
                        <Form.Item name="search" label="">
                          <Input placeholder="search" style={{ width: 200 }} />
                        </Form.Item>
                      </Form> */}

                      <Table
                        // rowSelection={rowSelection}
                        dataSource={partnertable}
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
                <TabPane tab="Inactive Courses" key="inactive">
                  <UserTableStyleWrapper>
                    <TableWrapper className="table-responsive">
                      <Form name="sDash_select" layout="vertical">
                        <Form.Item name="search" label="">
                          <Input placeholder="search" style={{ width: 200 }} />
                        </Form.Item>
                      </Form>

                      <Table
                        // rowSelection={rowSelection}
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

      {
        <ImportPartnerCourse
          importModal={importModal}
          handleCancel={() => setImportModal(false)}
          modaltitle="Import Swayam Courses"
        />
      }
      {isConfirmModal && (
        <ConfirmModal
          onOk={() => { setIsConfirmModal(false) }}
          onCancel={() => { setIsConfirmModal(false) }}
          visible={isConfirmModal}
          footer={<>
            <Button size="small" type="primary" onClick={() => {
              languageHandalCancle()
              // getOneCourseDetailByKey(langIds?.hindi, item?.key)
            }}>
              {/* <FeatherIcon icon="edit" size={16} /> */}
              No
            </Button>
            <Button size="small" type="primary" onClick={() => {
              // getOneCourseDetailByKey(langIds?.marathi, item?.key)
              languageHandalOk()
            }} >
              {/* <FeatherIcon icon="edit" size={16} /> */}
              Yes
            </Button>
          </>}
          children={"This coures in not available in this language. You want to add?"}
        />
      )}
    </>
  );
};

export default PartnerCourses;
