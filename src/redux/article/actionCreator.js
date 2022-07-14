import { async } from "@firebase/util";
import STORAGEKEY from "../../config/APP/app.config";
import { ApiGet, ApiPost } from "../../helper/API/ApiData";
import AuthStorage from "../../helper/AuthStorage";
import actions from "./actions";
const {
    getArticlesSuccess,
    getArticlesErr,

    editArticlesSuccess,
    editArticlesErr,

    getArticleByIdSuccess,
    getArticleByIdErr,

    addArticleSuccess,
    addArticleErr,

    addBulkArticleSuccess,
    addBulkArticleErr,

    getExportArticlesSuccess,
    getExportArticlesErr,
} = actions

let per_page, page_num;

export const getArticles = (perpage, pagenum) => async (dispatch) => {
    per_page = perpage;
    page_num = pagenum;
    await ApiGet(`article/getArticles?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perpage}&page_number=${pagenum}`)
        .then((res) => {

            return dispatch(getArticlesSuccess(res))
        })
        .catch((err) => {
            return dispatch(getArticlesErr(err))
        })
}
export const editArticles = (body) => async (dispatch) => {
    const formData = new FormData();
    formData.append('body', body.body);
    formData.append('videoUrl', body.videoUrl);
    formData.append('imageUrl', body.imageUrl);
    formData.append('title', body.title);
    formData.append('id', body.id);
    formData.append('isActive', body.isActive);
    formData.append('isDeleted', body.isDeleted);
    formData.append('priority', body.priority);

    await ApiPost(`article/editArticle?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, formData)
        .then((res) => {
            dispatch(editArticlesSuccess(res))
            if (res.status === 200) {
                return dispatch(getArticles(per_page, page_num))
            }
        })
        .catch((err) => {
            return dispatch(editArticlesErr(err))
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
    const formData = new FormData();
    formData.append('body', body.body);
    formData.append('videoUrl', body.videoUrl);
    formData.append('imageUrl', body.imageUrl);
    formData.append('title', body.title);

    await ApiPost(`article/addArticle?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, formData)
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

export const addBulkArticle = (body) => async (dispatch) => {
    await ApiPost(`article/addBulkArticle`, body)
        .then((res) => {
            dispatch(addBulkArticleSuccess(res))
            if (res.status === 200) {
                return dispatch(getArticles(per_page, page_num))
            }
        })
        .catch((err) => {
            return dispatch(addBulkArticleErr(err))
        })
}

export const getExportArticles = () => async (dispatch) => {
    await ApiGet(`article/getExportArticles?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
        .then((res) => {
            return dispatch(getExportArticlesSuccess(res))
        })
        .catch((err) => {
            return dispatch(getExportArticlesErr(err))
        })
}

