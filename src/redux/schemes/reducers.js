import actions from './actions';

const {
  GET_SCHEMECATEGOTRY_BEGINE,
  GET_SCHEMECATEGOTRY_SUCCESS,
  GET_SCHEMECATEGOTRY_ERR,

  ADD_SCHEMECATEGOTRY_BEGINE,
  ADD_SCHEMECATEGOTRY_SUCCESS,
  ADD_SCHEMECATEGOTRY_ERR,

  EDIT_SCHEMECATEGOTRY_BEGINE,
  EDIT_SCHEMECATEGOTRY_SUCCESS,
  EDIT_SCHEMECATEGOTRY_ERR,

  GET_SCHEMENBENIFITS_BEGINE,
  GET_SCHEMENBENIFITS_SUCCESS,
  GET_SCHEMENBENIFITS_ERR,

  ADD_SCHEMEN_BEGINE,
  ADD_SCHEMEN_SUCCESS,
  ADD_SCHEMEN_ERR,

  ADD_STATE_BEGINE,
  ADD_STATE_SUCCESS,
  ADD_STATE_ERR,

  GET_SCHEMEN_BEGINE,
  GET_SCHEMEN_SUCCESS,
  GET_SCHEMEN_ERR,

  GET_ONESCHEME_BEGINE,
  GET_ONESCHEME_SUCCESS,
  GET_ONESCHEME_ERR,

  EDIT_SCHEME_BEGINE,
  EDIT_SCHEME_SUCCESS,
  EDIT_SCHEME_ERR,

  GET_ALLSCHEMES_BEGINE,
  GET_ALLSCHEMES_SUCCESS,
  GET_ALLSCHEMES_ERR,

  ADD_SCHEME_IN_BULK_BEGINE,
  ADD_SCHEME_IN_BULK_SUCCESS,
  ADD_SCHEME_IN_BULK_ERR,

  GET_SCHEMERATING_BEGINE,
  GET_SCHEMERATING_SUCCESS,
  GET_SCHEMERATING_ERR,

  EDIT_SCHEME_RATING_BEGINE,
  EDIT_SCHEME_RATING_SUCCESS,
  EDIT_SCHEME_RATING_ERR,

  GET_ONESCHEME_RATING_BEGINE,
  GET_ONESCHEME_RATING_SUCCESS,
  GET_ONESCHEME_RATING_ERR,

  ADD_SCHEME_CATEGORY_IN_BULK_BEGINE,
  ADD_SCHEME_CATEGORY_IN_BULK_SUCCESS,
  ADD_SCHEME_CATEGORY_IN_BULK_ERR,

  ADD_UPADTE_BANNER_BEGINE,
  ADD_UPADTE_BANNER_SUCCESS,
  ADD_UPADTE_BANNER_ERR,

} = actions;

const initialState = {
  loading: false,
  error: null,
  schemeCatogeryData: null,
  addSchemeCatogeryData: null,
  editSchemeCatogeryData: null,
  schemeBenefitData: null,
  addSchemeData: null,
  addSchemeErr: null,
  editSchemeData: null,
  editSchemeErr: null,
  getAllSchemeData: null,
  addState: null,
  getOneSchemeData: null,
  allSchemeData: null,
  editSchemeCatogeryError: null,
  addSchemeInBulk: null,
  addSchemeInBulkErr: null,
  schemeRatingData: null,
  editSchemeRatingData: null,
  getOneSchemeRatingData: null,

  importSchemeCategoryBegin: null,
  importSchemeCategoryData: null,
  importSchemeCategoryError: null,
  addSchemeBenefitBulkData: null,
  getBenefitData: null,

  upadteBannerData: null,
  upadteBannerError: null,
};

const schemeReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case GET_SCHEMECATEGOTRY_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GET_SCHEMECATEGOTRY_SUCCESS:
      return {
        ...state,
        schemecatogeryData: data,
        loading: false,
      };
    case GET_SCHEMECATEGOTRY_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case ADD_SCHEMECATEGOTRY_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case ADD_SCHEMECATEGOTRY_SUCCESS:
      return {
        ...state,
        addSchemeCatogeryData: data,
        loading: false,
      };
    case ADD_SCHEMECATEGOTRY_ERR:
      return {
        ...state,
        addSchemeCatogeryError: err,
        loading: false,
      };

    case EDIT_SCHEMECATEGOTRY_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case EDIT_SCHEMECATEGOTRY_SUCCESS:
      return {
        ...state,
        editSchemeCatogeryData: data,
        loading: false,
      };
    case EDIT_SCHEMECATEGOTRY_ERR:
      return {
        ...state,
        editSchemeCatogeryError: err,
        loading: false,
      };

    case GET_SCHEMENBENIFITS_BEGINE:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case GET_SCHEMENBENIFITS_SUCCESS:
      return {
        ...state,
        error: err,
        schemeBenefitData: data,
        loading: false,
      };

    case GET_SCHEMENBENIFITS_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case ADD_SCHEMEN_BEGINE:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case ADD_SCHEMEN_SUCCESS:
      return {
        ...state,
        error: err,
        addSchemeData: data,
        loading: false,
      };

    case ADD_SCHEMEN_ERR:
      return {
        ...state,
        addSchemeErr: err,
        loading: false,
      };

    case ADD_STATE_BEGINE:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case ADD_STATE_SUCCESS:
      return {
        ...state,
        error: err,
        addState: data,
        loading: false,
      };

    case ADD_STATE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case GET_SCHEMEN_BEGINE:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case GET_SCHEMEN_SUCCESS:
      return {
        ...state,
        getAllSchemeData: data,
        loading: false,
      };

    case GET_SCHEMEN_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case GET_ONESCHEME_BEGINE:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case GET_ONESCHEME_SUCCESS:
      return {
        ...state,
        getOneSchemeData: data,
        loading: false,
      };

    case GET_ONESCHEME_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case EDIT_SCHEME_BEGINE:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case EDIT_SCHEME_SUCCESS:
      return {
        ...state,
        editSchemeData: data,
        loading: false,
      };

    case EDIT_SCHEME_ERR:
      return {
        ...state,
        editSchemeErr: err,
        loading: false,
      };

    case GET_ALLSCHEMES_BEGINE:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case GET_ALLSCHEMES_SUCCESS:
      return {
        ...state,
        allSchemeData: data,
        loading: false,
      };

    case GET_ALLSCHEMES_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case ADD_SCHEME_IN_BULK_BEGINE:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case ADD_SCHEME_IN_BULK_SUCCESS:
      return {
        ...state,
        addSchemeInBulk: data,
        loading: false,
      };

    case ADD_SCHEME_IN_BULK_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case GET_SCHEMERATING_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GET_SCHEMERATING_SUCCESS:
      return {
        ...state,
        schemeRatingData: data,
        loading: false,
      };
    case GET_SCHEMERATING_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case EDIT_SCHEME_RATING_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case EDIT_SCHEME_RATING_SUCCESS:
      return {
        ...state,
        editSchemeRatingData: data,
        loading: false,
      };
    case EDIT_SCHEME_RATING_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case GET_ONESCHEME_RATING_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GET_ONESCHEME_RATING_SUCCESS:
      return {
        ...state,
        getOneSchemeRatingData: data,
        loading: false,
      };
    case GET_ONESCHEME_RATING_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };


    case ADD_SCHEME_CATEGORY_IN_BULK_BEGINE:
      return {
        ...state,
        loading: true,
      };

    case ADD_SCHEME_CATEGORY_IN_BULK_SUCCESS:
      return {
        ...state,
        importSchemeCategoryData: data,
        loading: false,
      };
    case ADD_SCHEME_CATEGORY_IN_BULK_ERR:
      return {
        ...state,
        importSchemeCategoryError: err,
        loading: false,
      };
    case ADD_UPADTE_BANNER_BEGINE:
      return {
        ...state,
        loading: true
      }
    case ADD_UPADTE_BANNER_SUCCESS:
      return {
        ...state,
        upadteBannerData: data,
        loading: false,
      }
    case ADD_UPADTE_BANNER_ERR:
      return {
        ...state,
        upadteBannerError: err,
        loading: false,
      }

    default:
      return state;
  }
};

export default schemeReducer;
