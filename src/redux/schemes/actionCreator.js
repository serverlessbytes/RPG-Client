import STORAGEKEY from "../../config/APP/app.config";
import { ApiGet, ApiPost } from "../../helper/API/ApiData";
import AuthStorage from "../../helper/AuthStorage";
import actions from "./actions";

const {
  getSchemecategorySuccess,
  getSchemecategoryErr,
  getSchemeBenifitsSuccess,
  getSchemeBenifitsErr,
  addSchemecategorySuccess,
  addSchemecategoryErr,
  addSchemeSuccess,
  addSchemeErr,
  
} = actions;

export const getSchemecategory = () => async (dispatch) => {
  await ApiGet(`scheme/getSchemeCategories?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then((res) => {
      return dispatch(getSchemecategorySuccess(res))
    })
    .catch((err) => dispatch(getSchemecategoryErr(err)))
}

export const addSchemecategory = (body) => async (dispatch) => {
  await ApiPost(`scheme/addSchemeCategory?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`,body)
    .then((res) => {
      dispatch(addSchemecategorySuccess(res))
      return dispatch(getSchemecategory())
    })
    .catch((err) => dispatch(addSchemecategoryErr(err)))
}




export const getSchemeBenifits = () => async (dispatch) => {
  // dispatch(getSchemecategoryBegin())
  await ApiGet(`scheme/getSchemeBenifits?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then((res) => {
      return dispatch(getSchemeBenifitsSuccess(res.data))
    })
    .catch((err) => dispatch(getSchemeBenifitsErr(err)))
}

export const addSchemeData = (data) => async (dispatch) => {
  await ApiPost(`scheme/addScheme?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`,data)
    .then((res) => {
      return dispatch(addSchemeSuccess(res))
    })
    .catch((err) => dispatch(addSchemeErr(err)))
}
