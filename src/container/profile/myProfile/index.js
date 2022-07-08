import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Skeleton, Select, Form, Input,Button } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { NavLink, Switch, Route, useRouteMatch } from 'react-router-dom';
import { SettingWrapper } from './overview/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../styled';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { ShareButtonPageHeader } from '../../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../../components/buttons/calendar-button/calendar-button';
import UserCards from './overview/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileData } from '../../../redux/profile/actionCreator';
import { editUser } from '../../../redux/authentication/actionCreator';


const MyProfile = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const userData = useSelector((state) => state.profileReducer.getProfileData);
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
  })

  const [id,setId]=useState()


  useEffect(() => {
    dispatch(getProfileData())
  }, [])

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

  const onChangeHandler = (e) => {
    setData({...data, [e.target.name]: e.target.value })
  }
  
  const fileUpload = (e, name) => {
    let firsttemp = e.target.files[0].name?.split('.');
    let fileexten = ['jpeg', 'jpg', 'png']
    if (fileexten.includes(firsttemp[firsttemp.length - 1])) {
        setData({ ...data, [name]: e.target.files[0] })
        // setError({ ...error, avatar: "" });
    }
    else {
        // setData({...data,
        // })
        // setError({ ...error, avatar: 'Please select valid document file' })
        setData({ ...data, avatar: '' })
        // setFileError('Please select valid document file')
    }
    }

  const editProfile = () => {
    data.isActive=true
    data.isDeleted=false

    dispatch(editUser(data,id))
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
                user={{ name: `${data.name}`, img: `${data.avatar ? data.avatar : '../../../../user.png'}`  }}
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
                  </Form.Item>
                </Col>
              </Row>
              <Row align="middle" justify="space-around">
                <Col lg={10}>
                  <label htmlFor="phone">Phone Number</label>
                  <Form.Item>
                    <Input placeholder="Enter Phone Number"
                    name='phone'
                    onChange={(e) => onChangeHandler(e)}
                      value={data.phone}
                    />
                  </Form.Item>
                </Col>
                <Col lg={10}>
                  <label htmlFor="email">Avatar</label>
                  <Form.Item>
                    {/* rules={[{ type: 'email' }]}
                    > */}
                    <Input placeholder="Enter avatar"
                    type = "file"
                    name="avatar"
                    onChange={(e) => fileUpload(e,"avatar")}
                    // value={data.avatar}
                     />
                  </Form.Item>
                </Col>
              </Row>
              {/* </Form> */}
            </Col>
            <Button onClick={()=>editProfile()}>Update Profile</Button>
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
