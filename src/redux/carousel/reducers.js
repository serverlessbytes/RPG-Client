import actions from "./actions";

const {
  ADD_CAROUSEL_BEGINE,
  ADD_CAROUSEL_SUCCESS,
  ADD_CAROUSEL_ERR,

  GET_CAROUSEL_BEGINE,
  GET_CAROUSEL_SUCCESS,
  GET_CAROUSEL_ERR,

  GETONE_CAROUSEL_BEGINE,
  GETONE_CAROUSEL_SUCCESS,
  GETONE_CAROUSEL_ERR,

  EDIT_CAROUSEL_BEGINE,
  EDIT_CAROUSEL_SUCCESS,
  EDIT_CAROUSEL_ERR,

  ADD_BULK_CAROUSEL_BEGINE,
  ADD_BULK_CAROUSEL_SUCCESS,
  ADD_BULK_CAROUSEL_ERR,

} = actions;

const initialState = {
  loading: false,
  error: null,
  addCarouselData: null,
  addCarouselError: null,
  getCarouselData: null,
  getCarouselError: null,
  getOneCarouselData: null,
  getOneCarouselError: null,
  editCarouselData: null,
  editCarouselError: null,
  addBulkCarouselData : null,
  addBulkCarouselError : null,
};

const carouselReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case ADD_CAROUSEL_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case ADD_CAROUSEL_SUCCESS:
      return {
        ...state,
        addCarouselData: data,
        loading: false,
      };
    case ADD_CAROUSEL_ERR:
      return {
        ...state,
        addCarouselError: err,
        loading: false,
      };

    case GET_CAROUSEL_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GET_CAROUSEL_SUCCESS:
      return {
        ...state,
        getCarouselData: data,
        loading: false,
      };
    case GET_CAROUSEL_ERR:
      return {
        ...state,
        getCarouselError: err,
        loading: false,
      };

    case GETONE_CAROUSEL_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GETONE_CAROUSEL_SUCCESS:
      return {
        ...state,
        getOneCarouselData: data,
        loading: false,
      };
    case GETONE_CAROUSEL_ERR:
      return {
        ...state,
        getOneCarouselError: err,
        loading: false,
      };

    case EDIT_CAROUSEL_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case EDIT_CAROUSEL_SUCCESS:
      return {
        ...state,
        editCarouselData: data,
        loading: false,
      };
    case EDIT_CAROUSEL_ERR:
      return {
        ...state,
        editCarouselError: err,
        loading: false,
      };

    case ADD_BULK_CAROUSEL_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case ADD_BULK_CAROUSEL_SUCCESS:
      return {
        ...state,
        addBulkCarouselData: data,
        loading: false,
      };
    case ADD_BULK_CAROUSEL_ERR:
      return {
        ...state,
        addBulkCarouselError: err,
        loading: false,
      };


    default:
      return state;
  }
};

export default carouselReducer;