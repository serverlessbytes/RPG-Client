const actions = {
  LOGIN_BEGIN: 'LOGIN_BEGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERR: 'LOGIN_ERR',

  LOGOUT_BEGIN: 'LOGOUT_BEGIN',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  LOGOUT_ERR: 'LOGOUT_ERR',

  SIGNUP_BEGIN: 'SIGNUP_BEGIN',
  SIGNUP_SUCCESS:'SIGNUP_SUCCESS',
  SIGNUP_ERR :'SIGNUP_ERR',

  GET_USER_BEGIN:'GET_USER_BEGIN',
  GET_USER_SUCCESS:'GET_USER_SUCCESS',
  GET_USER_ERR:'GET_USER_ERR',

  loginBegin: () => {
    return {
      type: actions.LOGIN_BEGIN,
    };
  },

  loginSuccess: data => {
    return {
      type: actions.LOGIN_SUCCESS,
      data,
    };
  },

  loginErr: err => {
    return {
      type: actions.LOGIN_ERR,
      err,
    };
  },

  logoutBegin: () => {
    return {
      type: actions.LOGOUT_BEGIN,
    };
  },

  logoutSuccess: data => {
    return {
      type: actions.LOGOUT_SUCCESS,
      data,
    };
  },

  logoutErr: err => {
    return {
      type: actions.LOGOUT_ERR,
      err,
    };
  },

  signUpBegin: () => {
    return {
      type: actions.SIGNUP_BEGIN,
    };
  },


  signUpSuccess: data =>{
    return{
      type: actions.SIGNUP_SUCCESS,
      data
    };
  },

  signUpErr: err => {
    return {
      type: actions.SIGNUP_ERR,
      err,
    };
  },

  getUserBegin: () => {
    return {
      type: actions.GET_USER_BEGIN,
    };
  },


  getUserSuccess: data =>{
    return{
      type: actions.GET_USER_SUCCESS,
      data
    };
  },

  getUserErr: err => {
    return {
      type: actions.GET_USER_ERR,
      err,
    };
  },

};

export default actions;
