const actions = {

  POST_BENEFITS_BEGINE:"POST_BENEFITS_BEGINE",
  POST_BENEFITS_SUCCESS:"POST_BENEFITS_SUCCESS",
  POST_BENEFITS_ERR:"POST_BENEFITS_ERR",

  GET_BENEFITS_BEGINE:"GET_BENEFITS_BEGINE",
  GET_BENEFITS_SUCCESS:"GET_BENEFITS_SUCCESS",
  GET_BENEFITS_ERR:"GET_BENEFITS_ERR",

  EDIT_BENEFITS_BEGINE:"EDIT_BENEFITS_BEGINE",
  EDIT_BENEFITS_SUCCESS:"EDIT_BENEFITS_SUCCESS",
  EDIT_BENEFITS_ERR:"EDIT_BENEFITS_ERR",

  ADD_SCHEMEBENEFITS_BULK_BEGINE: 'ADD_SCHEMEBENEFITS_BULK_BEGINE', // FOR IMPORT SCHEME-BENEFITS
  ADD_SCHEMEBENEFITS_BULK_SUCCESS: 'ADD_SCHEMEBENEFITS_BULK_SUCCESS',
  ADD_SCHEMEBENEFITS_BULK_ERR: 'ADD_SCHEMEBENEFITS_BULK_ERR',

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

  getBenefitsBegin: () => {
    return {
      type: actions.GET_BENEFITS_BEGINE,
    };
  },

  getBenefitsSuccess: data => {
    return {
      type: actions.GET_BENEFITS_SUCCESS,
      data,
    };
  },

  getBenefitsErr: err => {
    return {
      type: actions.GET_BENEFITS_ERR,
      err,
    };
  },

  editBenefitsBegin: () => {
    return {
      type: actions.EDIT_BENEFITS_BEGINE,
    };
  },

  editBenefitsSuccess: data => {
    return {
      type: actions.EDIT_BENEFITS_SUCCESS,
      data,
    };
  },

  editBenefitsErr: err => {
    return {
      type: actions.EDIT_BENEFITS_ERR,
      err,
    };
  },

  addSchemeBenefitBulkBegin: () => {
    return {
      type: actions.ADD_SCHEMEBENEFITS_BULK_BEGINE,
    };
  },

  addSchemeBenefitBulkSuccess: data => {
    return {
      type: actions.ADD_SCHEMEBENEFITS_BULK_SUCCESS,
      data,
    };
  },

  addSchemeBenefitBulkErr: err => {
    return {
      type: actions.ADD_SCHEMEBENEFITS_BULK_ERR,
      err,
    };
  },

};

export default actions;
