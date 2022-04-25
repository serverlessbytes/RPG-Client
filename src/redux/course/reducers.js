import actions from './actions';

const {

  POST_CATEGORY_BEGINE,
  POST_CATEGORY_SUCCESS,
  POST_CATEGORY_ERR,

  GET_CATEGORY_BEGINE,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_ERR,

  GET_COURSEFILTER_BEGINE,
  GET_COURSEFILTER_SUCCESS,
  GET_COURSEFILTER_ERR,

  EDIT_COURSEFILTER_BEGINE,
  EDIT_COURSEFILTER_SUCCESS,
  EDIT_COURSEFILTER_ERR,

  EDIT_PARTNER_COURSE_BEGINE,
  EDIT_PARTNER_COURSE_SUCCESS,
  EDIT_PARTNER_COURSE_ERR,

  POST_PARTNERCOURSE_BEGINE,
  POST_PARTNERCOURSE_SUCCESS,
  POST_PARTNERCOURSE_ERR,

  ADD_SWAYAM_COURSE_BEGINE,
  ADD_SWAYAM_COURSE_SUCCESS,
  ADD_SWAYAM_COURSE_ERR,

  EDIT_SWAYAM_COURSE_BEGINE,
  EDIT_SWAYAM_COURSE_SUCCESS,
  EDIT_SWAYAM_COURSE_ERR,

  ADD_SWAYAM_COURSE_MODULE_BEGINE,
  ADD_SWAYAM_COURSE_MODULE_SUCCESS,
  ADD_SWAYAM_COURSE_MODULE_ERR,

  GET_SWAYAM_COURSE_MODULE_BEGINE,
  GET_SWAYAM_COURSE_MODULE_SUCCESS,
  GET_SWAYAM_COURSE_MODULE_ERR,

  EDIT_SWAYAM_COURSE_MODULE_BEGINE,
  EDIT_SWAYAM_COURSE_MODULE_SUCCESS,
  EDIT_SWAYAM_COURSE_MODULE_ERR,

  GET_ALLSWAYAM_COURSE_BEGINE,
  GET_ALLSWAYAM_COURSE_SUCCESS,
  GET_ALLSWAYAM_COURSE_ERR,


} = actions;

const initialState = {
  data: null,
  loading: false,
  error: null,
  postcategoryData: null,
  categoryData: null,
  courseFilterData: null,
  editFilterData: null,
  editPartnerCourseData:null,
  postPartnerCourseData:null,
  addSwayamCourseData:null,
  editSwayamCourseData:null,
  addSwayamCourseModuleData:null,
  getSwayamCourseModuleData:null,
  editSwayamCourseModuleData:null,
  getAllCourse:null,
};

const cateGoryReducer = (state = initialState, action) => {
  const { type, data, err } = action
  switch (type) {
    case POST_CATEGORY_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case POST_CATEGORY_SUCCESS:
      return {
        ...state,
        postcategoryData: data,
        loading: false,
      };
    case POST_CATEGORY_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case GET_CATEGORY_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryData: data,
        loading: false,
      };
    case GET_CATEGORY_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case GET_COURSEFILTER_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GET_COURSEFILTER_SUCCESS:
      return {
        ...state,
        courseFilterData: data,
        loading: false,
      };
    case GET_COURSEFILTER_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case EDIT_COURSEFILTER_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case EDIT_COURSEFILTER_SUCCESS:
      return {
        ...state,
        editFilterData: data,
        loading: false,
      };
    case EDIT_COURSEFILTER_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case EDIT_PARTNER_COURSE_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case EDIT_PARTNER_COURSE_SUCCESS:
      return {
        ...state,
        editPartnerCourseData: data,
        loading: false,
      };
    case EDIT_PARTNER_COURSE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
  
      case POST_PARTNERCOURSE_BEGINE:
        return {
          ...state,
          loading: true,
        };
      case POST_PARTNERCOURSE_SUCCESS:
        return {
          ...state,
          postPartnerCourseData: data,
          loading: false,
        };
      case POST_PARTNERCOURSE_ERR:
        return {
          ...state,
          error: err,
          loading: false,
        };
      case ADD_SWAYAM_COURSE_BEGINE:
        return {
          ...state,
          loading: true,
        };
      case ADD_SWAYAM_COURSE_SUCCESS:
        return {
          ...state,
          addSwayamCourseData: data,
          loading: false,
        };
      case ADD_SWAYAM_COURSE_ERR:
        return {
          ...state,
          error: err,
          loading: false,
        };

        case EDIT_SWAYAM_COURSE_BEGINE:
          return {
            ...state,
            loading: true,
          };
        case EDIT_SWAYAM_COURSE_SUCCESS:
          return {
            ...state,
            editSwayamCourseData: data,
            loading: false,
          };
        case EDIT_SWAYAM_COURSE_ERR:
          return {
            ...state,
            error: err,
            loading: false,
          };

        case ADD_SWAYAM_COURSE_MODULE_BEGINE:
          return {
            ...state,
            loading: true,
          };
        case ADD_SWAYAM_COURSE_MODULE_SUCCESS:
          return {
            ...state,
            addSwayamCourseModuleData: data,
            loading: false,
          };
        case ADD_SWAYAM_COURSE_MODULE_ERR:
          return {
            ...state,
            error: err,
            loading: false,
          };

        case GET_SWAYAM_COURSE_MODULE_BEGINE:
          return {
            ...state,
            loading: true,
          };
        case GET_SWAYAM_COURSE_MODULE_SUCCESS:
          return {
            ...state,
            getSwayamCourseModuleData: data,
            loading: false,
          };
        case GET_SWAYAM_COURSE_MODULE_ERR:
          return {
            ...state,
            error: err,
            loading: false,
          };

          case EDIT_SWAYAM_COURSE_MODULE_BEGINE:
            return {
              ...state,
              loading: true,
            };
          case EDIT_SWAYAM_COURSE_MODULE_SUCCESS:
            return {
              ...state,
              editSwayamCourseModuleData: data,
              loading: false,
            };
          case EDIT_SWAYAM_COURSE_MODULE_ERR:
            return {
              ...state,
              error: err,
              loading: false,
            };

            case GET_ALLSWAYAM_COURSE_BEGINE:
            return {
              ...state,
              loading: true,
            };
          case GET_ALLSWAYAM_COURSE_SUCCESS:
            return {
              ...state,
              getAllCourse: data,
              loading: false,
            };
          case GET_ALLSWAYAM_COURSE_ERR:
            return {
              ...state,
              error: err,
              loading: false,
            };


    default:
      return state;
  }
};

export default cateGoryReducer;
