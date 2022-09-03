import {
  LISTING_CATEGORY_FAIL,
  LISTING_CATEGORY_REQUEST,
  LISTING_CATEGORY_SUCCESS,
  LISTING_DETAILS_SUCCESS,
  LISTING_DETAILS_REQUEST,
  LISTING_DETAILS_FAIL,
  LISTING_OFFER_REQUEST,
  LISTING_OFFER_SUCCESS,
  LISTING_OFFER_FAIL,
  LISTING_CREATE_FAIL,
  LISTING_CREATE_REQUEST,
  LISTING_CREATE_SUCCESS,
  LISTING_USER_REQUEST,
  LISTING_USER_SUCCESS,
  LISTING_USER_FAIL,
  LISTING_DELETE_REQUEST,
  LISTING_DELETE_SUCCESS,
  LISTING_DELETE_FAIL,
  LISTING_EXPLORE_REQUEST,
  LISTING_EXPLORE_SUCCESS,
  LISTING_EXPLORE_FAIL,
} from "../constants/listingConstants";

export const listingCategoryReducer = (state = { listings: [] }, action) => {
  switch (action.type) {
    case LISTING_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case LISTING_CATEGORY_SUCCESS:
      return { loading: false, listings: action.payload };
    case LISTING_CATEGORY_FAIL:
      return { loading: false, listings: [], error: action.payload };
    default:
      return state;
  }
};

export const listingDetailsReducer = (
  state = { listing: { images: [], geoLocation: { lat: "", lng: "" } } },
  action
) => {
  switch (action.type) {
    case LISTING_DETAILS_REQUEST:
      return { ...state, loading: true };
    case LISTING_DETAILS_SUCCESS:
      return { loading: false, listing: action.payload };
    case LISTING_DETAILS_FAIL:
      return {
        loading: false,
        listing: { images: [] },
        geoLocation: { lat: "", lng: "" },
        error: action.payload,
      };
    default:
      return state;
  }
};

export const listingOfferReducer = (state = { listings: [] }, action) => {
  switch (action.type) {
    case LISTING_OFFER_REQUEST:
      return { ...state, loading: true };
    case LISTING_OFFER_SUCCESS:
      return { loading: false, listings: action.payload };
    case LISTING_OFFER_FAIL:
      return { loading: false, listings: [], error: action.payload };
    default:
      return state;
  }
};

export const listingExploreReducer = (state = { listings: [] }, action) => {
  switch (action.type) {
    case LISTING_EXPLORE_REQUEST:
      return { ...state, loading: true };
    case LISTING_EXPLORE_SUCCESS:
      return { loading: false, listings: action.payload };
    case LISTING_EXPLORE_FAIL:
      return { loading: false, listings: [], error: action.payload };
    default:
      return state;
  }
};

export const listingUserReducer = (state = { listings: [] }, action) => {
  switch (action.type) {
    case LISTING_USER_REQUEST:
      return { ...state, loading: true };
    case LISTING_USER_SUCCESS:
      return { loading: false, listings: action.payload };
    case LISTING_USER_FAIL:
      return { loading: false, listings: [], error: action.payload };
    default:
      return state;
  }
};

export const listingCreateReducer = (state = { listing: {} }, action) => {
  switch (action.type) {
    case LISTING_CREATE_REQUEST:
      return { ...state, loading: true };
    case LISTING_CREATE_SUCCESS:
      return { loading: false, listing: action.payload };
    case LISTING_CREATE_FAIL:
      return { loading: false, listing: {}, error: action.payload };
    default:
      return state;
  }
};

export const listingDeleteReducer = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case LISTING_DELETE_REQUEST:
      return { ...state, loading: true };
    case LISTING_DELETE_SUCCESS:
      return { loading: false, success: true };
    case LISTING_DELETE_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
