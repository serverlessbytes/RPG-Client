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

    GET_JOBROLE_BEGINE:"GET_JOBROLE_BEGINE",
    GET_JOBROLE_SUCCESS:"GET_JOBROLE_SUCCESS",
    GET_JOBROLE_ERR:"GET_JOBROLE_ERR",
    
    ADD_JOBROLE_BEGINE:"ADD_JOBROLE_BEGINE",
    ADD_JOBROLE_SUCCESS:"ADD_JOBROLE_SUCCESS",
    ADD_JOBROLE_ERR:"ADD_JOBROLE_ERR",
    
    EDIT_JOBROLE_BEGINE:"EDIT_JOBROLE_BEGINE",
    EDIT_JOBROLE_SUCCESS:"EDIT_JOBROLE_SUCCESS",
    EDIT_JOBROLE_ERR:"EDIT_JOBROLE_ERR",

    ADD_JOBPOST_BEGINE:"ADD_JOBPOST_BEGINE",
    ADD_JOBPOST_SUCCESS:"ADD_JOBPOST_SUCCESS",
    ADD_JOBPOST_ERR:"ADD_JOBPOST_ERR",

    GET_JOBPOST_BEGINE:"GET_JOBPOST_BEGINE",
    GET_JOBPOST_SUCCESS:"GET_JOBPOST_SUCCESS",
    GET_JOBPOST_ERR:"GET_JOBPOST_ERR",

    EDIT_JOBPOST_BEGINE:"EDIT_JOBPOST_BEGINE",
    EDIT_JOBPOST_SUCCESS:"EDIT_JOBPOST_SUCCESS",
    EDIT_JOBPOST_ERR:"EDIT_JOBPOST_ERR",

    GETONE_JOBPOST_BEGINE:"GETONE_JOBPOST_BEGINE",
    GETONE_JOBPOST_SUCCESS:"GETONE_JOBPOST_SUCCESS",
    GETONE_JOBPOST_ERR:"GETONE_JOBPOST_ERR",

    GET_JOBSFILTER_BEGINE:"GET_JOBSFILTER_BEGINE",
    GET_JOBSFILTER_SUCCESS:"GET_JOBSFILTER_SUCCESS",
    GET_JOBSFILTER_ERR:"GET_JOBSFILTER_ERR", 
    
   
    getJobcategoryBegin: () => {
      return {
        type: actions.GET_JOBCATEGOTRY_BEGINE,
      };
    },
  
    getJobcategorySuccess: data => {
      //console.log("getJobcategorySuccess=====data",data);
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
    

    getJobroleBegin: () => {
      return {
        type: actions.GET_JOBROLE_BEGINE,
      };
    },
  
    getJobroleSuccess: data => {
      return {
        type: actions.GET_JOBROLE_SUCCESS,
        data,
      };
    },
  
    getJobroleErr: err => {
      return {
        type: actions.GET_JOBROLE_ERR,
        err,
      };
    },
  
    addJobroleBegin: () => {
      return {
        type: actions.ADD_JOBROLE_BEGINE,
      };
    },
  
    addJobroleSuccess: data => {
      return {
        type: actions.ADD_JOBROLE_SUCCESS,
        data,
      };
    },
  
    addJobroleErr: err => {
      return {
        type: actions.ADD_JOBROLE_ERR,
        err,
      };
    },
    
    
    editJobroleBegin: () => {
      return {
        type: actions.EDIT_JOBROLE_BEGINE,
      };
    },
  
    editJobroleSuccess: data => {
      return {
        type: actions.EDIT_JOBROLE_SUCCESS,
        data,
      };
    },
  
    editJobroleErr: err => {
      return {
        type: actions.EDIT_JOBROLE_ERR,
        err,
      };
    },

    addJobPostBegin: () => {
      return {
        type: actions.ADD_JOBPOST_BEGINE,
      };
    },
  
    addJobPostSuccess: data => {
      return {
        type: actions.ADD_JOBPOST_SUCCESS,
        data,
      };
    },
  
    addJobPostErr: err => {
      return {
        type: actions.ADD_JOBPOST_ERR,
        err,
      };
    },

    getJobPostBegin: () => {
      return {
        type: actions.GET_JOBPOST_BEGINE,
      };
    },
  
    getJobPostSuccess: data => {
      return {
        type: actions.GET_JOBPOST_SUCCESS,
        data,
      };
    },
  
    getJobPostErr: err => {
      return {
        type: actions.GET_JOBPOST_ERR,
        err,
      };
    },
    
    editJobPostBegin: () => {
      return {
        type: actions.EDIT_JOBPOST_BEGINE,
      };
    },
  
    editJobPostSuccess: data => {
      return {
        type: actions.EDIT_JOBPOST_SUCCESS,
        data,
      };
    },
  
    editJobPostErr: err => {
      return {
        type: actions.EDIT_JOBPOST_ERR,
        err,
      };
    },

    getoneJobPostBegin: () => {
      return {
        type: actions.GETONE_JOBPOST_BEGINE,
      };
    },
  
    getoneJobPostSuccess: data => {
      console.log("dataa",data)
      return {
        type: actions.GETONE_JOBPOST_SUCCESS,
        data,
      };
    },
  
    getoneJobPostErr: err => {
      return {
        type: actions.GETONE_JOBPOST_ERR,
        err,
      };
    },

    getJobsFilterForMainBegin: () => {
      return {
        type: actions.GET_JOBSFILTER_BEGINE,
      };
    },
  
    getJobsFilterForMainSuccess: data => {
      return {
        type: actions.GET_JOBSFILTER_SUCCESS,
        data,
      };
    },
  
    getJobsFilterForMainErr: err => {
      return {
        type: actions.GET_JOBSFILTER_ERR,
        err,
      };
    },
  
  };
  export default actions;