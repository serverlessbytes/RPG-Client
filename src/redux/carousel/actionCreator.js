import { async } from "@firebase/util";
import STORAGEKEY from "../../config/APP/app.config";
import { ApiGet, ApiPatch, ApiPost } from "../../helper/API/ApiData";
import AuthStorage from "../../helper/AuthStorage";
import actions from "./actions";

const {
  addCarouselSuccess,
  addCarouselErr,

  getCarouselSuccess,
  getCarouselErr,

  getOneCarouselSuccess,
  getOneCarouselErr,

  editCarouselSuccess,
  editCarouselErr,

  addBulkCarouselSuccess,
  addBulkCarouselErr,

} = actions;

let perPage,pageNum;

export const getCarousel = (per_page,page_num) => async (dispatch) => {

  perPage = per_page;
  pageNum = page_num;

  await ApiGet(`carousel/getCarousels?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${per_page}&page_number=${page_num}`)
    .then((res) => {
      return dispatch(getCarouselSuccess(res))
    })
    .catch((err) => dispatch(getCarouselErr(err)))
}

export const addCarousel = (body) => async (dispatch) => {
  await ApiPost(`carousel/addCarousel?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`,body)
    .then((res) => {
       dispatch(addCarouselSuccess(res))
    })
    return dispatch(getCarousel(perPage,pageNum))
    .catch((err) => dispatch(addCarouselErr(err)))
}

export const getOneCarousel = (data) => async (dispatch) => {
  await ApiGet(`carousel/getCarousel?id=${data}`)
    .then((res) => {
      return dispatch(getOneCarouselSuccess(res))
    })
    .catch((err) => dispatch(getOneCarouselErr(err)))
}

export const editCarousel = (data) => async (dispatch) => {
  await ApiPost(`carousel/editCarousel`,data)
    .then((res) => {
        dispatch(editCarouselSuccess(res))
      if (res.status === 200){
        return dispatch(getCarousel(perPage,pageNum))
      }
    })
    .catch((err) => dispatch(editCarouselErr(err)))
}

export const addBulkCarousel = (body) => async (dispatch) => {
  await ApiPost(`carousel/addBulkCarousel`,body)
    .then((res) => {
       dispatch(addBulkCarouselSuccess(res))
      if (res.status === 200){
        return dispatch(getCarousel(perPage,pageNum))
      }
    })
    .catch((err) => dispatch(addBulkCarouselErr(err)))
}
