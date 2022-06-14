import actions from "./actions";
const {
    GET_ARTICLES_BEGNI,
    GET_ARTICLES_SUCCESS,
    GET_ARTICLES_ERR,

    EDIT_ARTICLES_BEGNI,
    EDIT_ARTICLES_SUCCESS,
    EDIT_ARTICLES_ERR,
} = actions

const initialState = {
    getArticlesData: null,
    getArticlesErr: null,
    editArticlesData: null,
    editArticlesErr: null,
}
const articlesReducer = (state = initialState, actions) => {
    const { type, data, err } = actions
    switch (type) {
        case GET_ARTICLES_BEGNI:
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

        case EDIT_ARTICLES_BEGNI:
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
    }

}
export default articlesReducer
