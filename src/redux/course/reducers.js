import actions from './actions';

const {
  POST_CATEGORY_BEGINE,
  POST_CATEGORY_SUCCESS,
  POST_CATEGORY_ERR,

  GET_CATEGORY_BEGINE,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_ERR,

  EDIT_CATEGORY_BEGINE,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_ERR,

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

  ADD_PARTNER_COURSE_IN_BULK_BEGINE,
  ADD_PARTNER_COURSE_IN_BULK_SUCCESS,
  ADD_PARTNER_COURSE_IN_BULK_ERR,

  ADD_SWAYAM_COURSE_IN_BULK_BEGINE,
  ADD_SWAYAM_COURSE_IN_BULK_SUCCESS,
  ADD_SWAYAM_COURSE_IN_BULK_ERR,


    //--- CourseRating --- 
  POST_ADD_COURSE_RATING_BEGINE,
  POST_ADD_COURSE_RATING_SUCCESS,
  POST_ADD_COURSE_RATING_ERR,

  GET_COURSE_RATING_BEGINE,
  GET_COURSE_RATING_SUCCESS,
  GET_COURSE_RATING_ERR,

  POST_COURSE_RATING_BY_ID_BEGINE,
  POST_COURSE_RATING_BY_ID_SUCCESS,
  POST_COURSE_RATING_BY_ID_ERR,

  GET_SPECIFIC_COURSE_RATING_BEGINE,
  GET_SPECIFIC_COURSE_RATING_SUCCESS,
  GET_SPECIFIC_COURSE_RATING_ERR,

  GET_SPECIFIC_USER_COURSE_RATING_BEGINE,
  GET_SPECIFIC_USER_COURSE_RATING_SUCCESS,
  GET_SPECIFIC_USER_COURSE_RATING_ERR,

  EDIT_COURSE_RATING_BEGINE,
  EDIT_COURSE_RATING_SUCCESS,
  EDIT_COURSE_RATING_ERR,

} = actions;

const initialState = {
  data: null,
  loading: false,
  error: null,
  postcategoryData: null,
  postcategoryError: null,
  editcategoryData: null,
  categoryData: null,
  courseFilterData: null,
  editFilterData: null,
  editPartnerCourseData: null,
  editPartnerCourseError: null,
  postPartnerCourseData: null,
  postPartnerCourseDataerr: null,
  addSwayamCourseData: null,
  addSwayamCourseDataErr: null,
  editSwayamCourseData: null,
  editSwayamCourseErr: null,
  addSwayamCourseModuleData: null,
  getSwayamCourseModuleData: null,
  addSwayamCourseModuleError: null,
  editSwayamCourseModuleData: null,
  getSwayamCourseModuleData: null,
  addSwayamCourseModuleError: null,
  getAllCourse: null,
  editCategoryError: null,
  addPartnerCourseInBulkData: null,
  addPartnerCourseInBulkError: null,
  addSwayamCourseInBulkData: null,
  addSwayamCourseInBulkError: null,
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
        postcategoryError: err,
        loading: false,
      };

    case EDIT_CATEGORY_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case EDIT_CATEGORY_SUCCESS:
      return {
        ...state,
        editcategoryData: data,
        loading: false,
      };
    case EDIT_CATEGORY_ERR:
      return {
        ...state,
        editCategoryError: err,
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
        editPartnerCourseError: err,
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
        postPartnerCourseDataerr: err,
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
        addSwayamCourseDataErr: err,
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
        editSwayamCourseErr: err,
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
        addSwayamCourseModuleError: err,
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

      case ADD_PARTNER_COURSE_IN_BULK_BEGINE:
        return {
          ...state,
          loading: true,
        };
      case ADD_PARTNER_COURSE_IN_BULK_SUCCESS:
        return {
          ...state,
          addPartnerCourseInBulkData: data,
          loading: false,
        };
      case ADD_PARTNER_COURSE_IN_BULK_ERR:
        return {
          ...state,
          addPartnerCourseInBulkError: err,
          loading: false,
        };

      case ADD_SWAYAM_COURSE_IN_BULK_BEGINE:
        return {
          ...state,
          loading: true,
        };
      case ADD_SWAYAM_COURSE_IN_BULK_SUCCESS:
        return {
          ...state,
          addSwayamCourseInBulkData: data,
          loading: false,
        };
      case ADD_SWAYAM_COURSE_IN_BULK_ERR:
        return {
          ...state,
          addSwayamCourseInBulkError: err,
          loading: false,
        };


       //--- CourseRating --- 
        case POST_ADD_COURSE_RATING_BEGINE :
          return{
            ...state,
            loading : false,
          }
          case POST_ADD_COURSE_RATING_SUCCESS:
             return {
               ...state,
               addCourseRatingData:data,
               loading : false ,
             }
             case POST_ADD_COURSE_RATING_ERR:
              return {
                ...state,
                addCourseRatingError:err,
                loading : false ,
              }

              case GET_COURSE_RATING_BEGINE :
                return{
                  ...state,
                  loading : false,
                }
                case GET_COURSE_RATING_SUCCESS:
                   return {
                     ...state,
                     CourseRatingData:data,
                     loading : false ,
                   }
                   case GET_COURSE_RATING_ERR:
                    return {
                      ...state,
                    CourseRatingError:err,
                      loading : false ,
                    }

                    case POST_COURSE_RATING_BY_ID_BEGINE :
                      return{
                        ...state,
                        loading : false,
                      }
                      case POST_COURSE_RATING_BY_ID_SUCCESS:
                         return {
                           ...state,
                          CourseRatingByIdData:data,
                           loading : false ,
                         }
                         case POST_COURSE_RATING_BY_ID_ERR:
                          return {
                            ...state,
                            CourseRatingByIdError:err,
                            loading : false ,
                          }

                          case GET_SPECIFIC_COURSE_RATING_BEGINE :
                            return{
                              ...state,
                              loading : false,
                            }
                            case GET_SPECIFIC_COURSE_RATING_SUCCESS:
                               return {
                                 ...state,
                                 SpecificCourseRatingData:data,
                                 loading : false ,
                               }
                               case GET_SPECIFIC_COURSE_RATING_ERR:
                                return {
                                  ...state,
                                  SpecificCourseRatingError:err,
                                  loading : false ,
                                }

                                case GET_SPECIFIC_USER_COURSE_RATING_BEGINE :
                                  return{
                                    ...state,
                                    loading : false,
                                  }
                                  case GET_SPECIFIC_USER_COURSE_RATING_SUCCESS:
                                     return {
                                       ...state,
                                    SpecificUserCourseRatingData:data,
                                       loading : false ,
                                     }
                                     case GET_SPECIFIC_USER_COURSE_RATING_ERR:
                                      return {
                                        ...state,
                                   SpecificUserCourseRatingError:err,
                                        loading : false ,
                                      }

                                      case EDIT_COURSE_RATING_BEGINE :
                                        return{
                                          ...state,
                                          loading : false,
                                        }
                                        case EDIT_COURSE_RATING_SUCCESS:
                                           return {
                                             ...state,
                                             editCategoryRatingData:data,
                                             loading : false ,
                                           }
                                           case EDIT_COURSE_RATING_ERR:
                                            return {
                                              ...state,
                                              editCategoryRatingError:err,
                                              loading : false ,
                                            }


    default:
      return state;
  }
};

export default cateGoryReducer;
