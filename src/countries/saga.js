import { take, fork, cancel, call, put, cancelled } from "redux-saga/effects";

import { fetchCountriesSuccess, fetchCountriesError } from "./actions";
// Helper for api errors
import { handleApiErrors } from "../lib/api-errors";

const fetchCountriesAPI = (skip, limit) => {
  return fetch("10.101.21.116:3000/country/list");
};

export default function* countriesList({ skip, limit }) {
  try {
    const data = yield fetchCountriesAPI(skip, limit);
    yield put(fetchCountriesSuccess(data.countries));
  } catch (err) {
      yield put(fetchCountriesError(err));
  }
}
