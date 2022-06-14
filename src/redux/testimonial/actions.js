const actions = {
  ADD_TESTIMONIAL_BEGINE:"ADD_TESTIMONIAL_BEGINE",
  ADD_TESTIMONIAL_SUCCESS:"ADD_TESTIMONIAL_SUCCESS",
  ADD_TESTIMONIAL_ERR:"ADD_TESTIMONIAL_ERR",

  GET_TESTIMONIAL_BEGINE:"GET_TESTIMONIAL_BEGINE",
  GET_TESTIMONIAL_SUCCESS:"GET_TESTIMONIAL_SUCCESS",
  GET_TESTIMONIAL_ERR:"GET_TESTIMONIAL_ERR",
  
  EDIT_TESTIMONIAL_BEGINE:"EDIT_TESTIMONIAL_BEGINE",
  EDIT_TESTIMONIAL_SUCCESS:"EDIT_TESTIMONIAL_SUCCESS",
  EDIT_TESTIMONIAL_ERR:"EDIT_TESTIMONIAL_ERR", 

  GETONE_TESTIMONIAL_BEGINE:"GETONE_TESTIMONIAL_BEGINE",
  GETONE_TESTIMONIAL_SUCCESS:"GETONE_TESTIMONIAL_SUCCESS",
  GETONE_TESTIMONIAL_ERR:"GETONE_TESTIMONIAL_ERR", 

  ADD_BULK_TESTIMONIAL_BEGIN : "ADD_BULK_TESTIMONIAL_BEGIN",
  ADD_BULK_TESTIMONIAL_SUCCESS : "ADD_BULK_TESTIMONIAL_SUCCESS",
  ADD_BULK_TESTIMONIAL_ERR: "ADD_BULK_TESTIMONIAL_ERR",

  GET_EXPORT_TESTIMONIAL_BEGIN : "GET_EXPORT_TESTIMONIAL_BEGIN",
  GET_EXPORT_TESTIMONIAL_SUCCESS : "GET_EXPORT_TESTIMONIAL_SUCCESS",
  GET_EXPORT_TESTIMONIAL_ERR: "GET_EXPORT_TESTIMONIAL_ERR",
  
  addTestimonialBegin: () => {
    return {
      type: actions.ADD_TESTIMONIAL_BEGINE,
    };
  },

  addTestimonialSuccess: data => {
    return {
      type: actions.ADD_TESTIMONIAL_SUCCESS,
      data,
    };
  },

  addTestimonialErr: err => {
    return {
      type: actions.ADD_TESTIMONIAL_ERR,
      err,
    };
  },

  
  getTestimonialBegin: () => {
    return {
      type: actions.GET_TESTIMONIAL_BEGINE,
    };
  },

  getTestimonialSuccess: data => {
    return {
      type: actions.GET_TESTIMONIAL_SUCCESS,
      data,
    };
  },

  getTestimonialErr: err => {
    return {
      type: actions.GET_TESTIMONIAL_ERR,
      err,
    };
  },

  editTestimonialBegin: () => {
    return {
      type: actions.EDIT_TESTIMONIAL_BEGINE,
    };
  },

  editTestimonialSuccess: data => {
    return {
      type: actions.EDIT_TESTIMONIAL_SUCCESS,
      data,
    };
  },

  editTestimonialErr: err => {
    return {
      type: actions.EDIT_TESTIMONIAL_ERR,
      err,
    };
  },

  getoneTestimonialDataBegin: () => {
    return {
      type: actions.GETONE_TESTIMONIAL_BEGINE,
    };
  },

  getoneTestimonialDataSuccess: data => {
    return {
      type: actions.GETONE_TESTIMONIAL_SUCCESS,
      data,
    };
  },

  getoneTestimonialDataErr: err => {
    return {
      type: actions.GETONE_TESTIMONIAL_ERR,
      err,
    };
  },

  addBulkTestimonialBegin: () => {
    return {
      type: actions.ADD_BULK_TESTIMONIAL_BEGIN,
    };
  },

  addBulkTestimonialSuccess: data => {
    return {
      type: actions.ADD_BULK_TESTIMONIAL_SUCCESS,
      data,
    };
  },

  addBulkTestimonialErr: err => {
    return {
      type: actions.ADD_BULK_TESTIMONIAL_ERR,
      err,
    };
  },

  getExportTestimonialsBegin: () => {
    return {
      type: actions.GET_EXPORT_TESTIMONIAL_BEGIN,
    };
  },

  getExportTestimonialsSuccess: data => {
    return {
      type: actions.GET_EXPORT_TESTIMONIAL_SUCCESS,
      data,
    };
  },

  getExportTestimonialsErr: err => {
    return {
      type: actions.GET_EXPORT_TESTIMONIAL_ERR,
      err,
    };
  },

};
export default actions;