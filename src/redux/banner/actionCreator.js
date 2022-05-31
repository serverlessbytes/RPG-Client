import { async } from "@firebase/util";
import STORAGEKEY from "../../config/APP/app.config";
import { ApiGet, ApiPatch, ApiPost } from "../../helper/API/ApiData";
import AuthStorage from "../../helper/AuthStorage";
import actions from "./actions";

const {
  addBannerSuccess,
  addBannerErr,

  getBannerSuccess,
  getBannerErr,

  getOneBannerSuccess,
  getOneBannerErr,

  editBannerSuccess,
  editBannerErr,

  addBulkBannerSuccess,
  addBulkBannerErr,

  getExportBannersSuccess,
  getExportBannersErr,

} = actions;

export const addBanner = (body) => async (dispatch) => {
  await ApiPost(`banner/addBanner?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then((res) => {
      dispatch(addBannerSuccess(res))
    })
  return dispatch(GetBanner())
    .catch((err) => dispatch(addBannerErr(err)))
}

export const GetBanner = () => async (dispatch) => {
  await ApiGet(`banner/getBanners?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then((res) => {
      return dispatch(getBannerSuccess(res))
    })
    .catch((err) => dispatch(getBannerErr(err)))
}

export const getOneBanner = (data) => async (dispatch) => {
  await ApiGet(`banner/getBanner?id=${data}`)
    .then((res) => {
      return dispatch(getOneBannerSuccess(res))
    })
    .catch((err) => dispatch(getOneBannerErr(err)))
}

export const editBanner = (data) => async (dispatch) => {
  await ApiPost(`banner/editBanner`, data)
    .then((res) => {
      dispatch(editBannerSuccess(res))
      if (res.status === 200) {
        return dispatch(GetBanner())
      }
    })
    .catch((err) => dispatch(editBannerErr(err)))
}

export const addBulkBanner = (body) => async (dispatch) => {
  await ApiPost(`banner/addBulkBanner`, body)
    .then((res) => {
      return dispatch(addBulkBannerSuccess(res))
    })
    .catch((err) => dispatch(addBulkBannerErr(err)))
}

export const getExportBanners = () => async (dispatch) => {
  await ApiGet(`banner/getExportBanners?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then((res) => {
      return dispatch(getExportBannersSuccess(res))
    })
    .catch((err) => dispatch(getExportBannersErr(err)))
}
