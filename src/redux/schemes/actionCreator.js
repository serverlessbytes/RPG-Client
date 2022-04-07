import STORAGEKEY from "../../config/APP/app.config";
import { ApiGet, ApiPost } from "../../helper/API/ApiData";
import AuthStorage from "../../helper/AuthStorage";
import actions from "./actions";

const {
  getSchemecategorySuccess,
  getSchemecategoryErr,
  getSchemeBenifitsSuccess,
  getSchemeBenifitsErr,
  addSchemeSuccess,
  addSchemeErr,
  
} = actions;

export const getSchemecategory = () => async (dispatch) => {
  // dispatch(getSchemecategoryBegin())
  await ApiGet(`scheme/getSchemeCategories?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then((res) => {
      // return dispatch({
      //   type:gfgfdg,
      //   payload: res.data
      // })
      return dispatch(getSchemecategorySuccess(res.data))
    })
    .catch((err) => dispatch(getSchemecategoryErr(err)))
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
