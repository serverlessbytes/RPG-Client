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
  addSwayamPartnerCourseSuccess,
  editSwayamPartnerCourseSuccess,
  addSwayamCourseModuleSuccess,
  getSwayamCourseModuleSuccess,
  editSwayamCourseModuleSuccess,
  getallSwayamCourseSuccess,
} = actions;

let page_number,per_page,category,Inactive,Mode;
export const postCategoryData = (body) => async (dispatch) => {
  await ApiPost(`course/addCategory?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then((res) => {
       dispatch(postCategorySuccess(res))
       return dispatch(getCategoryData(body)) 
    })
}

export const getCategoryData = () => async (dispatch) => {
  await ApiGet(`course/getCategories?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then((res) => {
      return dispatch(getcategorySuccess(res))
    })
}

export const editCategoryData = (body) => async (dispatch) => {
  await ApiPost(`course/editCategory?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then((res) => {
      dispatch(editCategorySuccess(res))
      if (res.status === 200) {
        dispatch(getCategoryData())
      }
    })
}

export const addPartnerCourse = (body) => async (dispatch) => {
  await ApiPost(`course/addPartnerCourse?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then((res) => {
     return  dispatch(addPartnerCourseSuccess(res))
     //return dispatch(getCoursefilter(categoryId,perPage,pageNumber,mode,inactive))
    })
}
export const getCoursefilter = (categoryId,perPage,pageNumber,mode,inactive) => async (dispatch) => {
  category = categoryId;
  per_page = perPage;
  page_number = pageNumber;
  Mode=mode;
  Inactive = inactive;

  let URL = `course/getCoursesFilter?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perPage}&page_number=${pageNumber}&status=${inactive}`
  if(categoryId){
    URL = URL.concat(`&categoryId=${categoryId}`)
  }
  if(mode){
    URL = URL.concat(`&mode=${mode}`)
  }
  await ApiGet(URL)
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

export const editPartnerCoursefilter = (data,categoryId,perPage,pageNumber,mode,status) => async (dispatch) => {
  await ApiPost(`course/editPartnerCourse?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`,data)
    .then((res) => {
      // getCoursefilter(categoryId,perPage,pageNumber,mode)
      return dispatch(editPartnerCourseSuccess(res))
    })
}

export const addSwayamCourse = (data) => async (dispatch) => {
  await ApiPost(`course/addSwayamCourse?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`,data)
    .then((res) => {
      return dispatch(addSwayamPartnerCourseSuccess(res))
    })
}

export const editSwayamCourse = (data) => async (dispatch) => {
  await ApiPost(`course/editSwayamCourse?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`,data)
    .then((res) => {
      console.log("ressssss",res)
       dispatch(editSwayamPartnerCourseSuccess(res.data))
      if (res.status === 200) {  // redirect after click edit button on listing call getSchemeData
        dispatch(getCoursefilter(category,per_page, page_number,Mode,Inactive))
      }
    })
}

export const addSwayamCourseModule = (data) => async (dispatch) => {
  await ApiPost(`course/addSwayamCourseModule?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`,data)
    .then((res) => {
      return dispatch(addSwayamCourseModuleSuccess(res))
    })
}


export const getSwayamCourseModule = (id) => async (dispatch) => {
  await ApiGet(`course/getSwayamCourseModules?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&courseId=${id}`)
    .then((res) => {
      return dispatch(getSwayamCourseModuleSuccess(res))
    })
}

export const editSwayamCourseModule = (data) => async (dispatch) => {
  await ApiPost(`course/editSwayamCourseModules?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`,data)
    .then((res) => {
      return dispatch(editSwayamCourseModuleSuccess(res))
    })
}

export const getallSwayamCourse = (mode) => async (dispatch) => {
  await ApiGet(`course/allCourses?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&mode=${mode}`)
    .then((res) => {
      return dispatch(getallSwayamCourseSuccess(res))
    })
}










