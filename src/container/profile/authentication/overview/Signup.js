import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { AuthWrapper } from './style';
import {signUp } from '../../../../redux/authentication/actionCreator';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';

const Signup = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.auth.loading);
    const [form] = Form.useForm();
    const [formError, SetFormError] = useState()

    const signUpdata=useSelector((state)=>state.auth.signup)

    const handleSubmit = () => {
        console.log("form ==== form", form.getFieldsValue());
        const data = form.getFieldsValue()
        let dt = {
            email:data.email,
            name : data.name,
            password:data.password,
            phone:data.phone,
        }
        dispatch(signUp(dt))
       
    };

    useEffect(() => {
      if(signUpdata && signUpdata.message==="user created"){
         history.push('/')
      }
    }, [signUpdata])
    

    const validation = () => {
        let data = form.getFieldsValue()
        const error = {}
        let temp = false
        if (data.password !== data.confirmPassword) {
            error.confirmPassword = "Password does not matched"
            temp = true
        }
        SetFormError(error)
        return temp

    }

    return (
        <>
            <AuthWrapper>
                <p className="auth-notice">
                    {/* Don&rsquo;t have an account? <NavLink to="#">Sign in now</NavLink> */}
                    Already have an account? <NavLink to="/">Sign in now</NavLink>
                </p>
                <div className="auth-contents">
                    <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
                        <Heading as="h3">
                            Sign up to <span className="color-secondary">Swayam</span>
                        </Heading>
                        <Form.Item
                            name="name"
                            rules={[{ message: 'Please input your Name!', required: true }]}
                            label="Name"
                        >
                            <Input placeholder='Enter Name' />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ message: 'Please input your Email!', required: true }]}
                            label="Email Address"
                        >
                            <Input placeholder='Enter Email' />
                        </Form.Item>
                        <Form.Item name="password"
                            rules={[{ message: 'Please input your Password!', required: true }]}
                            label="Password">
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                        <Form.Item name="confirmPassword"
                            rules={[{ message: 'Please input your Confirm password!', required: true }]}
                            label="Confirm password">
                            <Input.Password placeholder="Confirm password" />
                        </Form.Item>
                            {formError?.confirmPassword && <span>{formError.confirmPassword}</span>}
                        <Form.Item name="phone"
                            rules={[{ message: 'Please input your Mobile Number!', required: true }]}
                            label="Mobile Number">
                            <Input placeholder="Mobile Number" />
                        </Form.Item>
                        <Form.Item>
                            <Button className="btn-signin" htmlType="submit" type="primary" size="large">
                                {isLoading ? 'Loading...' : 'Sign up'}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </AuthWrapper>
        </>
    )
}

export default Signup