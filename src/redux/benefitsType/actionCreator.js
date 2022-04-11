import actions from './actions';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';

const {

  postBenefitsSuccess,
  getBenefitsSuccess,
  editBenefitsSuccess,
} = actions;


export const postBenefitsData = (body) => async (dispatch) => {
  await ApiPost(`scheme/addSchemeBenifit?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then((res) => {
      return dispatch(postBenefitsSuccess(res))
    })
}

export const getBenefitsData = (body) => async (dispatch) => {
  await ApiGet(`scheme/getSchemeBenifits?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then((res) => {
      return dispatch(getBenefitsSuccess(res))
    })
}

export const editBenefitsData = (body) => async (dispatch) => {
  await ApiPost(`scheme/editSchemeBenifit`, body)
    .then((res) => {
      dispatch(editBenefitsSuccess(res))
      if (res.status === 200) {
        dispatch(getBenefitsData(body))
      }
    })
}


