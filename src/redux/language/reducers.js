import actions from './actions';

const {
  CART_DATA_BEGIN,
  CART_DATA_SUCCESS,
  CART_DATA_ERR,

  CART_UPDATE_BEGIN,
  CART_UPDATE_SUCCESS,
  CART_UPDATE_ERR,

  CART_DELETE_BEGIN,
  CART_DELETE_SUCCESS,
  CART_DELETE_ERR,

  POST_LANGUAGE_BEGINE,
  POST_LANGUAGE_SUCCESS,
  POST_LANGUAGE_ERR,

  GET_LANGUAGE_BEGINE,
  GET_LANGUAGE_SUCCESS,
  GET_LANGUAGE_ERR,

  GET_LANGUAGE_BY_NAME_BEGINE,
  GET_LANGUAGE_BY_NAME_SUCCESS,
  GET_LANGUAGE_BY_NAME_ERR

} = actions;

const initialState = {
  data: null,
  loading: false,
  error: null,
  LanguageError: null,
  postLanguageData: null,
  getLanguageData: null

};

const languageReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case POST_LANGUAGE_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case POST_LANGUAGE_SUCCESS:
      return {
        ...state,
        postLanguageData: data,
        loading: false,
      };
    case POST_LANGUAGE_ERR:
      return {
        ...state,
        LanguageError: err,
        loading: false,
      };
    case GET_LANGUAGE_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GET_LANGUAGE_SUCCESS:
      return {
        ...state,
        getLanguageData: data,
        loading: false,
      };
    case GET_LANGUAGE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case CART_UPDATE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CART_UPDATE_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
      };
    case CART_UPDATE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case CART_DELETE_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CART_DELETE_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
      };
    case CART_DELETE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case GET_LANGUAGE_BY_NAME_BEGINE:
      return {
        ...state,
        loading: true,
      }
    case GET_LANGUAGE_BY_NAME__SUCCESS:
      return {
        ...state,
        data,
        loading: false,
      }
    case GET_LANGUAGE_BY_NAME__ERR:
      return {
        ...state,
        error: err,
        loading: false,
      }


    default:
      return state;
  }
};

export default languageReducer;
