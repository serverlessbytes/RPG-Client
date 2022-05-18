import { data } from "browserslist";
const actions = {
  POST_CATEGORY_BEGINE: 'POST_CATEGORY_BEGINE',
  POST_CATEGORY_SUCCESS: 'POST_CATEGORY_SUCCESS',
  POST_CATEGORY_ERR: 'POST_CATEGORY_ERR',

  GET_CATEGORY_BEGINE: 'GET_CATEGORY_BEGINE',
  GET_CATEGORY_SUCCESS: 'GET_CATEGORY_SUCCESS',
  GET_CATEGORY_ERR: 'GET_CATEGORY_ERR',

  EDIT_CATEGORY_BEGINE: 'EDIT_CATEGORY_BEGINE',
  EDIT_CATEGORY_SUCCESS: 'EDIT_CATEGORY_SUCCESS',
  EDIT_CATEGORY_ERR: 'EDIT_CATEGORY_ERR',

  POST_PARTNERCOURSE_BEGINE: 'POST_PARTNERCOURSE_BEGINE',
  POST_PARTNERCOURSE_SUCCESS: 'POST_PARTNERCOURSE_SUCCESS',
  POST_PARTNERCOURSE_ERR: 'POST_PARTNERCOURSE_ERR',

  GET_COURSEFILTER_BEGINE: 'GET_COURSEFILTER_BEGINE',
  GET_COURSEFILTER_SUCCESS: 'GET_COURSEFILTER_SUCCESS',
  GET_COURSEFILTER_ERR: 'GET_COURSEFILTER_ERR',

  EDIT_COURSEFILTER_BEGINE: 'EDIT_COURSEFILTER_BEGINE',
  EDIT_COURSEFILTER_SUCCESS: 'EDIT_COURSEFILTER_SUCCESS',
  EDIT_COURSEFILTER_ERR: 'EDIT_COURSEFILTER_ERR',

  EDIT_PARTNER_COURSE_BEGINE: 'EDIT_PARTNER_COURSE_BEGINE',
  EDIT_PARTNER_COURSE_SUCCESS: 'EDIT_PARTNER_COURSE_SUCCESS',
  EDIT_PARTNER_COURSE_ERR: 'EDIT_PARTNER_COURSE_ERR',

  ADD_SWAYAM_COURSE_BEGINE: 'ADD_SWAYAM_COURSE_BEGINE',
  ADD_SWAYAM_COURSE_SUCCESS: 'ADD_SWAYAM_COURSE_SUCCESS',
  ADD_SWAYAM_COURSE_ERR: 'ADD_SWAYAM_COURSE_ERR',

  EDIT_SWAYAM_COURSE_BEGINE: 'EDIT_SWAYAM_COURSE_BEGINE',
  EDIT_SWAYAM_COURSE_SUCCESS: 'EDIT_SWAYAM_COURSE_SUCCESS',
  EDIT_SWAYAM_COURSE_ERR: 'EDIT_SWAYAM_COURSE_ERR',

  ADD_SWAYAM_COURSE_MODULE_BEGINE: 'ADD_SWAYAM_COURSE_MODULE_BEGINE',
  ADD_SWAYAM_COURSE_MODULE_SUCCESS: 'ADD_SWAYAM_COURSE_MODULE_SUCCESS',
  ADD_SWAYAM_COURSE_MODULE_ERR: 'ADD_SWAYAM_COURSE_MODULE_ERR',

  GET_SWAYAM_COURSE_MODULE_BEGINE: 'GET_SWAYAM_COURSE_MODULE_BEGINE',
  GET_SWAYAM_COURSE_MODULE_SUCCESS: 'GET_SWAYAM_COURSE_MODULE_SUCCESS',
  GET_SWAYAM_COURSE_MODULE_ERR: 'GET_SWAYAM_COURSE_MODULE_ERR',

  EDIT_SWAYAM_COURSE_MODULE_BEGINE: 'EDIT_SWAYAM_COURSE_MODULE_BEGINE',
  EDIT_SWAYAM_COURSE_MODULE_SUCCESS: 'EDIT_SWAYAM_COURSE_MODULE_SUCCESS',
  EDIT_SWAYAM_COURSE_MODULE_ERR: 'EDIT_SWAYAM_COURSE_MODULE_ERR',

  GET_ALLSWAYAM_COURSE_BEGINE: 'GET_ALLSWAYAM_COURSE_BEGINE',
  GET_ALLSWAYAM_COURSE_SUCCESS: 'GET_ALLSWAYAM_COURSE_SUCCESS',
  GET_ALLSWAYAM_COURSE_ERR: 'GET_ALLSWAYAM_COURSE_ERR',

  ADD_PARTNER_COURSE_IN_BULK_BEGINE: 'ADD_PARTNER_COURSE_IN_BULK_BEGINE',
  ADD_PARTNER_COURSE_IN_BULK_SUCCESS: 'ADD_PARTNER_COURSE_IN_BULK_SUCCESS',
  ADD_PARTNER_COURSE_IN_BULK_ERR: 'ADD_PARTNER_COURSE_IN_BULK_ERR',

  ADD_SWAYAM_COURSE_IN_BULK_BEGINE: 'ADD_SWAYAM_COURSE_IN_BULK_BEGINE',
  ADD_SWAYAM_COURSE_IN_BULK_SUCCESS: 'ADD_SWAYAM_COURSE_IN_BULK_SUCCESS',
  ADD_SWAYAM_COURSE_IN_BULK_ERR: 'ADD_SWAYAM_COURSE_IN_BULK_ERR',

  
  //--- CourseRating --- 
  POST_ADD_COURSE_RATING_BEGINE: 'POST_ADD_COURSE_RATING_BEGINE',
  POST_ADD_COURSE_RATING_SUCCESS: 'POST_ADD_COURSE_RATING_SUCCESS',
  POST_ADD_COURSE_RATING_ERR: 'POST_ADD_COURSE_RATING_ERR',

  GET_COURSE_RATING_BEGINE: 'GET_COURSE_RATING_BEGINE',
  GET_COURSE_RATING_SUCCESS: 'GET_COURSE_RATING_SUCCESS',
  GET_COURSE_RATING_ERR: 'GET_COURSE_RATING_ERR',

  POST_COURSE_RATING_BY_ID_BEGINE: 'POST_COURSE_RATING_BY_ID_BEGINE',
  POST_COURSE_RATING_BY_ID_SUCCESS: 'POST_COURSE_RATING_BY_ID_SUCCESS',
  POST_COURSE_RATING_BY_ID_ERR: 'POST_COURSE_RATING_BY_ID_ERR',

  GET_SPECIFIC_COURSE_RATING_BEGINE: 'GET_SPECIFIC_COURSE_RATING_BEGINE',
  GET_SPECIFIC_COURSE_RATING_SUCCESS: 'GET_SPECIFIC_COURSE_RATING_SUCCESS',
  GET_SPECIFIC_COURSE_RATING_ERR: 'GET_SPECIFIC_COURSE_RATING_ERR',

  GET_SPECIFIC_USER_COURSE_RATING_BEGINE: 'GET_SPECIFIC_USER_COURSE_RATING_BEGINE',
  GET_SPECIFIC_USER_COURSE_RATING_SUCCESS: 'GET_SPECIFIC_USER_COURSE_RATING_SUCCESS',
  GET_SPECIFIC_USER_COURSE_RATING_ERR: 'GET_SPECIFIC_USER_COURSE_RATING_ERR',

  EDIT_COURSE_RATING_BEGINE: 'EDIT_COURSE_RATING_BEGINE',
  EDIT_COURSE_RATING_SUCCESS: 'EDIT_COURSE_RATING_SUCCESS',
  EDIT_COURSE_RATING_ERR: 'EDIT_COURSE_RATING_ERR',

  postCategoryBegin: () => {
    return {
      type: actions.POST_CATEGORY_BEGINE,
    };
  },

  postCategorySuccess: data => {
    return {
      type: actions.POST_CATEGORY_SUCCESS,
      data,
    };
  },

  postCategoryDataErr: err => {
    return {
      type: actions.POST_CATEGORY_ERR,
      err,
    };
  },

  getcategoryBegin: () => {
    return {
      type: actions.GET_CATEGORY_BEGINE,
    };
  },

  getcategorySuccess: data => {
    return {
      type: actions.GET_CATEGORY_SUCCESS,
      data,
    };
  },

  getcategoryErr: err => {
    return {
      type: actions.GET_CATEGORY_ERR,
      err,
    };
  },
  editcategoryBegin: () => {
    return {
      type: actions.EDIT_CATEGORY_BEGINE,
    };
  },

  editCategorySuccess: data => {
    //console.log("datata",data);
    return {
      type: actions.EDIT_CATEGORY_SUCCESS,
      data,
    };
  },

  editcategoryErr: err => {
    return {
      type: actions.EDIT_CATEGORY_ERR,
      err,
    };
  },

  addPartnerCourseBegin: () => {
    return {
      type: actions.POST_PARTNERCOURSE_BEGINE,
    };
  },

  addPartnerCourseSuccess: data => {
    return {
      type: actions.POST_PARTNERCOURSE_SUCCESS,
      data,
    };
  },

  addPartnerCourseErr: err => {
    return {
      type: actions.POST_PARTNERCOURSE_ERR,
      err,
    };
  },

  getCourseFilterBegin: () => {
    return {
      type: actions.GET_COURSEFILTER_BEGINE,
    };
  },

  getCoursefilterSuccess: data => {
    return {
      type: actions.GET_COURSEFILTER_SUCCESS,
      data,
    };
  },

  getCoursefilterErr: err => {
    return {
      type: actions.GET_COURSEFILTER_ERR,
      err,
    };
  },
  editCourseFilterBegin: () => {
    return {
      type: actions.EDIT_COURSEFILTER_BEGINE,
    };
  },

  editCoursefilterSuccess: data => {
    return {
      type: actions.EDIT_COURSEFILTER_SUCCESS,
      data,
    };
  },

  editCoursefilterErr: err => {
    return {
      type: actions.EDIT_COURSEFILTER_ERR,
      err,
    };
  },
  editPartnerCourseBegin: () => {
    return {
      type: actions.EDIT_PARTNER_COURSE_BEGINE,
    };
  },

  editPartnerCourseSuccess: data => {
    return {
      type: actions.EDIT_PARTNER_COURSE_SUCCESS,
      data,
    };
  },

  editPartnerCourseErr: err => {
    return {
      type: actions.EDIT_PARTNER_COURSE_ERR,
      err,
    };
  },

  addSwayamCourseBegin: () => {
    return {
      type: actions.ADD_SWAYAM_COURSE_BEGINE,
    };
  },

  addSwayamPartnerCourseSuccess: data => {
    return {
      type: actions.ADD_SWAYAM_COURSE_SUCCESS,
      data,
    };
  },

  addSwayamPartnerCourseErr: err => {
    return {
      type: actions.ADD_SWAYAM_COURSE_ERR,
      err,
    };
  },

  editSwayamCourseBegin: () => {
    return {
      type: actions.EDIT_SWAYAM_COURSE_BEGINE,
    };
  },

  editSwayamPartnerCourseSuccess: data => {
    return {
      type: actions.EDIT_SWAYAM_COURSE_SUCCESS,
      data,
    };
  },

  editSwayamPartnerCourseErr: err => {
    return {
      type: actions.EDIT_SWAYAM_COURSE_ERR,
      err,
    };
  },

  addSwayamCourseModuleBegin: () => {
    return {
      type: actions.ADD_SWAYAM_COURSE_MODULE_BEGINE,
    };
  },

  addSwayamCourseModuleSuccess: data => {
    return {
      type: actions.ADD_SWAYAM_COURSE_MODULE_SUCCESS,
      data,
    };
  },

  addSwayamCourseModuleErr: err => {
    return {
      type: actions.ADD_SWAYAM_COURSE_MODULE_ERR,
      err,
    };
  },

  getSwayamCourseModuleBegin: () => {
    return {
      type: actions.GET_SWAYAM_COURSE_MODULE_BEGINE,
    };
  },

  getSwayamCourseModuleSuccess: data => {
    return {
      type: actions.GET_SWAYAM_COURSE_MODULE_SUCCESS,
      data,
    };
  },

  getSwayamCourseModuleErr: err => {
    return {
      type: actions.GET_SWAYAM_COURSE_MODULE_ERR,
      err,
    };
  },

  editSwayamCourseModuleBegin: () => {
    return {
      type: actions.EDIT_SWAYAM_COURSE_MODULE_BEGINE,
    };
  },

  editSwayamCourseModuleSuccess: data => {
    return {
      type: actions.EDIT_SWAYAM_COURSE_MODULE_SUCCESS,
      data,
    };
  },

  editSwayamCourseModuleErr: err => {
    return {
      type: actions.EDIT_SWAYAM_COURSE_MODULE_ERR,
      err,
    };
  },

  getallSwayamCourseBegin: () => {
    return {
      type: actions.GET_ALLSWAYAM_COURSE_BEGINE,
    };
  },

  getallSwayamCourseSuccess: data => {
    return {
      type: actions.GET_ALLSWAYAM_COURSE_SUCCESS,
      data,
    };
  },

  getallSwayamCourseErr: err => {
    return {
      type: actions.GET_ALLSWAYAM_COURSE_ERR,
      err,
    };
  },

  addPartnerCourseInBulkBegin: () => {
    return {
      type: actions.ADD_PARTNER_COURSE_IN_BULK_BEGINE,
    };
  },

  addPartnerCourseInBulkSuccess: data => {
    return {
      type: actions.ADD_PARTNER_COURSE_IN_BULK_SUCCESS,
      data,
    };
  },

  addPartnerCourseInBulkErr: err => {
    return {
      type: actions.ADD_PARTNER_COURSE_IN_BULK_ERR,
      err,
    };
  },

  addSwayamCourseInBulkBegin: () => {
    return {
      type: actions.ADD_SWAYAM_COURSE_IN_BULK_BEGINE,
    };
  },

  addSwayamCourseInBulkSuccess: data => {
    return {
      type: actions.ADD_SWAYAM_COURSE_IN_BULK_SUCCESS,
      data,
    };
  },

  addSwayamCourseInBulkErr: err => {
    return {
      type: actions.ADD_SWAYAM_COURSE_IN_BULK_ERR,
      err,
    };
  },

    //--- CourseRating --- 

   addCourseRatingBegin : () =>{
    return{
      type :actions.POST_ADD_COURSE_RATING_BEGINE,
    };
  },
   addCourseRatingSuccess : data =>{
    return{
      type :actions.POST_ADD_COURSE_RATING_SUCCESS,
      data,
    };
  },
   addCourseRatingErr : err =>{
    return{
      type :actions.POST_ADD_COURSE_RATING_ERR,
      err,
    };
  },

 courseRatingBeginn : () =>{
    return {
     type : actions.GET_COURSE_RATING_BEGINE , 
    };
  },
  courseRatingSuccess : data =>{
    return {
     type : actions.GET_COURSE_RATING_SUCCESS, 
     data,
    };
  },
  courseRatingErr: err =>{
    return {
     type : actions.GET_COURSE_RATING_ERR,
     err, 
    };
  },

  courseRatingByIdBegin : () =>{
    return{
      type : actions.POST_COURSE_RATING_BY_ID_BEGINE,
    };
  },
 courseRatingByIdSuccess : data =>{
    return{
      type : actions.POST_COURSE_RATING_BY_ID_SUCCESS,
      data,
    };
  },
 courseRatingByIdErr : err =>{
    return{
      type : actions.POST_COURSE_RATING_BY_ID_ERR,
      err
    };
  },

 specificCourseRatingBegin : () =>{
    return{
      type : actions.GET_SPECIFIC_COURSE_RATING_BEGINE
    };
  },
 specificCourseRatingSuccess: data =>{
    return{
      type : actions.GET_SPECIFIC_COURSE_RATING_SUCCESS,
      data
    };
  },
 specificCourseRatingErr :err =>{
    return{
      type : actions.GET_SPECIFIC_COURSE_RATING_ERR,
      err
    };
  },

 specificUserCourseRatingBegin :() =>{
    return{
      type : actions.GET_SPECIFIC_USER_COURSE_RATING_BEGINE,
      err
    };
  },
 specificUserCourseRatingSuccess :data =>{
    return{
      type : actions.GET_SPECIFIC_USER_COURSE_RATING_SUCCESS,
      data
    };
  },
specificUserCourseRatingErr : err =>{
    return{
      type : actions.GET_SPECIFIC_USER_COURSE_RATING_ERR,
      err
    };
  },

  editCategoryRatingBegin : () =>{
    return{
      type : actions.EDIT_COURSE_RATING_BEGINE,
    };
  },
  editCategoryRatingSuccess : data =>{
    return{
      type : actions.EDIT_COURSE_RATING_SUCCESS,
      data,
    };
  },
  editCategoryRatingErr : () =>{
    return{
      type : actions.EDIT_COURSE_RATING_ERR,
      err
    }
  }
  

};


export default actions;
