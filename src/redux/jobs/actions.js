const actions = {
    GET_JOBCATEGOTRY_BEGINE:"GET_JOBCATEGOTRY_BEGINE",
    GET_JOBCATEGOTRY_SUCCESS:"GET_JOBCATEGOTRY_SUCCESS",
    GET_JOBCATEGOTRY_ERR:"GET_JOBCATEGOTRY_ERR",
    
    ADD_JOBCATEGOTRY_BEGINE:"ADD_JOBCATEGOTRY_BEGINE",
    ADD_JOBCATEGOTRY_SUCCESS:"ADD_JOBCATEGOTRY_SUCCESS",
    ADD_JOBCATEGOTRY_ERR:"ADD_JOBCATEGOTRY_ERR",
    
    EDIT_JOBCATEGOTRY_BEGINE:"EDIT_JOBCATEGOTRY_BEGINE",
    EDIT_JOBCATEGOTRY_SUCCESS:"EDIT_JOBCATEGOTRY_SUCCESS",
    EDIT_JOBCATEGOTRY_ERR:"EDIT_JOBCATEGOTRY_ERR",
   
    getJobcategoryBegin: () => {
      return {
        type: actions.GET_JOBCATEGOTRY_BEGINE,
      };
    },
  
    getJobcategorySuccess: data => {
      return {
        type: actions.GET_JOBCATEGOTRY_SUCCESS,
        data,
      };
    },
  
    getJobcategoryErr: err => {
      return {
        type: actions.GET_JOBCATEGOTRY_ERR,
        err,
      };
    },
  
    
    addJobcategoryBegin: () => {
      return {
        type: actions.ADD_JOBCATEGOTRY_BEGINE,
      };
    },
  
    addJobcategorySuccess: data => {
      return {
        type: actions.ADD_JOBCATEGOTRY_SUCCESS,
        data,
      };
    },
  
    addJobcategoryErr: err => {
      return {
        type: actions.ADD_JOBCATEGOTRY_ERR,
        err,
      };
    },
    
    
    editJobcategoryBegin: () => {
      return {
        type: actions.EDIT_JOBCATEGOTRY_BEGINE,
      };
    },
  
    editJobcategorySuccess: data => {
      return {
        type: actions.EDIT_JOBCATEGOTRY_SUCCESS,
        data,
      };
    },
  
    editJobcategoryErr: err => {
      return {
        type: actions.EDIT_JOBCATEGOTRY_ERR,
        err,
      };
    },
    
  
  };
  export default actions;