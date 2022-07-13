import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch, useHistory } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import SubMenu from 'antd/lib/menu/SubMenu';

const MenuItems = ({ darkMode, toggleCollapsed, topMenu }) => {
  const { path } = useRouteMatch();
  const history = useHistory()
  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');
  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = keys => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = item => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
            `${mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
            }`,
          ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >

      <Menu.Item key="home" icon={!topMenu && <FeatherIcon icon="grid" />}>
        {/* <Menu.Item key="home" icon={!topMenu && <FeatherIcon icon="home" />}> */}
        <NavLink onClick={toggleCollapsed} to={`${path}`} >
          Dashboard
        </NavLink>
      </Menu.Item>

      {/* <SubMenu key="dashboard" icon={!topMenu && <FeatherIcon icon="home" />} title="Jobs"> */}
      <SubMenu key="job" className='menu' title="Jobs" onTitleClick={() => history.push(`${path}/job/post`)}
        icon={!topMenu && <FeatherIcon icon="codepen" style={{ marginRight: "10px" }} />}>
        {/* <Menu.Item key="dashboard">
          <NavLink onClick={toggleCollapsed} to={`${path}/job/post`}>
            Jobs Dashboard
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="post">
          <NavLink onClick={toggleCollapsed} to={`${path}/job/post`}>
            Jobs post
          </NavLink>
        </Menu.Item >
        {/* style={{marginLeft:"15px"}} */}
        <Menu.Item key="applications" >
          <NavLink onClick={toggleCollapsed} to={`${path}/job/application`}>
            Jobs applications
          </NavLink>
        </Menu.Item>
        <Menu.Item key="category" >
          <NavLink onClick={toggleCollapsed} to={`${path}/job/category`}>
            Jobs category
          </NavLink>
        </Menu.Item>
        <Menu.Item key="role" >
          <NavLink onClick={toggleCollapsed} to={`${path}/job/role`}>
            Jobs role
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <Menu.Item key="state" icon={!topMenu && <FeatherIcon icon="hexagon" />}>
        <NavLink onClick={toggleCollapsed} to={`${path}/state`}>
          State
        </NavLink>
      </Menu.Item>
      <Menu.Item key="district" icon={!topMenu && <FeatherIcon icon="layers" />}>
        <NavLink onClick={toggleCollapsed} to={`${path}/district`}>
          District
        </NavLink>
      </Menu.Item>
      {/* <Menu.Item key="language">
        <NavLink onClick={toggleCollapsed} to={`${path}/language`}>
          Language
        </NavLink>
      </Menu.Item> */}

      {/* <SubMenu key="schemes" icon={!topMenu && <FeatherIcon icon="home" />} title="Schemes"> */}
      <SubMenu key="schemes" title="Schemes" onTitleClick={() => history.push(`${path}/scheme`)} icon={!topMenu && <FeatherIcon icon="hash" style={{ marginRight: "10px" }} />}>
        <Menu.Item key="scheme">
          <NavLink onClick={toggleCollapsed} to={`${path}/scheme`}>
            Govt schemes
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="addscheme">
          <NavLink onClick={toggleCollapsed} to={`${path}/scheme/addscheme`}>
            Add Govt Schemes
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="schemecategory">
          <NavLink onClick={toggleCollapsed} to={`${path}/scheme/schemecategory`}>
            Scheme category
          </NavLink>
        </Menu.Item>
        <Menu.Item key="benefitstype">
          <NavLink onClick={toggleCollapsed} to={`${path}/scheme/benefitstype`}>
            Benefits type
          </NavLink>
        </Menu.Item>
        <Menu.Item key="schemerating">
          <NavLink onClick={toggleCollapsed} to={`${path}/scheme/schemerating`}>
            Scheme rating
          </NavLink>
        </Menu.Item>
      </SubMenu>

      {/* <SubMenu key="courses" icon={!topMenu && <FeatherIcon icon="home" />} title="Courses"> */}
      <SubMenu key="courses" title="Courses" onTitleClick={() => history.push(`${path}/courses`)} icon={!topMenu && <FeatherIcon icon="command" style={{ marginRight: "10px" }} />}>
        <Menu.Item key="courses" >
          <NavLink onClick={toggleCollapsed} to={`${path}/courses`}>
            Swayam courses
          </NavLink>
        </Menu.Item>
        <Menu.Item key="partnercourses" >
          <NavLink onClick={toggleCollapsed} to={`${path}/courses/partnercourses`}>
            Partner courses
          </NavLink>
        </Menu.Item>
        <Menu.Item key="coursecategory" >
          <NavLink onClick={toggleCollapsed} to={`${path}/courses/coursecategory`}>
            Course category
          </NavLink>
        </Menu.Item>

        <Menu.Item key="courserating" >
          <NavLink onClick={toggleCollapsed} to={`${path}/courses/courserating`}>
            Course rating
          </NavLink>
        </Menu.Item>

      </SubMenu >
      {/* <Menu.Item key="testimonial">
        <NavLink onClick={toggleCollapsed} to={`${path}/testimonial`}>
          Testimonial
        </NavLink>
      </Menu.Item> */}

      <SubMenu key="user" title="Users" onTitleClick={() => history.push(`${path}/user`)} icon={!topMenu && <FeatherIcon icon="users" style={{ marginRight: "10px" }} />}>
        {/* <Menu.Item key="user">
          <NavLink onClick={toggleCollapsed} to={`${path}/user`}>
            User
          </NavLink>
        </Menu.Item> */}

        <Menu.Item key="user">
          <NavLink onClick={toggleCollapsed} to={`${path}/user`}>
            User
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="userrating">
          <NavLink onClick={toggleCollapsed} to={`${path}/user/userrating`}>
            User Rating
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="partner">
          <NavLink onClick={toggleCollapsed} to={`${path}/user/partner`}>
            Partner
          </NavLink>
        </Menu.Item>
        <Menu.Item key="employer">
          <NavLink onClick={toggleCollapsed} to={`${path}/user/employer`}>
            Employer
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="employerrating">
          <NavLink onClick={toggleCollapsed} to={`${path}/user/employerrating`}>
            Employer Rating
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="useradmin">
          <NavLink onClick={toggleCollapsed} to={`${path}/user/useradmin`}>
            Admin
          </NavLink>
        </Menu.Item>
        <Menu.Item key="superadmin">
          <NavLink onClick={toggleCollapsed} to={`${path}/user/superadmin`}>
            Super admin
          </NavLink>
        </Menu.Item>

        {/* <Menu.Item key="userrating">
          <NavLink onClick={toggleCollapsed} to={`${path}/user/userrating`}>
            User Rating
          </NavLink>
        </Menu.Item> */}
      </SubMenu>

      {/* 
      <SubMenu key="employer" title="Employer" onTitleClick={() => history.push(`${path}/employer`)}>
        <Menu.Item key="employer">
          <NavLink onClick={toggleCollapsed} to={`${path}/employer`}>
            Employer
          </NavLink>
        </Menu.Item>
        <Menu.Item key="employerrating">
          <NavLink onClick={toggleCollapsed} to={`${path}/employer/employerrating`}>
            Employer Rating
          </NavLink>
        </Menu.Item>
      </SubMenu> */}

      <SubMenu key="layout" title="Layout" icon={!topMenu && <FeatherIcon icon="layout" style={{ marginRight: "10px" }} />}>
        <Menu.Item key="banner">
          <NavLink onClick={toggleCollapsed} to={`${path}/banner`} >
            Banner
          </NavLink>
        </Menu.Item>
        <Menu.Item key="carousel" >
          <NavLink onClick={toggleCollapsed} to={`${path}/carousel`} >
            Carousel
          </NavLink>
        </Menu.Item>
        <Menu.Item key="testimonial">
          <NavLink onClick={toggleCollapsed} to={`${path}/testimonial`} >
            Testimonial
          </NavLink>
        </Menu.Item>
      </SubMenu>

      <Menu.Item key="article" icon={!topMenu && <FeatherIcon icon="hexagon" />}>
        <NavLink onClick={toggleCollapsed} to={`${path}/article`}>
          Article
        </NavLink>
      </Menu.Item>

      <Menu.Item key="query" icon={!topMenu && <FeatherIcon icon="help-circle" />}>
        <NavLink onClick={toggleCollapsed} to={`${path}/query`}>
          Query
        </NavLink>
      </Menu.Item>

      {/* <Menu.Item key="banner">
        <NavLink onClick={toggleCollapsed} to={`${path}/banner`}>
          Banner
        </NavLink>
      </Menu.Item>
      <Menu.Item key="carousel">
        <NavLink onClick={toggleCollapsed} to={`${path}/carousel`}>
          Carousel
        </NavLink>
      </Menu.Item> */}
    </Menu>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
