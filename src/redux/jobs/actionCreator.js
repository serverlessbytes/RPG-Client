import { async } from "@firebase/util";
import STORAGEKEY from "../../config/APP/app.config";
import { ApiGet, ApiPatch, ApiPost } from "../../helper/API/ApiData";
import AuthStorage from "../../helper/AuthStorage";
import actions from "./actions";

const {
  getJobcategorySuccess,
  getJobcategoryErr,

  addJobcategorySuccess,
  addJobcategoryErr,

  editJobcategorySuccess,
  editJobcategoryErr,

  getJobroleSuccess,
  getJobroleErr,

  addJobroleSuccess,
  addJobroleErr,

  editJobroleSuccess,
  editJobroleErr,

  addJobPostSuccess,
  addJobPostErr,

  getJobPostSuccess,
  getJobPostErr,

  editJobPostSuccess,
  editJobPostErr,

  getoneJobPostSuccess,
  getoneJobPostErr,

  getJobsFilterForMainSuccess,
  getJobsFilterForMainErr,

  getEmployerDataSuccess,
  getEmployerDataErr,

  allJobsSuccess,
  allJobsErr,

  getJobApplicationSuccess,
  getJobApplicationErr,

  updateIsSelectedJobApplicationSuccess,
  updateIsSelectedJobApplicationErr,

  updateIsHiredSuccess,
  updateIsHiredErr,

  addJobApplicationSuccess,
  addJobApplicationErr,

  addBlukJobsBegin,
  addBlukJobsSuccess,
  addBlukJobsErr,

  addBlukJobCategoyBegin,
  addBlukJobCategoySuccess,
  addBlukJobCategoyErr,

  addBulkJobRolesSuccess,
  addBulkJobRolesErr,

  addLanguageJobPostSuccess,
  addLanguageJobPostErr,

  addUpdateJobBannerSuccess,
  addUpdateJobBannerErr,

  deleteJobsSuccess,
  deleteJobsErr,

} = actions;

let per_page, page_num, State, Status, Type, jobrole, search, hindi, marathi, jobcategory;

