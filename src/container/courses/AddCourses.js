import { Checkbox, Col, Form, Input, Radio, Row, Select, Space, Tabs } from 'antd';
import React, { useState } from 'react';
import RichTextEditor from 'react-rte';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';

const AddCourses = () => {


    const [typeOfJob, setTypeOfJob] = useState("");
    const [type, setType] = useState("Active")
    const onChange = e => {
        console.log('radio checked', e.target.value);
        setTypeOfJob(e.target.value)
    };

    const { Option } = Select;

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
                                    Add
                                </Button>
                                <Button className="btn-signin" type="light" size="medium">
                                    Cancel
                                </Button>
                            </div>
                        </TabPane>
                        <TabPane tab="Modules" key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Q&A" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </Cards>
            </Main>
        </>
    )
}

export default AddCourses