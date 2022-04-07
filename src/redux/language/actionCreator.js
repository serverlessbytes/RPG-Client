import actions from './actions';
import products from '../../demoData/cart.json';
import { ApiGet, ApiPost } from '../../helper/API/ApiData';

const {
  
  cartUpdateBegin,
  cartUpdateSuccess,
  cartUpdateErr,

  cartDeleteBegin,
  cartDeleteSuccess,
  cartDeleteErr,

  postLanguageSuccess,
  getLanguageSuccess
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

const postLanguageData=(body) => async(dispatch)=>{
  await ApiPost("language/addlanguage", body)
  .then((res) =>{
      dispatch(postLanguageSuccess(res))
      return dispatch(getLanguageData())
    
  })
}

const getLanguageData = () => async(dispatch)=>{
  await ApiGet("language/getLanguage")
  .then((res) =>{
      return dispatch(getLanguageSuccess(res))
    
  })
}



export { stateGetData, cartUpdateQuantity, cartDelete, postLanguageData, getLanguageData };
