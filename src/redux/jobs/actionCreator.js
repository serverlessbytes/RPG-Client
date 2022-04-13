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




