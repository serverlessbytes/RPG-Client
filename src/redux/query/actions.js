const actions = {
    GET_QUERIES_BEGIN: "GET_QUERIES_BEGIN",
    GET_QUERIES_SUCCESS: "GET_QUERIES_SUCCESS",
    GET_QUERIES_ERR: "GET_QUERIES_ERR",

    EDIT_QUERIES_BEGIN: "EDIT_QUERIES_BEGIN",
    EDIT_QUERIES_SUCCESS: "EDIT_QUERIES_SUCCESS",
    EDIT_QUERIES_ERR: "EDIT_QUERIES_ERR",


    getQueriesBegin: () => {
        return {
            type: actions.GET_QUERIES_BEGIN
        }
    },

    getQueriesSuccess: (data) => {
        return {
            type: actions.GET_QUERIES_SUCCESS,
            data,
        }
    },

    getQueriesErr: (err) => {
        return {
            type: actions.GET_QUERIES_ERR,
            err,
        }
    },

    eidtQueriesBegin: () => {
        return {
            type: actions.EDIT_QUERIES_BEGIN
        }
    },

    eidtQueriesSuccess: (data) => {
        return {
            type: actions.EDIT_QUERIES_SUCCESS,
            data,
        }
    },
    eidtQueriesErr: (err) => {
        return {
            type: actions.EDIT_QUERIES_ERR,
            err,
        }
    }
}

export default actions