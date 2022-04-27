import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import FeatherIcon from 'feather-icons-react';
import { ListButtonSizeWrapper, Main, TableWrapper } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Col, Form, Input, Row, Select, Table, Tabs,Switch } from 'antd';
import { UserTableStyleWrapper } from '../pages/style';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import { editPartnerCoursefilter, getallSwayamCourse, getCategoryData, getCoursefilter, getOneCoursefilter } from '../../redux/course/actionCreator';
import ViewPartnerCourse from './ViewPartnerCourse';
import { CSVLink } from 'react-csv';
import { ApiPost } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import actions from '../../redux/course/actions';

const PartnerCourses = () => {
  const {
    getallSwayamCourseSuccess,
  } = actions;

  const courseData = useSelector(state => state.category.courseFilterData);
  const { Option } = Select;
  const history = useHistory();
  let dispatch = useDispatch();
  const { path } = useRouteMatch();
  const CSVLinkRef = useRef(null);

  const [viewModal, setViewModal] = useState(false);
  const [state, setState] = useState({ //
    category: '',
    mode: 'PARTNER',
  });

  const [data, setData] = useState([]);
  const [usertable, setUsertable] = useState([]); //set data
  const [activeCoursetog, setActiveCourseTog] = useState(true);

  useEffect(() => {
    if (data.length) {
      CSVLinkRef?.current?.link.click()  // 
    }
    console.log("state", state);
  }, [data])

  useEffect(() => {
    return(()=>{
      // setState([])
      dispatch(getallSwayamCourseSuccess(null)) //FOR CLEAR A STATE OF A EXPORT
    })
  }, [])

  let catdata = useSelector(state => state.category.categoryData);
  const allCategortData = useSelector(state => state.category.getAllCourse); //export
  const onePartnerCourseData = useSelector(state => state.category.editFilterData)

  const header = [
    { label: "id", key: "id" },
    { label: "name", key: "name" },
    { label: "location", key: "location" },
    { label: "contactPersonEmail", key: "contactPersonEmail" },
    { label: "contactPersonName", key: "contactPersonName" },
    { label: "contactPersonPhone", key: "contactPersonPhone" },
    { label: "district", key: "district" },
    { label: "createdAt", key: "createdAt" },
    { label: "detail", key: "detail" },
    { label: "duration", key: "duration" },
    { label: "eligibility", key: "eligibility" },
    { label: "isActive", key: "isActive" },
    { label: "isApproved", key: "isApproved" },
    { label: "isDeleted", key: "isDeleted" },
    { label: "key", key: "key" },
    { label: "mode", key: "mode" },
    { label: "organization", key: "organization" },
    { label: "pincode", key: "pincode" },
    { label: "thumbnail", key: "thumbnail" },
    { label: "sequence", key: "sequence" },
    { label: "certificationBody", key: "certificationBody" },
    { label: "certificate", key: "certificate" },
    { label: "component", key: "component" },
  ];
  useEffect(() => {
    if (allCategortData?.data?.data) { //set a state for export word
      setData(allCategortData.data.data.map((item) => {
        return {
          ...item,
          courseCategory: item?.courseCategory?.name,
          jobTypes: item?.jobTypes?.name,
          // schemeCategory: item?.schemeCategory?.name,
          // benifitLine: item.benifitLine,
        }
      })
      )
    }
  }, [allCategortData])

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

  // const { users } = useSelector(state => {
  //     return {
  //         users: state.users,
  //     };
  // });

  const [perPage, setPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(1);
  const [status, setStatus] = useState('active');

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

  const viewPartnerCoursedata = (key) => {
    dispatch(getOneCoursefilter(key))
    setViewModal(true)
  }

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

  const onApproved=(id,isAp,key)=>{
    let data={
      courseId:id,
      key:key,
      isApproved:!isAp
    }
    console.log("data",data);
    ApiPost(`course/updateIsApproved?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`,data)
    .then((res) => {
      dispatch(getCoursefilter(state.category, perPage, pageNumber, state.mode ? state.mode : "", status));
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
            //State: item.state,
            CourseType: item.mode,
            approved:(
              <>
                <div onClick={()=>onApproved(item.id,item.isApproved,item.key)}>
                <Switch checked={item.isApproved}></Switch>
                </div>
              </>
            ),
            // Language: "Hindi",
            action: (
              <div className="active-schemes-table">
                <div className="table-actions">
                  <>
                    {status === 'active' && (
                      <Button className="btn-icon" onClick={() => onEdit(item.id)} type="info" to="#" shape="circle">
                        <FeatherIcon icon="edit" size={16} />
                      </Button>
                    )}

                    {status === 'active' && (
                      <Button
                        className="btn-icon"
                        type="danger"
                        onClick={() => onDelete(item.id)}
                        to="#"
                        shape="circle"
                      >
                      <FeatherIcon icon="trash-2" size={16} />
                      </Button>
                    )}
                    <Button className="btn-icon" type="success" onClick={() => viewPartnerCoursedata(item.id)} shape="circle">
                      <FeatherIcon icon="eye" size={16} />
                    </Button>
                    {/* <Button className="btn-icon" type="info" to="#" shape="circle">
                                <FeatherIcon icon="edit" size={16} />
                            </Button> */}
                  </>
                </div>
              </div>
            ),
          };
        }),
      );
    }
  }, [courseData]);

  const Submit = () => {
    dispatch(getCoursefilter(state.category, perPage, pageNumber, state.mode, status));
  };
  useEffect(() => {
    if(state.category){
      dispatch(getCoursefilter(state.category, perPage, pageNumber, state.mode? state.mode : "", status));
    }
  }, [state.category, perPage, pageNumber, state.mode, status]); //paganation

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
    // {
    //     title: 'State',
    //     dataIndex: 'State',
    // },
    {
      title: 'Course Type',
      dataIndex: 'CourseType',
    },
    // {
    //     title: 'Language',
    //     dataIndex: 'Language',
    //     sortDirections: ['descend', 'ascend'],
    // },
    {
      title:'Approved',
      dataIndex:'approved',
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
    console.log(key);
  };

  const onePartnercourseData = () => {
    dispatch(getallSwayamCourse(state.mode))
  }
  // const onAllPartnerCourse = () => {
  // }

  return (
    <>
      <PageHeader
        ghost
        title="Partner Courses"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button size="small" type="info" onClick={()=>{onePartnercourseData()}}>
              Export Courses
            </Button>
            <CSVLink data={data} ref={CSVLinkRef} headers={header} filename="Partner.csv" style={{ opacity: 0 }}></CSVLink>
            {/* <Button size="small" type="info" onClick={() => onAllPartnerCourse()}>
              Export All Course
            </Button> */}
            <Button
              size="small"
              type="primary"
              onClick={() => {
                history.push(`${path}/addpartnercourses`);
              }}
            >
              Add Courses
            </Button>
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
                                        <Form.Item name="basic-select" label="State">
                                            <Select size="large" className="sDash_fullwidth-select" placeholder="Select State">
                                                <Option value="1"> All India </Option>
                                                <Option value="2"> Andaman and Nicobar Islands </Option>
                                                <Option value="3"> Arunachal Pradesh </Option>
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
                    </Button> */}
                    {/* <Button size="small" type="light">
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
                        dataSource={usertable}
                        columns={usersTableColumns}
                        pagination={{
                          // defaultPageSize: courseData?.per_page,
                          // defaultPageSize: courseData?.data.per_page,
                          defaultPageSize: courseData?.data.per_page,
                          total: courseData?.data.page_count,
                          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                          onChange: (page, pageSize) => {
                            setPageNumber(page);
                            setPerPage(pageSize);
                          },
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
                        columns={usersTableColumns.filter(item => item.title !== 'Actions')}
                        pagination={{
                          // defaultPageSize: 5,
                          // total: usersTableData.length,
                          // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                          defaultPageSize: courseData?.data.per_page,
                          total: courseData?.data.page_count,
                          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                          onChange: (page, pageSize) => {
                            setPageNumber(page);
                            setPerPage(pageSize);
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
      {viewModal && <ViewPartnerCourse viewModal={viewModal} type="primary" setViewModal={setViewModal} data={onePartnerCourseData && onePartnerCourseData.data ? onePartnerCourseData.data : ''} />}
    </>
  );
};

export default PartnerCourses;
