const actions = {

  GET_DASHBOARD_COURSE_DATA_BEGIN:'GET_DASHBOARD_COURSE_DATA_BEGIN',
  GET_DASHBOARD_COURSE_DATA_SUCCESS:'GET_DASHBOARD_COURSE_DATA_SUCCESS',
  GET_DASHBOARD_COURSE_DATA_ERR:'GET_DASHBOARD_COURSE_DATA_ERR',

  GET_DASHBOARD_USER_DATA_BEGIN:'GET_DASHBOARD_USER_DATA_BEGIN',
  GET_DASHBOARD_USER_DATA_SUCCESS:'GET_DASHBOARD_USER_DATA_SUCCESS',
  GET_DASHBOARD_USER_DATA_ERR:'GET_DASHBOARD_USER_DATA_ERR',

  GET_TOP_TEN_COURSE_DATA_BEGIN:'GET_TOP_TEN_COURSE_DATA_BEGIN',
  GET_TOP_TEN_COURSE_DATA_SUCCESS:'GET_TOP_TEN_COURSE_DATA_SUCCESS',
  GET_TOP_TEN_COURSE_DATA_ERR:'GET_TOP_TEN_COURSE_DATA_ERR',

  GET_TOP_TEN_SCHEMES_DATA_BEGIN:'GET_TOP_TEN_SCHEMES_DATA_BEGIN',
  GET_TOP_TEN_SCHEMES_DATA_SUCCESS:'GET_TOP_TEN_SCHEMES_DATA_SUCCESS',
  GET_TOP_TEN_SCHEMES_DATA_ERR:'GET_TOP_TEN_SCHEMES_DATA_ERR',

  GET_TOP_TEN_JOBS_DATA_BEGIN:'GET_TOP_TEN_JOBS_DATA_BEGIN',
  GET_TOP_TEN_JOBS_DATA_SUCCESS:'GET_TOP_TEN_JOBS_DATA_SUCCESS',
  GET_TOP_TEN_JOBS_DATA_ERR:'GET_TOP_TEN_JOBS_DATA_ERR',

  getDashboardCourseBegin: () => {
    return {
      type: actions.GET_DASHBOARD_COURSE_DATA_BEGIN,
    };
  },

  getDashboardCourseSuccess: data => {
    return {
      type: actions.GET_DASHBOARD_COURSE_DATA_SUCCESS,
      data,
    };
  },

  getDashboardCourseErr: err => {
    return {
      type: actions.GET_DASHBOARD_COURSE_DATA_ERR,
      err,
    };
  },



  getDashboardUserBegin: () => {
    return {
      type: actions.GET_DASHBOARD_USER_DATA_BEGIN,
    };
  },

  getDashboardUserSuccess: data => {
    return {
      type: actions.GET_DASHBOARD_USER_DATA_SUCCESS,
      data,
    };
  },

  getDashboardUserErr: err => {
    return {
      type: actions.GET_DASHBOARD_USER_DATA_ERR,
      err,
    };
  },



  getTopTenCourseBegin: () => {
    return {
      type: actions.GET_TOP_TEN_COURSE_DATA_BEGIN,
    };
  },

  getTopTenCourseSuccess: data => {
    return {
      type: actions.GET_TOP_TEN_COURSE_DATA_SUCCESS,
      data,
    };
  },

  getTopTenCourseErr: err => {
    return {
      type: actions.GET_TOP_TEN_COURSE_DATA_ERR,
      err,
    };
  },


  getTopTenSchemeBegin: () => {
    return {
      type: actions.GET_TOP_TEN_SCHEMES_DATA_BEGIN,
    };
  },

  getTopTenSchemeSuccess: data => {
    return {
      type: actions.GET_TOP_TEN_SCHEMES_DATA_SUCCESS,
      data,
    };
  },

  getTopTenSchemeErr: err => {
    return {
      type: actions.GET_TOP_TEN_SCHEMES_DATA_ERR,
      err,
    };
  },

  getTopTenJobsBegin: () => {
    return {
      type: actions.GET_TOP_TEN_JOBS_DATA_BEGIN,
    };
  },

  getTopTenJobSuccess: data => {
    return {
      type: actions.GET_TOP_TEN_JOBS_DATA_SUCCESS,
      data,
    };
  },

  getTopTenJobErr: err => {
    return {
      type: actions.GET_TOP_TEN_JOBS_DATA_ERR,
      err,
    };
  },

};

export default actions;
