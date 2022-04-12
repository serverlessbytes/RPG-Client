const actions = {

  POST_CATEGORY_BEGINE:"POST_CATEGORY_BEGINE",
  POST_CATEGORY_SUCCESS:"POST_CATEGORY_SUCCESS",
  POST_CATEGORY_ERR:"POST_CATEGORY_ERR",

  GET_CATEGORY_BEGINE:"GET_CATEGORY_BEGINE",
  GET_CATEGORY_SUCCESS:"GET_CATEGORY_SUCCESS",
  GET_CATEGORY_ERR:"GET_CATEGORY_ERR",

  EDIT_CATEGORY_BEGINE:"EDIT_CATEGORY_BEGINE", //editCategorySuccess
  EDIT_CATEGORY_SUCCESS:"EDIT_CATEGORY_SUCCESS",//addPartnerCourseSuccess
  EDIT_CATEGORY_ERR:"EDIT_CATEGORY_ERR",

  POST_PARTNERCOURSE_BEGINE:"POST_PARTNERCOURSE_BEGINE", 
  POST_PARTNERCOURSE_SUCCESS:"POST_PARTNERCOURSE_SUCCESS",//
  POST_PARTNERCOURSE_ERR:"POST_PARTNERCOURSE_ERR",


  postBenefitsBegin: () => {
    return {
      type: actions.POST_CATEGORY_BEGINE,
    };
  },

  postCategorySuccess: data => {
    return {
      type: actions.POST_CATEGORY_SUCCESS,
      data,
    };
  },

  postBenefitsErr: err => {
    return {
      type: actions.POST_CATEGORY_ERR,
      err,
    };
  },

  getcategoryBegin: () => {
    return {
      type: actions.GET_CATEGORY_BEGINE,
    };
  },

  getcategorySuccess: data => {
    return {
      type: actions.GET_CATEGORY_SUCCESS,
      data,
    };
  },

  getcategoryErr: err => {
    return {
      type: actions.GET_CATEGORY_ERR,
      err,
    };
  },
  editcategoryBegin: () => {
    return {
      type: actions.EDIT_CATEGORY_BEGINE,
    };
  },

  editCategorySuccess: data => {
    return {
      type: actions.EDIT_CATEGORY_SUCCESS,
      data,
    };
  },

editcategoryErr: err => {
    return {
      type: actions.EDIT_CATEGORY_ERR,
      err,
    };
  },

  editcategoryBegin: () => {
    return {
      type: actions.POST_PARTNERCOURSE_BEGINE,
    };
  },

  addPartnerCourseSuccess: data => {
    return {
      type: actions.POST_PARTNERCOURSE_SUCCESS,
      data,
    };
  },

editcategoryErr: err => {
    return {
      type: actions.POST_PARTNERCOURSE_ERR,
      err,
    };
  },
  
};

export default actions;
