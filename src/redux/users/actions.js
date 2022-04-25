const actions = {
    ADD_USERSIGNUP_BEGINE:"ADD_USERSIGNUP_BEGINE",
    ADD_USERSIGNUP_SUCCESS:"ADD_USERSIGNUP_SUCCESS",
    ADD_USERSIGNUP_ERR:"ADD_USERSIGNUP_ERR",
 
    GET_ALLUSER_BEGINE:"GET_ALLUSER_BEGINE",
    GET_ALLUSER_SUCCESS:"GET_ALLUSER_SUCCESS",
    GET_ALLUSER_ERR:"GET_ALLUSER_ERR", //   

    EDIT_PROFILE_BEGINE:"EDIT_PROFILE_BEGINE",
    EDIT_PROFILE_SUCCESS:"EDIT_PROFILE_SUCCESS",
    EDIT_PROFILE_ERR:"EDIT_PROFILE_ERR",  

    GET_ONEUSER_BEGINE:"GET_ONEUSER_BEGINE",
    GET_ONEUSER_SUCCESS:"GET_ONEUSER_SUCCESS",
    GET_ONEUSER_ERR:"GET_ONEUSER_ERR", 
    
    GET_ALLUSERS_BEGINE:"GET_ALLUSERS_BEGINE",
    GET_ALLUSERS_SUCCESS:"GET_ALLUSERS_SUCCESS",
    GET_ALLUSERS_ERR:"GET_ALLUSERS_ERR",

  
    getSchemecategoryBegin: () => {
      return {
        type: actions.ADD_USERSIGNUP_BEGINE,
      };
    },
  
    addUserSignupSuccess: data => {
      return {
        type: actions.ADD_USERSIGNUP_SUCCESS,
        data,
      };
    },
  
    addUserSignupErr: err => {
      return {
        type: actions.ADD_USERSIGNUP_ERR,
        err,
      };
    },

    getAllUserBegin: () => {
        return {
          type: actions.GET_ALLUSER_BEGINE,
        };
      },
    
      getAllUserSuccess: data => {
        return {
          type: actions.GET_ALLUSER_SUCCESS,
          data,
        };
      },
    
      getAllUserErr: err => {
        return {
          type: actions.GET_ALLUSER_ERR,
          err,
        };
      },

      editProfileBegin: () => {
        return {
          type: actions.EDIT_PROFILE_BEGINE,
        };
      },
    
      editProfileSuccess: data => {
        return {
          type: actions.EDIT_PROFILE_SUCCESS,
          data,
        };
      },
    
      editProfileErr: err => {
        return {
          type: actions.EDIT_PROFILE_ERR,
          err,
        };
      },
  
      getOneUserBegin: () => {
        return {
          type: actions.GET_ONEUSER_BEGINE,
        };
      },
    
      getOneUserSuccess: data => {
        return {
          type: actions.GET_ONEUSER_SUCCESS,
          data,
        };
      },
    
      getOneUserErr: err => {
        return {
          type: actions.GET_ONEUSER_ERR,
          err,
        };
      },

      allUserBegin: () => {
        return {
          type: actions.GET_ALLUSERS_BEGINE,
        };
      },
    
      allUserSuccess: data => {
        return {
          type: actions.GET_ALLUSERS_SUCCESS,
          data,
        };
      },
    
      allUserErr: err => {
        return {
          type: actions.GET_ALLUSERS_ERR,
          err,
        };
      },
    
  
  };
  export default actions;