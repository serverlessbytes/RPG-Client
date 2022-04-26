/* eslint-disable no-shadow */
import React, { Component, createElement, useEffect } from 'react';
import { Layout, Button, Row, Col, Select, Form } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { NavLink, Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { ThemeProvider } from 'styled-components';
import { connect, useDispatch } from 'react-redux';
import propTypes from 'prop-types';
import MenueItems from './MenueItems';
import TopMenu from './TopMenu';
import { Div, SmallScreenAuthInfo, SmallScreenSearch, TopMenuSearch } from './style';
import HeaderSearch from '../components/header-search/header-search';
import AuthInfo from '../components/utilities/auth-info/info';
import axios from 'axios';
import { ApiGet } from '../helper/API/ApiData';
import AuthStorage from '../helper/AuthStorage';
import STORAGEKEY from '../config/APP/app.config';
// import { ApiGet } from '../../helper/API/ApiData';

const { darkTheme } = require('../config/theme/themeVariables');

const { Header, Footer, Sider, Content } = Layout;
// const { darkMode } = config;

const ThemeLayout = WrappedComponent => {
  class LayoutComponent extends Component {
    constructor(props) {
      super(props);
      const storageLang = AuthStorage.getStorageData(STORAGEKEY.language)
      this.state = {
        collapsed: false,
        hide: true,
        searchHide: true,
        activeSearch: false,
        langData: [],
        lang: storageLang ? storageLang : ""
        //lang:  ""
      };
      this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
      const ls = localStorage.getItem('language');
      if (ls) {
        this.setState({ ...this.state, lang: ls })
      }
      window.addEventListener('resize', this.updateDimensions);
      this.updateDimensions();
      ApiGet(`language/getLanguage`).then((res) => {
        this.setState({
          langData: res.data
        });
        if (!ls) {
          this.setState({ ...this.state, lang: res.data[0].id })
          AuthStorage.setStorageData(STORAGEKEY.language, res.data[0].id, true)
        }
      })
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.langData !== this.state.langData) {
        let lang = this.state.langData.find((item) => item.id === AuthStorage.getStorageData(STORAGEKEY.language))
        // console.log("getStorageData(STORAGEKEY.language)",AuthStorage.getStorageData(STORAGEKEY.language));
        if (lang) {
          this.setState({ ...this.state, lang: lang.id })
        }
      }

    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
      this.setState({
        collapsed: window.innerWidth <= 1200 && true,
      });
    }



    render() {
      const { collapsed, hide, searchHide, activeSearch } = this.state;
      const { ChangeLayoutMode, rtl, topMenu } = this.props;

      const left = !rtl ? 'left' : 'right';
      const darkMode = ChangeLayoutMode;
      const toggleCollapsed = () => {
        this.setState({
          collapsed: !collapsed,
        });
      };

      const toggleCollapsedMobile = () => {
        if (window.innerWidth <= 990) {
          this.setState({
            collapsed: !collapsed,
          });
        }
      };

      const onShowHide = () => {
        this.setState({
          hide: !hide,
          searchHide: true,
        });
      };

      const toggleSearch = () => {
        this.setState({
          activeSearch: !activeSearch,
        });
      };

      const handleSearchHide = e => {
        e.preventDefault();
        this.setState({
          searchHide: !searchHide,
          hide: true,
        });
      };

      const handleChange = (e) => {
        if (e) {
          AuthStorage.setStorageData(STORAGEKEY.language, e, true)
          this.setState({ lang: e })
          window.location.reload(false);
        }
      }

      const footerStyle = {
        padding: '20px 30px 18px',
        color: 'rgba(0, 0, 0, 0.65)',
        fontSize: '14px',
        background: 'rgba(255, 255, 255, .90)',
        width: '100%',
        boxShadow: '0 -5px 10px rgba(146,153,184, 0.05)',
      };

      const SideBarStyle = {
        margin: '63px 0 0 0',
        padding: '15px 15px 55px 15px',
        overflowY: 'auto',
        height: '100vh',
        position: 'fixed',
        [left]: 0,
        zIndex: 998,
      };



      const renderView = ({ style, ...props }) => {
        const customStyle = {
          marginRight: 'auto',
          [rtl ? 'marginLeft' : 'marginRight']: '-17px',
        };
        return <div {...props} style={{ ...style, ...customStyle }} />;
      };

      const renderThumbVertical = ({ style, ...props }) => {
        const { ChangeLayoutMode } = this.props;
        const thumbStyle = {
          borderRadius: 6,
          backgroundColor: ChangeLayoutMode ? '#ffffff16' : '#F1F2F6',
          [left]: '2px',
        };
        return <div style={{ ...style, ...thumbStyle }} props={props} />;
      };

      const renderTrackVertical = () => {
        const thumbStyle = {
          position: 'absolute',
          width: '6px',
          transition: 'opacity 200ms ease 0s',
          opacity: 0,
          [rtl ? 'left' : 'right']: '2px',
          bottom: '2px',
          top: '2px',
          borderRadius: '3px',
        };
        return <div style={thumbStyle} />;
      };

      const renderThumbHorizontal = ({ style, ...props }) => {
        const { ChangeLayoutMode } = this.props;
        const thumbStyle = {
          borderRadius: 6,
          backgroundColor: ChangeLayoutMode ? '#ffffff16' : '#F1F2F6',
        };
        return <div style={{ ...style, ...thumbStyle }} props={props} />;
      };

      return (
        <Div darkMode={darkMode}>
          <Layout className="layout">
            <Header
              style={{
                position: 'fixed',
                width: '100%',
                top: 0,
                [!rtl ? 'left' : 'right']: 0,
              }}
            >
              <Row style={{justifyContent:"space-between"}}>
                <Col lg={!topMenu ? 4 : 3} sm={6} xs={12} className="align-center-v navbar-brand">
                  {!topMenu || window.innerWidth <= 991 ? (
                    <Button type="link" onClick={toggleCollapsed}>
                      <img src={require(`../static/img/icon/${collapsed ? 'right.svg' : 'left.svg'}`)} alt="menu" />
                    </Button>
                  ) : null}
                  <Link
                    className={topMenu && window.innerWidth > 991 ? 'striking-logo top-menu' : 'striking-logo'}
                    to="/admin"
                  >
                    <img
                      src={!darkMode ? require(`../static/img/Logo_Dark.svg`) : require(`../static/img/Logo_white.png`)}
                      alt=""
                    />
                  </Link>
                </Col>

                {/* <Col lg={!topMenu ? 14 : 15} md={8} sm={0} xs={0}>
                  {topMenu && window.innerWidth > 991 ? <TopMenu /> :
                  <HeaderSearch rtl={rtl} darkMode={darkMode} 
                  />}
                </Col> */}

                <Col lg={18}>
                  <Row style={{justifyContent:"flex-end", alignItems: "center"}}>
                    <Col lg={2} md={10} sm={0} xs={0}>
                      <Form.Item name="languageId" className='language py-16 mb-0'>
                        <Select defaultValue={this.state.lang} placeholder="Language" size="small" onChange={(e) => handleChange(e)} className="sDash_fullwidth-select" >
                          {this.state.langData && this.state.langData.map((items) => (
                            <Option value={items.id}>{items.name}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col lg={1} md={1} sm={0} xs={0}>
                      {topMenu && window.innerWidth > 991 ? (
                        <TopMenuSearch>
                          <div className="top-right-wrap d-flex">
                            <Link
                              className={`${activeSearch ? 'search-toggle active' : 'search-toggle'}`}
                              onClick={() => {
                                toggleSearch();
                              }}
                              to="#"
                            >
                              <FeatherIcon icon="search" />
                              <FeatherIcon icon="x" />
                            </Link>
                            <div className={`${activeSearch ? 'topMenu-search-form show' : 'topMenu-search-form'}`}>
                              <form action="">
                                <span className="search-icon">
                                  <FeatherIcon icon="search" />
                                </span>
                                <input type="text" name="search" />
                              </form>
                            </div>
                            <AuthInfo />
                          </div>
                        </TopMenuSearch>
                      ) : (
                        <AuthInfo />
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col md={0} sm={18} xs={12}>
                  <>
                    <div className="mobile-action">
                      <Link className="btn-search" onClick={handleSearchHide} to="#">
                        {searchHide ? <FeatherIcon icon="search" /> : <FeatherIcon icon="x" />}
                      </Link>
                      <Link className="btn-auth" onClick={onShowHide} to="#">
                        <FeatherIcon icon="more-vertical" />
                      </Link>
                    </div>
                  </>
                </Col>
              </Row>
            </Header>
            <div className="header-more">
              <Row>
                <Col md={0} sm={24} xs={24}>
                  <div className="small-screen-headerRight">
                    <SmallScreenSearch hide={searchHide} darkMode={darkMode}>
                      <HeaderSearch rtl={rtl} />
                    </SmallScreenSearch>
                    <SmallScreenAuthInfo hide={hide} darkMode={darkMode}>
                      <AuthInfo rtl={rtl} />
                    </SmallScreenAuthInfo>
                  </div>
                </Col>
              </Row>
            </div>
            <Layout>
              {!topMenu || window.innerWidth <= 991 ? (
                <ThemeProvider theme={darkTheme}>
                  <Sider width={280} style={SideBarStyle} collapsed={collapsed} theme={!darkMode ? 'light' : 'dark'}>
                    <Scrollbars
                      className="custom-scrollbar"
                      autoHide
                      autoHideTimeout={500}
                      autoHideDuration={200}
                      renderThumbHorizontal={renderThumbHorizontal}
                      renderThumbVertical={renderThumbVertical}
                      renderView={renderView}
                      renderTrackVertical={renderTrackVertical}
                    >
                      <p className="sidebar-nav-title">MAIN MENU</p>
                      <MenueItems
                        topMenu={topMenu}
                        rtl={rtl}
                        toggleCollapsed={toggleCollapsedMobile}
                        darkMode={darkMode}
                      />
                    </Scrollbars>
                  </Sider>
                </ThemeProvider>
              ) : null}
              <Layout className="atbd-main-layout">
                <Content>
                  <WrappedComponent {...this.props} />
                  <Footer className="admin-footer" style={footerStyle}>
                    <Row>
                      <Col md={12} xs={24}>
                        {/* <span className="admin-footer__copyright">2022 © SovWare</span> */}
                      </Col>
                      <Col md={12} xs={24}>
                        <div className="admin-footer__links">
                          <NavLink to="#">About</NavLink>
                          <NavLink to="#">Team</NavLink>
                          <NavLink to="#">Contact</NavLink>
                        </div>
                      </Col>
                    </Row>
                  </Footer>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </Div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      ChangeLayoutMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
    };
  };

  LayoutComponent.propTypes = {
    ChangeLayoutMode: propTypes.bool,
    rtl: propTypes.bool,
    topMenu: propTypes.bool,
    changeRtl: propTypes.func,
    changeLayout: propTypes.func,
    changeMenuMode: propTypes.func,
  };

  return connect(mapStateToProps)(LayoutComponent);
};
export default ThemeLayout;
