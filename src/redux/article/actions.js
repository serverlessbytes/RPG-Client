const actions = {
    GET_ARTICLES_BEGIN: "GET_ARTICLES_BEGIN",
    GET_ARTICLES_SUCCESS: "GET_ARTICLES_SUCCESS ",
    GET_ARTICLES_ERR: "GET_ARTICLES_ERR ",

    EDIT_ARTICLES_BEGIN: "EDIT_ARTICLES_BEGIN ",
    EDIT_ARTICLES_SUCCESS: "EDIT_ARTICLES_SUCCESS ",
    EDIT_ARTICLES_ERR: " EDIT_ARTICLES_ERR ",

    GET_ARTICLES_BY_ID_BEGIN: "GET_ARTICLES_BY_ID_BEGIN ",
    GET_ARTICLES_BY_ID_SUCCESS: "GET_ARTICLES_BY_ID_SUCCESS ",
    GET_ARTICLES_BY_ID_ERR: "GET_ARTICLES_BY_ID_ERR ",

    ADD_ARTICLES_BEGIN: "ADD_ARTICLES_BEGIN ",
    ADD_ARTICLES_SUCCESS: "ADD_ARTICLES_SUCCESS ",
    ADD_ARTICLES_ERR: "ADD_ARTICLES_ERR",

    ADD_BULK_ARTICLE_BEGIN: "ADD_BULK_ARTICLE_BEGIN",
    ADD_BULK_ARTICLE_SUCCESS: "ADD_BULK_ARTICLE_SUCCESS",
    ADD_BULK_ARTICLE_ERR: "ADD_BULK_ARTICLE_ERR",

    GET_EXPORT_ARTICLES_BEGIN: "GET_EXPORT_ARTICLES_BEGIN",
    GET_EXPORT_ARTICLES_SUCCESS: "GET_EXPORT_ARTICLES_SUCCESS",
    GET_EXPORT_ARTICLES_ERR: "GET_EXPORT_ARTICLES_ERR",

    getArticlesBegin: () => {
        return {
            type: actions.GET_ARTICLES_BEGIN
        }
    },
    getArticlesSuccess: (data) => {
        return {
            type: actions.GET_ARTICLES_SUCCESS,
            data,
        }
    },
    getArticlesErr: (err) => {
        return {
            type: actions.GET_ARTICLES_ERR,
            err
        }
    },

    editArticlesBegin: () => {
        return {
            type: actions.EDIT_ARTICLES_BEGIN
        }
    },
    editArticlesSuccess: (data) => {
        return {
            type: actions.EDIT_ARTICLES_SUCCESS,
            data,
        }
    },
    editArticlesErr: (err) => {
        return {
            type: actions.EDIT_ARTICLES_ERR,
            err,
        }
    },

    getArticleByIdBegin: () => {
        return {
            type: actions.GET_ARTICLES_BY_ID_BEGIN
        }
    },
    getArticleByIdSuccess: (data) => {
        return {
            type: actions.GET_ARTICLES_BY_ID_SUCCESS,
            data,
        }
    },
    getArticleByIdErr: (err) => {
        return {
            type: actions.GET_ARTICLES_BY_ID_ERR,
            err,
        }
    },

    addArticleBegin: () => {
        return {
            type: actions.ADD_ARTICLES_BEGIN
        }
    },
    addArticleSuccess: (data) => {
        return {
            type: actions.ADD_ARTICLES_SUCCESS,
            data,
        }
    },
    addArticleErr: (err) => {
        return {
            type: actions.ADD_ARTICLES_ERR,
            err,
        }
    },

    addBulkArticleBegin: () => {
        return {
            type: actions.ADD_BULK_ARTICLE_BEGIN,
        }
    },
    addBulkArticleSuccess: (data) => {
        return {
            type: actions.ADD_BULK_ARTICLE_SUCCESS,
            data,
        }
    },
    addBulkArticleErr: (err) => {
        return {
            type: actions.ADD_BULK_ARTICLE_ERR,
            err,
        }
    },

    getExportArticlesBegin: () => {
        return {
            type: actions.GET_EXPORT_ARTICLES_BEGIN,
        }
    },

    getExportArticlesSuccess: (data) => {
        return {
            type: actions.GET_EXPORT_ARTICLES_SUCCESS,
            data,
        }
    },
    getExportArticlesErr: (err) => {
        return {
            type: actions.GET_EXPORT_ARTICLES_ERR,
            err,
        }
    }

}
export default actions