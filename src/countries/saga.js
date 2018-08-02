import { take, fork, cancel, call, put, cancelled } from "redux-saga/effects";

import { fetchCountriesSuccess, fetchCountriesError } from "./actions";
// Helper for api errors
import { handleApiErrors } from "../lib/api-errors";
import { takeEvery } from "../../node_modules/redux-saga";
import { FETCH_COUNTRIES_REQUEST } from "./contants";
import axios  from  'axios';

const fetchCountriesAPI = (skip, limit) => {
  console.log("skip is ",skip,limit)
  return axios.get(`http://10.101.21.116:8000/country/list/?skip=${skip}&limit=${limit}`);
};

function* countriesList({ skip, limit }) {
  try {
    const data = yield fetchCountriesAPI(skip, limit);
    yield put(fetchCountriesSuccess(data.data.result));
  } catch (err) {
      yield put(fetchCountriesError(err));
  }
}

export default function (){
  return takeEvery(FETCH_COUNTRIES_REQUEST, countriesList );
}
