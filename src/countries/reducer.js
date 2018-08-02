import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_ERROR
} from "./contants";

const initialState = {
  requesting: false,
  countries: [],
  error: null
};

const countryReducer = function (state = initialState, action) {
  switch (action.type) {
    // Set the requesting flag and append a message to be shown
    case FETCH_COUNTRIES_REQUEST:
      return {
        requesting: true,
        countries: [],
        error: null
      };

    // Successful?  Reset the login state.
    case FETCH_COUNTRIES_SUCCESS:
      return {
        requesting: false,
        countries: action.countries
      };

    // Append the error returned from our api
    // set the success and requesting flags to false
    case FETCH_COUNTRIES_ERROR:
      return {
        requesting:false,
        error:null
      };

    default:
      return state;
  }
};

export default countryReducer;
