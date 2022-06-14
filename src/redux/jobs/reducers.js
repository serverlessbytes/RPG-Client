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

  GET_JOBSFILTER_BEGINE,
  GET_JOBSFILTER_SUCCESS,
  GET_JOBSFILTER_ERR,

  EDIT_JOBPOST_BEGINE,
  EDIT_JOBPOST_SUCCESS,
  EDIT_JOBPOST_ERR,

  GET_EMPLOYERDATA_BEGINE,
  GET_EMPLOYERDATA_SUCCESS,
  GET_EMPLOYERDATA_ERR,

  GET_ALLJOBS_BEGINE,
  GET_ALLJOBS_SUCCESS,
  GET_ALLJOBS_ERR,

  GET_JOB_APPLICATION_BEGINE,
  GET_JOB_APPLICATION_SUCCESS,
  GET_JOB_APPLICATION_ERR,

  UPDATE_IS_SELECTED_JOB_APPLICATION_BEGINE,
  UPDATE_IS_SELECTED_JOB_APPLICATION_SUCCESS,
  UPDATE_IS_SELECTED_JOB_APPLICATION_ERR,

  UPDATE_IS_HIRED_JOB_APPLICATION_BEGINE,
  UPDATE_IS_HIRED_JOB_APPLICATION_SUCCESS,
  UPDATE_IS_HIRED_JOB_APPLICATION_ERR,

  ADD_JOB_APPLICATION_BEGINE,
  ADD_JOB_APPLICATION_SUCCESS,
  ADD_JOB_APPLICATION_ERR,

  ADD_BULK_JOBS_BEGINE,
  ADD_BULK_JOBS_SUCCESS,
  ADD_BULK_JOBS_ERR,

  ADD_BULK_JOBS_CATEGORY_BEGINE,
  ADD_BULK_JOBS_CATEGORY_SUCCESS,
  ADD_BULK_JOBS_CATEGORY_ERR,

  ADD_BULK_JOBROLES_BEGINE,
  ADD_BULK_JOBSROLES_SUCCESS,
  ADD_BULK_JOBSROLES_ERR,

  ADD_LANGUAGE_JOBPOST_BEGINE,
  ADD_LANGUAGE_JOBPOST_SUCCESS,
  ADD_LANGUAGE_JOBPOST_ERR,

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
  addJobPostData: null,
  addJobPostErr: null,
  getJobPostData: null,
  getOneJobPostData: null,
  getJobFilterData: null,
  editJobPostData: null,
  editJobPostErr: null,
  getEmployerData: null,
  allJobs: null,
  addJobRoleError: null,
  editJobRoleError: null,
  getJobApplicationData: null,
  updateIsSelectedData: null,
  updateIsHiredData: null,
  addJobsApplicationData: null,
  addBulkJobsData: null,
  addBulkJobsError: null,
  importJobCategory: null,
  importJobCategoryError: null,
  addJobCatogeryError: null,
  importJobRole : null,
  importJobRoleErr : null,
  addLanguageJobPost:null,
  addLanguageJobPostErr:null,
  addJobsApplicationErr : null,
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
        addJobCatogeryError: err,
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
        editJobCatogeryError: err,
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
        addJobRoleError: err,
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
        editJobRoleError: err,
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
        addJobPostErr: err,
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

    case GET_JOBSFILTER_BEGINE:
      return {
        ...state,
        loading: true,
      };

    case GET_JOBSFILTER_SUCCESS:
      return {
        ...state,
        getJobFilterData: data,
        loading: false,
      };

    case GET_JOBSFILTER_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case EDIT_JOBPOST_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case EDIT_JOBPOST_SUCCESS:
      return {
        ...state,
        editJobPostData: data,
        loading: false,
      };
    case EDIT_JOBPOST_ERR:
      return {
        ...state,
        editJobPostErr: err,
        loading: false,
      };

    case GET_EMPLOYERDATA_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GET_EMPLOYERDATA_SUCCESS:
      return {
        ...state,
        getEmployerData: data,
        loading: false,
      };
    case GET_EMPLOYERDATA_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case GET_ALLJOBS_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GET_ALLJOBS_SUCCESS:
      return {
        ...state,
        allJobs: data,
        loading: false,
      };
    case GET_ALLJOBS_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case GET_JOB_APPLICATION_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GET_JOB_APPLICATION_SUCCESS:
      return {
        ...state,
        getJobApplicationData: data,
        loading: false,
      };
    case GET_JOB_APPLICATION_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case UPDATE_IS_SELECTED_JOB_APPLICATION_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_IS_SELECTED_JOB_APPLICATION_SUCCESS:
      return {
        ...state,
        updateIsSelectedData: data,
        loading: false,
      };
    case UPDATE_IS_SELECTED_JOB_APPLICATION_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case UPDATE_IS_HIRED_JOB_APPLICATION_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_IS_HIRED_JOB_APPLICATION_SUCCESS:
      return {
        ...state,
        updateIsHiredData: data,
        loading: false,
      };
    case UPDATE_IS_HIRED_JOB_APPLICATION_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case ADD_JOB_APPLICATION_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case ADD_JOB_APPLICATION_SUCCESS:
      return {
        ...state,
        addJobsApplicationData: data,
        loading: false,
      };
    case ADD_JOB_APPLICATION_ERR:
      return {
        ...state,
        addJobsApplicationErr: err,
        loading: false,
      };

    case ADD_BULK_JOBS_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case ADD_BULK_JOBS_SUCCESS:
      return {
        ...state,
        addBulkJobsData: data,
        loading: false,
      };
    case ADD_BULK_JOBS_ERR:
      return {
        ...state,
        addBulkJobsError: err,
        loading: false,
      };

    case ADD_BULK_JOBS_CATEGORY_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case ADD_BULK_JOBS_CATEGORY_SUCCESS:
      return {
        ...state,
        importJobCategory: data,
        loading: false,
      };
    case ADD_BULK_JOBS_CATEGORY_ERR:
      return {
        ...state,
        importJobCategoryError: err,
        loading: false,
      };

    case ADD_BULK_JOBROLES_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case ADD_BULK_JOBSROLES_SUCCESS:
      return {
        ...state,
        importJobRole: data,
        loading: false,
      };
    case ADD_BULK_JOBSROLES_ERR:
      return {
        ...state,
        importJobRoleErr: err,
        loading: false,
      };

      case ADD_LANGUAGE_JOBPOST_BEGINE:
        return {
          ...state,
          loading: true,
        };
      case ADD_LANGUAGE_JOBPOST_SUCCESS:
        return {
          ...state,
          addLanguageJobPost: data,
          loading: false,
        };
      case ADD_LANGUAGE_JOBPOST_ERR:
        return {
          ...state,
          addLanguageJobPostErr: err,
          loading: false,
        };

    default:
      return state;
  }
};

export default jobReducer;