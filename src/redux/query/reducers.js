import actions from "./actions";

const {
    GET_QUERIES_BEGIN,
    GET_QUERIES_SUCCESS,
    GET_QUERIES_ERR,

    EDIT_QUERIES_BEGIN,
    EDIT_QUERIES_SUCCESS,
    EDIT_QUERIES_ERR,

    ADD_QUERIES_BEGIN,
    ADD_QUERIES_SUCCESS,
    ADD_QUERIES_ERR,

    GET_QUERIES_BY_ID_BEGIN,
    GET_QUERIES_BY_ID_SUCCESS,
    GET_QUERIES_BY_ID_ERR,

    GET_EXPORT_QUERIES_BEGIN,
    GET_EXPORT_QUERIES_SUCCESS,
    GET_EXPORT_QUERIES_ERR,

} = actions

const initialState = {
    getQueriesData: null,
    getQueriesErr: null,
    editQueriesData: null,
    editQuerieErr: null,
    addQueriesData: null,
    addQuerieErr: null,
    getQueriesById: null,
    getQueriesByIdErr: null,
    getExportQueriesError: null,
    getExportQueriesData : null,
}


const queriesReducer = (state = initialState, action) => {
    const { type, data, err } = action
    switch (type) {
        case GET_QUERIES_BEGIN:
            return {
                ...state,
                loading: true
            }
        case GET_QUERIES_SUCCESS:
            return {
                ...state,
                getQueriesData: data,
                loading: false
            }
        case GET_QUERIES_ERR:
            return {
                ...state,
                getQueriesErr: err,
                loading: false
            }

        case EDIT_QUERIES_BEGIN:
            return {
                ...state,
                loading: true,
            }

        case EDIT_QUERIES_SUCCESS:
            return {
                ...state,
                editQueriesData: data,
                loading: false
            }
        case EDIT_QUERIES_ERR:
            return {
                ...state,
                editQuerieErr: err,
                loading: false
            }

        case ADD_QUERIES_BEGIN:
            return {
                ...state,
                loading: true,
            }

        case ADD_QUERIES_SUCCESS:
            return {
                ...state,
                addQueriesData: data,
                loading: false
            }
        case ADD_QUERIES_ERR:
            return {
                ...state,
                addQuerieErr: err,
                loading: false
            }

        case GET_QUERIES_BY_ID_BEGIN:
            return {
                ...state,
                loading: true,
            }

        case GET_QUERIES_BY_ID_SUCCESS:
            return {
                ...state,
                getQueriesById: data,
                loading: false
            }
        case GET_QUERIES_BY_ID_ERR:
            return {
                ...state,
                getQueriesByIdErr: err,
                loading: false
            }

        case GET_EXPORT_QUERIES_BEGIN:
            return {
                ...state,
                loading: true,
            }

        case GET_EXPORT_QUERIES_SUCCESS:
            return {
                ...state,
                getExportQueriesData: data,
                loading: false
            }
        case GET_EXPORT_QUERIES_ERR:
            return {
                ...state,
                getExportQueriesError: err,
                loading: false
            }

        default:
            return state
    }
}
export default queriesReducer