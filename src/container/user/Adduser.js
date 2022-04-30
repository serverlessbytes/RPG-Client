import { Checkbox, Col, Form, Input, Radio, Row, Select, Space } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers'
import React, { useEffect, useState } from 'react';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
// import getSchemecategory from '../../redux/schemes/actionCreator'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { addUserSignup, editProfile, getOneUser } from '../../redux/users/actionCreator';
import actions from "../../redux/users/actions";

const Adduser = () => {
    const {
        getOneUserSuccess, // foe edit
    } = actions;
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id')
    const { path } = useRouteMatch();
    let history = useHistory();
    let location = useLocation();

    useEffect(() => {
        console.log("location", location);
    }, [])

    useEffect(() => {
        console.log("id", id);
    }, [])
    /* const [typeOfJob, setTypeOfJob] = useState("");
    const onChange = e => {
        console.log('radio checked', e.target.value);
        setTypeOfJob(e.target.value)
    }; */
    const dispatch = useDispatch();
    const { Option } = Select;

    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        userType: "",
        avatar: "",
    });
    const [error, setError] = useState({})

    useEffect(() => {
        if (location.search) {
            dispatch(getOneUser(location.search.split('=')[1]))
        }
    }, [location.search])

    const getOneData = useSelector((state) => state.users.getOneUser)

    useEffect(() => {
        if (getOneData && getOneData.data) {
            console.log("getOneData", getOneData)
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


    useEffect(() => {
        console.log("STATE", state);
    }, [state])

    const selectValue = (e, name) => {
        if (name === "userType") {
            setState({
                ...state,
                userType: e
            });
        }
    }

    const onChangeValue = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const validation = () => {
        // console.log("(state.benifitLine).toString", (state.benifitLine).toString("markdown"))
        let error = {}
        let flage = false
        if (state.name === "") {
            error.name = "Name is required";
            flage = true;
        }
        if (state.email === "") {
            error.email = "Email is required";
            flage = true;
        }
        if (state.password === "") {
            error.password = "Password is required";
            flage = true;
        }
        if (!state.phone.match('[0-9]{10}')){
            error.phone = "Phone is required";
            flage = true;
        }

        //  if (state.phone === "") {
        //     if( !(state.phone.match('[0-9]{10}')) ){
        //         error.phone = "Phone num is required";
        //    }else{
        //     error.phone = "Phone is required";
        //    }
            
        //     flage = true;
        // }
        if (state.userType === "") {
            error.userType = "UserType is required";
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
        console.log("data", state);

        if (!location.search) {
            dispatch(addUserSignup(data));
            history.push(`/admin/user`)
        }
        else {
            delete data.key
            data = {
                ...data,
                id: location.search.split('=')[1],
                isDeleted: false,
                isActive: true,
                avatar:"dfd",
                //isApproved: true

            }
            dispatch(editProfile(data))
            history.push(`/admin/user`)
        }
    }
    const oncancel = () => {
        dispatch(getOneUserSuccess([])) // for a data balnk
        history.push(`/admin/user`)

    }

    return (
        <>
          <PageHeader
                title="Add User"
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
                                <Input placeholder="User Name" value={state.name} name="name" onChange={(e) => onChangeValue(e)} />
                                {
                                    error.name && <span style={{ color: "red" }}>{error.name}</span>
                                }
                            </Form.Item>
                        </Col>

                        {/* </Row>
                    <Row justify="space-between"> */}
                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="category mb-4">User Type</label>
                            <Form.Item initialValue=" Select a scheme category ">
                                <Select size="large" placeholder="Select Category" value={state.userType} className="sDash_fullwidth-select" name="userType" onChange={(e) => selectValue(e, "userType")}>
                                    <option value={""}>Select User</option>
                                    <option value={"USER"}>USER</option>
                                    <option value={"PARTNER"}>PARTNER</option>
                                    <option value={"EMPLOYER"}>EMPLOYER</option>
                                    <option value={"ADMIN"}>ADMIN</option>
                                    <option value={"SUPERADMIN"}>SUPERADMIN</option>
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
                                <Input placeholder="password" value={state.password} disabled={(getOneData && getOneData.data)} name="password" onChange={(e) => onChangeValue(e)} />
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
                                <Input placeholder="Phone" value={state.phone} name="phone" onChange={(e) => onChangeValue(e)} />
                                {
                                    error.phone && <span style={{ color: "red" }}>{error.phone}</span>
                                }
                            </Form.Item>
                        </Col>

                        {/* <Col lg={11} md={11} sm={24}>
                            <label htmlFor="phone">Phone</label>
                            <Form.Item>
                                <Input placeholder="Phone" name="phone" onChange={(e) => onChangeValue(e)} />
                                {
                                    error.name && <span style={{ color: "red" }}>{error.name}</span>
                                }
                            </Form.Item>
                        </Col> */}

                        <Col lg={11} md={11} sm={24} xs={24}>
                            <label htmlFor="phone">Avatar</label>
                            <Form.Item>
                                <Input placeholder="Avatar" name="avatar" onChange={(e) => onChangeValue(e)} />
                                {/* {
                                    error.avatar && <span style={{ color: "red" }}>{error.avatar}</span>
                                } */}
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* <div >
                        <label htmlFor="visible" className='ml-10'>Visible to User</label>
                        <Checkbox id='visible' name="isActive" checked={state.isActive} onChange={(e) => onChangeValue(e)} ></Checkbox>
                    </div> */}

                    <div className="sDash_form-action mt-20">
                        <Button className="btn-signin ml-10" type="primary" size="medium" onClick={(e) => onSubmit(e)}>
                        {id?"Edit":"Add"}
                        </Button>
                        <Button className="btn-signin" type="light" size="medium"
                           // onClick={() => history.push(`/admin/user`)}
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