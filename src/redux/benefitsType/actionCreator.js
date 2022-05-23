import actions from './actions';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';

const {

  postBenefitsSuccess,
  getBenefitsSuccess,
  editBenefitsSuccess,
  postBenefitsErr,
  editBenefitsErr,
  addSchemeBenefitBulkSuccess,
  addSchemeBenefitBulkErr,
} = actions;


export const postBenefitsData = (body) => async (dispatch) => {
  await ApiPost(`scheme/addSchemeBenifit?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then((res) => {
      return dispatch(postBenefitsSuccess(res))
    })
    .catch((err) => dispatch(postBenefitsErr(err)))
}

export const getBenefitsData = () => async (dispatch) => {
  await ApiGet(`scheme/getSchemeBenifits?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
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
    .catch((err) => dispatch(editBenefitsErr(err)))
}

export const addSchemeBenefitBulk = (body) => async dispatch => {
  await ApiPost(`scheme/addSchemeBenifitInBulk?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then(res => {
      dispatch(addSchemeBenefitBulkSuccess(res))
      if (res.status === 200) {
        return dispatch(getBenefitsData())
      }
    })
    .catch(err => dispatch(addSchemeBenefitBulkErr(err)))
}


