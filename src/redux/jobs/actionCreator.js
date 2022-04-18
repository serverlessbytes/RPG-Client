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
} = actions;

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
      return dispatch(addJobPostSuccess(res))
    })
    .catch((err) => dispatch(addJobPostErr(err)))
}

export const getJobPost = (perPage,pageNumber) => async (dispatch) => {
  await ApiPost(`job/getJobsFilterForMain?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perPage}&page_number=${pageNumber}`)
    .then((res) => {
      return dispatch(getJobPostSuccess(res))
    })
    .catch((err) => dispatch(getJobPostErr(err)))
}

export const editJobPost = (data) => async (dispatch) => {
  let id = data.id
  delete data.id
  await ApiPost(`job/update?jobId=${id}`,data)
    .then((res) => {
      return dispatch(editJobPostSuccess(res))
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
