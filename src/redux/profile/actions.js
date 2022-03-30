const actions = {
  PROFILE_FRIENDS_BEGIN: 'PROFILE_FRIENDS_BEGIN',
  PROFILE_FRIENDS_SUCCESS: 'PROFILE_FRIENDS_SUCCESS',
  PROFILE_FRIENDS_ERR: 'PROFILE_FRIENDS_ERR',

  GET_PROFILE_DATA_BEGIN: 'GET_PROFILE_DATA_BEGIN',
  GET_PROFILE_DATA_SUCCESS: 'GET_PROFILE_DATA_SUCCESS',
  GET_PROFILE_DATA_ERR: 'GET_PROFILE_DATA_ERR',

  profileFriendsBegin: () => {
    return {
      type: actions.PROFILE_FRIENDS_BEGIN,
    };
  },

  profileFriendsSuccess: data => {
    return {
      type: actions.PROFILE_FRIENDS_SUCCESS,
      data,
    };
  },

  profileFriendsErr: err => {
    return {
      type: actions.PROFILE_FRIENDS_ERR,
      err,
    };
  },

  getProfileDataBegin: () => {
    return {
      type: actions.GET_PROFILE_DATA_BEGIN,
    };
  },

  getProfileDataSuccess: data => {
    return {
      type: actions.GET_PROFILE_DATA_SUCCESS,
      data,
    };
  },

  getProfileDataErr: err => {
    return {
      type: actions.GET_PROFILE_DATA_ERR,
      err,
    };
  },
};

export default actions;
