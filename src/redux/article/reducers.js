import actions from "./actions";
const {
    GET_ARTICLES_BEGIN,
    GET_ARTICLES_SUCCESS,
    GET_ARTICLES_ERR,

    EDIT_ARTICLES_BEGIN,
    EDIT_ARTICLES_SUCCESS,
    EDIT_ARTICLES_ERR,

    GET_ARTICLES_BY_ID_BEGIN,
    GET_ARTICLES_BY_ID_SUCCESS,
    GET_ARTICLES_BY_ID_ERR,

    ADD_ARTICLES_BEGIN,
    ADD_ARTICLES_SUCCESS,
    ADD_ARTICLES_ERR,

    ADD_BULK_ARTICLE_BEGIN,
    ADD_BULK_ARTICLE_SUCCESS,
    ADD_BULK_ARTICLE_ERR,

    GET_EXPORT_ARTICLES_BEGIN,
    GET_EXPORT_ARTICLES_SUCCESS,
    GET_EXPORT_ARTICLES_ERR,

} = actions

const initialState = {
    getArticlesData: null,
    getArticlesErr: null,
    editArticlesData: null,
    editArticlesErr: null,
    getArticleByIdData: null,
    getArticleByIdErr: null,
    addArticleData: null,
    addArticleErr: null,
    addBulkArticleData: null,
    addBulkArticleError: null,
    getExportArticleData: null,
    getExportArticleError : null,
}
const articlesReducer = (state = initialState, actions) => {
    const { type, data, err } = actions
    switch (type) {
        case GET_ARTICLES_BEGIN:
            return {
                ...state,
                loading: true,
            }
        case GET_ARTICLES_SUCCESS:
            return {
                ...state,
                getArticlesData: data,
                loading: false
            }
        case GET_ARTICLES_ERR:
            return {
                ...state,
                getArticlesErr: err,
                loading: false
            }

        case EDIT_ARTICLES_BEGIN:
            return {
                ...state,
                loading: true
            }
        case EDIT_ARTICLES_SUCCESS:
            return {
                ...state,
                editArticlesData: data,
                loading: false
            }
        case EDIT_ARTICLES_ERR:
            return {
                ...state,
                editArticlesErr: err,
                loading: false
            }

        case GET_ARTICLES_BY_ID_BEGIN:
            return {
                ...state,
                loading: true
            }
        case GET_ARTICLES_BY_ID_SUCCESS:
            return {
                ...state,
                getArticleByIdData: data,
                loading: false
            }
        case GET_ARTICLES_BY_ID_ERR:
            return {
                ...state,
                getArticleByIdErr: err,
                loading: false
            }


        case ADD_ARTICLES_BEGIN:
            return {
                ...state,
                loading: true
            }
        case ADD_ARTICLES_SUCCESS:
            return {
                ...state,
                addArticleData: data,
                loading: false
            }
        case ADD_ARTICLES_ERR:
            return {
                ...state,
                addArticleErr: err,
                loading: false
            }

        case ADD_BULK_ARTICLE_BEGIN:
            return {
                ...state,
                loading: true
            }
        case ADD_BULK_ARTICLE_SUCCESS:
            return {
                ...state,
                addBulkArticleData: data,
                loading: false
            }
        case ADD_BULK_ARTICLE_ERR:
            return {
                ...state,
                addBulkArticleError: err,
                loading: false
            }

        case GET_EXPORT_ARTICLES_BEGIN:
            return {
                ...state,
                loading: true
            }
        case GET_EXPORT_ARTICLES_SUCCESS:
            return {
                ...state,
                getExportArticleData: data,
                loading: false
            }
        case GET_EXPORT_ARTICLES_ERR:
            return {
                ...state,
                getExportArticleError: err,
                loading: false
            }

        default:
            return state
    }

}
export default articlesReducer
