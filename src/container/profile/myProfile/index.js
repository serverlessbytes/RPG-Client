import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Skeleton, Select, Form, Input, Button } from 'antd';
import { NavLink, Switch, Route, useRouteMatch } from 'react-router-dom';
import { SettingWrapper } from './overview/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../styled';
import { Cards } from '../../../components/cards/frame/cards-frame';
import UserCards from './overview/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileData } from '../../../redux/profile/actionCreator';
import { editUser } from '../../../redux/authentication/actionCreator';
import actions from '../../../redux/authentication/actions';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { editProfileSuccess, editProfileErr } = actions;

  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
  })

  const [getData,setGetData] = useState({
   name : "",
   avatar : '',
  })
  const [id, setId] = useState()
  const [error, setError] = useState('')

  // const userData = useSelector((state) => state.profileReducer.getProfileData);
  const editUserData = useSelector((state) => state.auth.editUserData);
  const editProfileError = useSelector(state => state.auth.editProfileErr);
  const userData = useSelector(state => state.auth.getUserData);

  useEffect(() => {
    dispatch(getProfileData())
  }, [])

  useEffect(() => {
    if (editUserData && editUserData.status === 200) {
      dispatch(editProfileSuccess(null))
      toast.success("Profile Update successfully")
    }
  }, [editUserData])

  useEffect(() => {
    if (editProfileError) {
      dispatch(editProfileErr(null))
      toast.error("Something Wrong")
    }
  }, [editProfileError])

  useEffect(() => {
    if (userData && userData.data) {
      setData({
        name: userData.data.name,
        email: userData.data.email,
        phone: userData.data.phone,
        avatar: userData.data.avatar,
      })
      setId(userData.data.id)
    }
  }, [userData])

  useEffect(() => {
    if (userData && userData.data) {
      setGetData({
        name: userData.data.name,
        avatar: userData.data.avatar,
      })
    }
  }, [userData])

  const onChangeHandler = (e, name) => {

    const regexphone = /^[0-9\b]+$/;
    if (name === "phone") {
      if (e.target.value === '' || regexphone.test(e.target.value)) {
        setData({ ...data, [e.target.name]: e.target.value });
        setError({ ...error, phone: "" });
      }
    } else {
      setData({ ...data, [e.target.name]: e.target.value })
      setError('')
    }
  }

  const fileUpload = (e, name) => {
    let firsttemp = e.target.files[0].name?.split('.');
    let fileexten = ['jpeg', 'jpg', 'png']
    if (fileexten.includes(firsttemp[firsttemp.length - 1])) {
      setData({ ...data, [name]: e.target.files[0] })
      setError({ ...error, avatar: "" });
    }
    else {
      // setData({...data,
      // })
      setError({ ...error, avatar: 'Please select valid document file' })
      setData({ ...data, avatar: '' })
    }
  }

  const validation = () => {
    let error = {};
    let flage = false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!data.name) {
      error.name = 'name is required';
      flage = true;
    }
    if (!data.email) {
      error.email = 'email is required';
      flage = true;
    }

    if (data.email && !data.email.match(regex)) {
      error.email = 'Please enter a valid email address';
      flage = true;
    }
    if (!data.phone) {
      error.phone = 'phone is required';
      flage = true;
    }
    if (data.phone && data.phone.length < 10) {
      error.phone = 'Please enter valid phone number';
      flage = true
    }
    if (!data.avatar) {
      error.avatar = 'avatar is required';
      flage = true;
    }

    setError(error);
    return flage;
  }

  const editProfile = () => {
    if (validation()) {
      return;
    }
    data.isActive = true
    data.isDeleted = false

    dispatch(editUser(data, id))
  }

  return (
    <>
      <PageHeader
        ghost
        title="My Profile"
        buttons={[
          // <div key="1" className="page-header-actions">
          //   <Button size="small" type="primary">
          //     <FeatherIcon icon="plus" size={14} />
          //     Add New
          //   </Button>
          // </div>
        ]}
      />

      <Main>
        <Cards headless>
          <Row gutter={25} justify="between">
            <Col xxl={6} lg={8} md={10} xs={24}>
              <UserCards
                user={{ name: `${getData.name}`, img: `${getData.avatar ? getData.avatar : '../../../../user.png'}` }}
              />
            </Col>
            <Col xxl={18} lg={16} md={14} xs={24}>
              {/* <Form name="login" form={form} onFinish={handleSubmit} layout="vertical"> */}
              <Row align="middle" justify="space-around">
                <Col lg={10}>
                  <label htmlFor="name">User Name</label>
                  <Form.Item>
                    <Input
                      name="name"
                      id="name"
                      placeholder="Enter Name"
                      onChange={(e) => onChangeHandler(e)}
                      // defaultValue={data.name}
                      value={data.name}
                    />
                    {error.name && <span style={{ color: 'red' }}>{error.name}</span>}
                  </Form.Item>
                </Col>

                <Col lg={10}>
                  <label htmlFor="email">User Email</label>
                  <Form.Item>
                    {/* rules={[{ type: 'email' }]}
                    > */}
                    <Input placeholder="Enter Email"
                      name="email"
                      onChange={(e) => onChangeHandler(e)}
                      value={data.email} />
                    {error.email && <span style={{ color: 'red' }}>{error.email}</span>}
                  </Form.Item>
                </Col>
              </Row>

              <Row align="middle" justify="space-around">
                <Col lg={10}>
                  <label htmlFor="phone">Phone Number</label>
                  <Form.Item>
                    <Input placeholder="Enter Phone Number"
                      name='phone'
                      onChange={(e) => onChangeHandler(e, "phone")}
                      value={data.phone}
                      maxLength={10}
                    />
                    {error.phone && <span style={{ color: 'red' }}>{error.phone}</span>}
                  </Form.Item>
                </Col>

                <Col lg={10}>
                  <label htmlFor="email">Avatar</label>
                  <Form.Item>
                    {/* rules={[{ type: 'email' }]}
                    > */}
                    <Input placeholder="Enter avatar"
                      type="file"
                      name="avatar"
                      onChange={(e) => fileUpload(e, "avatar")}
                    // value={data.avatar}
                    />
                    {error.avatar && <span style={{ color: 'red' }}>{error.avatar}</span>}
                  </Form.Item>
                </Col>
              </Row>
              {/* </Form> */}
            </Col>
            <Button onClick={() => editProfile()}>Update Profile</Button>
          </Row>
        </Cards>
      </Main>
    </>
  );
};

MyProfile.propTypes = {
  // match: propTypes.object,
};

export default MyProfile;
