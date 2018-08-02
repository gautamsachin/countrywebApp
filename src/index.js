import './assets/less/AdminLTE.css';
import './assets/less/skins/all-skins.css';
// import '../../../../../src/index.scss';
import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
// add IndexRoute above and the helpers below
import {
  checkIndexAuthorization,
  checkWidgetAuthorization,
} from './lib/check-auth'

// Import all of our components
import App from './App'
import Login from './login'
import Signup from './signup'
import Widgets from './widgets'
import Countries from './countries';
import './index.css'

// Import the index reducer and sagas
import IndexReducer from './index-reducer'
import IndexSagas from './index-sagas'

// Setup the middleware to watch between the Reducers and the Actions
const sagaMiddleware = createSagaMiddleware();
import logger from 'redux-logger'

// Redux DevTools - completely optional, but this is necessary for it to
// work properly with redux saga.  Otherwise you'd just do:
//
// const store = createStore(
//   IndexReducer,
//   applyMiddleware(sagaMiddleware)
// )

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */

const store = createStore(
  IndexReducer,
  composeSetup(applyMiddleware(logger, sagaMiddleware)), // allows redux devtools to watch sagas
)

// Begin our Index Saga
sagaMiddleware.run(IndexSagas)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRoute onEnter={checkIndexAuthorization(store)} />
        <Route path="/login" component={Login} />
        <Route path="/countries" component={Countries} />
        <Route onEnter={checkWidgetAuthorization(store)} path="/widgets" component={Widgets} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
)
