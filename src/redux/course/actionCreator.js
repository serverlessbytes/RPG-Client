import actions from './actions';
import { ApiGet, ApiGetNoAuth, ApiPost } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';
import { async } from '@firebase/util';

const {

  postCategorySuccess,
  postCategoryDataErr,
  getcategorySuccess,
  editCategorySuccess,
  addPartnerCourseSuccess,
  addPartnerCourseErr,
  getCoursefilterSuccess,
  editCoursefilterSuccess,
  editPartnerCourseSuccess,
  editPartnerCourseErr,
  addSwayamPartnerCourseSuccess,
  editSwayamPartnerCourseSuccess,
  addSwayamCourseModuleSuccess,
  addSwayamCourseModuleErr,
  getSwayamCourseModuleSuccess,
  editSwayamCourseModuleSuccess,
  getallSwayamCourseSuccess,
  addSwayamPartnerCourseErr,
  addPartnerCourseInBulkBegin,
  addPartnerCourseInBulkSuccess,
  addPartnerCourseInBulkErr,
  addSwayamCourseBegin,
  addSwayamCourseInBulkBegin,
  addSwayamCourseInBulkErr,

  //--- CourseRating --- 
  addCourseRatingSuccess,
  addCourseRatingErr,
  courseRatingSuccess,
  courseRatingErr,
  courseRatingByIdSuccess,
  courseRatingByIdErr,
  specificCourseRatingSuccess,
  specificCourseRatingErr,
  specificUserCourseRatingSuccess,
  specificUserCourseRatingErr,
  editCategoryRatingSuccess,
  editCategoryRatingErr,
} = actions;

let page_number, per_page, category, Inactive, Mode;
export const postCategoryData = (body) => async (dispatch) => {
  await ApiPost(`course/addCategory?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then((res) => {
      dispatch(postCategorySuccess(res))
      return dispatch(getCategoryData(body))
    })
    .catch((err) => dispatch(postCategoryDataErr(err)))
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
      return dispatch(addPartnerCourseSuccess(res))
      //return dispatch(getCoursefilter(categoryId,perPage,pageNumber,mode,inactive))
    })
    .catch((err) => dispatch(addPartnerCourseErr(err)))
}
export const getCoursefilter = (categoryId, perPage, pageNumber, mode, inactive) => async (dispatch) => {
  //console.log("categoryId",categoryId)
  category = categoryId;
  per_page = perPage;
  page_number = pageNumber;
  Mode = mode;
  Inactive = inactive;

  let URL = `course/getCoursesFilter?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perPage}&page_number=${pageNumber}&status=${inactive}`
  if (categoryId) {
    URL = URL.concat(`&categoryId=${categoryId}`)
  }
  if (mode) {
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

export const editPartnerCoursefilter = (data, categoryId, perPage, pageNumber, mode, status) => async (dispatch) => {
  await ApiPost(`course/editPartnerCourse?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, data)
    .then((res) => {
      //getCoursefilter(categoryId,perPage,pageNumber,mode)
      dispatch(editPartnerCourseSuccess(res.data))
      if (res.status === 200) {  // redirect after click edit button on listing call getSchemeData
        dispatch(getCoursefilter(category, per_page, page_number, Mode, Inactive))
      }
    })
    .catch((err) => dispatch(editPartnerCourseErr(err)))
}

export const addSwayamCourse = (data,langId) => async (dispatch) => {
  await ApiPost(`course/addSwayamCourse?langId=${langId ? langId : AuthStorage.getStorageData(STORAGEKEY.language)}`, data)
    .then((res) => {
      return dispatch(addSwayamPartnerCourseSuccess(res))
    })
    .catch((err) => dispatch(addSwayamPartnerCourseErr(err)))
}

export const editSwayamCourse = (data) => async (dispatch) => {
  await ApiPost(`course/editSwayamCourse?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, data)
    .then((res) => {
      console.log("ressssss", res)
      dispatch(editSwayamPartnerCourseSuccess(res.data))
      if (res.status === 200) {  // redirect after click edit button on listing call getSchemeData
        dispatch(getCoursefilter(category, per_page, page_number, Mode, Inactive))
      }
    })
}

export const addSwayamCourseModule = (data) => async (dispatch) => {
  await ApiPost(`course/addSwayamCourseModule?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, data)
    .then((res) => {
      return dispatch(addSwayamCourseModuleSuccess(res))
    })
    .catch((err) => dispatch(addSwayamCourseModuleErr(err)))
}


export const getSwayamCourseModule = (id) => async (dispatch) => {
  await ApiGet(`course/getSwayamCourseModules?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&courseId=${id}`)
    .then((res) => {
      return dispatch(getSwayamCourseModuleSuccess(res))
    })
}

export const editSwayamCourseModule = (data) => async (dispatch) => {
  await ApiPost(`course/editSwayamCourseModules?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, data)
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

export const addPartnerCourseInBulk = (body) => async (dispatch) => {
  dispatch(addPartnerCourseInBulkBegin(true))
  await ApiPost(`course/addPartnerCourseInBulk?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then((res) => {
      return dispatch(addPartnerCourseInBulkSuccess(res))
    }).catch(e => dispatch(addPartnerCourseInBulkErr(e)))
}

export const addSwayamCourseInBulk = (body) => async (dispatch) => {
  dispatch(addSwayamCourseInBulkBegin(true))
  await ApiPost(`course/addSwayamCourseInBulk?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then((res) => {
      return dispatch(addSwayamCourseModuleSuccess(res))
    }).catch(e => dispatch(addSwayamCourseInBulkErr(e)))
}

// --- CourseRating --- 

export const addCourseRating = (body) => async (dispatch) => {
  await ApiPost(`courseRating/addCourseRating`, body)
    .then((res) => {
      return dispatch(addCourseRatingSuccess(res))
    })
    .catch(e => addCourseRatingErr(e))
}

export const getCourseRatingData = (perpage, pagenumber) => async (dispatch) => {
  // console.log("page_number",page_number)
  per_page = perpage;
  page_number = pagenumber;
  await ApiGet(`courseRating/getCourseRatings?per_page=${perpage}&page_number=${pagenumber}`)
    .then((res) => {
      return dispatch(courseRatingSuccess(res))
    })
    .catch(e => courseRatingErr(e))
}

export const getCourseRatingsByID = (id) => async (dispatch) => {
  await ApiGet(`courseRating/getCourseRating?id=${id}`)
    .then((res) => {
      return dispatch(courseRatingByIdSuccess(res))
    })
    .catch(e => courseRatingByIdErr(e))
}

export const specificCourseRatings = (body) => async (dispatch) => {
  await ApiGet(`courseRating/specificCourseRatings`, body)
    .then((res) => {
      return dispatch(specificCourseRatingSuccess(res))
    })
    .catch(e => specificCourseRatingErr(e))
}

export const specificUserCourseRatings = (body) => async (dispatch) => {
  await ApiGet(`courseRating/specificUserCourseRatings`, body)
    .then((res) => {
      return (specificUserCourseRatingSuccess(res))
    })
    .catch(e => specificUserCourseRatingErr(e))
}

export const editCategoryRating = (body) => async (dispatch) => {
  await ApiPost(`courseRating/editCourseRating`, body)
    .then((res) => {
      dispatch(editCategoryRatingSuccess(res))
      if (res.status === 200) {
        return dispatch(getCourseRatingData(per_page, page_number))
      }
    })
    .catch(e => editCategoryRatingErr(e))
}
