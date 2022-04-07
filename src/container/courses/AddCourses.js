import { Checkbox, Col, Form, Input, Pagination, Radio, Row, Select, Space, Table, Tabs, TimePicker } from 'antd';
import React, { useState } from 'react';
import RichTextEditor from 'react-rte';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import moment from 'moment';

const AddCourses = () => {


    const [typeOfJob, setTypeOfJob] = useState("");
    const [type, setType] = useState("Active")
    const onChange = e => {
        console.log('radio checked', e.target.value);
        setTypeOfJob(e.target.value)
    };

    const { Option } = Select;
    const { TextArea } = Input;

    const [state, setState] = useState({
        benefit: RichTextEditor.createEmptyValue(),
        schemeSummary: RichTextEditor.createEmptyValue(),
        howToApply: RichTextEditor.createEmptyValue(),
        documentation: RichTextEditor.createEmptyValue(),
    });

    const onChangesEditorBenifit = (value) => {
        setState({ ...state, benefit: value });
    };
    const onChangesEditorSchemeSummary = (value) => {
        setState({ ...state, schemeSummary: value });
    };
    const onChangesEditorHowToApply = (value) => {
        setState({ ...state, howToApply: value });
    };
    const onChangesEditorDocumentation = (value) => {
        setState({ ...state, documentation: value });
    };

    function onCheck() { }
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
                                <Col lg={11} className="d-flex f-d-cloumn">
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item name="basic-select" label="Language">
                                            <Select size="large" className="sDash_fullwidth-select" placeholder="Select Language">
                                                <Option value="1">Einglish</Option>
                                                <Option value="2">Hindi</Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col lg={11}>
                                    <label htmlFor="name">Name of the Course</label>
                                    <Form.Item name="name">
                                        <Input placeholder="Scheme Name" />
                                    </Form.Item>
                                </Col>
                                <Col lg={11}>
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item name="basic-select" label="Course Category">
                                            <Select size="large" className="sDash_fullwidth-select" placeholder="Select Category">
                                                <Option value="1"> Healthcare </Option>
                                                <Option value="2"> Self-Development </Option>
                                                <Option value="3"> Driving </Option>
                                                <Option value="4"> Retail </Option>
                                            </Select>
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col lg={11}>
                                    <Form name="sDash_select" layout="vertical">
                                        <Form.Item name="basic-select" label="Course Duration">
                                            <Input placeholder="Course Duration" />
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col lg={11} className="multiselect">
                                    <Form.Item name="multi-select" initialValue={['1', '2']} label="Multiple Select">
                                        <Select size="large" mode="multiple" className="sDash_fullwidth-select" placeholder="Select Category">
                                            <Option value="1">All</Option>
                                            <Option value="2">Healthcare</Option>
                                            <Option value="3">Driving</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col lg={11} className="d-flex f-d-cloumn">
                                    <label htmlFor="name" className='mb-5'>Certification</label>
                                    <Radio.Group onChange={onChange} value={typeOfJob}>
                                        <Space direction="vertical">
                                            <Row>
                                                <Radio value={"English"}>Yes</Radio>
                                                <Radio value={"Hindi"}>No</Radio>
                                            </Row>
                                        </Space>
                                    </Radio.Group>
                                </Col>
                            </Row>
                            <label htmlFor="coursedetails">Course Details</label>
                            <div className="group">
                                <RichTextEditor placeholder="Type your message..." value={state.benefit} onChange={onChangesEditorBenifit} />
                            </div>
                            <div className="sDash_form-action mt-20">
                                <Button className="btn-signin ml-10" type="primary" size="medium">
                                    Update
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