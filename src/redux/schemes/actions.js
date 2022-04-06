const actions = {
  GET_SCHEMECATEGOTRY_BEGINE:"GET_SCHEMECATEGOTRY_BEGINE",
  GET_SCHEMECATEGOTRY_SUCCESS:"GET_SCHEMECATEGOTRY_SUCCESS",
  GET_SCHEMECATEGOTRY_ERR:"GET_SCHEMECATEGOTRY_ERR",

  GET_SCHEMENBENIFITS_BEGINE:"GET_SCHEMENBENIFITS_BEGINE",//getSchemeBenifits
  GET_SCHEMENBENIFITS_SUCCESS:"GET_SCHEMENBENIFITS_SUCCESS",
  GET_SCHEMENBENIFITS_ERR:"GET_SCHEMENBENIFITS_ERR",

  ADD_SCHEMEN_BEGINE:"ADD_SCHEMEN_BEGINE",//getSchemeBenifits
  ADD_SCHEMEN_SUCCESS:"ADD_SCHEMEN_SUCCESS",
  ADD_SCHEMEN_ERR:"ADD_SCHEMEN_ERR",

  getSchemecategoryBegin: () => {
    return {
      type: actions.GET_SCHEMECATEGOTRY_BEGINE,
    };
  },

  getSchemecategorySuccess: data => {
    return {
      type: actions.GET_SCHEMECATEGOTRY_SUCCESS,
      data,
    };
  },

  getSchemecategoryErr: err => {
    return {
      type: actions.GET_SCHEMECATEGOTRY_ERR,
      err,
    };
  },
  
  getSchemeBenifitsBegin: () => {
    return {
      type: actions.GET_SCHEMENBENIFITS_BEGINE,
    };
  },

  getSchemeBenifitsSuccess: data => {
    return {
      type: actions.GET_SCHEMENBENIFITS_SUCCESS,
      data,
    };
  },

  getSchemeBenifitsErr: err => {
    return {
      type: actions.GET_SCHEMENBENIFITS_ERR,
      err,
    };
  },

  addSchemeBegin: () => {
    return {
      type: actions.ADD_SCHEMEN_BEGINE,
    };
  },

  addSchemeSuccess: data => {
    return {
      type: actions.ADD_SCHEMEN_SUCCESS,
      data,
    };
  },

  addSchemeErr: err => {
    return {
      type: actions.ADD_SCHEMEN_ERR,
      err,
    };
  },
};
export default actions;