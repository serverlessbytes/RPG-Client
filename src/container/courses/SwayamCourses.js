import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { ListButtonSizeWrapper, Main, ProjectPagination, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Col, Form, Input, Row, Select, Table, Tabs, Switch, Pagination, Dropdown, Space, Menu } from 'antd';
import { UserTableStyleWrapper } from '../pages/style';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { editSwayamCourse, getallSwayamCourse, getCategoryData, getCoursefilter, getOneCourseDetailByKey, getOneCoursefilter, addSwayamCourse, } from '../../redux/course/actionCreator';
import ViewSwayamCourse from './ViewSwayamCourse';
import { CSVLink } from 'react-csv';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import actions from '../../redux/course/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImportSwayamCourse from '../../components/modals/ImportSwayamCourse';
import { DownOutlined } from '@ant-design/icons';
import StarRatings from 'react-star-ratings';
import ConfirmModal from '../../components/modals/confirm_modal';
import moment from 'moment';

const {
  getallSwayamCourseSuccess,
  addSwayamPartnerCourseSuccess,
  addSwayamPartnerCourseErr,
  editSwayamPartnerCourseSuccess,
  addSwayamCourseModuleErr,
  addSwayamCourseModuleSuccess,
  editSwayamCourseModule,
} = actions;

