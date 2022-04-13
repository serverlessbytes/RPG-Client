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
  editJobroleErr
  
} = actions;

export const getJobcategory = () => async (dispatch) => {
  await ApiGet(`job/getCategories?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then((res) => {
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


export const getJobroles = () => async (dispatch) => {
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




