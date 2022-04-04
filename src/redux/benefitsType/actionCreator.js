import actions from './actions';
import { ApiPost } from '../../helper/API/ApiData';

const {

  postBenefitsSuccess,
} = actions;


const postBenefitsData=(body) => async(dispatch)=>{
  await ApiPost(`scheme/addSchemeBenifit`, body)
  .then((res) =>{
      return dispatch(postBenefitsSuccess(res))
  })
}

export { postBenefitsData };