export const getJobcategory = () => async (dispatch) => {
  await ApiGet(`job/getCategories?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then((res) => {

      return dispatch(getJobcategorySuccess(res))
    })
    .catch((err) => dispatch(getJobcategoryErr(err)))
}

export const addJobcategory = (body) => async (dispatch) => {
  await ApiPost(`job/addCategory?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then((res) => {
      dispatch(addJobcategorySuccess(res))
      return dispatch(getJobcategory())
    })
    .catch((err) => dispatch(addJobcategoryErr(err)))
}

export const editJobcategory = (body) => async (dispatch) => {
  await ApiPost(`job/editCategory`, body)
    .then((res) => {
      dispatch(editJobcategorySuccess(res))
      return dispatch(getJobcategory())
    })
    .catch((err) => dispatch(editJobcategoryErr(err)))
}


export const getJobroles = () => async (dispatch) => {
  await ApiGet(`job/getRoles?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then((res) => {
      return dispatch(getJobroleSuccess(res))
    })
    .catch((err) => dispatch(getJobroleErr(err)))
}

export const addJobrole = (body) => async (dispatch) => {
  await ApiPost(`job/addRole?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then((res) => {
      dispatch(addJobroleSuccess(res))
      return dispatch(getJobroles())
    })
    .catch((err) => dispatch(addJobroleErr(err)))
}

export const editJobrole = (body) => async (dispatch) => {
  await ApiPost(`job/editRole`, body)
    .then((res) => {
      dispatch(editJobroleSuccess(res))
      return dispatch(getJobroles())
    })
    .catch((err) => dispatch(editJobroleErr(err)))
}

export const addJobPost = (body) => async (dispatch) => {
  await ApiPost(`job/add?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then((res) => {
      return dispatch(addJobPostSuccess(res))
      //return dispatch(getJobPost(perPage,pageNumber))
    })
    .catch((err) => dispatch(addJobPostErr(err)))
}

export const getJobPost = (perPage, pageNumber) => async (dispatch) => {
  await ApiPost(`job/getJobsFilterForMain?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perPage}&page_number=${pageNumber}`)
    .then((res) => {
      return dispatch(getJobPostSuccess(res))
    })
    .catch((err) => dispatch(getJobPostErr(err)))
}

export const editJobPost = (id, data, hindiID, marathiID) => async (dispatch) => {
  // let id = data.id
  // delete data.id
  await ApiPost(`job/update?jobId=${id}`, data)
    .then((res) => {
      return dispatch(editJobPostSuccess(res))
      // if (res.status === 200) {
      //   dispatch(getJobsFilterForMain(per_page, page_num, State, Type, jobrole, Status, "", hindiID, marathiID))
      // }
    })
    .catch((err) => dispatch(editJobPostErr(err)))
}

export const getoneJobPost = (data) => async (dispatch) => {
  await ApiGet(`job/getJobById?jobId=${data}`)
    .then((res) => {
      return dispatch(getoneJobPostSuccess(res))
    })
    .catch((err) => dispatch(getoneJobPostErr(err)))
}

export const getJobsFilterForMain = (perPage, pageNumber, state, type, jobRole, status, searchBar, hindiID, marathiID) => async (dispatch) => {
  per_page = perPage,
    page_num = pageNumber,
    State = state, Type = type,
    jobrole = jobRole,
    Status = status,
    search = searchBar,
    hindi = hindiID,
    marathi = marathiID;
  let URL = `job/getJobsFilterForMain?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perPage}&page_number=${pageNumber}`
  if (state) {
    URL = URL.concat(`&state=${state}`)
  }
  if (type) {
    URL = URL.concat(`&type=${type}`)
  }
  if (jobRole) {
    URL = URL.concat(`&jobRole=${jobRole}`)
  }
  if (status) {
    URL = URL.concat(`&status=${status}`)
  }
  if (searchBar) {
    URL = URL.concat(`&search=${searchBar}`)
  }
  if (hindiID) {
    URL = URL.concat(`&hindi=${hindiID}`)
  }
  if (marathiID) {
    URL = URL.concat(`&marathi=${marathiID}`)
  }
  await ApiPost(URL)
    .then((res) => {
      return dispatch(getJobsFilterForMainSuccess(res))
    })
    .catch((err) => dispatch(getJobsFilterForMainErr(err)))
}

export const getEmployerData = () => async (dispatch) => {
  await ApiGet(`user/auth/allUsers?type=EMPLOYER`)
    .then((res) => {
      return dispatch(getEmployerDataSuccess(res))
    })
    .catch((err) => dispatch(getEmployerDataErr(err)))
}

export const allJobs = (type) => async (dispatch) => {
  let URL = `job/allJobs?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`
  if (type) {
    URL = URL.concat(`&type=${type}`)
  }
  await ApiPost(URL)
    .then((res) => {
      return dispatch(allJobsSuccess(res))
    })
    .catch((err) => dispatch(allJobsErr(err)))
}

export const jobApproved = (id, body) => async (dispatch) => {
  await ApiPost(`job/updateIsApproved?jobId=${id}`, body)
    .then((res) => {
    })
    .catch((err) => console.log("Error", err))
}

export const getJobApplication = (perPage, pageNumber, status, jobRole, jobCategoryId) => async (dispatch) => {
  per_page = perPage, page_num = pageNumber, Status = status, jobrole = jobRole, jobcategory = jobCategoryId;

  let URL = `jobApplication/getAllJobApplications?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perPage}&page_number=${pageNumber}${status ? `&${status}=true` : ''}`;

  if (jobRole) {
    URL = URL.concat(`&jobRole=${jobRole}`)
  }
  if (jobCategoryId) {
    URL = URL.concat(`&jobCategoryId=${jobCategoryId}`)
  }

  await ApiGet(URL)
    .then((res) => {
      return dispatch(getJobApplicationSuccess(res))
    })
    .catch((err) => dispatch(getJobApplicationErr(err)))
}

export const updateIsSelectedJobApplication = (id, value) => async (dispatch) => {
  await ApiPost(`jobApplication/updateIsSelected?id=${id}&selected=${value}`)
    .then((res) => {
      dispatch(updateIsSelectedJobApplicationSuccess(res))
      if (res.status === 200 && jobrole || jobcategory) {
        return dispatch(getJobApplication(per_page, page_num, Status, jobrole, jobcategory))
      }
      else{
        return dispatch(getJobApplication(per_page, page_num, Status))
      }
    })
    .catch((err) => dispatch(updateIsSelectedJobApplicationErr(err)))
}

export const updateIsHired = (id, value) => async (dispatch) => {
  await ApiPost(`jobApplication/updateIsHired?id=${id}&hired=${value}`)
    .then((res) => {
      dispatch(updateIsHiredSuccess(res))
      if (res.status === 200 && jobrole || jobcategory) {
        return dispatch(getJobApplication(per_page, page_num, Status, jobrole, jobcategory))
      }
      else{
        return dispatch(getJobApplication(per_page, page_num, Status))
      }
    })
    .catch((err) => dispatch(updateIsHiredErr(err)))
}

export const addJobApplication = (body) => async (dispatch) => {
  const formData = new FormData();
  formData.append('resume_url', body.certification_url);
  formData.append('certification_url', body.certification_url);
  formData.append('experience', body.experience);
  formData.append('job_id', body.job_id);
  formData.append('currently_working', body.currently_working);

  await ApiPost(`jobApplication/addJobApplication?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`,formData)
    .then((res) => {
       dispatch(addJobApplicationSuccess(res))
      if(res.status === 200){
        return dispatch(getJobApplication(per_page, page_num, Status, jobrole, jobcategory))
      }
    })
    .catch((err) => dispatch(addJobApplicationErr(err)))
}

export const addBulkJobs = (body) => async (dispatch) => {
  dispatch(addBlukJobsBegin(true))
  await ApiPost(`job/addBulkJobs?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    // await ApiPost(`job/addBulkJobs`, body)
    .then((res) => {
      return dispatch(addBlukJobsSuccess(res))
    })
    .catch(err => {
      let newError = {
        message: "Somthing went wrong",
        status: 500
      }
      dispatch(addBlukJobsErr(newError))
    }
    )
}

