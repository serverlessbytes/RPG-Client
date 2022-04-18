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

  GET_JOBROLE_BEGINE,
  GET_JOBROLE_SUCCESS,
  GET_JOBROLE_ERR,

  ADD_JOBROLE_BEGINE,
  ADD_JOBROLE_SUCCESS,
  ADD_JOBROLE_ERR,

  EDIT_JOBROLE_BEGINE,
  EDIT_JOBROLE_SUCCESS,
  EDIT_JOBROLE_ERR,

  ADD_JOBPOST_BEGINE,
  ADD_JOBPOST_SUCCESS,
  ADD_JOBPOST_ERR,

  GET_JOBPOST_BEGINE,
  GET_JOBPOST_SUCCESS,
  GET_JOBPOST_ERR,

  GETONE_JOBPOST_BEGINE,
  GETONE_JOBPOST_SUCCESS,
  GETONE_JOBPOST_ERR,

} = actions;

const initialState = {
  loading: false,
  error: null,
  jobCatogeryData: null,
  addJobCatogeryData: null,
  editJobCatogeryData: null,
  jobRoleData: null,
  addJobRoleData: null,
  editJobRoleData: null,
  addJobPostData : null,
  getJobPostData : null,
  getOneJobPostData : null,
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
      // console.log("datareducer",data)
      return {
        ...state,
        jobCatogeryData: data,
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


    case GET_JOBROLE_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GET_JOBROLE_SUCCESS:
      return {
        ...state,
        jobRoleData: data.data,
        loading: false,
      };
    case GET_JOBROLE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case ADD_JOBROLE_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case ADD_JOBROLE_SUCCESS:
      return {
        ...state,
        addJobRoleData: data,
        loading: false,
      };
    case ADD_JOBROLE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case EDIT_JOBROLE_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case EDIT_JOBROLE_SUCCESS:
      return {
        ...state,
        editJobRoleData: data,
        loading: false,
      };
    case EDIT_JOBROLE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

      case ADD_JOBPOST_BEGINE:
        return {
          ...state,
          loading: true,
        };
      case ADD_JOBPOST_SUCCESS:
        return {
          ...state,
          addJobPostData: data,
          loading: false,
        };
      case ADD_JOBPOST_ERR:
        return {
          ...state,
          error: err,
          loading: false,
        };

        case GET_JOBPOST_BEGINE:
          return {
            ...state,
            loading: true,
          };
        case GET_JOBPOST_SUCCESS:
          return {
            ...state,
            getJobPostData: data,
            loading: false,
          };
        case GET_JOBPOST_ERR:
          return {
            ...state,
            error: err,
            loading: false,
          };

          case GETONE_JOBPOST_BEGINE:
            return {
              ...state,
              loading: true,
            };
          case GETONE_JOBPOST_SUCCESS:
            return {
              ...state,
              getOneJobPostData: data,
              loading: false,
            };
          case GETONE_JOBPOST_ERR:
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