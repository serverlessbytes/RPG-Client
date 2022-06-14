const actions = {
    GET_ARTICLES_BEGNI: " GET_ARTICLES_BEGNI ",
    GET_ARTICLES_SUCCESS: " GET_ARTICLES_SUCCESS ",
    GET_ARTICLES_ERR: " GET_ARTICLES_ERR ",

    EDIT_ARTICLES_BEGNI: " EDIT_ARTICLES_BEGNI ",
    EDIT_ARTICLES_SUCCESS: " EDIT_ARTICLES_SUCCESS ",
    EDIT_ARTICLES_ERR: " EDIT_ARTICLES_ERR ",

    getArticlesBegni: () => {
        return {
            type: actions.GET_ARTICLES_BEGNI
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

    editArticlesBegni: () => {
        return {
            type: actions.EDIT_ARTICLES_BEGNI
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
    }

}
export default actions