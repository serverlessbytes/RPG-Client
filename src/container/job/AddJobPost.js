import { Button, Col, Input, Row, Form, Select, Radio, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { HorizontalFormStyleWrap } from '../forms/overview/Style';
import { PageHeader } from '../../components/page-headers/page-headers';

const AddJobPost = () => {

    const { Option } = Select;
    const [typeOfJob, setTypeOfJob] = useState("")

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setTypeOfJob(e.target.value)
    };

    useEffect(() => {
        console.log("typeOfJob", typeOfJob);
    }, [typeOfJob])

    return (
        <>
            <PageHeader
                title="Add Job Post"
                buttons={[
                    <div key="1" className="page-header-actions">
                        <Button size="small" onClick={() => { }} type="primary">
                            <FeatherIcon icon="plus" size={14} />
                            Add New
                        </Button>
                    </div>,
                ]}
            />
            <Main >
                <HorizontalFormStyleWrap>
                    <Cards headless>
                        <Form name="horizontal-form" layout="horizontal">
                            <Row justify="space-between">
                                <Col lg={11}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="name">Type of job post</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="name" initialValue=" Select a job post type ">
                                                <Select size="large" className="sDash_fullwidth-select">
                                                    <Option value="1"> Healthcare </Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={11}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={7} md={9} xs={24}>
                                            <label htmlFor="name">Monthly Salary Offered</label>
                                        </Col>
                                        <Col lg={7} md={15} xs={24}>
                                            <Form.Item name="min">
                                                <Input placeholder="Min" />
                                            </Form.Item>
                                        </Col>
                                        <Col lg={7} md={15} xs={24}>
                                            <Form.Item name="max">
                                                <Input placeholder="Max" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col lg={11}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="name">Job Role</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="Selectajobrole" initialValue="Select a job role">
                                                <Select size="large" className="sDash_fullwidth-select">
                                                    <Option value="1"> Healthcare </Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={11}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="name">Any other Benefits (in english)</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="AnyotherBenefitsE" initialValue="">
                                                <Input placeholder="" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col lg={11}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="name">Name of the Employer</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="EmployerName" initialValue="">
                                                <Input placeholder="Enter Employer Name" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={11}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="name">Any other Benefits (in hindi)</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="AnyotherBenefitsH" initialValue="">
                                                <Input placeholder="" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col lg={11}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="name">State</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="State" initialValue="Select State">
                                                <Select size="large" className="sDash_fullwidth-select">
                                                    <Option value="1">All India</Option>
                                                    <Option value="2">Andra Pradesh</Option>
                                                    <Option value="3">Assam</Option>
                                                    <Option value="4">Bihar</Option>
                                                    <Option value="5">Chandigarh</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={11}>
                                    <Row align="middle" justify="space-between">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="name">Type of Job</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Radio.Group onChange={onChange} value={typeOfJob}>
                                                <Space direction="vertical">
                                                    <Row>
                                                        <Radio value={"partTime"}>Part-time</Radio>
                                                        <Radio value={"fullTime"}>Full-time</Radio>
                                                    </Row>
                                                    <Row>
                                                        <Radio value={"contractual"}>Contractual</Radio>
                                                        <Radio value={"onRoll"}>On-roll</Radio>
                                                    </Row>
                                                </Space>
                                            </Radio.Group>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col lg={11}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="name">District</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="District" initialValue="Select District">
                                                <Select size="large" className="sDash_fullwidth-select">
                                                    <Option value="1"> Ahmednagar </Option>
                                                    <Option value="2"> Bhandara </Option>
                                                    <Option value="3"> Kolhapur </Option>
                                                    <Option value="4"> Nagpur </Option>
                                                    <Option value="5"> Nandurbar </Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col lg={11}>
                                    <Row align="middle">
                                        <Col lg={8} md={9} xs={24}>
                                            <label htmlFor="name">Town / Village</label>
                                        </Col>
                                        <Col lg={16} md={15} xs={24}>
                                            <Form.Item name="TownVillage" initialValue="">
                                                <Input placeholder="Enter Town / Village" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    </Cards>
                </HorizontalFormStyleWrap>
            </Main>
        </>
    )
}

export default AddJobPost
