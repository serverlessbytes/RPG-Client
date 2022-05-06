import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { AuthWrapper } from './style';
import { login } from '../../../../redux/authentication/actionCreator';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';
import { TestimonialStyleWrapper } from '../../../pages/style';
import { toast } from 'react-toastify';
import AuthStorage from '../../../../helper/AuthStorage';

const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.loading);
  const isLoggedIn = useSelector(state => state.auth.login);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: false,
  });

  const handleSubmit = () => {
    console.log("form ==== form", form.getFieldsValue());
    const data = form.getFieldsValue()
    const keepSignIn = state.checked
    dispatch(login(data, keepSignIn));
  };

  const onChange = e => {
    setState({ ...state, checked: e });
  };

  return (
    <AuthWrapper>
      <p className="auth-notice">
        Don&rsquo;t have an account? <NavLink to="/signup">Sign up now</NavLink>
      </p>
      <div className="auth-contents">
        <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">
            Sign in to <span className="color-secondary">Swayam</span>
          </Heading>
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid Email!',
              },
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
            label="Email Address"
          >
            <Input placeholder='Email Address' />
          </Form.Item>
          <Form.Item name="password"
            rules={[{ message: 'Please input your Password!', required: true }]}
            label="Password">
            <Input.Password placeholder="Password" />
          </Form.Item>
          <div className="auth-form-action">
            <Checkbox
              checked={state.checked}
              onChange={(e) => onChange(e)}
            >Keep me logged in</Checkbox>
            <NavLink className="forgot-pass-link" to="#">
              Forgot password?
            </NavLink>
          </div>
          <Form.Item>
            <Button className="btn-signin" htmlType="submit" type="primary" size="large">
              {isLoading ? 'Loading...' : 'Sign In'} 
            </Button>
          </Form.Item>
          {/* <p className="form-divider">
            <span>Or</span>
          </p>
          <ul className="social-login">
            <li>
              <Link className="google-signup" to="#">
                <img src={require('../../../../static/img/google.png')} alt="" />
                <span>Sign in with Google</span>
              </Link>
            </li>
            <li>
              <Link className="facebook-sign" to="#">
                <FacebookOutlined />
              </Link>
            </li>
            <li>
              <Link className="twitter-sign" to="#">
                <TwitterOutlined />
              </Link>
            </li>
          </ul> */}
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
