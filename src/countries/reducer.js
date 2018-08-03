import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_ERROR,
  DELETE_COUNTRY_REQUEST,
  DELETE_COUNTRY_SUCCESS
} from "./contants";

const initialState = {
  requesting: false,
  countries: [],
  error: null
};

const countryReducer = function (state = initialState, action) {
  switch (action.type) {
    case FETCH_COUNTRIES_REQUEST:
      return {
        requesting: true,
        countries: [],
        error: null
      };

    case FETCH_COUNTRIES_SUCCESS:
      return {
        requesting: false,
        countries: action.countries
      };

    // Append the error returned from our api
    case FETCH_COUNTRIES_ERROR:
      return {
        requesting:false,
        error:null
      };

      case DELETE_COUNTRY_REQUEST:
      return {
        requesting:true,
        error:null
      };

      case DELETE_COUNTRY_SUCCESS:
      return {
         requesting: false,delete:true
        }
    default:
      return state;
  }
};

export default countryReducer;
