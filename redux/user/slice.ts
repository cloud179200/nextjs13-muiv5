import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as actionTypes from "./actions";
import _ from "underscore"

export interface IUserState {
  userInfo: any | null,
  userDetail: any | null,
}

const initialState: IUserState = {
  userInfo: null,
  userDetail: null,
}
const userSlice = createSlice({
  name: "user",
  initialState: _.clone(initialState),
  reducers: {
    [actionTypes.SET_USER_ACTION]: (state, action: PayloadAction<{ id: string }>) => {
      state = _.clone(initialState)
      state.userInfo = { ...action.payload }
    },
    REHYDRATE: (state, action: PayloadAction<any>) => {
      const rehydrated = (action && action.payload && action.payload.Account) || {}
      return { ...state, ...rehydrated }
    },
  }
});

export default userSlice.reducer;