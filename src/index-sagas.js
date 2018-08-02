import SignupSaga from './signup/sagas'
import LoginSaga from './login/sagas'
import WidgetSaga from './widgets/sagas'
import CountriesSaga from './widgets/countries/sagas';

export default function* IndexSaga () {
  yield [
    SignupSaga(),
    LoginSaga(),
    WidgetSaga(),
  ]
}
