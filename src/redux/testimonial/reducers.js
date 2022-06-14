import actions from "./actions";

const {
  ADD_TESTIMONIAL_BEGINE,
  ADD_TESTIMONIAL_SUCCESS,
  ADD_TESTIMONIAL_ERR,

  GET_TESTIMONIAL_BEGINE,
  GET_TESTIMONIAL_SUCCESS,
  GET_TESTIMONIAL_ERR,

  EDIT_TESTIMONIAL_BEGINE,
  EDIT_TESTIMONIAL_SUCCESS,
  EDIT_TESTIMONIAL_ERR,

  GETONE_TESTIMONIAL_BEGINE,
  GETONE_TESTIMONIAL_SUCCESS,
  GETONE_TESTIMONIAL_ERR,

  ADD_BULK_TESTIMONIAL_BEGIN,
  ADD_BULK_TESTIMONIAL_SUCCESS,
  ADD_BULK_TESTIMONIAL_ERR,

  GET_EXPORT_TESTIMONIAL_BEGIN,
  GET_EXPORT_TESTIMONIAL_SUCCESS,
  GET_EXPORT_TESTIMONIAL_ERR,

} = actions;

const initialState = {
  loading: false,
  error: null,
  addTestimonialData: null,
  getTestimonialData: null,
  editTestimonialData: null,
  getOneTestimonialData: null,
  editTestimonialDataError: null,
  addTestimonialDataError: null,
  addBulkTestimonialData: null,
  addBulkTestimonialErr: null,
  getExportTestimonialData : null,
  getExportTestimonialErr : null,
};

const testimonialReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case ADD_TESTIMONIAL_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case ADD_TESTIMONIAL_SUCCESS:
      return {
        ...state,
        addTestimonialData: data,
        loading: false,
      };
    case ADD_TESTIMONIAL_ERR:
      return {
        ...state,
        addTestimonialDataError: err,
        loading: false,
      };

    case GET_TESTIMONIAL_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GET_TESTIMONIAL_SUCCESS:
      return {
        ...state,
        getTestimonialData: data,
        loading: false,
      };
    case GET_TESTIMONIAL_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case EDIT_TESTIMONIAL_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case EDIT_TESTIMONIAL_SUCCESS:
      return {
        ...state,
        editTestimonialData: data,
        loading: false,
      };
    case EDIT_TESTIMONIAL_ERR:
      return {
        ...state,
        editTestimonialDataError: err,
        loading: false,
      };

    case GETONE_TESTIMONIAL_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GETONE_TESTIMONIAL_SUCCESS:
      return {
        ...state,
        getOneTestimonialData: data,
        loading: false,
      };
    case GETONE_TESTIMONIAL_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case ADD_BULK_TESTIMONIAL_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case ADD_BULK_TESTIMONIAL_SUCCESS:
      return {
        ...state,
        addBulkTestimonialData: data,
        loading: false,
      };
    case ADD_BULK_TESTIMONIAL_ERR:
      return {
        ...state,
        addBulkTestimonialErr: err,
        loading: false,
      };

    case GET_EXPORT_TESTIMONIAL_BEGIN:
      return {
        ...state,
        loading: true,
      }
    case GET_EXPORT_TESTIMONIAL_SUCCESS:
      return {
        ...state,
        getExportTestimonialData: data,
        loading: false,
      }
      case GET_EXPORT_TESTIMONIAL_ERR:
        return{
          ...state,
          getExportTestimonialErr : err,
          loading : false,
        }
    default:
      return state;
  }
};

export default testimonialReducer;