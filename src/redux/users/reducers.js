import actions from "./actions";

const {
  ADD_USERSIGNUP_BEGINE,
  ADD_USERSIGNUP_SUCCESS,
  ADD_USERSIGNUP_ERR,

  GET_ALLUSER_BEGINE,
  GET_ALLUSER_SUCCESS,
  GET_ALLUSER_ERR,

  GET_ONEUSER_BEGINE,
  GET_ONEUSER_SUCCESS,
  GET_ONEUSER_ERR,

  GET_ALLUSERS_BEGINE,
  GET_ALLUSERS_SUCCESS,
  GET_ALLUSERS_ERR,

  EDIT_PROFILE_BEGINE,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_ERR,

  GET_USER_RATING_BEGINE,
  GET_USER_RATING_SUCCESS,
  GET_USER_RATING_ERR,

} = actions;

const initialState = {
  loading: false,
  error: null,
  addUserSignupData: null,
  userSignupErr: null,
  getAllUser: null,
  getOneUser: null,
  allUser: null,
  editProfileData:null,
  editProfileErr:null,
  getUserRatingData:null,
};

const userReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case ADD_USERSIGNUP_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case ADD_USERSIGNUP_SUCCESS:
      return {
        ...state,
        addUserSignupData: data,
        loading: false,
      };
    case ADD_USERSIGNUP_ERR:
      return {
        ...state,
        userSignupErr: err,
        loading: false,
      };

    case GET_ALLUSER_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GET_ALLUSER_SUCCESS:
      return {
        ...state,
        getAllUser: data,
        loading: false,
      };
    case GET_ALLUSER_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case GET_ONEUSER_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GET_ONEUSER_SUCCESS:
      return {
        ...state,
        getOneUser: data,
        loading: false,
      };
    case GET_ONEUSER_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    case GET_ALLUSERS_BEGINE:
      return {
        ...state,
        loading: true,
      };
    case GET_ALLUSERS_SUCCESS:
      return {
        ...state,
        allUser: data,
        loading: false,
      };
    case GET_ALLUSERS_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

      case EDIT_PROFILE_BEGINE:
        return {
          ...state,
          loading: true,
        };
      case EDIT_PROFILE_SUCCESS:
        return {
          ...state,
          editProfileData: data,
          loading: false,
        };
      case EDIT_PROFILE_ERR:
        return {
          ...state,
          editProfileErr: err,
          loading: false,
        };

        case GET_USER_RATING_BEGINE:
          return {
            ...state,
            loading: true,
          };
        case GET_USER_RATING_SUCCESS:
          return {
            ...state,
            getUserRatingData: data,
            loading: false,
          };
        case GET_USER_RATING_ERR:
          return {
            ...state,
            editProfileErr: err,
            loading: false,
          };



    default:
      return state;
  }
};

export default userReducer;