export const addBulkJobCategory = (body) => async (dispatch) => {
  dispatch(addBlukJobCategoyBegin(true))
  await ApiPost(`job/addBulkJobCategory`, body)
    .then((res) => {
      dispatch(addBlukJobCategoySuccess(res))
      //return dispatch(getJobPost(perPage,pageNumber))
      if (res.status === 200) {
        dispatch(getJobcategory())
      }
    })
    .catch(err => {
      dispatch(addBlukJobCategoyErr(err))
    }
    )
}

export const addBulkJobRoles = (body) => async (dispatch) => {
  await ApiPost(`job/addBulkJobRoles`, body)
    .then((res) => {
      dispatch(addBulkJobRolesSuccess(res))
      if (res.status === 200) {
        return dispatch(getJobroles())
      }
    })
    .catch((err) => dispatch(addBulkJobRolesErr(err)))
}

export const addLanguageJobPost = (languageID, body, hindiID, marathiID) => async (dispatch) => {
  await ApiPost(`job/add?langId=${languageID}`, body)
    .then((res) => {
      dispatch(addLanguageJobPostSuccess(res))
      if (res.status === 200) {
        return dispatch(getJobsFilterForMain(per_page, page_num, State, Type, jobrole, Status, "", hindiID, marathiID))
      }
    })
    .catch((err) => dispatch(addLanguageJobPostErr(err)))
}

export const jobBannerUpdate = (id, body) => async (dispatch) => {
  await ApiPost(`job/updateBannerSelected?jobId=${id}`, body)
    .then((res) => {
      dispatch(addUpdateJobBannerSuccess(res))
    })
    .catch((err) => dispatch(addUpdateJobBannerErr(err)))
}

export const deleteJobs = (id, key, type) => async (dispatch) => {
  await ApiPost(`job/deleteJobs?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&jobId=${id}&key=${key}&type=${type}`)
  .then((res) => {
     dispatch(deleteJobsSuccess(res))
     if(res.status === 200){
      return dispatch(getJobsFilterForMain(per_page, page_num, State, Type, jobrole, Status, search, hindi, marathi))
     }
  })
  .catch((err)=> dispatch(deleteJobsErr(err)))
}
