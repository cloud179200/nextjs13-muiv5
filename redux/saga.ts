import { all } from 'redux-saga/effects';
import { customizationSaga } from './customization/saga';
import { utilsSaga } from './utils/saga';

export function* rootSaga() {
  yield all([
    customizationSaga(),
    utilsSaga()
  ]);
}