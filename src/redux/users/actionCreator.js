import { async } from "@firebase/util";
import STORAGEKEY from "../../config/APP/app.config";
import { ApiGet, ApiPatch, ApiPost } from "../../helper/API/ApiData";
import AuthStorage from "../../helper/AuthStorage";
import actions from "./actions";

const {
  addUserSignupSuccess,
  addUserSignupErr,

  getAllUserSuccess,
  getAllUserErr,

  editProfileSuccess,
  editProfileErr,

  getOneUserSuccess,
  getOneUserErr,

  allUserSuccess,
  allUserErr,

  getUserRatingSuccess,
  getUserRatingErr,

  edituserRatingSuccess,
  edituserRatingErr,

  getOneUserRatingSuccess,
  getOneUserRatingErr,

} = actions;

let Status;
let per_page;
let page_num;
let Type;
export const addUserSignup = (data) => async (dispatch) => {
  await ApiPost(`user/auth/signup`, data)
    .then((res) => {
      //console.log("res",res)
      return dispatch(addUserSignupSuccess(res))
    })
    .catch((err) => dispatch(addUserSignupErr(err)))
}

export const getAllUser = (perpage, pagenumber, status, type) => async (dispatch) => {
  Status = status;
  per_page = perpage;
  page_num = pagenumber;
  Type = type;

  let api
  api = type === "" ? `user/auth/getAllUsers?per_page=${perpage}&page_number=${pagenumber}&status=${status}`
    : `user/auth/getAllUsers?per_page=${perpage}&page_number=${pagenumber}&status=${status}&type=${type}`

  await ApiGet(api)
    .then((res) => {
      return dispatch(getAllUserSuccess(res))
    })
    .catch((err) => dispatch(getAllUserErr(err)))
}

export const editProfile = (data) => async (dispatch) => {
  let id = data.id
  delete data.id
  delete data.userType

  await ApiPost(`user/auth/editProfile?id=${id}`, data)
    .then((res) => {
      dispatch(editProfileSuccess(res))
      if (res.status === 200) {
        dispatch(getAllUser(per_page, page_num, Status, Type))
      }
    })
    .catch((err) => dispatch(editProfileErr(err)))
}
export const getOneUser = (data) => async (dispatch) => {
  await ApiGet(`user/auth/singleUser?userId=${data}`)
    .then((res) => {
      return dispatch(getOneUserSuccess(res))
    })
    .catch((err) => dispatch(getOneUserErr(err)))
}
export const allUser = (data) => async (dispatch) => {
  await ApiGet(`user/auth/allUsers${data ? "?type=" + data : ''}`)
    .then((res) => {
      return dispatch(allUserSuccess(res))
    })
    .catch((err) => dispatch(allUserErr(err)))
}

export const getUserRating = (perpage, pagenum) => async (dispatch) => {
  per_page = perpage;
  page_num = pagenum;
  await ApiGet(`userRating/getUserRatings?per_page=${perpage}&page_number=${pagenum}`)
    .then((res) => {
      return dispatch(getUserRatingSuccess(res))
    })
    .catch((err) => dispatch(getUserRatingErr(err)))
}

export const edituserRating = (body) => async (dispatch) => {
  await ApiPost(`userRating/editUserRating`, body)
    .then((res) => {
      (edituserRatingSuccess(res))
      if (res.status === 200) {
        return dispatch(getUserRating(per_page, page_num))
      }
    })
    .catch(e => edituserRatingErr(e))
}

export const getOneUserRating = (id) => async (dispatch) => {
  await ApiGet(`userRating/getUserRating?id=${id}`)
    .then((res) => {
      // console.log("res",res)
      return dispatch(getOneUserRatingSuccess(res))
    })
    .catch((err) => dispatch(getOneUserRatingErr(err)))
}



