import { Col, Form, Input, Row, } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers'
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import { useHistory, useLocation } from 'react-router';
import { useRouteMatch } from 'react-router-dom';
import { addTestimonial, editTestimonial, getoneTestimonialData } from '../../redux/testimonial/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../redux/testimonial/actions';

const Addtestimonial = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id')

    const { getoneTestimonialDataSuccess } = actions;

    const dispatch = useDispatch();
    const history = useHistory();
    let location = useLocation();

    const [formErrors, setFormErrors] = useState();
    const [error, setError] = useState({})
    const [data, setData] = useState({
        name: "",
        role: "",
        videoUrl: "",
        imageUrl: "",
        message: ""
    })

    const { TextArea } = Input;

    const getOneDataTestimoial = useSelector((state) => state.testimonial.getOneTestimonialData)

    useEffect(() => {
        if (getOneDataTestimoial && getOneDataTestimoial.data) {
            setData({
                ...data,
                name: getOneDataTestimoial.data.name,
                role: getOneDataTestimoial.data.role,
                videoUrl: getOneDataTestimoial.data.videoUrl,
                imageUrl: getOneDataTestimoial.data.imageUrl,
                message: getOneDataTestimoial.data.message,
            })
        }
    }, [getOneDataTestimoial])

    const validation = () => {
        let error = {};
        let flag = false;
        // let videoUrlReg = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/;
        let videoUrlReg = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})?$/

        if (data.name === "") {
            error.name = "Name is required";
            flag = true;
        }

        if (data.role === "") {
            error.role = "Role is required";
            flag = true;
        }

        if (data.videoUrl === "") {
            error.videoUrl = "Video url is required";
            flag = true;
        } else if (!videoUrlReg.test(data.videoUrl)) {
            error.videoUrl = 'Enter valid video url';
            flag = true;
          }

        if (data.imageUrl === "") {
            error.imageUrl = "Image is required";
            flag = true;
        }

        if (data.message === "") {
            error.message = "Message is required";
            flag = true;
        }

        setError(error);
        return flag
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        setError({...error,[e.target.name]:""})
    }

    const fileUpload = (e, name) => {

        let firsttemp = e.target.files[0]?.name?.split('.');

        if (firsttemp) {
            let fileexten = ['jpeg', 'jpg', 'png']
            if (fileexten.includes(firsttemp[firsttemp.length - 1])) {
                setData({ ...data, [name]: e.target.files[0] })
                setError({ ...error, imageUrl: "" });
            }
            else {
                setError({ ...error, imageUrl: 'Please select valid document file' })
                setData({ ...data, imageUrl: '' })
            }
        }
        else {
            setError({ ...error, imageUrl: 'Please select document file' })
        }

    }

    useEffect(() => {
        if (id) {
            dispatch(getoneTestimonialData(id))
        }
    }, [id])

    const onsubmit = () => {
        if (validation()) {
            return;
        }
        let Data = {
            name: data.name,
            role: data.role,
            message: data.message,
        }

        if (data.videoUrl) {
            Data = {
                ...Data,
                videoUrl: data.videoUrl,
            }
        }
        if (data.imageUrl) {
            Data = {
                ...Data,
                imageUrl: data.imageUrl
            }
        }

        if (!location.search) {
            dispatch(addTestimonial(Data));
            history.push(`/admin/testimonial`)
        }
        else {
            Data = {
                ...Data,
                id: id,
                videoUrl: data.videoUrl,
                imageUrl: data.imageUrl,
                isActive: true,
                isDeleted: false
            }
            dispatch(editTestimonial(Data))
            history.push(`/admin/testimonial`)
            handalCancel();
        }
    }

    const handalCancel = () => {
        // setData ({
        //     name : "",
        //     role : "",
        //     videoUrl : "",
        //     imageUrl : "",
        //     message :""
        // })
        history.push('/admin/testimonial')
    }
    useEffect(() => {
        return (() => {
            dispatch(getoneTestimonialDataSuccess([]));
        })
    }, [])


    return (
        <>
            <PageHeader
                title={id ? "Edit testimonial" : "Add testimonial"}
            />
            <Main >
                <Cards headless>
                    <Row justify="space-between">

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="name">Name</label>
                            <Form.Item>
                                <Input placeholder="Name" value={data.name} onChange={(e) => handleChange(e)} name="name" />
                                {
                                    error.name && <span style={{ color: "red" }}>{error.name}</span>
                                }
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="role">Role</label>
                            <Form.Item>
                                <Input placeholder="Role" value={data.role} onChange={(e) => handleChange(e)} name="role" />
                                {
                                    error.role && <span style={{ color: "red" }}>{error.role}</span>
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="videoUrl">Video url</label>
                            <Form.Item>
                                <Input placeholder="Videourl" value={data.videoUrl} onChange={(e) => handleChange(e)} name="videoUrl" />
                                {
                                    error.videoUrl && <span style={{ color: "red" }}>{error.videoUrl}</span>
                                }
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="imageUrl">Image</label>
                            <Form.Item>
                                <Input type="file" placeholder="ImageURL" defalutValue={data.imageUrl} onChange={(e) => fileUpload(e, "imageUrl")} name="imageUrl" />
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
                            {id ? "Edit" : "Add"}
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