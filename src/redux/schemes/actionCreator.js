import STORAGEKEY from "../../config/APP/app.config";
import { ApiGet, ApiPatch, ApiPost } from "../../helper/API/ApiData";
import AuthStorage from "../../helper/AuthStorage";
import actions from "./actions";

const {
  getSchemecategorySuccess,
  getSchemecategoryErr,
  getSchemeBenifitsSuccess,

  getSchemeBenifitsErr,
  addSchemecategorySuccess,
  addSchemecategoryErr,

  editSchemecategorySuccess,
  editSchemecategoryErr,
  
  addSchemeSuccess,
  addSchemeErr,

  getstateBegin,
  getstateSuccess,
  getstateErr,

  getSchemeSuccess,
  getSchemenErr,

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

export const editSchemecategory = (body) => async (dispatch) => {
  await ApiPatch(`scheme/editSchemeCategory`,body)
    .then((res) => {
      dispatch(editSchemecategorySuccess(res))
      return dispatch(getSchemecategory())
    })
    .catch((err) => dispatch(editSchemecategoryErr(err)))
}


export const getState = () => async (dispatch) => {
  // dispatch(getSchemecategoryBegin())
  await ApiGet(`state/getState?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then((res) => {
      return dispatch(getstateSuccess(res.data))
    })
    .catch((err) => dispatch(getstateErr(err)))
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

export const getSchemeData = (perPage, pageNumber) => async (dispatch) => {
  await ApiGet(`scheme/getAllSchemes?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perPage}&page_number=${pageNumber}`)
    .then((res) => {
      return dispatch(getSchemeSuccess(res.data))
    })
    .catch((err) => dispatch(getSchemenErr(err)))
}
