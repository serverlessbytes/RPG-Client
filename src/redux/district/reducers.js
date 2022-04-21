import actions from './actions';

const {


  POST_DISTRICT_BEGINE,
  POST_DISTRICT_SUCCESS,
  POST_DISTRICT_ERR,

  GET_DISTRICT_BEGINE,
  GET_DISTRICT_SUCCESS,
  GET_DISTRICT_ERR,

} = actions;

const initialState = {
  data: null,
  loading: false,
  error: null,
  postDistrictData:null,
  getDistrictData:null,
};

const districtReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case POST_DISTRICT_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case POST_DISTRICT_SUCCESS:
      return {
        ...state,
        postDistrictData:data,
        loading: false,
      };
    case POST_DISTRICT_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    
      case GET_DISTRICT_BEGINE:
        return {
          ...state,
          loading: true,
        };
      case GET_DISTRICT_SUCCESS:
        return {
          ...state,
          getDistrictData:data,
          loading: false,
        };
      case GET_DISTRICT_ERR:
        return {
          ...state,
          error: err,
          loading: false,
        };
    default:
      return state;
  }
};

export default districtReducer;
