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
    eidtQueriesSuccess,
    eidtQueriesErr,
} = actions


export const getQueries = () => async (dispatch) => {
    await ApiGet(`query/getQueries?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
        .then((res) => {
            dispatch(getQueriesSuccess(res))
        })
        .catch((err) => {
            dispatch(getQueriesErr(err))
        })
}
export const eidtQueries = (body) => async (dispatch) => {
    await ApiPost(`query/editQuery?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
        .then((res) => {
            dispatch(eidtQueriesSuccess(res))
        })
        .catch((err) => {
            dispatch(eidtQueriesErr(err))
        })
}