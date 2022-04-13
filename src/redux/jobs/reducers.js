import actions from "./actions";

const {
  GET_JOBCATEGOTRY_BEGINE,
  GET_JOBCATEGOTRY_SUCCESS,
  GET_JOBCATEGOTRY_ERR,

  ADD_JOBCATEGOTRY_BEGINE,
  ADD_JOBCATEGOTRY_SUCCESS,
  ADD_JOBCATEGOTRY_ERR,

  EDIT_JOBCATEGOTRY_BEGINE,
  EDIT_JOBCATEGOTRY_SUCCESS,
  EDIT_JOBCATEGOTRY_ERR,

} = actions;

const initialState = {
  loading: false,
  error: null,
  jobCatogeryData: null,
  addJobCatogeryData: null,
  editJobCatogeryData: null,
};

const jobReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case GET_JOBCATEGOTRY_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GET_JOBCATEGOTRY_SUCCESS:
      return {
        ...state,
        jobcatogeryData: data,
        loading: false,
      };
    case GET_JOBCATEGOTRY_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case ADD_JOBCATEGOTRY_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case ADD_JOBCATEGOTRY_SUCCESS:
      return {
        ...state,
        addJobCatogeryData: data,
        loading: false,
      };
    case ADD_JOBCATEGOTRY_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case EDIT_JOBCATEGOTRY_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case EDIT_JOBCATEGOTRY_SUCCESS:
      return {
        ...state,
        editJobCatogeryData: data,
        loading: false,
      };
    case EDIT_JOBCATEGOTRY_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    
    default:
      return state;
  }
};

export default jobReducer;