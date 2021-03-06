const actions = {
  ADD_BANNER_BEGINE: "ADD_BANNER_BEGINE",
  ADD_BANNER_SUCCESS: "ADD_BANNER_SUCCESS",
  ADD_BANNER_ERR: "ADD_BANNER_ERR",

  GET_BANNER_BEGINE: "GET_BANNER_BEGINE",
  GET_BANNER_SUCCESS: "GET_BANNER_SUCCESS",
  GET_BANNER_ERR: "GET_BANNER_ERR",

  GETONE_BANNER_BEGINE: "GETONE_BANNER_BEGINE",
  GETONE_BANNER_SUCCESS: "GETONE_BANNER_SUCCESS",
  GETONE_BANNER_ERR: "GETONE_BANNER_ERR",

  EDIT_BANNER_BEGINE: "EDIT_BANNER_BEGINE",
  EDIT_BANNER_SUCCESS: "EDIT_BANNER_SUCCESS",
  EDIT_BANNER_ERR: "EDIT_BANNER_ERR",

  ADD_BULK_BANNER_BEGIN: "ADD_BULK_BANNER_BEGIN",
  ADD_BULK_BANNER_SUCCESS: "ADD_BULK_BANNER_SUCCESS",
  ADD_BULK_BANEER_ERR: "ADD_BULK_BANEER_ERR",

  GET_EXPORT_BANNER_BEGIN: "GET_EXPORT_BANNER_BEGIN",
  GET_EXPORT_BANNER_SUCCESS: "GET_EXPORT_BANNER_SUCCESS",
  GET_EXPORT_BANNER_ERR: "GET_EXPORT_BANNER_ERR",


  addBannerBegin: () => {
    return {
      type: actions.ADD_BANNER_BEGINE,
    };
  },

  addBannerSuccess: data => {
    return {
      type: actions.ADD_BANNER_SUCCESS,
      data,
    };
  },

  addBannerErr: err => {
    return {
      type: actions.ADD_BANNER_ERR,
      err,
    };
  },

  getBannerBegin: () => {
    return {
      type: actions.GET_BANNER_BEGINE,
    };
  },

  getBannerSuccess: data => {
    return {
      type: actions.GET_BANNER_SUCCESS,
      data,
    };
  },

  getBannerErr: err => {
    return {
      type: actions.GET_BANNER_ERR,
      err,
    };
  },

  getOneBannerBegin: () => {
    return {
      type: actions.GETONE_BANNER_BEGINE,
    };
  },

  getOneBannerSuccess: data => {
    return {
      type: actions.GETONE_BANNER_SUCCESS,
      data,
    };
  },

  getOneBannerErr: err => {
    return {
      type: actions.GETONE_BANNER_ERR,
      err,
    };
  },

  editBannerBegin: () => {
    return {
      type: actions.EDIT_BANNER_BEGINE,
    };
  },

  editBannerSuccess: data => {
    return {
      type: actions.EDIT_BANNER_SUCCESS,
      data,
    };
  },

  editBannerErr: err => {
    return {
      type: actions.EDIT_BANNER_ERR,
      err,
    };
  },

  addBulkBannerBegin: () => {
    return {
      type: actions.ADD_BULK_BANNER_BEGIN,
    };
  },

  addBulkBannerSuccess: data => {
    return {
      type: actions.ADD_BULK_BANNER_SUCCESS,
      data,
    }
  },

  addBulkBannerErr: err => {
    return {
      type: actions.ADD_BULK_BANEER_ERR,
      err,
    }
  },

  getExportBannersBegin: () => {
    return {
      type: actions.GET_EXPORT_BANNER_BEGIN,
    }
  },

  getExportBannersSuccess: data => {
    return {
      type: actions.GET_EXPORT_BANNER_SUCCESS,
      data,
    }
  },

  getExportBannersErr: err => {
    return {
      type: actions.GET_EXPORT_BANNER_ERR,
      err,
    }
  }



};
export default actions;