const actions = {
  GET_JOBCATEGOTRY_BEGINE: "GET_JOBCATEGOTRY_BEGINE",
  GET_JOBCATEGOTRY_SUCCESS: "GET_JOBCATEGOTRY_SUCCESS",
  GET_JOBCATEGOTRY_ERR: "GET_JOBCATEGOTRY_ERR",

  ADD_JOBCATEGOTRY_BEGINE: "ADD_JOBCATEGOTRY_BEGINE",
  ADD_JOBCATEGOTRY_SUCCESS: "ADD_JOBCATEGOTRY_SUCCESS",
  ADD_JOBCATEGOTRY_ERR: "ADD_JOBCATEGOTRY_ERR",

  EDIT_JOBCATEGOTRY_BEGINE: "EDIT_JOBCATEGOTRY_BEGINE",
  EDIT_JOBCATEGOTRY_SUCCESS: "EDIT_JOBCATEGOTRY_SUCCESS",
  EDIT_JOBCATEGOTRY_ERR: "EDIT_JOBCATEGOTRY_ERR",

  GET_JOBROLE_BEGINE: "GET_JOBROLE_BEGINE",
  GET_JOBROLE_SUCCESS: "GET_JOBROLE_SUCCESS",
  GET_JOBROLE_ERR: "GET_JOBROLE_ERR",

  ADD_JOBROLE_BEGINE: "ADD_JOBROLE_BEGINE",
  ADD_JOBROLE_SUCCESS: "ADD_JOBROLE_SUCCESS",
  ADD_JOBROLE_ERR: "ADD_JOBROLE_ERR",

  EDIT_JOBROLE_BEGINE: "EDIT_JOBROLE_BEGINE",
  EDIT_JOBROLE_SUCCESS: "EDIT_JOBROLE_SUCCESS",
  EDIT_JOBROLE_ERR: "EDIT_JOBROLE_ERR",

  ADD_JOBPOST_BEGINE: "ADD_JOBPOST_BEGINE",
  ADD_JOBPOST_SUCCESS: "ADD_JOBPOST_SUCCESS",
  ADD_JOBPOST_ERR: "ADD_JOBPOST_ERR",

  GET_JOBPOST_BEGINE: "GET_JOBPOST_BEGINE",
  GET_JOBPOST_SUCCESS: "GET_JOBPOST_SUCCESS",
  GET_JOBPOST_ERR: "GET_JOBPOST_ERR",

  EDIT_JOBPOST_BEGINE: "EDIT_JOBPOST_BEGINE",
  EDIT_JOBPOST_SUCCESS: "EDIT_JOBPOST_SUCCESS",
  EDIT_JOBPOST_ERR: "EDIT_JOBPOST_ERR",

  GETONE_JOBPOST_BEGINE: "GETONE_JOBPOST_BEGINE",
  GETONE_JOBPOST_SUCCESS: "GETONE_JOBPOST_SUCCESS",
  GETONE_JOBPOST_ERR: "GETONE_JOBPOST_ERR",

  GET_JOBSFILTER_BEGINE: "GET_JOBSFILTER_BEGINE",
  GET_JOBSFILTER_SUCCESS: "GET_JOBSFILTER_SUCCESS",
  GET_JOBSFILTER_ERR: "GET_JOBSFILTER_ERR",

  GET_EMPLOYERDATA_BEGINE: "GET_EMPLOYERDATA_BEGINE",
  GET_EMPLOYERDATA_SUCCESS: "GET_EMPLOYERDATA_SUCCESS",
  GET_EMPLOYERDATA_ERR: "GET_EMPLOYERDATA_ERR",

  GET_ALLJOBS_BEGINE: "GET_ALLJOBS_BEGINE",
  GET_ALLJOBS_SUCCESS: "GET_ALLJOBS_SUCCESS",
  GET_ALLJOBS_ERR: "GET_ALLJOBS_ERR",

  GET_JOB_APPLICATION_BEGINE: "GET_JOB_APPLICATION_BEGINE",
  GET_JOB_APPLICATION_SUCCESS: "GET_JOB_APPLICATION_SUCCESS",
  GET_JOB_APPLICATION_ERR: "GET_JOB_APPLICATION_ERR",

  UPDATE_IS_SELECTED_JOB_APPLICATION_BEGINE: "UPDATE_IS_SELECTED_JOB_APPLICATION_BEGINE",
  UPDATE_IS_SELECTED_JOB_APPLICATION_SUCCESS: "UPDATE_IS_SELECTED_JOB_APPLICATION_SUCCESS",
  UPDATE_IS_SELECTED_JOB_APPLICATION_ERR: "UPDATE_IS_SELECTED_JOB_APPLICATION_ERR",

  UPDATE_IS_HIRED_JOB_APPLICATION_BEGINE: "UPDATE_IS_HIRED_JOB_APPLICATION_BEGINE",
  UPDATE_IS_HIRED_JOB_APPLICATION_SUCCESS: "UPDATE_IS_HIRED_JOB_APPLICATION_SUCCESS",
  UPDATE_IS_HIRED_JOB_APPLICATION_ERR: "UPDATE_IS_HIRED_JOB_APPLICATION_ERR",

  ADD_JOB_APPLICATION_BEGINE: "ADD_JOB_APPLICATION_BEGINE",
  ADD_JOB_APPLICATION_SUCCESS: "ADD_JOB_APPLICATION_SUCCESS",
  ADD_JOB_APPLICATION_ERR: "ADD_JOB_APPLICATION_ERR",

  ADD_BULK_JOBS_BEGINE: "ADD_BULK_JOBS_BEGINE",
  ADD_BULK_JOBS_SUCCESS: "ADD_BULK_JOBS_SUCCESS",
  ADD_BULK_JOBS_ERR: "ADD_BULK_JOB_ERR",

  ADD_BULK_JOBS_CATEGORY_BEGINE: "ADD_BULK_JOBS_CATEGORY_BEGINE",
  ADD_BULK_JOBS_CATEGORY_SUCCESS: "ADD_BULK_JOBS_CATEGORY_SUCCESS",
  ADD_BULK_JOBS_CATEGORY_ERR: "ADD_BULK_JOBS_CATEGORY_ERR",

  ADD_BULK_JOBROLES_BEGINE: "ADD_BULK_JOBSROLES_BEGINE",
  ADD_BULK_JOBSROLES_SUCCESS: "ADD_BULK_JOBSROLES_SUCCESS",
  ADD_BULK_JOBSROLES_ERR: "ADD_BULK_JOBROLES_ERR",

  ADD_LANGUAGE_JOBPOST_BEGINE: "ADD_LANGUAGE_JOBPOST_BEGINE",
  ADD_LANGUAGE_JOBPOST_SUCCESS: "ADD_LANGUAGE_JOBPOST_SUCCESS",
  ADD_LANGUAGE_JOBPOST_ERR: "ADD_LANGUAGE_JOBPOSTERR",

  ADD_UPADTE_JOB_BANNER_BEGINE: 'ADD_UPADTE_JOB_BANNER_BEGINE',
  ADD_UPADTE_JOB_BANNER_SUCCESS: 'ADD_UPADTE_JOB_BANNER_SUCCESS',
  ADD_UPADTE_JOB_BANNER_ERR: 'ADD_UPADTE_JOB_BANNER_ERR',

  DELETE_JOBS_BEGINE:"DELETE_JOBS_BEGINE",
  DELETE_JOBS_SUCCESS:"DELETE_JOBS_SUCCESS",
  DELETE_JOBS_ERR:"DELETE_JOBS_ERR",


  getJobcategoryBegin: () => {
    return {
      type: actions.GET_JOBCATEGOTRY_BEGINE,
    };
  },

  getJobcategorySuccess: data => {
    return {
      type: actions.GET_JOBCATEGOTRY_SUCCESS,
      data,
    };
  },

  getJobcategoryErr: err => {
    return {
      type: actions.GET_JOBCATEGOTRY_ERR,
      err,
    };
  },

  addJobcategoryBegin: () => {
    return {
      type: actions.ADD_JOBCATEGOTRY_BEGINE,
    };
  },

  addJobcategorySuccess: data => {
    return {
      type: actions.ADD_JOBCATEGOTRY_SUCCESS,
      data,
    };
  },

  addJobcategoryErr: err => {
    return {
      type: actions.ADD_JOBCATEGOTRY_ERR,
      err,
    };
  },


  editJobcategoryBegin: () => {
    return {
      type: actions.EDIT_JOBCATEGOTRY_BEGINE,
    };
  },

  editJobcategorySuccess: data => {
    return {
      type: actions.EDIT_JOBCATEGOTRY_SUCCESS,
      data,
    };
  },

  editJobcategoryErr: err => {
    return {
      type: actions.EDIT_JOBCATEGOTRY_ERR,
      err,
    };
  },


  getJobroleBegin: () => {
    return {
      type: actions.GET_JOBROLE_BEGINE,
    };
  },

  getJobroleSuccess: data => {
    return {
      type: actions.GET_JOBROLE_SUCCESS,
      data,
    };
  },

  getJobroleErr: err => {
    return {
      type: actions.GET_JOBROLE_ERR,
      err,
    };
  },

  addJobroleBegin: () => {
    return {
      type: actions.ADD_JOBROLE_BEGINE,
    };
  },

  addJobroleSuccess: data => {
    return {
      type: actions.ADD_JOBROLE_SUCCESS,
      data,
    };
  },

  addJobroleErr: err => {
    return {
      type: actions.ADD_JOBROLE_ERR,
      err,
    };
  },


  editJobroleBegin: () => {
    return {
      type: actions.EDIT_JOBROLE_BEGINE,
    };
  },

  editJobroleSuccess: data => {
    return {
      type: actions.EDIT_JOBROLE_SUCCESS,
      data,
    };
  },

  editJobroleErr: err => {
    return {
      type: actions.EDIT_JOBROLE_ERR,
      err,
    };
  },

  addJobPostBegin: () => {
    return {
      type: actions.ADD_JOBPOST_BEGINE,
    };
  },

  addJobPostSuccess: data => {
    return {
      type: actions.ADD_JOBPOST_SUCCESS,
      data,
    };
  },

  addJobPostErr: err => {
    return {
      type: actions.ADD_JOBPOST_ERR,
      err,
    };
  },

  getJobPostBegin: () => {
    return {
      type: actions.GET_JOBPOST_BEGINE,
    };
  },

  getJobPostSuccess: data => {
    return {
      type: actions.GET_JOBPOST_SUCCESS,
      data,
    };
  },

  getJobPostErr: err => {
    return {
      type: actions.GET_JOBPOST_ERR,
      err,
    };
  },

  editJobPostBegin: () => {
    return {
      type: actions.EDIT_JOBPOST_BEGINE,
    };
  },

  editJobPostSuccess: data => {
    return {
      type: actions.EDIT_JOBPOST_SUCCESS,
      data,
    };
  },

  editJobPostErr: err => {
    return {
      type: actions.EDIT_JOBPOST_ERR,
      err,
    };
  },

  getoneJobPostBegin: () => {
    return {
      type: actions.GETONE_JOBPOST_BEGINE,
    };
  },

  getoneJobPostSuccess: data => {
    return {
      type: actions.GETONE_JOBPOST_SUCCESS,
      data,
    };
  },

  getoneJobPostErr: err => {
    return {
      type: actions.GETONE_JOBPOST_ERR,
      err,
    };
  },

  getJobsFilterForMainBegin: () => {
    return {
      type: actions.GET_JOBSFILTER_BEGINE,
    };
  },

  getJobsFilterForMainSuccess: data => {
    return {
      type: actions.GET_JOBSFILTER_SUCCESS,
      data,
    };
  },

  getJobsFilterForMainErr: err => {
    return {
      type: actions.GET_JOBSFILTER_ERR,
      err,
    };
  },

  getEmployerDataBegin: () => {
    return {
      type: actions.GET_EMPLOYERDATA_BEGINE,
    };
  },

  getEmployerDataSuccess: data => {
    return {
      type: actions.GET_EMPLOYERDATA_SUCCESS,
      data,
    };
  },

  getEmployerDataErr: err => {
    return {
      type: actions.GET_EMPLOYERDATA_ERR,
      err,
    };
  },

  allJobsBegin: () => {
    return {
      type: actions.GET_ALLJOBS_BEGINE,
    };
  },

  allJobsSuccess: data => {
    return {
      type: actions.GET_ALLJOBS_SUCCESS,
      data,
    };
  },

  allJobsErr: err => {
    return {
      type: actions.GET_ALLJOBS_ERR,
      err,
    };
  },

  getJobApplicationBegin: () => {
    return {
      type: actions.GET_JOB_APPLICATION_BEGINE,
    };
  },

  getJobApplicationSuccess: data => {
    return {
      type: actions.GET_JOB_APPLICATION_SUCCESS,
      data,
    };
  },

  getJobApplicationErr: err => {
    return {
      type: actions.GET_JOB_APPLICATION_ERR,
      err,
    };
  },

  updateIsSelectedJobApplicationBegin: () => {
    return {
      type: actions.UPDATE_IS_SELECTED_JOB_APPLICATION_BEGINE,
    };
  },

  updateIsSelectedJobApplicationSuccess: data => {
    return {
      type: actions.UPDATE_IS_SELECTED_JOB_APPLICATION_SUCCESS,
      data,
    };
  },

  updateIsSelectedJobApplicationErr: err => {
    return {
      type: actions.UPDATE_IS_SELECTED_JOB_APPLICATION_ERR,
      err,
    };
  },

  updateIsHiredBegin: () => {
    return {
      type: actions.UPDATE_IS_HIRED_JOB_APPLICATION_BEGINE,
    };
  },

  updateIsHiredSuccess: data => {
    return {
      type: actions.UPDATE_IS_HIRED_JOB_APPLICATION_SUCCESS,
      data,
    };
  },

  updateIsHiredErr: err => {
    return {
      type: actions.UPDATE_IS_HIRED_JOB_APPLICATION_ERR,
      err,
    };
  },


  addJobApplicationBegin: () => {
    return {
      type: actions.ADD_JOB_APPLICATION_BEGINE,
    };
  },

  addJobApplicationSuccess: data => {
    return {
      type: actions.ADD_JOB_APPLICATION_SUCCESS,
      data,
    };
  },

  addJobApplicationErr: err => {
    return {
      type: actions.ADD_JOB_APPLICATION_ERR,
      err,
    };
  },

  addBlukJobsBegin: () => {
    return {
      type: actions.ADD_BULK_JOBS_BEGINE,
    };
  },

  addBlukJobsSuccess: data => {
    return {
      type: actions.ADD_BULK_JOBS_SUCCESS,
      data,
    };
  },

  addBlukJobsErr: err => {
    return {
      type: actions.ADD_BULK_JOBS_ERR,
      err,
    };
  },


  addBlukJobCategoyBegin: () => {
    return {
      type: actions.ADD_BULK_JOBS_CATEGORY_BEGINE,
    };
  },

  addBlukJobCategoySuccess: data => {
    return {
      type: actions.ADD_BULK_JOBS_CATEGORY_SUCCESS,
      data,
    };
  },

  addBlukJobCategoyErr: err => {
    return {
      type: actions.ADD_BULK_JOBS_CATEGORY_ERR,
      err,
    };
  },

  addBlukJobRolesBegin: () => {
    return {
      type: actions.ADD_BULK_JOBROLES_BEGINE,
    };
  },

  addBulkJobRolesSuccess: data => {
    return {
      type: actions.ADD_BULK_JOBSROLES_SUCCESS,
      data,
    };
  },

  addBulkJobRolesErr: err => {
    return {
      type: actions.ADD_BULK_JOBSROLES_ERR,
      err,
    };
  },

  addLanguageJobPostBegin: () => {
    return {
      type: actions.ADD_LANGUAGE_JOBPOST_BEGINE,
    };
  },
  addLanguageJobPostSuccess: data => {
    return {
      type: actions.ADD_LANGUAGE_JOBPOST_SUCCESS,
      data,
    };
  },

  addLanguageJobPostErr: err => {
    return {
      type: actions.ADD_LANGUAGE_JOBPOST_ERR,
      err,
    };
  },
  addUpdateJobBannerBegin: () => {
    return {
      type: actions.ADD_UPADTE_JOB_BANNER_BEGINE,
    };
  },
  addUpdateJobBannerSuccess: data => {
    return {
      type: actions.ADD_UPADTE_JOB_BANNER_SUCCESS,
      data,
    };
  },
  addUpdateJobBannerErr: err => {
    return {
      type: actions.ADD_UPADTE_JOB_BANNER_ERR,
      err,
    };
  },

  deleteJobsBegin: () => {
    return {
      type: actions.DELETE_JOBS_BEGINE,
    };
  },
  deleteJobsSuccess: data => {
    return {
      type: actions.DELETE_JOBS_SUCCESS,
      data,
    };
  },
  deleteJobsErr: err => {
    return {
      type: actions.DELETE_JOBS_ERR,
      err,
    };
  },

};
export default actions;