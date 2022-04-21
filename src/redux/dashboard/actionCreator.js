import STORAGEKEY from '../../config/APP/app.config';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import actions from './actions';

const {
  getDashboardCourseSuccess,
  getDashboardUserSuccess,
  getTopTenCourseSuccess,
  getTopTenSchemeSuccess,
  getTopTenJobSuccess
} = actions;

export const getDashBoardCourseData = () => async (dispatch) => {
  await ApiGet(`course/getCoursesCount?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then((res) => {
      return dispatch(getDashboardCourseSuccess(res))
    })
}

export const getDashBoardUserData = () => async (dispatch) => {
  await ApiGet(`user/auth/getAllUserCount`)
    .then((res) => {
      return dispatch(getDashboardUserSuccess(res))
    })
}

export const getTopMostViewedCourses = () => async (dispatch) => {
  await ApiGet(`course/top10MostViewedCourses?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then((res) => {
      return dispatch(getTopTenCourseSuccess(res))
    })
}

export const getTopMostViewedSchemes = () => async (dispatch) => {
  await ApiGet(`scheme/top10MostViewedSchemes?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then((res) => {
      return dispatch(getTopTenSchemeSuccess(res))
    })
}

export const getTopMostViewedJobs = () => async (dispatch) => {
  await ApiPost(`job/top10MostViewedJobs?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then((res) => {
      return dispatch(getTopTenJobSuccess(res))
    })
}


