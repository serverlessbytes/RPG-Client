import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Skeleton, Select, Form, Input } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { NavLink, Switch, Route, useRouteMatch } from 'react-router-dom';
import { SettingWrapper } from './overview/style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Main } from '../../styled';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../../components/buttons/calendar-button/calendar-button';
import UserCards from './overview/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileData } from '../../../redux/profile/actionCreator';


const MyProfile = () => {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const userData = useSelector((state) => state.profileReducer.getProfileData);
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: ''
  })


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
    }
  }, [userData])

  useEffect(() => {
    if (data)
      console.log("data=====", data)
  }, [data])

  const onChangeHandler = (e) => {
    console.log("e=============", e)
  }


  const handleSubmit = () => {

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
                user={{ name: 'Duran Clyton', img: '../../../../user.png' }}
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
                      value={data.email} />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="space-around">
                <Col lg={10}>
                  <label htmlFor="phone">Phone Number</label>
                  <Form.Item>
                    <Input placeholder="Enter Phone Number"
                      value={data.phone}
                    />
                  </Form.Item>
                </Col>
                <Col lg={10}>
                </Col>
              </Row>
              {/* </Form> */}
            </Col>
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
