import actions from "./actions";

const {
    GET_QUERIES_BEGIN,
    GET_QUERIES_SUCCESS,
    GET_QUERIES_ERR,

    EDIT_QUERIES_BEGIN,
    EDIT_QUERIES_SUCCESS,
    EDIT_QUERIES_ERR,
} = actions

const initialState = {
    getQueriesData: null,
    getQueriesErr: null,
    editQueriesData: null,
    editQuerieErr: null
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
        case GET_QUERIES_SUCCESS:
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
        default:
            return state
    }
}
export default queriesReducer