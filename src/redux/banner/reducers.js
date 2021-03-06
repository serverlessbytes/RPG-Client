import actions from "./actions";

const {
  ADD_BANNER_BEGINE,
  ADD_BANNER_SUCCESS,
  ADD_BANNER_ERR,

  GET_BANNER_BEGINE,
  GET_BANNER_SUCCESS,
  GET_BANNER_ERR,

  GETONE_BANNER_BEGINE,
  GETONE_BANNER_SUCCESS,
  GETONE_BANNER_ERR,

  EDIT_BANNER_BEGINE,
  EDIT_BANNER_SUCCESS,
  EDIT_BANNER_ERR,

  ADD_BULK_BANNER_BEGIN,
  ADD_BULK_BANNER_SUCCESS,
  ADD_BULK_BANEER_ERR,

  GET_EXPORT_BANNER_BEGIN,
  GET_EXPORT_BANNER_SUCCESS,
  GET_EXPORT_BANNER_ERR,

} = actions;

const initialState = {
  loading: false,
  error: null,
  addBannerData: null,
  addBannerError: null,
  getBannerData: null,
  getBannerError: null,
  getOneBannerData: null,
  getOneBannerError: null,
  editBannerData: null,
  editBannerError: null,
  addBulkbannerData: null,
  addBulkbannerErr: null,
  getExportBannerData: null,
  getExportBannerErr: null,
};

const bannerReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case ADD_BANNER_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case ADD_BANNER_SUCCESS:
      return {
        ...state,
        addBannerData: data,
        loading: false,
      };
    case ADD_BANNER_ERR:
      return {
        ...state,
        addBannerError: err,
        loading: false,
      };

    case GET_BANNER_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GET_BANNER_SUCCESS:
      return {
        ...state,
        getBannerData: data,
        loading: false,
      };
    case GET_BANNER_ERR:
      return {
        ...state,
        getBannerError: err,
        loading: false,
      };

    case GETONE_BANNER_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GETONE_BANNER_SUCCESS:
      return {
        ...state,
        getOneBannerData: data,
        loading: false,
      };
    case GETONE_BANNER_ERR:
      return {
        ...state,
        getOneBannerError: err,
        loading: false,
      };

    case EDIT_BANNER_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case EDIT_BANNER_SUCCESS:
      return {
        ...state,
        editBannerData: data,
        loading: false,
      };
    case EDIT_BANNER_ERR:
      return {
        ...state,
        editBannerError: err,
        loading: false,
      };

    case ADD_BULK_BANNER_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case ADD_BULK_BANNER_SUCCESS:
      return {
        ...state,
        addBulkbannerData: data,
        loading: false,
      };

    case ADD_BULK_BANEER_ERR:
      return {
        ...state,
        addBulkbannerErr: err,
        loading: false,
      };

    case GET_EXPORT_BANNER_BEGIN:
      return {
        ...state,
        loading: true,
      };

    case GET_EXPORT_BANNER_SUCCESS:
      return {
        ...state,
        getExportBannerData: data,
        loading: false,
      };

    case GET_EXPORT_BANNER_ERR:
      return {
        ...state,
        getExportBannerErr: err,
        loading: false,
      };

    default:
      return state;
  }
};

export default bannerReducer;