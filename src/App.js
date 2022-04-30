import React, { useContext, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import store from './redux/store';
import Admin from './routes/admin';
import Auth from './routes/auth';
import './static/css/style.css';
import 'react-toastify/dist/ReactToastify.css';
import config from './config/config';
import ProtectedRoute from './components/utilities/protectedRoute';
import AuthStorage from './helper/AuthStorage';
import STORAGEKEY from './config/APP/app.config';
import actions from './redux/authentication/actions';
import { useHistory } from "react-router-dom";
import { RouterContext, RouterProvider } from './utility/routerContext';
import { ToastContainer } from "react-toastify";
import { toast } from 'react-toastify';

const { theme } = config;

const ProviderConfig = ({ basename }) => {
  const { rtl, isLoggedIn, topMenu, darkMode } = useSelector(state => {
    return {
      darkMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      isLoggedIn: state.auth.login,
    };
  });

  //useEffect(()=>{"isLoggedIn",isLoggedIn},[isLoggedIn])
  const history = useHistory();
  const route = useContext(RouterContext);
  const dispatch = useDispatch()

  const { loginSuccess } = actions;

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }

    // eslint-disable-next-line no-return-assign
    return () => (unmounted = true);
  }, [setPath]);

  useEffect(()=>{
  if(isLoggedIn === true){
    toast.success("Login successful");
  }
  // else{
  //   toast.error("Login Unsuccessful !");
  // }
  },[isLoggedIn])

  useEffect(() => {
    if (AuthStorage.getToken()) {
      dispatch(loginSuccess(true));
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      if (path === process.env.PUBLIC_URL || path === `${process.env.PUBLIC_URL}/`) {
        if (route.from === "/") {
          // toast.success("Login successful");
          history.push("/admin");
        } else {
          history.push(route.from);
        }
      }
    }
  }, [isLoggedIn])

  return (
    <ConfigProvider direction={rtl ? 'rtl' : 'ltr'}>
      <ThemeProvider theme={{ ...theme, rtl, topMenu, darkMode }}>
        {!isLoggedIn ? <Route path="/" component={Auth} /> : <ProtectedRoute path="/admin" component={Admin} />}
        {/* {isLoggedIn && (path === process.env.PUBLIC_URL || path === `${process.env.PUBLIC_URL}/`) && (
            <Redirect to="/admin" />
          )} */}
      </ThemeProvider>
    </ConfigProvider >
  );
};

function App() {
  return (
    
    <Provider store={store}>
       <ToastContainer />
      <Router basename={process.env.PUBLIC_URL}>
        <RouterProvider>
          <ProviderConfig basename={process.env.PUBLIC_URL} />
        </RouterProvider>
      </Router>
    </Provider>
  );
}

export default hot(App);
