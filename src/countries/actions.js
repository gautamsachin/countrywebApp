import { FETCH_COUNTRIES_REQUEST, FETCH_COUNTRIES_SUCCESS, FETCH_COUNTRIES_ERROR, DELETE_COUNTRY_REQUEST, DELETE_COUNTRY_SUCCESS } from "./contants";

export const fetchCountriesRequest = (id,skip, limit, )=>({
    type:FETCH_COUNTRIES_REQUEST,
    id,
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

export const deleteCountryRequest = (id,skip,limit)=>({
    type:DELETE_COUNTRY_REQUEST,
    id,skip,limit
})
export const deleteCountrySuccess = (data)=>({
    type:DELETE_COUNTRY_SUCCESS,
    data
})
export const saveCountryRequest = (model)=>({
    type:SAVE_COUNTRY_REQUEST,model
});


