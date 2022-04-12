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

  POST_STATE_BEGINE,
  POST_STATE_SUCCESS,
  POST_STATE_ERR,

  GET_STATE_BEGINE,
  GET_STATE_SUCCESS,
  GET_STATE_ERR,

} = actions;

const initialState = {
  data: null,
  loading: false,
  error: null,
  postStateData:null,
  getStateData:null,
};

const stateReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case POST_STATE_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case POST_STATE_SUCCESS:
      return {
        ...state,
        postStateData:data,
        loading: false,
      };
    case POST_STATE_ERR:
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
      case GET_STATE_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GET_STATE_SUCCESS:
      return {
        ...state,
        getStateData:data,
        loading: false,
      };
    case GET_STATE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default stateReducer;
