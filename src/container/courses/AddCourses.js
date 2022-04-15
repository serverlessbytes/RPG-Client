import { Checkbox, Col, Form, Input, Pagination, Radio, Row, Select, Space, Table, Tabs, TimePicker } from 'antd';
import React, { useEffect, useState } from 'react';
import RichTextEditor from 'react-rte';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import moment from 'moment';
import { addSwayamCourse, getCategoryData } from '../../redux/course/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { getJobcategory } from '../../redux/jobs/actionCreator';
import uuid from 'react-uuid'

const AddCourses = () => {

    const dispatch=useDispatch()

    const { Option } = Select;
    const { TextArea } = Input;

    const [state, setState] = useState({
        detail: RichTextEditor.createEmptyValue(),
        name:'',
        categoryId:'',
        duration:'',
        jobCategoryIds:[],
        certification:'',
        sequence:'',
        mode:'',
    });
    const [error, setError] = useState({});

    const categoryData = useSelector(state => state.category.categoryData);
    const jobCategoryData=useSelector(state=>state.job.jobCatogeryData)


    const onChange = (e,name) => {
        if(name==="categoryId"){
            setState({...state,[name]:e})
        }else if(name==="jobCategoryIds"){
            setState({...state,[name]:e})
        }else if(name==="duration"){
            setState({...state,[name]:e})
        }else if(name==="mode"){
            setState({...state,[name]:e})
        }else if(name==="sequence"){
            if (e.target.value > 0) {
                setState({ ...state, [e.target.name]: e.target.value });
              } else {
                setState({ ...state, [e.target.name]: 0 });
              }
        }else{
            setState({ ...state, [e.target.name]: e.target.value })
        }
    };

    useEffect(() => {
        dispatch(getCategoryData());
        dispatch(getJobcategory())
    }, [])
    

    const onChangesEditorDetail = (e,name) => {
      setState({ ...state, [name]: e })
    };

    const validation = () => {
        // console.log("(state.benifitLine).toString", (state.benifitLine).toString("markdown"))
        let error = {};
        let flage = false;
        if (state.name === '') {
          error.name = '*Course name is required';
          flage = true;
        }
        if (state.categoryId === '') {
          error.categoryId = '*Course category is required';
          flage = true;
        }
        if (state.detail.toString("markdown").length <= 2) {
          error.detail = '*Detail is required';
          flage = true;
        }
        if (state.duration === '') {
          error.duration = '*Course duration body is required';
          flage = true;
        }
        if (state.jobCategoryIds === '') {
          error.jobCategoryIds = '*Job Category is required';
          flage = true;
        }
        if (state.sequence === '') {
          error.sequence = '*Senquence is required';
          flage = true;
        }
        if (state.certification === '') {
          error.certification = '*Certification name is required';
          flage = true;
        }
        if (state.mode === '') {
            error.mode = '*Mode name is required';
            flage = true;
          }
        
        setError(error);
        return flage;
      };

    const onSubmit=()=>{
        if(validation()){
            return
        }
        let data={
            key: uuid(),
            detail:state.detail.toString("markdown"),
            name:state.name,
            categoryId:state.categoryId,
            duration:moment(state.duration).format('hh:mm:ss'),
            jobCategoryIds:state.jobCategoryIds,
            certification:state.certification,
            sequence:parseInt(state.sequence),
            mode:state.mode,
        }
        dispatch(addSwayamCourse(data))
    }

    const { TabPane } = Tabs;

    const callback = (key) => {
        //     console.log(key);
    }

    return (
        <>
            <PageHeader
                ghost
                title="Add Scheme"
            />
            <Main >
                <Cards headless>
                    <Tabs defaultActiveKey="1" onChange={callback}>
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
                                    <Form.Item >
                                        <Input placeholder="Scheme Name" value={state.name} onChange={(e)=>{onChange(e)}} name="name"/>
                                        {error.name && <span style={{ color: 'red' }}>{error.name}</span>}
                                    </Form.Item>
                                </Col>
                                <Col lg={11}>
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item name="basic-select" label="Course Category">
                                            <Select size="large" className="sDash_fullwidth-select" onChange={(e)=>{onChange(e,"categoryId")}} value={state.categoryId} name="categoryId" placeholder="Select Category">
                                                {categoryData && categoryData.data && categoryData.data.map((item,i)=>(
                                                    <Option value={item.id} key={i}>{item.name}</Option>
                                                ))}
                                            </Select>
                                            {error.categoryId && <span style={{ color: 'red' }}>{error.categoryId}</span>}
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col lg={11} className="addpartnercourses">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item  label="Course Duration">
                                        <TimePicker name="duration" value={state.duration} onChange={(e)=>{onChange(e,"duration")}}  placeholder="Course Duration" />
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
                                    <Form.Item  label="Job Category">
                                        <Select size="large" mode="multiple" value={state.jobCategoryIds} onChange={(e)=>{onChange(e,"jobCategoryIds")}} className="sDash_fullwidth-select" placeholder="Select Category">
                                                {jobCategoryData && jobCategoryData.data && jobCategoryData.data.map((item,i)=>(
                                                    <Option value={item.id} key={i}>{item.name}</Option>
                                                ))}
                                        </Select>
                                        {error.jobCategoryIds && <span style={{ color: 'red' }}>{error.jobCategoryIds}</span>}
                                    </Form.Item>
                                </Col>
                                <Col lg={11}>
                                    <label htmlFor="name">Senquence</label>
                                    <Form.Item >
                                        <Input type="number" value={state.sequence} onChange={(e)=>{onChange(e,"sequence")}} name="sequence" placeholder="Enter Senquence" />
                                    </Form.Item>
                                    {error.sequence && <span style={{ color: 'red' }}>{error.sequence}</span>}
                                </Col>
                                <Col lg={11}>
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item  label="Mode">
                                            <Select size="large" name="mode" value={state.mode} onChange={(e)=>{onChange(e,"mode")}} className="sDash_fullwidth-select" placeholder="Select mode">
                                                <Option value="ONLINE"> Online </Option>
                                                <Option value="OFFLINE"> Offline </Option>
                                                <Option value="BOTH"> Both </Option>
                                            </Select>
                                        </Form.Item>
                                        {error.mode && <span style={{ color: 'red' }}>{error.mode}</span>}
                                    </Form>
                                </Col>
                                <Col lg={11} className="d-flex f-d-cloumn">
                                    <label htmlFor="name" className='mb-5'>Certification</label>
                                    <Radio.Group onChange={(e)=>{onChange(e,"certification")}} name="certification" value={state.certification}>
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
                                <RichTextEditor placeholder="Type your message..." value={state.detail} onChange={(e)=>onChangesEditorDetail(e,"detail")} />
                                {error.detail && <span style={{ color: 'red' }}>{error.detail}</span>}
                            </div>
                            <div className="sDash_form-action mt-20">
                                <Button className="btn-signin ml-10" onClick={() => onSubmit()} type="primary" size="medium">
                                    Submit
                                </Button>
                                <Button className="btn-signin" type="light" size="medium">
                                    Cancel
                                </Button>
                            </div>
                        </TabPane>
                        <TabPane tab="Modules" key="2">
                            <Tabs tabPosition={"left"}>
                                <TabPane tab="Module 1" key="1">
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
                                <TabPane tab="Module 2" key="2">
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
                                </TabPane>
                            </Tabs>
                            <div className="sDash_form-action mt-20">
                                <Button className="btn-signin ml-10" type="primary" size="medium">
                                    Add
                                </Button>
                                <Button className="btn-signin" type="light" size="medium">
                                    Delete
                                </Button>
                            </div>
                            <div className="sDash_form-action mt-20">
                                <Button className="btn-signin ml-10" type="primary" size="medium">
                                    Up date
                                </Button>
                                <Button className="btn-signin" type="light" size="medium">
                                    Cancel
                                </Button>
                            </div>
                        </TabPane>
                        <TabPane tab="Q&A" key="3">
                            <PageHeader
                                ghost
                                title="Q&A Details"
                                className='mb-25'
                                buttons={[
                                    <div key="1" className="page-header-actions">
                                        <Button size="small" type="primary">
                                            Import Questions
                                        </Button>
                                    </div>
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
                                <Col lg={24} align="middle" className='mb-25 mt-25'>
                                    <Pagination defaultCurrent={1} total={10} />
                                </Col>
                            </Row>
                            <div className="sDash_form-action mt-20">
                                <Button className="btn-signin ml-10" type="primary" size="medium">
                                    Up date
                                </Button>
                                <Button className="btn-signin" type="light" size="medium">
                                    Cancel
                                </Button>
                            </div>
                        </TabPane>
                    </Tabs>
                </Cards>
            </Main>
        </>
    )
}

export default AddCourses