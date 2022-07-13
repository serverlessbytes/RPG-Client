import { Checkbox, Col, Form, Input, Radio, Row, Select, Space } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers'
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { addUserSignup, editProfile, getOneUser } from '../../redux/users/actionCreator';
import actions from "../../redux/users/actions";

const Adduser = () => {

    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id')
    let history = useHistory();
    let location = useLocation();
    const dispatch = useDispatch();
    const { Option } = Select;
    const { getOneUserSuccess } = actions;
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        userType: "",
        avatar: "",
    });
    const [error, setError] = useState({})

    const getOneData = useSelector((state) => state.users.getOneUser)

    const selectValue = (e, name) => {
        if (name === "userType") {
            setState({
                ...state,
                userType: e
            });
        }
    }

    const onChangeValue = (e, name) => {

        const regexphone = /^[0-9\b]+$/;

        if (name === "phone") {
            if (e.target.value === '' || regexphone.test(e.target.value)) {
                setState({ ...state, [e.target.name]: e.target.value });
                setError({ ...error, phone: "" });
            } 
        }else {
            setState({ ...state, [e.target.name]: e.target.value })
        }
    }

    const fileUpload = (e, name) => {
        let firsttemp = e.target.files[0].name?.split('.');
        let fileexten = ['jpeg', 'jpg', 'png']
        if (fileexten.includes(firsttemp[firsttemp.length - 1])) {
            setState({ ...state, [name]: e.target.files[0] })
            setError({ ...error, avatar: "" });
        }
        else {
            // setData({...data,
            // })
            setError({ ...error, avatar: 'Please select valid document file' })
            setState({ ...state, avatar: '' })
            // setFileError('Please select valid document file')
        }
    }

    const validation = () => {

        let error = {}
        let flage = false
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (state.name === "") {
            error.name = "Name is required";
            flage = true;
        }
        if (state.email === "") {
            error.email = "Email is required";
            flage = true;
        }
        if (state.email && !state.email.match(regex)) {
            error.email = "Please enter a valid email address";
            flage = true;
        }
        if (state.password === "") {
            error.password = "Password is required";
            flage = true;
        }
        if (state.phone === "") {
            error.phone = "Phone is required";
            flage = true;
        }
        if (state.phone && state.phone.length < 10) {
            error.phone = 'Please enter valid phone number';
            flage = true;
        }
        if (!state.avatar) {
            error.avatar = "Avatar is required";
            flage = true;
        }

        if (state.userType === "") {
            error.userType = "User type is required";
            flage = true;
        }
        setError(error);
        return flage
    }

    const onSubmit = () => {
        if (validation()) {
            return;
        }
        let data = {
            // key: uuid(),
            name: state.name,
            email: state.email,
            password: state.password,
            phone: state.phone,
            userType: state.userType,
            //avatar: state.avatar ?? 'any',
            //avatar: state.avatar,
        }

        if (!location.search) {
            dispatch(addUserSignup(data));
            oncancel();
        }
        else {
            delete data.key
            data = {
                ...data,
                id: location.search.split('=')[1],
                isDeleted: false,
                isActive: true,
                // avatar: "dfd",
                avatar: state.avatar,
                //isApproved: true
            }
            dispatch(editProfile(data))
            oncancel()
        }
    }

    // -- from goBAck Same Page
    const oncancel = () => {
        if (window.location.pathname.includes("partner")) {
            history.push(`/admin/user/partner`);
        } else if (window.location.pathname.includes("employer")) {
            history.push(`/admin/user/employer`);
        } else if (window.location.pathname.includes("partner")) {
            history.push(`/admin/user/partner`);
        } else if (window.location.pathname.includes("useradmin")) {
            history.push(`/admin/user/useradmin`);
        } else if (window.location.pathname.includes("superadmin")) {
            history.push(`/admin/user/superadmin`);
        }
        else (
            history.push('/admin/user')
        )
    }

    useEffect(() => {
        return (() => {
            dispatch(getOneUserSuccess([])) // for a data blank
        })
    }, [])

    useEffect(() => {
        if (id) {
            dispatch(getOneUser(id))
        }
    }, [id])

    useEffect(() => {
        if (getOneData && getOneData.data) {
            setState({
                ...state,
                name: getOneData.data.name,
                email: getOneData.data.email,
                password: getOneData.data.password,
                phone: getOneData.data.phone,
                userType: getOneData.data.userType,
                avatar: getOneData.data.avatar,
            })
        }
    }, [getOneData])


    return (
        <>
            <PageHeader
                title={id ? "Edit user" : "Add user"}
            // buttons={[
            //     <div key="1" className="page-header-actions">
            //         <Button size="small" onClick={() => { }} type="primary">
            //             <FeatherIcon icon="plus" size={14} />
            //             Add New
            //         </Button>
            //     </div>,
            // ]}
            />
            <Main >
                <Cards headless>
                    <Row justify="space-between">
                        {/* <Col lg={11} className="d-flex f-d-cloumn">
                            <label htmlFor="name" className='mb-5'>Language</label>
                            <Radio.Group onChange={onChange} value={typeOfJob}>
                                <Space direction="vertical">
                                    <Row>
                                        <Radio value={"English"}>English</Radio>
                                        <Radio value={"Hindi"}>Hindi</Radio>
                                    </Row>
                                </Space>
                            </Radio.Group>
                        </Col> */}
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="name">Name</label>
                            <Form.Item>
                                <Input placeholder="User name" value={state.name} name="name" onChange={(e) => onChangeValue(e)} />
                                {
                                    error.name && <span style={{ color: "red" }}>{error.name}</span>
                                }
                            </Form.Item>
                        </Col>

                        {/* </Row>
                    <Row justify="space-between"> */}
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="category mb-4">User type</label>
                            <Form.Item>
                                <Select size="large" placeholder="Select category" value={state.userType} className="sDash_fullwidth-select" name="userType" onChange={(e) => selectValue(e, "userType")}>
                                    <option value={""}>Select user</option>
                                    <option value={"USER"}>User</option>
                                    <option value={"PARTNER"}>Partner</option>
                                    <option value={"EMPLOYER"}>Employer</option>
                                    <option value={"ADMIN"}>Admin</option>
                                    <option value={"SUPERADMIN"}>Superadmin</option>
                                </Select>
                                {
                                    error.userType && <span style={{ color: "red" }}>{error.userType}</span>
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="email">Email</label>
                            <Form.Item>
                                <Input placeholder="Email" value={state.email} name="email" onChange={(e) => onChangeValue(e)} />
                                {
                                    error.email && <span style={{ color: "red" }}>{error.email}</span>
                                }
                            </Form.Item>
                        </Col>
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="password">Password</label>
                            <Form.Item>
                                <Input placeholder="Password" value={state.password} disabled={(getOneData && getOneData.data)} name="password" onChange={(e) => onChangeValue(e)} />
                                {error.password && <span style={{ color: "red" }}>{error.password}</span>}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="space-between">
                        {/* <Col lg={11} className="d-flex f-d-cloumn">
                            <label htmlFor="name" className='mb-5'>Language</label>
                            <Radio.Group onChange={onChange} value={typeOfJob}>
                                <Space direction="vertical">
                                    <Row>
                                        <Radio value={"English"}>English</Radio>
                                        <Radio value={"Hindi"}>Hindi</Radio>
                                    </Row>
                                </Space>
                            </Radio.Group>
                        </Col> */}
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="phone">Phone</label>
                            <Form.Item>
                                <Input placeholder="Phone" value={state.phone} maxLength={10} name="phone" onChange={(e) => onChangeValue(e, "phone")} />
                                {
                                    error.phone && <span style={{ color: "red" }}>{error.phone}</span>
                                }
                            </Form.Item>
                        </Col>

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="phone">Avatar</label>
                            <Form.Item>
                                <Input type='file' placeholder="Avatar" name="avatar" onChange={(e) => fileUpload(e, "avatar")} />
                                {
                                    error.avatar && <span style={{ color: "red" }}>{error.avatar}</span>
                                }
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* <div >
                        <label htmlFor="visible" className='ml-10'>Visible to User</label>
                        <Checkbox id='visible' name="isActive" checked={state.isActive} onChange={(e) => onChangeValue(e)} ></Checkbox>
                    </div> */}

                    <div className="sDash_form-action mt-20">
                        <Button className="btn-signin ml-10" type="primary" size="medium" onClick={(e) => onSubmit(e)}>
                            {id ? "Edit" : "Add"}
                        </Button>
                        <Button className="btn-signin" type="light" size="medium"
                            //    onClick={() => history.push(`/admin/user`)}
                            onClick={(e) => oncancel(e)}
                        >
                            Cancel
                        </Button>
                    </div>
                </Cards>
            </Main>
        </>
    )
}

export default Adduser