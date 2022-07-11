import React, { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { InfoWraper, NavAuth, UserDropDwon } from './auth-info-style';
import Message from './message';
import Notification from './notification';
import Settings from './settings';
import Support from './support';
import { Popover } from '../../popup/popup';
import { Dropdown } from '../../dropdown/dropdown';
import { logOut } from '../../../redux/authentication/actionCreator';
import { getUser } from '../../../redux/authentication/actionCreator';
import Heading from '../../heading/heading';
import AuthStorage from '../../../helper/AuthStorage';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

const AuthInfo = () => {

  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    flag: 'english',
  });
  const { flag } = state;

  const SignOut = e => {
    e.preventDefault();
    dispatch(logOut());
    localStorage.clear();
    AuthStorage.deauthenticateUser()
  };

  useEffect(() => {
    dispatch(getUser());
  },[]);

  const getEmployerData = useSelector(state => state.auth.getUserData);
 
  const userContent = (
    <UserDropDwon>
      <div className="user-dropdwon">
        <figure className="user-dropdwon__info">
          {/* <img src={require('../../../static/img/avatar/chat-auth.png')} alt="" /> */}
          <img src={getEmployerData?.data?.avatar  } alt="" width="46px" height="46px"/>
          <figcaption>
            <Heading as="h5">{getEmployerData?.data?.name}</Heading>
            <p>{getEmployerData?.data?.userType}</p>
          </figcaption>
        </figure>
        <ul className="user-dropdwon__links">
          <li>
            <Link to={`${path}/profile/myprofile`}>
              <FeatherIcon icon="user" /> Profile
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="settings" /> Settings
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="dollar-sign" /> Billing
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="users" /> Activity
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="bell" /> Help
            </Link>
          </li>
        </ul>
        <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
          <FeatherIcon icon="log-out" /> Sign out
        </Link>
      </div>
    </UserDropDwon>
  );

  const onFlagChangeHandle = value => {
    setState({
      ...state,
      flag: value,
    });
  };

  const country = (
    <NavAuth>
      <Link onClick={() => onFlagChangeHandle('english')} to="#">
        <img src={require('../../../static/img/flag/english.png')} alt="" />
        <span>English</span>
      </Link>
      <Link onClick={() => onFlagChangeHandle('germany')} to="#">
        <img src={require('../../../static/img/flag/germany.png')} alt="" />
        <span>Germany</span>
      </Link>
      <Link onClick={() => onFlagChangeHandle('spain')} to="#">
        <img src={require('../../../static/img/flag/spain.png')} alt="" />
        <span>Spain</span>
      </Link>
      <Link onClick={() => onFlagChangeHandle('turky')} to="#">
        <img src={require('../../../static/img/flag/turky.png')} alt="" />
        <span>Turky</span>
      </Link>
    </NavAuth>
  );

  return (
    <>
    <InfoWraper>
     <div 
     className="nav-author"
     >
        <Popover placement="bottomRight" content={userContent} action="click">
          <Link to="#" className="head-example">
            {/* <Avatar src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png" /> */}
            <Avatar src={getEmployerData?.data?.avatar} />
          </Link>
        </Popover>
      </div>
    </InfoWraper>
    </>
    // <InfoWraper>
    //   {/* <Message /> */}
    //   {/* <Notification /> */}

    //   {/* <Settings /> */}
    //   {/* <Support /> */}
    //   <div className="nav-author">
    //     <Dropdown placement="bottomRight" content={country} trigger="click">
    //       <Link to="#" className="head-example">
    //         <img src={require(`../../../static/img/flag/${flag}.png`)} alt="" />
    //       </Link>
    //     </Dropdown>
    //   </div>

    //   <div className="nav-author">
    //     <Popover placement="bottomRight" content={userContent} action="click">
    //       <Link to="#" className="head-example">
    //         <Avatar src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png" />
    //       </Link>
    //     </Popover>
    //   </div>
    // </InfoWraper>
  );
};

export default AuthInfo;
