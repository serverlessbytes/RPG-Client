const actions = {
  GET_SCHEMECATEGOTRY_BEGINE: 'GET_SCHEMECATEGOTRY_BEGINE',
  GET_SCHEMECATEGOTRY_SUCCESS: 'GET_SCHEMECATEGOTRY_SUCCESS',
  GET_SCHEMECATEGOTRY_ERR: 'GET_SCHEMECATEGOTRY_ERR',

  ADD_SCHEMECATEGOTRY_BEGINE: 'ADD_SCHEMECATEGOTRY_BEGINE',
  ADD_SCHEMECATEGOTRY_SUCCESS: 'ADD_SCHEMECATEGOTRY_SUCCESS',
  ADD_SCHEMECATEGOTRY_ERR: 'ADD_SCHEMECATEGOTRY_ERR',

  EDIT_SCHEMECATEGOTRY_BEGINE: 'EDIT_SCHEMECATEGOTRY_BEGINE',
  EDIT_SCHEMECATEGOTRY_SUCCESS: 'EDIT_SCHEMECATEGOTRY_SUCCESS',
  EDIT_SCHEMECATEGOTRY_ERR: 'EDIT_SCHEMECATEGOTRY_ERR',

  GET_SCHEMENBENIFITS_BEGINE: 'GET_SCHEMENBENIFITS_BEGINE',
  GET_SCHEMENBENIFITS_SUCCESS: 'GET_SCHEMENBENIFITS_SUCCESS',
  GET_SCHEMENBENIFITS_ERR: 'GET_SCHEMENBENIFITS_ERR',

  ADD_SCHEMEN_BEGINE: 'ADD_SCHEMEN_BEGINE',
  ADD_SCHEMEN_SUCCESS: 'ADD_SCHEMEN_SUCCESS',
  ADD_SCHEMEN_ERR: 'ADD_SCHEMEN_ERR',

  ADD_STATE_BEGINE: 'ADD_STATE_BEGINE',
  ADD_STATE_SUCCESS: 'ADD_STATE_SUCCESS',
  ADD_STATE_ERR: 'ADD_STATE_ERR',

  GET_SCHEMEN_BEGINE: 'GET_SCHEMEN_BEGINE',
  GET_SCHEMEN_SUCCESS: 'GET_SCHEMEN_SUCCESS',
  GET_SCHEMEN_ERR: 'GET_SCHEMEN_ERR',

  GET_ONESCHEME_BEGINE: 'GET_ONESCHEME_BEGINE',
  GET_ONESCHEME_SUCCESS: 'GET_ONESCHEME_SUCCESS',
  GET_ONESCHEME_ERR: 'GET_ONESCHEME_ERR',

  EDIT_SCHEME_BEGINE: 'EDIT_SCHEME_BEGINE',
  EDIT_SCHEME_SUCCESS: 'EDIT_SCHEME_SUCCESS',
  EDIT_SCHEME_ERR: 'EDIT_SCHEME_ERR',

  GET_ALLSCHEMES_BEGINE: 'GET_ALLSCHEMES_BEGINE',
  GET_ALLSCHEMES_SUCCESS: 'GET_ALLSCHEMES_SUCCESS',
  GET_ALLSCHEMES_ERR: 'GET_ALLSCHEMES_ERR',

  ADD_SCHEME_IN_BULK_BEGINE: 'ADD_SCHEME_IN_BULK_BEGINE',
  ADD_SCHEME_IN_BULK_SUCCESS: 'ADD_SCHEME_IN_BULK_SUCCESS',
  ADD_SCHEME_IN_BULK_ERR: 'ADD_SCHEME_IN_BULK_ERR',

  ADD_SCHEME_CATEGORY_IN_BULK_BEGINE: 'ADD_SCHEME_CATEGORY_IN_BULK_BEGINE',
  ADD_SCHEME_CATEGORY_IN_BULK_SUCCESS: 'ADD_SCHEME_CATEGORY_IN_BULK_SUCCESS',
  ADD_SCHEME_CATEGORY_IN_BULK_ERR: 'ADD_SCHEME_CATEGORY_IN_BULK_ERR',

  GET_SCHEMERATING_BEGINE: 'GET_SCHEMERATING_BEGINE',
  GET_SCHEMERATING_SUCCESS: 'GET_SCHEMERATING_SUCCESS',
  GET_SCHEMERATING_ERR: 'GET_SCHEMERATING_ERR',

  EDIT_SCHEME_RATING_BEGINE: 'EDIT_SCHEME_RATING_BEGINE',
  EDIT_SCHEME_RATING_SUCCESS: 'EDIT_SCHEME_RATING_SUCCESS',
  EDIT_SCHEME_RATING_ERR: 'EDIT_SCHEME_RATING_ERR',

  GET_ONESCHEME_RATING_BEGINE: 'GET_ONESCHEME_RATING_BEGINE',
  GET_ONESCHEME_RATING_SUCCESS: 'GET_ONESCHEME_RATING_SUCCESS',
  GET_ONESCHEME_RATING_ERR: 'GET_ONESCHEME_RATING_ERR',

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

  getstateBegin: () => {
    return {
      type: actions.ADD_STATE_BEGINE,
    };
  },

  getstateSuccess: data => {
    return {
      type: actions.ADD_STATE_SUCCESS,
      data,
    };
  },

  getstateErr: err => {
    return {
      type: actions.ADD_STATE_ERR,
      err,
    };
  },

  addSchemecategoryBegin: () => {
    return {
      type: actions.ADD_SCHEMECATEGOTRY_BEGINE,
    };
  },

  addSchemecategorySuccess: data => {
    return {
      type: actions.ADD_SCHEMECATEGOTRY_SUCCESS,
      data,
    };
  },

  addSchemecategoryErr: err => {
    return {
      type: actions.ADD_SCHEMECATEGOTRY_ERR,
      err,
    };
  },

  editSchemecategoryBegin: () => {
    return {
      type: actions.EDIT_SCHEMECATEGOTRY_BEGINE,
    };
  },

  editSchemecategorySuccess: data => {
    return {
      type: actions.EDIT_SCHEMECATEGOTRY_SUCCESS,
      data,
    };
  },

  editSchemecategoryErr: err => {
    return {
      type: actions.EDIT_SCHEMECATEGOTRY_ERR,
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

  getSchemenBegin: () => {
    return {
      type: actions.GET_SCHEMEN_BEGINE,
    };
  },

  getSchemeSuccess: data => {
    return {
      type: actions.GET_SCHEMEN_SUCCESS,
      data,
    };
  },

  getSchemenErr: err => {
    return {
      type: actions.GET_SCHEMEN_ERR,
      err,
    };
  },

  getOneSchemenBegin: () => {
    return {
      type: actions.GET_ONESCHEME_BEGINE,
    };
  },

  getOneSchemeSuccess: data => {
    return {
      type: actions.GET_ONESCHEME_SUCCESS,
      data,
    };
  },

  getOneSchemenErr: err => {
    return {
      type: actions.GET_ONESCHEME_ERR,
      err,
    };
  },

  editSchemeBegin: () => {
    return {
      type: actions.EDIT_SCHEME_BEGINE,
    };
  },

  editSchemeSuccess: data => {
    return {
      type: actions.EDIT_SCHEME_SUCCESS,
      data,
    };
  },

  editSchemeErr: err => {
    return {
      type: actions.EDIT_SCHEME_ERR,
      err,
    };
  },

  getAllSchemeBegin: () => {
    return {
      type: actions.GET_ALLSCHEMES_BEGINE,
    };
  },

  getAllSchemesSuccess: data => {
    return {
      type: actions.GET_ALLSCHEMES_SUCCESS,
      data,
    };
  },

  getAllSchemesErr: err => {
    return {
      type: actions.GET_ALLSCHEMES_ERR,
      err,
    };
  },

  addSchemeInBulkErr: err => {
    return {
      type: actions.ADD_SCHEME_IN_BULK_ERR,
      err,
    };
  },

  addSchemeInBulk: data => {
    return {
      type: actions.ADD_SCHEME_IN_BULK_SUCCESS,
      data,
    };
  },

  getSchemeRatingBegin: () => {
    return {
      type: actions.GET_SCHEMERATING_BEGINE,
    };
  },

  getSchemeRatingSuccess: data => {
    return {
      type: actions.GET_SCHEMERATING_SUCCESS,
      data,
    };
  },

  getSchemeRatingErr: err => {
    return {
      type: actions.GET_SCHEMERATING_ERR,
      err,
    };
  },

  editSchemeRatingBegin: () => {
    return {
      type: actions.EDIT_SCHEME_RATING_BEGINE,
    };
  },

  editSchemeRatingSuccess: data => {
    return {
      type: actions.EDIT_SCHEME_RATING_SUCCESS,
      data,
    };
  },

  editSchemeRatingErr: err => {
    return {
      type: actions.EDIT_SCHEME_RATING_ERR,
      err,
    };
  },

  getOneSchemeRatingBegin: () => {
    return {
      type: actions.GET_ONESCHEME_RATING_BEGINE,
    };
  },

  getOneSchemeRatingSuccess: data => {
    return {
      type: actions.GET_ONESCHEME_RATING_SUCCESS,
      data,
    };
  },

  getOneSchemeRatingErr: err => {
    return {
      type: actions.GET_ONESCHEME_RATING_ERR,
      err,
    };
  },

  addSchemeCategoryInBulkBegin: () => {
    return{
      type: actions.ADD_SCHEME_CATEGORY_IN_BULK_BEGINE
    }
  },

  addSchemeCategoryInBulkSuccess: (data) => {
    return{
      type: actions.ADD_SCHEME_CATEGORY_IN_BULK_SUCCESS,
      data
    }
  },

  addSchemeCategoryInBulkErr: (err) => {
    return{
      type: actions.ADD_SCHEME_CATEGORY_IN_BULK_ERR,
      err
    }
  }

};
export default actions;
