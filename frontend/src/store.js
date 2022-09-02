import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { loginUserReducer, registerUserReducer } from "./reducers/userReducers";

const reducers = combineReducers({
  registerUser: registerUserReducer,
  loginUser: loginUserReducer,
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
