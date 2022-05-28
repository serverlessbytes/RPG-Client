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
} = actions


export const getArticles = () => async (dispatch) => {
    await ApiGet(`/article/getArticles?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
        .then((res) => {
            dispatch(getArticlesSuccess(res))
        })
        .catch((err) => {
            dispatch(getArticlesErr(err))
        })
}
export const editArticles = (body) = async (dispatch) => {
    await ApiPost(`/article/editArticle?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
        .then((res) => {
            dispatch(editArticlesSuccess(res))
        })
        .catch((err) => {
            dispatch(getArticlesErr(err))
        })
}
