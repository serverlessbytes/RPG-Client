const actions = {

  POST_BENEFITS_BEGINE:"POST_BENEFITS_BEGINE",
  POST_BENEFITS_SUCCESS:"POST_BENEFITS_SUCCESS",
  POST_BENEFITS_ERR:"POST_BENEFITS_ERR",

  postBenefitsBegin: () => {
    return {
      type: actions.POST_BENEFITS_BEGINE,
    };
  },

  postBenefitsSuccess: data => {
    return {
      type: actions.POST_BENEFITS_SUCCESS,
      data,
    };
  },

  postBenefitsErr: err => {
    return {
      type: actions.POST_BENEFITS_ERR,
      err,
    };
  },

};

export default actions;
