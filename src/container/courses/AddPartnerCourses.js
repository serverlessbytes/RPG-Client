import { Col, Form, Input, Radio, Row, Select, Space, TimePicker } from 'antd'
import React, { useState } from 'react'
import moment from 'moment';
import { Button } from '../../components/buttons/buttons'
import { Cards } from '../../components/cards/frame/cards-frame'
import { PageHeader } from '../../components/page-headers/page-headers'
import { Main } from '../styled'
import { useHistory, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const AddPartnerCourses = () => {

    const { Option } = Select;
    const [typeOfJob, setTypeOfJob] = useState("");
    const history = useHistory();
    const { path } = useRouteMatch();
    const onChange = e => {
        console.log('radio checked', e.target.value);
        setTypeOfJob(e.target.value)
    };
    const { TextArea } = Input;
    return (
        <>
            <PageHeader
                ghost
                title="Add Partner Courses"
            />
            <Main >
                <Cards headless>
                    <Row justify="space-between">
                        <Col lg={11}>
                            <label htmlFor="name">Name</label>
                            <Form.Item name="name">
                                <Input placeholder="Name" />
                            </Form.Item>
                        </Col>
                        <Col lg={11} className="addpartnercourses">
                            <label htmlFor="category mb-4">Time</label>
                            <Form.Item name="input-time" initialValue={moment('00:00:00', 'HH:mm:ss')}>
                                <TimePicker />
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="categoryId">CategoryId</label>
                            <Form.Item name="categoryId">
                                <Select size="large" placeholder="Select categoryId" className="sDash_fullwidth-select">
                                    <Option value="1"> COVID Schemes </Option>
                                    <Option value="2"> Other Schemes </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="organization">Organization</label>
                            <Form.Item name="organization">
                                <Input placeholder="organization" />
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="detail">Detail</label>
                            <Form.Item name="detail">
                                <TextArea />
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="certification">Certification Body</label>
                            <Form.Item name="certification">
                                <TextArea />
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="eligibility">Eligibility</label>
                            <Form.Item name="eligibility">
                                <Input placeholder="eligibility" />
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="component">Component</label>
                            <Form.Item name="component">
                                <Input placeholder="component" />
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="contactpersonname">Contact Person Name</label>
                            <Form.Item name="contactpersonname">
                                <Input placeholder="contactpersonname" />
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="contactpersonemail">Contact Person Email</label>
                            <Form.Item name="contactpersonemail">
                                <Input placeholder="contactpersonemail" />
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="contactpersonphone">Contact Person Phone</label>
                            <Form.Item name="contactpersonphone">
                                <Input placeholder="contactpersonphone" />
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="state">State</label>
                            <Form.Item name="state">
                                <Select size="large" placeholder="Select State" className="sDash_fullwidth-select">
                                    <Option value="1"> Andaman and Nicobar Islands </Option>
                                    <Option value="2"> Andra Pradesh </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="district">District</label>
                            <Form.Item name="district">
                                <Select size="large" placeholder="Select District" className="sDash_fullwidth-select">
                                    <Option value="1">surat</Option>
                                    <Option value="2">bhavnagar</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="pincode">pincode</label>
                            <Form.Item name="pincode">
                                <Input placeholder="pincode" />
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="location">location</label>
                            <Form.Item name="location">
                                <Input placeholder="location" />
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="mode">Mode</label>
                            <Form.Item name="mode">
                                <Select size="large" placeholder="Select Mode" className="sDash_fullwidth-select">
                                    <Option value="ONLINE">ONLINE</Option>
                                    <Option value="OFFLINE">OFFLINE</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col lg={11}>
                            <label htmlFor="location">location</label>
                            <Form.Item name="location">
                                <Input placeholder="location" type="number" />
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
                    <div className="sDash_form-action mt-20">
                        <Button className="btn-signin ml-10" type="primary" size="medium">
                            Add
                        </Button>
                        <Button className="btn-signin" type="light" size="medium" onClick={() => { history.push(`/admin/courses/partnercourses`) }}>
                            Cancel
                        </Button>
                    </div>
                </Cards>
            </Main>
        </>
    )
}

export default AddPartnerCourses