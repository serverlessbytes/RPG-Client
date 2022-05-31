import { async } from "@firebase/util";
import STORAGEKEY from "../../config/APP/app.config";
import { ApiGet, ApiPatch, ApiPost } from "../../helper/API/ApiData";
import AuthStorage from "../../helper/AuthStorage";
import actions from "./actions";

const {
  addTestimonialSuccess,
  addTestimonialErr,

  getTestimonialSuccess,
  getTestimonialErr,

  editTestimonialSuccess,
  editTestimonialErr,

  getoneTestimonialDataSuccess,
  getoneTestimonialDataErr,

  addBulkTestimonialSuccess,
  addBulkTestimonialErr,

  getExportTestimonialsSuccess,
  getExportTestimonialsErr,

} = actions;

export const addTestimonial = (body) => async (dispatch) => {
  await ApiPost(`testimonial/addTestimonial?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then((res) => {
      return dispatch(addTestimonialSuccess(res))
    })
    .catch((err) => dispatch(addTestimonialErr(err)))
}

export const getTestimonial = () => async (dispatch) => {
  await ApiGet(`testimonial/getTestimonials?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then((res) => {
      return dispatch(getTestimonialSuccess(res))
      // return dispatch(getSchemecategory())
    })
    .catch((err) => dispatch(getTestimonialErr(err)))
}


export const getoneTestimonialData = (data) => async (dispatch) => {
  await ApiGet(`testimonial/getTestimonial?id=${data}`)
    .then((res) => {
      return dispatch(getoneTestimonialDataSuccess(res))
    })
    .catch((err) => dispatch(getoneTestimonialDataErr(err)))
}


export const editTestimonial = (data) => async (dispatch) => {
  let id = data.id;
  await ApiPost(`testimonial/editTestimonial?id=${id}`, data)
    .then((res) => {
      dispatch(editTestimonialSuccess(res))
      if (res.status === 200) {
        return dispatch(getTestimonial())
      }
    })
    .catch((err) => dispatch(editTestimonialErr(err)))
}

export const addBulkTestimonial = (body) => async (dispatch) => {
  await ApiPost(`testimonial/addBulkTestimonial`, body)
    .then((res) => {
      return dispatch(addBulkTestimonialSuccess(res))
    })
    .catch((err) => dispatch(addBulkTestimonialErr(err)))
}

export const getExportTestimonials = () => async (dispatch) => {
  await ApiGet(`testimonial/getExportTestimonials?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then((res) => {
      return dispatch(getExportTestimonialsSuccess(res))
    })
    .catch((err) => dispatch(getExportTestimonialsErr(err)))
}




