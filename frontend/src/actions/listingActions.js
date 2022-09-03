import {
  LISTING_CATEGORY_FAIL,
  LISTING_CATEGORY_REQUEST,
  LISTING_CATEGORY_SUCCESS,
  LISTING_CREATE_FAIL,
  LISTING_CREATE_REQUEST,
  LISTING_CREATE_SUCCESS,
  LISTING_DELETE_FAIL,
  LISTING_DELETE_REQUEST,
  LISTING_DELETE_SUCCESS,
  LISTING_DETAILS_FAIL,
  LISTING_DETAILS_REQUEST,
  LISTING_DETAILS_SUCCESS,
  LISTING_EXPLORE_FAIL,
  LISTING_EXPLORE_REQUEST,
  LISTING_EXPLORE_SUCCESS,
  LISTING_OFFER_FAIL,
  LISTING_OFFER_REQUEST,
  LISTING_OFFER_SUCCESS,
  LISTING_USER_FAIL,
  LISTING_USER_REQUEST,
  LISTING_USER_SUCCESS,
} from "../constants/listingConstants";
import axios from "axios";

export const getListingByCategory = (type) => async (dispatch) => {
  try {
    dispatch({
      type: LISTING_CATEGORY_REQUEST,
    });
    const { data } = await axios.get(`/api/listings/places/${type}`);
    dispatch({
      type: LISTING_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LISTING_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOffer = () => async (dispatch) => {
  try {
    dispatch({
      type: LISTING_OFFER_REQUEST,
    });
    const { data } = await axios.get(`/api/listings`);
    dispatch({
      type: LISTING_OFFER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LISTING_OFFER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getExploreListing = () => async (dispatch) => {
  try {
    dispatch({
      type: LISTING_EXPLORE_REQUEST,
    });
    const { data } = await axios.get(`/api/listings/all`);
    dispatch({
      type: LISTING_EXPLORE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LISTING_EXPLORE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getListingDetails = (type, id) => async (dispatch) => {
  try {
    dispatch({
      type: LISTING_DETAILS_REQUEST,
    });
    const { data } = await axios.get(
      `/api/listings/places/single/${type}/${id}`
    );
    dispatch({
      type: LISTING_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LISTING_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createNewListing = (listing) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LISTING_CREATE_REQUEST,
    });

    const {
      loginUser: { userInfo },
      registerUser: { userInfo: registerUserInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token || registerUserInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/listings/new`, listing, config);
    dispatch({
      type: LISTING_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LISTING_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUsersListing = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LISTING_USER_REQUEST,
    });

    const {
      loginUser: { userInfo },
      registerUser: { userInfo: registerUserInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token || registerUserInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/listings/userlisting`, config);
    dispatch({
      type: LISTING_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LISTING_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteListing = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LISTING_DELETE_REQUEST,
    });

    const {
      loginUser: { userInfo },
      registerUser: { userInfo: registerUserInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token || registerUserInfo.token}`,
      },
    };

    await axios.delete(`/api/listings/${id}`, config);
    dispatch({
      type: LISTING_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LISTING_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
