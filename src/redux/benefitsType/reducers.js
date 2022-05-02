import actions from './actions';

const {

  POST_BENEFITS_BEGINE,
  POST_BENEFITS_SUCCESS,
  POST_BENEFITS_ERR,

  GET_BENEFITS_BEGINE,
  GET_BENEFITS_SUCCESS,
  GET_BENEFITS_ERR,

  EDIT_BENEFITS_BEGINE,
  EDIT_BENEFITS_SUCCESS,
  EDIT_BENEFITS_ERR,

} = actions;

const initialState = {
  data: null,
  loading: false,
  error: null,
  postStateData:null,
  postBenefitsData:null,
  getBenefitData:null,
  editBenefitData:null,
};

const BenefitsReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case POST_BENEFITS_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case POST_BENEFITS_SUCCESS:
      return {
        ...state,
        postBenefitsData:data,
        loading: false,
      };
    case POST_BENEFITS_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
      
      case GET_BENEFITS_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GET_BENEFITS_SUCCESS:
      return {
        ...state,
        getBenefitData:data,
        loading: false,
      };
    case GET_BENEFITS_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
      
      case EDIT_BENEFITS_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case EDIT_BENEFITS_SUCCESS:
      return {
        ...state,
        editBenefitData:data,
        loading: false,
      };
    case EDIT_BENEFITS_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };


    default:
      return state;
  }
};

export default BenefitsReducer;
