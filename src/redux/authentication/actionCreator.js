import Cookies from 'js-cookie';
import STORAGEKEY from '../../config/APP/app.config';
import { ApiGet, ApiPost, ApiPostNoAuth } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import actions from './actions';
import { getLanguageByName } from '../language/actionCreator';

const {
  loginSuccess,
  logoutBegin,
  logoutSuccess,
  logoutErr,
  signUpSuccess,
  getUserSuccess,
  editProfileSuccess,
  editProfileErr,

} = actions;

const login = (body, keepSignIn) => async dispatch => {
  await ApiPostNoAuth('user/auth/login', body)
    .then(res => {
      if (res.message === 'user logged') {

        if (keepSignIn) {
          AuthStorage.setStorageData(STORAGEKEY.token, res.data?.token, keepSignIn);
        } else {
          AuthStorage.setStorageData(STORAGEKEY.token, res.data?.token, false);
        }
        dispatch(getLanguageByName())
        return dispatch(loginSuccess(res));
      }
    })
    .catch(e => {
      console.log('errpor  === ', e);
      if (e === 'incorrect password') {
        return dispatch(loginSuccess(false));
      } else if (e === 'incorrect password') {
        return dispatch(loginSuccess(false));
      } else {
        return dispatch(loginSuccess(false));
      }
    });
};

const logOut = () => {
  return async dispatch => {
    try {
      dispatch(logoutBegin());
      Cookies.remove('logedIn');
      dispatch(logoutSuccess(null));
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

const signUp = body => async dispatch => {
  await ApiPostNoAuth('user/auth/signup', body).then(res => {
    if (res.message === 'user created') {
      return dispatch(signUpSuccess(res));
    }
  });
};

const getUser = () => async dispatch => {
  await ApiGet('user/auth/getUser').then(res => {
    return dispatch(getUserSuccess(res));
  });
};

const editUser = (data, id) => async dispatch => {

  const formData = new FormData();
  formData.append('avatar', data.avatar);
  formData.append('email', data.email);
  formData.append('isActive', data.isActive);
  formData.append('isDeleted', data.isDeleted);
  formData.append('name', data.name);
  formData.append('phone', data.phone);
  await ApiPost(`user/auth/editProfile?id=${id}`, formData).then(res => {
    dispatch(editProfileSuccess(res))
    if (res.status === 200) {
      dispatch(getUser())
    }
  })
    .catch((err) => dispatch(editProfileErr(err)))
};

export { login, logOut, signUp, getUser, editUser };
