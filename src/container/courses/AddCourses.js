import { Checkbox, Col, Form, Input, Pagination, Radio, Row, Select, Space, Table, Tabs, TimePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import RichTextEditor from 'react-rte';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import moment from 'moment';
import {
  addSwayamCourse,
  addSwayamCourseModule,
  editSwayamCourse,
  editSwayamCourseModule,
  getCategoryData,
  getOneCoursefilter,
  getSwayamCourseModule,
} from '../../redux/course/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { getJobcategory } from '../../redux/jobs/actionCreator';
import uuid from 'react-uuid';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getUser } from '../../redux/authentication/actionCreator';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';

const AddCourses = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');

  const history = useHistory();
  const { Option } = Select;
  const { TextArea } = Input;

  const dispatch = useDispatch();

  const categoryData = useSelector(state => state.category.categoryData);
  const jobCategoryData = useSelector(state => state.job.jobCatogeryData);
  const editOneSwayamCourseData = useSelector(state => state.category.editFilterData);
  const addSwayamCourseData = useSelector(state => state.category.addSwayamCourseData);
  const userData = useSelector(state => state.auth.getUserData);
  const getSwayamCourseData =useSelector(state=>state.category.getSwayamCourseModuleData)

  const [state, setState] = useState({
    detail: RichTextEditor.createEmptyValue(),
    name: '',
    categoryId: '',
    duration: '',
    jobCategoryIds: [],
    certification: '',
    sequence: '',
    mode: '',
    key: '',
    thumbnail:'',
  });

  const [moduleState, setModuleState] = useState([
    {
      key: uuid(),
      name: '',
      detail: '',
      duration: '',
      videoUrl: '',
      sequence: '',
      course: (addSwayamCourseData && addSwayamCourseData.data && addSwayamCourseData.data.id) || id,
      language: AuthStorage.getStorageData(STORAGEKEY.language),
      createdByUser:'',
      modifiedByUser:'',
    },
  ]);
  const [error, setError] = useState({});
  const [swyamModuleId, setSwyamModuleId] = useState(true);
  const [selectKey, setSelectKey] = useState(0);
  const [moduleError,setModuleError]=useState([]);

  useEffect(() => {
    if(getSwayamCourseData && getSwayamCourseData.data && id){
        setModuleState(getSwayamCourseData.data.map((item)=>{
            return{
                name: item.name,
                detail: item.detail,
                duration: moment(item.duration,"HH:mm:ss"),
                videoUrl: item.videoUrl,
                sequence: item.sequence,
                key: item.key,
                moduleId: item.id,
                isActive:true,
                isDeleted:false
            }
        }))
    }
  }, [getSwayamCourseData])
  

  useEffect(() => {
    if (userData && userData.data && userData.data.id && !id) {
      // setModuleState([{...moduleState,createdByUser:userData.data.id,modifiedByUser:userData.data.id}])
      (moduleState[0].createdByUser = userData.data.id), (moduleState[0].modifiedByUser = userData.data.id);
    }
  }, [userData]);

  useEffect(() => {
    if (addSwayamCourseData && 'data' in addSwayamCourseData) {
      (moduleState[0].course = addSwayamCourseData.data.id);
    }
  }, [addSwayamCourseData]);


  useEffect(() => {
    console.log('moduleState', moduleState);
  }, [moduleState]);

  useEffect(() => {
    if (editOneSwayamCourseData && editOneSwayamCourseData.data && id) {
      setState({
        ...state,
        detail: RichTextEditor.createValueFromString(editOneSwayamCourseData.data.detail, 'markdown'),
        name: editOneSwayamCourseData.data.name,
        categoryId: editOneSwayamCourseData.data.courseCategory.id,
        duration: moment(editOneSwayamCourseData.data.duration,"HH:mm:ss") ,
        jobCategoryIds: editOneSwayamCourseData.data.jobTypes.map(item => item.id),
        certification: editOneSwayamCourseData.data.certificate,
        sequence: editOneSwayamCourseData.data.sequence,
        mode: editOneSwayamCourseData.data.mode,
        key: editOneSwayamCourseData.data.key,
        thumbnail:editOneSwayamCourseData.data.thumbnail
      });
    }
  }, [editOneSwayamCourseData]);

  useEffect(() => {
    if (id) {
      dispatch(getOneCoursefilter(id));
      setSwyamModuleId(false);
      dispatch(getSwayamCourseModule(id))
      
    }
  }, [id]);

  useEffect(() => {
    if (addSwayamCourseData && addSwayamCourseData.data && addSwayamCourseData.data.id) {
      setSwyamModuleId(false);
    }
  }, [addSwayamCourseData]);

  useEffect(() => {
    dispatch(getCategoryData());
    dispatch(getJobcategory());
    dispatch(getUser());
  }, []);

  
  const onChange = (e, name) => {
    if (name === 'categoryId') {
      setState({ ...state, [name]: e });
    } else if (name === 'jobCategoryIds') {
      setState({ ...state, [name]: e });
    } else if (name === 'duration') {
      setState({ ...state, [name]: e });
    } else if (name === 'mode') {
      setState({ ...state, [name]: e });
    } else if (name === 'sequence') {
      if (e.target.value > 0) {
        setState({ ...state, [e.target.name]: e.target.value });
      } else {
        setState({ ...state, [e.target.name]: 0 });
      }
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  };

  const onChangesEditorDetail = (e, name) => {
    setState({ ...state, [name]: e });
  };

  const validation = () => {
    // console.log("(state.benifitLine).toString", (state.benifitLine).toString("markdown"))
    let error = {};
    let flage = false;
    if (state.name === '') {
      error.name = 'Course name is required';
      flage = true;
    }
    if (state.categoryId === '') {
      error.categoryId = 'Course category is required';
      flage = true;
    }
    if (state.detail.toString('markdown').length <= 2) {
      error.detail = 'Detail is required';
      flage = true;
    }
    if (state.duration === '') {
      error.duration = 'Course duration body is required';
      flage = true;
    }
    if (state.jobCategoryIds === '') {
      error.jobCategoryIds = 'Job Category is required';
      flage = true;
    }
    if (state.sequence === '') {
      error.sequence = 'Senquence is required';
      flage = true;
    }
    if (state.certification === '') {
      error.certification = 'Certification name is required';
      flage = true;
    }
    if (state.mode === '') {
      error.mode = 'Mode name is required';
      flage = true;
    }
    if (state.thumbnail === '') {
      error.mode = 'Thumbnail is required';
      flage = true;
    }

    setError(error);
    return flage;
  };

  const moduleValidation=()=>{

    let flage=false;
    const error={}
    if(moduleState.length){
      moduleState.map((item,i)=>{
        if(item.name===""){
          error[`name${i+1}`]="Please enter module name";
          flage=true
        }
        if(item.videoUrl===""){
          error[`videoUrl${i+1}`]="Please enter video url";
          flage=true
        }
        if(item.duration===""){
          error[`duration${i+1}`]="Please enter module duration";
          flage=true
        }
        if(item.sequence===""){
          error[`sequence${i+1}`]="Please enter sequence";
          flage=true
        }
        if(item.detail===""){
          error[`detail${i+1}`]="Please enter module detail";
          flage=true
        }
      })
    }
    setModuleError(error)
    return flage
  
  }

  const onSubmit = () => {
    if (validation()) {
      return;
    }
    let data = {
      key: uuid(),
      detail: state.detail.toString('markdown'),
      name: state.name,
      categoryId: state.categoryId,
      duration: moment(state.duration).format("HH:mm:ss"),
      jobCategoryIds: state.jobCategoryIds,
      certification: state.certification,
      sequence: parseInt(state.sequence),
      mode: state.mode,
      thumbnail: state.thumbnail
    };
    dispatch(addSwayamCourse(data));
  };

  const onEdit = () => {
    if (validation()) {
      return;
    }
    let data = {
      key: state.key,
      courseId: id,
      detail: state.detail.toString('markdown'),
      name: state.name,
      categoryId: state.categoryId,
      duration: moment(state.duration).format('HH:mm:ss'),
      jobCategoryIds: state.jobCategoryIds,
      certification: state.certification,
      sequence: parseInt(state.sequence),
      mode: state.mode,
      thumbnail: state.thumbnail,
      isActive: true,
      isDeleted: false,
    };
    console.log("data",data)
    dispatch(editSwayamCourse(data));
  };

  const addData = () => {
    let val = [...moduleState];
    val.push({
      key: uuid(),
      name: '',
      detail: '',
      duration: '',
      videoUrl: '',
      sequence: '',
      course: (addSwayamCourseData && addSwayamCourseData.data && addSwayamCourseData.data.id) || id,
      language: AuthStorage.getStorageData(STORAGEKEY.language),
      createdByUser: userData && userData.data && userData.data.id,
      modifiedByUser: userData && userData.data && userData.data.id,
    });
    setModuleState(val);
  };

  const moduleChange = (e, i, name) => {
    let value = [...moduleState];
    if (name === 'name') {
      value[i].name = e.target.value;
      setModuleState(value);
    }else if(name==="videoUrl"){
        value[i].videoUrl=e.target.value;
        setModuleState(value);
    }else if(name==="duration"){
        value[i].duration=e;
        setModuleState(value);
    }else if(name==="sequence"){
        value[i].sequence=e.target.value;
        setModuleState(value);
    }else if(name==="detail"){
        value[i].detail=e.target.value;
        setModuleState(value);
    }
  };

  const onModuleSubmit = () => {
    if(moduleValidation()){
      return
    }
    dispatch(addSwayamCourseModule(moduleState))
  };


  const onModuleEdit=()=>{
    if(moduleValidation()){
      return
    }

    const data=moduleState[selectKey]
    const editData={
      name: data.name,
      detail: data.detail,
      duration: moment(data.duration).format("HH:mm:s"),
      videoUrl: data.videoUrl,
      sequence: data.sequence,
      key: data.key,
      moduleId: data.moduleId,
      isActive:true,
      isDeleted:false
  }
    dispatch(editSwayamCourseModule(editData))
  }

  const onRemoveData = () => {
    if (moduleState.length > 1) {
      let val = [...moduleState];
      val.splice(selectKey, 1);
      setModuleState(val);
    }
  };

  const { TabPane } = Tabs;


  const moduleCallback = key => {
    setSelectKey(key);
  };

  return (
    <>
      <PageHeader ghost title="Add Scheme" />
      <Main>
        <Cards headless>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Course Details" key="1">
              <Row justify="space-between">
                {/* <Col lg={11} className="d-flex f-d-cloumn">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item name="basic-select" label="Language">
                                            <Select size="large" className="sDash_fullwidth-select" placeholder="Select Language">
                                                <Option value="1">Einglish</Option>
                                                <Option value="2">Hindi</Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col> */}
                <Col lg={11}>
                  <label htmlFor="name">Name of the Course</label>
                  <Form.Item>
                    <Input
                      placeholder="Scheme Name"
                      value={state.name}
                      onChange={e => {
                        onChange(e);
                      }}
                      name="name"
                    />
                    {error.name && <span style={{ color: 'red' }}>{error.name}</span>}
                  </Form.Item>
                </Col>
                <Col lg={11}>
                  <Form name="sDash_select" layout="vertical">
                    <Form.Item name="basic-select" label="Course Category">
                      <Select
                        size="large"
                        className="sDash_fullwidth-select"
                        onChange={e => {
                          onChange(e, 'categoryId');
                        }}
                        value={state.categoryId}
                        name="categoryId"
                        placeholder="Select Category"
                      >
                        {categoryData &&
                          categoryData.data &&
                          categoryData.data.map((item, i) => (
                            <Option value={item.id} key={i}>
                              {item.name}
                            </Option>
                          ))}
                      </Select>
                      {error.categoryId && <span style={{ color: 'red' }}>{error.categoryId}</span>}
                    </Form.Item>
                  </Form>
                </Col>
                <Col lg={11} className="addpartnercourses">
                  <Form name="sDash_select" layout="vertical">
                    <Form.Item label="Course Duration">
                      <TimePicker
                        name="duration"
                        value={state.duration}
                        onChange={e => {
                          onChange(e, 'duration');
                        }}
                        placeholder="Course Duration"
                      />
                    </Form.Item>
                    {error.duration && <span style={{ color: 'red' }}>{error.duration}</span>}
                  </Form>
                </Col>
                {/* <Col lg={11}>
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item  label="Job Category">
                                            <Select size="large" className="sDash_fullwidth-select" onChange={(e)=>{onChange(e,"jobCategoryIds")}} value={state.jobCategoryIds} name="jobCategoryIds" placeholder="Select job category">
                                                {jobCategoryData && jobCategoryData.data && jobCategoryData.data.map((item,i)=>(
                                                    <Option value={item.id} key={i}>{item.name}</Option>
                                                ))}
                                            </Select>
                                            {error.jobCategoryIds && <span style={{ color: 'red' }}>{error.jobCategoryIds}</span>}
                                        </Form.Item>
                                    </Form>
                                </Col> */}
                <Col lg={11} className="multiselect">
                  <Form.Item label="Job Category">
                    <Select
                      size="large"
                      mode="multiple"
                      value={state.jobCategoryIds}
                      onChange={e => {
                        onChange(e, 'jobCategoryIds');
                      }}
                      className="sDash_fullwidth-select"
                      placeholder="Select Category"
                    >
                      {jobCategoryData &&
                        jobCategoryData.data &&
                        jobCategoryData.data.map((item, i) => (
                          <Option value={item.id} key={i}>
                            {item.name}
                          </Option>
                        ))}
                    </Select>
                    {error.jobCategoryIds && <span style={{ color: 'red' }}>{error.jobCategoryIds}</span>}
                  </Form.Item>
                </Col>
                <Col lg={11}>
                  <label htmlFor="name">Senquence</label>
                  <Form.Item>
                    <Input
                      type="number"
                      value={state.sequence}
                      onChange={e => {
                        onChange(e, 'sequence');
                      }}
                      name="sequence"
                      placeholder="Enter Senquence"
                    />
                  </Form.Item>
                  {error.sequence && <span style={{ color: 'red' }}>{error.sequence}</span>}
                </Col>
                <Col lg={11}>
                  <label htmlFor="name">Thumbnail</label>
                  <Form.Item>
                    <Input
                      type="string"
                      value={state.thumbnail}
                      onChange={e => {
                        onChange(e, 'thumbnail');
                      }}
                      name="thumbnail"
                      placeholder="Enter thumbnail"
                    />
                  </Form.Item>
                  {error.sequence && <span style={{ color: 'red' }}>{error.sequence}</span>}
                </Col>
                <Col lg={11}>
                  <Form name="sDash_select" layout="vertical">
                    <Form.Item label="Mode">
                      <Select
                        size="large"
                        name="mode"
                        value={state.mode}
                        onChange={e => {
                          onChange(e, 'mode');
                        }}
                        className="sDash_fullwidth-select"
                        placeholder="Select mode"
                      >
                        <Option value="ONLINE"> Online </Option>
                        <Option value="OFFLINE"> Offline </Option>
                        <Option value="BOTH"> Both </Option>
                      </Select>
                    </Form.Item>
                    {error.mode && <span style={{ color: 'red' }}>{error.mode}</span>}
                  </Form>
                </Col>
                <Col lg={11} className="d-flex f-d-cloumn">
                  <label htmlFor="name" className="mb-5">
                    Certification
                  </label>
                  <Radio.Group
                    onChange={e => {
                      onChange(e, 'certification');
                    }}
                    name="certification"
                    value={state.certification}
                  >
                    <Space direction="vertical">
                      <Row>
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Row>
                    </Space>
                  </Radio.Group>
                  {error.certification && <span style={{ color: 'red' }}>{error.certification}</span>}
                </Col>
              </Row>
              <label htmlFor="coursedetails">Course Details</label>
              <div className="group">
                <RichTextEditor
                  placeholder="Type your message..."
                  value={state.detail}
                  onChange={e => onChangesEditorDetail(e, 'detail')}
                />
                {error.detail && <span style={{ color: 'red' }}>{error.detail}</span>}
              </div>
              <div className="sDash_form-action mt-20">
                {id ? (
                  <Button className="btn-signin ml-10" onClick={() => onEdit()} type="primary" size="medium">
                    Edit
                  </Button>
                ) : (
                  <Button className="btn-signin ml-10" onClick={() => onSubmit()} type="primary" size="medium">
                    Submit
                  </Button>
                )}
                <Button
                  className="btn-signin"
                  type="light"
                  size="medium"
                  onClick={() => history.push('/admin/courses')}
                >
                  Cancel
                </Button>
              </div>
            </TabPane>
            <TabPane tab="Modules" disabled={swyamModuleId} key="2">
              <Tabs tabPosition={'left'} onChange={moduleCallback}>
                {moduleState.length ? (
                  moduleState.map((item, i) => (
                    <TabPane tab={`Module ${i + 1}`} key={`${i}`}>
                      <Row justify="space-between">
                        <Col lg={11}>
                          <label htmlFor="name">Name of the Module</label>
                          <Form.Item>
                            <Input
                              name="name"
                              value={item.name}
                              onChange={e => moduleChange(e, i, 'name')}
                              placeholder="Name of the Module"
                            />
                            {moduleError && moduleError[`name${i + 1}`] && <label style={{ color: "red" }}>{moduleError[`name${i + 1}`]}</label>}
                          </Form.Item>
                        </Col>
                        <Col lg={11}>
                          <label htmlFor="videourl">Video URL</label>
                          <Form.Item>
                            <Input
                              placeholder="Video URL"
                              name="videoUrl"
                              onChange={e => moduleChange(e, i, 'videoUrl')}
                              value={item.videoUrl}
                            />
                            {moduleError && moduleError[`videoUrl${i + 1}`] && <label style={{ color: "red" }}>{moduleError[`videoUrl${i + 1}`]}</label>}
                          </Form.Item>
                        </Col>
                        <Col lg={11} className="addpartnercourses">
                          <label htmlFor="moduleduration">Module Duration</label>
                          <Form.Item>
                            <TimePicker
                              name="duration"
                              value={item.duration}
                              onChange={e => moduleChange(e, i, 'duration')}
                              initialValue={moment('00:00:00', 'HH:mm:ss')}
                            />
                            {moduleError && moduleError[`duration${i + 1}`] && <label style={{ color: "red" }}>{moduleError[`duration${i + 1}`]}</label>}
                          </Form.Item>
                        </Col>
                        <Col lg={11}>
                          <label htmlFor="sequence">Sequence</label>
                          <Form.Item>
                            <Input
                              placeholder="Sequence"
                              name="sequence"
                              onChange={e => moduleChange(e, i, 'sequence')}
                              value={item.sequence}
                              type="number"
                            />
                            {moduleError && moduleError[`sequence${i + 1}`] && <label style={{ color: "red" }}>{moduleError[`sequence${i + 1}`]}</label>}
                          </Form.Item>
                        </Col>
                        <Col lg={24}>
                          <label htmlFor="detail">Module Detail</label>
                          <Form.Item>
                            <TextArea name="detail" onChange={e => moduleChange(e, i, 'detail')} value={item.detail} />
                            {moduleError && moduleError[`detail${i + 1}`] && <label style={{ color: "red" }}>{moduleError[`detail${i + 1}`]}</label>}
                          </Form.Item>
                        </Col>
                      </Row>
                    </TabPane>
                  ))
                ) : (
                  <></>
                )}

                {/* <TabPane tab="Module 2" key="2">
                                    <Row justify="space-between">
                                        <Col lg={11}>
                                            <label htmlFor="name">Name of the Module</label>
                                            <Form.Item name="name">
                                                <Input placeholder="Name of the Module" />
                                            </Form.Item>
                                        </Col>
                                        <Col lg={11}>
                                            <label htmlFor="videourl">Video URL</label>
                                            <Form.Item name="navideourlme">
                                                <Input placeholder="Video URL" />
                                            </Form.Item>
                                        </Col>
                                        <Col lg={11} className="addpartnercourses">
                                            <label htmlFor="moduleduration">Module Duration</label>
                                            <Form.Item name="moduleduration" initialValue={moment('00:00:00', 'HH:mm:ss')}>
                                                <TimePicker />
                                            </Form.Item>
                                        </Col>
                                        <Col lg={11}>
                                            <label htmlFor="sequence">Sequence</label>
                                            <Form.Item name="sequence">
                                                <Input placeholder="Sequence" type="number" />
                                            </Form.Item>
                                        </Col>
                                        <Col lg={24}>
                                            <label htmlFor="detail">Module Detail</label>
                                            <Form.Item name="detail">
                                                <TextArea />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tab="Module 3" key="3">
                                    <Row justify="space-between">
                                        <Col lg={11}>
                                            <label htmlFor="name">Name of the Module</label>
                                            <Form.Item name="name">
                                                <Input placeholder="Name of the Module" />
                                            </Form.Item>
                                        </Col>
                                        <Col lg={11}>
                                            <label htmlFor="videourl">Video URL</label>
                                            <Form.Item name="navideourlme">
                                                <Input placeholder="Video URL" />
                                            </Form.Item>
                                        </Col>
                                        <Col lg={11} className="addpartnercourses">
                                            <label htmlFor="moduleduration">Module Duration</label>
                                            <Form.Item name="moduleduration" initialValue={moment('00:00:00', 'HH:mm:ss')}>
                                                <TimePicker />
                                            </Form.Item>
                                        </Col>
                                        <Col lg={11}>
                                            <label htmlFor="sequence">Sequence</label>
                                            <Form.Item name="sequence">
                                                <Input placeholder="Sequence" type="number" />
                                            </Form.Item>
                                        </Col>
                                        <Col lg={24}>
                                            <label htmlFor="detail">Module Detail</label>
                                            <Form.Item name="detail">
                                                <TextArea />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </TabPane> */}
              </Tabs>
              <div className="sDash_form-action mt-20">
               {!id &&  <Button className="btn-signin ml-10" type="primary" size="medium" onClick={() => addData()}>
                  Add
                </Button>}
                
              </div>
              <div className="sDash_form-action mt-20">
                {id?<Button className="btn-signin ml-10" onClick={() => onModuleEdit()} type="primary" size="medium">
                  Edit
                </Button>:<Button className="btn-signin ml-10" onClick={() => onModuleSubmit()} type="primary" size="medium">
                  Submit
                </Button>}
                <Button className="btn-signin ml-10" type="danger" size="medium" onClick={() => onRemoveData()}>
                  Delete
                </Button>
                <Button className="btn-signin ml-10" type="light" size="medium" onClick={()=>history.push('/admin/courses')} >
                  Cancel
                </Button>
                
              </div>
            </TabPane>

             {/* ************Dont'delete this****************** */}

            {/* <TabPane tab="Q&A" key="3">
              <PageHeader
                ghost
                title="Q&A Details"
                className="mb-25"
                buttons={[
                  <div key="1" className="page-header-actions">
                    <Button size="small" type="primary">
                      Import Questions
                    </Button>
                  </div>,
                ]}
              />
              <Row justify="space-between">
                <Col lg={24}>
                  <label htmlFor="Question">Question 1</label>
                  <Form.Item name="Question">
                    <TextArea />
                  </Form.Item>
                </Col>
                <Col lg={24}>
                  <Row justify="space-between" align="middle">
                    <Col lg={11}>
                      <label htmlFor="choice">Choice 1</label>
                      <Form.Item name="choice">
                        <Input placeholder="Choice" />
                      </Form.Item>
                    </Col>
                    <Col lg={11}>
                      <Row>
                        <Button className="btn-signin ml-10" type="primary" size="medium">
                          Add
                        </Button>
                        <Button className="btn-signin" type="light" size="medium">
                          Delete
                        </Button>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col lg={11}>
                  <Form name="answer" layout="vertical">
                    <Form.Item name="answer" label="Answer">
                      <Select size="large" className="sDash_fullwidth-select" placeholder="Select Answer">
                        <Option value="Choice1"> Choice 1 </Option>
                        <Option value="Choice2">Choice 2 </Option>
                        <Option value="Choice3">Choice 3 </Option>
                        <Option value="Choice4">Choice 4 </Option>
                      </Select>
                    </Form.Item>
                  </Form>
                </Col>
                <Col lg={11}>
                  <Form name="sequence" layout="vertical">
                    <Form.Item name="sequence" label="Sequence">
                      <Select size="large" className="sDash_fullwidth-select" placeholder="Select Sequence">
                        <Option value="1"> 1 </Option>
                        <Option value="2"> 2 </Option>
                        <Option value="3"> 3 </Option>
                        <Option value="4"> 4 </Option>
                      </Select>
                    </Form.Item>
                  </Form>
                </Col>
                <Col lg={11}>
                  <Row>
                    <Button className="btn-signin ml-10" type="primary" size="medium">
                      Add Question
                    </Button>
                    <Button className="btn-signin" type="light" size="medium">
                      Delete Question
                    </Button>
                  </Row>
                </Col>
                <Col lg={24} align="middle" className="mb-25 mt-25">
                  <Pagination defaultCurrent={1} total={10} />
                </Col>
              </Row>
              <div className="sDash_form-action mt-20">
                <Button className="btn-signin ml-10" type="primary" size="medium">
                  Update
                </Button>
                <Button className="btn-signin" type="light" size="medium">
                  Cancel
                </Button>
              </div>
            </TabPane> */}
          </Tabs>
        </Cards>
      </Main>
    </>
  );
};

export default AddCourses;
