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

  postStateSuccess,
  postStateErr,
  getStateSuccess,
  
} = actions;

export const stateGetData = () => {
  return async dispatch => {
    try {
      dispatch(cartDataBegin());
      dispatch(cartDataSuccess(products));
    } catch (err) {
      dispatch(cartDataErr(err));
    }
  };
};

export const cartUpdateQuantity = (id, quantity, cartData) => {
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

export const cartDelete = (id, chartData) => {
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

export const postStateData=(body) => async(dispatch)=>{
  await ApiPost(`state/addState?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`, body)
  .then((res) =>{
       dispatch(postStateSuccess(res))
      return dispatch(getStateData())
  })
  .catch((err) => dispatch(postStateErr(err)))
}

export const getStateData=() => async(dispatch)=>{
  await ApiGet(`state/getState?langId=${AuthStorage.getStorageData(STORAGEKEY.language)}`)
  .then((res) =>{
          return dispatch(getStateSuccess(res)) 
  })
}


//export { stateGetData, cartUpdateQuantity, cartDelete, postStateData };
