const actions = {

  POST_CATEGORY_BEGINE: "POST_CATEGORY_BEGINE",
  POST_CATEGORY_SUCCESS: "POST_CATEGORY_SUCCESS",
  POST_CATEGORY_ERR: "POST_CATEGORY_ERR",

  GET_CATEGORY_BEGINE: "GET_CATEGORY_BEGINE",
  GET_CATEGORY_SUCCESS: "GET_CATEGORY_SUCCESS",
  GET_CATEGORY_ERR: "GET_CATEGORY_ERR",

  EDIT_CATEGORY_BEGINE: "EDIT_CATEGORY_BEGINE", 
  EDIT_CATEGORY_SUCCESS: "EDIT_CATEGORY_SUCCESS",
  EDIT_CATEGORY_ERR: "EDIT_CATEGORY_ERR",

  POST_PARTNERCOURSE_BEGINE: "POST_PARTNERCOURSE_BEGINE",
  POST_PARTNERCOURSE_SUCCESS: "POST_PARTNERCOURSE_SUCCESS",
  POST_PARTNERCOURSE_ERR: "POST_PARTNERCOURSE_ERR",

  GET_COURSEFILTER_BEGINE: "GET_COURSEFILTER_BEGINE",
  GET_COURSEFILTER_SUCCESS: "GET_COURSEFILTER_SUCCESS",
  GET_COURSEFILTER_ERR: "GET_COURSEFILTER_ERR",

  EDIT_COURSEFILTER_BEGINE: "EDIT_COURSEFILTER_BEGINE",
  EDIT_COURSEFILTER_SUCCESS: "EDIT_COURSEFILTER_SUCCESS",
  EDIT_COURSEFILTER_ERR: "EDIT_COURSEFILTER_ERR",

  EDIT_PARTNER_COURSE_BEGINE: "EDIT_PARTNER_COURSE_BEGINE",
  EDIT_PARTNER_COURSE_SUCCESS: "EDIT_PARTNER_COURSE_SUCCESS",
  EDIT_PARTNER_COURSE_ERR: "EDIT_PARTNER_COURSE_ERR",

  ADD_SWAYAM_COURSE_BEGINE:"ADD_SWAYAM_COURSE_BEGINE",
  ADD_SWAYAM_COURSE_SUCCESS:"ADD_SWAYAM_COURSE_SUCCESS",
  ADD_SWAYAM_COURSE_ERR:"ADD_SWAYAM_COURSE_ERR",

  EDIT_SWAYAM_COURSE_BEGINE:"EDIT_SWAYAM_COURSE_BEGINE",
  EDIT_SWAYAM_COURSE_SUCCESS:"EDIT_SWAYAM_COURSE_SUCCESS",
  EDIT_SWAYAM_COURSE_ERR:"EDIT_SWAYAM_COURSE_ERR",

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

  getCourseFilterBegin: () => {
    return {
      type: actions.GET_COURSEFILTER_BEGINE,
    };
  },

  getCoursefilterSuccess: data => {
    return {
      type: actions.GET_COURSEFILTER_SUCCESS,
      data,
    };
  },

  getCoursefilterErr: err => {
    return {
      type: actions.GET_COURSEFILTER_ERR,
      err,
    };
  },
  editCourseFilterBegin: () => {
    return {
      type: actions.EDIT_COURSEFILTER_BEGINE,
    };
  },

  editCoursefilterSuccess: data => {
    return {
      type: actions.EDIT_COURSEFILTER_SUCCESS,
      data,
    };
  },

  editCoursefilterErr: err => {
    return {
      type: actions.EDIT_COURSEFILTER_ERR,
      err,
    };
  },
  editPartnerCourseBegin: () => {
    return {
      type: actions.EDIT_PARTNER_COURSE_BEGINE,
    };
  },

  editPartnerCourseSuccess: data => {
    return {
      type: actions.EDIT_PARTNER_COURSE_SUCCESS,
      data,
    };
  },

  editPartnerCourseErr: err => {
    return {
      type: actions.EDIT_PARTNER_COURSE_ERR,
      err,
    };
  },

  addSwayamCourseBegin: () => {
    return {
      type: actions.ADD_SWAYAM_COURSE_BEGINE,
    };
  },

  addSwayamPartnerCourseSuccess: data => {
    return {
      type: actions.ADD_SWAYAM_COURSE_SUCCESS,
      data,
    };
  },

  addSwayamPartnerCourseErr: err => {
    return {
      type: actions.ADD_SWAYAM_COURSE_ERR,
      err,
    };
  },

  editSwayamCourseBegin: () => {
    return {
      type: actions.EDIT_SWAYAM_COURSE_BEGINE,
    };
  },

  editSwayamPartnerCourseSuccess: data => {
    return {
      type: actions.EDIT_SWAYAM_COURSE_SUCCESS,
      data,
    };
  },

  editSwayamPartnerCourseErr: err => {
    return {
      type: actions.EDIT_SWAYAM_COURSE_ERR,
      err,
    };
  },

};





export default actions;
