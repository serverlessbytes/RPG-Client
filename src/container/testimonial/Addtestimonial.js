import { Col, Form, Input, Row,} from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers'
import React from 'react';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import { useHistory} from 'react-router';

const Addtestimonial = () => {

    const history = useHistory();
    const { TextArea } = Input;


    return (
        <>
            <PageHeader
                title="Add Testimonial"
            />
            <Main >
                <Cards headless>
                    <Row justify="space-between">

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="name">Name</label>
                            <Form.Item>
                                <Input placeholder="Enter Name" value={""} name="name" />

                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="role">Role</label>
                            <Form.Item>
                                <Input placeholder="Enter Role" value={""} name="role" />

                            </Form.Item>
                        </Col>
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="videoUrl">VideoUrl</label>
                            <Form.Item>
                                <Input placeholder="VideoUrl" value={""} name="videoUrl" />
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="imageUrl">ImageUrl</label>
                            <Form.Item>
                                <Input placeholder="ImageUrl" name="imageUrl" />
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="message">Message</label>
                            <Form.Item>
                                <TextArea placeholder='Message' value={""} name="message" />
                            </Form.Item>
                        </Col>
                    </Row>

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

export default Addtestimonial