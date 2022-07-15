const actions = {
  ADD_CAROUSEL_BEGINE: "ADD_CAROUSEL_BEGINE",
  ADD_CAROUSEL_SUCCESS: "ADD_CAROUSEL_SUCCESS",
  ADD_CAROUSEL_ERR: "ADD_CAROUSEL_ERR",

  GET_CAROUSEL_BEGINE: "GET_CAROUSEL_BEGINE",
  GET_CAROUSEL_SUCCESS: "GET_CAROUSEL_SUCCESS",
  GET_CAROUSEL_ERR: "GET_CAROUSEL_ERR",

  GETONE_CAROUSEL_BEGINE: "GETONE_CAROUSEL_BEGINE",
  GETONE_CAROUSEL_SUCCESS: "GETONE_CAROUSEL_SUCCESS",
  GETONE_CAROUSEL_ERR: "GETONE_CAROUSEL_ERR",

  EDIT_CAROUSEL_BEGINE: "EDIT_CAROUSEL_BEGINE",
  EDIT_CAROUSEL_SUCCESS: "EDIT_CAROUSEL_SUCCESS",
  EDIT_CAROUSEL_ERR: "EDIT_CAROUSEL_ERR",

  ADD_BULK_CAROUSEL_BEGINE: "ADD_BULK_CAROUSEL_BEGINE",
  ADD_BULK_CAROUSEL_SUCCESS: "ADD_BULK_CAROUSEL_SUCCESS",
  ADD_BULK_CAROUSEL_ERR: "ADD_BULK_CAROUSEL_ERR",

  GET_EXPORT_CAROUSEL_BEGINE: "GET_EXPORT_CAROUSEL_BEGINE",
  GET_EXPORT_CAROUSEL_SUCCESS: "GET_EXPORT_CAROUSEL_SUCCESS",
  GET_EXPORT_CAROUSEL_ERR: "GET_EXPORT_CAROUSEL_ERR",

  addCarouselBegin: () => {
    return {
      type: actions.ADD_CAROUSEL_BEGINE,
    };
  },

  addCarouselSuccess: data => {
    return {
      type: actions.ADD_CAROUSEL_SUCCESS,
      data,
    };
  },

  addCarouselErr: err => {
    return {
      type: actions.ADD_CAROUSEL_ERR,
      err,
    };
  },

  getCarouselBegin: () => {
    return {
      type: actions.GET_CAROUSEL_BEGINE,
    };
  },

  getCarouselSuccess: data => {
    return {
      type: actions.GET_CAROUSEL_SUCCESS,
      data,
    };
  },

  getCarouselErr: err => {
    return {
      type: actions.GET_CAROUSEL_ERR,
      err,
    };
  },

  getOneCarouselBegin: () => {
    return {
      type: actions.GETONE_CAROUSEL_BEGINE,
    };
  },

  getOneCarouselSuccess: data => {
    return {
      type: actions.GETONE_CAROUSEL_SUCCESS,
      data,
    };
  },

  getOneCarouselErr: err => {
    return {
      type: actions.GETONE_CAROUSEL_ERR,
      err,
    };
  },

  editCarouselBegin: () => {
    return {
      type: actions.EDIT_CAROUSEL_BEGINE,
    };
  },

  editCarouselSuccess: data => {
    return {
      type: actions.EDIT_CAROUSEL_SUCCESS,
      data,
    };
  },

  editCarouselErr: err => {
    return {
      type: actions.EDIT_CAROUSEL_ERR,
      err,
    };
  },

  addBulkCarouselBegin: () => {
    return {
      type: actions.ADD_BULK_CAROUSEL_BEGINE,
    };
  },

  addBulkCarouselSuccess: data => {
    return {
      type: actions.ADD_BULK_CAROUSEL_SUCCESS,
      data,
    };
  },

  addBulkCarouselErr: err => {
    return {
      type: actions.ADD_BULK_CAROUSEL_ERR,
      err,
    };
  },

  getExportCarouselsBegin: () => {
    return {
      type: actions.GET_EXPORT_CAROUSEL_BEGINE,
    };
  },

  getExportCarouselsSuccess: data => {
    return {
      type: actions.GET_EXPORT_CAROUSEL_SUCCESS,
      data,
    };
  },

  getExportCarouselsErr: err => {
    return {
      type: actions.GET_EXPORT_CAROUSEL_ERR,
      err,
    };
  },


};
export default actions;