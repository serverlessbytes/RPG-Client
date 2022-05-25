import actions from './actions';
import products from '../../demoData/cart.json';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';
import AuthStorage from '../../helper/AuthStorage';
import STORAGEKEY from '../../config/APP/app.config';

const {
  cartUpdateBegin,
  cartUpdateSuccess,
  cartUpdateErr,

  cartDeleteBegin,
  cartDeleteSuccess,
  cartDeleteErr,

  postLanguageSuccess,
  getLanguageSuccess,
  postLanguageDataErr,
} = actions;

const stateGetData = () => {
  return async dispatch => {
    try {
      dispatch(cartDataBegin());
      dispatch(cartDataSuccess(products));
    } catch (err) {
      dispatch(cartDataErr(err));
    }
  };
};

const cartUpdateQuantity = (id, quantity, cartData) => {
  return async dispatch => {
    try {
      dispatch(cartUpdateBegin());
      const data = cartData.map(item => {
        if (item.id === id) item.quantity = quantity;
        return item;
      });
      dispatch(cartUpdateSuccess(data));
    } catch (err) {
      dispatch(cartUpdateErr(err));
    }
  };
};

const cartDelete = (id, chartData) => {
  return async dispatch => {
    try {
      dispatch(cartDeleteBegin());
      const data = chartData.filter(item => item.id !== id);
      setTimeout(() => {
        dispatch(cartDeleteSuccess(data));
      }, 500);
    } catch (err) {
      dispatch(cartDeleteErr(err));
    }
  };
};

const postLanguageData = (body) => async (dispatch) => {
  await ApiPost("language/addlanguage", body)
    .then((res) => {
      dispatch(postLanguageSuccess(res))
      return dispatch(getLanguageData())
    })
    .catch((err) => dispatch(postLanguageDataErr(err)))
}

const getLanguageData = () => async (dispatch) => {
  await ApiGet("language/getLanguage")
    .then((res) => {
      return dispatch(getLanguageSuccess(res))

    })
}

const getLanguageByName = () => async (dispatch) => {
  const lan = "English"
  await ApiGet(`language/getLanguageByName?name=${lan}`)
    .then((res) => {
      console.log(" ======================res", res);
      // AuthStorage.setStorageData(STORAGEKEY.lang, res.data.id, true);
      return dispatch(getLanguageByNameSuccess(res))
    })
    .catch((err) => dispatch(getLanguageByNameErr(res)))
}



export { stateGetData, cartUpdateQuantity, cartDelete, postLanguageData, getLanguageData, getLanguageByName };
