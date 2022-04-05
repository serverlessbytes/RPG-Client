import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import SubMenu from 'antd/lib/menu/SubMenu';

const MenuItems = ({ darkMode, toggleCollapsed, topMenu }) => {
  const { path } = useRouteMatch();
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
      <Menu.Item key="home">
        <NavLink onClick={toggleCollapsed} to={`${path}`}>
          Dashboard
        </NavLink>
      </Menu.Item>

      <SubMenu key="dashboard" icon={!topMenu && <FeatherIcon icon="home" />} title="Jobs">
        <Menu.Item key="job">
          <NavLink onClick={toggleCollapsed} to={`${path}/job/dashboard`}>
            Jobs Dashboards
          </NavLink>
        </Menu.Item>
        <Menu.Item key="post">
          <NavLink onClick={toggleCollapsed} to={`${path}/job/post`}>
            Jobs Post
          </NavLink>
        </Menu.Item>
        <Menu.Item key="applications">
          <NavLink onClick={toggleCollapsed} to={`${path}/job/applications`}>
            Jobs Applications
          </NavLink>
        </Menu.Item>
        <Menu.Item key="category">
          <NavLink onClick={toggleCollapsed} to={`${path}/job/category`}>
            Jobs Category
          </NavLink>
        </Menu.Item>
        <Menu.Item key="role">
          <NavLink onClick={toggleCollapsed} to={`${path}/job/role`}>
            Jobs Role
          </NavLink>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="state">
        <NavLink onClick={toggleCollapsed} to={`${path}/state`}>
          State
        </NavLink>
      </Menu.Item>
      <Menu.Item key="language">
        <NavLink onClick={toggleCollapsed} to={`${path}/language`}>
          Language
        </NavLink>
      </Menu.Item>

      <SubMenu key="schemes" icon={!topMenu && <FeatherIcon icon="home" />} title="Schemes">
        <Menu.Item key="scheme">
          <NavLink onClick={toggleCollapsed} to={`${path}/scheme`}>
            Govt Schemes
          </NavLink>
        </Menu.Item>
        <Menu.Item key="addscheme">
          <NavLink onClick={toggleCollapsed} to={`${path}/scheme/addscheme`}>
            Add Govt Schemes
          </NavLink>
        </Menu.Item>
        <Menu.Item key="schemecategory">
          <NavLink onClick={toggleCollapsed} to={`${path}/scheme/schemecategory`}>
            Scheme Category
          </NavLink>
        </Menu.Item>
        <Menu.Item key="benefitstype">
          <NavLink onClick={toggleCollapsed} to={`${path}/scheme/benefitstype`}>
            Benefits Type
          </NavLink>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
};

export default MenuItems;