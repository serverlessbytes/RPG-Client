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

      <Menu.Item key="home" icon={!topMenu && <FeatherIcon icon="pie-chart" />}>
        {/* <Menu.Item key="home" icon={!topMenu && <FeatherIcon icon="home" />}> */}
        <NavLink onClick={toggleCollapsed} to={`${path}`} >
          Dashboard
        </NavLink>
      </Menu.Item>

      {/* <SubMenu key="dashboard" icon={!topMenu && <FeatherIcon icon="home" />} title="Jobs"> */}
      <SubMenu key="job" className='menu' title="Jobs" onTitleClick={() => history.push(`${path}/job/post`)}
        icon={!topMenu && <FeatherIcon icon="feather" />}>
        {/* <Menu.Item key="dashboard">
          <NavLink onClick={toggleCollapsed} to={`${path}/job/post`}>
            Jobs Dashboard
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="post" icon={!topMenu && <FeatherIcon icon="feather" />}>
          <NavLink  onClick={toggleCollapsed} to={`${path}/job/post`}> 
            Jobs Post
          </NavLink>
        </Menu.Item >
        {/* style={{marginLeft:"15px"}} */}
        <Menu.Item key="applications" icon={!topMenu && <FeatherIcon icon="feather" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/job/application`}>
            Jobs Applications
          </NavLink>
        </Menu.Item>
        <Menu.Item key="category" icon={!topMenu && <FeatherIcon icon="feather" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/job/category`}>
            Jobs Category
          </NavLink>
        </Menu.Item>
        <Menu.Item key="role" icon={!topMenu && <FeatherIcon icon="feather" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/job/role`}>
            Jobs Role
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
      <SubMenu key="schemes" title="Schemes" onTitleClick={() => history.push(`${path}/scheme`)} icon={!topMenu && <FeatherIcon icon="hash" />}>
        <Menu.Item key="scheme" icon={!topMenu && <FeatherIcon icon="feather" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/scheme`}>
            Govt Schemes
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="addscheme">
          <NavLink onClick={toggleCollapsed} to={`${path}/scheme/addscheme`}>
            Add Govt Schemes
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="schemecategory" icon={!topMenu && <FeatherIcon icon="feather" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/scheme/schemecategory`}>
            Scheme Category
          </NavLink>
        </Menu.Item>
        <Menu.Item key="benefitstype" icon={!topMenu && <FeatherIcon icon="feather" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/scheme/benefitstype`}>
            Benefits Type
          </NavLink>
        </Menu.Item>
        <Menu.Item key="schemerating" icon={!topMenu && <FeatherIcon icon="feather" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/scheme/schemerating`}>
            Scheme Rating
          </NavLink>
        </Menu.Item>
      </SubMenu>

      {/* <SubMenu key="courses" icon={!topMenu && <FeatherIcon icon="home" />} title="Courses"> */}
      <SubMenu key="courses" title="Courses" onTitleClick={() => history.push(`${path}/courses`)} icon={!topMenu && <FeatherIcon icon="feather" />}>
        <Menu.Item key="courses" icon={!topMenu && <FeatherIcon icon="feather"  />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/courses`}>
            Swayam Courses
          </NavLink>
        </Menu.Item>
        <Menu.Item key="partnercourses" icon={!topMenu && <FeatherIcon icon="feather" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/courses/partnercourses`}>
            Partner Courses
          </NavLink>
        </Menu.Item>
        <Menu.Item key="coursecategory" icon={!topMenu && <FeatherIcon icon="feather" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/courses/coursecategory`}>
            Course Category
          </NavLink>
        </Menu.Item>

        <Menu.Item key="courserating" icon={!topMenu && <FeatherIcon icon="feather" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/courses/courserating`}>
            Course Rating
          </NavLink>
        </Menu.Item>

      </SubMenu >
      {/* <Menu.Item key="testimonial">
        <NavLink onClick={toggleCollapsed} to={`${path}/testimonial`}>
          Testimonial
        </NavLink>
      </Menu.Item> */}

      <SubMenu key="user" title="Users" onTitleClick={() => history.push(`${path}/user`)} icon={!topMenu && <FeatherIcon icon="users" />}>
        {/* <Menu.Item key="user">
          <NavLink onClick={toggleCollapsed} to={`${path}/user`}>
            User
          </NavLink>
        </Menu.Item> */}

        <Menu.Item key="user" icon={!topMenu && <FeatherIcon icon="user" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/user`}>
            User
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="userrating">
          <NavLink onClick={toggleCollapsed} to={`${path}/user/userrating`}>
            User Rating
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="partner" icon={!topMenu && <FeatherIcon icon="user-plus" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/user/partner`}>
            Partner
          </NavLink>
        </Menu.Item>
        <Menu.Item key="employer" icon={!topMenu && <FeatherIcon icon="user" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/user/employer`}>
            Employer
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="employerrating">
          <NavLink onClick={toggleCollapsed} to={`${path}/user/employerrating`}>
            Employer Rating
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="useradmin" icon={!topMenu && <FeatherIcon icon="user" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/user/useradmin`}>
            Admin
          </NavLink>
        </Menu.Item>
        <Menu.Item key="superadmin" icon={!topMenu && <FeatherIcon icon="user" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/user/superadmin`}>
            SuperAdmin
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

      <SubMenu key="layout" title="Layout" icon={!topMenu && <FeatherIcon icon="layout" />}>
        <Menu.Item key="banner" icon={!topMenu && <FeatherIcon icon="disc" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/banner`} >
            Banner
          </NavLink>
        </Menu.Item>
        <Menu.Item key="carousel" icon={!topMenu && <FeatherIcon icon="sidebar" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/carousel`} >
            Carousel
          </NavLink>
        </Menu.Item>
        <Menu.Item key="testimonial" icon={!topMenu && <FeatherIcon icon="codesandbox" />}>
          <NavLink onClick={toggleCollapsed} to={`${path}/testimonial`} >
            Testimonial
          </NavLink>
        </Menu.Item>
      </SubMenu>

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