const SwayamCourses = () => {
  const dispatch = useDispatch();
  const { Option } = Select;
  const history = useHistory();
  const CSVLinkRef = useRef(null);
  const usersTableData = [];
  const { TabPane } = Tabs;
  const { path } = useRouteMatch();

  const [selectedLanguageData, setSelectedLanguageData] = useState()
  const [data, setData] = useState({
    category: '',
    mode: '',
    search: '',
  });
  const [activeCoursetog, setActiveCourseTog] = useState(true);
  const [perPage, setPerPage] = useState(20);// forpagination
  const [pageNumber, setPageNumber] = useState(1);
  const [status, setStatus] = useState('active');
  const [SwayamCourse, setSwayamCoursetable] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [importModal, setImportModal] = useState(false);
  const [state, setState] = useState('');
  const [exportTog, setExportTog] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  // const [searchValue, setSearchValue] = useState()
  const [languageOneDataGet, setLanguageOneDataGet] = useState()
  const [langIds, setLangIds] = useState({
    hindi: '',
    marathi: ''
  });
  const [languageId, setLanguageID] = useState()
  const [id, setID] = useState()

  const languageData = useSelector(state => state.language.getLanguageData);
  const categoryData = useSelector(state => state.category.categoryData);
  const courseData = useSelector(state => state.category.courseFilterData);
  const addSwayamCourseData = useSelector(state => state.category.addSwayamCourseData);
  const addSwayamCourseDataErr = useSelector(state => state.category.addSwayamCourseDataErr);
  const editSwayamCourseData = useSelector(state => state.category.editSwayamCourseData);
  const editSwayamCourseErr = useSelector(state => state.category.editSwayamCourseErr);
  const addSwayamCourseModuleData = useSelector(state => state.category.addSwayamCourseModuleData); //
  const addSwayamCourseModuleError = useSelector(state => state.category.addSwayamCourseModuleError); //
  const oneSwayamCourseData = useSelector(state => state.category.editFilterData);
  const allCategoryData = useSelector(state => state.category.getAllCourse);
  const courseModuleData = useSelector(state => state.category.editSwayamCourseModuleData);


  const header = [
    { label: 'id', key: 'id' },
    { label: 'name', key: 'name' },
    { label: 'certificate', key: 'certificate' },
    { label: 'createdAt', key: 'createdAt' },
    { label: 'detail', key: 'detail' },
    { label: 'duration', key: 'duration' },
    { label: 'key', key: 'key' },
    { label: 'mode', key: 'mode' },
    // { label: 'sequence', key: 'sequence' },
    { label: 'thumbnail', key: 'thumbnail' },
    { label: 'viewCount', key: 'viewCount' },
  ];

  useEffect(() => {
    console.log("courseModuleData?.data?.isDeleted", courseModuleData);
    if (courseModuleData?.status === 200) {
      { courseModuleData?.data?.isDeleted ? toast.error("courseModule Delete Successfully") : toast.success("courseModule Updated Successfully") }
    }
  }, [courseModuleData])

  useEffect(() => {
    if (state.length && exportTog) {
      CSVLinkRef?.current?.link.click(); // for export
      toast.success('Swayam course data exported successfully');
      setExportTog(false);
    } else if (exportTog) {
      toast.success('No swayam data for export');
    }
  }, [state]);

  useEffect(() => {
    return () => {
      dispatch(getallSwayamCourseSuccess(null)); //FOR CLEAR A STATE OF A EXPORT
    };
  }, []);

  useEffect(() => {
    if (addSwayamCourseModuleData && addSwayamCourseModuleData.status === 200) {
      dispatch(addSwayamCourseModuleSuccess(null));
      toast.success('Swayam Course Add successful');
    }
  }, [addSwayamCourseModuleData]);

  useEffect(() => {
    if (addSwayamCourseModuleError) {
      dispatch(addSwayamCourseModuleErr(null));
      toast.error('Something Wrong');
    }
  }, [addSwayamCourseModuleError]);

  useEffect(() => {
    if (editSwayamCourseData && editSwayamCourseData.isActive === false) {
      dispatch(editSwayamPartnerCourseSuccess(null));
      toast.success('Swayam Course Delete successful');
    } else if (editSwayamCourseData && editSwayamCourseData.isActive === true) {
      dispatch(editSwayamPartnerCourseSuccess(null));
      toast.success('Swayam Course Update successful');
    }
  }, [editSwayamCourseData]);


  useEffect(() => {
    if (editSwayamCourseErr) {
      toast.error('Something Wrong');
    }
  }, [editSwayamCourseErr]);

  useEffect(() => {
    if (courseData?.data?.data) {
      // courseData?.data?.data.map((item,i) => {
      //   let x = Math.floor((Math.random() * 5) + 1);

      //   let data = {
      //     "comment": "test rating",
      //     "rating": x,
      //     "courseId": item.id
      //   }
      //   ApiPost('courseRating/addCourseRating',data).then((res) => {
      //     console.log('index', i)
      //   })
      // })
      setState(courseData.data.data);
    }
  }, [courseData]);

  useEffect(() => {
    dispatch(getCategoryData());
  }, []);

  useEffect(() => {

    if (status && langIds.hindi && langIds.marathi) {
      dispatch(getCoursefilter(data.category, perPage, pageNumber, data.mode, status, "", langIds.hindi, langIds.marathi));
    }
  }, [status, perPage, pageNumber, langIds]);

  const onChangehandle = (e, name) => {
    setActiveCourseTog(false);
    if (name == 'category') {
      setData({ ...data, category: e });
    } else if (name == 'mode') {
      setData({ ...data, mode: e });
    }
    else if (name == 'search') {
      setData({ ...data, search: e })
    }
  };

  const onEdit = id => {
    history.push(`${path}/addcourses?id=${id}`);
  };

  //  const newSawyamCourse = dt =>{
  //    ApiPost("course/editSwayamCourse" , dt)
  //    .then((res) =>{
  //      if (res.status === 200) {
  //        dispatch(getCategoryData())
  //      }
  //      return res
  //    })
  //    return newSawyamCourse
  //  }

  useEffect(() => {
    console.log("courseData", courseData);
  }, [courseData])

  const onDelete = async (id) => {
    const singleData = courseData.data.data.find(item => item.id === id);
    if (singleData) {

      let formData = new FormData();
      formData.append('key', singleData.key);
      formData.append('courseId', id);
      formData.append('detail', singleData.detail.toString('markdown'));
      formData.append('name', singleData.name);
      formData.append('categoryId', singleData.courseCategory.id);
      formData.append('duration', moment(singleData.duration).format('HH:mm:ss'));
      formData.append('jobCategoryIds', JSON.stringify(singleData.jobTypes.map(item => item.id)));
      formData.append('certification', singleData.certificate);
      formData.append('application_form', singleData.application_form);
      formData.append('recommended_and_forwarded', singleData.recommended_and_forwarded);
      formData.append('application_process', singleData.application_process);
      formData.append('medical_superintendent', singleData.medical_superintendent);
      formData.append('hospital_expenses_estimation_certificate', singleData.hospital_expenses_estimation_certificate);
      formData.append('thumbnail', singleData.thumbnail);
      formData.append('mode', singleData.mode);
      formData.append('isActive', true);
      formData.append('isDeleted', false);
      console.log("state.id", singleData.id)
      // let dt = {
      //   key: singleData.key,
      //   courseId: id,
      //   detail: singleData.detail,
      //   name: singleData.name,
      //   categoryId: singleData.courseCategory.id,
      //   detail: singleData.detail,
      //   duration: singleData.duration,
      //   jobCategoryIds: singleData.jobTypes.map(item => item.id),
      //   certification: singleData.certificate,

      //   application_form: singleData.application_form,
      //   recommended_and_forwarded: singleData.application_form,
      //   application_process: singleData.application_process,
      //   medical_superintendent: singleData.medical_superintendent,
      //   hospital_expenses_estimation_certificate: singleData.hospital_expenses_estimation_certificate,

      //   thumbnail: singleData.thumbnail,
      //   mode: singleData.mode,
      //   isActive: false,
      //   isDeleted: true,
      // };
      dispatch(editSwayamCourse(formData, langIds.hindi, langIds.marathi));
    }
  };
  const activeSwayamCourses = formData => {
    const newVal = ApiPost(`course/editSwayamCourse?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, formData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getCoursefilter(data.category, perPage, pageNumber, data.mode, status, "", langIds.hindi, langIds.marathi));
        }
        return res
      })
    return newVal
  }
  useEffect(() => {
    console.log("courseData--", courseData);
  }, [courseData])


  const onActive = async id => {
    const activeCourse = courseData.data.data.find(item => item.id === id);

    if (activeCourse) {
      // let dt = {
      //   key: activeCourse.key,
      //   courseId: activeCourse.id,
      //   detail: activeCourse.detail,
      //   thumbnail: activeCourse.thumbnail,
      //   name: activeCourse.name,
      //   categoryId: activeCourse.courseCategory.id,
      //   duration: activeCourse.duration,
      //   jobCategoryIds: activeCourse.jobTypes.map(item => item.id),
      //   certification: activeCourse.certificate,
      //   // sequence: parseInt(activeCourse.sequence),
      //   mode: activeCourse.mode,
      //   isActive: true,
      //   isDeleted: false,
      //   // courseRatings : activeCourse.courseRatings,
      // };
      let formData = new FormData();
      formData.append('key', activeCourse.key,);
      formData.append('courseId', activeCourse.id);
      formData.append('detail', activeCourse.detail.toString('markdown'));
      formData.append('name', activeCourse.name);
      formData.append('categoryId', activeCourse.courseCategory.id);
      formData.append('duration', activeCourse.duration);
      formData.append('jobCategoryIds', JSON.stringify(activeCourse.jobTypes.map(item => item.id)));
      formData.append('certification', activeCourse.certificate);
      formData.append('application_form', activeCourse.application_form);
      formData.append('recommended_and_forwarded', activeCourse.recommended_and_forwarded);
      formData.append('application_process', activeCourse.application_process);
      formData.append('medical_superintendent', activeCourse.medical_superintendent);
      formData.append('hospital_expenses_estimation_certificate', activeCourse.hospital_expenses_estimation_certificate);
      formData.append('thumbnail', activeCourse.thumbnail);
      formData.append('mode', activeCourse.mode);
      formData.append('isActive', true);
      formData.append('isDeleted', false);
      console.log("state.id", activeCourse.id)
      const restoreSwayamCourses = await activeSwayamCourses(FormData);
      if (restoreSwayamCourses.status === 200) {
        toast.success("SwayamCourse active successful")
      }
    }
  };

  useEffect(() => {
    let temp = {
      hindi: '',
      marathi: ''
    }
    languageData && languageData.data && languageData.data.map((item) => {
      if (item.name === "marathi") {
        temp.marathi = item.id
      } else if (item.name === "Hindi") {
        temp.hindi = item.id

      }
    })
    setLangIds(temp)
  }, [languageData])

  const Submit = () => {
    dispatch(
      getCoursefilter(data.category ? data.category : '', perPage, pageNumber, data.mode ? data.mode : '', status, data.search ? data.search : "", langIds.hindi, langIds.marathi)
    );
    setExportTog(false);
  };
  const clearFilter = () => {
    setData({ ...data, category: '', search: '', mode: '' });
    dispatch(getCoursefilter('', perPage, pageNumber, '', status, "", langIds.hindi, langIds.marathi));
  };

  const viewSwayamCoursedata = id => {
    history.push(`/admin/courses/viewcourse?id=${id}`)
  };

  const onExportCourse = () => {
    // dispatch(getallSwayamCourse(data.mode))
    dispatch(getCoursefilter(data.category, perPage, pageNumber, data.mode, status, "", langIds.hindi, langIds.marathi));
    setExportTog(true);
    // if (state.length > 0) {
    //   setTimeout(() => {
    //     CSVLinkRef?.current?.link.click()
    //   });
    // }
    // CSVLinkRef?.current?.link.click()
  };

  const onAllExportCourse = () => {
    setExportTog(true);
    ApiGet(`course/allCourses?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`).then(res => {
      setState(res?.data?.data);
    });
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
  //     toast.success(res.data.isApproved ? 'Approved successful' : 'Disapproved successful');
  //     dispatch(getCoursefilter(data.category, perPage, pageNumber, data.mode, status));
  //   });
  // };

  const callback = key => {
    setStatus(key);
    setExportTog(false);
  };

  const onBannerSelect = (id, key, bannerSelected) => {
    if (status !== 'active') {
      return;
    }
    let data = {
      courseId: id,
      key: key,
      bannerSelected: !bannerSelected,
    };
    ApiPost(`course/updateBannerSelected?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, data).then(res => {
      toast.success(res.data.bannerSelected ? 'Banner Selected successful' : 'Banner unSelected  successful');
      dispatch(getCoursefilter(data.category, perPage, pageNumber, data.mode, status, "", langIds.hindi, langIds.marathi));
    });

  }

  const getOneCourseDetailByKey = async (languageId, key, id) => {
    await ApiGet(`course/getOneCourseDetailByKey?langId=${languageId}&key=${key}`)
      .then((res) => {
        //  dispatch(editCategoryRatingSuccess(res))
        //  if (res.status === 200) {  
        //   return dispatch(getCourseRatingData(per_page, page_number))
        // }
        if (res.status === 200) {
          toast.success("Course alredy exist in this language!")
        }
      })
      .catch(e => {
        if (e.response.status) {
          setIsConfirmModal(true);
          setLanguageID(languageId);
          setID(id);
          // history.push(`${path}/addcourses?langId=${languageId}?key=${key}`)
        }
      })
  }

  const languageHandalCancle = () => {
    setIsConfirmModal(false)
  }
  const languageHandalOk = () => {
    history.push(`${path}/addcourses?langid=${languageId}&id=${id}`);
  }

  const onClick = ({ key }) => {
    if (key == 'exportCourse') {
      onExportCourse();
    }
    if (key == 'exportAllCourse') {
      onAllExportCourse();
    }
    if (key == 'addCourse') {
      history.push(`/admin/courses/addcourses`);
    }
    if (key == 'import') {
      setImportModal(true);
    }

  };

  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: 'Export Course',
          key: 'exportCourse',
        },
        {
          label: 'Export All Course',
          key: 'exportAllCourse',
        },
        {
          label: 'Add Course',
          key: 'addCourse',
        },
        {
          label: 'Import',
          key: 'import',
        },
      ]}
    />
  );

  useEffect(() => {
    if (courseData && courseData.data) {
      setSwayamCoursetable(
        courseData.data?.data?.map(item => {
          let courseRatings = item.courseRatings.map(item => item.rating)
          var sum = 0;

          for (var i = 0; i < courseRatings.length; i++) {
            sum += parseInt(courseRatings[i]);
          }

          var avg = sum / courseRatings.length;

          return {
            CourseName: (
              <span className='For-Underline' onClick={() => viewSwayamCoursedata(item.id)}>
                {item?.name}
              </span>
            ),
            CourseCategory: item.courseCategory?.name,
            courseRatings: (
              <StarRatings
                rating={avg ? avg : 0}
                starRatedColor="#f57c00"
                numberOfStars={5}
                name="swayamCourse"
                starDimension="13px"
              />
            ),
            // CourseName: item.name,
            CourseDuration: item.duration,
            Certification: item.certificate ? 'Yes' : 'No',
            bannerSelected: (
              <>
                {
                  <div onClick={() => onBannerSelect(item.id, item.key, item.bannerSelected)}>
                    <Switch checked={item.bannerSelected} disabled={status === 'active' ? false : true}></Switch>
                  </div>
                }
              </>
            ),

            selectLanguage: (
              <div className="">

                <>
                  <Button size="small" type={item.hindi ? "success" : "primary"} shape='round' onClick={() => {
                    getOneCourseDetailByKey(langIds?.hindi, item?.key, item?.id)
                  }}>
                    HN
                  </Button>

                  <Button size="small" type={item.marathi ? "success" : "primary"} shape='round' onClick={() => {
                    // selectedLanguageData(item)
                    getOneCourseDetailByKey(langIds?.marathi, item?.key, item?.id)
                  }} >
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
                        to="#"
                        onClick={() => onDelete(item.id)}
                        shape="circle"
                      >
                        <FeatherIcon icon="trash-2" size={16} />
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
                  ) : (
                    <Button className="btn-icon" type="success" onClick={() => onActive(item.id)} shape="circle">
                      <FeatherIcon icon="rotate-ccw" size={16} />
                    </Button>
                  )}
                </div>
              </div>
            ),
          };
        }),
      );
    }
  }, [courseData]);

  const swayamCourseTableColumns = [
    {
      title: 'Course Name',
      dataIndex: 'CourseName',
      sorter: (a, b) => a.SchemeCategory?.length - b.SchemeCategory?.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Course Category',
      dataIndex: 'CourseCategory',
      sorter: (a, b) => a.CourseCategory.localeCompare(b.CourseCategory),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Course Rating',
      dataIndex: 'courseRatings',
    },
    {
      title: 'Course Duration (HH:MM)',
      dataIndex: 'CourseDuration',
    },
    {
      title: 'Certification',
      dataIndex: 'Certification',
    },
    {
      title: 'Select Language',
      dataIndex: 'selectLanguage',
      width: '90px',
    },
    {
      title: 'Banner selected',
      dataIndex: 'bannerSelected',
      // sortDirections: ['descend', 'ascend'],
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
        title="Swayam Courses"
        buttons={[
          <div key="1" className="page-header-actions">
            {/* <Button size="small" onClick={() => onExportCourse()} type="info">
              Export Course
            </Button>
            <CSVLink
              data={state}
              ref={CSVLinkRef}
              headers={header}
              filename="SwayamCourse.csv"
              style={{ opacity: 0 }}
            ></CSVLink>
            <Button size="small" type="info" onClick={() => onAllExportCourse()}>
              Export All Course
            </Button>
            <Button
              size="small"
              type="primary"
              onClick={() => {
                history.push(`/admin/courses/addcourses`);
              }}
            >
              Add Course
            </Button>
            <Button size="small" type="primary" onClick={() => setImportModal(true)}>
              Import
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
              data={state}
              ref={CSVLinkRef}
              filename="SwayamCourse.csv"
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
                    <Form.Item label="Course Category">
                      <Select
                        name="category"
                        size="large"
                        className="sDash_fullwidth-select"
                        value={data.category}
                        placeholder="Select Category"
                        onChange={e => onChangehandle(e, 'category')}
                      >
                        <Option value="">Select Category</Option>
                        {categoryData &&
                          categoryData.data &&
                          categoryData.data.map(items => <Option value={items?.id}>{items?.name} </Option>)}
                      </Select>
                    </Form.Item>
                  </Form>
                </Col>

                <Col md={6} xs={24} className="mb-25">
                  <Form name="sDash_select" layout="vertical">
                    <Form.Item label="Mode">
                      <Select
                        size="large"
                        className="sDash_fullwidth-select"
                        name="mode"
                        value={data.mode}
                        placeholder="Select Mode"
                        onChange={e => onChangehandle(e, 'mode')}
                      >
                        <Option value="">Select Mode</Option>
                        <Option value="BOTH">Both</Option>
                        <Option value="ONLINE">Online</Option>
                        <Option value="OFFLINE">Offline</Option>
                      </Select>
                    </Form.Item>
                  </Form>
                </Col>

                <Col md={6} xs={24} className="mb-25">
                  <Form name="sDash_select" layout="vertical">
                    <Form.Item label="Search">
                      <Input placeholder="search" value={data.search} name='search' onChange={e => onChangehandle(e.target.value, 'search')} />
                    </Form.Item>
                  </Form>
                </Col>
                <Col md={6} xs={24} className="mb-25">
                  <ListButtonSizeWrapper>
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => Submit()}
                    >
                      Apply
                    </Button>
                    <Button size="small" type="light" onClick={() => clearFilter()}>
                      Clear
                    </Button>
                  </ListButtonSizeWrapper>
                </Col>
              </Row>

              <Tabs onChange={callback}>
                <TabPane tab="Active Courses" key="active">
                  <UserTableStyleWrapper>
                    <TableWrapper className="table-responsive pb-30">
                      {/* --- search bar --- */}
                      {/* <Form name="sDash_select" layout="vertical">
                        <Form.Item name="search" label="">
                          <Input placeholder="search" style={{ width: 200 }} />
                        </Form.Item>
                      </Form> */}

                      <Table
                        // rowSelection={rowSelection}
                        dataSource={SwayamCourse}
                        columns={swayamCourseTableColumns}
                        pagination={{
                          defaultPageSize: courseData?.data.per_page,
                          total: courseData?.data.page_count,
                          onChange: (page, pageSize) => {
                            setPageNumber(page);
                            setPerPage(pageSize);
                            setExportTog(false);
                          },

                        }}
                      // pagination={false}
                      />
                    </TableWrapper>
                  </UserTableStyleWrapper>
                </TabPane>

                <TabPane tab="Inactive Courses" key="inactive">
                  <UserTableStyleWrapper>
                    <TableWrapper className="table-responsive">

                      <Table
                        // rowSelection={rowSelection}
                        dataSource={SwayamCourse}
                        columns={swayamCourseTableColumns}
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
              </Tabs>
            </Col>
          </Row>
        </Cards>
      </Main>

      {viewModal && (
        <ViewSwayamCourse
          viewModal={viewModal}
          type="primary"
          setViewModal={setViewModal}
          data={oneSwayamCourseData?.data}
        />
      )}
      {importModal && (
        <ImportSwayamCourse
          importModal={importModal}
          handleCancel={() => setImportModal(false)}
          modaltitle="Import Swayam Courses"
        />
      )}

      {isConfirmModal && (
        <ConfirmModal
          onOk={() => { setIsConfirmModal(false) }}
          onCancel={() => { setIsConfirmModal(false) }}
          visible={isConfirmModal}
          footer={
            <>
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

export default SwayamCourses;
