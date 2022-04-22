import actions from './actions';

const initialState = {
 dashBoardCourseData:null,
 dashBoardUserData:null,
 topTenCourseData:null,
 topTenSchemeData:null,
 topTenJobData:null,
};

const {

  GET_DASHBOARD_COURSE_DATA_BEGIN,
  GET_DASHBOARD_COURSE_DATA_SUCCESS,
  GET_DASHBOARD_COURSE_DATA_ERR,

  GET_DASHBOARD_USER_DATA_BEGIN,
  GET_DASHBOARD_USER_DATA_SUCCESS,
  GET_DASHBOARD_USER_DATA_ERR,

  GET_TOP_TEN_COURSE_DATA_BEGIN,
  GET_TOP_TEN_COURSE_DATA_SUCCESS,
  GET_TOP_TEN_COURSE_DATA_ERR,

  GET_TOP_TEN_SCHEMES_DATA_BEGIN,
  GET_TOP_TEN_SCHEMES_DATA_SUCCESS,
  GET_TOP_TEN_SCHEMES_DATA_ERR,

  GET_TOP_TEN_JOBS_DATA_BEGIN,
  GET_TOP_TEN_JOBS_DATA_SUCCESS,
  GET_TOP_TEN_JOBS_DATA_ERR,

} = actions;

const dashboardReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case GET_DASHBOARD_COURSE_DATA_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case GET_DASHBOARD_COURSE_DATA_SUCCESS:
      return {
        ...state,
        dashBoardCourseData:data,
        loading: false,
      };
    case GET_DASHBOARD_COURSE_DATA_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

      case GET_DASHBOARD_USER_DATA_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case GET_DASHBOARD_USER_DATA_SUCCESS:
        return {
          ...state,
          dashBoardUserData:data,
          loading: false,
        };
      case GET_DASHBOARD_USER_DATA_ERR:
        return {
          ...state,
          error: err,
          loading: false,
        };

      case GET_TOP_TEN_COURSE_DATA_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case GET_TOP_TEN_COURSE_DATA_SUCCESS:
        return {
          ...state,
          topTenCourseData:data,
          loading: false,
        };
      case GET_TOP_TEN_COURSE_DATA_ERR:
        return {
          ...state,
          error: err,
          loading: false,
        };

      case GET_TOP_TEN_SCHEMES_DATA_BEGIN:
        return {
          ...state,
          loading: true,
        };
      case GET_TOP_TEN_SCHEMES_DATA_SUCCESS:
        return {
          ...state,
          topTenSchemeData:data,
          loading: false,
        };
      case GET_TOP_TEN_SCHEMES_DATA_ERR:
        return {
          ...state,
          error: err,
          loading: false,
        };

      case GET_TOP_TEN_JOBS_DATA_BEGIN:
          return {
            ...state,
            loading: true,
          };
      case GET_TOP_TEN_JOBS_DATA_SUCCESS:
          return {
            ...state,
            topTenJobData:data,
            loading: false,
          };
      case GET_TOP_TEN_JOBS_DATA_ERR:
          return {
            ...state,
            error: err,
            loading: false,
          };

    default:
      return state;
  }
};

export default dashboardReducer;
