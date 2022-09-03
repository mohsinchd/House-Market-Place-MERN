import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  loginUserReducer,
  registerUserReducer,
  updateUserReducer,
} from "./reducers/userReducers";
import {
  listingCategoryReducer,
  listingCreateReducer,
  listingDeleteReducer,
  listingDetailsReducer,
  listingExploreReducer,
  listingOfferReducer,
  listingUserReducer,
} from "./reducers/listingReducers";

const reducers = combineReducers({
  registerUser: registerUserReducer,
  loginUser: loginUserReducer,
  updateUser: updateUserReducer,
  listingCategory: listingCategoryReducer,
  listingDetails: listingDetailsReducer,
  listingOffer: listingOfferReducer,
  listingCreate: listingCreateReducer,
  listingUser: listingUserReducer,
  listingDelete: listingDeleteReducer,
  listingExplore: listingExploreReducer,
});

const userInfoFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  loginUser: {
    userInfo: userInfoFromStorage,
  },
};
const middlewares = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
