const actions = {
    GET_QUERIES_BEGIN: "GET_QUERIES_BEGIN",
    GET_QUERIES_SUCCESS: "GET_QUERIES_SUCCESS",
    GET_QUERIES_ERR: "GET_QUERIES_ERR",

    EDIT_QUERIES_BEGIN: "EDIT_QUERIES_BEGIN",
    EDIT_QUERIES_SUCCESS: "EDIT_QUERIES_SUCCESS",
    EDIT_QUERIES_ERR: "EDIT_QUERIES_ERR",

    ADD_QUERIES_BEGIN: "ADD_QUERIES_BEGIN",
    ADD_QUERIES_SUCCESS: "ADD_QUERIES_SUCCESS",
    ADD_QUERIES_ERR: "ADD_QUERIES_ERR",

    GET_QUERIES_BY_ID_BEGIN: "GET_QUERIES_BY_ID_BEGIN ",
    GET_QUERIES_BY_ID_SUCCESS: "GET_QUERIES_BY_ID_SUCCESS ",
    GET_QUERIES_BY_ID_ERR: "GET_QUERIES_BY_ID_ERR ",


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

    editQueriesBegin: () => {
        return {
            type: actions.EDIT_QUERIES_BEGIN
        }
    },

    editQueriesSuccess: (data) => {
        return {
            type: actions.EDIT_QUERIES_SUCCESS,
            data,
        }
    },
    editQueriesErr: (err) => {
        return {
            type: actions.EDIT_QUERIES_ERR,
            err,
        }
    },

    addQueriesBegin: () => {
        return {
            type: actions.ADD_QUERIES_BEGIN
        }
    },

    addQueriesSuccess: (data) => {
        return {
            type: actions.ADD_QUERIES_SUCCESS,
            data,
        }
    },
    addQueriesErr: (err) => {
        return {
            type: actions.ADD_QUERIES_ERR,
            err,
        }
    },

    getQueriesFromIdBegin: () => {
        return {
            type: actions.GET_QUERIES_BY_ID_BEGIN
        }
    },

    getQueriesFromIdSuccess: (data) => {
        return {
            type: actions.GET_QUERIES_BY_ID_SUCCESS,
            data,
        }
    },
    getQueriesFromIdErr: (err) => {
        return {
            type: actions.GET_QUERIES_BY_ID_ERR,
            err,
        }
    },


}

export default actions