import { async } from "@firebase/util";
import STORAGEKEY from "../../config/APP/app.config";
import { ApiGet, ApiPost } from "../../helper/API/ApiData";
import AuthStorage from "../../helper/AuthStorage";
import actions from "./actions";
const {
    getQueriesBegin,
    getQueriesSuccess,
    getQueriesErr,

    eidtQueriesBegin,
    editQueriesSuccess,
    editQueriesErr,

    addQueriesSuccess,
    addQueriesErr,

    getQueriesFromIdSuccess,
    getQueriesFromIdErr,
} = actions

let per_page, page_num, Status;

export const getQueries = (perpage, pagenum, status) => async (dispatch) => {
    per_page = perpage;
    page_num = pagenum;
    Status = status;
    await ApiGet(`query/getQueries?per_page=${perpage}&page_number=${pagenum}&status=${status}`)
        .then((res) => {
            return dispatch(getQueriesSuccess(res))
        })
        .catch((err) => {
            return dispatch(getQueriesErr(err))
        })
}

export const editQueries = (body) => async (dispatch) => {
    await ApiPost(`query/editQuery?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
        .then((res) => {
            dispatch(editQueriesSuccess(res))
            if (res.status === 200) {
                return dispatch(getQueries(per_page, page_num,Status))
            }
        })
        .catch((err) => {
            return dispatch(editQueriesErr(err))
        })
}

export const addQueries = (body) => async (dispatch) => {
    await ApiPost(`query/addQuery`, body)
        .then((res) => {
            dispatch(addQueriesSuccess(res))
            if (res.status === 200) {
                return dispatch(getQueries(per_page, page_num, Status))
            }
        })
        .catch((err) => {
            return dispatch(addQueriesErr(err))
        })
}

export const getQueriesFromId = (id) =>async (dispatch) => {
    await ApiGet(`query/getQuery?id=${id}`)
    .then ((res)=>{
       return dispatch(getQueriesFromIdSuccess(res))
    })
    .catch((err)=>{
        return dispatch(getQueriesFromIdErr(err))
    })
}