import { async } from "@firebase/util";
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

  editSchemeSuccess,
  editSchemeErr,

  getOneSchemenBegin,
  getOneSchemeSuccess,
  getOneSchemenErr,

} = actions;
let per_Page,page_Num 
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
  per_Page=perPage;
  page_Num=pageNumber;
  await ApiGet(`scheme/getAllSchemes?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perPage}&page_number=${pageNumber}`)
    .then((res) => {
      return dispatch(getSchemeSuccess(res.data))
    })
    .catch((err) => dispatch(getSchemenErr(err)))
}

export const getOneSchemeData = (key) => async (dispatch) => { 
  await ApiGet(`scheme/getOneScheme${key}&langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then((res) => {
      return dispatch(getOneSchemeSuccess(res.data))
    })
    .catch((err) => dispatch(getOneSchemenErr(err)))
}

export const editSchemeData = (body) => async (dispatch) => {
  await ApiPost(`scheme/editScheme`,body)
    .then((res) => {
      dispatch(editSchemeSuccess(res.data))
      if(res.status===200){
        dispatch(getSchemeData(per_Page,page_Num))
      }
    })
    .catch((err) => dispatch(editSchemenErr(err)))
}
