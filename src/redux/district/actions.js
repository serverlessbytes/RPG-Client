const actions = {

  POST_DISTRICT_BEGINE:"POST_DISTRICT_BEGINE",
  POST_DISTRICT_SUCCESS:"POST_DISTRICT_SUCCESS",
  POST_DISTRICT_ERR:"POST_DISTRICT_ERR",

  GET_DISTRICT_BEGINE:"GET_DISTRICT_BEGINE",
  GET_DISTRICT_SUCCESS:"GET_DISTRICT_SUCCESS",
  GET_DISTRICT_ERR:"GET_DISTRICT_ERR",

  postDistrictBegin: () => {
    return {
      type: actions.POST_DISTRICT_BEGINE,
    };
  },

  postDistrictSuccess: data => {
    return {
      type: actions.POST_DISTRICT_SUCCESS,
      data,
    };
  },

  postDistrictErr: err => {
    return {
      type: actions.POST_DISTRICT_ERR,
      err,
    };
  },

  getDistrictSuccessBegin: () => {
    return {
      type: actions.GET_DISTRICT_BEGINE,
    };
  },

  getDistrictSuccess: data => {
    return {
      type: actions.GET_DISTRICT_SUCCESS,
      data,
    };
  },

  getDistrictSuccessErr: err => {
    return {
      type: actions.GET_DISTRICT_ERR,
      err,
    };
  },


};

export default actions;
