import { async } from '@firebase/util';
import STORAGEKEY from '../../config/APP/app.config';
import { ApiGet, ApiPatch, ApiPost } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import actions from './actions';

const {
  getSchemecategorySuccess,
  getSchemecategoryErr,
  getSchemeBenifitsSuccess,

  getSchemeBenifitsErr,
  addSchemecategorySuccess,
  addSchemecategoryErr,

  editSchemecategorySuccess,
  editSchemecategoryErr,

  addSchemeSuccess,
  addSchemeErr,

  getstateBegin,
  getstateSuccess,
  getstateErr,

  getSchemeSuccess,
  getSchemenErr,

  editSchemeSuccess,
  editSchemeErr,

  getOneSchemenBegin,
  getOneSchemeSuccess,
  getOneSchemenErr,

  getAllSchemesSuccess,
  getAllSchemesErr,

  addSchemeInBulkErr,
  addSchemeInBulk,

  getSchemeRatingSuccess,
  getSchemeRatingErr,

  editSchemeRatingSuccess,
  editSchemeRatingErr,

  getOneSchemeRatingSuccess,
  getOneSchemeRatingErr,
} = actions;
let langId, per_Page, page_number, status, schemeBenifit, schemeCategory, search, page_Num;
export const getSchemecategory = () => async dispatch => {
  await ApiGet(`scheme/getSchemeCategories?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then(res => {
      return dispatch(getSchemecategorySuccess(res));
    })
    .catch(err => dispatch(getSchemecategoryErr(err)));
};

export const addSchemecategory = body => async dispatch => {
  await ApiPost(`scheme/addSchemeCategory?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then(res => {
      dispatch(addSchemecategorySuccess(res));
      return dispatch(getSchemecategory());
    })
    .catch(err => dispatch(addSchemecategoryErr(err)));
};

export const editSchemecategory = body => async dispatch => {
  await ApiPost(`scheme/editSchemeCategory`, body)
    .then(res => {
      dispatch(editSchemecategorySuccess(res));
      return dispatch(getSchemecategory());
    })
    .catch(err => dispatch(editSchemecategoryErr(err)));
};

export const getState = () => async dispatch => {
  // dispatch(getSchemecategoryBegin())
  await ApiGet(`state/getState?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then(res => {
      return dispatch(getstateSuccess(res.data));
    })
    .catch(err => dispatch(getstateErr(err)));
};

export const getSchemeBenifits = () => async dispatch => {
  // dispatch(getSchemecategoryBegin())
  await ApiGet(`scheme/getSchemeBenifits?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then(res => {
      return dispatch(getSchemeBenifitsSuccess(res.data));
    })
    .catch(err => dispatch(getSchemeBenifitsErr(err)));
};

export const addSchemeData = data => async dispatch => {
  await ApiPost(`scheme/addScheme?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, data)
    .then(res => {
      return dispatch(addSchemeSuccess(res));
    })
    .catch(err => dispatch(addSchemeErr(err)));
};

export const getSchemeData = (perPage, pageNumber, Status, Benifit, Category, searchBar) => async dispatch => {
  per_Page = perPage;
  page_number = pageNumber;
  status = Status;
  schemeBenifit = Benifit;
  schemeCategory = Category
  search = searchBar
  let URL = `scheme/getAllSchemes?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perPage}&page_number=${pageNumber}`
  if (Status) {
    URL = URL.concat(`&status=${Status} `)
  }
  if (Benifit) {
    URL = URL.concat(`&schemeBenifit=${Benifit} `)
  }
  if (Category) {
    URL = URL.concat(`&schemeCategory =${Category}`)
  }
  if (searchBar) {
    URL = URL.concat(`&search =${searchBar}`)
  }
  // let apiData;
  // if (schemeCategory && schemeBenifit) {
  //   apiData = ApiGet(
  //     `scheme/getAllSchemes?langId=${AuthStorage.getStorageData(
  //       STORAGEKEY.language,
  //     )}&per_page=${perPage}&page_number=${pageNumber}&status=${status}&schemeBenifit=${schemeBenifit}&schemeCategory=${schemeCategory}`,
  //   );
  // } else if (schemeCategory && schemeBenifit === '') {
  //   apiData = ApiGet(
  //     `scheme/getAllSchemes?langId=${AuthStorage.getStorageData(
  //       STORAGEKEY.language,
  //     )}&per_page=${perPage}&page_number=${pageNumber}&status=${status}&schemeCategory=${schemeCategory}`,
  //   );
  // } else if (schemeCategory === '' && schemeBenifit) {
  //   apiData = ApiGet(
  //     `scheme/getAllSchemes?langId=${AuthStorage.getStorageData(
  //       STORAGEKEY.language,
  //     )}&per_page=${perPage}&page_number=${pageNumber}&status=${status}&schemeBenifit=${schemeBenifit}`,
  //   );
  // } else {
  //   apiData = ApiGet(
  //     `scheme/getAllSchemes?langId=${AuthStorage.getStorageData(
  //       STORAGEKEY.language,
  //     )}&per_page=${perPage}&page_number=${pageNumber}&status=${status}`,
  //   );
  // }
  await ApiGet(URL)
    .then(res => {
      return dispatch(getSchemeSuccess(res.data));
    })
    .catch(err => dispatch(getSchemenErr(err)));
};

export const getOneSchemeData = key => async dispatch => {
  await ApiGet(`scheme/getOneScheme?key=${key}&langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then(res => {
      return dispatch(getOneSchemeSuccess(res.data));
    })
    .catch(err => dispatch(getOneSchemenErr(err)));
};
export const getAllSchemes = () => async dispatch => {
  await ApiGet(`scheme/allSchemes?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then(res => {
      return dispatch(getAllSchemesSuccess(res));
    })
    .catch(err => dispatch(getAllSchemesErr(err)));
};

export const editSchemeData = body => async dispatch => {
  await ApiPost(`scheme/editScheme`, body)
    .then(res => {
      dispatch(editSchemeSuccess(res));
      console.log('res', res);
      if (res.status === 200) {
        // redirect after click edit button on listing call getSchemeData
        dispatch(getSchemeData(per_Page, page_Num, Status));
      }
    })
    .catch(err => dispatch(editSchemeErr(err)));
};

export const addSchemeInBulkImport = body => async dispatch => {
  await ApiPost(`scheme/addSchemeInBulk?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then(res => {
      dispatch(addSchemeInBulk(res));
      console.log('res', res);
      if (res.status === 200) {
        // redirect after click edit button on listing call getSchemeData
        dispatch(getSchemeData(per_Page, page_Num, Status));
      }
    })
    .catch(err => {
      let newErr = {
        message: "Somthing went wrong",
        status: 500
      }
      dispatch(addSchemeInBulk(newErr))
    });
};

export const getSchemeRating = (perpage, pagenum) => async dispatch => {
  per_Page = perpage;
  page_Num = pagenum;
  await ApiGet(`schemeRating/getSchemeRatings?per_page=${perpage}&page_number=${pagenum}`)
    .then(res => {
      return dispatch(getSchemeRatingSuccess(res))
    })
    .catch(err => dispatch(getSchemeRatingErr(err)))
}

export const editSchemeRating = body => async dispatch => {
  await ApiPost(`schemeRating/editSchemeRating`, body)
    .then(res => {
      dispatch(editSchemeRatingSuccess(res));
      console.log('res', res);
      if (res.status === 200) {
        return dispatch(getSchemeRating(per_Page, page_Num));
      }
    })
    .catch(err => dispatch(editSchemeRatingErr(err)));
};

export const getOneSchemeRating = (id) => async dispatch => {
  await ApiGet(`schemeRating/getSchemeRating?id=${id}`)
    .then(res => {
      return dispatch(getOneSchemeRatingSuccess(res))
    })
    .catch(err => dispatch(getOneSchemeRatingErr(err)))
}
