import actions from './actions';

const {

  POST_CATEGORY_BEGINE,
  POST_CATEGORY_SUCCESS,
  POST_CATEGORY_ERR,

  GET_CATEGORY_BEGINE,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_ERR,

  GET_COURSEFILTER_BEGINE,
  GET_COURSEFILTER_SUCCESS,
  GET_COURSEFILTER_ERR,

  EDIT_COURSEFILTER_BEGINE,
  EDIT_COURSEFILTER_SUCCESS,
  EDIT_COURSEFILTER_ERR,

} = actions;

const initialState = {
  data: null,
  loading: false,
  error: null,
  postcategoryData: null,
  categoryData: null,
  courseFilterData: null,
  editFilterData: null,
};

const cateGoryReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  console.log("data ============ data", data);
  switch (type) {
    case POST_CATEGORY_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case POST_CATEGORY_SUCCESS:
      return {
        ...state,
        postcategoryData: data,
        loading: false,
      };
    case POST_CATEGORY_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case GET_CATEGORY_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryData: data,
        loading: false,
      };
    case GET_CATEGORY_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case GET_COURSEFILTER_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GET_COURSEFILTER_SUCCESS:
      return {
        ...state,
        courseFilterData: data,
        loading: false,
      };
    case GET_COURSEFILTER_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case EDIT_COURSEFILTER_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case EDIT_COURSEFILTER_SUCCESS:
      return {
        ...state,
        editFilterData: data,
        loading: false,
      };
    case EDIT_COURSEFILTER_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    default:
      return state;
  }
};

export default cateGoryReducer;
