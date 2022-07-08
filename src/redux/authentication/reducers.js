import Cookies from 'js-cookie';
import actions from './actions';

const { LOGIN_BEGIN, LOGIN_SUCCESS, LOGIN_ERR, LOGOUT_BEGIN, LOGOUT_SUCCESS, LOGOUT_ERR, SIGNUP_ERR, SIGNUP_BEGIN, SIGNUP_SUCCESS, GET_USER_BEGIN,
GET_USER_SUCCESS,GET_USER_ERR,
EDIT_PROFILE_BEGIN,
EDIT_PROFILE_SUCCESS,
EDIT_PROFILE_ERR,
} = actions;

const initState = {
  login: Cookies.get('logedIn'),
  //login:null,
  loading: false,
  error: null,
  signup:null,
  getUserData:null,
  editUserData:null,
  editProfileErr:null
};

/**
 *
 * @todo impure state mutation/explaination
 */
const AuthReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: data,
        loading: false,
      };
    case LOGIN_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case LOGOUT_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        login: data,
        loading: false,
      };
    case LOGOUT_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
      case SIGNUP_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
      case SIGNUP_BEGIN:
      return {
        ...state,
        error: err,
        loading: false,
      };
      case SIGNUP_SUCCESS:
      return {
        ...state,
        error: err,
        signup: data,
      };

      case GET_USER_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
      case GET_USER_BEGIN:
      return {
        ...state,
        error: err,
        loading: false,
      };
      case GET_USER_SUCCESS:
      return {
        ...state,
        error: err,
        getUserData: data,
      };

        case EDIT_PROFILE_BEGIN:
        return {
          ...state,
          error: err,
          loading: false,
        };
        case EDIT_PROFILE_SUCCESS:
        return {
          ...state,
          error: err,
          editUserData: data,
        };
        case EDIT_PROFILE_ERR:
          return {
            ...state,
            editProfileErr: err,
            loading: false,
          };

      
    default:
      return state;
  }
};
export default AuthReducer;
