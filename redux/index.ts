import { AnyAction, CombinedState, Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import customizationReducer, { ICustomizationState } from "./customization/slice"
import userReducer, {IUserState} from "./user/slice";
import utilsReducer, { IUtilsState } from "./utils/slice";

import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";


interface IReducer {
  customization: ICustomizationState;
  user: IUserState;
  common: IUtilsState;
}

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["common", "router", "customization"]
}

const rootReducer: Reducer<CombinedState<IReducer>, AnyAction> = combineReducers({
  customization: customizationReducer,
  user: userReducer,
  common: utilsReducer,
});

const reducer = persistReducer<IReducer, AnyAction>(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer,
  devTools: { trace: true, traceLimit: 25 },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(sagaMiddleware),
});

export const persistor = persistStore(store);
