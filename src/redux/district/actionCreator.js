import actions from './actions';
import products from '../../demoData/cart.json';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';

const {

  postDistrictSuccess,
  getDistrictSuccess,
  postDistrictErr,

} = actions;



export const postDistrictData = (body) => async (dispatch) => {
  await ApiPost(`district/addDistrict?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
    .then((res) => {
      return dispatch(postDistrictSuccess(res))
      //dispatch(getStateData())
    })
    .catch((err) => dispatch(postDistrictErr(err)))
}

export const getDistrictData = (data) => async (dispatch) => {
  await ApiGet(`district/getDistrict?stateId=${data}&langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
    .then((res) => {
      return dispatch(getDistrictSuccess(res))
    })
}


//export { stateGetData, cartUpdateQuantity, cartDelete, postStateData };
