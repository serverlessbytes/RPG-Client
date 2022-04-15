import actions from './actions';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';

const {

  postCategorySuccess,
  getcategorySuccess,
  editCategorySuccess,

  addPartnerCourseSuccess,

  getCoursefilterSuccess,
  editCoursefilterSuccess,
  editPartnerCourseSuccess,

  addSwayamPartnerCourseSuccess
} = actions;


export const postCategoryData = (body) => async (dispatch) => {
  await ApiPost(`course/addCategory?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then((res) => {
       dispatch(postCategorySuccess(res))
       return dispatch(getCategoryData(body)) 
    })
}

export const getCategoryData = (body) => async (dispatch) => {
  await ApiGet(`course/getCategories?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`,body)
    .then((res) => {
      return dispatch(getcategorySuccess(res))
    })
}

export const editCategoryData = (body) => async (dispatch) => {
  await ApiPost(`course/editCategory?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then((res) => {
      dispatch(editCategorySuccess(res))
      if (res.status === 200) {
        dispatch(getCategoryData(body))
      }
    })
}

export const addPartnerCourse = (body) => async (dispatch) => {
  await ApiPost(`course/addPartnerCourse?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then((res) => {
      return dispatch(addPartnerCourseSuccess(res))
    })
}
export const getCoursefilter = (categoryId,perPage,pageNumber,mode) => async (dispatch) => {
  await ApiGet(`course/getCoursesFilter?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&categoryId=${categoryId}&per_page=${perPage}&page_number=${pageNumber}&mode=${mode}`)
    .then((res) => {
      return dispatch(getCoursefilterSuccess(res))
    })
}

export const getOneCoursefilter = (id) => async (dispatch) => {
  await ApiGet(`course/getCourse/${id}?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then((res) => {
      return dispatch(editCoursefilterSuccess(res))
    })
}

export const editPartnerCoursefilter = (data,categoryId,perPage,pageNumber,mode) => async (dispatch) => {
  await ApiPost(`course/editPartnerCourse?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`,data)
    .then((res) => {
      getCoursefilter(categoryId,perPage,pageNumber,mode)
      return dispatch(editPartnerCourseSuccess(res))
    })
}

export const addSwayamCourse = (data) => async (dispatch) => {
  await ApiPost(`course/addSwayamCourse?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`,data)
    .then((res) => {
      return dispatch(addSwayamPartnerCourseSuccess(res))
    })
}

export const getSwayamCourse = (data) => async (dispatch) => {
  await ApiPost(`course/addSwayamCourse?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`,data)
    .then((res) => {
      return dispatch(addSwayamPartnerCourseSuccess(res))
    })
}








