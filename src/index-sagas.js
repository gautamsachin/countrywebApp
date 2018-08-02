import SignupSaga from './signup/sagas'
import LoginSaga from './login/sagas'
import WidgetSaga from './widgets/sagas'
import CountriesSaga from './countries/saga'

export default function* IndexSaga () {
  yield [
    SignupSaga(),
    LoginSaga(),
    CountriesSaga()
    //import saga
  ]
}
