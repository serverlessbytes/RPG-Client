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

} = actions;
let per_page,page_num,State,Status,Type,jobrole;
export const getJobcategory = () => async (dispatch) => {
  await ApiGet(`job/getCategories?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then((res) => {
      //console.log("log",res);
      return dispatch(getJobcategorySuccess(res))
    })
    .catch((err) => dispatch(getJobcategoryErr(err)))
}

export const addJobcategory = (body) => async (dispatch) => {
  await ApiPost(`job/addCategory?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`,body)
    .then((res) => {
      dispatch(addJobcategorySuccess(res))
      return dispatch(getJobcategory())
    })
    .catch((err) => dispatch(addJobcategoryErr(err)))
}

export const editJobcategory = (body) => async (dispatch) => {
  await ApiPost(`job/editCategory`,body)
    .then((res) => {
      dispatch(editJobcategorySuccess(res))
      return dispatch(getJobcategory())
    })
    .catch((err) => dispatch(editJobcategoryErr(err)))
}


export const  getJobroles = () => async (dispatch) => {
  await ApiGet(`job/getRoles?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then((res) => {
      return dispatch(getJobroleSuccess(res))
    })
    .catch((err) => dispatch(getJobroleErr(err)))
}

export const addJobrole = (body) => async (dispatch) => {
  await ApiPost(`job/addRole?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`,body)
    .then((res) => {
       dispatch(addJobroleSuccess(res))
      return dispatch(getJobroles())
    })
    .catch((err) => dispatch(addJobroleErr(err)))
}

export const editJobrole = (body) => async (dispatch) => {
  await ApiPost(`job/editRole`,body)
    .then((res) => {
      dispatch(editJobroleSuccess(res))
      return dispatch(getJobroles())
    })
    .catch((err) => dispatch(editJobroleErr(err)))
}

export const addJobPost = (body) => async (dispatch) => {
  await ApiPost(`job/add?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`,body)
    .then((res) => {
      //console.log("res",res)
      return dispatch(addJobPostSuccess(res))
      //return dispatch(getJobPost(perPage,pageNumber))
    })
    .catch((err) => dispatch(addJobPostErr(err)))
}

export const getJobPost = (perPage,pageNumber) => async (dispatch) => {
  await ApiPost(`job/getJobsFilterForMain?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perPage}&page_number=${pageNumber}`)
    .then((res) => {
      //console.log("res",res)
      return dispatch(getJobPostSuccess(res))
    })
    .catch((err) => dispatch(getJobPostErr(err)))
}

export const editJobPost = (data) => async (dispatch) => {
  let id = data.id
  delete data.id
  await ApiPost(`job/update?jobId=${id}`,data)
    .then((res) => {
      dispatch(editJobPostSuccess(res))
      // console.log("ress---",res)
      if(res.status === 200){
         dispatch(getJobsFilterForMain(per_page,page_num,State,Type,jobrole,Status))
      }
            
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

export const getJobsFilterForMain = (perPage,pageNumber,state,type,jobRole,status) => async (dispatch) => {
  per_page=perPage,page_num=pageNumber,State=state,Status=status,Type=type,jobrole=jobRole;
  let URL = `job/getJobsFilterForMain?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perPage}&page_number=${pageNumber}`
  if(state) {
    URL = URL.concat(`&state=${state}`)
  }
  if(type) {
    URL = URL.concat(`&type=${type}`)
  }
  if(jobRole) {
    URL = URL.concat(`&jobRole=${jobRole}`)
  }
  if(status){
    URL = URL.concat(`&status=${status}`)
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

export const allJobs = (type,state,jobRole) => async (dispatch) => {
  let URL = `job/allJobs?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`
  if(type){
    URL=URL.concat(`&type=${type}`)
  }
  await ApiPost(URL)
    .then((res) => {
      //console.log("res",res)
      return dispatch(allJobsSuccess(res))
    })
    .catch((err) => dispatch(allJobsErr(err)))
}

export const jobApproved = (id,body) => async (dispatch) => {
  await ApiPost(`job/updateIsApproved?jobId=${id}`,body)
    .then((res) => {
    
    })
    .catch((err) => console.log("Error",err))
}


