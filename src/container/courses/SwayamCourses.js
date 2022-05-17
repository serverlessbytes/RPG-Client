import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { ListButtonSizeWrapper, Main, ProjectPagination, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Col, Form, Input, Row, Select, Table, Tabs, Switch, Pagination, Dropdown, Space, Menu } from 'antd';
import ActiveSchemesTable from '../schemes/ActiveSchemesTable';
import { UserTableStyleWrapper } from '../pages/style';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import {
  editSwayamCourse,
  getallSwayamCourse,
  getCategoryData,
  getCoursefilter,
  getOneCoursefilter,
} from '../../redux/course/actionCreator';
import ViewSwayamCourse from './ViewSwayamCourse';
import { CSVLink } from 'react-csv';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import actions from '../../redux/course/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImportFileModal from '../../components/modals/ImportFileModal';
import ImportSwayamCourse from '../../components/modals/ImportSwayamCourse';
import { DownOutlined } from '@ant-design/icons';

const {
  getallSwayamCourseSuccess,
  addSwayamPartnerCourseSuccess,
  addSwayamPartnerCourseErr,
  editSwayamPartnerCourseSuccess,
  addSwayamCourseModuleErr,
  addSwayamCourseModuleSuccess,
} = actions;

const SwayamCourses = () => {
  const dispatch = useDispatch();
  const { Option } = Select;
  const history = useHistory();
  const CSVLinkRef = useRef(null);
  const usersTableData = [];
  const { path } = useRouteMatch();
  const [activeCoursetog, setActiveCourseTog] = useState(true);

  const categoryData = useSelector(state => state.category.categoryData);
  const courseData = useSelector(state => state.category.courseFilterData);
  const addSwayamCourseData = useSelector(state => state.category.addSwayamCourseData);
  const addSwayamCourseDataErr = useSelector(state => state.category.addSwayamCourseDataErr);
  const editSwayamCourseData = useSelector(state => state.category.editSwayamCourseData);
  const editSwayamCourseErr = useSelector(state => state.category.editSwayamCourseErr);
  const addSwayamCourseModuleData = useSelector(state => state.category.addSwayamCourseModuleData); //
  const addSwayamCourseModuleError = useSelector(state => state.category.addSwayamCourseModuleError); //

  const [data, setData] = useState({
    category: '',
    mode: '',
  });
  const [perPage, setPerPage] = useState(20);// forpagination
  const [pageNumber, setPageNumber] = useState(1);
  const [status, setStatus] = useState('active');
  const [usertable, setUsertable] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [importModal, setImportModal] = useState(false);
  const [state, setState] = useState('');
  const [exportTog, setExportTog] = useState(false);

  const oneSwayamCourseData = useSelector(state => state.category.editFilterData);
  const allCategoryData = useSelector(state => state.category.getAllCourse);

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
      toast.success('Swayam Course Import successful');
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
      setState(courseData.data.data);
    }
  }, [courseData]);

  useEffect(() => {
    dispatch(getCategoryData());
  }, []);

  useEffect(() => {
    if (status && data.category) {
      dispatch(getCoursefilter(data.category, perPage, pageNumber, data.mode, status));
    } else {
      Submit();
    }
  }, [status, perPage, pageNumber]);

  useEffect(() => {
    if (data.category && activeCoursetog) {
      Submit();
    }
  }, [data]);

  const onChangehandle = (e, name) => {
    setActiveCourseTog(false);
    if (name == 'category') {
      setData({ ...data, category: e });
    } else if (name == 'mode') {
      setData({ ...data, mode: e });
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

  const onDelete = async id => {
    const singleData = courseData.data.data.find(item => item.id === id);
    if (singleData) {
      let dt = {
        key: singleData.key,
        courseId: id,
        detail: singleData.detail,
        thumbnail: singleData.thumbnail,
        name: singleData.name,
        categoryId: singleData.courseCategory.id,
        duration: singleData.duration,
        jobCategoryIds: singleData.jobTypes.map(item => item.id),
        certification: singleData.certificate,
        // sequence: parseInt(singleData.sequence),
        mode: singleData.mode,
        isActive: false,
        isDeleted: true,
      };
      dispatch(editSwayamCourse(dt));
      //   const deleteSwayamCourses = await newSawyamCourse(dt);
      //   if (deleteSwayamCourses.status === 200) {
      //     toast.success("SwayamCourse delete successful")
      //   }
    }
  };

  const activeSwayamCourses = dt =>{
    const newVal = ApiPost("course/editSwayamCourse" , dt)
    .then((res) =>{
      if (res.status === 200) {
        dispatch(getCategoryData())
      } 
      return res
    })
    return newVal
  }

  const onActive = id => {
    const activeCourse = courseData.data.data.find(item => item.id === id);
    if (activeCourse) {
      let dt = {
        key: activeCourse.key,
        courseId: activeCourse.id,
        detail: activeCourse.detail,
        thumbnail: activeCourse.thumbnail,
        name: activeCourse.name,
        categoryId: activeCourse.courseCategory.id,
        duration: activeCourse.duration,
        jobCategoryIds: activeCourse.jobTypes.map(item => item.id),
        certification: activeCourse.certificate,
        // sequence: parseInt(activeCourse.sequence),
        mode: activeCourse.mode,
        isActive: true,
        isDeleted: false,
      };
      const restoreSwayamCourses =  activeSwayamCourses(dt)
      if( restoreSwayamCourses.status === 200){
        toast.success("SwayamCourse active successful")
      }
      // dispatch(editSwayamCourse(dt));
    }
  };

  const Submit = () => {
    dispatch(
      getCoursefilter(data.category ? data.category : '', perPage, pageNumber, data.mode ? data.mode : '', status),
    );
  };

  const clearFilter = () => {
    setData({ category: '' });
    dispatch(getCoursefilter('', perPage, pageNumber, '', status));
  };

  const viewSwayamCoursedata = key => {
    dispatch(getOneCoursefilter(key));
    setViewModal(true);
  };

  const onExportCourse = () => {
    // dispatch(getallSwayamCourse(data.mode))
    dispatch(getCoursefilter(data.category, perPage, pageNumber, data.mode, status));
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

  const onApproved = (id, isAp, key) => {
    if (status !== 'active') {
      return;
    }
    let data = {
      courseId: id,
      key: key,
      isApproved: !isAp,
    };
    ApiPost(`course/updateIsApproved?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, data).then(res => {
      toast.success(res.data.isApproved ? 'Approved successful' : 'Disapproved successful');
      dispatch(getCoursefilter(data.category, perPage, pageNumber, data.mode, status));
    });
  };

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
      setUsertable(
        courseData.data?.data?.map(item => {
          // const { id, name, designation, status } = user;
          return {
            //key: id,
            CourseName: (
              <span style={{ cursor: "pointer" }} onClick={() => viewSwayamCoursedata(item.id)}>
                {item?.name}
              </span>
            ),
            // CourseName: item.name,
            CourseCategory: item.courseCategory?.name,
            CourseDuration: item.duration,
            Certification: item.certificate ? 'Yes' : 'No',
            approved: (
              <>
                {/* {
                status === "active" ?  <div onClick={() => onApproved(item.id, item.isApproved, item.key)}>
                <Switch checked={item.isApproved}></Switch>
              </div> :
               <div onClick={() => onApproved(item.id, item.isApproved, item.key)}>
               <Switch checked={false}></Switch>
             </div>
              } */}
                <div onClick={() => onApproved(item.id, item.isApproved, item.key)}>
                  <Switch checked={item.isApproved} disabled={status === 'active' ? false : true}></Switch>
                </div>
              </>
            ),
            // CourseDuration:item.
            //State: item.state,
            // CourseType: item.mode,
            // Language: "Hindi",
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

  const usersTableColumns = [
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
      title: 'Course Duration (HH:MM)',
      dataIndex: 'CourseDuration',
    },
    {
      title: 'Certification',
      dataIndex: 'Certification',
    },
    // {
    //     title: 'Language',
    //     dataIndex: 'Location',
    //     sortDirections: ['descend', 'ascend'],
    // },
    {
      title: 'Approved',
      dataIndex: 'approved',
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
    setExportTog(false);
  };

  return (
    <>
      <PageHeader
        ghost
        title="Courses"
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
                  Click menu item
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
                  <ListButtonSizeWrapper>
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => {
                        Submit();
                        setExportTog(false);
                      }}
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
                        dataSource={usertable}
                        columns={usersTableColumns}
                        // pagination={{
                        //   defaultPageSize: 15,
                        //   total: usersTableData.length,
                        //   showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        // }}
                        pagination={{
                          defaultPageSize: courseData?.data.per_page,
                          total: courseData?.data.page_count,
                          // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                          onChange: (page, pageSize) => {
                            setPageNumber(page);
                            setPerPage(pageSize);
                            setExportTog(false);
                          },
                          // defaultPageSize: 5,
                          // total: usersTableData.length,
                          // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        }}
                      // pagination={false}
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
                        dataSource={usertable}
                        columns={usersTableColumns}
                        // pagination={{
                        //   defaultPageSize: 15,
                        //   total: usersTableData.length,
                        //   showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        // }}
                        pagination={{
                          defaultPageSize: courseData?.data.per_page,
                          total: courseData?.data.page_count,
                          // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                          onChange: (page, pageSize) => {
                            setPageNumber(page);
                            setPerPage(pageSize);
                            setExportTog(false);
                          },
                          // defaultPageSize: 5,
                          // total: usersTableData.length,
                          // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        }}

                      // pagination={false}
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
    </>
  );
};

export default SwayamCourses;
