import { Col, Form, Input, Row,} from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers'
import React, { useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import { useHistory} from 'react-router';
import {useRouteMatch } from 'react-router-dom';

const Addtestimonial = () => {

    const history = useHistory();
    const [error, setError] = useState({})
    const [data, setData] = useState({
        name : "",
        role : "",
        videoUrl : "",
        imageUrl : "",
        message :""
    })
    const { TextArea } = Input;

    const validation = () =>{
        let error = {}
        let flag = false

        if (data.name === ""){
            error.name = "Name is required";
            flag = true;
        }

        if (data.role === ""){
            error.role = "Role is required";
            flag = true;
        }

        if (data.videoUrl === ""){
            error.videoUrl = "Video URL is required";
            flag = true;
        }

        if (data.imageUrl === ""){
            error.imageUrl = "Image URL is required";
            flag = true;
        }

        if (data.message === ""){
            error.message = "Message is required";
            flag = true;
        }

        setError(error);
        return flag
    }

    const handleChange = (e) =>{
        setData({...data,[e.target.name]:e.target.value})
    }

    
    const onsubmit = () =>{
        if (validation()) {
            return;
        }
        
    }

    const handalCancel = () => {
        setData ({
            name : "",
            role : "",
            videoUrl : "",
            imageUrl : "",
            message :""
        })
        history.push('/admin/testimonial')
    }


    

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
                                <Input placeholder="Enter Name" value={data.name} onChange={(e) => handleChange(e)} name="name" />
                                {
                                    error.name && <span style={{ color: "red" }}>{error.name}</span>
                                }
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="role">Role</label>
                            <Form.Item>
                                <Input placeholder="Enter Role" value={data.role} onChange={(e) => handleChange(e)} name="role" />
                                {
                                    error.role && <span style={{ color: "red" }}>{error.role}</span>
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="videoUrl">VideoUrl</label>
                            <Form.Item>
                                <Input placeholder="VideoUrl" value={data.videoUrl} onChange={(e) => handleChange(e)} name="videoUrl" />
                                {
                                    error.videoUrl && <span style={{ color: "red" }}>{error.videoUrl}</span>
                                }
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="imageUrl">ImageUrl</label>
                            <Form.Item>
                                <Input placeholder="ImageUrl" value={data.imageUrl} onChange={(e) => handleChange(e)} name="imageUrl" />
                                {
                                    error.imageUrl && <span style={{ color: "red" }}>{error.imageUrl}</span>
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="message">Message</label>
                            <Form.Item>
                                <TextArea placeholder='Message' value={data.message} onChange={(e) => handleChange(e)} name="message" />
                                {
                                    error.message && <span style={{ color: "red" }}>{error.message}</span>
                                }
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="sDash_form-action mt-20">
                        <Button className="btn-signin ml-10" type="primary" onClick={onsubmit} size="medium">
                            Add
                        </Button>
                        <Button className="btn-signin" type="light" onClick={handalCancel} size="medium">
                            Cancel
                        </Button>
                    </div>
                </Cards>
            </Main>
        </>
    )
}

export default Addtestimonial