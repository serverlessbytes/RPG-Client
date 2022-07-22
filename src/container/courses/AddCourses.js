import { Col, Form, Input, Radio, Row, Select, Space, Tabs, TimePicker } from 'antd';
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
import actions from '../../redux/course/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Timepicker from '../../components/timePicker/Timepicker';

const AddCourses = () => {

  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');
  const langId = searchParams.get('langid');
  const history = useHistory();
  const { Option } = Select;
  const { TextArea } = Input;
  const dispatch = useDispatch();

  const { addSwayamPartnerCourseSuccess } = actions;

  const [error, setError] = useState({});
  const [swyamModuleId, setSwyamModuleId] = useState(true);
  const [selectKey, setSelectKey] = useState(1);
  const [moduleError, setModuleError] = useState([]);
  const [defaultSelect, setDefaultSelect] = useState('1');

  const categoryData = useSelector(state => state.category.categoryData);
  const jobCategoryData = useSelector(state => state.job.jobCatogeryData);
  const editOneSwayamCourseData = useSelector(state => state.category.editFilterData);
  const userData = useSelector(state => state.auth.getUserData);
  const getSwayamCourseData = useSelector(state => state.category.getSwayamCourseModuleData);
  const addSwayamCourseData = useSelector(state => state.category.addSwayamCourseData);
  const languageData = useSelector(state => state.language.getLanguageData);
  const courseModuleData = useSelector(state => state.category.editSwayamCourseModuleData);
  const addSwayamCourseModuleData = useSelector(state => state.category.addSwayamCourseModuleData); //

  const [state, setState] = useState({
    key: '',
    name: '',
    detail: RichTextEditor.createEmptyValue(),
    duration: '',
    categoryId: '',
    certification: '',
    jobCategoryIds: [],
    mode: '',
    application_form: "",
    recommended_and_forwarded: "",
    application_process: "",
    medical_superintendent: "",
    hospital_expenses_estimation_certificate: "",
    thumbnail: '',
  });

  const [langIds, setLangIds] = useState({
    hindi: '',
    marathi: ''
  });

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

  const [moduleState, setModuleState] = useState([
    {
      key: uuid(),
      name: '',
      detail: '',
      duration: '',
      videoUrl: '',
      course: '',
      language: AuthStorage.getStorageData(STORAGEKEY.language),
      createdByUser: '',
      modifiedByUser: '',
    },
  ]);

  useEffect(() => {
    return (() => { dispatch(addSwayamPartnerCourseSuccess(null)) }
    )
  }, [])

  useEffect(() => {
    if (getSwayamCourseData && getSwayamCourseData.data && id) {
      setModuleState(
        getSwayamCourseData.data.map(item => {
          return {
            name: item.name,
            detail: item.detail,
            duration: moment(item.duration, 'HH:mm:ss'),
            videoUrl: item.videoUrl,
            sequence: item.sequence,
            key: item.key,
            moduleId: item.id,
            isActive: true,
            isDeleted: false,
          };
        }),
      );
    }
  }, [getSwayamCourseData]);

  useEffect(() => {
    if (userData && userData.data && userData.data.id && !id) {
      (moduleState[0].createdByUser = userData.data.id), (moduleState[0].modifiedByUser = userData.data.id);
    }
  }, [userData]);

  useEffect(() => {
    if (addSwayamCourseData && 'data' in addSwayamCourseData) {
      moduleState.course = addSwayamCourseData.data.id;
    }
  }, [addSwayamCourseData]);

  useEffect(() => {
    if (editOneSwayamCourseData && editOneSwayamCourseData.data && editOneSwayamCourseData.data.data && id) {
      setState({
        ...state,
        detail: RichTextEditor.createValueFromString(editOneSwayamCourseData.data.data.detail, 'markdown'),
        name: editOneSwayamCourseData.data.data.name,
        categoryId: editOneSwayamCourseData.data.data.courseCategory?.id,
        // duration: moment(editOneSwayamCourseData.data.data.duration, 'HH:mm:ss'),
        duration: editOneSwayamCourseData.data.data.duration,
        jobCategoryIds: editOneSwayamCourseData?.data?.data.jobTypes.map(item => item.id),
        thumbnail: editOneSwayamCourseData.data.data.thumbnail,
        mode: editOneSwayamCourseData.data.data.mode,
        certification: editOneSwayamCourseData.data.data.certificate,
        application_form: editOneSwayamCourseData.data.data.application_form,
        recommended_and_forwarded: editOneSwayamCourseData.data.data.recommended_and_forwarded,
        application_process: editOneSwayamCourseData.data.data.application_process,
        medical_superintendent: editOneSwayamCourseData.data.data.medical_superintendent,
        hospital_expenses_estimation_certificate: editOneSwayamCourseData.data.data.hospital_expenses_estimation_certificate,
        key: editOneSwayamCourseData.data.data.key,
      });
    }
  }, [editOneSwayamCourseData]);

  useEffect(() => {
    if (id) {
      dispatch(getOneCoursefilter(id));
      setSwyamModuleId(false);
      dispatch(getSwayamCourseModule(id));
    }
  }, [id]);

  useEffect(() => {
    dispatch(getCategoryData());
    dispatch(getJobcategory());
    dispatch(getUser());
  }, []);

  const onChange = (e, name) => {
    if (name === 'categoryId') {
      setState({ ...state, [name]: e });
      setError({ ...error, categoryId: "" })
    } else if (name === 'jobCategoryIds') {
      setState({ ...state, [name]: e });
      setError({ ...error, jobCategoryIds: "" })
    } else if (name === 'duration') {
      setState({ ...state, [name]: e });
      setError({ ...error, duration: "" })
    } else if (name === 'mode') {
      setState({ ...state, [name]: e });
      setError({ ...error, mode: "" })
    } else if (name === 'sequence') {
      if (e.target.value > 0) {
        setState({ ...state, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: "" })
      } else {
        setState({ ...state, [e.target.name]: 0 });
        setError({ ...error, [e.target.name]: "" })
      }
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
      setError({ ...error, [e.target.name]: "" })
    }
  };

  const fileUpload = (e, name) => {
    let firsttemp = e.target.files[0]?.name?.split('.');

    if (firsttemp) {
      let fileexten = ['jpeg', 'jpg', 'png']
      if (fileexten.includes(firsttemp[firsttemp.length - 1])) {
        setState({ ...state, [name]: e.target.files[0] })
        setError({ ...error, thumbnail: "" });
      }
      else {
        setError({ ...error, thumbnail: 'Select valid document file' })
        setState({ ...state, thumbnail: '' })
      }
    }
    else {
      setError({ ...error, thumbnail: 'Select document file' })
    }
  }

  const onChangesEditorDetail = (e, name) => {
    setState({ ...state, [name]: e });
    setError({ ...error, [name]: "" })

  };

  const validation = () => {

    let error = {};
    let flage = false;
    if (!state.name) {
      error.name = 'Course name is required';
      flage = true;
    }
    if (!state.categoryId) {
      error.categoryId = 'Course category is required';
      flage = true;
    }
    if (state.detail.toString('markdown').length <= 2) {
      error.detail = 'Course detail is required';
      flage = true;
    }
    if (!state.duration) {
      error.duration = 'Course duration is required';
      flage = true;
    }
    if (!state.jobCategoryIds.length) {
      error.jobCategoryIds = 'Job category is required';
      flage = true;
    }
    if (state.certification === "") {
      error.certification = 'Certification is required';
      flage = true;
    }
    if (!state.mode) {
      error.mode = 'Mode is required';
      flage = true;
    }
    if (!state.thumbnail) {
      error.thumbnail = 'Thumbnail is required';
      flage = true;
    }
    if (!state.application_form) {
      error.application_form = 'Application form is required';
      flage = true;
    }
    if (!state.recommended_and_forwarded) {
      error.recommended_and_forwarded = 'Recommended and forwarded is required';
      flage = true;
    }
    if (!state.application_process) {
      error.application_process = 'Application process is required';
      flage = true;
    }
    if (!state.medical_superintendent) {
      error.medical_superintendent = 'Medical superintendent is required';
      flage = true;
    }
    if (!state.hospital_expenses_estimation_certificate) {
      error.hospital_expenses_estimation_certificate = 'Hospital expenses estimate certificate is required';
      flage = true;
    }
    setError(error);
    return flage;
  };

  const moduleValidation = () => {
    let flage = false;
    const error = {};
    if (moduleState.length) {
      moduleState.map((item, i) => {
        if (item.name === '') {
          error[`name${i + 1}`] = 'Module name required';
          flage = true;
        }
        if (item.videoUrl === '') {
          error[`videoUrl${i + 1}`] = 'Video url required';
          flage = true;
        }
        if (item.duration === '') {
          error[`duration${i + 1}`] = 'Module duration required';
          flage = true;
        }
        if (item.detail === '') {
          error[`detail${i + 1}`] = 'Module detail required';
          flage = true;
        }
      });
    }
    setModuleError(error);
    return flage;
  };

  const onSubmit = () => {
    if (validation()) {
      return;
    }
    let formData = new FormData();
    formData.append('name', state.name);
    formData.append('detail', state.detail.toString('markdown'));
    // formData.append('duration', moment(state.duration).format('HH:mm:ss'));
    formData.append('duration', state.duration);
    formData.append('categoryId', state.categoryId);
    formData.append('certification', state.certification);
    formData.append('jobCategoryIds', JSON.stringify(state.jobCategoryIds));
    formData.append('mode', state.mode);
    formData.append('application_form', state.application_form);
    formData.append('recommended_and_forwarded', state.recommended_and_forwarded);
    formData.append('application_process', state.application_process);
    formData.append('medical_superintendent', state.medical_superintendent);
    formData.append('hospital_expenses_estimation_certificate', state.hospital_expenses_estimation_certificate);
    formData.append('thumbnail', state.thumbnail);
    if (langId) {
      formData.append('key', state.key);
      dispatch(addSwayamCourse(langId, formData));
    } else {
      formData.append('key', editOneSwayamCourseData?.data?.data.key ? editOneSwayamCourseData?.data?.data.key : uuid(),);
      dispatch(addSwayamCourse(langId, formData));
    }
  };
  useEffect(() => {
    if (addSwayamCourseData?.status === 200) {
      setDefaultSelect('2')
      toast.success("SwayamCoures added")
    }
  }, [addSwayamCourseData])

  const onEdit = () => {
    if (validation()) {
      return;
    }
    let formData = new FormData();
    formData.append('key', state.key);
    formData.append('courseId', id);
    formData.append('detail', state.detail.toString('markdown'));
    formData.append('name', state.name);
    formData.append('categoryId', state.categoryId);
    formData.append('duration', moment(state.duration).format('HH:mm:ss'));
    formData.append('jobCategoryIds', JSON.stringify(state.jobCategoryIds));
    formData.append('certification', state.certification);
    formData.append('application_form', state.application_form);
    formData.append('recommended_and_forwarded', state.recommended_and_forwarded);
    formData.append('application_process', state.application_process);
    formData.append('medical_superintendent', state.medical_superintendent);
    formData.append('hospital_expenses_estimation_certificate', state.hospital_expenses_estimation_certificate);
    formData.append('thumbnail', state.thumbnail);
    formData.append('mode', state.mode);
    formData.append('isActive', true);
    formData.append('isDeleted', false);
    dispatch(editSwayamCourse(formData, langIds.hindi, langIds.marathi));
    handalCancle()
  };

  const addData = () => {
    let val = [...moduleState];
    val.push({
      key: uuid(),
      name: '',
      detail: '',
      duration: '',
      videoUrl: '',
      moduleId: "",
      course: (addSwayamCourseData && addSwayamCourseData.data && addSwayamCourseData.data.id) || id,
      language: AuthStorage.getStorageData(STORAGEKEY.language),
      createdByUser: userData && userData.data && userData.data.id,
      modifiedByUser: userData && userData.data && userData.data.id,
    });
    setModuleState(val);
    setSelectKey(val.length);
  };

  const moduleChange = (e, i, name) => {
    setModuleError({ ...moduleError, [`${name}${i + 1}`]: "" })
    let value = [...moduleState];
    if (name === 'name') {
      value[i].name = e.target.value;
      setModuleState(value);
    } else if (name === 'videoUrl') {
      value[i].videoUrl = e.target.value;
      setModuleState(value);
    } else if (name === 'duration') {
      value[i].duration = e;
      setModuleState(value);
    }
    else if (name === 'detail') {
      value[i].detail = e.target.value;
      setModuleState(value);
    }
  };

  const onModuleSubmit = () => {
    if (moduleValidation()) {
      return;
    }
    const newData = moduleState.filter(item => !item.moduleId).map((item) => {
      return {
        key: item.key,
        name: item.name,
        detail: item.detail,
        duration: moment(item.duration).format('HH:mm:ss'),
        videoUrl: item.videoUrl,
        course: id ? id : addSwayamCourseData.data.id,
        language: item.language,
        createdByUser: item.createdByUser,
        modifiedByUser: item.modifiedByUser,
      };
    });
    dispatch(addSwayamCourseModule(newData));
    history.push('/admin/courses')
  };
  const onModuleEdit = () => {
    if (moduleValidation()) {
      return;
    }
    const data = moduleState[selectKey - 1];
    const editData = {
      key: data.key,
      name: data.name,
      detail: data.detail,
      duration: moment(data.duration).format('HH:mm:s'),
      videoUrl: data.videoUrl,
      moduleId: data.moduleId,
      isActive: true,
      isDeleted: false,
    };
    dispatch(editSwayamCourseModule(editData));
  };

  const onRemoveData = (itemData) => {
    if (id) {
      const data = moduleState[selectKey - 1];
      const deleteData = {
        key: data.key,
        name: data.name,
        detail: data.detail,
        duration: moment(data.duration).format('HH:mm:s'),
        videoUrl: data.videoUrl,
        moduleId: data.moduleId,
        isActive: false,
        isDeleted: true,
      };
      dispatch(editSwayamCourseModule(deleteData));
    }
    let deleteModulData = moduleState.filter((item) => item.key !== itemData.key)
    setModuleState(deleteModulData);
    setSelectKey(selectKey == 1 ? 1 : (selectKey - 1));
  };

  const handalCancle = () => {
    history.push('/admin/courses')
  }

  const { TabPane } = Tabs;

  let moduleCallback = (key) => {
    setSelectKey(key);
  };

  const callback = key => {
    setDefaultSelect(key);
  };

  useEffect(() => {
    if (courseModuleData?.status === 200) {
      { courseModuleData?.data?.isDeleted ? toast.success("Course module deleted") : toast.success("Course module updated") }
    }
  }, [courseModuleData])

  useEffect(() => {
    if (addSwayamCourseModuleData && addSwayamCourseModuleData.status === 200) {
      toast.success("Swayam course module added");
      dispatch(addSwayamCourseModuleSuccess(null));
    }
  }, [addSwayamCourseModuleData]);
  return (
    <>
      <PageHeader ghost
        title={id ? "Edit swayam course" : "Add swayam course"} />
      <Main>
        <Cards headless>
          <Tabs activeKey={defaultSelect} onChange={callback}>
            <TabPane tab="Course details" key="1">
              <Row justify="space-between">
                <Col lg={11} md={11} sm={24} xs={24}>
                  <label htmlFor="name">Name of the course</label>
                  <Form.Item>
                    <Input
                      placeholder="Course name"
                      value={state.name}
                      onChange={e => {
                        onChange(e);
                      }}
                      name="name"
                    />
                    {error.name && <span style={{ color: 'red' }}>{error.name}</span>}
                  </Form.Item>
                </Col>

                <Col lg={11} md={11} sm={24} xs={24}>
                  <Form name="sDash_select" layout="vertical">
                    <Form.Item name="basic-select" label="Course category">
                      <Select
                        size="large"
                        className={state.categoryId ? 'sDash_fullwidth-select' : 'select-option-typ-placeholder'}
                        onChange={e => {
                          onChange(e, 'categoryId');
                        }}
                        value={state.categoryId}
                        name="categoryId"
                        placeholder="Select course category"
                      >
                        <Option value="">Select course category</Option>
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

                <Col lg={11} md={11} sm={24} xs={24} className="addpartnercourses">
                  <Form name="sDash_select" layout="vertical">
                    <Form.Item label="Course duration">
                      {/* <TimePicker
                        name="duration"
                        value={state.duration}
                        onChange={e => {
                          onChange(e, 'duration');
                        }}
                        placeholder="Course duration"
                      />
                      {error.duration && <span style={{ color: 'red' }}>{error.duration}</span>} */}
                      <Timepicker name="duration" value={state.duration} getdata={(e) => onChange(e, "duration")}
                      />
                    </Form.Item>
                  </Form>
                </Col>

                <Col lg={11} md={11} sm={24} xs={24} className="multiselect">
                  <label htmlFor="name">Job category</label>
                  <Form.Item>
                    <Select
                      size="large"
                      mode="multiple"
                      value={state.jobCategoryIds}
                      onChange={e => {
                        onChange(e, 'jobCategoryIds');
                      }}
                      className="sDash_fullwidth-select"
                      placeholder="Job category"
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

                <Col lg={11} md={11} sm={24} xs={24}>
                  <label htmlFor="name">Thumbnail</label>
                  <Form.Item>
                    <Input
                      type="file"
                      onChange={e => {
                        fileUpload(e, 'thumbnail');
                      }}
                      name="thumbnail"
                      placeholder="Thumbnail"
                    />
                    {error.thumbnail && <span style={{ color: 'red' }}>{error.thumbnail}</span>}
                  </Form.Item>
                </Col>

                <Col lg={11} md={11} sm={24} xs={24}>
                  <Form name="sDash_select" layout="vertical">
                    <Form.Item label="Mode">
                      <Select
                        size="large"
                        name="mode"
                        value={state.mode}
                        onChange={e => {
                          onChange(e, 'mode');
                        }}
                        className={state.mode ? 'sDash_fullwidth-select' : 'select-option-typ-placeholder'}
                        placeholder="Select mode"
                      > <Option value="">Select mode</Option>
                        <Option value="ONLINE"> Online </Option>
                        <Option value="OFFLINE"> Offline </Option>
                        <Option value="BOTH"> Both </Option>
                      </Select>
                      {error.mode && <span style={{ color: 'red' }}>{error.mode}</span>}
                    </Form.Item>
                  </Form>
                </Col>

                <Col lg={11} md={11} sm={24} xs={24} className="d-flex f-d-cloumn mb-20">
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

                <Col lg={11} md={11} sm={24} xs={24} className="d-flex f-d-cloumn mb-20">
                  <label htmlFor="name" className="mb-5">
                    Application form
                  </label>
                  <Form.Item name="application_form">
                    <TextArea placeholder='Application form' value={state.application_form} name="application_form" onChange={e => onChange(e, "application_form")} />
                    {error.application_form && <span style={{ color: 'red' }}>{error.application_form}</span>}
                  </Form.Item>
                </Col>

                <Col lg={11} md={11} sm={24} xs={24} className="d-flex f-d-cloumn mb-20">
                  <label htmlFor="name" className="mb-5">
                    Recommended and forwarded
                  </label>
                  <Form.Item name="recommended_and_forwarded">
                    <TextArea placeholder='Recommended and forwarded' value={state.recommended_and_forwarded} name="recommended_and_forwarded" onChange={e => onChange(e, "recommended_and_forwarded")} />
                    {error.recommended_and_forwarded && <span style={{ color: 'red' }}>{error.recommended_and_forwarded}</span>}
                  </Form.Item>
                </Col>

                <Col lg={11} md={11} sm={24} xs={24} className="d-flex f-d-cloumn mb-20">
                  <label htmlFor="name" className="mb-5">
                    Application process
                  </label>
                  <Form.Item name="application_process">
                    <TextArea placeholder='Application process' value={state.application_process} name="application_process" onChange={e => onChange(e, "application_process")} />
                    {error.application_process && <span style={{ color: 'red' }}>{error.application_process}</span>}
                  </Form.Item>
                </Col>

                <Col lg={11} md={11} sm={24} xs={24} className="d-flex f-d-cloumn mb-20">
                  <label htmlFor="name" className="mb-5">
                    Medical superintendent
                  </label>
                  <Form.Item name="medical_superintendent">
                    <TextArea placeholder='Medical superintendent' value={state.medical_superintendent} name="medical_superintendent" onChange={e => onChange(e, "medical_superintendent")} />
                    {error.medical_superintendent && <span style={{ color: 'red' }}>{error.medical_superintendent}</span>}
                  </Form.Item>
                </Col>

                <Col lg={11} md={11} sm={24} xs={24} className="d-flex f-d-cloumn mb-20">
                  <label htmlFor="hospital_expenses_estimation_certificate" className="mb-5">
                    Hospital expenses estimate certificate
                  </label>
                  <Form.Item name="hospital_expenses_estimation_certificate">
                    <TextArea placeholder='Hospital expenses estimate certificate' value={state.hospital_expenses_estimation_certificate} name="hospital_expenses_estimation_certificate" onChange={e => onChange(e, "hospital_expenses_estimation_certificate")} />
                    {error.hospital_expenses_estimation_certificate && <span style={{ color: 'red' }}>{error.hospital_expenses_estimation_certificate}</span>}
                  </Form.Item>
                </Col>
              </Row>

              <label htmlFor="coursedetails">Course details</label>
              <div className="group">
                <RichTextEditor
                  placeholder="Type your message..."
                  value={state.detail}
                  onChange={e => onChangesEditorDetail(e, 'detail')} />
              </div>
              {error.detail && <span style={{ color: 'red' }}>{error.detail}</span>}



              <div className="sDash_form-action mt-20">
                {id && !langId ? (
                  <Button className="btn-signin ml-10" onClick={() => onEdit()} type="primary" size="medium">
                    Edit
                  </Button>
                ) : (
                  <Button className="btn-signin ml-10" onClick={() => onSubmit()} type="primary" size="medium">
                    Add
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
              <Tabs tabPosition={'left'} activeKey={selectKey.toString()} onChange={moduleCallback}>
                {moduleState.length ? (
                  moduleState.map((item, i) => (
                    <TabPane tab={`Module ${i + 1}`} key={`${i + 1}`}>
                      <Row justify="space-between">
                        <Col lg={11} md={11} sm={24} xs={24}>
                          <label htmlFor="name">Name of module</label>
                          <Form.Item>
                            <Input
                              name="name"
                              value={item.name}
                              onChange={e => moduleChange(e, i, 'name')}
                              placeholder="Name of module"
                            />
                            {moduleError && moduleError[`name${i + 1}`] && (
                              <label style={{ color: 'red' }}>{moduleError[`name${i + 1}`]}</label>
                            )}
                          </Form.Item>
                        </Col>
                        <Col lg={11} md={11} sm={24} xs={24}>
                          <label htmlFor="videourl">Video url</label>
                          <Form.Item>
                            <Input
                              placeholder="Video url"
                              name="videoUrl"
                              onChange={e => moduleChange(e, i, 'videoUrl')}
                              value={item.videoUrl}
                            />
                            {moduleError && moduleError[`videoUrl${i + 1}`] && (
                              <label style={{ color: 'red' }}>{moduleError[`videoUrl${i + 1}`]}</label>
                            )}
                          </Form.Item>
                        </Col>
                        <Col lg={11} md={11} sm={24} xs={24} className="addpartnercourses">
                          <label htmlFor="moduleduration">Module duration</label>
                          <Form.Item>
                            <TimePicker
                              name="duration"
                              value={item.duration}
                              onChange={e => moduleChange(e, i, 'duration')}
                              initialValue={moment('00:00:00', 'HH:mm:ss')}
                            />
                            {moduleError && moduleError[`duration${i + 1}`] && (
                              <label style={{ color: 'red' }}>{moduleError[`duration${i + 1}`]}</label>
                            )}
                          </Form.Item>
                        </Col>
                        <Col lg={24}>
                          <label htmlFor="detail" className='module_detail'>Module detail</label>
                          <Form.Item>
                            <TextArea name="detail" onChange={e => moduleChange(e, i, 'detail')} value={item.detail} />
                            {moduleError && moduleError[`detail${i + 1}`] && (
                              <label style={{ color: 'red' }}>{moduleError[`detail${i + 1}`]}</label>
                            )}
                          </Form.Item>
                        </Col>
                        <Col lg={24}>
                          {item.moduleId ? (
                            <Button
                              className="btn-signin ml-10"
                              onClick={() => onModuleEdit()}
                              type="primary"
                              size="medium"
                            >
                              Edit
                            </Button>
                          ) : ""}
                          <Button
                            className="btn-signin ml-10"
                            type="danger"
                            size="medium"
                            onClick={() => onRemoveData(item, i)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </TabPane>
                  ))
                ) : (
                  <></>
                )}

              </Tabs>
              <div className="sDash_form-action mt-20">
                {
                  <Button className="btn-signin ml-10" type="primary" size="medium" onClick={() => addData()}>
                    Add
                  </Button>
                }

                <Button className="btn-signin ml-10" onClick={() => onModuleSubmit()} type="primary" size="medium">
                  Submit
                </Button>
                <Button
                  className="btn-signin ml-10"
                  type="light"
                  size="medium"
                  onClick={() => handalCancle()}
                >
                  Cancel
                </Button>
              </div>
            </TabPane>
          </Tabs>
        </Cards>
      </Main>
    </>
  );
};

export default AddCourses;
