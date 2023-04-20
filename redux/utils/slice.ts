import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as actionTypes from "./actions";
import _ from "underscore"

export interface IUtilsState {
  notifications: Notification[];
  loading: boolean;
  loadingCommon: boolean;
}

interface Notification {
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

const initialState: IUtilsState = {
  notifications: [],
  loading: false,
  loadingCommon: false,
}
const customizationReducer = createSlice({
  name: "customization",
  initialState: _.clone(initialState),
  reducers: {
    [actionTypes.RESET_UTILS_REDUCER_ACTION]: (state) => {
      // eslint-disable-next-line no-unused-vars
      state = _.clone(initialState)
    },
    [actionTypes.SET_LOADING_ACTION]: (state, action: PayloadAction<any>) => {
      state.loading = action.payload.state;
    },
    [actionTypes.SET_LOADING_COMMON_ACTION]: (state, action: PayloadAction<any>) => {
      state.loadingCommon = action.payload.state;
    },
    REHYDRATE: (state, action: PayloadAction<any>) => {
      const rehydrated = (action && action.payload && action.payload.Account) || {}
      return { ...state, ...rehydrated }
    },
  }
});

export default customizationReducer.reducer;