import { Checkbox, Col, Form, Input, Radio, Row, Select, Space } from 'antd';
import React, { useState } from 'react';
import RichTextEditor from 'react-rte';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';

const AddSchemes = () => {


    const [typeOfJob, setTypeOfJob] = useState("");
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

    return (
        <>
            <PageHeader
                ghost
                title="Add Scheme"
                buttons={[
                    // <div key="1" className="page-header-actions">
                    //     <Button size="small" type="link">
                    //         Export Schemes
                    //     </Button>
                    //     <Button size="small" type="light">
                    //         Import Schemes
                    //     </Button>
                    //     <Button size="small" type="success">
                    //         Create Scheme
                    //     </Button>
                    //     <Button size="small" type="warning">
                    //         Deactivate All Schemes
                    //     </Button>
                    // </div>
                ]}
            />

            <Main >
                <Cards headless>
                    <Row justify="space-between">
                        <Col lg={11} className="d-flex f-d-cloumn">
                            <label htmlFor="name" className='mb-5'>Language</label>
                            <Radio.Group onChange={onChange} value={typeOfJob}>
                                <Space direction="vertical">
                                    <Row>
                                        <Radio value={"English"}>English</Radio>
                                        <Radio value={"Hindi"}>Hindi</Radio>
                                    </Row>
                                </Space>
                            </Radio.Group>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="name">Scheme Name</label>
                            <Form.Item name="name">
                                <Input placeholder="Scheme Name" />
                            </Form.Item>
                        </Col>
                    {/* </Row>
                    <Row justify="space-between"> */}
                        <Col lg={11}>
                            <label htmlFor="category mb-4">Scheme Category</label>
                            <Form.Item name="category" initialValue=" Select a scheme category ">
                                <Select size="large" className="sDash_fullwidth-select">
                                    <Option value="1"> COVID Schemes </Option>
                                    <Option value="2"> Other Schemes </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="Benefits">Type of Benefits</label>
                            <Form.Item name="Benefits" initialValue="Type of Benefits">
                                <Select size="large" className="sDash_fullwidth-select">
                                    <Option value="1"> COVID Schemes </Option>
                                    <Option value="2"> Other Schemes </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <label htmlFor="Benefit-1-Line">Benefit 1-Line</label>
                    <div className="group">
                        <RichTextEditor placeholder="Type your message..." value={state.benefit} onChange={onChangesEditorBenifit} />
                    </div>

                    <label htmlFor="TargetBeneficiary">Target Beneficiary</label>
                    <Form.Item name="TargetBeneficiary">
                        <Input.TextArea placeholder="" />
                    </Form.Item>

                    <label htmlFor="SchemeSummary">Scheme Summary</label>
                    <div className="group">
                        <RichTextEditor placeholder="Type your message..." value={state.schemeSummary} onChange={onChangesEditorSchemeSummary} />
                    </div>

                    <label htmlFor="HowtoApply">How to Apply</label>
                    <div className="group">
                        <RichTextEditor placeholder="Type your message..." value={state.howToApply} onChange={onChangesEditorHowToApply} />
                    </div>

                    <label htmlFor="Documentation">Documentation</label>
                    <div className="group">
                        <RichTextEditor placeholder="Type your message..." value={state.documentation} onChange={onChangesEditorDocumentation} />
                    </div>
                    <Row justify="space-between">
                        <Col lg={11} className="d-flex f-d-cloumn">
                            <label htmlFor="Location">Location</label>
                            <Form.Item name="Location" initialValue="Select a location">
                                <Select size="large" className="sDash_fullwidth-select">
                                    <Option value="1"> kerala </Option>
                                    <Option value="2">Ladakh</Option>
                                    <Option value="2">Madhya Pradesh</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="Website">Website</label>
                            <Form.Item name="Website">
                                <Input placeholder="" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="space-between">
                        <Col lg={11} className="d-flex f-d-cloumn">
                            <label htmlFor="Category">Category</label>
                            <Form.Item name="Category">
                                <Input placeholder="" />
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="GrievanceRedress">Grievance Redress</label>
                            <Form.Item name="GrievanceRedress">
                                <Input placeholder="" />
                            </Form.Item>
                        </Col> 
                        <Col lg={11} className="d-flex f-d-cloumn">
                            <label htmlFor="E-Link">E Link</label>
                            <Form.Item name="E-Link">
                                <Input placeholder="" />
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="SPOC">SPOC</label>
                            <Form.Item name="SPOC">
                                <Input placeholder="" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <label htmlFor="visible" className='ml-10'>Visible to User</label>
                    <Checkbox name="visible" id='visible' onChange={onCheck}></Checkbox>
                    <div className="sDash_form-action mt-20">
                        <Button className="btn-signin ml-10" type="primary" size="medium">
                            Add
                        </Button>
                        <Button className="btn-signin" type="light" size="medium">
                            Cancel
                        </Button>
                    </div>
                </Cards>
            </Main>
        </>
    )
}

export default AddSchemes