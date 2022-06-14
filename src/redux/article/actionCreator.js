import { async } from "@firebase/util";
import STORAGEKEY from "../../config/APP/app.config";
import { ApiGet, ApiPost } from "../../helper/API/ApiData";
import AuthStorage from "../../helper/AuthStorage";
import actions from "./actions";
const {
    getArticlesBegni,
    getArticlesSuccess,
    getArticlesErr,

    editArticlesBegni,
    editArticlesSuccess,
    editArticlesErr,

    getArticleByIdSuccess,
    getArticleByIdErr,

    addArticleSuccess,
    addArticleErr,
} = actions

let per_page, page_num;

export const getArticles = (perpage, pagenum) => async (dispatch) => {
    per_page = perpage;
    page_num = pagenum;
    await ApiGet(`article/getArticles?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perpage}&page_number=${pagenum}`)
        .then((res) => {
            console.log("res", res)
            return dispatch(getArticlesSuccess(res))
        })
        .catch((err) => {
            return dispatch(getArticlesErr(err))
        })
}
export const editArticles = (body) => async (dispatch) => {
    await ApiPost(`article/editArticle?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
        .then((res) => {
            dispatch(editArticlesSuccess(res))
            if (res.status === 200) {
                return dispatch(getArticles(per_page, page_num))
            }
        })
        .catch((err) => {
            return dispatch(getArticlesErr(err))
        })
}

export const getArticleById = (id) => async (dispatch) => {
    await ApiGet(`article/getArticle?id=${id}`)
        .then((res) => {
            return dispatch(getArticleByIdSuccess(res))
        })
        .catch((err) => {
            return dispatch(getArticleByIdErr(err))
        })
}

export const addArticle = (body) => async (dispatch) => {
    await ApiPost(`article/addArticle?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
        .then((res) => {
            dispatch(addArticleSuccess(res))
            if (res.status === 200) {
                return dispatch(getArticles(per_page, page_num))
            }
        })
        .catch((err) => {
            return dispatch(addArticleErr(err))
        })
}
