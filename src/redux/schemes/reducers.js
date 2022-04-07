import actions from "./actions";

const {
  GET_SCHEMECATEGOTRY_BEGINE,
  GET_SCHEMECATEGOTRY_SUCCESS,
  GET_SCHEMECATEGOTRY_ERR,

  ADD_SCHEMECATEGOTRY_BEGINE,
  ADD_SCHEMECATEGOTRY_SUCCESS,
  ADD_SCHEMECATEGOTRY_ERR,

  GET_SCHEMENBENIFITS_BEGINE,
  GET_SCHEMENBENIFITS_SUCCESS,
  GET_SCHEMENBENIFITS_ERR,

  ADD_SCHEMEN_BEGINE,
  ADD_SCHEMEN_SUCCESS,
  ADD_SCHEMEN_ERR,

} = actions;

const initialState = {
  loading: false,
  error: null,
  schemeCatogeryData: null,
  addSchemeCatogeryData: null,
  schemeBenefitData: null,
  addSchemeData:null
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
        error: err,
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
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default schemeReducer;