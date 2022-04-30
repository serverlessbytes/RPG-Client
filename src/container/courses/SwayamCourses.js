import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { ListButtonSizeWrapper, Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Col, Form, Input, Row, Select, Table, Tabs, Switch } from 'antd';
import ActiveSchemesTable from '../schemes/ActiveSchemesTable';
import { UserTableStyleWrapper } from '../pages/style';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { editSwayamCourse, getallSwayamCourse, getCategoryData, getCoursefilter, getOneCoursefilter } from '../../redux/course/actionCreator';
import moment from 'moment';
import ViewSwayamCourse from './ViewSwayamCourse';
import { CSVLink } from 'react-csv';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import actions from '../../redux/course/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const {
  getallSwayamCourseSuccess,
  addSwayamPartnerCourseSuccess,
  editSwayamPartnerCourseSuccess,
} = actions;

const SwayamCourses = () => {
  const dispatch = useDispatch();
  const { Option } = Select;
  const history = useHistory();
  const CSVLinkRef = useRef(null)
  const usersTableData = [];
  const { path } = useRouteMatch();
  const [activeCoursetog, setActiveCourseTog] = useState(true);
  const categoryData = useSelector(state => state.category.categoryData);
  const courseData = useSelector(state => state.category.courseFilterData);
  const addSwayamCourseData = useSelector(state => state.category.addSwayamCourseData);
  const addSwayamCourseDataErr = useSelector(state => state.category.addSwayamCourseDataErr);
  const editSwayamCourseData = useSelector(state => state.category.editSwayamCourseData);
  const editSwayamCourseErr = useSelector(state => state.category.editSwayamCourseErr);

  const [data,setData] = useState({
    category: '',
    mode: '',
  });
  const [perPage, setPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [status, setStatus] = useState('active');
  const [usertable, setUsertable] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [state, setState] = useState('');

  const oneSwayamCourseData = useSelector(state => state.category.editFilterData);
  const allCategortData = useSelector(state => state.category.getAllCourse);

  const header = [
    { label: "id", key: "id" },
    { label: "name", key: "name" },
    { label: "certificate", key: "certificate" },
    { label: "createdAt", key: "createdAt" },
    { label: "detail", key: "detail" },
    { label: "duration", key: "duration" },
    { label: "key", key: "key" },
    { label: "mode", key: "mode" },
    { label: "sequence", key: "sequence" },
    { label: "thumbnail", key: "thumbnail" },
    { label: "viewCount", key: "viewCount" },
  ];

  useEffect(() => {
    if (state.length) {
      CSVLinkRef?.current?.link.click()  // for export
    }
    console.log("state", state);
  }, [state])

  useEffect(() => {
    return (() => {
      // setState([])
      dispatch(getallSwayamCourseSuccess(null)) //FOR CLEAR A STATE OF A EXPORT
    })
  }, [])

useEffect(()=>{
  console.log("editSwayamCourseData",editSwayamCourseData)
},[editSwayamCourseData])

useEffect(() => {
  if (addSwayamCourseData && addSwayamCourseData.message  === 'Course Created Successfully') {
      dispatch(addSwayamPartnerCourseSuccess(null))
      // dispatch(getJobsFilterForMainSuccess(null))
      toast.success("Swayam Course Add successful");
      //toastAssetsAdd(true)
      //onHide()
  }
  // else if(editSchemedata && editSchemedata.data && editSchemedata.data.isActive === true){
  //   dispatch(editSchemeSuccess(null))
  //   toast.success("Jobs Update successful");
  // }
}, [addSwayamCourseData])

useEffect(()=>{
  if(addSwayamCourseDataErr){ 
    toast.error("Something Wrong")
  }
},[addSwayamCourseDataErr])

useEffect(() => {
  if (editSwayamCourseData && editSwayamCourseData.isActive  === false) {
      dispatch(editSwayamPartnerCourseSuccess(null))
      toast.success("Swayam Course Delete successful");
      //toastAssetsAdd(true)
      //onHide()
  }
  else if(editSwayamCourseData && editSwayamCourseData.isActive  === true){
    dispatch(editSwayamPartnerCourseSuccess(null))
    toast.success("Swayam Course Update successful");
  }
}, [editSwayamCourseData])

useEffect(()=>{
  if(editSwayamCourseErr){ 
    toast.error("Something Wrong")
  }
},[editSwayamCourseErr])

  useEffect(() => {
    if (allCategortData?.data?.data) { //set a state for export excel
      setState(allCategortData.data.data.map((item) => {
        return {
          ...item,
          // courseCategory: item?.courseCategory?.name,
          // jobTypes: item?.jobTypes?.name,
          schemeCategory: item?.schemeCategory?.name,
          benifitLine: item.benifitLine,
        }
      })
      )
    }
  }, [allCategortData])


  useEffect(() => {
    dispatch(getCategoryData());
  }, []);

  // useEffect(() => {
  //   if (categoryData && categoryData.data && categoryData.data.length > 0) {
  //     setData({ ...data, category: categoryData.data[0].id });
  //   }
  // }, [categoryData]);

  useEffect(() => {
    if (status && data.category) {
      dispatch(getCoursefilter(data.category, perPage, pageNumber, data.mode, status));
    }
    else{
      Submit()
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

  useEffect(() => { console.log("dataaaa", data) }, [data])

  const onEdit = id => {
    history.push(`${path}/addcourses?id=${id}`);
  };

  const onDelete = id => {
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
        sequence: parseInt(singleData.sequence),
        mode: singleData.mode,
        isActive: false,
        isDeleted: true,
      };
      dispatch(editSwayamCourse(dt));
    }
  };

  const onActive = (id) => {
    const activeCourse = courseData.data.data.find(item => item.id === id);
    console.log("activeCourse",activeCourse)
    if (activeCourse) {
      let dt = {
        key: activeCourse.key,
        courseId:activeCourse.id,
        detail: activeCourse.detail,
        thumbnail: activeCourse.thumbnail,
        name: activeCourse.name,
        categoryId: activeCourse.courseCategory.id,
        duration: activeCourse.duration,
        jobCategoryIds: activeCourse.jobTypes.map(item => item.id),
        certification: activeCourse.certificate,
        sequence: parseInt(activeCourse.sequence),
        mode: activeCourse.mode,
        isActive: true,
        isDeleted: false,
      };
      console.log("dt",dt)
      dispatch(editSwayamCourse(dt));
    }
  }

  const Submit = () => {
    console.log("category",data.category)
    console.log("status",status)
    dispatch(getCoursefilter(data.category ? data.category : "", perPage, pageNumber, data.mode ? data.mode : "", status));
  };

  const clearFilter = () => {
    setData({ category: '' })
    dispatch(getCoursefilter("", perPage, pageNumber, "", status));
  }

  const viewSwayamCoursedata = (key) => {
    dispatch(getOneCoursefilter(key))
    setViewModal(true)
  }

  const onExportCourse = () => {
    dispatch(getallSwayamCourse(data.mode))
    // if (state.length > 0) {
    //   setTimeout(() => {
    //     CSVLinkRef?.current?.link.click()
    //   });
    // }
    // CSVLinkRef?.current?.link.click() 
  }

  const onAllExportCourse = () => {
    ApiGet(`course/allCourses?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`).then((res) => {
      console.log("ressss", res)
      setState(res?.data?.data)
    })
  }

  const onApproved = (id, isAp, key) => {
    if(status !== "active"){
      return
    }
    let data = {
      courseId: id,
      key: key,
      isApproved: !isAp
    }
    ApiPost(`course/updateIsApproved?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, data)
      .then((res) => {
        console.log("res",res)
        if(res.status === 200)
        {
          toast.success("Approved successful");
        }
        dispatch(getCoursefilter(data.category, perPage, pageNumber, data.mode, status));
      })
  }

  useEffect(() => {
    if (courseData && courseData.data) {
      setUsertable(
        courseData.data?.data?.map(item => {
          // const { id, name, designation, status } = user;
          return {
            //key: id,

            CourseName: item.name,
            CourseCategory: item.courseCategory.name,
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
                  <Switch checked={item.isApproved} disabled = {status === "active" ? false : true}></Switch>
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

                  {
                    status === "active" ?
                      <>
                        <Button className="btn-icon" onClick={() => onEdit(item.id)} type="info" to="#" shape="circle">
                          <FeatherIcon icon="edit" size={16} />
                        </Button>

                        {/* <Button className="btn-icon" type="danger" onClick={() => onDelete(item.id)} to="#" shape="circle">
                      <FeatherIcon icon="x-circle" size={16} />
                    </Button> */}
                        <Button className="btn-icon" type="danger" to="#" onClick={() => onDelete(item.id)} shape="circle">
                          <FeatherIcon icon="trash-2" size={16} />
                        </Button>
                        <Button className="btn-icon" type="success" onClick={() => viewSwayamCoursedata(item.id)} shape="circle">
                          <FeatherIcon icon="eye" size={16} />
                        </Button>
                      </>
                      : <Button className="btn-icon" type="success" onClick={() => onActive(item.id)} shape="circle">
                        <FeatherIcon icon="rotate-ccw" size={16} />
                      </Button>
                  }


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
  };

  return (
    <>
      <PageHeader
        ghost
        title="Courses"
        buttons={[
          <div key="1" className="page-header-actions">

            <Button size="small" onClick={() => onExportCourse()} type="info">
              Export Course
            </Button>
            <CSVLink data={state} ref={CSVLinkRef} headers={header} filename="SwayamCourse.csv" style={{ opacity: 0 }}></CSVLink>
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
          </div>
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
                          categoryData.data.map(items => <Option value={items.id}>{items.name} </Option>)}
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
                    <Button size="small" type="primary" onClick={() => Submit()}>
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
                          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                          onChange: (page, pageSize) => {
                            setPageNumber(page);
                            setPerPage(pageSize)
                          }
                          // defaultPageSize: 5,
                          // total: usersTableData.length,
                          // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
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
                          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                          onChange: (page, pageSize) => {
                            setPageNumber(page);
                            setPerPage(pageSize)
                          }
                          // defaultPageSize: 5,
                          // total: usersTableData.length,
                          // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
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

      {viewModal && <ViewSwayamCourse viewModal={viewModal} type="primary" setViewModal={setViewModal} data={oneSwayamCourseData?.data} />}
    </>
  );
};

export default SwayamCourses;
