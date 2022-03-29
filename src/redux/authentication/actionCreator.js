import Cookies from 'js-cookie';
import STORAGEKEY from '../../config/APP/app.config';
import { ApiPostNoAuth } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import actions from './actions';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr,signUpErr, signUpSuccess, signUpBegin } = actions;

// const login = () => {
//   return async dispatch => {
//     try {
//       dispatch(loginBegin());
//       setTimeout(() => {
//         Cookies.set('logedIn', true);
//         return dispatch(loginSuccess(true));
//       }, 1000);
//     } catch (err) {
//       dispatch(loginErr(err));
//     }
//   };
// };

const login = (body,keepSignIn) => async (dispatch) => {
  await ApiPostNoAuth("user/auth/login", body)
    .then((res) => {
      if (res.message === "user logged") {
        if(keepSignIn) {
          AuthStorage.setStorageData(STORAGEKEY.token, res.data, true)
        } else {
          AuthStorage.setStorageData(STORAGEKEY.token, res.data, false)
        }
        return dispatch(loginSuccess(true));
      }
    })

    .catch((e) => {
      console.log("errpor  === ",e);
      if (e === "incorrect password") {
        // AuthStorage.setStorageData(STORAGEKEY.token, res.data)
        return dispatch(loginSuccess(false));
      }
      else if (e === "incorrect password") {
        // AuthStorage.setStorageData(STORAGEKEY.token, res.data)
        return dispatch(loginSuccess(false));
      }
      else {
        // AuthStorage.setStorageData(STORAGEKEY.token, res.data)
        return dispatch(loginSuccess(false));
      }
    })
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

const signUp = (body) => async(dispatch)=>{
  await ApiPostNoAuth("user/auth/signup", body)
  .then((res) =>{
    if(res.message === "user created"){

      return dispatch(signUpSuccess(res))
    }
  })
}





export { login, logOut, signUp };
