import actions from './actions';

const {

  POST_BENEFITS_BEGINE,
  POST_BENEFITS_SUCCESS,
  POST_BENEFITS_ERR,

} = actions;

const initialState = {
  data: null,
  loading: false,
  error: null,
  postStateData:null
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
    default:
      return state;
  }
};

export default BenefitsReducer;
