import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import themeUsersReducer from './themeUsers/reducers';
import { readMessageReducer } from './message/reducers';
import { readNotificationReducer } from './notification/reducers';
import authReducer from './authentication/reducers';
import ChangeLayoutMode from './themeLayout/reducers';
import { teamReducer } from './team/reducers';
//import { userReducer, userGroupReducer } from './users/reducers';
import userReducer from './users/reducers';
import { sellersReducer } from './sellers/reducers';
import { headerSearchReducer } from './headerSearch/reducers';
import orderReducer from './orders/reducers';
import galleryReducer from './gallary/reducers';
import chartContentReducer from './chartContent/reducers';
import { emailReducer, SingleEmailReducer } from './email/reducers';
import { productReducer, SingleProductReducer } from './product/reducers';
import { chatReducer, SingleChatReducer, groupChatReducer, SingleChatGroupReducer } from './chat/reducers';
import { projectReducer, SingleProjectReducer } from './project/reducers';
import cartData from './cart/reducers';
import Todo from './todo/reducers';
import Note from './note/reducers';
import Task from './task/reducers';
import kanbanBoardReducer from './kanban/reducers';
import Contact from './contact/reducers';
import Profile from './profile/reducers';
import Calender from './calendar/reducers';
import FileManager from './fileManager/reducers';
import { axiosCrudReducer, axiosSingleCrudReducer } from './crud/axios/reducers';
import { fsCrudReducer, fsSingleCrudReducer } from './firebase/firestore/reducers';
import firebaseAuth from './firebase/auth/reducers';
import ProfileReducer from './profile/reducers';
import stateReducer from './state/reducers';
import languageReducer from './language/reducers';
import schemeReducer from './schemes/reducers';
import BenefitsReducer from './benefitsType/reducers';
import cateGoryReducer from './course/reducers';
import jobReducer from './jobs/reducers';
import dashboardReducer from './dashboard/reducers';
import districtReducer from './district/reducers';
import testimonialReducer from './testimonial/reducers';
import bannerReducer from './banner/reducers';
import carouselReducer from './carousel/reducers';
import queriesReducer from './query/reducers';
import articlesReducer from './article/reducers';


const rootReducers = combineReducers({
  fb: firebaseReducer,
  fs: firestoreReducer,
  themeUsers: themeUsersReducer,
  headerSearchData: headerSearchReducer,
  message: readMessageReducer,
  notification: readNotificationReducer,
  orders: orderReducer,
  sellers: sellersReducer,
  users: userReducer,
  //userGroup: userGroupReducer,
  team: teamReducer,
  auth: authReducer,
  gallery: galleryReducer,
  email: emailReducer,
  emailSingle: SingleEmailReducer,
  products: productReducer,
  product: SingleProductReducer,
  chatSingle: SingleChatReducer,
  chatSingleGroup: SingleChatGroupReducer,
  chat: chatReducer,
  groupChat: groupChatReducer,
  projects: projectReducer,
  project: SingleProjectReducer,
  ChangeLayoutMode,
  chartContent: chartContentReducer,
  crud: fsCrudReducer,
  singleCrud: fsSingleCrudReducer,
  cart: cartData,
  Todo,
  Note,
  Task,
  KanbanBoard: kanbanBoardReducer,
  Contact,
  Profile,
  Calender,
  firebaseAuth,
  FileManager,
  AxiosCrud: axiosCrudReducer,
  SingleAxiosCrud: axiosSingleCrudReducer,
  profileReducer: ProfileReducer,
  state: stateReducer,
  language: languageReducer,
  scheme: schemeReducer,
  beneFit: BenefitsReducer,
  category: cateGoryReducer,
  job: jobReducer,
  dashboard: dashboardReducer,
  district: districtReducer,
  testimonial: testimonialReducer,
  banner: bannerReducer,
  carousel: carouselReducer,
  queries: queriesReducer,
  articles: articlesReducer,
});

export default rootReducers;