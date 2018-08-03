import { put } from "redux-saga/effects";

import { fetchCountriesSuccess } from "./actions";
// Helper for api errors
import { takeEvery } from "../../node_modules/redux-saga";
import { FETCH_COUNTRIES_REQUEST, DELETE_COUNTRY_REQUEST, SAVE_COUNTRY_REQUEST, LOGOUT } from "./contants";
import axios  from  'axios';
import { browserHistory } from 'react-router'

const fetchCountriesAPI = (id,skip, limit) => {
  let apiURL = 'http://localhost:8000/country/list/';
  if(id) apiURL =apiURL+id;
  return axios.get(`${apiURL}?skip=${skip}&limit=${limit}`)
};

const deleteCountryAPI = (id) => {
  return axios.delete(`http://localhost:8000/country/delete/${id}`);
  //return {status: 200,msg:"done"};
};


const saveCountryAPI = (model) => {
  return axios.put(`http://localhost:8000/country/update/${model._id}`,model);
  //return {status: 200,msg:"done"};
};

const createCountryAPI = (model)=>{
  return axios.post(`http://localhost:8000/country/create/`,model);
}



function* countriesList({id, skip, limit }) {
  try {
    const data = yield fetchCountriesAPI(id,skip, limit);
    yield put(fetchCountriesSuccess(data.data.result));
  } catch (err) {
    browserHistory.push('./login');
  }
}

function* deleteCountryData({id,skip,limit}) {
  try {
    let data = yield deleteCountryAPI(id);
     data = yield fetchCountriesAPI('',skip, limit);
    yield put(fetchCountriesSuccess(data.data.result));
  } catch (err) {


  }
}

function* saveCountry({model}) {
  try {
    let data ={}
    if(model._id) data= yield saveCountryAPI(model);
    else data = yield createCountryAPI(model);
    data = yield fetchCountriesAPI(model._id);
    browserHistory.push('/countries')
  } catch (err) {

  }
}


function* logout () {
  //yield put(unsetClient())

  localStorage.removeItem('token')

  browserHistory.push('/login')
}


export default function (){
  return [takeEvery(FETCH_COUNTRIES_REQUEST, countriesList ),
    takeEvery(DELETE_COUNTRY_REQUEST, deleteCountryData ),
    takeEvery(SAVE_COUNTRY_REQUEST, saveCountry ),
    takeEvery(LOGOUT, logout ),
  ];
}
