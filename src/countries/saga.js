import { take, fork, cancel, call, put, cancelled } from "redux-saga/effects";

import { fetchCountriesSuccess, fetchCountriesError, deleteCountrySuccess } from "./actions";
// Helper for api errors
import { handleApiErrors } from "../lib/api-errors";
import { takeEvery } from "../../node_modules/redux-saga";
import { FETCH_COUNTRIES_REQUEST, DELETE_COUNTRY_REQUEST } from "./contants";
import axios  from  'axios';

const fetchCountriesAPI = (id,skip, limit) => {
  console.log("skip is ",skip,limit)
  let apiURL = 'http://localhost:8000/country/list/';
  if(id) apiURL =apiURL+id;
  return axios.get(`${apiURL}?skip=${skip}&limit=${limit}`);
};

const deleteCountryAPI = (id) => {
  //return axios.get(`http://localhost:8000/country/delete/${id}`);
  return {status: 200,msg:"done"};
};

function* countriesList({id, skip, limit }) {
  try {
    const data = yield fetchCountriesAPI(id,skip, limit);
    yield put(fetchCountriesSuccess(data.data.result));
  } catch (err) {

      yield put(fetchCountriesError(err));
  }
}

function* deleteCountryData({id,skip,limit}) {
  try {
    console.log('inside the sage',skip,limit);
    let data = yield deleteCountryAPI(id);
     data = yield fetchCountriesAPI('',skip, limit);
    yield put(fetchCountriesSuccess(data.data.result));
  } catch (err) {

  }
}

export default function (){
  return [takeEvery(FETCH_COUNTRIES_REQUEST, countriesList ),
    takeEvery(DELETE_COUNTRY_REQUEST, deleteCountryData )
  ];
}
