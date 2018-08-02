import { FETCH_COUNTRIES_REQUEST, FETCH_COUNTRIES_SUCCESS, FETCH_COUNTRIES_ERROR } from "./contants";

export const fetchCountriesRequest = (skip, limit, )=>({
    type:FETCH_COUNTRIES_REQUEST,
    skip,
    limit
});

export const fetchCountriesSuccess = (countries)=>({
    type:FETCH_COUNTRIES_SUCCESS,
    countries
});

export const fetchCountriesError = (error)=>({
    type:FETCH_COUNTRIES_ERROR,
    error
})
