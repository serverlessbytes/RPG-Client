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

let perPage, pageNum;

export const getTestimonial = (per_page, page_num) => async (dispatch) => {

  perPage = per_page;
  pageNum = page_num;

  await ApiGet(`testimonial/getTestimonials?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${per_page}&page_number=${page_num}`)
    .then((res) => {
      return dispatch(getTestimonialSuccess(res))
      // return dispatch(getSchemecategory())
    })
    .catch((err) => dispatch(getTestimonialErr(err)))
}

export const addTestimonial = (body) => async (dispatch) => {
  console.log("body",body);
  const formData = new FormData();
  formData.append('imageUrl', body.imageUrl);
  formData.append('videoUrl', body.videoUrl);
  formData.append('role', body.role);
  formData.append('name', body.name);
  formData.append('message', body.message);
  console.log("formData",formData);
  await ApiPost(`testimonial/addTestimonial?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, formData)
    .then((res) => {
      dispatch(addTestimonialSuccess(res))
      return dispatch(getTestimonial(perPage, pageNum))
    })
    .catch((err) => dispatch(addTestimonialErr(err)))
}

export const getoneTestimonialData = (data) => async (dispatch) => {
  await ApiGet(`testimonial/getTestimonial?id=${data}`)
    .then((res) => {
      return dispatch(getoneTestimonialDataSuccess(res))
    })
    .catch((err) => dispatch(getoneTestimonialDataErr(err)))
}


export const editTestimonial = (body) => async (dispatch) => {
  let id = body.id;
  const formData = new FormData();
  formData.append('imageUrl', body.imageUrl);
  formData.append('videoUrl', body.videoUrl);
  formData.append('role', body.role);
  formData.append('name', body.name);
  formData.append('message', body.message);
  await ApiPost(`testimonial/editTestimonial?id=${id}`, formData)
    .then((res) => {
      dispatch(editTestimonialSuccess(res))
      if (res.status === 200) {
        return dispatch(getTestimonial(perPage, pageNum))
      }
    })
    .catch((err) => dispatch(editTestimonialErr(err)))
}

export const addBulkTestimonial = (body) => async (dispatch) => {
  await ApiPost(`testimonial/addBulkTestimonial`, body)
    .then((res) => {
       dispatch(addBulkTestimonialSuccess(res))
      if (res.status === 200) {
        return dispatch(getTestimonial(perPage, pageNum))
      }
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




