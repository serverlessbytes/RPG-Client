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

  addSchemeCategoryInBulkBegin,
  addSchemeCategoryInBulkSuccess,
  addSchemeCategoryInBulkErr,

  addUpadateSchemeBegin,
  addUpadateSchemeSuccess,
  addUpadateSchemeErr,

} = actions;
let langId, per_Page, page_number, status, schemeBenifit, schemeCategory, search, hindi, marathi;
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

export const addSchemeData = (langID, data) => async dispatch => {

  const formData = new FormData();
  formData.append('benificiary', data.benificiary);
  formData.append('benifitLine', data.benifitLine);
  formData.append('detail', data.detail);
  formData.append('documentation', data.documentation);
  formData.append('elink', data.elink);
  formData.append('grievanceRedress', data.grievanceRedress);
  formData.append('howToApply', data.howToApply);
  formData.append('isActive', data.isActive);
  // formData.append('locations', data.locations);
  formData.append("locations", JSON.stringify(data.locations));
  formData.append('name', data.name);
  formData.append('schemeBenifit', data.schemeBenifit);
  formData.append('spoc', data.spoc);
  formData.append('thumbnail', data.thumbnail);
  formData.append('type', data.type);
  formData.append('videoUrl', data.videoUrl);
  formData.append('website', data.website);
  formData.append('schemeCategory', data.schemeCategory);

  await ApiPost(`scheme/addScheme?langId=${langID ? langID : AuthStorage.getStorageData(STORAGEKEY.language)}`, formData)
    .then(res => {
      // return dispatch(addSchemeSuccess(res));
    })
    .catch(err => dispatch(addSchemeErr(err)));
};

export const getSchemeData = (perPage, pageNumber, Status, Benifit, Category, searchBar, hindiID, marathiID) => async dispatch => {
  per_Page = perPage;
  page_number = pageNumber;
  status = Status;
  schemeBenifit = Benifit;
  schemeCategory = Category
  search = searchBar
  hindi = hindiID
  marathi = marathiID

  let URL = `scheme/getAllSchemes?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&per_page=${perPage}&page_number=${pageNumber}`
  if (Status) {
    URL = URL.concat(`&status=${Status}`)
  }
  if (Benifit) {
    URL = URL.concat(`&schemeBenifit=${Benifit}`)
  }
  if (Category) {
    URL = URL.concat(`&schemeCategory=${Category}`)
  }
  if (searchBar) {
    URL = URL.concat(`&search=${searchBar}`)
  }
  if (hindiID) {
    URL = URL.concat(`&hindi=${hindiID}`)
  }
  if (marathiID) {
    URL = URL.concat(`&marathi=${marathiID}`)
  }

  await ApiGet(URL)
    .then(res => {
      return dispatch(getSchemeSuccess(res.data));
    })
    .catch(err => dispatch(getSchemenErr(err)));
};

export const getOneSchemeData = key => async dispatch => {
  await ApiGet(`scheme/getOneScheme?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}&key=${key}`)
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
  // await ApiPost(`scheme/editScheme?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
  await ApiPost(`scheme/editScheme`, body)
    .then(res => {
      return dispatch(editSchemeSuccess(res));
      // console.log('res', res);
      // if (res.status === 200) {
      //   // redirect after click edit button on listing call getSchemeData
      //   // dispatch(getSchemeData(per_Page, page_Num, status));
      // }
    })
    .catch(err => dispatch(editSchemeErr(err)));
};

export const addSchemeInBulkImport = body => async dispatch => {
  await ApiPost(`scheme/addSchemeInBulk`, body)
    .then(res => {
      dispatch(addSchemeInBulk(res));
      // if (res.status === 200) {
      //   // redirect after click edit button on listing call getSchemeData
      //   dispatch(getSchemeData(per_Page, page_Num, status));
      // }
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
  page_number = pagenum;
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
      if (res.status === 200) {
        return dispatch(getSchemeRating(per_Page, page_number));
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

export const addSchemeCategoryInBulk = (body) => async (dispatch) => {
  await ApiPost(`scheme/addSchemeCategoryInBulk?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then(res => {
      dispatch(addSchemeCategoryInBulkSuccess(res));
      if (res.status === 200) {
        // redirect after click edit button on listing call getSchemeData
        dispatch(getSchemecategory());
      }
    })
    .catch(err => {
      dispatch(addSchemeCategoryInBulkErr(err))
    });
}

export const upadteBanner = (body) => async (dispatch) => {
  await ApiPost(`scheme/updateBannerSelected`, body)
    .then(res => {
      dispatch(addUpadateSchemeSuccess(res));
    })
    .catch(err => {
      dispatch(addUpadateSchemeErr(err))
    })
}
