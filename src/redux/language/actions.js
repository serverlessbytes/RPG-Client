const actions = {
  CART_DATA_BEGIN: 'CART_DATA_BEGIN',
  CART_DATA_SUCCESS: 'CART_DATA_SUCCESS',
  CART_DATA_ERR: 'CART_DATA_ERR',

  CART_UPDATE_BEGIN: 'CART_UPDATE_BEGIN',
  CART_UPDATE_SUCCESS: 'CART_UPDATE_SUCCESS',
  CART_UPDATE_ERR: 'CART_UPDATE_ERR',

  CART_DELETE_BEGIN: 'CART_DELETE_BEGIN',
  CART_DELETE_SUCCESS: 'CART_DELETE_SUCCESS',
  CART_DELETE_ERR: 'CART_DELETE_ERR',

  POST_LANGUAGE_BEGINE: "POST_LANGUAGE_BEGINE",
  POST_LANGUAGE_SUCCESS: "POST_LANGUAGE_SUCCESS",
  POST_LANGUAGE_ERR: "POST_LANGUAGE_ERR",

  GET_LANGUAGE_BEGINE: "GET_LANGUAGE_BEGINE",
  GET_LANGUAGE_SUCCESS: "GET_LANGUAGE_SUCCESS",
  GET_LANGUAGE_ERR: "GET_LANGUAGE_ERR",

  GET_LANGUAGE_BY_NAME_BEGINE: "GET_LANGUAGE_BY_NAME_BEGINE",
  GET_LANGUAGE_BY_NAME_SUCCESS: "GET_LANGUAGE_BY_NAME_SUCCESS",
  GET_LANGUAGE_BY_NAME__ERR: "GET_LANGUAGE_BY_NAME_ERR",



  postLanguageBegin: () => {
    return {
      type: actions.POST_LANGUAGE_BEGINE,
    };
  },

  postLanguageSuccess: data => {
    return {
      type: actions.POST_LANGUAGE_SUCCESS,
      data,
    };
  },

  postLanguageDataErr: err => {
    return {
      type: actions.POST_LANGUAGE_ERR,
      err,
    };
  },

  getLanguageBegin: () => {
    return {
      type: actions.GET_LANGUAGE_BEGINE,
    };
  },

  getLanguageSuccess: data => {
    return {
      type: actions.GET_LANGUAGE_SUCCESS,
      data,
    };
  },

  getLanguageErr: err => {
    return {
      type: actions.GET_LANGUAGE_ERR,
      err,
    };
  },

  cartUpdateBegin: () => {
    return {
      type: actions.CART_UPDATE_BEGIN,
    };
  },

  cartUpdateSuccess: data => {
    return {
      type: actions.CART_UPDATE_SUCCESS,
      data,
    };
  },

  cartUpdateErr: err => {
    return {
      type: actions.CART_UPDATE_ERR,
      err,
    };
  },

  cartDeleteBegin: () => {
    return {
      type: actions.CART_DELETE_BEGIN,
    };
  },

  cartDeleteSuccess: data => {
    return {
      type: actions.CART_DELETE_SUCCESS,
      data,
    };
  },

  cartDeleteErr: err => {
    return {
      type: actions.CART_DELETE_ERR,
      err,
    };
  },

  getLanguageByNameBegin: () => {
    return {
      type: actions.GET_LANGUAGE_BY_NAME_BEGINE
    };
  },
  getLanguageByNameSuccess: data => {
    return {
      type: actions.GET_LANGUAGE_BY_NAME_SUCCESS,
      data,
    };
  },
  getLanguageByNameErr: () => {
    return {
      type: actions.GET_LANGUAGE_BY_NAME__ERR
    }
  }
};

export default actions;
