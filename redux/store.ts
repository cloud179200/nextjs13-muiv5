import { AnyAction, CombinedState, Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import customizationSlice, { ICustomizationState } from "./customization/slice"
import userReducer, { IUserState } from "./user/slice";
import utilsReducer, { IUtilsState } from "./utils/slice";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "./storage";
// import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { rootSaga } from "./saga";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
// import { createWrapper } from "next-redux-wrapper";

interface IState {
  customization: ICustomizationState;
  user: IUserState;
  common: IUtilsState;
}

// const persistConfig = {
//   key: "root",
//   storage: storage,
//   stateReconciler: autoMergeLevel2,
//   blacklist: ["common", "customization"]
// }

const rootReducer: Reducer<CombinedState<IState>, AnyAction> = combineReducers({
  customization: customizationSlice,
  user: userReducer,
  common: utilsReducer,
});

// const reducer = persistReducer<IState, AnyAction>(persistConfig, rootReducer);

// const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({}).concat(
    // sagaMiddleware
    ),
});

// sagaMiddleware.run(rootSaga)

// export const persistor = persistStore(store);

export const makeStore = () => store

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IState> = useSelector;